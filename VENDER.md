# Cómo vender la app (prueba de 3 días + pago único de por vida)

## Cómo funciona

1. Alguien entra en la web de la app y ve la **portada** con precio y preguntas frecuentes.
2. Pulsa **"Empezar prueba gratis con Google"**. Se crea su cuenta y empiezan sus **3 días de prueba** con todo desbloqueado. La fecha de inicio la pone el servidor de Google, así que no se puede trucar.
3. Al acabar la prueba ve la **pantalla de pago**. El botón abre tu tienda **OpoMapas** con el producto *Planificador de oposiciones: Policía Nacional y Guardia Civil · Acceso de por vida* en el carrito, su email rellenado y su cuenta de la app vinculada al pedido.
4. Al pagar, Shopify avisa al **activador automático** (`shopify-worker/worker.js`, un Cloudflare Worker gratuito). Este guarda la licencia en Firebase y **la app se desbloquea sola en segundos**.
5. Si alguien compra directamente en la tienda, sin pasar por la app, su acceso queda activado para el email del pedido. Le basta con entrar en la app con la cuenta de Google de ese email.
6. Los **packs** que incluyan el planificador también lo activan si su SKU contiene la palabra `PLANIFICADOR`, por ejemplo `PACK-TODO-PLANIFICADOR`.

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
- `precio`, `nombre`, `eslogan`: a tu gusto. Si cambias el precio en Shopify, cámbialo aquí también.
- `urlPago`: ya apunta a tu producto de Shopify. Solo cámbialo si borras el producto y creas otro, porque cambia el número de variante.

## Paso 3 · Mover la web a un hosting que permita vender (15 min) ✅ hecho: https://app.opomapas.com

Las normas de GitHub Pages **no permiten** usarlo para un negocio o una tienda online. Usa **Cloudflare Pages**: es gratis, permite uso comercial, no tiene límite de visitas y se actualiza solo cada vez que cambias algo en GitHub.

1. Crea una cuenta en <https://dash.cloudflare.com>.
2. Ve a **Workers y Pages → Crear → Pages → Conectar a Git**. Autoriza GitHub y elige el repositorio `oposicion-pn`.
3. Configuración: *Framework* **Ninguno**, *Comando de compilación* **vacío**, *Directorio de salida* **`/`**. Pulsa **Guardar e implementar**.
4. Te dará una dirección del tipo `oposicion-pn.pages.dev`.
5. En Firebase → **Authentication → Configuración → Dominios autorizados**, añade esa dirección.
6. (Recomendado) Usa un subdominio de tu tienda, por ejemplo **`app.opomapas.com`**: en Cloudflare Pages → *Dominios personalizados* añade `app.opomapas.com` y crea el registro **CNAME** que te indique donde gestiones el dominio (si lo compraste en Shopify: Configuración → Dominios → opomapas.com → Configuración de DNS). Añádelo también a los dominios autorizados de Firebase. Si no, puedes comprar un dominio propio, por ejemplo `oposicionpn.es`, por unos 10 €/año. Conéctalo en Cloudflare Pages → *Dominios personalizados* y añádelo también a los dominios autorizados de Firebase. Da mucha más confianza a los compradores.
7. Cuando funcione, en GitHub → **Settings → Pages** desactiva GitHub Pages. Ya puedes poner el repositorio en **privado** (Settings → General → *Change visibility*), porque Cloudflare sigue publicando desde un repositorio privado.

## Paso 4 · Activación automática Shopify → app (20 min)

**4.1 · Clave de Firebase para el activador**
1. Firebase → ⚙️ **Configuración del proyecto → Cuentas de servicio → Generar nueva clave privada**. Se descarga un archivo `.json`.
2. ⚠️ Ese archivo da acceso total a tu base de datos: **no lo subas a GitHub ni lo compartas**. Solo lo vas a pegar en Cloudflare (paso 4.2) y después puedes borrarlo de tu ordenador.

**4.2 · Crear el activador en Cloudflare**
1. En <https://dash.cloudflare.com>: **Workers y Pages → Crear → Worker** → nombre `activador-opomapas` → **Implementar**.
2. Pulsa **Editar código**, borra todo, pega el contenido de `shopify-worker/worker.js` y pulsa **Implementar**.
3. En el Worker → **Configuración → Variables y secretos → Añadir**, de tipo **Secreto**:
   - `GOOGLE_SERVICE_ACCOUNT`: pega **todo** el contenido del archivo `.json` del paso 4.1.
   - `SHOPIFY_WEBHOOK_SECRET`: déjalo para el paso 4.3.
4. Copia la dirección del Worker, del tipo `https://activador-opomapas.TU-USUARIO.workers.dev`.

**4.3 · Aviso de Shopify (webhook)**
1. Admin de Shopify → **Configuración → Notificaciones → Webhooks → Crear webhook**.
2. Evento: **Pago del pedido** (*Order payment*). Formato: **JSON**. URL: la del Worker. Versión: la más reciente. **Guardar**.
3. Debajo de la lista de webhooks verás *"Tus webhooks se firmarán con …"*. Copia esa clave y guárdala en Cloudflare como secreto `SHOPIFY_WEBHOOK_SECRET`.
4. Pulsa **Enviar notificación de prueba**. No activará a nadie, porque el pedido de prueba no lleva el planificador, pero en Cloudflare → *Registros* verás que llegó.

**4.4 · Publicar el producto**
- En Shopify → Productos → *Planificador de oposiciones: Policía Nacional y Guardia Civil · Acceso de por vida*: revisa el texto, añade el enlace a la app en la descripción y pon el estado en **Activo**, con el canal **Tienda online** marcado.
- **Pack con todo:** crea el producto o variante con el precio que quieras y pon un **SKU que contenga `PLANIFICADOR`**, por ejemplo `PACK-TODO-PLANIFICADOR`. Para entregar también los PDF de los mapas, adjúntalos como en tus otros packs.

**4.5 · Prueba real**
Crea un código de descuento del 100 % solo para ti, compra el planificador con un email tuyo distinto al de administrador y comprueba que en la app aparece *Acceso de por vida*.

## Paso 5 · Día a día

- Las compras en Shopify **se activan solas**. En **Admin** (dentro de la app) verás cada usuario con su número de pedido de Shopify.
- **Casos especiales**, como regalos o alguien que pagó con un email distinto al de su cuenta de Google: en Admin → *Activar acceso de por vida*, pega su email.
- **Devoluciones:** reembolsa en Shopify y, en Admin, pulsa **Quitar acceso** en ese usuario.
- **Más días de prueba:** en Admin → **Prueba +3 días**.

## Paso 6 · Parte legal y fiscal (consúltalo con un gestor)

- **Alta como autónomo** (modelo 036/037 en Hacienda y RETA en la Seguridad Social) si la venta es habitual. Pregunta a un gestor por tu caso concreto.
- **IVA**: vendiendo en Shopify **tú** eres el vendedor y declaras el IVA, como ya haces con los mapas. Por debajo de 10.000 €/año de ventas a otros países de la UE aplicas el IVA español. Configura los impuestos en Shopify → *Impuestos y aranceles*.
- **Textos legales**: la app trae Aviso legal, Privacidad y Términos como **plantillas**. Revísalos con tu gestor o con un abogado antes de vender.
- **Marca**: no uses escudos, logos ni colores oficiales de la Policía Nacional ni de la Guardia Civil, ni digas que es oficial. La app ya incluye el aviso de que es independiente.


## Paso 7 · Novedades por email (casilla opcional en la app)

La app puede mostrar una casilla **desmarcada** en la bienvenida y un interruptor en *Ajustes*: "Quiero recibir por email novedades, tests y ofertas de OpoMapas". Quien la marca queda **suscrito en Shopify** (con las etiquetas `newsletter` y `app-planificador`) y quien la desmarca se da de baja. Se guarda qué aceptó y cuándo, como prueba del consentimiento. Está apagada hasta que hagas estos pasos:

**7.1 · Reglas de Firestore.** En Firebase → Firestore Database → Reglas, añade este bloque justo antes de `// Documento ficticio para que la app sepa si eres administrador.` (no borres nada más; también está en `firestore.rules`) y pulsa **Publicar**:

```
    match /suscripciones/{uid} {
      allow read: if signedIn() && (request.auth.uid == uid || isAdmin());
      allow create, update: if signedIn() && request.auth.uid == uid
        && request.resource.data.keys().hasOnly(['email', 'estado', 'fecha', 'texto', 'origen', 'sincronizado'])
        && request.resource.data.email == myEmail()
        && request.resource.data.estado in ['si', 'no']
        && request.resource.data.fecha == request.time
        && request.resource.data.sincronizado == false;
    }
```

**7.2 · Permiso de Shopify para gestionar clientes** (una de las dos formas):
- **A (si tu admin lo permite):** Shopify → Configuración → Apps y canales de ventas → **Desarrollar apps** → Crear una app ("Activador planificador") → *Configurar ámbitos de la API de Admin*: marca `write_customers` y `read_customers` → Guardar → **Instalar app** → copia el **token de acceso de la API de Admin** (empieza por `shpat_`; solo se muestra una vez).
- **B (si Shopify te manda al Dev Dashboard):** en <https://dev.shopify.com/dashboard> crea una app, en su versión marca los permisos `write_customers` y `read_customers`, publícala e **instálala en tu tienda**. En *Settings* copia el **Client ID** y el **Client secret**.

**7.3 · Activador de Cloudflare.**
1. Workers y Pages → `activador-opomapas` → **Editar código** → pega el `shopify-worker/worker.js` nuevo → **Implementar**.
2. Configuración → Variables y secretos → Añadir:
   - `SHOPIFY_SHOP` (texto): `d1yjv4-ts.myshopify.com`
   - Forma A: `SHOPIFY_ADMIN_TOKEN` (secreto): el token `shpat_…`
   - Forma B: `SHOPIFY_CLIENT_ID` y `SHOPIFY_CLIENT_SECRET` (secretos)
3. Configuración → **Activadores (Triggers) → Cron Triggers → Añadir**: `*/15 * * * *` (cada 15 minutos).

**7.4 · Encenderla.** En `app-config.js` cambia `novedades: { activo: false` por `activo: true`.

Comprobación: marca la casilla en *Ajustes* con tu cuenta; en 15 minutos aparecerás en Shopify → Clientes como suscrito al marketing por email. En Firestore, el documento `suscripciones/{tu uid}` tendrá `sincronizado: true` y el `resultado`. Para enviar los correos usa **Shopify Email** filtrando por la etiqueta `app-planificador` o por "suscrito a marketing".

## Costes y límites

- **Firebase gratis (plan Spark)**: unas 20.000 escrituras y 50.000 lecturas al día. Da para unos **cien o doscientos usuarios activos a diario**. Si los superas, pasa al plan **Blaze** (pago por uso). Con ese volumen suele costar céntimos o pocos euros al mes, y puedes poner una alerta de presupuesto.
- **Cloudflare Pages**: gratis.
- **Shopify Payments**: la comisión por venta de tu plan Basic, la misma que con los mapas.
- **Dominio**: unos 10 €/año (opcional).

