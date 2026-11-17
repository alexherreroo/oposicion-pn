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

// ---------- Registros de cada tema ----------
// Tipos: 'estudio' (sesión: minutos + nota), 'repaso' (valoración), 'vuelta' (contador de vueltas).
// La fecha para volver a dar el tema la elige el usuario y se guarda en tema.proximo.
export const RATINGS = [
  { v: 1, label: 'Mal', emoji: '😣' },
  { v: 2, label: 'Regular', emoji: '😐' },
  { v: 3, label: 'Bien', emoji: '🙂' },
  { v: 4, label: 'Fácil', emoji: '😎' },
];
export const TIPO_REG = { estudio: 'Estudio', repaso: 'Repaso', vuelta: 'Vuelta completa' };

const byDate = (a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
export function infoTema(tema) {
  const regs = [...(tema?.regs || [])].sort(byDate);
  const vueltas = regs.filter((r) => r.tipo === 'vuelta');
  return {
    regs,
    n: regs.length,
    vueltas: vueltas.length,
    ultimaVuelta: vueltas[vueltas.length - 1] || null,
    last: regs[regs.length - 1] || null,
    nota: [...regs].reverse().find((r) => r.note) || null,
    min: regs.reduce((a, r) => a + (r.min || 0), 0),
    proximo: tema?.proximo || null,
  };
}

const RATING_PCT = { 1: 25, 2: 55, 3: 80, 4: 95 };
// Estimación orientativa: últimas valoraciones + nº de vueltas, y baja poco a poco si no tocas el tema.
export function dominio(tema, ref = today()) {
  const i = infoTema(tema);
  const rated = i.regs.filter((r) => r.rating);
  if (!rated.length) return null;
  const recent = rated.slice(-3);
  let w = 0, sum = 0;
  recent.forEach((r, k) => { sum += RATING_PCT[r.rating] * (k + 1); w += k + 1; });
  const base = sum / w + Math.min(i.vueltas, 4) * 3;
  const days = Math.max(0, diffDays(i.last.date, ref));
  const halfLife = 10 + 10 * i.vueltas;
  return Math.round(Math.min(100, base * (0.55 + 0.45 * Math.pow(0.5, days / halfLife))));
}

// Clasificación manual de cada tema (sin valor = "Sin empezar").
export const SEMAFORO = {
  rojo: { label: 'No lo sé', cls: 'rojo' },
  amarillo: { label: 'Flojo', cls: 'amarillo' },
  bien: { label: 'Bien', cls: 'bien' },
  verde: { label: 'Dominado', cls: 'verde' },
};
export const semaforoDe = (pct) => (pct < 40 ? 'rojo' : pct < 70 ? 'amarillo' : 'verde');
export function aviso(manual, est) {
  if (!manual || est === null) return null;
  if ((manual === 'verde' || manual === 'bien') && est < 50) return `Lo marcas como "${SEMAFORO[manual].label}", pero por tus valoraciones sale un ${est} %`;
  if (manual === 'rojo' && est >= 75) return `Lo marcas como "no lo sé", pero por tus valoraciones sale un ${est} %. ¿Lo subes?`;
  return null;
}
// Clasificación del temario según lo que marca el usuario.
export const clase = (tema) => (tema?.semaforo && SEMAFORO[tema.semaforo] ? tema.semaforo : 'sinempezar');

// ---------- Vueltas ----------
export function resumenVueltas(temas) {
  const counts = TEMAS.map((t) => infoTema(temas[t.id]).vueltas);
  const actual = Math.min(...counts) + 1;
  const hechos = counts.filter((c) => c >= actual).length;
  const siguiente = TEMAS.find((t, i) => counts[i] < actual) || null;
  return { counts, actual, hechos, siguiente };
}
export const objetivoVuelta = (settings, n) => (settings.objetivosVuelta || [])[n - 1] || '';

export function pendientes(temas, ref = today()) {
  return TEMAS.map((t) => ({ t, i: infoTema(temas[t.id]) }))
    .filter(({ i }) => i.proximo && i.proximo <= ref)
    .sort((a, b) => (a.i.proximo < b.i.proximo ? -1 : 1));
}

// ---------- Autoplanificación ----------
// 1º) temas que faltan de la vuelta actual, repartidos hasta la fecha objetivo de esa vuelta;
// 2º) repasos en las fechas que has elegido tú (en la 1ª vuelta solo si lo activas en Ajustes).
// Sustituye las tareas automáticas pendientes del rango; las tareas que añades tú no se tocan.
export function autoplan(state, from, to) {
  const { temas, settings } = state;
  const dias = settings.diasEstudio?.length ? settings.diasEstudio : [0, 1, 2, 3, 4, 5];
  const maxRep = settings.maxRepasosDia ?? 3;
  const v = resumenVueltas(temas);
  const restantes = TEMAS.filter((t, i) => v.counts[i] < v.actual);
  const objetivo = objetivoVuelta(settings, v.actual);
  const avisos = [];
  const esDia = (d) => dias.includes(weekday(d));

  // Días de estudio desde 'from' hasta la fecha objetivo (o hasta 'to' si no hay objetivo).
  let porDia;
  if (objetivo && objetivo >= from) {
    let n = 0;
    for (let d = from; d <= objetivo; d = addDays(d, 1)) if (esDia(d)) n++;
    porDia = restantes.length / Math.max(1, n);
  } else {
    if (objetivo) avisos.push(`La fecha objetivo de la vuelta ${v.actual} ya ha pasado: pon una nueva en Ajustes.`);
    else avisos.push(`Sin fecha objetivo para la vuelta ${v.actual}: uso ${settings.nuevosPorDia ?? 1} tema(s) al día. Puedes ponerla en Ajustes.`);
    porDia = settings.nuevosPorDia ?? 1;
  }

  const nuevas = [];
  const proximo = {};
  TEMAS.forEach((t) => { proximo[t.id] = temas[t.id]?.proximo || null; });
  const repasosOn = v.actual > 1 || settings.repasosEnPrimeraVuelta;
  let j = 0; // índice de día de estudio
  for (let d = from; d <= to; d = addDays(d, 1)) {
    if (!esDia(d)) continue;
    const hoyIds = new Set();
    if (porDia > 0 && restantes.length) {
      const a = Math.floor(j * porDia), b = Math.max(a + 1, Math.floor((j + 1) * porDia));
      for (let k = a; k < Math.min(b, restantes.length); k++) {
        const t = restantes[k];
        const sigue = porDia < 1 && Math.floor((j - 1) * porDia) === a && j > 0;
        nuevas.push({ date: d, temaId: t.id, kind: 'nuevo', type: 'estudio', auto: true, title: `${sigue ? 'Seguir' : 'Estudiar'} tema ${t.id} (vuelta ${v.actual})` });
        hoyIds.add(t.id);
      }
    }
    if (repasosOn) {
      const debidos = TEMAS.filter((t) => proximo[t.id] && (d === from ? proximo[t.id] <= d : proximo[t.id] === d) && !hoyIds.has(t.id))
        .sort((x, y) => (proximo[x.id] < proximo[y.id] ? -1 : 1)).slice(0, maxRep);
      for (const t of debidos) {
        nuevas.push({ date: d, temaId: t.id, kind: 'repaso', type: 'repaso', auto: true, title: `Repasar tema ${t.id}` });
        proximo[t.id] = null;
      }
    }
    j++;
  }
  if (objetivo && restantes.length && porDia > 0) {
    const fin = Math.ceil(restantes.length / porDia);
    if (porDia > 3) avisos.push(`Para llegar al ${fmtCorto(objetivo)} necesitas ${porDia.toFixed(1).replace('.', ',')} temas por día de estudio. ¿Seguro que es realista?`);
    else avisos.push(`Vuelta ${v.actual}: ${restantes.length} temas pendientes en ${fin} días de estudio hasta el ${fmtCorto(objetivo)}.`);
  }
  return { nuevas, avisos };
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
