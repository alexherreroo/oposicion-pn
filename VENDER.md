# Cómo vender la app (prueba de 3 días + pago único de por vida)

## Cómo funciona

1. Alguien entra en tu web y ve la **portada** con precio y preguntas frecuentes.
2. Pulsa **"Empezar prueba gratis con Google"**. Se crea su cuenta y empiezan sus **3 días de prueba** con todo desbloqueado. La fecha de inicio la pone el servidor de Google, así que no se puede trucar.
3. Al acabar la prueba ve la **pantalla de pago**, con un botón que abre tu plataforma de pago con su email ya rellenado. Sus datos se conservan.
4. Te llega el aviso del pago. Abres **Admin** en la app y pulsas **"Activar de por vida"** en su email. Su app se desbloquea al momento, sin recargar.

Quien no ha pagado **no puede leer ni guardar datos** aunque toque el código. Lo impiden las reglas de seguridad de Firebase (archivo `firestore.rules`), que se comprueban en los servidores de Google.

---

## Paso 1 · Publicar las reglas de seguridad nuevas (5 min) ⚠️ lo primero

1. Abre `firestore.rules` y copia todo su contenido.
2. Cambia `TU_EMAIL_DE_ADMIN@gmail.com` por el email de Google con el que entras tú. Ese email será el único administrador.
3. Ve a Firebase → **Firestore Database → Reglas**, borra lo que haya, pega y pulsa **Publicar**.

Si publicas la app nueva sin las reglas nuevas, al entrar verás "No se pudo comprobar tu cuenta".

## Paso 2 · Rellenar tus datos en `app-config.js`

En GitHub: abre `app-config.js` → lápiz ✏️ → rellena → **Commit changes**.

- `emailSoporte`: un email de contacto. Mejor uno solo para esto, por ejemplo `soporte.oposicionpn@gmail.com`.
- `titular`, `nif`, `domicilio`, `web`: los exige la ley (LSSI) para vender en internet. Aparecen en Aviso legal, Privacidad y Términos. Mientras falten, esas páginas muestran avisos amarillos `[COMPLETA …]`.
- `precio`, `nombre`, `eslogan`, `tiempoActivacion`: a tu gusto.
- `urlPago`: el enlace de pago del paso 4.

## Paso 3 · Mover la web a un hosting que permita vender (15 min)

Las normas de GitHub Pages **no permiten** usarlo para un negocio o una tienda online. Usa **Cloudflare Pages**: es gratis, permite uso comercial, no tiene límite de visitas y se actualiza solo cada vez que cambias algo en GitHub.

1. Crea una cuenta en <https://dash.cloudflare.com>.
2. Ve a **Workers y Pages → Crear → Pages → Conectar a Git**. Autoriza GitHub y elige el repositorio `oposicion-pn`.
3. Configuración: *Framework* **Ninguno**, *Comando de compilación* **vacío**, *Directorio de salida* **`/`**. Pulsa **Guardar e implementar**.
4. Te dará una dirección del tipo `oposicion-pn.pages.dev`.
5. En Firebase → **Authentication → Configuración → Dominios autorizados**, añade esa dirección.
6. (Recomendado) Compra un dominio propio, por ejemplo `oposicionpn.es`, por unos 10 €/año. Conéctalo en Cloudflare Pages → *Dominios personalizados* y añádelo también a los dominios autorizados de Firebase. Da mucha más confianza a los compradores.
7. Cuando funcione, en GitHub → **Settings → Pages** desactiva GitHub Pages. Ya puedes poner el repositorio en **privado** (Settings → General → *Change visibility*), porque Cloudflare sigue publicando desde un repositorio privado.

## Paso 4 · Plataforma de pago (30 min)

Usa una plataforma que actúe como **"Merchant of Record"**. Vende en tu nombre y se encarga del **IVA de cada país**, las facturas y las devoluciones. Opciones:

- **Stripe** con *Managed Payments* (la opción de Stripe que hace de Merchant of Record), si te la ofrece para tu cuenta en España. Si no, Stripe normal es más barato, pero el IVA lo declaras tú.
- **Lemon Squeezy** o **Gumroad**: también hacen de Merchant of Record.

En cualquiera de ellas:

1. Crea un producto **"Acceso de por vida"** con **pago único** (no suscripción) del precio que quieras.
2. Crea un **enlace de pago** (*Payment Link* o *Checkout link*).
3. Pégalo en `urlPago` de `app-config.js` añadiendo lo necesario para que llegue el email del comprador:
   - Stripe: `https://buy.stripe.com/XXXX?prefilled_email={email}&client_reference_id={uid}`
   - Lemon Squeezy: `https://TU-TIENDA.lemonsqueezy.com/buy/XXXX?checkout[email]={email}&checkout[custom][uid]={uid}`
4. Activa los **avisos por email de cada venta** en la plataforma.

## Paso 5 · Cada vez que alguien paga

1. Te llega el email de la venta.
2. Abre la app → **Admin** (solo lo ves tú, en el menú de la izquierda del ordenador o en Ajustes → Tu cuenta).
3. Busca su email y pulsa **"Activar de por vida"**. Si pagó con otro email, escríbelo en *"Activar acceso de por vida"*.

Desde ese panel también puedes:
- ver quién está en prueba y a quién se le ha acabado (posibles compradores),
- dar **+3 días de prueba** a alguien,
- **quitar el acceso**, por ejemplo si te piden una devolución.

## Paso 6 · Parte legal y fiscal (consúltalo con un gestor)

- **Alta como autónomo** (modelo 036/037 en Hacienda y RETA en la Seguridad Social) si la venta es habitual. Pregunta a un gestor por tu caso concreto.
- **IVA**: si usas un Merchant of Record lo gestiona él. Tú facturas a la plataforma.
- **Textos legales**: la app trae Aviso legal, Privacidad y Términos como **plantillas**. Revísalos con tu gestor o con un abogado antes de vender.
- **Marca**: no uses escudos, logos ni colores oficiales de la Policía Nacional, ni digas que es oficial. La app ya incluye el aviso de que es independiente.

## Costes y límites

- **Firebase gratis (plan Spark)**: unas 20.000 escrituras y 50.000 lecturas al día. Da para unos **cien o doscientos usuarios activos a diario**. Si los superas, pasa al plan **Blaze** (pago por uso). Con ese volumen suele costar céntimos o pocos euros al mes, y puedes poner una alerta de presupuesto.
- **Cloudflare Pages**: gratis.
- **Plataforma de pago**: alrededor de un 5–7 % por venta según la opción.
- **Dominio**: unos 10 €/año (opcional).

## Mejora futura: activación automática

Cuando tengas bastantes ventas, se puede automatizar el paso 5: la plataforma de pago avisa a un pequeño servicio (por ejemplo un *Cloudflare Worker*, también gratis) y la licencia se activa sola en segundos.
