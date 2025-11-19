// functions/index.js - COMPLETO CON FINKOK

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
  // URLs de ambiente DEMO
  stampUrl: "http://demo-facturacion.finkok.com/servicios/soap/stamp.wsdl",
  cancelUrl: "http://demo-facturacion.finkok.com/servicios/soap/cancel.wsdl",
  validationUrl: "http://demo-facturacion.finkok.com/servicios/soap/registration.wsdl",
};

// ==========================================
// 1. VALIDAR RFC CON SAT/FINKOK
// ==========================================
exports.validarRFC = onRequest(async (req, res) => {
  // Habilitar CORS
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
    // Validación básica de formato RFC
    const rfcPattern = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;
    if (!rfcPattern.test(rfc)) {
      return res.json({
        valid: false,
        message: "Formato de RFC inválido",
      });
    }

    // TODO: Integrar con API del SAT o FINKOK para validación real
    // Por ahora validamos formato solamente

    return res.json({
      valid: true,
      rfc: rfc,
      message: "RFC válido",
    });
  } catch (error) {
    console.error("Error validando RFC:", error);
    return res.status(500).json({
      valid: false,
      error: "Error al validar RFC",
    });
  }
});

// ==========================================
// 2. GENERAR XML DEL CFDI
// ==========================================
function generarXMLCFDI(datos) {
  const {emisor, receptor, conceptos, totales, cfdi} = datos;

  // Fecha actual en formato ISO
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

  return builder.buildObject(cfdiData);
}

// ==========================================
// 3. TIMBRAR CON FINKOK
// ==========================================
async function timbrarConFinkok(xmlSinTimbrar, rfcEmisor) {
  try {
    // Codificar XML en Base64
    const xmlBase64 = Buffer.from(xmlSinTimbrar).toString("base64");

    // Crear SOAP Request para FINKOK
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

    // Enviar a FINKOK
    const response = await axios.post(FINKOK_CONFIG.stampUrl, soapRequest, {
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        "SOAPAction": "stamp",
      },
    });

    // Parsear respuesta SOAP
    const result = await parseStringPromise(response.data);
    const stampResult = result["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0]["ns1:stampResult"][0];

    if (stampResult.xml) {
      // Decodificar XML timbrado
      const xmlTimbrado = Buffer.from(stampResult.xml[0], "base64").toString("utf-8");

      return {
        success: true,
        xml: xmlTimbrado,
        uuid: stampResult.UUID ? stampResult.UUID[0] : null,
        fecha: stampResult.Fecha ? stampResult.Fecha[0] : null,
      };
    } else {
      return {
        success: false,
        error: stampResult.CodEstatus || "Error desconocido al timbrar",
      };
    }
  } catch (error) {
    console.error("Error en timbrado FINKOK:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ==========================================
// 4. GENERAR PDF (Simplificado)
// ==========================================
function generarPDFBase64(datos, uuid) {
  // Por ahora retornamos un PDF simple en base64
  // TODO: Implementar generación real de PDF con librería como PDFKit
  const pdfContent = `
FACTURA ELECTRÓNICA
==================
UUID: ${uuid}
Emisor: ${datos.emisor.nombre}
RFC Emisor: ${datos.emisor.rfc}
Receptor: ${datos.receptor.nombre}
RFC Receptor: ${datos.receptor.rfc}
Total: $${datos.totales.total.toFixed(2)} MXN
`;

  return Buffer.from(pdfContent).toString("base64");
}

// ==========================================
// 5. FUNCIÓN PRINCIPAL DE TIMBRADO
// ==========================================
exports.timbrarFactura = onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  const datos = req.body;

  try {
    // 1. Generar XML sin timbrar
    const xmlSinTimbrar = generarXMLCFDI(datos);

    // 2. Timbrar con FINKOK
    const resultadoTimbrado = await timbrarConFinkok(
        xmlSinTimbrar,
        datos.emisor.rfc,
    );

    if (!resultadoTimbrado.success) {
      return res.status(400).json({
        success: false,
        error: resultadoTimbrado.error,
      });
    }

    // 3. Generar PDF
    const pdfBase64 = generarPDFBase64(datos, resultadoTimbrado.uuid);

    // 4. Convertir XML a Base64
    const xmlBase64 = Buffer.from(resultadoTimbrado.xml).toString("base64");

    // 5. Guardar en Firestore
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

    // 6. Retornar archivos
    return res.json({
      success: true,
      uuid: resultadoTimbrado.uuid,
      xml: xmlBase64,
      pdf: pdfBase64,
      message: "Factura timbrada exitosamente",
    });
  } catch (error) {
    console.error("Error en timbrarFactura:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ==========================================
// 6. PROCESAR AUTOMÁTICO AL CREAR INVOICE REQUEST
// ==========================================
exports.procesarFacturaAutomatica = onDocumentCreated(
    "invoiceRequests/{requestId}",
    async (event) => {
      const datos = event.data.data();
      const requestId = event.params.requestId;

      try {
        console.log("Procesando factura automática:", requestId);

        // Generar XML
        const xmlSinTimbrar = generarXMLCFDI(datos);

        // Timbrar
        const resultadoTimbrado = await timbrarConFinkok(
            xmlSinTimbrar,
            datos.emisor.rfc,
        );

        if (!resultadoTimbrado.success) {
          await event.data.ref.update({
            status: "error_timbrado",
            error: resultadoTimbrado.error,
          });
          return;
        }

        // Generar PDF
        const pdfBase64 = generarPDFBase64(datos, resultadoTimbrado.uuid);
        const xmlBase64 = Buffer.from(resultadoTimbrado.xml).toString("base64");

        // Guardar factura timbrada
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

        // Actualizar request
        await event.data.ref.update({
          status: "timbrada",
          uuid: resultadoTimbrado.uuid,
          processedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        // Marcar folio como completado si existe
        if (datos.folioId) {
          await admin.firestore().collection("folios").doc(datos.folioId).update({
            status: "completed",
            uuid: resultadoTimbrado.uuid,
          });
        }

        console.log("Factura procesada exitosamente:", resultadoTimbrado.uuid);
      } catch (error) {
        console.error("Error procesando factura:", error);
        await event.data.ref.update({
          status: "error",
          error: error.message,
        });
      }
    },
);