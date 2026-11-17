// Estado de la app: se guarda en el navegador y, si Firebase está configurado, se sincroniza en la nube.
import firebaseConfig from './firebase-config.js';

const KEY = 'pn-planner-v1';
const FB = 'https://www.gstatic.com/firebasejs/10.12.2/';

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
  },
  temas: {}, // { [id]: { semaforo, regs: [{id, date, tipo:'vuelta'|'repaso', rating}] } }
  tasks: [], // { id, date, title, type, done, temaId?, kind? }
  goals: [], // { id, period:'semana'|'mes', key, text, done }
  horas: [], // { id, date, min, note }
  fisicas: [], // { id, date, prueba, value }
});

function normalize(s) {
  const d = defaultState();
  return { ...d, ...s, settings: { ...d.settings, ...(s?.settings || {}) } };
}

function loadLocal() {
  try { const raw = localStorage.getItem(KEY); if (raw) return normalize(JSON.parse(raw)); } catch {}
  return defaultState();
}
function saveLocal() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} }

let state = loadLocal();
const listeners = new Set();
export const cloud = { enabled: !!firebaseConfig.apiKey, user: null, status: firebaseConfig.apiKey ? 'cargando' : 'local', error: '' };

export const getState = () => state;
export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
const notify = () => listeners.forEach((fn) => fn());

export function update(mutator) {
  const draft = structuredClone(state);
  mutator(draft);
  draft.updatedAt = Date.now();
  state = draft;
  saveLocal();
  notify();
  pushRemote();
}

export function replaceAll(newState) {
  state = normalize(newState);
  state.updatedAt = Date.now();
  saveLocal(); notify(); pushRemote();
}

// ---------- Nube (Firebase) ----------
let fb = null, unsubDoc = null, pushTimer = null;

function pushRemote() {
  if (!fb || !cloud.user) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(async () => {
    try {
      await fb.setDoc(fb.doc(fb.db, 'users', cloud.user.uid), JSON.parse(JSON.stringify(state)));
      cloud.status = navigator.onLine ? 'sincronizado' : 'sin conexión';
    } catch (e) { cloud.status = 'error'; cloud.error = e.message; }
    notify();
  }, 700);
}

export async function initCloud() {
  if (!cloud.enabled) return;
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
    try { await auth.getRedirectResult(fb.auth); } catch {}
    auth.onAuthStateChanged(fb.auth, (user) => {
      cloud.user = user ? { uid: user.uid, name: user.displayName, email: user.email, photo: user.photoURL } : null;
      if (unsubDoc) { unsubDoc(); unsubDoc = null; }
      if (!user) { cloud.status = 'sin sesión'; notify(); return; }
      cloud.status = 'conectando';
      notify();
      unsubDoc = fs.onSnapshot(fs.doc(db, 'users', user.uid), (snap) => {
        if (snap.metadata.hasPendingWrites) return;
        if (!snap.exists()) { pushRemote(); return; }
        const remote = snap.data();
        if ((remote.updatedAt || 0) > (state.updatedAt || 0)) { state = normalize(remote); saveLocal(); }
        else if ((remote.updatedAt || 0) < (state.updatedAt || 0)) pushRemote();
        cloud.status = snap.metadata.fromCache ? 'sin conexión' : 'sincronizado';
        notify();
      }, (e) => { cloud.status = 'error'; cloud.error = e.message; notify(); });
    });
  } catch (e) {
    cloud.status = 'error'; cloud.error = 'No se pudo cargar Firebase: ' + e.message; notify();
  }
}

export async function login() {
  if (!fb) return;
  const provider = new fb.GoogleAuthProvider();
  try { await fb.signInWithPopup(fb.auth, provider); }
  catch (e) {
    if (['auth/popup-blocked', 'auth/operation-not-supported-in-this-environment'].includes(e.code)) await fb.signInWithRedirect(fb.auth, provider);
    else { cloud.error = e.message; notify(); }
  }
}
export async function logout() { if (fb) await fb.signOut(fb.auth); }
