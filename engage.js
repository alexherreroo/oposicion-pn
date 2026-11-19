// Funciones para que la prueba enganche: ritmo, cifras, logros, confeti, temporizador e imagen para compartir.
import * as L from './logic.js';

const { today, addDays, diffDays } = L;
const regsReales = (t) => (t?.regs || []).filter((r) => !r.importado);

// ---------- Racha y cifras ----------
export function diasActivos(s) {
  return new Set([...s.horas.map((h) => h.date), ...(s.tests || []).map((t) => t.date), ...Object.values(s.temas).flatMap((t) => regsReales(t).map((r) => r.date))]);
}
export function racha(s) {
  const dias = diasActivos(s);
  let d = dias.has(today()) ? today() : addDays(today(), -1), n = 0;
  while (dias.has(d)) { n++; d = addDays(d, -1); }
  return n;
}
export function rachaMaxima(s) {
  const dias = [...diasActivos(s)].sort();
  let best = 0, cur = 0, prev = null;
  for (const d of dias) { cur = prev && diffDays(prev, d) === 1 ? cur + 1 : 1; best = Math.max(best, cur); prev = d; }
  return best;
}

export function cifras(s) {
  const hoy = today();
  const regs = Object.entries(s.temas).flatMap(([id, t]) => regsReales(t).map((r) => ({ ...r, temaId: +id })));
  const min = s.horas.reduce((a, h) => a + h.min, 0);
  const futuras = s.tasks.filter((k) => !k.done && k.date >= hoy);
  return {
    min,
    temas: new Set(regs.map((r) => r.temaId)).size,
    vueltas: regs.filter((r) => r.tipo === 'vuelta').length,
    sesiones: regs.filter((r) => r.tipo === 'estudio').length,
    repasos: regs.filter((r) => r.tipo === 'repaso' || r.tipo === 'practica').length,
    tests: (s.tests || []).length,
    dias: diasActivos(s).size,
    tareasFuturas: futuras.length,
    planHasta: futuras.reduce((m, k) => (k.date > m ? k.date : m), ''),
    racha: racha(s),
    actividad: regs.length > 0 || min > 0,
  };
}

export function cifrasSemana(s, ref = today()) {
  const ini = L.weekStart(ref), fin = addDays(ini, 6);
  const enSemana = (d) => d >= ini && d <= fin;
  const regs = Object.entries(s.temas).flatMap(([id, t]) => regsReales(t).filter((r) => enSemana(r.date)).map((r) => ({ ...r, temaId: +id })));
  return {
    ini, fin,
    min: s.horas.filter((h) => enSemana(h.date)).reduce((a, h) => a + h.min, 0),
    temas: new Set(regs.map((r) => r.temaId)).size,
    vueltas: regs.filter((r) => r.tipo === 'vuelta').length,
    repasos: regs.filter((r) => r.tipo === 'repaso' || r.tipo === 'practica').length,
    dias: [...diasActivos(s)].filter(enSemana).length,
  };
}

// ---------- Ritmo para llegar al objetivo ----------
export function ritmo(s, ref = today()) {
  const v = L.resumenVueltas(s.temas);
  const objetivo = L.objetivoVuelta(s.settings, v.actual);
  const restantes = L.N_TEMAS - v.hechos;
  const reales = Object.values(s.temas).flatMap((t) => regsReales(t));
  const primera = reales.reduce((m, r) => (!m || r.date < m ? r.date : m), '');
  const recientes = reales.filter((r) => r.tipo === 'vuelta' && r.date > addDays(ref, -14));
  const actualSemana = recientes.length / 2;
  const semanaActual = reales.filter((r) => r.tipo === 'vuelta' && r.date > addDays(ref, -7)).length;
  // Durante la primera semana de uso no juzgamos el ritmo: animamos.
  const novato = !primera || diffDays(primera, ref) < 7;
  const base = { vuelta: v.actual, restantes, objetivo, actualSemana, semanaActual };
  if (!objetivo) return { ...base, estado: 'sin-objetivo' };
  const dias = diffDays(ref, objetivo) + 1;
  if (dias <= 0) return { ...base, estado: 'vencido' };
  const necesarioSemana = (restantes * 7) / dias;
  const fin = actualSemana > 0 ? addDays(ref, Math.ceil((restantes / actualSemana) * 7)) : null;
  let estado;
  if (restantes === 0) estado = 'hecho';
  else if (!reales.length) estado = 'empezando';
  else if (novato) estado = 'arrancando';
  else if (!recientes.length) estado = 'empezando';
  else if (actualSemana >= necesarioSemana * 0.95) estado = 'bien';
  else if (actualSemana >= necesarioSemana * 0.7) estado = 'justo';
  else estado = 'atras';
  return { ...base, dias, necesarioSemana, fin, estado };
}
export const fmtNum = (n, dec = 1) => (Math.round(n * 10 ** dec) / 10 ** dec).toString().replace('.', ',');

// ---------- Logros ----------
const conVuelta = (s) => L.TEMAS.filter((t) => regsReales(s.temas[t.id]).some((r) => r.tipo === 'vuelta')).length;
const bloqueCompleto = (s, b) => L.TEMAS.filter((t) => t.bloque === b).every((t) => L.infoTema(s.temas[t.id]).vueltas >= 1);
const minTotal = (s) => s.horas.reduce((a, h) => a + h.min, 0);
function semanaObjetivo(s) {
  const obj = (s.settings.horasObjetivoSemana || 0) * 60;
  if (!obj) return false;
  const porSemana = {};
  s.horas.forEach((h) => { const k = L.weekStart(h.date); porSemana[k] = (porSemana[k] || 0) + h.min; });
  return Object.values(porSemana).some((m) => m >= obj);
}
const ICONO_BLOQUE = { J: '⚖️', S: '🌍', T: '💻' };
const nTestsAprobados = (s) => (s.tests || []).filter((t) => L.notaTest(t) >= (t.escala >= 100 ? 50 : 5)).length;
const logrosBloques = () => Object.entries(L.BLOQUES).map(([b, nombre]) => {
  const n = L.TEMAS.filter((t) => t.bloque === b).length;
  return { id: 'bloque-' + b, icon: ICONO_BLOQUE[b], titulo: `${nombre}: vuelta completa`, desc: `Una vuelta a los ${n} temas de ${nombre}`, ok: (s) => bloqueCompleto(s, b) };
});
// Se calculan cada vez porque dependen de la oposición (número de temas y bloques).
export const getLogros = () => [
  { id: 'primer-paso', icon: '🚀', titulo: 'Primer paso', desc: 'Registra tu primera sesión de estudio', ok: (s) => cifras(s).actividad },
  { id: 'primera-vuelta', icon: '✅', titulo: 'Primer tema cerrado', desc: 'Completa la vuelta de un tema', ok: (s) => conVuelta(s) >= 1 },
  { id: 'primer-repaso', icon: '🔁', titulo: 'Repasar es aprobar', desc: 'Haz tu primer repaso', ok: (s) => cifras(s).repasos >= 1 },
  { id: 'temas-5', icon: '📘', titulo: '5 temas', desc: 'Completa la vuelta de 5 temas', ok: (s) => conVuelta(s) >= 5 },
  { id: 'temas-15', icon: '📚', titulo: '15 temas', desc: 'Completa la vuelta de 15 temas', ok: (s) => conVuelta(s) >= 15 },
  { id: 'temas-30', icon: '🏛️', titulo: '30 temas', desc: 'Completa la vuelta de 30 temas', ok: (s) => conVuelta(s) >= 30 },
  ...logrosBloques(),
  { id: 'vuelta-1', icon: '🏁', titulo: '¡Primera vuelta completa!', desc: `Los ${L.N_TEMAS} temas con al menos una vuelta`, ok: (s) => L.resumenVueltas(s.temas).actual > 1 },
  { id: 'vuelta-2', icon: '🥈', titulo: 'Segunda vuelta completa', desc: `Los ${L.N_TEMAS} temas con dos vueltas`, ok: (s) => L.resumenVueltas(s.temas).actual > 2 },
  { id: 'vuelta-3', icon: '🥇', titulo: 'Tercera vuelta completa', desc: `Los ${L.N_TEMAS} temas con tres vueltas`, ok: (s) => L.resumenVueltas(s.temas).actual > 3 },
  { id: 'racha-3', icon: '🔥', titulo: 'Racha de 3 días', desc: 'Estudia 3 días seguidos', ok: (s) => rachaMaxima(s) >= 3 },
  { id: 'racha-7', icon: '🔥', titulo: 'Una semana sin fallar', desc: 'Estudia 7 días seguidos', ok: (s) => rachaMaxima(s) >= 7 },
  { id: 'racha-14', icon: '🔥', titulo: 'Racha de 14 días', desc: 'Estudia 14 días seguidos', ok: (s) => rachaMaxima(s) >= 14 },
  { id: 'racha-30', icon: '🏆', titulo: 'Un mes imparable', desc: 'Estudia 30 días seguidos', ok: (s) => rachaMaxima(s) >= 30 },
  { id: 'horas-10', icon: '⏱️', titulo: '10 horas', desc: 'Acumula 10 horas de estudio', ok: (s) => minTotal(s) >= 600 },
  { id: 'horas-50', icon: '⏱️', titulo: '50 horas', desc: 'Acumula 50 horas de estudio', ok: (s) => minTotal(s) >= 3000 },
  { id: 'horas-100', icon: '💯', titulo: '100 horas', desc: 'Acumula 100 horas de estudio', ok: (s) => minTotal(s) >= 6000 },
  { id: 'semana-objetivo', icon: '🎯', titulo: 'Objetivo semanal cumplido', desc: 'Llega a tus horas objetivo en una semana', ok: (s) => semanaObjetivo(s) },
  { id: 'primer-test', icon: '📝', titulo: 'Primer test', desc: 'Registra tu primer test o simulacro', ok: (s) => (s.tests || []).length >= 1 },
  { id: 'tests-10', icon: '🎯', titulo: '10 tests', desc: 'Registra 10 tests o simulacros', ok: (s) => (s.tests || []).length >= 10 },
  { id: 'test-aprobado', icon: '🏅', titulo: 'Aprobado', desc: 'Saca un 5 (o 50) en un test', ok: (s) => nTestsAprobados(s) >= 1 },
  { id: 'primer-rapido', icon: '⚡', titulo: 'Repaso rápido', desc: 'Haz tu primer repaso rápido con preguntas de un tema', ok: (s) => Object.values(s.temas).some((t) => (t.regs || []).some((r) => r.tipo === 'practica')) },
];
export const logrosConseguidos = (s) => getLogros().filter((l) => { try { return l.ok(s); } catch { return false; } }).map((l) => l.id);

// ---------- Confeti y sonido ----------
export function confeti(n = 140) {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  const c = document.createElement('canvas');
  c.className = 'confeti';
  c.width = innerWidth; c.height = innerHeight;
  document.body.appendChild(c);
  const ctx = c.getContext('2d');
  const colores = ['#1e40af', '#f5b800', '#c8102e', '#15803d', '#6d28d9', '#0e7490'];
  const ps = Array.from({ length: n }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * innerWidth * 0.3, y: innerHeight * 0.35,
    vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 14 - 4, r: Math.random() * 6 + 4,
    a: Math.random() * Math.PI, va: (Math.random() - 0.5) * 0.3, col: colores[Math.floor(Math.random() * colores.length)],
  }));
  const t0 = performance.now();
  (function frame(t) {
    ctx.clearRect(0, 0, c.width, c.height);
    ps.forEach((p) => {
      p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.a += p.va;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.col; ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); ctx.restore();
    });
    if (t - t0 < 2600) requestAnimationFrame(frame); else c.remove();
  })(t0);
}
export function pitido() {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.25, 0.5].forEach((d) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.frequency.value = 880; o.connect(g); g.connect(ac.destination);
      g.gain.setValueAtTime(0.0001, ac.currentTime + d);
      g.gain.exponentialRampToValueAtTime(0.25, ac.currentTime + d + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + d + 0.2);
      o.start(ac.currentTime + d); o.stop(ac.currentTime + d + 0.22);
    });
  } catch {}
}
export function notificar(titulo, cuerpo) {
  pitido();
  try { if ('Notification' in window && Notification.permission === 'granted') new Notification(titulo, { body: cuerpo, icon: 'icon-192.png' }); } catch {}
}

// ---------- Temporizador (se guarda en este dispositivo y sobrevive a recargas) ----------
export const FOCO_MS = 25 * 60000, DESCANSO_MS = 5 * 60000;
const TKEY = 'pn-timer';
export function leerTimer() { try { return JSON.parse(localStorage.getItem(TKEY) || 'null'); } catch { return null; } }
export function guardarTimer(t) { try { t ? localStorage.setItem(TKEY, JSON.stringify(t)) : localStorage.removeItem(TKEY); } catch {} }
export function nuevoTimer(temaId, modo) {
  return { temaId, modo, corriendo: true, fase: 'foco', faseInicio: Date.now(), acumulado: 0, pomos: 0 };
}
// Avanza las fases del Pomodoro. Devuelve [timer, evento] (evento: 'descanso' | 'foco' | null).
export function tickTimer(t, ahora = Date.now()) {
  if (!t || !t.corriendo || t.modo !== 'pomodoro') return [t, null];
  if (t.fase === 'foco' && ahora - t.faseInicio >= FOCO_MS) {
    return [{ ...t, acumulado: t.acumulado + FOCO_MS, fase: 'descanso', faseInicio: t.faseInicio + FOCO_MS, pomos: t.pomos + 1 }, 'descanso'];
  }
  if (t.fase === 'descanso' && ahora - t.faseInicio >= DESCANSO_MS) {
    return [{ ...t, fase: 'foco', faseInicio: t.faseInicio + DESCANSO_MS }, 'foco'];
  }
  return [t, null];
}
export const msFoco = (t, ahora = Date.now()) => (t ? t.acumulado + (t.corriendo && t.fase === 'foco' ? ahora - t.faseInicio : 0) : 0);
export const msFase = (t, ahora = Date.now()) => (t && t.corriendo ? ahora - t.faseInicio : 0);
export function pausarTimer(t, ahora = Date.now()) {
  if (!t.corriendo) return t;
  return { ...t, corriendo: false, acumulado: t.fase === 'foco' ? t.acumulado + (ahora - t.faseInicio) : t.acumulado, faseRestante: t.modo === 'pomodoro' ? Math.max(0, (t.fase === 'foco' ? FOCO_MS : DESCANSO_MS) - (ahora - t.faseInicio)) : null };
}
export function reanudarTimer(t, ahora = Date.now()) {
  if (t.corriendo) return t;
  // En Pomodoro se respeta lo que quedaba de la fase.
  const dur = t.fase === 'foco' ? FOCO_MS : DESCANSO_MS;
  const faseInicio = t.modo === 'pomodoro' && t.faseRestante != null ? ahora - (dur - t.faseRestante) : ahora;
  const acumulado = t.modo === 'pomodoro' && t.fase === 'foco' && t.faseRestante != null ? t.acumulado - (dur - t.faseRestante) : t.acumulado;
  return { ...t, corriendo: true, faseInicio, acumulado };
}
export const mmss = (ms) => { const sec = Math.max(0, Math.floor(ms / 1000)); const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60; return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(s).padStart(2, '0'); };

// ---------- Imagen semanal para redes (1080x1350) ----------
export function dibujarSemana(canvas, s, { marca, web }) {
  const W = 1080, H = 1350;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const sem = cifrasSemana(s);
  const v = L.resumenVueltas(s.temas);
  const ra = racha(s);
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, '#0c2150'); g.addColorStop(1, '#12306b');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#f5b800'; ctx.fillRect(0, H - 16, W, 16);
  const F = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
  const txt = (t, x, y, size, col = '#fff', weight = 700, align = 'left') => { ctx.font = `${weight} ${size}px ${F}`; ctx.fillStyle = col; ctx.textAlign = align; ctx.fillText(t, x, y); };
  txt('MI SEMANA DE OPOSICIÓN', 80, 150, 40, '#f5b800', 800);
  txt(`${L.OPO.nombre} · ${L.OPO.escala}`, 80, 210, 44, '#ffffff', 700);
  txt(`Del ${L.fmtCorto(sem.ini)} al ${L.fmtCorto(sem.fin)}`, 80, 265, 34, 'rgba(255,255,255,.75)', 500);
  const cajas = [
    [fmtNum(sem.min / 60), 'horas de estudio'],
    [String(sem.temas), sem.temas === 1 ? 'tema trabajado' : 'temas trabajados'],
    [String(ra), ra === 1 ? 'día de racha 🔥' : 'días de racha 🔥'],
    [String(sem.repasos + sem.vueltas), 'vueltas y repasos'],
  ];
  cajas.forEach(([n, l], i) => {
    const x = 80 + (i % 2) * 470, y = 340 + Math.floor(i / 2) * 330;
    ctx.fillStyle = 'rgba(255,255,255,.09)';
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, y, 440, 290, 28) : ctx.rect(x, y, 440, 290); ctx.fill();
    txt(n, x + 40, y + 170, 130, '#ffffff', 800);
    txt(l, x + 40, y + 240, 34, 'rgba(255,255,255,.8)', 600);
  });
  const by = 1060;
  txt(`Vuelta ${v.actual} al temario`, 80, by, 38, '#fff', 700);
  txt(`${v.hechos}/${L.N_TEMAS} temas`, W - 80, by, 38, '#f5b800', 800, 'right');
  ctx.fillStyle = 'rgba(255,255,255,.15)'; ctx.fillRect(80, by + 30, W - 160, 26);
  ctx.fillStyle = '#f5b800'; ctx.fillRect(80, by + 30, ((W - 160) * v.hechos) / L.N_TEMAS, 26);
  txt(marca, 80, 1250, 36, '#ffffff', 800);
  txt(web, W - 80, 1250, 32, 'rgba(255,255,255,.8)', 600, 'right');
  return canvas;
}
