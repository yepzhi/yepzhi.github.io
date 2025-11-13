// ==========================================
// FUNCIONES DE SINCRONIZACIÓN CON FINKOK
// Agregar a functions/index.js
// ==========================================

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

// ==========================================
// 1. VALIDAR ESTADO DE CERTIFICADOS
// ==========================================

exports.checkFinkokCertificates = functions.https.onCall(async (data, context) => {
    // Verificar autenticación
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
    }

    const userId = context.auth.uid;

    try {
        // Obtener datos del usuario
        const userDoc = await admin.firestore().collection('users').doc(userId).get();
        const userData = userDoc.data();

        // Construir SOAP request para método "get" de Finkok
        const soapEnvelope = `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:reg="apps.services.soap.register.comercio.sw.com.mx">
  <soapenv:Header/>
  <soapenv:Body>
    <reg:get>
      <reg:username>TU_USUARIO_FINKOK</reg:username>
      <reg:password>TU_PASSWORD_FINKOK</reg:password>
      <reg:taxpayer_id>${userData.rfc}</reg:taxpayer_id>
    </reg:get>
  </soapenv:Body>
</soapenv:Envelope>`;

        const response = await axios.post(
            'https://facturacion.finkok.com/servicios/soap/registration.wsdl',
            soapEnvelope,
            {
                headers: {
                    'Content-Type': 'text/xml;charset=UTF-8',
                    'SOAPAction': 'get'
                }
            }
        );

        // Parsear respuesta (simplificado - usar xml2js en producción)
        const hasActiveCerts = response.data.includes('<status>A</status>');
        const expirationMatch = response.data.match(/<date_end>([^<]+)<\/date_end>/);
        const expirationDate = expirationMatch ? expirationMatch[1] : null;

        // Actualizar estado en Firestore
        await admin.firestore().collection('users').doc(userId).update({
            finkokStatus: {
                hasCertificates: hasActiveCerts,
                expirationDate: expirationDate,
                lastChecked: admin.firestore.FieldValue.serverTimestamp()
            }
        });

        return {
            success: true,
            hasCertificates: hasActiveCerts,
            expirationDate: expirationDate
        };

    } catch (error) {
        console.error('Error verificando certificados Finkok:', error);
        
        // Si el RFC no existe en Finkok, también es información útil
        if (error.message.includes('404') || error.message.includes('not found')) {
            await admin.firestore().collection('users').doc(userId).update({
                finkokStatus: {
                    hasCertificates: false,
                    error: 'RFC no registrado en Finkok',
                    lastChecked: admin.firestore.FieldValue.serverTimestamp()
                }
            });

            return {
                success: true,
                hasCertificates: false,
                error: 'RFC no registrado en Finkok'
            };
        }

        throw new functions.https.HttpsError('internal', error.message);
    }
});

// ==========================================
// 2. SINCRONIZACIÓN DIARIA DE FACTURAS
// Ejecuta cada día a las 2 AM
// ==========================================

exports.syncFinkokInvoices = functions.pubsub
    .schedule('0 2 * * *') // Cron: 2 AM diario
    .timeZone('America/Mexico_City')
    .onRun(async (context) => {
        console.log('🔄 Iniciando sincronización diaria con Finkok...');

        try {
            // Obtener todos los usuarios
            const usersSnapshot = await admin.firestore().collection('users').get();

            for (const userDoc of usersSnapshot.docs) {
                const userId = userDoc.id;
                const userData = userDoc.data();

                try {
                    // Consultar facturas del último mes en Finkok
                    const startDate = new Date();
                    startDate.setMonth(startDate.getMonth() - 1);

                    const soapEnvelope = `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Body>
    <get_report>
      <username>TU_USUARIO_FINKOK</username>
      <password>TU_PASSWORD_FINKOK</password>
      <taxpayer_id>${userData.rfc}</taxpayer_id>
      <date_from>${startDate.toISOString().split('T')[0]}</date_from>
      <date_to>${new Date().toISOString().split('T')[0]}</date_to>
    </get_report>
  </soapenv:Body>
</soapenv:Envelope>`;

                    const response = await axios.post(
                        'https://facturacion.finkok.com/servicios/soap/report.wsdl',
                        soapEnvelope,
                        {
                            headers: {
                                'Content-Type': 'text/xml;charset=UTF-8'
                            }
                        }
                    );

                    // Parsear facturas y guardar en Firestore
                    // (Simplificado - implementar parsing completo)
                    const invoicesCount = (response.data.match(/<invoice>/g) || []).length;

                    console.log(`✅ Usuario ${userId}: ${invoicesCount} facturas`);

                    // Actualizar estadísticas
                    await admin.firestore().collection('users').doc(userId).update({
                        'stats.lastSync': admin.firestore.FieldValue.serverTimestamp(),
                        'stats.totalInvoices': invoicesCount
                    });

                } catch (error) {
                    console.error(`Error sincronizando usuario ${userId}:`, error.message);
                }
            }

            console.log('✅ Sincronización completada');

        } catch (error) {
            console.error('Error en sincronización:', error);
        }
    });

// ==========================================
// 3. VALIDAR DISPONIBILIDAD DE TIMBRES
// ==========================================

exports.checkFinkokCredits = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
    }

    const userId = context.auth.uid;

    try {
        const userDoc = await admin.firestore().collection('users').doc(userId).get();
        const userData = userDoc.data();

        const soapEnvelope = `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Body>
    <get_credits>
      <username>TU_USUARIO_FINKOK</username>
      <password>TU_PASSWORD_FINKOK</password>
      <taxpayer_id>${userData.rfc}</taxpayer_id>
    </get_credits>
  </soapenv:Body>
</soapenv:Envelope>`;

        const response = await axios.post(
            'https://facturacion.finkok.com/servicios/soap/registration.wsdl',
            soapEnvelope,
            {
                headers: {
                    'Content-Type': 'text/xml;charset=UTF-8'
                }
            }
        );

        // Extraer número de timbres disponibles
        const creditsMatch = response.data.match(/<credits>(\d+)<\/credits>/);
        const availableCredits = creditsMatch ? parseInt(creditsMatch[1]) : 0;

        // Actualizar en Firestore
        await admin.firestore().collection('users').doc(userId).update({
            'finkokCredits': {
                available: availableCredits,
                lastChecked: admin.firestore.FieldValue.serverTimestamp()
            }
        });

        return {
            success: true,
            availableCredits: availableCredits
        };

    } catch (error) {
        console.error('Error verificando timbres:', error);
        throw new functions.https.HttpsError('internal', error.message);
    }
});

// ==========================================
// 4. WEBHOOK PARA NOTIFICACIONES DE FINKOK
// ==========================================

exports.finkokWebhook = functions.https.onRequest(async (req, res) => {
    // Finkok puede enviar notificaciones de:
    // - Facturas canceladas
    // - Cambios en certificados
    // - Alertas de timbres bajos

    try {
        const { event, uuid, rfc, data } = req.body;

        console.log('📩 Webhook Finkok recibido:', event);

        switch (event) {
            case 'invoice_cancelled':
                // Actualizar factura como cancelada
                const invoiceSnapshot = await admin.firestore()
                    .collection('invoices')
                    .where('uuid', '==', uuid)
                    .get();

                if (!invoiceSnapshot.empty) {
                    await invoiceSnapshot.docs[0].ref.update({
                        status: 'cancelada',
                        cancelledAt: admin.firestore.FieldValue.serverTimestamp(),
                        cancellationReason: data.reason
                    });
                }
                break;

            case 'certificate_expired':
                // Notificar al usuario
                const userSnapshot = await admin.firestore()
                    .collection('users')
                    .where('rfc', '==', rfc)
                    .get();

                if (!userSnapshot.empty) {
                    await userSnapshot.docs[0].ref.update({
                        'finkokStatus.hasCertificates': false,
                        'finkokStatus.error': 'Certificados expirados',
                        'finkokStatus.lastChecked': admin.firestore.FieldValue.serverTimestamp()
                    });
                }
                break;

            case 'low_credits':
                // Alertar sobre timbres bajos
                console.log(`⚠️ Timbres bajos para RFC: ${rfc}`);
                break;
        }

        res.status(200).send('OK');

    } catch (error) {
        console.error('Error procesando webhook:', error);
        res.status(500).send('Error');
    }
});

// ==========================================
// EXPORTAR TODAS LAS FUNCIONES
// ==========================================

module.exports = {
    checkFinkokCertificates,
    syncFinkokInvoices,
    checkFinkokCredits,
    finkokWebhook
};