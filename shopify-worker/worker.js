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
//
//  Novedades por email (casilla opcional de la app → cliente suscrito en Shopify).
//  Se ejecuta con un Cron Trigger (Settings → Triggers → Cron Triggers: */15 * * * *).
//    SHOPIFY_SHOP             el dominio interno de la tienda, sin https (p. ej. d1yjv4-ts.myshopify.com)
//    y una de estas dos formas de acceso a la API de Shopify (permiso write_customers):
//    SHOPIFY_ADMIN_TOKEN      token shpat_… de una app personalizada creada en el admin de Shopify
//    SHOPIFY_CLIENT_ID + SHOPIFY_CLIENT_SECRET   app creada en el Dev Dashboard (client credentials)
// =====================================================================

export default {
  // Cada 15 minutos: pasa a Shopify las altas y bajas de novedades hechas en la app.
  async scheduled(event, env, ctx) {
    ctx.waitUntil(sincronizarSuscripciones(env).then((r) => console.log('Novedades:', JSON.stringify(r))).catch((e) => console.error('Novedades:', e.message)));
  },

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

// =====================================================================
//  Novedades por email: Firestore suscripciones/{uid} → cliente de Shopify
// =====================================================================
// Cada documento lo crea la app cuando el usuario marca o desmarca la casilla:
//   { email, estado: 'si' | 'no', fecha, texto, origen: 'app', sincronizado: false }
// Aquí se aplica en Shopify y se marca como sincronizado (con el resultado).
async function sincronizarSuscripciones(env) {
  if (!env.SHOPIFY_SHOP || !(env.SHOPIFY_ADMIN_TOKEN || (env.SHOPIFY_CLIENT_ID && env.SHOPIFY_CLIENT_SECRET))) {
    return { omitido: 'Faltan SHOPIFY_SHOP y el acceso a la API de Shopify' };
  }
  const sa = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT);
  const gtoken = await tokenGoogle(sa, env.TOKEN_URL);
  const base = `${env.FIRESTORE_BASE || 'https://firestore.googleapis.com'}/v1/projects/${sa.project_id}/databases/(default)/documents`;
  const q = await fetch(`${base}:runQuery`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${gtoken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ structuredQuery: {
      from: [{ collectionId: 'suscripciones' }],
      where: { fieldFilter: { field: { fieldPath: 'sincronizado' }, op: 'EQUAL', value: { booleanValue: false } } },
      limit: 50,
    } }),
  });
  if (!q.ok) throw new Error(`Firestore ${q.status}: ${await q.text()}`);
  const docs = (await q.json()).map((x) => x.document).filter(Boolean);
  if (!docs.length) return { procesadas: 0 };
  const shop = shopifyCliente(env);
  const res = { procesadas: 0, errores: 0 };
  for (const d of docs) {
    const email = String(d.fields?.email?.stringValue || '').trim().toLowerCase();
    const si = d.fields?.estado?.stringValue === 'si';
    const fecha = d.fields?.fecha?.timestampValue || new Date().toISOString();
    let resultado;
    try {
      if (!email.includes('@')) throw new Error('email no válido');
      resultado = await aplicarConsentimiento(shop, email, si, fecha);
      res.procesadas++;
    } catch (e) {
      resultado = 'error: ' + e.message; res.errores++;
    }
    // Solo se marca si el documento no ha cambiado desde que lo leímos (si cambió, va en la siguiente pasada).
    const nombre = d.name.split('/documents/')[1];
    const mask = ['sincronizado', 'resultado', 'sincronizadoEl'].map((f) => 'updateMask.fieldPaths=' + f).join('&');
    await fetch(`${base}/${nombre}?${mask}&currentDocument.updateTime=${encodeURIComponent(d.updateTime)}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${gtoken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: {
        // Los errores se reintentan en la siguiente pasada.
        sincronizado: { booleanValue: !String(resultado).startsWith('error') },
        resultado: { stringValue: String(resultado).slice(0, 300) },
        sincronizadoEl: { timestampValue: new Date().toISOString() },
      } }),
    });
  }
  return res;
}

async function aplicarConsentimiento(shop, email, si, fecha) {
  const consentimiento = { marketingState: si ? 'SUBSCRIBED' : 'UNSUBSCRIBED', marketingOptInLevel: 'SINGLE_OPT_IN', consentUpdatedAt: fecha };
  const b = await shop(`query Buscar($q: String!) { customers(first: 1, query: $q) { nodes { id } } }`, { q: `email:"${email}"` });
  const id = b.customers.nodes[0]?.id;
  if (!id) {
    if (!si) return 'baja sin cliente en Shopify';
    const c = await shop(`mutation Crear($input: CustomerInput!) { customerCreate(input: $input) { customer { id } userErrors { field message } } }`,
      { input: { email, tags: ['newsletter', 'app-planificador'], emailMarketingConsent: consentimiento } });
    if (c.customerCreate.userErrors.length) throw new Error(c.customerCreate.userErrors.map((x) => x.message).join('; '));
    return 'cliente creado y suscrito';
  }
  const u = await shop(`mutation Consent($input: CustomerEmailMarketingConsentUpdateInput!) { customerEmailMarketingConsentUpdate(input: $input) { customer { id } userErrors { field message } } }`,
    { input: { customerId: id, emailMarketingConsent: consentimiento } });
  if (u.customerEmailMarketingConsentUpdate.userErrors.length) throw new Error(u.customerEmailMarketingConsentUpdate.userErrors.map((x) => x.message).join('; '));
  if (si) await shop(`mutation Tags($id: ID!, $tags: [String!]!) { tagsAdd(id: $id, tags: $tags) { userErrors { field message } } }`, { id, tags: ['newsletter', 'app-planificador'] });
  return si ? 'cliente existente suscrito' : 'cliente dado de baja';
}

// Cliente mínimo de la API GraphQL de Shopify (token fijo o client credentials, que dura 24 h).
function shopifyCliente(env) {
  const dominio = String(env.SHOPIFY_SHOP).replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const version = env.SHOPIFY_API_VERSION || '2026-07';
  let token = env.SHOPIFY_ADMIN_TOKEN || null;
  return async (query, variables) => {
    if (!token) {
      const r = await fetch(`https://${dominio}/admin/oauth/access_token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=client_credentials&client_id=${encodeURIComponent(env.SHOPIFY_CLIENT_ID)}&client_secret=${encodeURIComponent(env.SHOPIFY_CLIENT_SECRET)}`,
      });
      if (!r.ok) throw new Error(`Shopify token ${r.status}: ${await r.text()}`);
      token = (await r.json()).access_token;
    }
    const r = await fetch(`https://${dominio}/admin/api/${version}/graphql.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': token },
      body: JSON.stringify({ query, variables }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || j.errors) throw new Error(`Shopify ${r.status}: ${JSON.stringify(j.errors || j).slice(0, 200)}`);
    return j.data;
  };
}
