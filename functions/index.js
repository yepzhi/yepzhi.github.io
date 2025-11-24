const { onRequest } = require("firebase-functions/v2/https");
const { onCall } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const axios = require("axios");
const { parseStringPromise, Builder } = require("xml2js");
const PDFDocument = require("pdfkit");

admin.initializeApp();

const finkokUsername = defineSecret("FINKOK_USERNAME");
const finkokPassword = defineSecret("FINKOK_PASSWORD");

const FINKOK_URLS = {
  demo: {
    stamp: "http://demo-facturacion.finkok.com/servicios/soap/stamp.wsdl",
    cancel: "http://demo-facturacion.finkok.com/servicios/soap/cancel.wsdl",
  },
  prod: {
    stamp: "https://facturacion.finkok.com/servicios/soap/stamp.wsdl",
    cancel: "https://facturacion.finkok.com/servicios/soap/cancel.wsdl",
  },
};

const CURRENT_ENV = "demo";

console.log(`🔥 HotFact Functions [${CURRENT_ENV}] inicializadas`);

// ==========================================
// FUNCIÓN AUXILIAR: GENERAR PDF REAL
// ==========================================
/**
 * Genera un PDF real con PDFKit
 * @param {Object} datos - Datos de la factura
 * @param {string} uuid - UUID de la factura
 * @return {Promise<Buffer>} Buffer del PDF
 */
async function generarPDFReal(datos, uuid) {
  console.log("📑 Generando PDF REAL para UUID:", uuid);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      console.log("✅ PDF generado:", pdfBuffer.length, "bytes");
      resolve(pdfBuffer);
    });
    doc.on("error", reject);

    try {
      // Encabezado
      doc.fontSize(24).fillColor("#667eea")
          .text("FACTURA ELECTRÓNICA", { align: "center" });
      doc.moveDown(0.5);
      doc.fontSize(10).fillColor("#666")
          .text("Comprobante Fiscal Digital por Internet (CFDI 4.0)",
              { align: "center" });
      doc.moveDown();

      // Línea divisoria
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke("#ddd");
      doc.moveDown();

      // UUID
      doc.fontSize(9).fillColor("#333")
          .text("UUID:", { continued: true, bold: true });
      doc.fontSize(8).fillColor("#666").text(` ${uuid}`);
      doc.fontSize(9).fillColor("#333")
          .text("Fecha de emisión:", { continued: true });
      doc.fontSize(8).fillColor("#666")
          .text(` ${new Date().toLocaleString("es-MX")}`);
      doc.moveDown(1.5);

      // EMISOR
      doc.fontSize(12).fillColor("#667eea").text("EMISOR", { underline: true });
      doc.moveDown(0.3);
      doc.fontSize(10).fillColor("#333").text(datos.emisor.nombre);
      doc.fontSize(9).fillColor("#666").text(`RFC: ${datos.emisor.rfc}`);
      doc.text(`Régimen Fiscal: ${datos.emisor.regimenFiscal}`);
      doc.moveDown(1);

      // RECEPTOR
      doc.fontSize(12).fillColor("#667eea")
          .text("RECEPTOR", { underline: true });
      doc.moveDown(0.3);
      doc.fontSize(10).fillColor("#333").text(datos.receptor.nombre);
      doc.fontSize(9).fillColor("#666").text(`RFC: ${datos.receptor.rfc}`);
      doc.text(`Uso CFDI: ${datos.cfdi.usoCFDI}`);
      doc.text(`Email: ${datos.receptor.email || "N/A"}`);
      doc.moveDown(1.5);

      // CONCEPTOS
      doc.fontSize(12).fillColor("#667eea")
          .text("CONCEPTOS", { underline: true });
      doc.moveDown(0.5);

      // Tabla de conceptos
      const tableTop = doc.y;
      doc.fontSize(9).fillColor("#333");
      doc.text("Cant.", 50, tableTop, { width: 40 });
      doc.text("Descripción", 100, tableTop, { width: 250 });
      doc.text("P. Unit.", 360, tableTop, { width: 80, align: "right" });
      doc.text("Importe", 450, tableTop, { width: 90, align: "right" });

      doc.moveDown(0.3);
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke("#ddd");
      doc.moveDown(0.3);

      datos.conceptos.forEach((concepto) => {
        const y = doc.y;
        doc.fontSize(9).fillColor("#666");
        doc.text(concepto.cantidad, 50, y, { width: 40 });
        doc.text(concepto.descripcion, 100, y, { width: 250 });
        doc.text(`$${concepto.precioUnitario.toFixed(2)}`,
            360, y, { width: 80, align: "right" });
        doc.text(`$${concepto.subtotal.toFixed(2)}`,
            450, y, { width: 90, align: "right" });
        doc.moveDown(0.8);
      });

      doc.moveDown(0.5);
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke("#ddd");
      doc.moveDown(1);

      // TOTALES
      doc.fontSize(10).fillColor("#333");
      const totalsX = 400;
      doc.text("Subtotal:", totalsX, doc.y, { width: 100, align: "left" });
      doc.text(`$${datos.totales.subtotal.toFixed(2)}`,
          totalsX + 100, doc.y, { width: 90, align: "right" });
      doc.moveDown(0.5);

      doc.text("IVA (16%):", totalsX, doc.y, { width: 100, align: "left" });
      doc.text(`$${datos.totales.iva.toFixed(2)}`,
          totalsX + 100, doc.y, { width: 90, align: "right" });
      doc.moveDown(0.8);

      doc.fontSize(14).fillColor("#667eea");
      doc.text("TOTAL:", totalsX, doc.y, { width: 100, align: "left" });
      doc.text(
          `$${datos.totales.total.toFixed(2)} ${datos.cfdi.moneda}`,
          totalsX + 100, doc.y, { width: 90, align: "right" },
      );

      // Pie de página
      doc.moveDown(3);
      doc.fontSize(8).fillColor("#999").text(
          "Este documento es una representación impresa de un CFDI",
          { align: "center" },
      );

      doc.end();
    } catch (error) {
      console.error("Error generando PDF:", error);
      reject(error);
    }
  });
}

// ==========================================
// FUNCIÓN AUXILIAR: GUARDAR EN STORAGE
// ==========================================
/**
 * Guarda archivos XML y PDF en Firebase Storage
 * @param {string} xmlContent - Contenido XML
 * @param {Buffer} pdfBuffer - Buffer del PDF
 * @param {string} uuid - UUID de la factura
 * @param {string} businessId - ID del negocio
 * @return {Promise<Object>} URLs públicas
 */
async function guardarEnStorage(xmlContent, pdfBuffer, uuid, businessId) {
  console.log("💾 Guardando archivos en Storage...");

  const bucket = admin.storage().bucket();
  const xmlPath = `facturas/${businessId}/${uuid}.xml`;
  const pdfPath = `facturas/${businessId}/${uuid}.pdf`;

  const xmlFile = bucket.file(xmlPath);
  await xmlFile.save(xmlContent, {
    contentType: "application/xml",
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });

  const pdfFile = bucket.file(pdfPath);
  await pdfFile.save(pdfBuffer, {
    contentType: "application/pdf",
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });

  await xmlFile.makePublic();
  await pdfFile.makePublic();

  const xmlUrl = `https://storage.googleapis.com/${bucket.name}/${xmlPath}`;
  const pdfUrl = `https://storage.googleapis.com/${bucket.name}/${pdfPath}`;

  console.log("✅ Archivos guardados");
  console.log("XML URL:", xmlUrl);
  console.log("PDF URL:", pdfUrl);

  return { xmlUrl, pdfUrl };
}

// ==========================================
// GENERAR XML CFDI 4.0
// ==========================================
/**
 * Genera XML CFDI 4.0
 * @param {Object} datos - Datos del CFDI
 * @return {string} XML generado
 */
function generarXMLCFDI(datos) {
  console.log("📄 Generando XML CFDI 4.0");
  console.log("Emisor:", datos.emisor.rfc);
  console.log("Receptor:", datos.receptor.rfc);
  console.log("Total:", datos.totales.total);

  const { emisor, receptor, conceptos, totales, cfdi } = datos;
  const fecha = new Date().toISOString().split(".")[0];

  if (!emisor.cp) {
    console.warn("⚠️ CP del emisor no proporcionado, usando default");
  }

  const conceptosProcesados = conceptos.map((concepto) => {
    const importeIvaConcepto = concepto.subtotal * 0.16;

    return {
      "$": {
        ClaveProdServ: "90101501",
        Cantidad: concepto.cantidad,
        ClaveUnidad: "E48",
        Unidad: "Servicio",
        Descripcion: concepto.descripcion,
        ValorUnitario: concepto.precioUnitario.toFixed(2),
        Importe: concepto.subtotal.toFixed(2),
        ObjetoImp: "02",
      },
      "cfdi:Impuestos": {
        "cfdi:Traslados": {
          "cfdi:Traslado": {
            $: {
              Base: concepto.subtotal.toFixed(2),
              Impuesto: "002",
              TipoFactor: "Tasa",
              TasaOCuota: "0.160000",
              Importe: importeIvaConcepto.toFixed(2),
            },
          },
        },
      },
    };
  });

  const cfdiData = {
    "cfdi:Comprobante": {
      "$": {
        "xmlns:cfdi": "http://www.sat.gob.mx/cfd/4",
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xsi:schemaLocation":
          "http://www.sat.gob.mx/cfd/4 " +
          "http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd",
        "Version": "4.0",
        "Fecha": fecha,
        "Sello": "",
        "FormaPago": cfdi.formaPago,
        "NoCertificado": "",
        "Certificado": "",
        "SubTotal": totales.subtotal.toFixed(2),
        "Moneda": cfdi.moneda,
        "Total": totales.total.toFixed(2),
        "TipoDeComprobante": "I",
        "Exportacion": "01",
        "MetodoPago": cfdi.metodoPago,
        "LugarExpedicion": emisor.cp || "83000",
      },
      "cfdi:Emisor": {
        $: {
          Rfc: emisor.rfc,
          Nombre: emisor.nombre,
          RegimenFiscal: emisor.regimenFiscal || "626",
        },
      },
      "cfdi:Receptor": {
        $: {
          Rfc: receptor.rfc,
          Nombre: receptor.nombre,
          DomicilioFiscalReceptor: receptor.cp,
          RegimenFiscalReceptor: receptor.regimenFiscal,
          UsoCFDI: cfdi.usoCFDI,
        },
      },
      "cfdi:Conceptos": {
        "cfdi:Concepto": conceptosProcesados,
      },
      "cfdi:Impuestos": {
        "$": {
          TotalImpuestosTrasladados: totales.iva.toFixed(2),
        },
        "cfdi:Traslados": {
          "cfdi:Traslado": {
            $: {
              Base: totales.subtotal.toFixed(2),
              Impuesto: "002",
              TipoFactor: "Tasa",
              TasaOCuota: "0.160000",
              Importe: totales.iva.toFixed(2),
            },
          },
        },
      },
    },
  };

  const builder = new Builder({
    xmldec: { version: "1.0", encoding: "UTF-8" },
  });

  const xml = builder.buildObject(cfdiData);
  console.log("✅ XML generado:", xml.length, "bytes");

  return xml;
}

// ==========================================
// TIMBRAR CON FINKOK
// ==========================================
/**
 * Timbra un CFDI con Finkok
 * @param {string} xmlSinTimbrar - XML sin timbrar
 * @param {string} username - Usuario Finkok
 * @param {string} password - Password Finkok
 * @return {Promise<Object>} Resultado del timbrado
 */
async function timbrarConFinkok(xmlSinTimbrar, username, password) {
  console.log("🔥 Conectando con FINKOK");
  const urlToUse = FINKOK_URLS[CURRENT_ENV].stamp;
  console.log("URL:", urlToUse);
  console.log("Usuario:", username);

  try {
    const xmlBase64 = Buffer.from(xmlSinTimbrar).toString("base64");
    console.log("✅ XML convertido a Base64");

    const soapRequest = `<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" 
  xmlns:ns1="http://facturacion.finkok.com/stamp">
  <SOAP-ENV:Body>
    <ns1:stamp>
      <ns1:xml>${xmlBase64}</ns1:xml>
      <ns1:username>${username}</ns1:username>
      <ns1:password>${password}</ns1:password>
    </ns1:stamp>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;

    console.log("📤 Enviando request a FINKOK...");

    const response = await axios.post(urlToUse, soapRequest, {
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        "SOAPAction": "stamp",
      },
      timeout: 35000,
    });

    console.log("📥 Respuesta recibida - Status:", response.status);

    const result = await parseStringPromise(response.data);

    const envelope = result["SOAP-ENV:Envelope"] ||
      result["soap:Envelope"] || result["s:Envelope"];
    const body = envelope ?
      (envelope["SOAP-ENV:Body"] ||
        envelope["soap:Body"] || envelope["s:Body"]) : null;
    const stampResult = (body && body[0]) ?
      (body[0]["ns1:stampResult"] || body[0]["stampResult"]) : null;

    if (!stampResult || !stampResult[0]) {
      console.error("❌ Respuesta SOAP inválida");
      throw new Error("Respuesta de FINKOK irreconocible");
    }

    const resultData = stampResult[0];
    console.log("📦 stampResult recibido:", Object.keys(resultData));

    if (resultData.xml && resultData.xml[0]) {
      const uuid = resultData.UUID ? resultData.UUID[0] : "SIN-UUID";
      const fecha = resultData.Fecha ?
        resultData.Fecha[0] : new Date().toISOString();

      console.log("🎉 TIMBRADO EXITOSO!");
      console.log("UUID:", uuid);
      console.log("Fecha:", fecha);

      return {
        success: true,
        xml: Buffer.from(resultData.xml[0], "base64").toString("utf-8"),
        uuid: uuid,
        fecha: fecha,
      };
    } else {
      const cod = resultData.CodEstatus ? resultData.CodEstatus[0] : "ERROR";
      const msg = resultData.Mensaje ?
        resultData.Mensaje[0] : "Error desconocido";

      console.error("❌ Error de FINKOK");
      console.error("Código:", cod);
      console.error("Mensaje:", msg);

      return {
        success: false,
        error: `[${cod}] ${msg}`,
      };
    }
  } catch (error) {
    console.error("💥 Excepción en timbrado:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
    }
    return {
      success: false,
      error: error.message,
    };
  }
}

// ==========================================
// FUNCIÓN: timbrarFacturaInmediata
// ==========================================
exports.timbrarFacturaInmediata = onCall(
    { secrets: [finkokUsername, finkokPassword] },
    async (request) => {
      console.log("🔥 timbrarFacturaInmediata llamado");

      const { cfdiData } = request.data;

      if (!cfdiData || !cfdiData.emisor || !cfdiData.receptor) {
        throw new Error("Datos incompletos");
      }

      console.log("Emisor:", cfdiData.emisor.rfc);
      console.log("Receptor:", cfdiData.receptor.rfc);
      console.log("Total:", cfdiData.totales.total);

      try {
        console.log("📄 Generando XML...");
        const xmlSinTimbrar = generarXMLCFDI(cfdiData);

        console.log("🔥 Timbrando con Finkok...");
        const resultado = await timbrarConFinkok(
            xmlSinTimbrar,
            finkokUsername.value(),
            finkokPassword.value(),
        );

        if (!resultado.success) {
          throw new Error(resultado.error);
        }

        console.log("📑 Generando PDF...");
        const pdfBuffer = await generarPDFReal(cfdiData, resultado.uuid);

        console.log("💾 Guardando en Storage...");
        const { xmlUrl, pdfUrl } = await guardarEnStorage(
            resultado.xml,
            pdfBuffer,
            resultado.uuid,
            cfdiData.businessId,
        );

        await admin.firestore().collection("invoices").add({
          businessId: cfdiData.businessId,
          uuid: resultado.uuid,
          xmlUrl: xmlUrl,
          pdfUrl: pdfUrl,
          emisor: cfdiData.emisor,
          receptor: cfdiData.receptor,
          totales: cfdiData.totales,
          status: "timbrado",
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        console.log("🎉 Factura timbrada exitosamente!");

        return {
          success: true,
          uuid: resultado.uuid,
          xmlUrl: xmlUrl,
          pdfUrl: pdfUrl,
        };
      } catch (error) {
        console.error("💥 Error:", error);
        throw new Error(error.message);
      }
    },
);

// ==========================================
// VALIDAR RFC
// ==========================================
exports.validarRFC = onRequest(async (req, res) => {
  console.log("📞 validarRFC llamado");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  const { rfc } = req.body;

  if (!rfc) {
    return res.status(400).json({ error: "RFC es requerido" });
  }

  try {
    const rfcPattern = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;
    const isValid = rfcPattern.test(rfc);

    console.log(`${isValid ? "✅" : "❌"} RFC: ${rfc}`);

    return res.json({
      valid: isValid,
      rfc: rfc,
      message: isValid ? "RFC válido" : "Formato inválido",
    });
  } catch (error) {
    console.error("💥 Error:", error);
    return res.status(500).json({ valid: false, error: "Error interno" });
  }
});

console.log("✅ Todas las funciones exportadas correctamente");
