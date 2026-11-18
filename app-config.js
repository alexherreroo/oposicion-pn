// =====================================================================
//  CONFIGURACIÓN DEL PRODUCTO
//  Todo lo que necesitas cambiar para vender la app está aquí.
//  Edita los textos entre comillas y guarda (Commit changes).
// =====================================================================
export default {
  // --- Marca ---
  nombre: 'Oposición PN',
  subtitulo: 'Escala Básica',
  // Aparece en la portada. No uses logos ni nombres que parezcan oficiales.
  eslogan: 'Planifica tu oposición a Policía Nacional y da vueltas al temario sin perder el hilo.',

  // --- Venta ---
  precio: '9,99 €', // texto que se muestra (el cobro real lo fija el producto en Shopify)
  // Oferta: precio anterior tachado y etiqueta. Déjalos vacíos ('') para quitar la oferta.
  precioAntes: '19,99 €',
  oferta: 'Oferta de lanzamiento',
  // Días de prueba gratis. ⚠️ Si lo cambias, cambia también el número en firestore.rules
  // (duration.value(3, 'd')) o la app y la base de datos no coincidirán.
  diasPrueba: 3,
  // Enlace de compra. Ahora apunta al producto "Planificador Policía Nacional · Acceso de por vida"
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

  // --- Contacto y datos legales (obligatorios para vender en España) ---
  emailSoporte: 'opomapas@gmail.com',
  titular: '', // tu nombre completo o el de tu empresa
  nif: '',
  domicilio: '', // dirección completa (exigida por la LSSI)
  web: 'https://www.opomapas.com', // dirección de la web
  fechaLegal: '17 de noviembre de 2026', // fecha de última actualización de los textos legales
};
