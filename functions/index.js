const {onRequest} = require("firebase-functions/v2/https");
const {onCall} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {defineSecret} = require("firebase-functions/params");
const admin = require("firebase-admin");
const axios = require("axios");
const {parseStringPromise, Builder} = require("xml2js");
const PDFDocument = require("pdfkit"); // ⬅️ AÑADIR ESTA LIBRERÍA

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

const CURRENT_ENV = "demo"; // Cambiar a "prod" para producción

console.log(`🔥 HotFact Functions [${CURRENT_ENV}] inicializadas`);

// ==========================================
// FUNCIÓN AUXILIAR: GENERAR PDF REAL
// ==========================================
async function generarPDFReal(datos, uuid) {
  console.log("📑 Generando PDF REAL para UUID:", uuid);
  
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];
    
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      console.log("✅ PDF generado:", pdfBuffer.length, "bytes");
      resolve(pdfBuffer);
    });
    doc.on('error', reject);
    
    try {
      // Encabezado
      doc.fontSize(24).fillColor('#667eea').text('FACTURA ELECTRÓNICA', { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(10).fillColor('#666').text('Comprobante Fiscal Digital por Internet (CFDI 4.0)', { align: 'center' });
      doc.moveDown();
      
      // Línea divisoria
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke('#ddd');
      doc.moveDown();
      
      // UUID
      doc.fontSize(9).fillColor('#333').text('UUID:', { continued: true, bold: true });
      doc.fontSize(8).fillColor('#666').text(` ${uuid}`);
      doc.fontSize(9).fillColor('#333').text('Fecha de emisión:', { continued: true });
      doc.fontSize(8).fillColor('#666').text(` ${new Date().toLocaleString('es-MX')}`);
      doc.moveDown(1.5);
      
      // EMISOR
      doc.fontSize(12).fillColor('#667eea').text('EMISOR', { underline: true });
      doc.moveDown(0.3);
      doc.fontSize(10).fillColor('#333').text(datos.emisor.nombre, { bold: true });
      doc.fontSize(9).fillColor('#666').text(`RFC: ${datos.emisor.rfc}`);
      doc.text(`Régimen Fiscal: ${datos.emisor.regimenFiscal}`);
      doc.moveDown(1);
      
      // RECEPTOR
      doc.fontSize(12).fillColor('#667eea').text('RECEPTOR', { underline: true });
      doc.moveDown(0.3);
      doc.fontSize(10).fillColor('#333').text(datos.receptor.nombre, { bold: true });
      doc.fontSize(9).fillColor('#666').text(`RFC: ${datos.receptor.rfc}`);
      doc.text(`Uso CFDI: ${datos.cfdi.usoCFDI}`);
      doc.text(`Email: ${datos.receptor.email || 'N/A'}`);
      doc.moveDown(1.5);
      
      // CONCEPTOS
      doc.fontSize(12).fillColor('#667eea').text('CONCEPTOS', { underline: true });
      doc.moveDown(0.5);
      
      // Tabla de conceptos
      const tableTop = doc.y;
      doc.fontSize(9).fillColor('#333');
      doc.text('Cant.', 50, tableTop, { width: 40, bold: true });
      doc.text('Descripción', 100, tableTop, { width: 250, bold: true });
      doc.text('P. Unit.', 360, tableTop, { width: 80, align: 'right', bold: true });
      doc.text('Importe', 450, tableTop, { width: 90, align: 'right', bold: true });
      
      doc.moveDown(0.3);
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke('#ddd');
      doc.moveDown(0.3);
      
      datos.conceptos.forEach((concepto) => {
        const y = doc.y;
        doc.fontSize(9).fillColor('#666');
        doc.text(concepto.cantidad, 50, y, { width: 40 });
        doc.text(concepto.descripcion, 100, y, { width: 250 });
        doc.text(`$${concepto.precioUnitario.toFixed(2)}`, 360, y, { width: 80, align: 'right' });
        doc.text(`$${concepto.subtotal.toFixed(2)}`, 450, y, { width: 90, align: 'right' });
        doc.moveDown(0.8);
      });
      
      doc.moveDown(0.5);
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke('#ddd');
      doc.moveDown(1);
      
      // TOTALES
      doc.fontSize(10).fillColor('#333');
      const totalsX = 400;
      doc.text('Subtotal:', totalsX, doc.y, { width: 100, align: 'left' });
      doc.text(`$${datos.totales.subtotal.toFixed(2)}`, totalsX + 100, doc.y, { width: 90, align: 'right' });
      doc.moveDown(0.5);
      
      doc.text('IVA (16%):', totalsX, doc.y, { width: 100, align: 'left' });
      doc.text(`$${datos.totales.iva.toFixed(2)}`, totalsX + 100, doc.y, { width: 90, align: 'right' });
      doc.moveDown(0.8);
      
      doc.fontSize(14).fillColor('#667eea');
      doc.text('TOTAL:', totalsX, doc.y, { width: 100, align: 'left', bold: true });
      doc.text(`$${datos.totales.total.toFixed(2)} ${datos.cfdi.moneda}`, totalsX + 100, doc.y, { width: 90, align: 'right', bold: true });
      
      // Pie de página
      doc.moveDown(3);
      doc.fontSize(8).fillColor('#999').text(
        'Este documento es una representación impresa de un CFDI',
        { align: 'center' }
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
async function guardarEnStorage(xmlContent, pdfBuffer, uuid, businessId) {
  console.log("💾 Guardando archivos en Storage...");
  
  const bucket = admin.storage().bucket();
  const xmlPath = `facturas/${businessId}/${uuid}.xml`;
  const pdfPath = `facturas/${businessId}/${uuid}.pdf`;
  
  // Guardar XML
  const xmlFile = bucket.file(xmlPath);
  await xmlFile.save(xmlContent, {
    contentType: 'application/xml',
    metadata: {
      cacheControl: 'public, max-age=31536000',
    }
  });
  
  // Guardar PDF
  const pdfFile = bucket.file(pdfPath);
  await pdfFile.save(pdfBuffer, {
    contentType: 'application/pdf',
    metadata: {
      cacheControl: 'public, max-age=31536000',
    }
  });
  
  // Hacer públicos los archivos
  await xmlFile.makePublic();
  await pdfFile.makePublic();
  
  // Obtener URLs públicas
  const xmlUrl = `https://storage.googleapis.com/${bucket.name}/${xmlPath}`;
  const pdfUrl = `https://storage.googleapis.com/${bucket.name}/${pdfPath}`;
  
  console.log("✅ Archivos guardados");
  console.log("XML URL:", xmlUrl);
  console.log("PDF URL:", pdfUrl);
  
  return { xmlUrl, pdfUrl };
}

// ==========================================
// NUEVA FUNCIÓN: timbrarFacturaInmediata (onCall)
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
      // 1. Obtener certificados
      const certDoc = await admin.firestore()
        .collection('certificates')
        .doc(cfdiData.businessId)
        .get();
      
      if (!certDoc.exists) {
        throw new Error("No se encontraron certificados");
      }
      
      // 2. Generar XML
      console.log("📄 Generando XML...");
      const xmlSinTimbrar = generarXMLCFDI(cfdiData);
      
      // 3. Timbrar con Finkok
      console.log("🔥 Timbrando con Finkok...");
      const resultado = await timbrarConFinkok(
        xmlSinTimbrar,
        finkokUsername.value(),
        finkokPassword.value()
      );
      
      if (!resultado.success) {
        throw new Error(resultado.error);
      }
      
      // 4. Generar PDF REAL
      console.log("📑 Generando PDF...");
      const pdfBuffer = await generarPDFReal(cfdiData, resultado.uuid);
      
      // 5. Guardar en Storage
      console.log("💾 Guardando en Storage...");
      const { xmlUrl, pdfUrl } = await guardarEnStorage(
        resultado.xml,
        pdfBuffer,
        resultado.uuid,
        cfdiData.businessId
      );
      
      // 6. Guardar referencia en Firestore
      await admin.firestore().collection('invoices').add({
        businessId: cfdiData.businessId,
        uuid: resultado.uuid,
        xmlUrl: xmlUrl,
        pdfUrl: pdfUrl,
        emisor: cfdiData.emisor,
        receptor: cfdiData.receptor,
        totales: cfdiData.totales,
        status: 'timbrado',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      
      console.log("🎉 Factura timbrada exitosamente!");
      
      return {
        success: true,
        uuid: resultado.uuid,
        xmlUrl: xmlUrl,
        pdfUrl: pdfUrl
      };
      
    } catch (error) {
      console.error("💥 Error:", error);
      return {
        success: false,
        error: error.message
      };
    }
  }
);

// ==========================================
// MANTENER TUS FUNCIONES EXISTENTES
// ==========================================
exports.validarRFC = onRequest(async (req, res) => {
  // ... tu código existente
});

exports.timbrarFactura = onRequest(
  { secrets: [finkokUsername, finkokPassword] },
  async (req, res) => {
    // ... tu código existente pero actualizado para usar Storage
  }
);

exports.procesarfacturaautomatica = onDocumentCreated(
  { 
    document: "invoiceRequests/{requestId}",
    secrets: [finkokUsername, finkokPassword]
  },
  async (event) => {
    // ... tu código existente
  }
);

// TUS FUNCIONES AUXILIARES EXISTENTES
function generarXMLCFDI(datos) {
  // ... tu código existente (está perfecto)
}

async function timbrarConFinkok(xmlSinTimbrar, username, password) {
  // ... tu código existente (está perfecto)
}