// Estado de la app, sesión, prueba gratuita y licencias.
// Los datos se guardan en el navegador (por usuario) y se sincronizan con Firebase.
import firebaseConfig from './firebase-config.js';
import CONFIG from './app-config.js';

const BASE_KEY = 'pn-planner-v1';
const FB = 'https://www.gstatic.com/firebasejs/10.12.2/';
const DIA = 86400000;

export const defaultState = () => ({
  version: 1,
  updatedAt: 0,
  settings: {
    theme: 'auto',
    examDate: '',
    sexo: 'H',
    diasEstudio: [0, 1, 2, 3, 4, 5],
    nuevosPorDia: 1,
    maxRepasosDia: 3,
    horasObjetivoSemana: 20,
    objetivosVuelta: [], // fecha objetivo para terminar cada vuelta (índice 0 = vuelta 1)
    repasosEnPrimeraVuelta: false,
    onboarded: false, // ya ha pasado por la bienvenida
  },
  temas: {}, // { [id]: { semaforo, proximo, regs: [{id, date, tipo:'estudio'|'repaso'|'vuelta', min?, note?, rating?}] } }
  tasks: [], // { id, date, title, type, done, temaId?, kind?, auto? }
  goals: [], // { id, period:'semana'|'mes', key, text, done }
  horas: [], // { id, date, min, note, regId? }
  fisicas: [], // { id, date, prueba, value }
});

function normalize(s) {
  const d = defaultState();
  return { ...d, ...s, settings: { ...d.settings, ...(s?.settings || {}) } };
}

// Cada usuario tiene su propia copia local, para que en un ordenador compartido no se mezclen datos.
let storageKey = BASE_KEY;
function loadLocal() {
  try { const raw = localStorage.getItem(storageKey); if (raw) return normalize(JSON.parse(raw)); } catch {}
  return defaultState();
}
function saveLocal() { try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {} }

const enabled = !!firebaseConfig.apiKey;
let state = enabled ? defaultState() : loadLocal();
const listeners = new Set();

export const cloud = { enabled, user: null, status: enabled ? 'cargando' : 'local', error: '' };
// estado: cargando | sin-sesion | prueba | pago | admin | caducada | local
export const acceso = { estado: enabled ? 'cargando' : 'local', finPrueba: null, esAdmin: false, licencia: false, tieneMapas: false };
export const permitido = () => ['prueba', 'pago', 'admin', 'local'].includes(acceso.estado);

// Solo para ver pantallas sin Firebase durante el desarrollo: ?demo=landing|caducada|prueba|admin
if (!enabled) {
  const demo = new URLSearchParams(location.search).get('demo');
  if (demo) {
    acceso.estado = demo === 'landing' ? 'sin-sesion' : demo;
    acceso.esAdmin = demo === 'admin';
    acceso.tieneMapas = new URLSearchParams(location.search).has('mapas');
    acceso.finPrueba = Date.now() + (parseFloat(new URLSearchParams(location.search).get('quedan')) || 2.3) * DIA;
    cloud.user = demo === 'landing' ? null : { uid: 'demo', name: 'Persona Demo', email: 'demo@ejemplo.com' };
  }
}

export const getState = () => state;
export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
const notify = () => listeners.forEach((fn) => fn());

export function update(mutator) {
  if (!permitido()) return;
  const draft = structuredClone(state);
  mutator(draft);
  draft.updatedAt = Date.now();
  state = draft;
  saveLocal();
  notify();
  pushRemote();
}

export function replaceAll(newState) {
  if (!permitido()) return;
  state = normalize(newState);
  state.updatedAt = Date.now();
  saveLocal(); notify(); pushRemote();
}

// ---------- Firebase ----------
let fb = null, unsubDoc = null, unsubLic = null, pushTimer = null, trialTimer = null;

function pushRemote() {
  if (!fb || !cloud.user || !permitido() || acceso.estado === 'local') return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(async () => {
    try {
      await fb.setDoc(fb.doc(fb.db, 'users', cloud.user.uid), JSON.parse(JSON.stringify(state)));
      cloud.status = navigator.onLine ? 'sincronizado' : 'sin conexión';
    } catch (e) {
      if (e.code === 'permission-denied') return recalcular();
      cloud.status = 'error'; cloud.error = e.message;
    }
    notify();
  }, 700);
}

function guardarAcceso(uid) {
  try { localStorage.setItem('pn-acceso:' + uid, JSON.stringify({ finPrueba: acceso.finPrueba, esAdmin: acceso.esAdmin, licencia: acceso.licencia, tieneMapas: acceso.tieneMapas })); } catch {}
}
function cargarAccesoGuardado(uid) {
  try { return JSON.parse(localStorage.getItem('pn-acceso:' + uid) || 'null'); } catch { return null; }
}

function recalcular() {
  const antes = acceso.estado;
  if (!cloud.user) acceso.estado = 'sin-sesion';
  else if (acceso.esAdmin) acceso.estado = 'admin';
  else if (acceso.licencia) acceso.estado = 'pago';
  else if (acceso.finPrueba && Date.now() < acceso.finPrueba) acceso.estado = 'prueba';
  else if (acceso.finPrueba) acceso.estado = 'caducada';
  else acceso.estado = 'cargando';
  if (cloud.user && acceso.estado !== 'cargando') guardarAcceso(cloud.user.uid);
  // Al pasar a tener acceso, empezamos a sincronizar; al perderlo, paramos.
  if (permitido() && !unsubDoc && fb) escucharDatos();
  if (!permitido() && unsubDoc) { unsubDoc(); unsubDoc = null; }
  clearTimeout(trialTimer);
  if (acceso.estado === 'prueba') trialTimer = setTimeout(recalcular, Math.min(acceso.finPrueba - Date.now() + 1000, 2 ** 31 - 1));
  if (antes !== acceso.estado) notify();
}

function escucharDatos() {
  const { onSnapshot, doc } = fb;
  unsubDoc = onSnapshot(doc(fb.db, 'users', cloud.user.uid), (snap) => {
    if (snap.metadata.hasPendingWrites) return;
    if (!snap.exists()) { pushRemote(); return; }
    const remote = snap.data();
    if ((remote.updatedAt || 0) > (state.updatedAt || 0)) { state = normalize(remote); saveLocal(); }
    else if ((remote.updatedAt || 0) < (state.updatedAt || 0)) pushRemote();
    cloud.status = snap.metadata.fromCache ? 'sin conexión' : 'sincronizado';
    notify();
  }, (e) => {
    unsubDoc = null;
    if (e.code === 'permission-denied') { comprobarCuenta(); return; }
    cloud.status = 'error'; cloud.error = e.message; notify();
  });
}

async function comprobarCuenta() {
  const { doc, getDoc, setDoc, serverTimestamp } = fb;
  const u = cloud.user;
  try {
    const ref = doc(fb.db, 'accounts', u.uid);
    let snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, { email: u.email, nombre: u.name || '', trialStart: serverTimestamp() });
      snap = await getDoc(ref);
    }
    const ts = snap.data()?.trialStart;
    acceso.finPrueba = ts?.toMillis ? ts.toMillis() + CONFIG.diasPrueba * DIA : Date.now() + CONFIG.diasPrueba * DIA;
  } catch (e) {
    // Sin conexión: usamos lo último que sabíamos.
    const prev = cargarAccesoGuardado(u.uid);
    if (prev) Object.assign(acceso, prev);
    cloud.error = navigator.onLine ? (e.code === 'permission-denied' ? 'Permiso denegado: revisa que las reglas de Firestore estén publicadas (ver VENDER.md).' : e.message) : '';
  }
  try { await getDoc(doc(fb.db, 'admin', 'check')); acceso.esAdmin = true; } catch { /* no es admin */ }
  recalcular();
  notify();
}

export async function initCloud() {
  if (!enabled) return;
  try {
    const [app, auth, fs] = await Promise.all([
      import(FB + 'firebase-app.js'), import(FB + 'firebase-auth.js'), import(FB + 'firebase-firestore.js'),
    ]);
    const a = app.initializeApp(firebaseConfig);
    let db;
    try {
      db = fs.initializeFirestore(a, { localCache: fs.persistentLocalCache({ tabManager: fs.persistentMultipleTabManager() }) });
    } catch { db = fs.getFirestore(a); }
    fb = { ...auth, ...fs, auth: auth.getAuth(a), db };
    // Solo para pruebas en tu ordenador con el emulador de Firebase (http://localhost/?emu=1). No afecta a la web publicada.
    if (location.hostname === 'localhost' && new URLSearchParams(location.search).has('emu')) {
      auth.connectAuthEmulator(fb.auth, 'http://127.0.0.1:9099', { disableWarnings: true });
      fs.connectFirestoreEmulator(db, '127.0.0.1', 8085);
      window.__emuLogin = (email) => auth.signInWithCredential(fb.auth, auth.GoogleAuthProvider.credential(JSON.stringify({ sub: email, email, email_verified: true, name: email.split('@')[0] })));
    }
    try { await auth.getRedirectResult(fb.auth); } catch {}
    auth.onAuthStateChanged(fb.auth, (user) => {
      [unsubDoc, unsubLic].forEach((f) => f && f());
      unsubDoc = unsubLic = null;
      Object.assign(acceso, { finPrueba: null, esAdmin: false, licencia: false, tieneMapas: false });
      try { user ? localStorage.setItem('pn-sesion', '1') : localStorage.removeItem('pn-sesion'); } catch {}
      if (!user) {
        cloud.user = null; storageKey = BASE_KEY; state = defaultState();
        cloud.status = 'sin sesión'; acceso.estado = 'sin-sesion'; notify(); return;
      }
      cloud.user = { uid: user.uid, name: user.displayName, email: (user.email || '').toLowerCase(), photo: user.photoURL };
      storageKey = `${BASE_KEY}:${user.uid}`;
      state = loadLocal();
      cloud.status = 'conectando';
      const prev = cargarAccesoGuardado(user.uid);
      if (prev) { Object.assign(acceso, prev); recalcular(); } else { acceso.estado = 'cargando'; notify(); }
      // Si el administrador activa la licencia, se desbloquea al momento.
      unsubLic = fs.onSnapshot(fs.doc(db, 'licencias', cloud.user.email), (s) => {
        acceso.licencia = s.exists();
        // Si compró un pack (SKU que empieza por PACK-) ya tiene los mapas: no le ofrecemos la tienda.
        acceso.tieneMapas = (s.data()?.skus || []).some((x) => /^PACK-/i.test(x));
        recalcular(); notify();
      }, () => {});
      comprobarCuenta();
    });
  } catch (e) {
    cloud.status = 'error'; cloud.error = 'No se pudo conectar: ' + e.message;
    acceso.estado = 'sin-sesion'; notify();
  }
}

export async function login() {
  if (!fb) return;
  const provider = new fb.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  try { await fb.signInWithPopup(fb.auth, provider); }
  catch (e) {
    if (['auth/popup-blocked', 'auth/operation-not-supported-in-this-environment'].includes(e.code)) await fb.signInWithRedirect(fb.auth, provider);
    else if (e.code !== 'auth/popup-closed-by-user' && e.code !== 'auth/cancelled-popup-request') { cloud.error = e.message; notify(); }
  }
}
export async function logout() { if (fb) await fb.signOut(fb.auth); }
export async function reComprobar() { if (fb && cloud.user) { cloud.error = ''; await comprobarCuenta(); notify(); } }

// Rellena {email} y {uid} del usuario en un enlace de compra y añade la etiqueta UTM.
export function conUsuario(plantilla, medio = '') {
  if (!plantilla) return '';
  const u = cloud.user || {};
  let url = plantilla.replaceAll('{email}', encodeURIComponent(u.email || '')).replaceAll('{uid}', encodeURIComponent(u.uid || ''));
  if (medio) url += (url.includes('?') ? '&' : '?') + `utm_source=app&utm_medium=${medio}&utm_campaign=planificador`;
  return url;
}
export const urlPago = (medio = 'pago') => conUsuario(CONFIG.urlPago, medio);

// Derecho de supresión: borra tus datos de estudio de la nube y de este navegador.
export async function borrarMisDatos() {
  if (fb && cloud.user) await fb.deleteDoc(fb.doc(fb.db, 'users', cloud.user.uid));
  try { localStorage.removeItem(storageKey); } catch {}
  state = defaultState();
  await logout();
  notify();
}

// ---------- Administración ----------
export async function adminListar() {
  const { collection, getDocs } = fb;
  const [acc, lic] = await Promise.all([getDocs(collection(fb.db, 'accounts')), getDocs(collection(fb.db, 'licencias'))]);
  const licencias = new Map(lic.docs.map((d) => [d.id, d.data()]));
  const filas = acc.docs.map((d) => {
    const x = d.data();
    const inicio = x.trialStart?.toMillis ? x.trialStart.toMillis() : null;
    const email = (x.email || '').toLowerCase();
    return { uid: d.id, email, nombre: x.nombre || '', inicio, finPrueba: inicio ? inicio + CONFIG.diasPrueba * DIA : null, licencia: licencias.get(email) || null };
  });
  // Licencias activadas para emails que aún no se han registrado.
  for (const [email, l] of licencias) if (!filas.some((f) => f.email === email)) filas.push({ uid: null, email, nombre: '', inicio: null, finPrueba: null, licencia: l });
  return filas.sort((a, b) => (b.inicio || 0) - (a.inicio || 0));
}
export async function adminActivar(email, nota = '') {
  email = email.trim().toLowerCase();
  if (!email.includes('@')) throw new Error('Email no válido');
  await fb.setDoc(fb.doc(fb.db, 'licencias', email), { activadaEl: fb.serverTimestamp(), nota });
}
export async function adminRevocar(email) { await fb.deleteDoc(fb.doc(fb.db, 'licencias', email)); }
// Deja la prueba de ese usuario terminando dentro de 'dias' días desde ahora.
export async function adminAmpliarPrueba(uid, dias) {
  const inicio = Date.now() + dias * DIA - CONFIG.diasPrueba * DIA;
  await fb.updateDoc(fb.doc(fb.db, 'accounts', uid), { trialStart: fb.Timestamp.fromMillis(inicio) });
}
