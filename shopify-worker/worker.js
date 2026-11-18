// =====================================================================
//  Activación automática del acceso de por vida al comprar en Shopify.
//  Se instala como Cloudflare Worker (gratis). Ver VENDER.md, paso 5.
//
//  Shopify (webhook "Pago del pedido") → este Worker → Firestore licencias/{email}
//
//  Secretos que hay que configurar en Cloudflare (Settings → Variables and Secrets):
//    SHOPIFY_WEBHOOK_SECRET   la clave con la que Shopify firma los webhooks
//    GOOGLE_SERVICE_ACCOUNT   el JSON completo de la cuenta de servicio de Firebase
//  Opcional:
//    SKU_MARCA                texto que debe contener el SKU (por defecto PLANIFICADOR)
// =====================================================================

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return new Response('Activador de licencias activo.', { status: 200 });
    const raw = await request.text();

    // 1) Comprobar que el aviso viene de verdad de tu tienda Shopify.
    const firma = request.headers.get('X-Shopify-Hmac-Sha256') || '';
    if (!env.SHOPIFY_WEBHOOK_SECRET || !(await firmaValida(raw, firma, env.SHOPIFY_WEBHOOK_SECRET))) {
      return new Response('Firma no válida', { status: 401 });
    }

    let pedido;
    try { pedido = JSON.parse(raw); } catch { return new Response('JSON no válido', { status: 400 }); }

    // 2) ¿El pedido incluye el planificador (o un pack que lo incluya)?
    const marca = (env.SKU_MARCA || 'PLANIFICADOR').toUpperCase();
    const lineas = (pedido.line_items || []).filter((l) => String(l.sku || '').toUpperCase().includes(marca));
    if (!lineas.length) return new Response('Pedido sin planificador: nada que hacer.', { status: 200 });
    if (pedido.financial_status && !['paid', 'partially_paid', 'partially_refunded'].includes(pedido.financial_status)) {
      return new Response('Pedido aún no pagado.', { status: 200 });
    }

    // 3) Emails a activar: el de la app (si compró desde la app) y el del pedido.
    const attrs = Object.fromEntries((pedido.note_attributes || []).map((a) => [a.name, a.value]));
    const emails = [...new Set([attrs.app_email, pedido.email, pedido.contact_email, pedido.customer?.email]
      .filter(Boolean).map((e) => String(e).trim().toLowerCase()).filter((e) => e.includes('@')))];
    if (!emails.length) return new Response('Pedido sin email.', { status: 200 });

    // 4) Guardar la licencia en Firestore.
    try {
      const sa = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT);
      const token = await tokenGoogle(sa, env.TOKEN_URL);
      const base = env.FIRESTORE_BASE || 'https://firestore.googleapis.com';
      for (const email of emails) {
        const url = `${base}/v1/projects/${sa.project_id}/databases/(default)/documents/licencias/${encodeURIComponent(email)}`;
        const r = await fetch(url, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ fields: {
            activadaEl: { timestampValue: new Date().toISOString() },
            origen: { stringValue: 'shopify' },
            pedido: { stringValue: String(pedido.name || pedido.order_number || pedido.id || '') },
            nota: { stringValue: `Shopify ${pedido.name || ''}`.trim() },
            // Productos del pedido: la app oculta los enlaces a los mapas a quien compró un pack.
            skus: { arrayValue: { values: (pedido.line_items || []).map((l) => l.sku).filter(Boolean).map((x) => ({ stringValue: String(x) })) } },
          } }),
        });
        if (!r.ok) throw new Error(`Firestore ${r.status}: ${await r.text()}`);
      }
      return new Response(`Acceso activado: ${emails.join(', ')}`, { status: 200 });
    } catch (e) {
      // Con un error 500, Shopify reintenta el aviso automáticamente.
      return new Response('Error al activar: ' + e.message, { status: 500 });
    }
  },
};

async function firmaValida(cuerpo, firmaBase64, secreto) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secreto), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(cuerpo)));
  let esperado;
  try { esperado = Uint8Array.from(atob(firmaBase64), (c) => c.charCodeAt(0)); } catch { return false; }
  if (esperado.length !== mac.length) return false;
  let diff = 0;
  for (let i = 0; i < mac.length; i++) diff |= mac[i] ^ esperado[i];
  return diff === 0;
}

const b64url = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64urlTexto = (s) => b64url(new TextEncoder().encode(s));

async function tokenGoogle(sa, tokenUrl = 'https://oauth2.googleapis.com/token') {
  const ahora = Math.floor(Date.now() / 1000);
  const cabecera = b64urlTexto(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const datos = b64urlTexto(JSON.stringify({
    iss: sa.client_email, scope: 'https://www.googleapis.com/auth/datastore',
    aud: 'https://oauth2.googleapis.com/token', iat: ahora, exp: ahora + 3600,
  }));
  const pem = sa.private_key.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '');
  const der = Uint8Array.from(atob(pem), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey('pkcs8', der, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const firma = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(`${cabecera}.${datos}`));
  const jwt = `${cabecera}.${datos}.${b64url(firma)}`;
  const r = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`,
  });
  if (!r.ok) throw new Error(`Google token ${r.status}: ${await r.text()}`);
  return (await r.json()).access_token;
}
