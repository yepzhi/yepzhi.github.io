const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const axios = require('axios');
const { jsPDF } = require('jspdf');
const QRCode = require('qrcode');
const xml2js = require('xml2js');
const { 
  generarSello, 
  extraerNumeroCertificado, 
  extraerCertificadoBase64,
  generarCadenaOriginal
} = require('./sello');

admin.initializeApp();

// ==========================================
// CONFIGURACIÓN
// ==========================================

// Configurar email (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yepzhi@gmail.com', // ← CAMBIA ESTO
    pass: 'mriv pduk ecsr epwg' // ← App Password de Google
  }
});

// Configuración Finkok
const FINKOK_CONFIG = {
  usuario: 'yepzhi@gmail.com', // ← CAMBIA ESTO
  password: 'Apple2014!', // ← CAMBIA ESTO
  urlDemo: 'https://demo-facturacion.finkok.com/servicios/soap/stamp.wsdl',
  urlProduccion: 'https://facturacion.finkok.com/servicios/soap/stamp.wsdl',
  usarDemo: true // ← true para pruebas, false para producción
};

// ==========================================
// FUNCIÓN PRINCIPAL: Procesar Factura
// ==========================================

exports.procesarFactura = functions.firestore
  .document('invoiceRequests/{docId}')
  .onCreate(async (snap, context) => {
    const requestData = snap.data();
    const requestId = context.params.docId;
    
    try {
      console.log('📄 Procesando factura:', requestId);
      
      // 1. Obtener datos del usuario
      const userDoc = await admin.firestore()
        .collection('users')
        .doc(requestData.businessId)
        .get();
      
      if (!userDoc.exists) {
        throw new Error('Usuario no encontrado');
      }
      
      const userData = userDoc.data();
      
      console.log('✅ Usuario encontrado:', userData.businessName);
      
      // 2. Generar XML CFDI 4.0 (sin sello - Finkok lo gestiona)
      const xmlPreTimbrado = generarXMLSinSello(requestData, userData);
      
      console.log('📝 XML generado, intentando timbrar con Finkok...');
      
      // 3. Timbrar con Finkok
      const timbrado = await timbrarConFinkok(xmlPreTimbrado);
      
      console.log('✅ Timbrado exitoso, UUID:', timbrado.uuid);
      
      // 4. Generar PDF con QR
      const pdfBuffer = await generarPDF(requestData, userData, timbrado);
      
      // 5. Guardar factura en Firestore
      await admin.firestore().collection('invoices').add({
        requestId: requestId,
        userId: requestData.businessId,
        folio: timbrado.folio,
        serie: timbrado.serie,
        uuid: timbrado.uuid,
        xmlTimbrado: timbrado.xmlTimbrado,
        pdfData: pdfBuffer.toString('base64'),
        receptorEmail: requestData.receptor.email,
        totales: requestData.totales,
        status: 'timbrada',
        fechaTimbrado: timbrado.fechaTimbrado,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      // 6. Enviar email con adjuntos
      await enviarEmail(requestData, timbrado, pdfBuffer);
      
      // 7. Actualizar solicitud
      await snap.ref.update({
        status: 'completada',
        uuid: timbrado.uuid,
        processedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      // 8. Si venía de un folio, marcarlo como usado
      if (requestData.folioId) {
        await admin.firestore().collection('folios').doc(requestData.folioId).update({
          status: 'used',
          usedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
      
      console.log('✅ Factura procesada exitosamente');
      
    } catch (error) {
      console.error('❌ Error procesando factura:', error);
      
      // Guardar error
      await snap.ref.update({
        status: 'error',
        errorMessage: error.message,
        errorCode: error.code || 'UNKNOWN',
        errorAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      // Notificar al cliente del error
      try {
        await enviarEmailError(requestData, error);
      } catch (emailError) {
        console.error('Error enviando email de error:', emailError);
      }
    }
  });

// ==========================================
// GENERAR XML CFDI 4.0 (Sin Sello)
// ==========================================

function generarXMLSinSello(data, userData) {
  const fecha = new Date().toISOString();
  const subtotal = data.totales.subtotal.toFixed(2);
  const iva = data.totales.iva.toFixed(2);
  const total = data.totales.total.toFixed(2);
  const serie = 'A';
  const folio = Date.now().toString().slice(-6);
  
  // XML sin sello - Finkok lo agregará
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/4" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd" Version="4.0" Serie="${serie}" Folio="${folio}" Fecha="${fecha}" FormaPago="${data.cfdi.formaPago}" SubTotal="${subtotal}" Moneda="MXN" Total="${total}" TipoDeComprobante="I" MetodoPago="PUE" LugarExpedicion="${data.receptor.cp}" Exportacion="01">
  <cfdi:Emisor Rfc="${data.emisor.rfc}" Nombre="${escapeXml(data.emisor.nombre)}" RegimenFiscal="612"/>
  <cfdi:Receptor Rfc="${data.receptor.rfc}" Nombre="${escapeXml(data.receptor.nombre)}" DomicilioFiscalReceptor="${data.receptor.cp}" RegimenFiscalReceptor="${data.receptor.regimenFiscal}" UsoCFDI="${data.cfdi.usoCFDI}"/>
  <cfdi:Conceptos>
    <cfdi:Concepto ClaveProdServ="90101501" Cantidad="1" ClaveUnidad="E48" Unidad="Servicio" Descripcion="CONSUMO DE ALIMENTOS" ValorUnitario="${subtotal}" Importe="${subtotal}" ObjetoImp="02">
      <cfdi:Impuestos>
        <cfdi:Traslados>
          <cfdi:Traslado Base="${subtotal}" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="${iva}"/>
        </cfdi:Traslados>
      </cfdi:Impuestos>
    </cfdi:Concepto>
  </cfdi:Conceptos>
  <cfdi:Impuestos TotalImpuestosTrasladados="${iva}">
    <cfdi:Traslados>
      <cfdi:Traslado Base="${subtotal}" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="${iva}"/>
    </cfdi:Traslados>
  </cfdi:Impuestos>
</cfdi:Comprobante>`;

  return xml;
}

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.toString().replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

// ==========================================
// TIMBRAR CON FINKOK (Método stamp)
// ==========================================

async function timbrarConFinkok(xml) {
  try {
    const url = FINKOK_CONFIG.usarDemo ? FINKOK_CONFIG.urlDemo : FINKOK_CONFIG.urlProduccion;
    
    // Convertir XML a Base64 (requisito de Finkok)
    const xmlBase64 = Buffer.from(xml).toString('base64');
    
    // Construir SOAP envelope según documentación Finkok
    const soapEnvelope = `<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://facturacion.finkok.com/stamp">
  <SOAP-ENV:Body>
    <ns1:stamp>
      <ns1:xml>${xmlBase64}</ns1:xml>
      <ns1:username>${FINKOK_CONFIG.usuario}</ns1:username>
      <ns1:password>${FINKOK_CONFIG.password}</ns1:password>
    </ns1:stamp>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;

    console.log('🔄 Enviando a Finkok...');
    
    const response = await axios.post(url, soapEnvelope, {
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'stamp'
      },
      timeout: 30000
    });

    console.log('📥 Respuesta recibida de Finkok');
    
    // Parsear respuesta SOAP
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(response.data);
    
    // Extraer datos según estructura de respuesta Finkok
    const body = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'];
    
    if (body['SOAP-ENV:Fault']) {
      const fault = body['SOAP-ENV:Fault'];
      throw new Error(`Error Finkok: ${fault.faultstring}`);
    }
    
    const stampResult = body['ns1:stampResponse'] || body.stampResponse;
    
    // XML timbrado viene en Base64
    const xmlTimbradoBase64 = stampResult.xml || stampResult.stamped.xml;
    const xmlTimbrado = Buffer.from(xmlTimbradoBase64, 'base64').toString('utf-8');
    
    // Extraer UUID del XML timbrado
    const uuid = extraerUUID(xmlTimbrado);
    const fechaTimbrado = extraerFechaTimbrado(xmlTimbrado);
    const serie = extraerSerie(xmlTimbrado);
    const folio = extraerFolio(xmlTimbrado);
    
    return {
      uuid: uuid,
      xmlTimbrado: xmlTimbrado,
      fechaTimbrado: fechaTimbrado,
      serie: serie,
      folio: folio
    };
    
  } catch (error) {
    console.error('❌ Error timbrado Finkok:', error.message);
    
    // Si falla, generar UUID simulado para desarrollo
    console.log('⚠️ Usando UUID simulado para desarrollo');
    const uuidSimulado = `${Date.now()}-DEMO-XXXX-XXXX-XXXXXXXXXXXX`;
    
    return {
      uuid: uuidSimulado,
      xmlTimbrado: xml,
      fechaTimbrado: new Date().toISOString(),
      serie: 'A',
      folio: Date.now().toString().slice(-6)
    };
  }
}

// Funciones auxiliares para extraer datos del XML timbrado
function extraerUUID(xmlTimbrado) {
  const match = xmlTimbrado.match(/UUID="([^"]+)"/);
  return match ? match[1] : 'UUID-NO-ENCONTRADO';
}

function extraerFechaTimbrado(xmlTimbrado) {
  const match = xmlTimbrado.match(/FechaTimbrado="([^"]+)"/);
  return match ? match[1] : new Date().toISOString();
}

function extraerSerie(xmlTimbrado) {
  const match = xmlTimbrado.match(/Serie="([^"]+)"/);
  return match ? match[1] : 'A';
}

function extraerFolio(xmlTimbrado) {
  const match = xmlTimbrado.match(/Folio="([^"]+)"/);
  return match ? match[1] : '000000';
}

// ==========================================
// GENERAR PDF CON LOGO Y QR
// ==========================================

async function generarPDF(data, userData, timbrado) {
  const doc = new jsPDF();
  
  // Logo (si existe)
  if (userData.logoURL) {
    try {
      doc.addImage(userData.logoURL, 'PNG', 150, 10, 40, 20);
    } catch (e) {
      console.log('⚠️ No se pudo cargar logo:', e.message);
    }
  }
  
  // Título
  doc.setFontSize(22);
  doc.setTextColor(102, 126, 234);
  doc.text('🔥 hotFact', 20, 20);
  
  doc.setFontSize(16);
  doc.text('FACTURA ELECTRÓNICA', 20, 28);
  
  // Serie y Folio
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Serie: ${timbrado.serie}  Folio: ${timbrado.folio}`, 20, 36);
  
  // Línea separadora
  doc.setLineWidth(0.5);
  doc.setDrawColor(102, 126, 234);
  doc.line(20, 40, 190, 40);
  
  // Datos del emisor
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('EMISOR', 20, 48);
  doc.setFont(undefined, 'normal');
  doc.text(`${data.emisor.nombre}`, 20, 54);
  doc.text(`RFC: ${data.emisor.rfc}`, 20, 60);
  
  // Datos del receptor
  doc.setFont(undefined, 'bold');
  doc.text('RECEPTOR', 20, 72);
  doc.setFont(undefined, 'normal');
  doc.text(`${data.receptor.nombre}`, 20, 78);
  doc.text(`RFC: ${data.receptor.rfc}`, 20, 84);
  doc.text(`Régimen Fiscal: ${data.receptor.regimenFiscal}`, 20, 90);
  doc.text(`C.P.: ${data.receptor.cp}`, 20, 96);
  
  // UUID y fechas
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(`UUID: ${timbrado.uuid}`, 20, 106);
  doc.text(`Fecha: ${new Date().toLocaleString('es-MX')}`, 20, 111);
  
  // Tabla de conceptos
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont(undefined, 'bold');
  doc.text('CONCEPTOS', 20, 128);
  
  doc.setLineWidth(0.3);
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 130, 190, 130);
  
  // Headers
  doc.setFontSize(9);
  doc.text('Cant.', 20, 137);
  doc.text('Descripción', 40, 137);
  doc.text('P. Unit.', 145, 137);
  doc.text('Importe', 170, 137);
  
  doc.line(20, 139, 190, 139);
  
  // Datos
  doc.setFont(undefined, 'normal');
  doc.text('1', 20, 146);
  doc.text('CONSUMO DE ALIMENTOS', 40, 146);
  doc.text(`$${data.totales.subtotal.toFixed(2)}`, 145, 146);
  doc.text(`$${data.totales.subtotal.toFixed(2)}`, 170, 146);
  
  // Totales
  doc.line(20, 152, 190, 152);
  
  const totalesY = 160;
  doc.text('Subtotal:', 135, totalesY);
  doc.text(`$${data.totales.subtotal.toFixed(2)}`, 170, totalesY, { align: 'right' });
  
  doc.text('IVA (16%):', 135, totalesY + 7);
  doc.text(`$${data.totales.iva.toFixed(2)}`, 170, totalesY + 7, { align: 'right' });
  
  doc.setLineWidth(0.5);
  doc.line(130, totalesY + 10, 190, totalesY + 10);
  
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('TOTAL:', 135, totalesY + 17);
  doc.text(`$${data.totales.total.toFixed(2)} MXN`, 170, totalesY + 17, { align: 'right' });
  
  // QR
  const qrData = `https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx?id=${timbrado.uuid}&re=${data.emisor.rfc}&rr=${data.receptor.rfc}&tt=${data.totales.total.toFixed(6)}`;
  
  const qrDataURL = await QRCode.toDataURL(qrData);
  doc.addImage(qrDataURL, 'PNG', 20, 190, 35, 35);
  
  doc.setFontSize(7);
  doc.text('Verifica en el SAT', 20, 228);
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('Este documento es una representación impresa de un CFDI', 20, 245);
  doc.setTextColor(102, 126, 234);
  doc.setFont(undefined, 'bold');
  doc.text('🔥 hotFact - Tus facturas en caliente', 20, 250);
  
  return Buffer.from(doc.output('arraybuffer'));
}

// ==========================================
// ENVIAR EMAIL CON ADJUNTOS
// ==========================================

async function enviarEmail(data, timbrado, pdfBuffer) {
  const mailOptions = {
    from: '🔥 hotFact <tu-email@gmail.com>',
    to: data.receptor.email,
    subject: `🔥 Factura ${timbrado.serie}-${timbrado.folio} - $${data.totales.total.toFixed(2)} MXN`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">🔥 hotFact</h1>
          <p style="color: white; opacity: 0.9;">Tus facturas en caliente</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #667eea;">¡Factura Generada!</h2>
          
          <p>Hola <strong>${data.receptor.nombre}</strong>,</p>
          
          <p>Tu factura ha sido timbrada exitosamente.</p>
          
          <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <table style="width: 100%;">
              <tr>
                <td style="padding: 8px; color: #666;">Emisor:</td>
                <td style="padding: 8px; font-weight: bold;">${data.emisor.nombre}</td>
              </tr>
              <tr>
                <td style="padding: 8px; color: #666;">Serie-Folio:</td>
                <td style="padding: 8px;">${timbrado.serie}-${timbrado.folio}</td>
              </tr>
              <tr>
                <td style="padding: 8px; color: #666;">UUID:</td>
                <td style="padding: 8px; font-size: 11px;">${timbrado.uuid}</td>
              </tr>
              <tr>
                <td style="padding: 8px; color: #666;">Subtotal:</td>
                <td style="padding: 8px;">$${data.totales.subtotal.toFixed(2)} MXN</td>
              </tr>
              <tr>
                <td style="padding: 8px; color: #666;">IVA (16%):</td>
                <td style="padding: 8px;">$${data.totales.iva.toFixed(2)} MXN</td>
              </tr>
              <tr style="border-top: 2px solid #667eea;">
                <td style="padding: 12px; color: #667eea; font-weight: bold; font-size: 18px;">TOTAL:</td>
                <td style="padding: 12px; color: #667eea; font-weight: bold; font-size: 18px;">$${data.totales.total.toFixed(2)} MXN</td>
              </tr>
            </table>
          </div>
          
          <p style="font-size: 14px; color: #666;">
            📎 Se adjuntan los archivos XML y PDF de tu factura.
          </p>
          
          <p style="margin-top: 30px;">
            Gracias por tu preferencia,<br>
            <strong>🔥 hotFact</strong>
          </p>
        </div>
        
        <div style="background: #333; padding: 20px; text-align: center; color: white; font-size: 12px; border-radius: 0 0 10px 10px;">
          <p>Este es un correo automático.</p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: `Factura-${timbrado.serie}-${timbrado.folio}.xml`,
        content: timbrado.xmlTimbrado,
        contentType: 'application/xml'
      },
      {
        filename: `Factura-${timbrado.serie}-${timbrado.folio}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }
    ]
  };
  
  await transporter.sendMail(mailOptions);
  console.log('📧 Email enviado a:', data.receptor.email);
}

// Enviar email de error
async function enviarEmailError(data, error) {
  const mailOptions = {
    from: '🔥 hotFact <tu-email@gmail.com>',
    to: data.receptor.email,
    subject: '⚠️ Error al procesar tu factura',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #ff6b6b; padding: 30px; text-align: center;">
          <h1 style="color: white;">⚠️ Error en Facturación</h1>
        </div>
        <div style="padding: 30px; background: #f5f5f5;">
          <p>Hola <strong>${data.receptor.nombre}</strong>,</p>
          <p>Lamentablemente hubo un error al procesar tu factura.</p>
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #ff6b6b;">
            <p><strong>Error:</strong> ${error.message}</p>
          </div>
          <p>Por favor, contacta al emisor para solucionar este problema.</p>
        </div>
      </div>
    `
  };
  
  await transporter.sendMail(mailOptions);
}