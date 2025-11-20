// functions/index.js - CON LOGGING DETALLADO

const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const axios = require("axios");
const {parseStringPromise, Builder} = require("xml2js");

admin.initializeApp();

// ==========================================
// CONFIGURACIÓN FINKOK
// ==========================================
const FINKOK_CONFIG = {
  username: "yepzhi@gmail.com",
  password: "Apple2014",
  stampUrl: "http://demo-facturacion.finkok.com/servicios/soap/stamp.wsdl",
  cancelUrl: "http://demo-facturacion.finkok.com/servicios/soap/cancel.wsdl",
};

console.log("🔥 Cloud Functions inicializadas con FINKOK");

// ==========================================
// 1. VALIDAR RFC
// ==========================================
exports.validarRFC = onRequest(async (req, res) => {
  console.log("📞 validarRFC llamado");
  
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    console.log("✅ CORS preflight exitoso");
    return res.status(204).send("");
  }

  const {rfc} = req.body;
  console.log("🔍 Validando RFC:", rfc);

  if (!rfc) {
    console.log("❌ RFC no proporcionado");
    return res.status(400).json({error: "RFC es requerido"});
  }

  try {
    const rfcPattern = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;
    const isValid = rfcPattern.test(rfc);
    
    console.log(`${isValid ? "✅" : "❌"} RFC ${rfc} - Válido: ${isValid}`);

    return res.json({
      valid: isValid,
      rfc: rfc,
      message: isValid ? "RFC válido" : "Formato de RFC inválido",
    });
  } catch (error) {
    console.error("💥 Error validando RFC:", error);
    return res.status(500).json({
      valid: false,
      error: "Error al validar RFC",
    });
  }
});

// ==========================================
// 2. GENERAR XML CFDI 4.0
// ==========================================
function generarXMLCFDI(datos) {
  console.log("📄 Generando XML CFDI 4.0");
  console.log("Emisor:", datos.emisor.rfc);
  console.log("Receptor:", datos.receptor.rfc);
  console.log("Total:", datos.totales.total);

  const {emisor, receptor, conceptos, totales, cfdi} = datos;
  const fecha = new Date().toISOString();

  const cfdiData = {
    "cfdi:Comprobante": {
      $: {
        "xmlns:cfdi": "http://www.sat.gob.mx/cfd/4",
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xsi:schemaLocation": "http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd",
        Version: "4.0",
        Fecha: fecha,
        Sello: "",
        FormaPago: cfdi.formaPago,
        NoCertificado: "",
        Certificado: "",
        SubTotal: totales.subtotal.toFixed(2),
        Moneda: cfdi.moneda,
        Total: totales.total.toFixed(2),
        TipoDeComprobante: "I",
        Exportacion: "01",
        MetodoPago: cfdi.metodoPago,
        LugarExpedicion: receptor.cp,
      },
      "cfdi:Emisor": {
        $: {
          Rfc: emisor.rfc,
          Nombre: emisor.nombre,
          RegimenFiscal: "626",
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
        "cfdi:Concepto": conceptos.map((concepto) => ({
          $: {
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
                  Importe: totales.iva.toFixed(2),
                },
              },
            },
          },
        })),
      },
      "cfdi:Impuestos": {
        $: {
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
    xmldec: {version: "1.0", encoding: "UTF-8"},
  });

  const xml = builder.buildObject(cfdiData);
  console.log("✅ XML generado correctamente");
  console.log("XML preview:", xml.substring(0, 200) + "...");
  
  return xml;
}

// ==========================================
// 3. TIMBRAR CON FINKOK
// ==========================================
async function timbrarConFinkok(xmlSinTimbrar) {
  console.log("🔥 Iniciando timbrado con FINKOK");
  
  try {
    const xmlBase64 = Buffer.from(xmlSinTimbrar).toString("base64");
    console.log("✅ XML convertido a Base64");

    const soapRequest = `<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://facturacion.finkok.com/stamp">
  <SOAP-ENV:Body>
    <ns1:stamp>
      <ns1:xml>${xmlBase64}</ns1:xml>
      <ns1:username>${FINKOK_CONFIG.username}</ns1:username>
      <ns1:password>${FINKOK_CONFIG.password}</ns1:password>
    </ns1:stamp>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;

    console.log("📤 Enviando request a FINKOK...");
    console.log("URL:", FINKOK_CONFIG.stampUrl);
    console.log("Usuario:", FINKOK_CONFIG.username);

    const response = await axios.post(FINKOK_CONFIG.stampUrl, soapRequest, {
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        "SOAPAction": "stamp",
      },
      timeout: 30000, // 30 segundos
    });

    console.log("📥 Respuesta recibida de FINKOK");
    console.log("Status:", response.status);
    console.log("Response preview:", response.data.substring(0, 500));

    const result = await parseStringPromise(response.data);
    console.log("✅ Respuesta SOAP parseada");

    const envelope = result["SOAP-ENV:Envelope"] || result["soap:Envelope"] || result["s:Envelope"];
    if (!envelope) {
      console.error("❌ No se encontró envelope SOAP");
      console.error("Respuesta completa:", JSON.stringify(result, null, 2));
      throw new Error("Respuesta SOAP inválida");
    }

    const body = envelope["SOAP-ENV:Body"] || envelope["soap:Body"] || envelope["s:Body"];
    if (!body || !body[0]) {
      console.error("❌ No se encontró body SOAP");
      throw new Error("Body SOAP inválido");
    }

    const stampResult = body[0]["ns1:stampResult"] || body[0]["stampResult"];
    if (!stampResult || !stampResult[0]) {
      console.error("❌ No se encontró stampResult");
      console.error("Body:", JSON.stringify(body, null, 2));
      throw new Error("stampResult no encontrado");
    }

    const result0 = stampResult[0];
    console.log("stampResult encontrado:", Object.keys(result0));

    if (result0.xml && result0.xml[0]) {
      const xmlTimbrado = Buffer.from(result0.xml[0], "base64").toString("utf-8");
      const uuid = result0.UUID ? result0.UUID[0] : null;
      const fecha = result0.Fecha ? result0.Fecha[0] : null;

      console.log("🎉 TIMBRADO EXITOSO!");
      console.log("UUID:", uuid);
      console.log("Fecha:", fecha);

      return {
        success: true,
        xml: xmlTimbrado,
        uuid: uuid,
        fecha: fecha,
      };
    } else {
      // Error en timbrado
      const codEstatus = result0.CodEstatus ? result0.CodEstatus[0] : "desconocido";
      const mensaje = result0.Mensaje ? result0.Mensaje[0] : "Error desconocido";
      
      console.error("❌ Error al timbrar");
      console.error("Código:", codEstatus);
      console.error("Mensaje:", mensaje);

      return {
        success: false,
        error: `${codEstatus}: ${mensaje}`,
      };
    }
  } catch (error) {
    console.error("💥 Error en timbrado FINKOK:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    return {
      success: false,
      error: error.message,
    };
  }
}

// ==========================================
// 4. GENERAR PDF
// ==========================================
function generarPDFBase64(datos, uuid) {
  console.log("📑 Generando PDF para UUID:", uuid);
  
  const pdfContent = `
FACTURA ELECTRÓNICA
==================
UUID: ${uuid}
Fecha: ${new Date().toLocaleString("es-MX")}

EMISOR
------
${datos.emisor.nombre}
RFC: ${datos.emisor.rfc}

RECEPTOR
--------
${datos.receptor.nombre}
RFC: ${datos.receptor.rfc}
Correo: ${datos.receptor.email}

CONCEPTOS
---------
${datos.conceptos.map((c) => `- ${c.descripcion} x${c.cantidad}: $${c.subtotal.toFixed(2)}`).join("\n")}

TOTALES
-------
Subtotal: $${datos.totales.subtotal.toFixed(2)}
IVA 16%:  $${datos.totales.iva.toFixed(2)}
TOTAL:    $${datos.totales.total.toFixed(2)} MXN

Este es un comprobante fiscal digital por Internet
`;

  console.log("✅ PDF generado (texto plano)");
  return Buffer.from(pdfContent).toString("base64");
}

// ==========================================
// 5. FUNCIÓN PRINCIPAL HTTP
// ==========================================
exports.timbrarFactura = onRequest(async (req, res) => {
  console.log("🔥 timbrarFactura llamado");
  console.log("Method:", req.method);
  console.log("Headers:", JSON.stringify(req.headers));
  
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    console.log("✅ CORS preflight");
    return res.status(204).send("");
  }

  const datos = req.body;
  console.log("📦 Datos recibidos:");
  console.log("- Emisor:", datos.emisor?.rfc);
  console.log("- Receptor:", datos.receptor?.rfc);
  console.log("- Total:", datos.totales?.total);

  try {
    // 1. Validar datos
    if (!datos.emisor || !datos.receptor || !datos.totales) {
      console.error("❌ Datos incompletos");
      return res.status(400).json({
        success: false,
        error: "Datos incompletos: emisor, receptor y totales son requeridos",
      });
    }

    // 2. Generar XML
    console.log("📄 PASO 1: Generando XML...");
    const xmlSinTimbrar = generarXMLCFDI(datos);

    // 3. Timbrar
    console.log("🔥 PASO 2: Timbrando con FINKOK...");
    const resultadoTimbrado = await timbrarConFinkok(xmlSinTimbrar);

    if (!resultadoTimbrado.success) {
      console.error("❌ Timbrado falló:", resultadoTimbrado.error);
      return res.status(400).json({
        success: false,
        error: resultadoTimbrado.error,
      });
    }

    // 4. Generar PDF
    console.log("📑 PASO 3: Generando PDF...");
    const pdfBase64 = generarPDFBase64(datos, resultadoTimbrado.uuid);

    // 5. Guardar en Firestore
    console.log("💾 PASO 4: Guardando en Firestore...");
    const xmlBase64 = Buffer.from(resultadoTimbrado.xml).toString("base64");

    await admin.firestore().collection("invoices").add({
      businessId: datos.businessId,
      folioId: datos.folioId || null,
      type: datos.type || "from_folio",
      uuid: resultadoTimbrado.uuid,
      emisor: datos.emisor,
      receptor: datos.receptor,
      totales: datos.totales,
      status: "timbrada",
      xmlBase64: xmlBase64,
      pdfBase64: pdfBase64,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("🎉 FACTURA TIMBRADA Y GUARDADA EXITOSAMENTE!");
    console.log("UUID:", resultadoTimbrado.uuid);

    // 6. Retornar resultado
    return res.json({
      success: true,
      uuid: resultadoTimbrado.uuid,
      xml: xmlBase64,
      pdf: pdfBase64,
      message: "Factura timbrada exitosamente",
    });
  } catch (error) {
    console.error("💥 ERROR FATAL en timbrarFactura:", error);
    console.error("Stack:", error.stack);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ==========================================
// 6. TRIGGER AUTOMÁTICO FIRESTORE
// ==========================================
exports.procesarfacturaautomatica = onDocumentCreated(
    "invoiceRequests/{requestId}",
    async (event) => {
      const datos = event.data.data();
      const requestId = event.params.requestId;

      console.log("🤖 Nueva solicitud de factura:", requestId);
      console.log("Datos:", JSON.stringify(datos, null, 2));

      try {
        console.log("📄 Generando XML...");
        const xmlSinTimbrar = generarXMLCFDI(datos);

        console.log("🔥 Timbrando...");
        const resultadoTimbrado = await timbrarConFinkok(xmlSinTimbrar);

        if (!resultadoTimbrado.success) {
          console.error("❌ Error al timbrar:", resultadoTimbrado.error);
          await event.data.ref.update({
            status: "error_timbrado",
            error: resultadoTimbrado.error,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
          return;
        }

        console.log("📑 Generando PDF...");
        const pdfBase64 = generarPDFBase64(datos, resultadoTimbrado.uuid);
        const xmlBase64 = Buffer.from(resultadoTimbrado.xml).toString("base64");

        console.log("💾 Guardando factura...");
        await admin.firestore().collection("invoices").add({
          businessId: datos.businessId,
          folioId: datos.folioId || null,
          type: datos.type || "direct",
          uuid: resultadoTimbrado.uuid,
          emisor: datos.emisor,
          receptor: datos.receptor,
          totales: datos.totales,
          status: "timbrada",
          xmlBase64: xmlBase64,
          pdfBase64: pdfBase64,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        console.log("✅ Actualizando request...");
        await event.data.ref.update({
          status: "timbrada",
          uuid: resultadoTimbrado.uuid,
          processedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        if (datos.folioId) {
          console.log("✅ Actualizando folio...");
          await admin.firestore().collection("folios").doc(datos.folioId).update({
            status: "completed",
            uuid: resultadoTimbrado.uuid,
          });
        }

        console.log("🎉 Factura procesada exitosamente:", resultadoTimbrado.uuid);
      } catch (error) {
        console.error("💥 Error procesando factura:", error);
        console.error("Stack:", error.stack);
        await event.data.ref.update({
          status: "error",
          error: error.message,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
    },
);

console.log("✅ Todas las funciones exportadas correctamente");