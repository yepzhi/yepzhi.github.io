/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configurar transporter de email (usa tu email)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tu-email@gmail.com',
    pass: 'tu-contraseña-de-aplicacion' // Genera en Google: App Passwords
  }
});

// Trigger cuando se crea una solicitud de factura
exports.sendInvoice = functions.firestore
  .document('invoiceRequests/{docId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    
    try {
      // Aquí integrarías con Finkok para timbrar
      // Por ahora solo enviamos confirmación
      
      const mailOptions = {
        from: 'hotFact <tu-email@gmail.com>',
        to: data.receptor.email,
        subject: '🔥 Tu factura de hotFact',
        html: `
          <h2>¡Factura Generada!</h2>
          <p>Hola ${data.receptor.nombre},</p>
          <p>Tu factura ha sido procesada exitosamente.</p>
          <p><strong>Monto total:</strong> $${data.totales.total.toFixed(2)} MXN</p>
          <p>Los archivos XML y PDF se adjuntarán una vez timbrados.</p>
          <br>
          <p>Gracias por tu preferencia,</p>
          <p><strong>🔥 hotFact</strong></p>
        `
      };
      
      await transporter.sendMail(mailOptions);
      console.log('Email enviado a:', data.receptor.email);
      
    } catch (error) {
      console.error('Error enviando email:', error);
    }
  });