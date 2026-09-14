// ── Richmond Pro · Help & Support Tickets Webhook ────────────────────────
// Pega este código en tu Google Spreadsheet (Extensiones → Apps Script)
// Luego despliega como Aplicación Web:
//   · Ejecutar como: "Yo" (tu cuenta de Google)
//   · Quién tiene acceso: "Cualquier persona" (Anyone)
// Copia la URL del despliegue (Web App URL) y pégala en app.js (SHEETS_WEBHOOK_URL)
// ─────────────────────────────────────────────────────────────────────────

const MASTER_SHEET = 'Solicitudes_Generales';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss   = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Registrar en la hoja Maestra General
    appendTicketToSheet(ss, MASTER_SHEET, data);

    // 2. Registrar en la pestaña específica del Asesor si viene asignado
    const advisorName = (data.assignedAdvisor || '').trim();
    if (advisorName && advisorName !== 'Sin asignar') {
      appendTicketToSheet(ss, advisorName, data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', folio: data.folio }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error('Webhook error:', err);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function appendTicketToSheet(ss, sheetName, data) {
  let sheet = ss.getSheetByName(sheetName);

  // Crear la pestaña si no existe
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  // Si la pestaña está vacía, agregar encabezados formateados
    const headers = [
      'Folio',
      'Fecha Registro',
      'Escuela',
      'Tipo de Incidencia',
      'Nombre Completo',
      'Apodo / Alias',
      'Correo Principal',
      'Segundo Correo',
      'Codigo de Libro',
      'Asesor Asignado',
      'Estatus',
      'Tiempo Transcurrido (min)',
      'Solucion / Nota Asesor',
      'Firestore ID'
    ];
    sheet.appendRow(headers);

    // Estilo encabezados
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#0e3575');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    headerRange.setFontSize(10);
    headerRange.setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
    sheet.setColumnWidths(1, headers.length, 170);
  }

  // Fecha legible formato CDMX / Hermosillo
  const fecha = data.dateStr || Utilities.formatDate(
    new Date(),
    'America/Mexico_City',
    'dd/MM/yyyy HH:mm:ss'
  );

  const row = [
    data.folio || '',
    fecha,
    data.school || '',
    data.issueType || '',
    data.fullName || '',
    data.nickname || '',
    data.email || '',
    data.altEmail || '',
    data.bookCode || '',
    data.assignedAdvisor || 'Alberto Yépiz',
    data.status || 'Pendiente',
    data.elapsedMinutes || 0,
    data.solutionNote || '',
    data.firestoreId || ''
  ];

  sheet.appendRow(row);

  const lastRow = sheet.getLastRow();
  const rowRange = sheet.getRange(lastRow, 1, 1, row.length);

  // Zebra striping suave
  if (lastRow % 2 === 0) {
    rowRange.setBackground('#f4f7ff');
  } else {
    rowRange.setBackground('#ffffff');
  }

  // Color condicional para Estatus
  const statusCell = sheet.getRange(lastRow, 11);
  const st = (data.status || '').toLowerCase();
  if (st.includes('resuelto')) {
    statusCell.setBackground('#dcfce7');
    statusCell.setFontColor('#15803d');
    statusCell.setFontWeight('bold');
  } else if (st.includes('proceso') || st.includes('revisión')) {
    statusCell.setBackground('#dbeafe');
    statusCell.setFontColor('#1d4ed8');
    statusCell.setFontWeight('bold');
  } else {
    statusCell.setBackground('#fef3c7');
    statusCell.setFontColor('#b45309');
    statusCell.setFontWeight('bold');
  }
}

// Función para probar localmente desde el editor de Google Apps Script
function testHelpWebhook() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        folio: 'HELP-98213',
        school: 'UTH',
        issueType: 'NO PUEDO ENTRAR, INVALID CREDENTIALS, APOYO CON CAMBIO DE CONTRASEÑA',
        fullName: 'Juan Perez Ejemplo',
        nickname: 'Juanito',
        email: 'juan.perez@uth.edu.mx',
        altEmail: 'juanperez2026@gmail.com',
        bookCode: 'RS-9921-ABCD-EFGH',
        assignedAdvisor: 'Alberto Yépiz',
        status: 'Pendiente',
        elapsedMinutes: 0,
        solutionNote: ''
      })
    }
  };
  doPost(mockEvent);
}
