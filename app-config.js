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
  precio: '29 €', // texto que se muestra (el cobro real lo fija tu plataforma de pago)
  // Días de prueba gratis. ⚠️ Si lo cambias, cambia también el número en firestore.rules
  // (duration.value(3, 'd')) o la app y la base de datos no coincidirán.
  diasPrueba: 3,
  // Enlace de pago de tu plataforma (Stripe Payment Link, Lemon Squeezy, Gumroad…).
  // Puedes usar {email} y {uid}: se sustituyen por los del usuario para que el pago
  // llegue con su email ya rellenado. Ejemplos:
  //   Stripe:        'https://buy.stripe.com/XXXX?prefilled_email={email}&client_reference_id={uid}'
  //   Lemon Squeezy: 'https://TU-TIENDA.lemonsqueezy.com/buy/XXXX?checkout[email]={email}&checkout[custom][uid]={uid}'
  urlPago: '',
  // Cuánto tardas en activar el acceso tras el pago (se muestra al comprador).
  tiempoActivacion: 'normalmente en menos de 12 horas',

  // --- Contacto y datos legales (obligatorios para vender en España) ---
  emailSoporte: '',
  titular: '', // tu nombre completo o el de tu empresa
  nif: '',
  domicilio: '', // dirección completa (exigida por la LSSI)
  web: '', // dirección de la web, p. ej. https://oposicionpn.com
  fechaLegal: '17 de noviembre de 2026', // fecha de última actualización de los textos legales
};
