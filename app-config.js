// =====================================================================
//  CONFIGURACIÓN DEL PRODUCTO
//  Todo lo que necesitas cambiar para vender la app está aquí.
//  Edita los textos entre comillas y guarda (Commit changes).
// =====================================================================
export default {
  // --- Marca ---
  nombre: 'Planificador OpoMapas',
  subtitulo: 'Policía Nacional y Guardia Civil',
  // Aparece en la portada. No uses logos ni nombres que parezcan oficiales.
  eslogan: 'Planifica tu oposición a Policía Nacional o Guardia Civil y da vueltas al temario sin perder el hilo.',

  // --- Venta ---
  precio: '9,99 €', // texto que se muestra (el cobro real lo fija el producto en Shopify)
  // Oferta: precio anterior tachado y etiqueta. Déjalos vacíos ('') para quitar la oferta.
  precioAntes: '19,99 €',
  oferta: 'Oferta de lanzamiento',
  // Días de prueba gratis. ⚠️ Si lo cambias, cambia también el número en firestore.rules
  // (duration.value(3, 'd')) o la app y la base de datos no coincidirán.
  diasPrueba: 3,
  // Enlace de compra. Ahora apunta al producto "Planificador de oposiciones: Policía Nacional y Guardia Civil · Acceso de por vida"
  // de tu tienda Shopify (variante 61721546948942). También sirve cualquier otra plataforma de pago.
  // Puedes usar {email} y {uid}: se sustituyen por los del usuario para que el pago
  // llegue con su email ya rellenado. Ejemplos:
  //   Stripe:        'https://buy.stripe.com/XXXX?prefilled_email={email}&client_reference_id={uid}'
  //   Lemon Squeezy: 'https://TU-TIENDA.lemonsqueezy.com/buy/XXXX?checkout[email]={email}&checkout[custom][uid]={uid}'
  urlPago: 'https://www.opomapas.com/cart/61721546948942:1?checkout[email]={email}&attributes[app_email]={email}&attributes[app_uid]={uid}',
  // Cuánto tardas en activar el acceso tras el pago (se muestra al comprador).
  tiempoActivacion: 'automáticamente en unos segundos',
  // Tu tienda (aparece en la pantalla de pago y al pie de la portada).
  tienda: 'OpoMapas',
  urlTienda: 'https://www.opomapas.com',

  // --- Enlaces a la tienda (solo se muestran a quien no tiene los mapas: en prueba o con el planificador suelto) ---
  // Todos llevan utm_source=app para medir en Shopify qué ventas vienen de la app.
  mapas: {
    gratis: 'https://www.opomapas.com/pages/mapas-gratis-policia-nacional',
    articulo: 'https://www.opomapas.com/blogs/noticias/tema-{n}-policia-nacional',
    temasSinArticulo: [12, 13, 15, 44, 45], // para estos se enlaza a los mapas gratis
    packBloque: {
      J: { nombre: 'Pack Jurídicas', url: 'https://www.opomapas.com/products/pack-juridicas' },
      S: { nombre: 'Pack Sociales', url: 'https://www.opomapas.com/products/pack-sociales' },
      T: { nombre: 'Pack Técnico-Científicas', url: 'https://www.opomapas.com/products/pack-tecnico-cientificas' },
    },
  },
  // Lo mismo para Guardia Civil (los packs de Guardia Civil tienen SKU que empieza por GC-PACK-).
  mapasGC: {
    gratis: 'https://www.opomapas.com/pages/mapas-gratis-guardia-civil',
    // Páginas por tema que existen en la web (el resto enlaza a los mapas gratis).
    temaUrl: {
      1: 'https://www.opomapas.com/pages/guardia-civil-tema-1-derechos-humanos', 2: 'https://www.opomapas.com/pages/guardia-civil-tema-2-igualdad',
      3: 'https://www.opomapas.com/pages/guardia-civil-tema-3-prevencion-riesgos-laborales', 4: 'https://www.opomapas.com/pages/guardia-civil-tema-4-constitucion',
      5: 'https://www.opomapas.com/pages/guardia-civil-tema-5-derecho-union-europea', 6: 'https://www.opomapas.com/pages/guardia-civil-tema-6-instituciones-internacionales',
      7: 'https://www.opomapas.com/pages/guardia-civil-tema-7-codigo-civil', 8: 'https://www.opomapas.com/pages/guardia-civil-tema-8-codigo-penal',
      9: 'https://www.opomapas.com/pages/guardia-civil-tema-9-derecho-procesal-penal', 10: 'https://www.opomapas.com/pages/guardia-civil-tema-10-derecho-administrativo',
      11: 'https://www.opomapas.com/pages/guardia-civil-tema-11-proteccion-de-datos', 12: 'https://www.opomapas.com/pages/guardia-civil-tema-12-extranjeria',
    },
    // Pack de cada tema.
    packs: [
      { temas: [13, 14, 15], nombre: 'Pack 1 · Seguridad y Guardia Civil', url: 'https://www.opomapas.com/products/pack-1-seguridad-y-guardia-civil-el-mapa-de-la-guardia-civil-2027' },
      { temas: [4, 7, 8, 9], nombre: 'Pack 2 · Jurídicas I', url: 'https://www.opomapas.com/products/pack-2-juridicas-i-el-mapa-de-la-guardia-civil-2027' },
      { temas: [1, 2, 3, 5, 6, 10, 11, 12], nombre: 'Pack 3 · Jurídicas II', url: 'https://www.opomapas.com/products/pack-3-juridicas-ii-el-mapa-de-la-guardia-civil-2027' },
      { temas: [16, 17, 18, 19, 20, 21, 22], nombre: 'Pack 4 · Técnicas', url: 'https://www.opomapas.com/products/pack-4-tecnicas-el-mapa-de-la-guardia-civil-2027' },
    ],
    completo: { nombre: 'Pack Completo de Guardia Civil', url: 'https://www.opomapas.com/products/pack-completo-el-mapa-de-la-guardia-civil-2027' },
  },

  // --- Práctica gratis en la web (se enlaza desde la sección Tests) ---
  practicaWeb: {
    pn: [['Simulacro gratis de 20 preguntas', 'https://www.opomapas.com/pages/simulacro-gratis-policia-nacional'], ['Test diario gratis', 'https://www.opomapas.com/pages/tests-gratis#pn'], ['Prueba de nivel de Constitución', 'https://www.opomapas.com/pages/prueba-de-nivel-oposiciones']],
    gc: [['Test diario gratis', 'https://www.opomapas.com/pages/tests-gratis#gc'], ['Prueba de nivel de Constitución', 'https://www.opomapas.com/pages/prueba-de-nivel-oposiciones']],
  },

  // --- Novedades por email ---
  // Casilla opcional (siempre desmarcada) en la bienvenida y en Ajustes. Quien la marca queda suscrito
  // en Shopify (lo hace el activador de Cloudflare). Si cambias el texto, se guarda el nuevo como prueba.
  // Ponlo en activo: true cuando hayas publicado las reglas de Firestore y configurado el activador (VENDER.md, paso 7).
  novedades: { activo: false, texto: 'Quiero recibir por email novedades, tests y ofertas de OpoMapas. Puedo darme de baja cuando quiera.' },

  // --- Repaso rápido (preguntas y trampas de cada tema, en contenido.js) ---
  // Si pones soloConMapas: true, quien no tenga los mapas de su oposición solo ve las primeras
  // 'gratisPorTema' tarjetas de cada tema y una invitación a comprar el pack.
  practica: { soloConMapas: false, gratisPorTema: 3, porSesion: 10 },

  // Pack que se ofrece al terminar la prueba (debe incluir el planificador: SKU con PLANIFICADOR).
  packOferta: {
    nombre: 'Pack Completo + Planificador',
    precio: '14,99 €',
    precioSeparado: '24,96 €', // 3 bloques de mapas (14,97 €) + planificador (9,99 €)
    url: 'https://www.opomapas.com/cart/61682956697934:1?checkout[email]={email}&attributes[app_email]={email}&attributes[app_uid]={uid}',
  },

  // --- Contacto y datos legales (obligatorios para vender en España) ---
  emailSoporte: 'opomapas@gmail.com',
  titular: 'Alex Herrero Moscardo', // tu nombre completo o el de tu empresa
  nif: '20936623E',
  domicilio: 'Calle La Reina, 67, 46800 Xàtiva (Valencia)', // dirección completa (exigida por la LSSI)
  web: 'https://www.opomapas.com', // dirección de la web
  fechaLegal: '19 de noviembre de 2026', // fecha de última actualización de los textos legales
};
