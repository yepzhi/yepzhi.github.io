const {onCall} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const soap = require("soap");
const {create} = require("xmlbuilder2");
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const axios = require("axios");

admin.initializeApp();

// Configuración de Finkok
const FINKOK_CONFIG = {
  usuario: "yepzhi@gmail.com",
  password: "Apple2014",
  wsdl: "https://demo-facturacion.finkok.com/servicios/soap/stamp.wsdl",
  wsdlCancel:
    "https://demo-facturacion.finkok.com/servicios/soap/cancel.wsdl",
};

// Configuración de Gmail
const EMAIL_CONFIG = {
  service: "gmail",
  auth: {
    user: "yepzhi@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD || "ybtx omrz feiq rqqg",
  },
};

/**
 * Función para timbrar factura con Finkok
 * Se llama manualmente desde el dashboard
 * @param {object} request - Request object
 * @return {Promise<object>} Resultado del timbrado
 */
exports.timbrarFactura = onCall(async (request) => {
  try {
    const {invoiceId} = request.data;

    if (!invoiceId) {
      throw new Error("Se requiere el ID de la factura");
    }

    // Obtener datos de la factura
    const invoiceRef = admin.firestore()
        .collection("invoiceRequests")
        .doc(invoiceId);
    const invoiceDoc = await invoiceRef.get();

    if (!invoiceDoc.exists) {
      throw new Error("Factura no encontrada");
    }

    const invoiceData = invoiceDoc.data();

    // Verificar que no esté ya timbrada
    if (invoiceData.status === "timbrada") {
      throw new Error("Esta factura ya está timbrada");
    }

    // 1. Generar XML CFDI 4.0
    const xml = generarXMLCFDI(invoiceData);

    // 2. Timbrar con Finkok
    const resultado = await timbrarConFinkok(xml);

    // 3. Generar PDF
    const pdfBuffer = await generarPDF(invoiceData, resultado.xmlTimbrado);

    // 4. Subir archivos a Storage
    const urls = await subirArchivos(
        invoiceId,
        resultado.xmlTimbrado,
        pdfBuffer,
    );

    // 5. Actualizar Firestore
    await invoiceRef.update({
      status: "timbrada",
      uuid: resultado.uuid,
      xmlURL: urls.xmlURL,
      pdfURL: urls.pdfURL,
      fechaTimbrado: admin.firestore.FieldValue.serverTimestamp(),
      certificadoSAT: resultado.certificadoSAT,
      selloSAT: resultado.selloSAT,
    });

    // 6. Enviar email
    await enviarEmail(invoiceData, urls);

    return {
      success: true,
      uuid: resultado.uuid,
      xmlURL: urls.xmlURL,
      pdfURL: urls.pdfURL,
      message: "Factura timbrada exitosamente",
    };
  } catch (error) {
    console.error("Error en timbrarFactura:", error);
    throw new Error(`Error al timbrar: ${error.message}`);
  }
});

/**
 * Generar XML CFDI 4.0
 * @param {object} invoiceData - Datos de la factura
 * @return {string} XML generado
 */
function generarXMLCFDI(invoiceData) {
  const fecha = new Date().toISOString();
  const {emisor, receptor, totales, conceptos, cfdi} = invoiceData;

  const doc = create({version: "1.0", encoding: "UTF-8"})
      .ele("cfdi:Comprobante", {
        "xmlns:cfdi": "http://www.sat.gob.mx/cfd/4",
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xsi:schemaLocation":
          "http://www.sat.gob.mx/cfd/4 " +
          "http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd",
        "Version": "4.0",
        "Serie": "F",
        "Folio": invoiceData.folioNumber || Date.now().toString(),
        "Fecha": fecha,
        "FormaPago": cfdi.formaPago,
        "SubTotal": totales.subtotal.toFixed(2),
        "Moneda": "MXN",
        "Total": totales.total.toFixed(2),
        "TipoDeComprobante": "I",
        "MetodoPago": "PUE",
        "LugarExpedicion": "83000",
        "Exportacion": "01",
      });

  // Emisor
  doc.ele("cfdi:Emisor", {
    Rfc: emisor.rfc,
    Nombre: emisor.nombre,
    RegimenFiscal: "626",
  }).up();

  // Receptor
  doc.ele("cfdi:Receptor", {
    Rfc: receptor.rfc,
    Nombre: receptor.nombre,
    DomicilioFiscalReceptor: receptor.cp,
    RegimenFiscalReceptor: receptor.regimenFiscal,
    UsoCFDI: cfdi.usoCFDI,
  }).up();

  // Conceptos
  const conceptosNode = doc.ele("cfdi:Conceptos");
  conceptos.forEach((concepto) => {
    conceptosNode.ele("cfdi:Concepto", {
      ClaveProdServ: "90101501",
      Cantidad: concepto.cantidad,
      ClaveUnidad: "E48",
      Unidad: "Servicio",
      Descripcion: concepto.descripcion,
      ValorUnitario: concepto.precioUnitario.toFixed(2),
      Importe: concepto.subtotal.toFixed(2),
      ObjetoImp: "02",
    })
        .ele("cfdi:Impuestos")
        .ele("cfdi:Traslados")
        .ele("cfdi:Traslado", {
          Base: concepto.subtotal.toFixed(2),
          Impuesto: "002",
          TipoFactor: "Tasa",
          TasaOCuota: "0.160000",
          Importe: (concepto.subtotal * 0.16).toFixed(2),
        }).up().up().up().up();
  });
  conceptosNode.up();

  // Impuestos
  doc.ele("cfdi:Impuestos", {
    TotalImpuestosTrasladados: totales.iva.toFixed(2),
  })
      .ele("cfdi:Traslados")
      .ele("cfdi:Traslado", {
        Base: totales.subtotal.toFixed(2),
        Impuesto: "002",
        TipoFactor: "Tasa",
        TasaOCuota: "0.160000",
        Importe: totales.iva.toFixed(2),
      }).up().up().up();

  return doc.end({prettyPrint: true});
}

/**
 * Timbrar con Finkok SOAP
 * @param {string} xml - XML a timbrar
 * @return {Promise<object>} Resultado del timbrado
 */
async function timbrarConFinkok(xml) {
  return new Promise((resolve, reject) => {
    soap.createClient(FINKOK_CONFIG.wsdl, (err, client) => {
      if (err) {
        reject(new Error(`Error creando cliente SOAP: ${err.message}`));
        return;
      }

      const xmlBase64 = Buffer.from(xml).toString("base64");

      const args = {
        username: FINKOK_CONFIG.usuario,
        password: FINKOK_CONFIG.password,
        xml: xmlBase64,
      };

      client.stamp(args, (err, result) => {
        if (err) {
          reject(new Error(`Error en Finkok: ${err.message}`));
          return;
        }

        if (result.stampResult && result.stampResult.xml) {
          const xmlTimbrado = Buffer.from(
              result.stampResult.xml,
              "base64",
          ).toString("utf8");

          // Extraer UUID del XML timbrado
          const uuidMatch = xmlTimbrado.match(/UUID="([^"]+)"/);
          const uuid = uuidMatch ? uuidMatch[1] : null;

          // Extraer certificado y sello SAT
          const certMatch = xmlTimbrado.match(/NoCertificadoSAT="([^"]+)"/);
          const selloMatch = xmlTimbrado.match(/SelloSAT="([^"]+)"/);

          resolve({
            xmlTimbrado,
            uuid,
            certificadoSAT: certMatch ? certMatch[1] : null,
            selloSAT: selloMatch ? selloMatch[1] : null,
          });
        } else {
          reject(new Error("No se recibió XML timbrado de Finkok"));
        }
      });
    });
  });
}

/**
 * Generar PDF de la factura con logo
 * @param {object} invoiceData - Datos de la factura
 * @param {string} xmlTimbrado - XML timbrado
 * @return {Promise<Buffer>} PDF generado
 */
function generarPDF(invoiceData, xmlTimbrado) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({margin: 50});
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const {emisor, receptor, totales, conceptos, businessId} = invoiceData;

    // Extraer UUID del XML
    const uuidMatch = xmlTimbrado.match(/UUID="([^"]+)"/);
    const uuid = uuidMatch ? uuidMatch[1] : "N/A";

    // Obtener y agregar logo
    cargarLogo(businessId)
        .then((logoBuffer) => {
          if (logoBuffer) {
            try {
              doc.image(logoBuffer, 50, 45, {
                width: 100,
                height: 100,
                fit: [100, 100],
              });
              doc.moveDown(6);
            } catch (error) {
              console.log("Error insertando logo:", error.message);
            }
          }

          // Header
          doc.fontSize(20).text("FACTURA ELECTRÓNICA", {align: "center"});
          doc.moveDown();

          // Emisor
          doc.fontSize(12).text("EMISOR", {underline: true});
          doc.fontSize(10)
              .text(`${emisor.nombre}`)
              .text(`RFC: ${emisor.rfc}`)
              .moveDown();

          // Receptor
          doc.fontSize(12).text("RECEPTOR", {underline: true});
          doc.fontSize(10)
              .text(`${receptor.nombre}`)
              .text(`RFC: ${receptor.rfc}`)
              .text(`Código Postal: ${receptor.cp}`)
              .moveDown();

          // UUID
          doc.fontSize(12).text("FOLIO FISCAL (UUID)", {underline: true});
          doc.fontSize(8).text(uuid).moveDown();

          // Conceptos
          doc.fontSize(12).text("CONCEPTOS", {underline: true});
          conceptos.forEach((concepto) => {
            doc.fontSize(10)
                .text(
                    `${concepto.cantidad} x ${concepto.descripcion} - ` +
                    `$${concepto.precioUnitario.toFixed(2)}`,
                );
          });
          doc.moveDown();

          // Totales
          doc.fontSize(10)
              .text(`Subtotal: $${totales.subtotal.toFixed(2)}`, {
                align: "right",
              })
              .text(`IVA (16%): $${totales.iva.toFixed(2)}`, {
                align: "right",
              })
              .fontSize(12)
              .text(`TOTAL: $${totales.total.toFixed(2)}`, {
                align: "right",
                underline: true,
              });

          doc.moveDown(2);
          doc.fontSize(8)
              .text(
                  "Este documento es una representación impresa de un CFDI",
                  {align: "center"},
              );

          doc.end();
        })
        .catch((error) => {
          console.log("Error cargando logo:", error);
          reject(error);
        });
  });
}

/**
 * Cargar logo del negocio
 * @param {string} businessId - ID del negocio
 * @return {Promise<Buffer|null>} Buffer del logo o null
 */
async function cargarLogo(businessId) {
  try {
    const userDoc = await admin.firestore()
        .collection("users")
        .doc(businessId)
        .get();
    const userData = userDoc.data();

    if (userData && userData.logoURL) {
      // Si el logo está en base64 en Firestore
      if (userData.logoURL.startsWith("data:image")) {
        const base64Data = userData.logoURL.split(",")[1];
        return Buffer.from(base64Data, "base64");
      } else {
        // Si está en Storage, descargar
        const response = await axios.get(userData.logoURL, {
          responseType: "arraybuffer",
        });
        return Buffer.from(response.data);
      }
    }
    return null;
  } catch (error) {
    console.log("No se pudo cargar el logo:", error.message);
    return null;
  }
}

/**
 * Subir archivos a Firebase Storage
 * @param {string} invoiceId - ID de la factura
 * @param {string} xml - XML timbrado
 * @param {Buffer} pdfBuffer - PDF generado
 * @return {Promise<object>} URLs de los archivos
 */
async function subirArchivos(invoiceId, xml, pdfBuffer) {
  const bucket = admin.storage().bucket();

  // Subir XML
  const xmlFile = bucket.file(`facturas/${invoiceId}/factura.xml`);
  await xmlFile.save(xml, {
    metadata: {contentType: "application/xml"},
  });
  const xmlURL = await xmlFile.getSignedUrl({
    action: "read",
    expires: "03-01-2500",
  });

  // Subir PDF
  const pdfFile = bucket.file(`facturas/${invoiceId}/factura.pdf`);
  await pdfFile.save(pdfBuffer, {
    metadata: {contentType: "application/pdf"},
  });
  const pdfURL = await pdfFile.getSignedUrl({
    action: "read",
    expires: "03-01-2500",
  });

  return {
    xmlURL: xmlURL[0],
    pdfURL: pdfURL[0],
  };
}

/**
 * Enviar email con Gmail
 * @param {object} invoiceData - Datos de la factura
 * @param {object} urls - URLs de XML y PDF
 * @return {Promise<void>}
 */
async function enviarEmail(invoiceData, urls) {
  const transporter = nodemailer.createTransport(EMAIL_CONFIG);

  const mailOptions = {
    from: "HotFact <yepzhi@gmail.com>",
    to: invoiceData.receptor.email,
    subject: `Factura Electrónica - ${invoiceData.emisor.nombre}`,
    html: `
      <h2>Tu Factura Electrónica</h2>
      <p>Estimado(a) <strong>${invoiceData.receptor.nombre}</strong>,</p>
      <p>Adjuntamos tu factura electrónica:</p>
      <ul>
        <li>RFC Emisor: ${invoiceData.emisor.rfc}</li>
        <li>Monto Total: $${invoiceData.totales.total.toFixed(2)} MXN</li>
      </ul>
      <p>Descarga tus archivos:</p>
      <p>
        <a href="${urls.xmlURL}">Descargar XML</a> |
        <a href="${urls.pdfURL}">Descargar PDF</a>
      </p>
      <p><small>
        Este correo fue generado automáticamente por HotFact
      </small></p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

/**
 * Trigger automático cuando se crea una solicitud de factura
 * (Opcional - por si quieres timbrado automático)
 */
exports.procesarFacturaAutomatica = onDocumentCreated(
    "invoiceRequests/{docId}",
    async (event) => {
      const snapshot = event.data;
      if (!snapshot) return;

      const invoiceData = snapshot.data();

      // Solo procesar si está pendiente
      if (invoiceData.status !== "pendiente_timbrado") {
        return;
      }

      // Aquí podrías llamar automáticamente a timbrarFactura
      // Por ahora dejamos que sea manual desde el dashboard
      console.log("Nueva solicitud de factura:", snapshot.id);
    },
);