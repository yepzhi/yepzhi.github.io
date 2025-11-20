const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {defineSecret} = require("firebase-functions/params");
const admin = require("firebase-admin");
const axios = require("axios");
const {parseStringPromise, Builder} = require("xml2js");

admin.initializeApp();

// ==========================================
// SECRETOS (Configurar con firebase functions:secrets:set)
// ==========================================
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

const CURRENT_ENV = "demo"; // Cambiar a "prod" para producción

console.log(`🔥 HotFact Functions [${CURRENT_ENV}] inicializadas`);

// ==========================================
// 1. VALIDAR RFC
// ==========================================
exports.validarRFC = onRequest(async (req, res) => {
  console.log("📞 validarRFC llamado");
  
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  const {rfc} = req.body;

  if (!rfc) {
    return res.status(400).json({error: "RFC es requerido"});
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
    return res.status(500).json({valid: false, error: "Error interno"});
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
  const fecha = new Date().toISOString().split(".")[0];

  // Validar que exista CP del emisor
  if (!emisor.cp) {
    console.warn("⚠️ CP del emisor no proporcionado, usando default");
  }

  const conceptosProcesados = conceptos.map((concepto) => {
    const importeIvaConcepto = concepto.subtotal * 0.16;
    
    return {
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
              Importe: importeIvaConcepto.toFixed(2),
            },
          },
        },
      },
    };
  });

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
        LugarExpedicion: emisor.cp || "83000", // ⬅️ CORREGIDO con default
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
  console.log("✅ XML generado:", xml.length, "bytes");
  
  return xml;
}

// ==========================================
// 3. TIMBRAR CON FINKOK
// ==========================================
async function timbrarConFinkok(xmlSinTimbrar, username, password) {
  console.log("🔥 Conectando con FINKOK");
  const urlToUse = FINKOK_URLS[CURRENT_ENV].stamp;
  console.log("URL:", urlToUse);
  console.log("Usuario:", username);
  
  try {
    const xmlBase64 = Buffer.from(xmlSinTimbrar).toString("base64");
    console.log("✅ XML convertido a Base64");

    const soapRequest = `<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://facturacion.finkok.com/stamp">
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
    
    const envelope = result["SOAP-ENV:Envelope"] || result["soap:Envelope"] || result["s:Envelope"];
    const body = envelope ? (envelope["SOAP-ENV:Body"] || envelope["soap:Body"] || envelope["s:Body"]) : null;
    const stampResult = (body && body[0]) ? (body[0]["ns1:stampResult"] || body[0]["stampResult"]) : null;

    if (!stampResult || !stampResult[0]) {
      console.error("❌ Respuesta SOAP inválida");
      console.error("Estructura:", JSON.stringify(result, null, 2).substring(0, 500));
      throw new Error("Respuesta de FINKOK irreconocible");
    }

    const resultData = stampResult[0];
    console.log("📦 stampResult recibido:", Object.keys(resultData));

    if (resultData.xml && resultData.xml[0]) {
      const uuid = resultData.UUID ? resultData.UUID[0] : "SIN-UUID";
      const fecha = resultData.Fecha ? resultData.Fecha[0] : new Date().toISOString();
      
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
      const msg = resultData.Mensaje ? resultData.Mensaje[0] : "Error desconocido";
      
      console.error("❌ Error de FINKOK");
      console.error("Código:", cod);
      console.error("Mensaje:", msg);
      
      return { 
        success: false, 
        error: `[${cod}] ${msg}` 
      };
    }

  } catch (error) {
    console.error("💥 Excepción en timbrado:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data?.substring(0, 500));
    }
    return { 
      success: false, 
      error: error.message 
    };
  }
}

// ==========================================
// 4. GENERAR PDF
// ==========================================
function generarPDFBase64(datos, uuid) {
  console.log("📑 Generando PDF para UUID:", uuid);
  
  const pdfContent = `
  --------------------------------------------------
               FACTURA ELECTRÓNICA (CFDI 4.0)
  --------------------------------------------------
  UUID:   ${uuid}
  Fecha:  ${new Date().toLocaleString("es-MX")}
  
  EMISOR:   ${datos.emisor.nombre} (${datos.emisor.rfc})
  RECEPTOR: ${datos.receptor.nombre} (${datos.receptor.rfc})
  
  CONCEPTOS:
  ${datos.conceptos.map((c) => `  * ${c.descripcion} [x${c.cantidad}] ... $${c.subtotal.toFixed(2)}`).join("\n")}
  
  Subtotal: $${datos.totales.subtotal.toFixed(2)}
  IVA 16%:  $${datos.totales.iva.toFixed(2)}
  TOTAL:    $${datos.totales.total.toFixed(2)} ${datos.cfdi.moneda}
  --------------------------------------------------
  Este documento es una representación impresa de un CFDI.
  `;

  console.log("✅ PDF generado");
  return Buffer.from(pdfContent).toString("base64");
}

// ==========================================
// 5. FUNCIÓN PRINCIPAL HTTP
// ==========================================
exports.timbrarFactura = onRequest(
  { secrets: [finkokUsername, finkokPassword] },
  async (req, res) => {
    console.log("🔥 timbrarFactura HTTP llamado");
    
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    
    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    const datos = req.body;
    console.log("📦 Datos recibidos:");
    console.log("- Emisor:", datos.emisor?.rfc);
    console.log("- Receptor:", datos.receptor?.rfc);
    console.log("- Total:", datos.totales?.total);

    try {
      if (!datos.emisor || !datos.receptor || !datos.totales) {
        console.error("❌ Datos incompletos");
        return res.status(400).json({
          success: false, 
          error: "Datos incompletos: emisor, receptor y totales requeridos"
        });
      }

      console.log("📄 PASO 1: Generando XML...");
      const xmlSinTimbrar = generarXMLCFDI(datos);

      console.log("🔥 PASO 2: Timbrando con FINKOK...");
      const resultado = await timbrarConFinkok(
        xmlSinTimbrar, 
        finkokUsername.value(), 
        finkokPassword.value()
      );

      if (!resultado.success) {
        console.error("❌ Timbrado falló:", resultado.error);
        return res.status(400).json(resultado);
      }

      console.log("📑 PASO 3: Generando PDF...");
      const pdfBase64 = generarPDFBase64(datos, resultado.uuid);
      const xmlBase64 = Buffer.from(resultado.xml).toString("base64");

      console.log("💾 PASO 4: Guardando en Firestore...");
      await admin.firestore().collection("invoices").add({
        businessId: datos.businessId,
        folioId: datos.folioId || null,
        type: datos.type || "from_folio",
        uuid: resultado.uuid,
        emisor: datos.emisor,
        receptor: datos.receptor,
        totales: datos.totales,
        status: "timbrada",
        xmlBase64: xmlBase64,
        pdfBase64: pdfBase64,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log("🎉 FACTURA TIMBRADA EXITOSAMENTE!");
      console.log("UUID:", resultado.uuid);

      return res.json({
        success: true,
        uuid: resultado.uuid,
        xml: xmlBase64,
        pdf: pdfBase64,
        message: "Factura timbrada exitosamente",
      });

    } catch (error) {
      console.error("💥 ERROR FATAL:", error.message);
      console.error("Stack:", error.stack);
      return res.status(500).json({
        success: false, 
        error: error.message
      });
    }
  }
);

// ==========================================
// 6. TRIGGER AUTOMÁTICO FIRESTORE
// ==========================================
exports.procesarfacturaautomatica = onDocumentCreated(
  { 
    document: "invoiceRequests/{requestId}",
    secrets: [finkokUsername, finkokPassword]
  },
  async (event) => {
    const datos = event.data.data();
    const requestId = event.params.requestId;
    
    if (!datos) {
      console.log("⚠️ Documento sin datos");
      return;
    }

    console.log("🤖 Procesando automático:", requestId);
    console.log("Emisor:", datos.emisor?.rfc);
    console.log("Receptor:", datos.receptor?.rfc);

    try {
      console.log("📄 Generando XML...");
      const xmlSinTimbrar = generarXMLCFDI(datos);
      
      console.log("🔥 Timbrando...");
      const resultado = await timbrarConFinkok(
        xmlSinTimbrar, 
        finkokUsername.value(), 
        finkokPassword.value()
      );

      if (!resultado.success) {
        console.error("❌ Error:", resultado.error);
        await event.data.ref.update({
          status: "error_timbrado",
          error: resultado.error,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        return;
      }

      console.log("📑 Generando PDF...");
      const pdfBase64 = generarPDFBase64(datos, resultado.uuid);
      const xmlBase64 = Buffer.from(resultado.xml).toString("base64");

      console.log("💾 Guardando factura...");
      await admin.firestore().collection("invoices").add({
        businessId: datos.businessId || "unknown",
        folioId: datos.folioId || null,
        type: datos.type || "direct",
        uuid: resultado.uuid,
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
        uuid: resultado.uuid,
        processedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      if (datos.folioId) {
        console.log("✅ Actualizando folio...");
        await admin.firestore().collection("folios").doc(datos.folioId).update({
          status: "completed",
          uuid: resultado.uuid,
        });
      }

      console.log("🎉 Factura procesada:", resultado.uuid);

    } catch (error) {
      console.error("💥 Error fatal:", error.message);
      console.error("Stack:", error.stack);
      await event.data.ref.update({ 
        status: "error_fatal", 
        error: error.message,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  }
);

console.log("✅ Todas las funciones exportadas correctamente");