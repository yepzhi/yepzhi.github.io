/**
 * Cloudflare Pages Worker: Webcert Institutional Auth & Audit API
 * Zero Firebase - 100% Native Cloudflare Edge Worker
 */

const SCHOOL_CATALOG = [
  {
    id: "UTT",
    codigo: "UTT",
    nombre_completo: "Universidad Tecnológica de Tijuana",
    contacto_nombre: "Karla María Antoniett Carmona López",
    contacto_email: "karla.carmona@uttijuana.edu.mx",
    salt: "stemos_school_salt_utt",
    clave_hash: "abbff690b3b05aa1b569ce05a650184f447db0c4e1fe73333d59a8b222aefb4c",
    activo: true
  },
  {
    id: "ITMXL",
    codigo: "ITMXL",
    nombre_completo: "Instituto Tecnológico de Mexicali",
    contacto_nombre: "Yesenia González",
    contacto_email: "clenguas@itmexicali.edu.mx",
    salt: "stemos_school_salt_itmxl",
    clave_hash: "950bfd415d4bb8a5597029a2aadeea6a16961c9e3242ecd58ac53530a097db31",
    activo: true
  },
  {
    id: "UTN",
    codigo: "UTN",
    nombre_completo: "Universidad Tecnológica de Nogales",
    contacto_nombre: "P.A. Claudia Catalina Tapia Villa",
    contacto_email: "ctapia@utnogales.edu.mx",
    salt: "stemos_school_salt_utn",
    clave_hash: "650882532107c916a09e40931a1797de09906e9cf5464adcfd34f1660d41a191",
    activo: true
  },
  {
    id: "UTH",
    codigo: "UTH",
    nombre_completo: "Universidad Tecnológica de Hermosillo",
    contacto_nombre: "Claudia Beltrán López",
    contacto_email: "claudiabeltran@uthermosillo.edu.mx",
    salt: "stemos_school_salt_uth",
    clave_hash: "da82e73af5ad72f2602d502cdffcd2ff5805a6a51b129bffed060a037deadbfb",
    activo: true
  },
  {
    id: "ITH",
    codigo: "ITH",
    nombre_completo: "Instituto Tecnológico de Hermosillo",
    contacto_nombre: "Luz Enríquez R.",
    contacto_email: "luz.enriquezr@hermosillo.tecnm.mx",
    salt: "stemos_school_salt_ith",
    clave_hash: "16a7a5450a41d3dfe5261cb66ff78ed4d2621f43217ce85b95fd16abeb917f65",
    activo: true
  },
  {
    id: "ITESCA",
    codigo: "ITESCA",
    nombre_completo: "Instituto Tecnológico Superior de Cajeme",
    contacto_nombre: "Liliana García Peralta",
    contacto_email: "idiomas@itesca.edu.mx",
    salt: "stemos_school_salt_itesca",
    clave_hash: "7099d156857b74f2a75853bc3da5ed1eccf1fd1aba3020409c769186ad9581b8",
    activo: true
  },
  {
    id: "ITLM",
    codigo: "ITLM",
    nombre_completo: "Instituto Tecnológico de Los Mochis",
    contacto_nombre: "María del Rocío Barajas Peregrina",
    contacto_email: "maria.bp@mochis.tecnm.mx",
    salt: "stemos_school_salt_itlm",
    clave_hash: "441c5a33c34843b74939df82f550bcfe12bce303deda13d12ab8b36f01ae853f",
    activo: true
  }
];

const SERVER_SECRET = "stemos_cf_edge_secret_2026_wbcrt";

async function sha256Hex(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Webcert-Token",
    "Content-Type": "application/json"
  };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: getCorsHeaders()
      });
    }

    // Webcert API Routes
    if (url.pathname === "/api/webcert/schools" && request.method === "GET") {
      const publicSchools = SCHOOL_CATALOG.filter(s => s.activo).map(s => ({
        id: s.id,
        codigo: s.codigo,
        nombre_completo: s.nombre_completo,
        contacto_nombre: s.contacto_nombre,
        contacto_email: s.contacto_email
      }));
      return new Response(JSON.stringify({ ok: true, escuelas: publicSchools }), {
        headers: getCorsHeaders()
      });
    }

    if (url.pathname === "/api/webcert/verify-key" && request.method === "POST") {
      try {
        const body = await request.json();
        const escuelaId = (body.escuela_id || body.escuelaId || "").trim().toUpperCase();
        const clave = (body.clave || "").trim();

        if (!escuelaId || !clave) {
          return new Response(JSON.stringify({ ok: false, error: "Faltan parámetros: escuela_id y clave son requeridos." }), {
            status: 400,
            headers: getCorsHeaders()
          });
        }

        const escuela = SCHOOL_CATALOG.find(s => s.id === escuelaId || s.codigo === escuelaId);
        if (!escuela || !escuela.activo) {
          console.warn(`[WEBCERT-AUTH] Intento de acceso a escuela inexistente o inactiva: ${escuelaId}`);
          return new Response(JSON.stringify({ ok: false, error: "Institución no encontrada o inactiva." }), {
            status: 404,
            headers: getCorsHeaders()
          });
        }

        const inputHash = await sha256Hex(escuela.salt + ":" + clave);
        if (inputHash !== escuela.clave_hash) {
          console.warn(`[WEBCERT-AUTH] Clave inválida para ${escuela.codigo} desde IP ${request.headers.get("CF-Connecting-IP") || "local"}`);
          return new Response(JSON.stringify({ ok: false, error: "Clave de acceso no válida para esta institución." }), {
            status: 401,
            headers: getCorsHeaders()
          });
        }

        // Generar token firmado de autorización temporal (2 horas)
        const expiry = Date.now() + 2 * 60 * 60 * 1000;
        const tokenSignature = await sha256Hex(`${escuela.codigo}:${expiry}:${SERVER_SECRET}`);
        const token = `${escuela.codigo}.${expiry}.${tokenSignature}`;

        console.log(`[WEBCERT-AUTH] Acceso autorizado para ${escuela.codigo}`);

        return new Response(JSON.stringify({
          ok: true,
          token,
          escuela: {
            id: escuela.id,
            codigo: escuela.codigo,
            nombre_completo: escuela.nombre_completo,
            contacto_nombre: escuela.contacto_nombre,
            contacto_email: escuela.contacto_email
          }
        }), {
          status: 200,
          headers: getCorsHeaders()
        });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: "Error procesando solicitud: " + err.message }), {
          status: 500,
          headers: getCorsHeaders()
        });
      }
    }

    if (url.pathname === "/api/webcert/validate-batch" && request.method === "POST") {
      try {
        const body = await request.json();
        const escuelaId = (body.escuela_id || "").trim().toUpperCase();
        const clave = (body.clave || "").trim();
        const totalFilas = parseInt(body.total_filas || 0, 10);

        if (!escuelaId || !clave) {
          return new Response(JSON.stringify({ ok: false, error: "Credenciales incompletas para autorización de lote." }), {
            status: 400,
            headers: getCorsHeaders()
          });
        }

        const escuela = SCHOOL_CATALOG.find(s => s.id === escuelaId || s.codigo === escuelaId);
        if (!escuela || !escuela.activo) {
          return new Response(JSON.stringify({ ok: false, error: "Institución no encontrada." }), {
            status: 404,
            headers: getCorsHeaders()
          });
        }

        const inputHash = await sha256Hex(escuela.salt + ":" + clave);
        if (inputHash !== escuela.clave_hash) {
          return new Response(JSON.stringify({ ok: false, error: "Clave de acceso incorrecta para autorización de lote." }), {
            status: 401,
            headers: getCorsHeaders()
          });
        }

        const batchId = `BATCH-${escuela.codigo}-${Date.now()}`;
        console.log(`[WEBCERT-AUDIT] Lote masivo autorizado: ${batchId} | Escuela: ${escuela.codigo} | Total: ${totalFilas} certificados | IP: ${request.headers.get("CF-Connecting-IP") || "local"}`);

        return new Response(JSON.stringify({
          ok: true,
          batch_id: batchId,
          escuela: {
            id: escuela.id,
            codigo: escuela.codigo,
            nombre_completo: escuela.nombre_completo,
            contacto_email: escuela.contacto_email
          }
        }), {
          status: 200,
          headers: getCorsHeaders()
        });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: "Error en autorización de lote: " + err.message }), {
          status: 500,
          headers: getCorsHeaders()
        });
      }
    }

    // Serve static asset if inside Cloudflare Pages
    if (env && env.ASSETS && typeof env.ASSETS.fetch === "function") {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not found", { status: 404 });
  }
};
