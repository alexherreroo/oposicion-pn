// Lógica pura: temario, fechas, repetición espaciada, dominio, baremo y autoplanificación.

export const BLOQUES = {
  J: 'Ciencias Jurídicas',
  S: 'Ciencias Sociales',
  T: 'Materias Técnico-científicas',
};

// Títulos abreviados de los 45 temas (programa Escala Básica; revisa las bases de tu convocatoria).
const T = [
  'Derecho y persona jurídica', 'Constitución Española (I)', 'Constitución Española (II)',
  'Unión Europea y cooperación policial internacional', 'Administración General del Estado',
  'Funcionarios públicos', 'Ministerio del Interior y Secretaría de Estado de Seguridad',
  'Dirección General de la Policía y Policía Nacional', 'LO 2/1986, de Fuerzas y Cuerpos de Seguridad',
  'Entrada y residencia de extranjeros', 'Infracciones en materia de extranjería', 'Protección internacional',
  'Seguridad privada', 'LO 4/2015, de protección de la seguridad ciudadana', 'Infraestructuras críticas y ciberseguridad',
  'Derecho Penal: parte general', 'Delitos contra las personas', 'Delitos contra el patrimonio',
  'Delitos contra el orden público', 'Delitos informáticos', 'Derecho Procesal Penal y detención',
  'Estatuto de la víctima del delito', 'Igualdad y no discriminación', 'Prevención de riesgos laborales: introducción',
  'Prevención de riesgos laborales: marco normativo', 'Protección de datos personales',
  'Derechos Humanos', 'Globalización', 'Actitudes y valores sociales', 'Principios éticos de la sociedad actual',
  'Inmigración', 'Geografía humana y demografía', 'La seguridad', 'Drogodependencias', 'Desarrollo sostenible',
  'Gramática de la lengua española', 'Ortografía de la lengua española',
  'Sistemas operativos', 'Redes informáticas', 'Inteligencia', 'Ciberdelincuencia y amenazas', 'Armas de fuego',
  'Vehículo prioritario', 'Seguridad en la conducción de vehículos prioritarios', 'Prevención de riesgos laborales en seguridad vial',
];
export const TEMAS = T.map((titulo, i) => ({
  id: i + 1,
  titulo,
  bloque: i < 26 ? 'J' : i < 37 ? 'S' : 'T',
}));
export const N_TEMAS = TEMAS.length;

// ---------- Fechas (siempre 'YYYY-MM-DD' en hora local) ----------
const pad = (n) => String(n).padStart(2, '0');
export const toStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
export const today = () => toStr(new Date());
export const addDays = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return toStr(d); };
export const diffDays = (a, b) => Math.round((parse(b) - parse(a)) / 86400000); // b - a
export const weekday = (s) => (parse(s).getDay() + 6) % 7; // 0 = lunes
export const weekStart = (s) => addDays(s, -weekday(s));
export const monthStart = (s) => s.slice(0, 8) + '01';
export const monthKey = (s) => s.slice(0, 7);
export const weekKey = (s) => weekStart(s);
const DIAS = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
export const DIAS_CORTO = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
export const fmtLargo = (s) => { const d = parse(s); return `${DIAS[weekday(s)]} ${d.getDate()} de ${MESES[d.getMonth()]}`; };
export const fmtCorto = (s) => { const d = parse(s); return `${d.getDate()} ${MESES[d.getMonth()].slice(0, 3)}`; };
export const fmtMes = (s) => { const d = parse(s); return `${MESES[d.getMonth()]} ${d.getFullYear()}`; };
export const fmtRel = (s, ref = today()) => {
  const n = diffDays(ref, s);
  if (n === 0) return 'hoy';
  if (n === 1) return 'mañana';
  if (n === -1) return 'ayer';
  if (n < 0) return `hace ${-n} días`;
  if (n < 14) return `en ${n} días`;
  return fmtCorto(s);
};
export const fmtMin = (m) => {
  const h = Math.floor(m / 60), r = Math.round(m % 60);
  return h ? (r ? `${h} h ${r} min` : `${h} h`) : `${r} min`;
};

// ---------- Repetición espaciada (derivada siempre del historial) ----------
export const RATINGS = [
  { v: 1, label: 'Mal', emoji: '😣' },
  { v: 2, label: 'Regular', emoji: '😐' },
  { v: 3, label: 'Bien', emoji: '🙂' },
  { v: 4, label: 'Fácil', emoji: '😎' },
];

export function schedule(regs = []) {
  const list = [...regs].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  let ease = 2.5, interval = 0, last = null;
  for (const r of list) {
    if (r.rating === 1) {
      interval = 1; ease = Math.max(1.3, ease - 0.2);
    } else if (interval === 0) {
      interval = r.rating === 2 ? 2 : r.rating === 3 ? 4 : 7;
    } else {
      const f = r.rating === 2 ? 1.2 : r.rating === 3 ? ease : ease * 1.3;
      interval = Math.max(interval + 1, Math.round(interval * f));
      ease = Math.min(3, Math.max(1.3, ease + (r.rating === 2 ? -0.15 : r.rating === 4 ? 0.15 : 0)));
    }
    interval = Math.min(interval, 60);
    last = r;
  }
  return {
    n: list.length,
    vueltas: list.filter((r) => r.tipo === 'vuelta').length,
    last,
    interval,
    next: last ? addDays(last.date, interval) : null,
    list,
  };
}

const RATING_PCT = { 1: 25, 2: 55, 3: 80, 4: 95 };
export function dominio(regs = [], ref = today()) {
  const s = schedule(regs);
  if (!s.n) return 0;
  const recent = s.list.slice(-3);
  let w = 0, sum = 0;
  recent.forEach((r, i) => { sum += RATING_PCT[r.rating] * (i + 1); w += i + 1; });
  const base = sum / w + Math.min(s.n - 1, 4) * 3;
  const days = Math.max(0, diffDays(s.last.date, ref));
  const halfLife = Math.max(3, s.interval * 2);
  const retention = Math.pow(0.5, days / halfLife);
  return Math.round(Math.min(100, base * (0.55 + 0.45 * retention)));
}

export const SEMAFORO = {
  rojo: { label: 'No lo sé', icon: '●', cls: 'rojo' },
  amarillo: { label: 'Flojo', icon: '●', cls: 'amarillo' },
  verde: { label: 'Dominado', icon: '●', cls: 'verde' },
};
export const semaforoDe = (pct) => (pct < 40 ? 'rojo' : pct < 70 ? 'amarillo' : 'verde');
export function aviso(manual, est, studied) {
  if (!manual || !studied) return null;
  if (manual === 'verde' && est < 50) return `Lo marcas dominado, pero la estimación es ${est} %`;
  if (manual === 'rojo' && est >= 75) return `Lo marcas como "no lo sé", pero la estimación es ${est} %. ¿Lo subes?`;
  return null;
}

// ---------- Vueltas ----------
export function resumenVueltas(temas) {
  const counts = TEMAS.map((t) => schedule(temas[t.id]?.regs).vueltas);
  const actual = Math.min(...counts) + 1;
  const hechos = counts.filter((c) => c >= actual).length;
  const siguiente = TEMAS.find((t, i) => counts[i] < actual) || null;
  return { counts, actual, hechos, siguiente };
}

export function pendientes(temas, ref = today()) {
  return TEMAS.map((t) => ({ t, s: schedule(temas[t.id]?.regs) }))
    .filter(({ s }) => s.n && s.next <= ref)
    .sort((a, b) => (a.s.next < b.s.next ? -1 : 1));
}

// ---------- Autoplanificación ----------
export function autoplan(state, from, to) {
  const { temas, tasks, settings } = state;
  const nuevosDia = settings.nuevosPorDia ?? 1;
  const maxRep = settings.maxRepasosDia ?? 3;
  const dias = settings.diasEstudio ?? [0, 1, 2, 3, 4, 5];
  const counts = {}, next = {};
  TEMAS.forEach((t) => { const s = schedule(temas[t.id]?.regs); counts[t.id] = s.vueltas; next[t.id] = s.next; });
  // Las tareas ya planificadas y sin hacer cuentan como si fueran a hacerse.
  tasks.filter((k) => !k.done && k.temaId && k.date >= from).forEach((k) => {
    if (k.kind === 'nuevo') counts[k.temaId]++;
    next[k.temaId] = addDays(k.date, 7);
  });
  const nuevas = [];
  const existe = (d, id) => tasks.some((k) => k.date === d && k.temaId === id) || nuevas.some((k) => k.date === d && k.temaId === id);
  for (let d = from; d <= to; d = addDays(d, 1)) {
    if (!dias.includes(weekday(d))) continue;
    const debidos = TEMAS.filter((t) => next[t.id] && next[t.id] <= d && !existe(d, t.id))
      .sort((a, b) => (next[a.id] < next[b.id] ? -1 : 1)).slice(0, maxRep);
    for (const t of debidos) {
      nuevas.push({ date: d, temaId: t.id, kind: 'repaso', type: 'repaso', title: `Repasar tema ${t.id}` });
      next[t.id] = addDays(d, 7);
    }
    for (let i = 0; i < nuevosDia; i++) {
      const actual = Math.min(...Object.values(counts)) + 1;
      const t = TEMAS.find((x) => counts[x.id] < actual);
      if (!t || existe(d, t.id)) break;
      nuevas.push({ date: d, temaId: t.id, kind: 'nuevo', type: 'estudio', title: `Tema ${t.id} (vuelta ${actual})` });
      counts[t.id]++;
      next[t.id] = addDays(d, 4);
    }
  }
  return nuevas;
}

// ---------- Pruebas físicas ----------
// Anclas aproximadas (puntos 0, 5 y 10). Revisa el anexo de tu convocatoria (BOE-A-2026-15055)
// y ajústalas en Ajustes si cambian. p0 de agilidad = tiempo máximo eliminatorio.
export const PRUEBAS = {
  agilidad: { nombre: 'Circuito de agilidad', unidad: 's', menorMejor: true },
  fuerza: { nombre: { H: 'Dominadas', M: 'Suspensión en barra' }, unidad: { H: 'rep.', M: 's' }, menorMejor: false },
  carrera: { nombre: 'Carrera 1000 m', unidad: 'mm:ss', menorMejor: true },
};
export const BAREMO = {
  agilidad: { H: [11.7, 10.5, 8.2], M: [12.8, 11.6, 9.3] },
  fuerza: { H: [3, 10, 17], M: [19, 57, 95] },
  carrera: { H: [234, 204, 174], M: [294, 249, 204] },
};
export const nombrePrueba = (p, sexo) => (typeof PRUEBAS[p].nombre === 'string' ? PRUEBAS[p].nombre : PRUEBAS[p].nombre[sexo]);
export const unidadPrueba = (p, sexo) => (typeof PRUEBAS[p].unidad === 'string' ? PRUEBAS[p].unidad : PRUEBAS[p].unidad[sexo]);

export function puntos(prueba, sexo, value, baremo = BAREMO) {
  const [p0, p5, p10] = baremo[prueba][sexo];
  const menor = PRUEBAS[prueba].menorMejor;
  const better = (a, b) => (menor ? a <= b : a >= b);
  if (better(value, p10)) return 10;
  if (!better(value, p0)) return 0;
  const pts = better(value, p5) ? 5 + (5 * (value - p5)) / (p10 - p5) : (5 * (value - p0)) / (p5 - p0);
  return Math.max(0, Math.min(10, Math.round(pts * 10) / 10));
}
export const fmtValor = (prueba, v) => {
  if (prueba === 'carrera') return `${Math.floor(v / 60)}:${pad(Math.round(v % 60))}`;
  if (prueba === 'agilidad') return `${v.toFixed(1).replace('.', ',')} s`;
  return String(v);
};
export function parseValor(prueba, txt) {
  txt = String(txt).trim().replace(',', '.');
  if (prueba === 'carrera') {
    if (txt.includes(':')) { const [m, s] = txt.split(':').map(Number); return m * 60 + s; }
    return Number(txt);
  }
  return Number(txt);
}

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
