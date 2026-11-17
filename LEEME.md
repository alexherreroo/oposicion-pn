# Oposición PN · Planificador

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
6. En Firestore → pestaña **Reglas**, borra lo que haya, pega esto y pulsa **Publicar**:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{uid} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```
   (Así solo tú, con tu cuenta, puedes leer y escribir tus datos.)
7. En GitHub, abre el archivo **`firebase-config.js`** → icono del lápiz ✏️ → rellena los valores entre comillas con los del paso 2 → **Commit changes**.
8. Abre la web, ve a **Ajustes → Iniciar sesión con Google**. Haz lo mismo en el móvil. ¡Listo, todo sincronizado!

> Si ya tenías datos en modo local, al iniciar sesión por primera vez se suben a la nube.

## Paso 3 · Instalarla en el móvil como app

- **Android (Chrome):** abre la web → menú ⋮ → **Añadir a pantalla de inicio / Instalar app**.
- **iPhone (Safari):** abre la web → botón compartir → **Añadir a pantalla de inicio**.

Funciona sin conexión: los cambios se guardan y se sincronizan al volver internet.

---

## Cómo funciona

- **Vueltas:** en *Hoy* o en la ficha de un tema pulsa *Vuelta completa* (cuenta una vuelta) o *Repaso* (no suma vuelta). Valora cómo te lo sabías: 😣 Mal · 😐 Regular · 🙂 Bien · 😎 Fácil.
- **Repetición espaciada:** con esa valoración la app calcula cuándo vuelve a tocarte el tema (Mal → mañana; Fácil → bastantes días después; máx. 60 días).
- **Dominio estimado (%):** sale de tus últimas valoraciones, del número de vueltas y de cuánto tiempo llevas sin tocar el tema (baja poco a poco si no repasas). Tu semáforo manual (No lo sé / Flojo / Dominado) se guarda aparte y la app te avisa ⚠️ si no cuadra con la estimación.
- **Hoy:** eliges entre **avanzar** (siguiente tema de la vuelta) o **repasar** (los que te tocan, o cualquier tema anterior).
- **Plan:** vistas Día / Semana / Mes, tareas propias (academia, simulacro, entreno…), objetivos semanales y mensuales. **Autoplanificar** rellena la semana con temas nuevos + repasos que vencen (arrastre). Configura cuántos en *Ajustes*.
- **Físicas:** registra tus marcas; ves evolución y nota aproximada. ⚠️ Los puntos son una **estimación** interpolada entre las marcas de 0, 5 y 10 puntos; compruébalo con el anexo del baremo oficial de tu convocatoria. Las anclas están en `js/logic.js` (`BAREMO`) por si cambian.
- **Copia de seguridad:** *Ajustes → Descargar copia*. Hazlo de vez en cuando.

## Probarla en tu PC sin publicarla

Por seguridad, el navegador no deja abrir esta web con doble clic sobre `index.html`. Si quieres probarla en local antes de subirla, con Python instalado ejecuta en la carpeta: `python -m http.server` y abre <http://localhost:8000>. (No es necesario: lo normal es usar el enlace de GitHub Pages.)

## Actualizar la web

Si cambias archivos, sube la nueva versión en GitHub y cambia `pn-v1` por `pn-v2` en `sw.js` para que el móvil descargue la versión nueva.
