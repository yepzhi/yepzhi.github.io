// ==========================================
// MÓDULO: Generar Sello Digital CFDI 4.0
// ==========================================
// Este módulo genera el sello digital requerido por el SAT
// usando los certificados .cer y .key del emisor

const crypto = require('crypto');
const forge = require('node-forge');

/**
 * Generar sello digital para CFDI 4.0
 * @param {string} cadenaOriginal - Cadena original del comprobante
 * @param {string} keyBase64 - Archivo .key en base64
 * @param {string} keyPassword - Contraseña del archivo .key
 * @returns {string} Sello digital en base64
 */
function generarSello(cadenaOriginal, keyBase64, keyPassword) {
  try {
    // 1. Decodificar la llave privada de base64
    const keyBuffer = Buffer.from(keyBase64, 'base64');
    
    // 2. Convertir de DER a PEM usando node-forge
    const keyDer = forge.util.decode64(keyBase64);
    
    // 3. Desencriptar la llave privada con la contraseña
    const p8Asn1 = forge.asn1.fromDer(keyDer);
    const privateKeyInfo = forge.pki.decryptPrivateKeyInfo(p8Asn1, keyPassword);
    const privateKey = forge.pki.privateKeyFromAsn1(privateKeyInfo);
    
    // 4. Convertir la llave a formato PEM
    const privateKeyPem = forge.pki.privateKeyToPem(privateKey);
    
    // 5. Generar el sello usando SHA256 con RSA
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(cadenaOriginal, 'utf8');
    const selloBuffer = sign.sign(privateKeyPem);
    
    // 6. Convertir el sello a base64
    const sello = selloBuffer.toString('base64');
    
    return sello;
    
  } catch (error) {
    console.error('❌ Error generando sello:', error.message);
    throw new Error(`Error al generar sello digital: ${error.message}`);
  }
}

/**
 * Extraer número de certificado del archivo .cer
 * @param {string} cerBase64 - Archivo .cer en base64
 * @returns {string} Número de certificado
 */
function extraerNumeroCertificado(cerBase64) {
  try {
    const cerDer = forge.util.decode64(cerBase64);
    const cerAsn1 = forge.asn1.fromDer(cerDer);
    const cert = forge.pki.certificateFromAsn1(cerAsn1);
    
    // El número de serie en hexadecimal
    const serialNumber = cert.serialNumber;
    
    // Convertir a decimal de 20 dígitos como requiere el SAT
    const decimal = BigInt('0x' + serialNumber).toString();
    
    // Rellenar con ceros a la izquierda si es necesario (20 dígitos)
    return decimal.padStart(20, '0');
    
  } catch (error) {
    console.error('❌ Error extrayendo número de certificado:', error.message);
    throw new Error(`Error al extraer número de certificado: ${error.message}`);
  }
}

/**
 * Extraer certificado en base64 del archivo .cer
 * @param {string} cerBase64 - Archivo .cer en base64
 * @returns {string} Certificado en base64 (sin headers)
 */
function extraerCertificadoBase64(cerBase64) {
  try {
    const cerDer = forge.util.decode64(cerBase64);
    const cerAsn1 = forge.asn1.fromDer(cerDer);
    const cert = forge.pki.certificateFromAsn1(cerAsn1);
    
    // Convertir a PEM y extraer solo el contenido base64
    const certPem = forge.pki.certificateToPem(cert);
    const certBase64Clean = certPem
      .replace(/-----BEGIN CERTIFICATE-----/g, '')
      .replace(/-----END CERTIFICATE-----/g, '')
      .replace(/\n/g, '');
    
    return certBase64Clean;
    
  } catch (error) {
    console.error('❌ Error extrayendo certificado:', error.message);
    throw new Error(`Error al extraer certificado: ${error.message}`);
  }
}

/**
 * Generar cadena original del comprobante según XSLT del SAT
 * @param {Object} comprobante - Datos del comprobante
 * @returns {string} Cadena original
 */
function generarCadenaOriginal(comprobante) {
  // Según el XSLT oficial del SAT para CFDI 4.0
  // http://www.sat.gob.mx/sitio_internet/cfd/4/cadenaoriginal_4_0.xslt
  
  const c = comprobante;
  
  let cadena = '||';
  cadena += `${c.Version}|`;
  cadena += `${c.Serie || ''}|`;
  cadena += `${c.Folio}|`;
  cadena += `${c.Fecha}|`;
  cadena += `${c.FormaPago}|`;
  cadena += `${c.NoCertificado}|`;
  cadena += `${c.SubTotal}|`;
  cadena += `${c.Moneda || 'XXX'}|`;
  
  if (c.TipoCambio) {
    cadena += `${c.TipoCambio}|`;
  }
  
  cadena += `${c.Total}|`;
  cadena += `${c.TipoDeComprobante}|`;
  cadena += `${c.Exportacion}|`;
  cadena += `${c.MetodoPago || ''}|`;
  cadena += `${c.LugarExpedicion}|`;
  
  // Emisor
  cadena += `${c.Emisor.Rfc}|`;
  cadena += `${c.Emisor.Nombre}|`;
  cadena += `${c.Emisor.RegimenFiscal}|`;
  
  // Receptor
  cadena += `${c.Receptor.Rfc}|`;
  cadena += `${c.Receptor.Nombre}|`;
  cadena += `${c.Receptor.DomicilioFiscalReceptor}|`;
  cadena += `${c.Receptor.RegimenFiscalReceptor}|`;
  cadena += `${c.Receptor.UsoCFDI}|`;
  
  // Conceptos
  c.Conceptos.forEach(concepto => {
    cadena += `${concepto.ClaveProdServ}|`;
    cadena += `${concepto.Cantidad}|`;
    cadena += `${concepto.ClaveUnidad}|`;
    cadena += `${concepto.Unidad || ''}|`;
    cadena += `${concepto.Descripcion}|`;
    cadena += `${concepto.ValorUnitario}|`;
    cadena += `${concepto.Importe}|`;
    cadena += `${concepto.ObjetoImp}|`;
    
    // Impuestos del concepto
    if (concepto.Impuestos && concepto.Impuestos.Traslados) {
      concepto.Impuestos.Traslados.forEach(traslado => {
        cadena += `${traslado.Base}|`;
        cadena += `${traslado.Impuesto}|`;
        cadena += `${traslado.TipoFactor}|`;
        cadena += `${traslado.TasaOCuota}|`;
        cadena += `${traslado.Importe}|`;
      });
    }
  });
  
  // Impuestos globales
  if (c.Impuestos) {
    cadena += `${c.Impuestos.TotalImpuestosTrasladados || ''}|`;
    
    if (c.Impuestos.Traslados) {
      c.Impuestos.Traslados.forEach(traslado => {
        cadena += `${traslado.Base}|`;
        cadena += `${traslado.Impuesto}|`;
        cadena += `${traslado.TipoFactor}|`;
        cadena += `${traslado.TasaOCuota}|`;
        cadena += `${traslado.Importe}|`;
      });
    }
  }
  
  cadena += '||';
  
  return cadena;
}

/**
 * Validar que la cadena original y el sello sean correctos
 * @param {string} cadenaOriginal - Cadena original
 * @param {string} sello - Sello en base64
 * @param {string} cerBase64 - Certificado en base64
 * @returns {boolean} true si es válido
 */
function validarSello(cadenaOriginal, sello, cerBase64) {
  try {
    const cerDer = forge.util.decode64(cerBase64);
    const cerAsn1 = forge.asn1.fromDer(cerDer);
    const cert = forge.pki.certificateFromAsn1(cerAsn1);
    
    const publicKey = forge.pki.publicKeyToPem(cert.publicKey);
    
    const verify = crypto.createVerify('RSA-SHA256');
    verify.update(cadenaOriginal, 'utf8');
    
    const selloBuffer = Buffer.from(sello, 'base64');
    const isValid = verify.verify(publicKey, selloBuffer);
    
    return isValid;
    
  } catch (error) {
    console.error('❌ Error validando sello:', error.message);
    return false;
  }
}

// Exportar funciones
module.exports = {
  generarSello,
  extraerNumeroCertificado,
  extraerCertificadoBase64,
  generarCadenaOriginal,
  validarSello
};

// ==========================================
// EJEMPLO DE USO
// ==========================================

/*
const { generarSello, extraerNumeroCertificado, extraerCertificadoBase64, generarCadenaOriginal } = require('./sello');

// 1. Obtener certificados de Firestore (están en base64)
const cerBase64 = "MIIFxTCCA62g..."; // Del certificado .cer
const keyBase64 = "MIIFDjBABgkq..."; // De la llave .key
const keyPassword = "12345678a"; // Contraseña de la llave

// 2. Preparar datos del comprobante
const comprobante = {
  Version: "4.0",
  Serie: "A",
  Folio: "123456",
  Fecha: "2025-01-15T10:30:00",
  FormaPago: "01",
  NoCertificado: extraerNumeroCertificado(cerBase64),
  SubTotal: "1000.00",
  Moneda: "MXN",
  Total: "1160.00",
  TipoDeComprobante: "I",
  Exportacion: "01",
  MetodoPago: "PUE",
  LugarExpedicion: "83000",
  Emisor: {
    Rfc: "XAXX010101000",
    Nombre: "Mi Empresa",
    RegimenFiscal: "612"
  },
  Receptor: {
    Rfc: "XEXX010101000",
    Nombre: "Cliente",
    DomicilioFiscalReceptor: "83000",
    RegimenFiscalReceptor: "616",
    UsoCFDI: "G03"
  },
  Conceptos: [{
    ClaveProdServ: "90101501",
    Cantidad: "1",
    ClaveUnidad: "E48",
    Descripcion: "CONSUMO DE ALIMENTOS",
    ValorUnitario: "1000.00",
    Importe: "1000.00",
    ObjetoImp: "02",
    Impuestos: {
      Traslados: [{
        Base: "1000.00",
        Impuesto: "002",
        TipoFactor: "Tasa",
        TasaOCuota: "0.160000",
        Importe: "160.00"
      }]
    }
  }],
  Impuestos: {
    TotalImpuestosTrasladados: "160.00",
    Traslados: [{
      Base: "1000.00",
      Impuesto: "002",
      TipoFactor: "Tasa",
      TasaOCuota: "0.160000",
      Importe: "160.00"
    }]
  }
};

// 3. Generar cadena original
const cadenaOriginal = generarCadenaOriginal(comprobante);
console.log('Cadena Original:', cadenaOriginal);

// 4. Generar sello
const sello = generarSello(cadenaOriginal, keyBase64, keyPassword);
console.log('Sello:', sello);

// 5. Extraer certificado
const certificado = extraerCertificadoBase64(cerBase64);
console.log('Certificado:', certificado);

// 6. Construir XML con sello
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<cfdi:Comprobante 
  Version="4.0"
  Serie="${comprobante.Serie}"
  Folio="${comprobante.Folio}"
  NoCertificado="${comprobante.NoCertificado}"
  Certificado="${certificado}"
  Sello="${sello}"
  ...resto del XML...
</cfdi:Comprobante>`;

// 7. Ahora puedes timbrar con Finkok
*/