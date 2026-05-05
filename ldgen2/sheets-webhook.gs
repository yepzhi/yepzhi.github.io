// ── Richmond Pro · Leads Webhook ──────────────────────────────
// Pega este código en Apps Script (Extensiones → Apps Script)
// Luego despliega como Web App:
//   · Ejecutar como: Yo (tu cuenta Google)
//   · Quién tiene acceso: Cualquier persona
// Copia la URL del despliegue y pégala en app.js (WEBHOOK_URL)
// ──────────────────────────────────────────────────────────────

const SHEET_NAME = 'Leads'; // nombre de la hoja/pestaña

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let sheet   = ss.getSheetByName(SHEET_NAME);

    // Crear hoja si no existe
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Crear encabezados si la hoja está vacía
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        '📅 Fecha',
        '👤 Nombre',
        '👤 Apellido',
        '📧 Email',
        '📱 WhatsApp',
        '🏫 Universidad',
        '🏛️ Tipo',
        '📍 Estado',
        '🔤 Proveedor inglés',
        '🏷️ Nombre proveedor',
        '💼 Puesto',
        '💬 Comentario puesto',
        '🎯 Interés',
        '🆔 Firestore ID'
      ]);

      // Estilo encabezados
      const header = sheet.getRange(1, 1, 1, 14);
      header.setBackground('#1e3a5f');
      header.setFontColor('#ffffff');
      header.setFontWeight('bold');
      header.setFontSize(11);
      sheet.setFrozenRows(1);
      sheet.setColumnWidths(1, 14, 160);
    }

    // Fecha legible en zona horaria México
    const fecha = Utilities.formatDate(
      new Date(),
      'America/Mexico_City',
      'dd/MM/yyyy HH:mm'
    );

    // Añadir fila con los datos
    sheet.appendRow([
      fecha,
      data.firstName    || '',
      data.lastName     || '',
      data.email        || '',
      data.whatsapp     ? `+52 ${data.whatsapp}` : '',
      data.university   || '',
      data.instType === 'gobierno' ? 'Pública / Gobierno' : 'Privada',
      data.state        || '',
      data.hasProvider === 'si' ? '✅ Sí' : '❌ No',
      data.providerName || '',
      data.role         || '',
      data.roleComment  || '',
      data.intention === 'contact' ? '📬 Contacto' : '🎓 Webinar',
      data.firestoreId  || ''
    ]);

    // Colorear fila alternada para legibilidad
    const lastRow  = sheet.getLastRow();
    const rowRange = sheet.getRange(lastRow, 1, 1, 14);
    if (lastRow % 2 === 0) {
      rowRange.setBackground('#f0f4ff');
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', row: lastRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error('Webhook error:', err);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Para probar manualmente desde el editor:
function testWebhook() {
  const mockData = {
    postData: {
      contents: JSON.stringify({
        firstName:    'Juan',
        lastName:     'García',
        email:        'juan@uabc.edu.mx',
        whatsapp:     '6641234567',
        university:   'UABC',
        instType:     'gobierno',
        state:        'Baja California',
        hasProvider:  'si',
        providerName: 'Pearson',
        role:         'Coordinador',
        roleComment:  '',
        intention:    'contact',
        firestoreId:  'test-id-001'
      })
    }
  };
  const result = doPost(mockData);
  Logger.log(result.getContent());
}
