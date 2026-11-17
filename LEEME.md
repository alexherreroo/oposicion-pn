# Oposición PN · Planificador

> 💶 **¿Quieres venderla?** Lee **[VENDER.md](VENDER.md)**: prueba gratis de 3 días, pago único y panel de administración.

Tu web personal para planificar la oposición a Policía Nacional (Escala Básica): vueltas al temario, repasos espaciados, arrastre, plan diario/semanal/mensual, horas de estudio y pruebas físicas.

Funciona **sin instalar nada**, es **gratis** y tus datos son solo tuyos.

---

## Paso 1 · Publicarla gratis en GitHub Pages (10 min)

1. Crea una cuenta en <https://github.com> (gratis).
2. Arriba a la derecha: **+ → New repository**.
   - Nombre: `oposicion-pn`
   - Márcalo como **Public** (GitHub Pages gratis lo necesita; nadie verá tus datos, solo el código de la web).
   - Pulsa **Create repository**.
3. En la página del repositorio, pulsa **uploading an existing file**.
4. Descomprime el ZIP en tu ordenador y **arrastra todo el contenido de la carpeta** (no la carpeta en sí: `index.html`, `css`, `js`, `icons`, `vendor`, etc.). Pulsa **Commit changes**.
5. Ve a **Settings → Pages**. En *Branch* elige `main` y `/ (root)` → **Save**.
6. Espera 1–2 minutos. Tu web estará en: `https://TU-USUARIO.github.io/oposicion-pn/`

Ya puedes usarla. De momento está en **modo local**: los datos se guardan solo en el navegador donde la abras.

## Paso 2 · Sincronizar PC y móvil con Firebase (15 min, gratis)

1. Entra en <https://console.firebase.google.com> con tu cuenta de Google → **Crear un proyecto** → nombre `oposicion-pn` → puedes desactivar Google Analytics → **Crear**.
2. En la pantalla del proyecto, pulsa el icono **`</>` (Web)** → apodo `web` → **Registrar app**. Te mostrará un bloque así:
   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "oposicion-pn-xxxx.firebaseapp.com",
     projectId: "oposicion-pn-xxxx",
     ...
   };
   ```
   Déjalo a mano.
3. Menú izquierdo → **Compilación → Authentication → Comenzar** → pestaña *Sign-in method* → **Google** → Habilitar → elige tu correo de asistencia → **Guardar**.
4. En Authentication → **Configuración → Dominios autorizados → Agregar dominio** → escribe `TU-USUARIO.github.io`.
5. Menú izquierdo → **Compilación → Firestore Database → Crear base de datos** → ubicación `europe-southwest1 (Madrid)` → **Iniciar en modo de producción** → Crear.
6. En Firestore → pestaña **Reglas**, pega el contenido del archivo **`firestore.rules`** (cambiando `TU_EMAIL_DE_ADMIN@gmail.com` por tu email) y pulsa **Publicar**. Así cada persona solo puede ver sus datos, y solo con la prueba activa o habiendo pagado.
7. En GitHub, abre el archivo **`firebase-config.js`** → icono del lápiz ✏️ → rellena los valores entre comillas con los del paso 2 → **Commit changes**.
8. Abre la web, ve a **Ajustes → Iniciar sesión con Google**. Haz lo mismo en el móvil. ¡Listo, todo sincronizado!

> Si ya tenías datos en modo local, al iniciar sesión por primera vez se suben a la nube.

## Paso 3 · Instalarla en el móvil como app

- **Android (Chrome):** abre la web → menú ⋮ → **Añadir a pantalla de inicio / Instalar app**.
- **iPhone (Safari):** abre la web → botón compartir → **Añadir a pantalla de inicio**.

Funciona sin conexión: los cambios se guardan y se sincronizan al volver internet.

---

## Cómo funciona

- **Dentro de cada tema** tienes tres botones:
  - **Estudio:** apuntas los minutos y una nota de cómo ha ido o por dónde te has quedado. La última nota se ve en la ficha del tema y en *Hoy* ("Te quedaste en…"). Los minutos se suman a tus horas.
  - **Repaso:** valoras cómo te lo sabías (😣 Mal · 😐 Regular · 🙂 Bien · 😎 Fácil) y eliges **tú** cuándo volver a repasarlo.
  - **Vuelta completa:** es el contador de vueltas. Pones la fecha en que la terminaste y **la fecha en que quieres volver a darlo**.
- **La fecha para volver a dar un tema siempre la eliges tú.** Puedes cambiarla o quitarla en la ficha del tema ("Volver a darlo"). Ese día el tema aparece en *Hoy → Repasar*.
- **Temario:** filtra por *Sin empezar / No lo sé / Flojo / Bien / Dominado* según lo que marques tú en "Cómo lo llevo". El % es solo una estimación orientativa a partir de tus valoraciones.
- **Plan → Autoplanificar:** primero mete los temas que te faltan de la vuelta actual, repartidos hasta la fecha objetivo de esa vuelta. Si te toca menos de un tema al día, pone "Seguir tema X". Después mete los repasos en las fechas que elegiste; durante la 1ª vuelta solo lo hace si lo activas en *Ajustes*. Puedes pulsarlo las veces que quieras: rehace solo las tareas automáticas y no toca las tuyas.
- **Ajustes → Objetivos de vueltas:** la fecha en que quieres terminar la vuelta 1, la 2, etc.
- **Físicas:** registra tus marcas; ves evolución y nota aproximada. ⚠️ Los puntos son una **estimación** interpolada entre las marcas de 0, 5 y 10 puntos; compruébalo con el anexo del baremo oficial de tu convocatoria. Las anclas están en `logic.js` (`BAREMO`) por si cambian.
- **Copia de seguridad:** *Ajustes → Descargar copia*. Hazlo de vez en cuando.

## Probarla en tu PC sin publicarla

Por seguridad, el navegador no deja abrir esta web con doble clic sobre `index.html`. Si quieres probarla en local antes de subirla, con Python instalado ejecuta en la carpeta: `python -m http.server` y abre <http://localhost:8000>. (No es necesario: lo normal es usar el enlace de GitHub Pages.)

## Actualizar la web

Si cambias archivos, sube la nueva versión en GitHub y cambia el número de `CACHE` (por ejemplo `pn-v3` → `pn-v4`) en `sw.js` para que el móvil descargue la versión nueva.
