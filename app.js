import { html, render, useState, useEffect, useMemo } from './preact-htm.js';
import * as L from './logic.js';
import { getState, subscribe, update, replaceAll, cloud, acceso, permitido, initCloud, login, logout, defaultState, urlPago, conUsuario, reComprobar, borrarMisDatos, adminListar, adminActivar, adminRevocar, adminAmpliarPrueba } from './store.js';
import CONFIG from './app-config.js';
import * as E from './engage.js';
import CONTENIDO from './contenido.js';
import { LISTA_OPOSICIONES, OPOSICIONES } from './oposiciones.js';

const { today, addDays, fmtRel, fmtCorto, fmtLargo, fmtMin, } = L;

// ---------- Utilidades de UI ----------
function useStore() {
  const [, set] = useState(0);
  useEffect(() => subscribe(() => set((n) => n + 1)), []);
  return getState();
}
function useHash() {
  const [h, setH] = useState(location.hash || '#/hoy');
  useEffect(() => { const f = () => setH(location.hash || '#/hoy'); addEventListener('hashchange', f); return () => removeEventListener('hashchange', f); }, []);
  return h;
}
const go = (h) => { location.hash = h; };

const ICONS = {
  hoy: 'M12 3v2M12 19v2M5 12H3M21 12h-2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4M12 8a4 4 0 100 8 4 4 0 000-8z',
  temario: 'M4 5a2 2 0 012-2h12v16H6a2 2 0 00-2 2V5zM4 19a2 2 0 012-2h12M8 7h6',
  plan: 'M4 6a2 2 0 012-2h12a2 2 0 012 2v13a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 10h16M8 2v4M16 2v4',
  fisicas: 'M13 4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM7 21l3-6 3 2v4M10 15l1-5 4 3 3-1M11 10l-3-1-2 3',
  stats: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  ajustes: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-2.9 1.2V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-2.9-1.2l-.1.1a2 2 0 11-2.8-2.8l.1-.1A1.7 1.7 0 003 15H3a2 2 0 110-4h.1a1.7 1.7 0 001.2-2.9l-.1-.1a2 2 0 112.8-2.8l.1.1A1.7 1.7 0 009 3.1V3a2 2 0 114 0v.1a1.7 1.7 0 002.9 1.2l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 001.2 2.9H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z',
  plus: 'M12 5v14M5 12h14',
  check: 'M5 12l5 5L20 7',
  x: 'M6 6l12 12M18 6L6 18',
  left: 'M15 6l-6 6 6 6',
  right: 'M9 6l6 6-6 6',
  trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  alert: 'M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z',
  wand: 'M15 4V2M15 10V8M11 6h2M17 6h2M3 21l12-12M13 7l4 4',
  cloud: 'M17.5 19H8a6 6 0 115.7-8h1.3a4.5 4.5 0 012.5 8.2z',
  fire: 'M12 22c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-3 3-5 5-5 8 0 4 3 7 7 7z',
  clock: 'M12 7v5l3 2M12 22a10 10 0 100-20 10 10 0 000 20z',
  play: 'M7 5l12 7-12 7V5z',
  pause: 'M8 5v14M16 5v14',
  share: 'M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M12 3v13M7 8l5-5 5 5',
  trophy: 'M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM17 5h3v2a3 3 0 01-3 3M7 5H4v2a3 3 0 003 3',
  tests: 'M9 3h6v4H9zM9 5H6a1 1 0 00-1 1v14a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1h-3M9 14l2 2 4-4',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z',
  admin: 'M12 3l8 3v6c0 5-3.5 8.5-8 9.5C7.5 20.5 4 17 4 12V6l8-3zM9 12l2 2 4-4',
};
const Icon = ({ n, s = 20 }) => html`<svg class="ico" width=${s} height=${s} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d=${ICONS[n]} /></svg>`;

const NAV = [
  ['hoy', 'Hoy'], ['temario', 'Temario'], ['plan', 'Plan'], ['tests', 'Tests'], ['fisicas', 'Físicas'], ['stats', 'Progreso'], ['ajustes', 'Ajustes'],
];
const TIPOS = {
  estudio: 'Tema nuevo', repaso: 'Repaso', academia: 'Academia', simulacro: 'Simulacro', fisico: 'Entreno físico', descanso: 'Descanso', otro: 'Otro',
};

const temaDe = (id) => L.TEMAS[id - 1];

function Semaforo({ value, small }) {
  if (!value || !L.SEMAFORO[value]) return html`<span class="sem vacio ${small ? 'sm' : ''}"><i></i>Sin empezar</span>`;
  const m = L.SEMAFORO[value];
  return html`<span class="sem ${m.cls} ${small ? 'sm' : ''}"><i></i>${m.label}</span>`;
}
function Barra({ pct }) {
  const c = L.semaforoDe(pct);
  return html`<div class="barra" title=${pct + ' % estimado'}><div class=${'fill ' + c} style=${{ width: Math.max(2, pct) + '%' }}></div></div>`;
}

// ---------- Modal para registrar una vuelta o un repaso ----------
let openRegistroGlobal = () => {};
const PROX_CHIPS = [[3, '3 días'], [7, '1 semana'], [14, '2 semanas'], [30, '1 mes']];
function RegistroModal({ temaId, tipo: tipoInicial, taskId, minInicial, onClose }) {
  const [tipo, setTipo] = useState(tipoInicial || 'estudio');
  const [rating, setRating] = useState(0);
  const [min, setMin] = useState(minInicial ? String(minInicial) : '');
  const [date, setDate] = useState(today());
  const [note, setNote] = useState('');
  const [prox, setProx] = useState('');
  const t = temaDe(temaId);
  const info = L.infoTema(getState().temas[temaId]);
  const m = parseInt(min, 10) || 0;
  const valido = tipo === 'estudio' ? m > 0 || note.trim() : tipo === 'repaso' ? rating > 0 : true;
  const guardar = () => {
    if (!valido) return;
    update((s) => {
      const tm = (s.temas[temaId] = s.temas[temaId] || { semaforo: null, regs: [], proximo: null });
      const reg = { id: L.uid(), date, tipo };
      if (m > 0) reg.min = m;
      if (note.trim()) reg.note = note.trim();
      if (rating && tipo === 'repaso') reg.rating = rating;
      tm.regs.push(reg);
      if (m > 0) s.horas.push({ id: L.uid(), date, min: m, note: `Tema ${temaId} · ${L.TIPO_REG[tipo]}`, regId: reg.id });
      if (tipo !== 'estudio') tm.proximo = prox || null;
      if (taskId) { const k = s.tasks.find((x) => x.id === taskId); if (k) k.done = true; }
    });
    if (tipo === 'vuelta') { E.confeti(); avisar(`🎉 ¡Vuelta ${info.vueltas + 1} del tema ${temaId} completada!`); }
    else if (m > 0) avisar(`✅ ${fmtMin(m)} de estudio guardados en el tema ${temaId}`);
    onClose();
  };
  const ayuda = {
    estudio: 'Apunta una sesión de estudio: cuánto tiempo y cómo ha ido o por dónde te has quedado.',
    repaso: 'Repaso del tema: valora cómo te lo sabías y elige cuándo volver a repasarlo.',
    vuelta: `Has terminado el tema entero: suma 1 al contador (será la vuelta nº ${info.vueltas + 1}).`,
  }[tipo];
  return html`<div class="modal-bg" onClick=${(e) => e.target === e.currentTarget && onClose()}>
    <div class="modal" role="dialog" aria-label="Registrar">
      <div class="modal-h"><div><div class="muted small">Tema ${t.id} · ${L.BLOQUES[t.bloque]}</div><h3>${t.titulo}</h3></div>
        <button class="icon-btn" onClick=${onClose} aria-label="Cerrar"><${Icon} n="x" /></button></div>
      <div class="seg three">${Object.entries(L.TIPO_REG).map(([k, l]) => html`<button class=${tipo === k ? 'on' : ''} onClick=${() => setTipo(k)}>${l}</button>`)}</div>
      <p class="muted small">${ayuda}</p>
      ${minInicial ? html`<div class="note small">⏱️ Has estudiado <b>${fmtMin(minInicial)}</b> con el temporizador. Apunta por dónde te has quedado.</div>` : null}
      ${tipo === 'estudio' && info.nota ? html`<div class="hint small">Última nota (${fmtCorto(info.nota.date)}): <i>${info.nota.note}</i></div>` : null}
      ${tipo === 'repaso' ? html`<label class="lbl">¿Qué tal te lo sabías?</label>
        <div class="ratings">${L.RATINGS.map((r) => html`<button class=${'rating ' + (rating === r.v ? 'on' : '')} onClick=${() => setRating(r.v)}><span class="emo">${r.emoji}</span>${r.label}</button>`)}</div>` : null}
      <div class="row2">
        <div><label class="lbl">Minutos${tipo === 'estudio' ? '' : ' (opcional)'}</label><input type="number" inputmode="numeric" min="0" placeholder="p. ej. 90" value=${min} onInput=${(e) => setMin(e.target.value)} /></div>
        <div><label class="lbl">${tipo === 'vuelta' ? 'Fecha en que la terminaste' : 'Fecha'}</label><input type="date" value=${date} max=${today()} onInput=${(e) => setDate(e.target.value)} /></div>
      </div>
      <label class="lbl">${tipo === 'estudio' ? '¿Cómo ha ido? ¿Por dónde te has quedado?' : 'Nota (opcional)'}</label>
      <textarea rows="3" placeholder=${tipo === 'estudio' ? 'p. ej. Me he quedado en el art. 25, me cuestan los plazos' : 'p. ej. Repasar mejor las competencias'} value=${note} onInput=${(e) => setNote(e.target.value)}></textarea>
      ${tipo !== 'estudio' ? html`<label class="lbl">¿Cuándo quieres volver a darlo?</label>
        <div class="quick">${PROX_CHIPS.map(([n, l]) => { const d = addDays(date, n); return html`<button type="button" class=${'chip ' + (prox === d ? 'on' : '')} onClick=${() => setProx(d)}>${l}</button>`; })}</div>
        <div class="row2"><input type="date" value=${prox} min=${date} onInput=${(e) => setProx(e.target.value)} aria-label="Fecha para volver a darlo" />
          ${prox ? html`<button class="btn ghost sm" onClick=${() => setProx('')}>Sin fecha</button>` : html`<span class="muted small self-c">Sin fecha: no saldrá en repasos</span>`}</div>
        ${info.proximo ? html`<p class="muted small">Ahora mismo tenía fecha para el ${fmtCorto(info.proximo)}; se sustituirá por esta.</p>` : null}` : null}
      <div class="modal-f"><button class="btn ghost" onClick=${onClose}>Cancelar</button><button class="btn primary" disabled=${!valido} onClick=${guardar}>Guardar</button></div>
    </div></div>`;
}


// ---------- Avisos emergentes ----------
let avisar = () => {};
function Toasts() {
  const [lista, setLista] = useState([]);
  avisar = (texto) => {
    const id = Math.random();
    setLista((l) => [...l, { id, texto }]);
    setTimeout(() => setLista((l) => l.filter((x) => x.id !== id)), 5000);
  };
  return html`<div class="toasts" aria-live="polite">${lista.map((t) => html`<div class="toast" key=${t.id}>${t.texto}</div>`)}</div>`;
}

// Celebra los logros nuevos (comparando con los ya vistos en este dispositivo).
function useLogros(s) {
  useEffect(() => {
    if (!permitido()) return;
    const key = 'pn-logros:' + (cloud.user?.uid || 'local');
    const ahora = E.logrosConseguidos(s);
    let vistos = null;
    try { vistos = JSON.parse(localStorage.getItem(key) || 'null'); } catch {}
    try { localStorage.setItem(key, JSON.stringify(ahora)); } catch {}
    if (!vistos) return; // primera vez en este dispositivo: no celebramos lo que ya había
    const nuevos = E.getLogros().filter((l) => ahora.includes(l.id) && !vistos.includes(l.id));
    if (nuevos.length) { E.confeti(); nuevos.forEach((l) => avisar(`${l.icon} Logro desbloqueado: ${l.titulo}`)); }
  }, [s]);
}
const reiniciarLogrosVistos = (s) => { try { localStorage.setItem('pn-logros:' + (cloud.user?.uid || 'local'), JSON.stringify(E.logrosConseguidos(s))); } catch {} };

// ---------- Temporizador de estudio ----------
let timerGlobal = { set: () => {} };
function iniciarTimer(temaId, modo) {
  const actual = E.leerTimer();
  if (actual && actual.temaId !== temaId && !confirm(`Ya tienes el temporizador en marcha con el tema ${actual.temaId}. ¿Empezar uno nuevo con el tema ${temaId}? (se perderá el tiempo del anterior)`)) return;
  if (modo === 'pomodoro' && 'Notification' in window && Notification.permission === 'default') { try { Notification.requestPermission(); } catch {} }
  const t = E.nuevoTimer(temaId, modo);
  E.guardarTimer(t); timerGlobal.set(t);
}
function StartTimer({ temaId, compact }) {
  return html`<div class=${'start-timer ' + (compact ? 'compact' : '')}>
    <button class="btn primary" onClick=${() => iniciarTimer(temaId, 'crono')}><${Icon} n="play" s=${16} /> Empezar a estudiar</button>
    <button class="btn" onClick=${() => iniciarTimer(temaId, 'pomodoro')} title="25 min de foco y 5 de descanso">🍅 Pomodoro</button>
  </div>`;
}
function Timer({ onTerminar }) {
  const [t, setT] = useState(E.leerTimer());
  const [, tick] = useState(0);
  timerGlobal.set = setT;
  useEffect(() => { document.body.classList.toggle('con-timer', !!t); }, [t]);
  useEffect(() => {
    if (!t) { document.title = CONFIG.nombre; return; }
    const id = setInterval(() => {
      const [nt, ev] = E.tickTimer(t);
      if (ev) {
        E.guardarTimer(nt); setT(nt);
        if (ev === 'descanso') E.notificar('🍅 ¡Pomodoro completado!', 'Descansa 5 minutos.');
        else E.notificar('⏰ Fin del descanso', 'Vuelve al tema: otros 25 minutos.');
      }
      document.title = `⏱ ${E.mmss(t.modo === 'pomodoro' && t.fase === 'descanso' ? E.DESCANSO_MS - E.msFase(t) : E.msFoco(t))} · T${t.temaId}`;
      tick((n) => n + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [t]);
  if (!t) return null;
  const tema = temaDe(t.temaId);
  const foco = E.msFoco(t);
  const descanso = t.modo === 'pomodoro' && t.fase === 'descanso';
  const mostrar = descanso ? E.DESCANSO_MS - E.msFase(t) : t.modo === 'pomodoro' ? (t.corriendo ? E.FOCO_MS - E.msFase(t) : t.faseRestante ?? E.FOCO_MS) : foco;
  const guardar = (nt) => { E.guardarTimer(nt); setT(nt); };
  const terminar = () => {
    const min = Math.round(foco / 60000);
    E.guardarTimer(null); setT(null);
    if (min >= 1) onTerminar({ temaId: t.temaId, tipo: 'estudio', minInicial: min });
    else avisar('Menos de un minuto: no se ha guardado nada.');
  };
  const descartar = () => { if (confirm('¿Descartar este tiempo sin guardarlo?')) { E.guardarTimer(null); setT(null); } };
  return html`<div class=${'timer ' + (descanso ? 'descanso' : '') + (t.corriendo ? '' : ' pausado')} role="timer">
    <div class="timer-info"><span class="timer-tema" title=${tema.titulo}>T${tema.id} · ${tema.titulo}</span>
      <span class="timer-fase">${t.modo === 'pomodoro' ? (descanso ? '☕ Descanso' : `🍅 Foco ${t.pomos + 1}`) : '⏱️ Estudiando'}${t.corriendo ? '' : ' · en pausa'}${t.modo === 'pomodoro' ? ` · total ${E.mmss(foco)}` : ''}</span></div>
    <div class="timer-t">${E.mmss(mostrar)}</div>
    <div class="timer-b">
      <button class="icon-btn" aria-label=${t.corriendo ? 'Pausar' : 'Seguir'} onClick=${() => guardar(t.corriendo ? E.pausarTimer(t) : E.reanudarTimer(t))}><${Icon} n=${t.corriendo ? 'pause' : 'play'} /></button>
      <button class="btn sm primary" onClick=${terminar}>Terminar</button>
      <button class="icon-btn sm" aria-label="Descartar" onClick=${descartar}><${Icon} n="x" s=${16} /></button>
    </div>
  </div>`;
}


// ---------- BIENVENIDA (primer uso) ----------
const necesitaBienvenida = (s) => !s.settings.onboarded && !s.settings.examDate && !Object.values(s.temas).some((t) => (t.regs || []).length);
function Bienvenida({ onFin }) {
  const s = getState();
  const hoy = today();
  const [paso, setPaso] = useState(0);
  const elegir = (id) => { update((st) => { st.settings.oposicion = id; }); L.setOposicion(id); setHechos([]); setPaso(1); };
  const [exam, setExam] = useState('');
  const [sinFecha, setSinFecha] = useState(false);
  const [obj, setObj] = useState('');
  const [hechos, setHechos] = useState([]);
  const [dias, setDias] = useState([0, 1, 2, 3, 4, 5]);
  const [horas, setHoras] = useState(15);
  const [res, setRes] = useState(null);
  const masMeses = (n) => { const d = L.parse(hoy); d.setMonth(d.getMonth() + n); return L.toStr(d); };
  const toggle = (id) => setHechos((h) => (h.includes(id) ? h.filter((x) => x !== id) : [...h, id]));
  const bloque = (b) => { const ids = L.TEMAS.filter((t) => t.bloque === b).map((t) => t.id); const todos = ids.every((id) => hechos.includes(id)); setHechos((h) => (todos ? h.filter((x) => !ids.includes(x)) : [...new Set([...h, ...ids])])); };
  const terminar = () => {
    update((st) => {
      st.settings.examDate = sinFecha ? '' : exam;
      st.settings.objetivosVuelta = obj ? [obj] : [];
      st.settings.diasEstudio = dias.length ? [...dias].sort() : [0, 1, 2, 3, 4, 5];
      st.settings.horasObjetivoSemana = +horas || 0;
      st.settings.onboarded = true;
      hechos.forEach((id) => {
        st.temas[id] = st.temas[id] || { semaforo: null, regs: [], proximo: null };
        st.temas[id].regs.push({ id: L.uid(), date: hoy, tipo: 'vuelta', importado: true });
      });
    });
    const st = getState();
    const fin = L.weekday(hoy) >= 5 ? addDays(hoy, 7) : addDays(L.weekStart(hoy), 6);
    const { nuevas } = L.autoplan(st, hoy, fin);
    update((x) => nuevas.forEach((k) => x.tasks.push({ id: L.uid(), done: false, ...k })));
    reiniciarLogrosVistos(getState());
    setRes({ tareas: nuevas.length, hoy: nuevas.filter((k) => k.date === hoy).length, r: E.ritmo(getState()) });
    setPaso(5);
    E.confeti();
  };
  const saltar = () => { update((st) => { st.settings.onboarded = true; }); onFin(); };
  const pasos = ['Oposición', 'Examen', 'Objetivo', 'Temas', 'Horario'];
  const sugerido = exam && !sinFecha ? addDays(exam, -60) : '';
  return html`<div class="modal-bg wiz-bg"><div class="modal wiz" role="dialog" aria-label="Bienvenida">
    ${paso < 5 ? html`<div class="wiz-top"><div class="wiz-steps">${pasos.map((p, i) => html`<span class=${i <= paso ? 'on' : ''}>${i + 1}. ${p}</span>`)}</div><button class="link small muted" onClick=${saltar}>Saltar</button></div>` : null}
    ${paso === 0 ? html`<div class="wiz-body">
      <div class="wiz-emoji">👋</div><h2>¡Bienvenido/a! ¿Qué oposición preparas?</h2>
      <div class="opo-pick">${LISTA_OPOSICIONES.map((o) => html`<button class=${'opo-btn ' + o.id} onClick=${() => elegir(o.id)}>
        <b>${o.nombre}</b><span>${o.escala} · ${o.temas.length} temas</span></button>`)}</div>
      <p class="muted small">Puedes cambiarla cuando quieras en Ajustes: los datos de cada oposición se guardan por separado.</p></div>` : null}
    ${paso === 1 ? html`<div class="wiz-body">
      <div class="wiz-emoji">📅</div><h2>Vamos a organizar tu oposición en 1 minuto</h2>
      <label class="lbl">¿Cuándo es tu examen?</label>
      <input type="date" value=${exam} min=${hoy} disabled=${sinFecha} onInput=${(e) => setExam(e.target.value)} />
      <label class="toggle"><input type="checkbox" checked=${sinFecha} onChange=${(e) => setSinFecha(e.target.checked)} /><span>Aún no hay fecha (podrás ponerla luego)</span></label>
      <div class="modal-f"><button class="btn ghost" onClick=${() => setPaso(0)}>Atrás</button><button class="btn primary" disabled=${!exam && !sinFecha} onClick=${() => setPaso(2)}>Siguiente</button></div></div>` : null}
    ${paso === 2 ? html`<div class="wiz-body">
      <div class="wiz-emoji">🎯</div><h2>¿Cuándo quieres terminar la primera vuelta al temario?</h2>
      <div class="quick">${[1, 2, 3, 4, 6].map((n) => { const d = masMeses(n); return html`<button class=${'chip ' + (obj === d ? 'on' : '')} onClick=${() => setObj(d)}>En ${n} ${n === 1 ? 'mes' : 'meses'}</button>`; })}</div>
      <input type="date" value=${obj} min=${hoy} onInput=${(e) => setObj(e.target.value)} />
      ${sugerido && sugerido > hoy ? html`<p class="muted small">Consejo: termínala unos 2 meses antes del examen (hacia el <button class="link" onClick=${() => setObj(sugerido)}><b>${fmtCorto(sugerido)}</b></button>) para tener tiempo de repasar.</p>` : null}
      <div class="modal-f"><button class="btn ghost" onClick=${() => setPaso(1)}>Atrás</button><button class="btn primary" disabled=${!obj} onClick=${() => setPaso(3)}>Siguiente</button></div></div>` : null}
    ${paso === 3 ? html`<div class="wiz-body">
      <div class="wiz-emoji">📚</div><h2>¿Ya tienes algún tema estudiado?</h2>
      <p class="muted small">Toca los temas a los que ya has dado una vuelta. Si empiezas de cero, pasa al siguiente paso.</p>
      ${Object.entries(L.BLOQUES).map(([b, n]) => html`<div class="wiz-bloque"><div class="wiz-bh"><b>${n}</b><button class="link small" onClick=${() => bloque(b)}>Todos / ninguno</button></div>
        <div class="wiz-temas">${L.TEMAS.filter((t) => t.bloque === b).map((t) => html`<button class=${'tnum-btn ' + (hechos.includes(t.id) ? 'on' : '')} title=${t.titulo} aria-pressed=${hechos.includes(t.id)} onClick=${() => toggle(t.id)}>${t.id}</button>`)}</div></div>`)}
      <p class="small"><b>${hechos.length}</b> de ${L.N_TEMAS} temas marcados</p>
      <div class="modal-f"><button class="btn ghost" onClick=${() => setPaso(2)}>Atrás</button><button class="btn primary" onClick=${() => setPaso(4)}>${hechos.length ? 'Siguiente' : 'Empiezo de cero'}</button></div></div>` : null}
    ${paso === 4 ? html`<div class="wiz-body">
      <div class="wiz-emoji">🗓️</div><h2>¿Qué días estudias?</h2>
      <div class="days">${L.DIAS_CORTO.map((d, i) => html`<button class=${'chip ' + (dias.includes(i) ? 'on' : '')} onClick=${() => setDias(dias.includes(i) ? dias.filter((x) => x !== i) : [...dias, i])}>${d}</button>`)}</div>
      <label class="lbl">¿Cuántas horas a la semana quieres estudiar?</label>
      <div class="quick">${[10, 15, 20, 25, 30].map((h) => html`<button class=${'chip ' + (+horas === h ? 'on' : '')} onClick=${() => setHoras(h)}>${h} h</button>`)}</div>
      <div class="modal-f"><button class="btn ghost" onClick=${() => setPaso(3)}>Atrás</button><button class="btn primary" disabled=${!dias.length} onClick=${terminar}>Crear mi plan</button></div></div>` : null}
    ${paso === 5 && res ? html`<div class="wiz-body wiz-fin">
      <div class="wiz-emoji">🎉</div><h2>¡Tu plan está listo!</h2>
      <ul class="wiz-res">
        <li>📅 <b>${res.tareas} tareas</b> planificadas esta semana${res.hoy ? html`, <b>${res.hoy}</b> para hoy` : ''}.</li>
        ${res.r.necesarioSemana != null ? html`<li>🎯 Para terminar la vuelta 1 el <b>${fmtCorto(obj)}</b> necesitas unos <b>${E.fmtNum(res.r.necesarioSemana)} temas por semana</b>.</li>` : null}
        ${hechos.length ? html`<li>✅ Llevas <b>${hechos.length} de ${L.N_TEMAS} temas</b> con la primera vuelta.</li>` : null}
        <li>⏱️ Cuando estudies, pulsa <b>Empezar a estudiar</b> y la app contará el tiempo por ti.</li>
      </ul>
      <div class="modal-f"><button class="btn primary big" onClick=${onFin}>Ver mi plan de hoy →</button></div></div>` : null}
  </div></div>`;
}

// ---------- Ritmo ----------
function RitmoCard({ s }) {
  const r = E.ritmo(s);
  if (r.estado === 'sin-objetivo') return html`<section class="card ritmo"><div class="ritmo-ico">🎯</div><div><h2>Ponte un objetivo</h2><p class="muted small">Dime cuándo quieres terminar la vuelta ${r.vuelta} y te calculo el ritmo que necesitas.</p><a class="btn sm" href="#/ajustes">Poner fecha objetivo</a></div></section>`;
  if (r.estado === 'vencido') return html`<section class="card ritmo atras"><div class="ritmo-ico">⏰</div><div><h2>Tu fecha objetivo de la vuelta ${r.vuelta} ya pasó</h2><p class="muted small">Te faltan ${r.restantes} temas. Ponte una fecha nueva y reorganiza el plan.</p><a class="btn sm" href="#/ajustes">Cambiar fecha</a></div></section>`;
  if (r.estado === 'hecho') return null;
  const lleva = `Llevas ${E.fmtNum(r.actualSemana)} temas por semana y necesitas ${E.fmtNum(r.necesarioSemana)}`;
  const M = r.estado === 'arrancando' ? ['💪', 'Buen comienzo', `Llevas ${r.semanaActual} tema${r.semanaActual === 1 ? '' : 's'} esta semana. Para terminar la vuelta ${r.vuelta} el ${fmtCorto(r.objetivo)} el objetivo es unos ${E.fmtNum(r.necesarioSemana)} temas por semana: ¡a por ello!`]
    : r.estado === 'empezando' ? ['🚀', 'Empieza hoy', `Para terminar la vuelta ${r.vuelta} el ${fmtCorto(r.objetivo)} necesitas unos ${E.fmtNum(r.necesarioSemana)} temas por semana.`]
    : r.estado === 'bien' ? ['✅', '¡Vas bien!', `${lleva}.${r.fin ? ` A este ritmo acabas el ${fmtCorto(r.fin)}.` : ''}`]
    : r.estado === 'justo' ? ['⚠️', 'Vas justo', `${lleva}. Un empujón y llegas.`]
    : ['🔴', 'Necesitas acelerar', `${lleva}${r.fin ? `: a este ritmo acabarías el ${fmtCorto(r.fin)}` : ''}.`];
  const N = L.N_TEMAS, pct = Math.round(((N - r.restantes) / N) * 100);
  return html`<section class=${'card ritmo ' + r.estado}><div class="ritmo-ico">${M[0]}</div><div class="ritmo-txt">
    <h2>${M[1]}</h2><p class="small">${M[2]}</p>
    <div class="progress"><div style=${{ width: pct + '%' }}></div></div>
    <p class="muted small">Vuelta ${r.vuelta}: ${N - r.restantes}/${N} temas · objetivo ${fmtCorto(r.objetivo)} (${r.dias} días)</p></div></section>`;
}


// ---------- Enlaces a la tienda (solo para quien no tiene los mapas) ----------
const tieneMapasOpo = () => (L.OPO.id === 'gc' ? acceso.tieneMapasGC : acceso.tieneMapas);
const mostrarMapas = () => !!(L.OPO.id === 'gc' ? CONFIG.mapasGC : CONFIG.mapas) && !tieneMapasOpo();
const urlMapasGratis = () => (L.OPO.id === 'gc' ? CONFIG.mapasGC.gratis : CONFIG.mapas.gratis);
// Enlace a la página del tema en la web y pack de mapas que lo incluye.
function mapasDeTema(t) {
  if (L.OPO.id === 'gc') {
    const G = CONFIG.mapasGC;
    const pack = G.packs.find((p) => p.temas.includes(t.id));
    return { url: G.temaUrl[t.id] || G.gratis, conPagina: !!G.temaUrl[t.id], pack: pack ? { nombre: pack.nombre, url: pack.url, key: 'gc-' + t.id } : null };
  }
  const M = CONFIG.mapas;
  const conPagina = !M.temasSinArticulo.includes(t.id);
  const pack = M.packBloque[t.bloque];
  return { url: conPagina ? M.articulo.replace('{n}', t.id) : M.gratis, conPagina, pack: pack ? { ...pack, key: t.bloque } : null };
}
const utm = (url, medio, contenido) => url + (url.includes('?') ? '&' : '?') + `utm_source=app&utm_medium=${medio}&utm_campaign=planificador${contenido ? '&utm_content=' + contenido : ''}`;
function MapasTema({ t }) {
  if (!mostrarMapas()) return null;
  const { url, conPagina: conArticulo, pack } = mapasDeTema(t);
  return html`<section class="card mapas-tema">
    <div class="mt-ico">🗺️</div>
    <div class="mt-txt"><h2>Repasa este tema con sus mapas</h2>
      <p class="muted small">Cada mapa resume el artículo clave, la trampa típica de examen y cómo cae en el test.</p>
      <div class="btns">
        <a class="btn sm" href=${utm(url, 'tema', 'tema-' + t.id)} target="_blank" rel="noopener">${conArticulo ? `Ver el tema ${t.id} en mapas` : '12 mapas gratis'}</a>
        ${pack ? html`<a class="btn sm ghost" href=${utm(pack.url, 'tema', 'pack-' + pack.key)} target="_blank" rel="noopener">Mapas completos: ${pack.nombre} →</a>` : null}
      </div></div>
  </section>`;
}
function MapasGratisCard() {
  const s = useStore();
  if (!mostrarMapas() || s.settings.ocultarMapasGratis) return null;
  return html`<section class="card mapas-gratis">
    <div class="mt-ico">🎁</div>
    <div class="mt-txt"><h2>12 mapas gratis de ${L.OPO.nombre}</h2>
      <p class="muted small">Descárgalos en PDF: el artículo clave, la trampa típica y cómo cae en el test, de los temas más preguntados.</p>
      <a class="btn sm primary" href=${utm(urlMapasGratis(), 'hoy')} target="_blank" rel="noopener">Descargar mapas gratis</a></div>
    <button class="icon-btn sm" aria-label="Ocultar" title="No volver a mostrar" onClick=${() => update((x) => { x.settings.ocultarMapasGratis = true; })}><${Icon} n="x" s=${15} /></button>
  </section>`;
}
function OfertaPack({ medio }) {
  const P = CONFIG.packOferta;
  if (!P || !mostrarMapas() || L.OPO.id !== 'pn') return null;
  return html`<div class="oferta-pack">
    <div><span class="oferta">🎁 Por solo 5 € más</span>
      <p><b>${P.nombre}: ${P.precio}</b> <span class="muted">(<s>${P.precioSeparado}</s> por separado)</span></p>
      <p class="muted small">El planificador de por vida y los 262 mapas en PDF de los 45 temas.</p></div>
    <a class="btn" href=${conUsuario(P.url, medio)} target="_blank" rel="noopener">Llevarme el pack · ${P.precio}</a>
  </div>`;
}

// ---------- HOY ----------
const racha = (s) => E.racha(s);
const minutosEntre = (s, a, b) => s.horas.filter((h) => h.date >= a && h.date <= b).reduce((x, h) => x + h.min, 0);
const notaDesdeVuelta = (i) => (i.nota && (!i.ultimaVuelta || i.nota.date >= i.ultimaVuelta.date) ? i.nota : null);

function Hoy() {
  const s = useStore();
  const hoy = today();
  const v = L.resumenVueltas(s.temas);
  const pend = L.pendientes(s.temas, hoy);
  const tareas = s.tasks.filter((k) => k.date === hoy);
  const atrasadas = s.tasks.filter((k) => k.date < hoy && !k.done);
  const diasExamen = s.settings.examDate ? L.diffDays(hoy, s.settings.examDate) : null;
  const objetivo = L.objetivoVuelta(s.settings, v.actual);
  const minHoy = minutosEntre(s, hoy, hoy);
  const minSemana = minutosEntre(s, L.weekStart(hoy), hoy);
  const objH = (s.settings.horasObjetivoSemana || 0) * 60;
  const [otro, setOtro] = useState('');
  const sig = v.siguiente ? L.infoTema(s.temas[v.siguiente.id]) : null;
  const nota = sig ? notaDesdeVuelta(sig) : null;

  return html`<div class="page">
    <header class="ph"><div><div class="muted cap">${fmtLargo(hoy)}</div><h1>Hoy</h1></div></header>
    <div class="kpis">
      <div class="kpi"><div class="k-l">Examen</div><div class="k-v">${diasExamen === null ? '—' : diasExamen}</div><div class="k-s">${diasExamen === null ? html`<a href="#/ajustes">Pon la fecha</a>` : 'días restantes'}</div></div>
      <div class="kpi"><div class="k-l">Vuelta ${v.actual}</div><div class="k-v">${v.hechos}<small>/${L.N_TEMAS}</small></div><div class="k-s">${objetivo ? `objetivo: ${fmtCorto(objetivo)}` : html`<a href="#/ajustes">Pon un objetivo</a>`}</div></div>
      <div class="kpi"><div class="k-l">Racha</div><div class="k-v">${racha(s)}</div><div class="k-s">días seguidos</div></div>
      <div class="kpi"><div class="k-l">Esta semana</div><div class="k-v">${(minSemana / 60).toFixed(1).replace('.', ',')}<small> h</small></div><div class="k-s">${objH ? `de ${s.settings.horasObjetivoSemana} h objetivo` : 'estudiadas'}</div></div>
    </div>

    <${RitmoCard} s=${s} />
    ${s.settings.onboarded && !s.settings.examDate ? html`<section class="card onboard">
      <h2>Primeros pasos</h2>
      <ol>
        <li class=${s.settings.examDate ? 'ok' : ''}><a href="#/ajustes">Pon la fecha de tu examen</a></li>
      </ol></section>` : null}
    <section class="card">
      <h2>¿Qué toca hoy?</h2>
      <div class="choice">
        <div class="opt">
          <div class="opt-h"><span class="tag nuevo">Avanzar</span><span class="muted small">Vuelta ${v.actual}</span></div>
          ${v.siguiente ? html`<div class="opt-t"><button class="link" onClick=${() => go('#/tema/' + v.siguiente.id)}><b>Tema ${v.siguiente.id}</b> · ${v.siguiente.titulo}</button></div>
            ${nota ? html`<div class="quedaste"><span class="muted small">Te quedaste en (${fmtCorto(nota.date)}):</span> ${nota.note}</div>` : sig.n ? html`<div class="muted small">${fmtMin(sig.min)} estudiados en este tema</div>` : null}
            <${StartTimer} temaId=${v.siguiente.id} compact />
            <div class="btns"><button class="btn sm" onClick=${() => openRegistroGlobal({ temaId: v.siguiente.id, tipo: 'estudio' })}><${Icon} n="clock" s=${16} /> Registrar a mano</button>
              <button class="btn sm" onClick=${() => openRegistroGlobal({ temaId: v.siguiente.id, tipo: 'vuelta' })}><${Icon} n="check" s=${16} /> Vuelta completa</button></div>` : html`<div class="opt-t">¡Vuelta terminada!</div>`}
        </div>
        <div class="opt">
          <div class="opt-h"><span class="tag repaso">Repasar</span><span class="muted small">${pend.length ? `${pend.length} pendiente${pend.length > 1 ? 's' : ''}` : 'Nada pendiente'}</span></div>
          ${pend.length ? html`<ul class="mini">${pend.slice(0, 4).map(({ t, i }) => html`<li>
              <button class="link" onClick=${() => go('#/tema/' + t.id)}><b>T${t.id}</b> ${t.titulo}</button>
              <span class="muted small">${i.proximo < hoy ? 'tocaba ' + fmtRel(i.proximo) : 'toca hoy'}</span>
              <span class="btns-r">${tarjetasTema(t.id).length ? html`<button class="btn sm" title="Repaso rápido con preguntas" onClick=${() => abrirPractica(t.id)}><${Icon} n="bolt" s=${14} /> Practicar</button>` : null}
              <button class="btn sm" onClick=${() => openRegistroGlobal({ temaId: t.id, tipo: 'repaso' })}>Repasado</button></span></li>`)}</ul>` : html`<p class="muted small">Los temas aparecen aquí en la fecha que elijas al registrar una vuelta o un repaso.</p>`}
          <div class="pick">
            <select value=${otro} onChange=${(e) => setOtro(e.target.value)} aria-label="Elegir tema">
              <option value="">Registrar en otro tema…</option>
              ${L.TEMAS.map((t) => html`<option value=${t.id}>Tema ${t.id} · ${t.titulo}</option>`)}
            </select>
            <button class="btn" disabled=${!otro} onClick=${() => { openRegistroGlobal({ temaId: +otro, tipo: 'repaso' }); setOtro(''); }}>Abrir</button>
          </div>
        </div>
      </div>
    </section>

    <section class="card">
      <div class="card-h"><h2>Plan de hoy</h2><a class="btn sm ghost" href="#/plan">Abrir planificación</a></div>
      ${atrasadas.length ? html`<div class="note warn"><${Icon} n="alert" s=${16} /> Tienes ${atrasadas.length} tarea${atrasadas.length > 1 ? 's' : ''} atrasada${atrasadas.length > 1 ? 's' : ''}.
        <button class="link" onClick=${() => update((st) => st.tasks.forEach((k) => { if (k.date < hoy && !k.done) k.date = hoy; }))}>Pasarlas a hoy</button></div>` : null}
      <${TaskList} tasks=${tareas} empty="Nada planificado para hoy." />
      <${AddTask} date=${hoy} />
    </section>

    <${MapasGratisCard} />
    <section class="card">
      <h2>Horas de hoy: ${fmtMin(minHoy)}</h2>
      ${objH ? html`<div class="progress"><div style=${{ width: Math.min(100, (minSemana / objH) * 100) + '%' }}></div></div>
        <p class="muted small">${fmtMin(minSemana)} de ${s.settings.horasObjetivoSemana} h esta semana · las horas de "Registrar estudio" se suman solas</p>` : null}
      <${AddHoras} date=${hoy} />
    </section>
  </div>`;
}

function AddHoras({ date }) {
  const [min, setMin] = useState('');
  const [note, setNote] = useState('');
  const add = (e) => {
    e.preventDefault();
    const m = parseInt(min, 10);
    if (!(m > 0)) return;
    update((s) => s.horas.push({ id: L.uid(), date, min: m, note }));
    setMin(''); setNote('');
  };
  return html`<form class="inline" onSubmit=${add}>
    <div class="quick">${[25, 50, 60, 90, 120].map((m) => html`<button type="button" class="chip" onClick=${() => update((s) => s.horas.push({ id: L.uid(), date, min: m, note: '' }))}>+${m < 60 ? m + ' min' : m / 60 + ' h'}</button>`)}</div>
    <input type="number" inputmode="numeric" min="1" placeholder="Minutos" value=${min} onInput=${(e) => setMin(e.target.value)} />
    <input placeholder="Nota (opcional)" value=${note} onInput=${(e) => setNote(e.target.value)} />
    <button class="btn" type="submit"><${Icon} n="plus" s=${16} /> Añadir</button>
  </form>`;
}

// ---------- Tareas ----------
function TaskList({ tasks, empty, compact }) {
  if (!tasks.length) return html`<p class="empty">${empty}</p>`;
  const toggle = (k) => {
    if (!k.done && k.temaId) openRegistroGlobal({ temaId: k.temaId, tipo: k.kind === 'nuevo' ? 'estudio' : 'repaso', taskId: k.id });
    else if (!k.done && k.type === 'simulacro') { update((s) => { s.tasks.find((y) => y.id === k.id).done = true; }); avisar('📝 Apunta tu nota del simulacro'); go('#/tests'); }
    else update((s) => { const x = s.tasks.find((y) => y.id === k.id); x.done = !x.done; });
  };
  return html`<ul class=${'tasks ' + (compact ? 'compact' : '')}>${tasks.map((k) => html`<li class=${k.done ? 'done' : ''}>
    <button class=${'chk ' + (k.done ? 'on' : '')} onClick=${() => toggle(k)} aria-label=${k.done ? 'Marcar pendiente' : 'Marcar hecha'}>${k.done ? html`<${Icon} n="check" s=${14} />` : null}</button>
    <div class="t-body">
      <div class="t-title">${k.temaId ? html`<button class="link" onClick=${() => go('#/tema/' + k.temaId)}>${k.title}</button>` : k.title}</div>
      ${!compact ? html`<div class="t-meta"><span class=${'tag ' + k.type}>${TIPOS[k.type] || k.type}</span>${k.temaId ? html`<span class="muted small">${temaDe(k.temaId).titulo}</span>` : null}</div>` : null}
    </div>
    <button class="icon-btn sm" aria-label="Borrar tarea" onClick=${() => update((s) => { s.tasks = s.tasks.filter((y) => y.id !== k.id); })}><${Icon} n="trash" s=${15} /></button>
  </li>`)}</ul>`;
}

function AddTask({ date }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('otro');
  const [temaId, setTemaId] = useState('');
  const add = (e) => {
    e.preventDefault();
    const id = parseInt(temaId, 10) || null;
    const t = title.trim() || (id ? `${type === 'repaso' ? 'Repasar' : 'Estudiar'} tema ${id}` : '');
    if (!t) return;
    update((s) => s.tasks.push({ id: L.uid(), date, title: t, type, done: false, temaId: id, kind: id ? (type === 'repaso' ? 'repaso' : 'nuevo') : null }));
    setTitle(''); setTemaId('');
  };
  return html`<form class="addtask" onSubmit=${add}>
    <input placeholder="Añadir tarea…" value=${title} onInput=${(e) => setTitle(e.target.value)} />
    <select value=${type} onChange=${(e) => setType(e.target.value)} aria-label="Tipo">${Object.entries(TIPOS).map(([k, v]) => html`<option value=${k}>${v}</option>`)}</select>
    ${type === 'estudio' || type === 'repaso' ? html`<select value=${temaId} onChange=${(e) => setTemaId(e.target.value)} aria-label="Tema">
      <option value="">Tema…</option>${L.TEMAS.map((t) => html`<option value=${t.id}>T${t.id} · ${t.titulo}</option>`)}</select>` : null}
    <button class="btn" type="submit" aria-label="Añadir"><${Icon} n="plus" s=${16} /></button>
  </form>`;
}

// ---------- TEMARIO ----------
const CLASES = [
  ['todos', 'Todos'], ['sinempezar', 'Sin empezar'], ['rojo', 'No lo sé'], ['amarillo', 'Flojo'], ['bien', 'Bien'], ['verde', 'Dominado'],
];
function Temario() {
  const s = useStore();
  const [filtro, setFiltro] = useState('todos');
  const hoy = today();
  const v = L.resumenVueltas(s.temas);
  const rows = L.TEMAS.map((t) => {
    const tm = s.temas[t.id];
    const i = L.infoTema(tm);
    const est = L.dominio(tm, hoy);
    return { t, i, est, clase: L.clase(tm), manual: tm?.semaforo || null, aviso: L.aviso(tm?.semaforo, est) };
  });
  const pasa = (r, f) => f === 'todos' || r.clase === f;
  const visibles = rows.filter((r) => pasa(r, filtro));
  const objetivo = L.objetivoVuelta(s.settings, v.actual);
  return html`<div class="page">
    <header class="ph"><div><div class="muted cap">Vuelta ${v.actual} · ${v.hechos}/${L.N_TEMAS} temas${objetivo ? ' · objetivo ' + fmtCorto(objetivo) : ''}</div><h1>Temario</h1></div></header>
    <div class="filters">${CLASES.map(([k, l]) => { const n = rows.filter((r) => pasa(r, k)).length; return html`<button class=${'chip ' + (filtro === k ? 'on' : '')} onClick=${() => setFiltro(k)}>${l} <span class="cnt">${n}</span></button>`; })}</div>
    ${Object.entries(L.BLOQUES).map(([b, nombre]) => {
      const list = visibles.filter((r) => r.t.bloque === b);
      if (!list.length) return null;
      return html`<section class="card flush">
        <h2 class="pad">${nombre}</h2>
        <div class="tlist">${list.map((r) => html`<a class="trow" href=${'#/tema/' + r.t.id}>
          <span class="tnum">${r.t.id}</span>
          <span class="tmain"><span class="ttit">${r.t.titulo}${r.aviso ? html` <span class="warn-ico" title=${r.aviso}><${Icon} n="alert" s=${14} /></span>` : null}</span>
            <span class="tmeta"><${Semaforo} value=${r.clase} small />
              <span class="muted small">${r.i.vueltas} vuelta${r.i.vueltas === 1 ? '' : 's'}${r.i.min ? ' · ' + fmtMin(r.i.min) : ''}</span>
              ${r.i.proximo ? html`<span class=${'small ' + (r.i.proximo <= hoy ? 'due' : 'muted')}>${r.i.proximo < hoy ? 'Repaso atrasado' : 'Repaso ' + fmtRel(r.i.proximo)}</span>` : null}</span></span>
          <span class="tdom">${r.est === null ? html`<span class="small muted">—</span>` : html`<span class="small">${r.est} %</span><${Barra} pct=${r.est} />`}</span>
        </a>`)}</div></section>`;
    })}
    ${!visibles.length ? html`<p class="empty">No hay temas con ese filtro.</p>` : null}
  </div>`;
}

function TemaDetalle({ id }) {
  const s = useStore();
  const t = temaDe(id);
  if (!t) return html`<div class="page"><p>Tema no encontrado.</p></div>`;
  const tm = s.temas[id];
  const i = L.infoTema(tm);
  const est = L.dominio(tm);
  const manual = tm?.semaforo || null;
  const aviso = L.aviso(manual, est);
  const hoy = today();
  const nota = notaDesdeVuelta(i) || i.nota;
  const ensure = (st) => (st.temas[id] = st.temas[id] || { semaforo: null, regs: [], proximo: null });
  const setSem = (v) => update((st) => { const x = ensure(st); x.semaforo = x.semaforo === v ? null : v; });
  const setProx = (d) => update((st) => { ensure(st).proximo = d || null; });
  const borrar = (r) => confirm('¿Borrar este registro?') && update((st) => {
    st.temas[id].regs = st.temas[id].regs.filter((x) => x.id !== r.id);
    st.horas = st.horas.filter((h) => h.regId !== r.id);
  });
  return html`<div class="page">
    <header class="ph"><div><a class="muted small back" href="#/temario"><${Icon} n="left" s=${14} /> Temario</a>
      <div class="muted cap">Tema ${t.id} · ${L.BLOQUES[t.bloque]}</div><h1>${t.titulo}</h1></div>
      <div class="nav-t">${id > 1 ? html`<a class="icon-btn" href=${'#/tema/' + (id - 1)} aria-label="Tema anterior"><${Icon} n="left" /></a>` : null}
        ${id < L.N_TEMAS ? html`<a class="icon-btn" href=${'#/tema/' + (id + 1)} aria-label="Tema siguiente"><${Icon} n="right" /></a>` : null}</div></header>

    <section class="card">
      <h2>Estudiar este tema</h2>
      <${StartTimer} temaId=${id} />
      <p class="muted small">El temporizador cuenta el tiempo por ti y al terminar te pide la nota de por dónde te has quedado.</p>
      <h2 style="margin-top:14px">O registra a mano</h2>
      <div class="reg3">
        <button class="regbtn" onClick=${() => openRegistroGlobal({ temaId: id, tipo: 'estudio' })}><${Icon} n="clock" /><b>Estudio</b><span>Minutos y por dónde vas</span></button>
        <button class="regbtn" onClick=${() => openRegistroGlobal({ temaId: id, tipo: 'repaso' })}><${Icon} n="hoy" /><b>Repaso</b><span>Cómo te lo sabías</span></button>
        <button class="regbtn main" onClick=${() => openRegistroGlobal({ temaId: id, tipo: 'vuelta' })}><${Icon} n="check" /><b>Vuelta completa</b><span>Suma al contador</span></button>
      </div>
    </section>

    <div class="kpis">
      <div class="kpi"><div class="k-l">Vueltas</div><div class="k-v">${i.vueltas}</div><div class="k-s">${i.ultimaVuelta ? 'última terminada el ' + fmtCorto(i.ultimaVuelta.date) : 'ninguna terminada'}</div></div>
      <div class="kpi"><div class="k-l">Volver a darlo</div>
        <input class="kpi-date" type="date" value=${i.proximo || ''} onInput=${(e) => setProx(e.target.value)} aria-label="Fecha para volver a darlo" />
        <div class=${'k-s ' + (i.proximo && i.proximo <= hoy ? 'due' : '')}>${i.proximo ? (i.proximo < hoy ? 'atrasado: tocaba ' + fmtRel(i.proximo) : fmtRel(i.proximo)) : 'sin fecha'}${i.proximo ? html` · <button class="link small" onClick=${() => setProx(null)}>quitar</button>` : null}</div></div>
      <div class="kpi"><div class="k-l">Tiempo estudiado</div><div class="k-v sm">${i.min ? fmtMin(i.min) : '—'}</div><div class="k-s">${((n) => `${n} sesi${n === 1 ? 'ón' : 'ones'} de estudio`)(i.regs.filter((r) => r.tipo === 'estudio').length)}</div></div>
    </div>

    ${nota ? html`<section class="card quedaste-card"><div class="k-l">Por dónde te quedaste · ${fmtCorto(nota.date)}</div><p>${nota.note}</p></section>` : null}

    <${RepasoRapido} t=${t} s=${s} />
    <${MapasTema} t=${t} />
    <section class="card">
      <h2>Cómo lo llevo</h2>
      <div class="semsel"><button class=${'sembtn vacio' + (!manual ? ' on' : '')} onClick=${() => manual && setSem(manual)} aria-pressed=${!manual}><i></i>Sin empezar</button>
        ${Object.entries(L.SEMAFORO).map(([k, m]) => html`<button class=${'sembtn ' + k + (manual === k ? ' on' : '')} onClick=${() => setSem(k)} aria-pressed=${manual === k}><i></i>${m.label}</button>`)}</div>
      ${aviso ? html`<div class="note warn"><${Icon} n="alert" s=${16} /> ${aviso}</div>` : null}
      <p class="muted small">${est === null ? 'Cuando valores un repaso, aquí verás también una estimación orientativa.' : `Estimación orientativa según tus valoraciones: ${est} %.`}</p>
    </section>

    <section class="card">
      <h2>Historial</h2>
      ${i.regs.length ? html`<ul class="hist2">${[...i.regs].reverse().map((r) => { const R = r.rating ? L.RATINGS[r.rating - 1] : null; return html`<li>
        <div class="h-top"><span class="h-date">${fmtCorto(r.date)}</span><span class=${'tag ' + ({ vuelta: 'estudio', repaso: 'repaso', practica: 'repaso', estudio: 'otro' }[r.tipo] || 'otro')}>${L.TIPO_LABEL[r.tipo] || r.tipo}</span>
          ${r.min ? html`<span class="small muted">${fmtMin(r.min)}</span>` : null}${R ? html`<span class="small">${R.emoji} ${R.label}</span>` : null}
          <button class="icon-btn sm push" aria-label="Borrar registro" onClick=${() => borrar(r)}><${Icon} n="trash" s=${15} /></button></div>
        ${r.note ? html`<div class="h-note">${r.note}</div>` : null}</li>`; })}</ul>` : html`<p class="empty">Aún no hay registros.</p>`}
    </section>
  </div>`;
}

// ---------- PLANIFICACIÓN ----------
function Plan() {
  const s = useStore();
  const [vista, setVista] = useState('semana');
  const [ref, setRef] = useState(today());
  const mover = (n) => setRef(vista === 'dia' ? addDays(ref, n) : vista === 'semana' ? addDays(ref, 7 * n) : (() => { const d = L.parse(L.monthStart(ref)); d.setMonth(d.getMonth() + n); return L.toStr(d); })());
  const titulo = vista === 'dia' ? fmtLargo(ref) : vista === 'semana' ? `Semana del ${fmtCorto(L.weekStart(ref))} al ${fmtCorto(addDays(L.weekStart(ref), 6))}` : L.fmtMes(ref);
  return html`<div class="page">
    <header class="ph"><div><div class="muted cap">Planificación</div><h1 class="cap1">${titulo}</h1></div></header>
    <div class="toolbar">
      <div class="seg">${[['dia', 'Día'], ['semana', 'Semana'], ['mes', 'Mes']].map(([k, l]) => html`<button class=${vista === k ? 'on' : ''} onClick=${() => setVista(k)}>${l}</button>`)}</div>
      <div class="navs"><button class="icon-btn" onClick=${() => mover(-1)} aria-label="Anterior"><${Icon} n="left" /></button>
        <button class="btn sm ghost" onClick=${() => setRef(today())}>Hoy</button>
        <button class="icon-btn" onClick=${() => mover(1)} aria-label="Siguiente"><${Icon} n="right" /></button></div>
    </div>
    ${vista === 'dia' ? html`<${PlanDia} s=${s} date=${ref} />` : vista === 'semana' ? html`<${PlanSemana} s=${s} day=${ref} setRef=${setRef} setVista=${setVista} />` : html`<${PlanMes} s=${s} day=${ref} onDay=${(d) => { setRef(d); setVista('dia'); }} />`}
  </div>`;
}

function PlanDia({ s, date }) {
  const tareas = s.tasks.filter((k) => k.date === date);
  return html`<section class="card"><h2>Tareas</h2><${TaskList} tasks=${tareas} empty="Sin tareas este día." /><${AddTask} date=${date} />
    <p class="muted small">Horas registradas: ${fmtMin(minutosEntre(s, date, date))}</p></section>
    ${date === today() ? null : html`<section class="card"><h2>Horas de este día</h2><${AddHoras} date=${date} /></section>`}`;
}

function Goals({ s, period, k }) {
  const [txt, setTxt] = useState('');
  const list = s.goals.filter((g) => g.period === period && g.key === k);
  const add = (e) => { e.preventDefault(); if (!txt.trim()) return; update((st) => st.goals.push({ id: L.uid(), period, key: k, text: txt.trim(), done: false })); setTxt(''); };
  return html`<section class="card"><h2>Objetivos ${period === 'semana' ? 'de la semana' : 'del mes'}</h2>
    ${list.length ? html`<ul class="tasks">${list.map((g) => html`<li class=${g.done ? 'done' : ''}>
      <button class=${'chk ' + (g.done ? 'on' : '')} onClick=${() => update((st) => { const x = st.goals.find((y) => y.id === g.id); x.done = !x.done; })} aria-label="Cambiar estado">${g.done ? html`<${Icon} n="check" s=${14} />` : null}</button>
      <div class="t-body"><div class="t-title">${g.text}</div></div>
      <button class="icon-btn sm" aria-label="Borrar objetivo" onClick=${() => update((st) => { st.goals = st.goals.filter((y) => y.id !== g.id); })}><${Icon} n="trash" s=${15} /></button></li>`)}</ul>` : html`<p class="empty">Sin objetivos todavía.</p>`}
    <form class="inline" onSubmit=${add}><input placeholder=${period === 'semana' ? 'p. ej. Terminar bloque de Penal' : 'p. ej. Cerrar la vuelta 2'} value=${txt} onInput=${(e) => setTxt(e.target.value)} /><button class="btn" type="submit"><${Icon} n="plus" s=${16} /> Añadir</button></form>
  </section>`;
}

function PlanSemana({ s, day, setRef, setVista }) {
  const ini = L.weekStart(day);
  const dias = Array.from({ length: 7 }, (_, i) => addDays(ini, i));
  const hoy = today();
  const [msg, setMsg] = useState('');
  const auto = () => {
    const from = ini < hoy ? hoy : ini, to = addDays(ini, 6);
    if (from > to) { setMsg('Esta semana ya ha pasado.'); return; }
    const esAuto = (k) => !k.done && k.date >= from && k.date <= to && (k.auto || (k.kind && /^(Tema \d+ \(vuelta \d+\)|Repasar tema \d+)$/.test(k.title)));
    const base = { ...s, tasks: s.tasks.filter((k) => !esAuto(k)) };
    const { nuevas, avisos } = L.autoplan(base, from, to);
    const quitadas = s.tasks.length - base.tasks.length;
    update((st) => { st.tasks = st.tasks.filter((k) => !esAuto(k)); nuevas.forEach((k) => st.tasks.push({ id: L.uid(), done: false, ...k })); });
    setMsg([`${nuevas.length} tareas planificadas${quitadas ? ` (sustituyen a ${quitadas} automáticas anteriores)` : ''}. Tus tareas manuales no se tocan.`, ...avisos].join(' '));
  };
  const minSem = minutosEntre(s, ini, addDays(ini, 6));
  const obj = s.settings.horasObjetivoSemana || 0;
  return html`
    <section class="card">
      <div class="card-h"><h2>Semana</h2><button class="btn primary sm" onClick=${auto}><${Icon} n="wand" s=${16} /> Autoplanificar</button></div>
      <p class="muted small">Autoplanificar mete primero los temas que te faltan de la vuelta actual (repartidos hasta tu fecha objetivo) y después los repasos en las fechas que tú elegiste. Puedes volver a pulsarlo cuando quieras: rehace solo las tareas automáticas.</p>
      ${msg ? html`<div class="note">${msg}</div>` : null}
      <div class="week">${dias.map((d) => { const ts = s.tasks.filter((k) => k.date === d); const m = minutosEntre(s, d, d); return html`<div class=${'wday ' + (d === hoy ? 'today' : '')}>
        <button class="wday-h" onClick=${() => { setRef(d); setVista('dia'); }}><span>${L.DIAS_CORTO[L.weekday(d)]} ${L.parse(d).getDate()}</span>${m ? html`<span class="muted small">${fmtMin(m)}</span>` : null}</button>
        <${TaskList} tasks=${ts} empty="—" compact />
        <${QuickAdd} date=${d} />
      </div>`; })}</div>
      ${obj ? html`<div class="progress"><div style=${{ width: Math.min(100, (minSem / (obj * 60)) * 100) + '%' }}></div></div><p class="muted small">${fmtMin(minSem)} de ${obj} h de objetivo semanal</p>` : null}
    </section>
    <${Goals} s=${s} period="semana" k=${ini} />`;
}

function QuickAdd({ date }) {
  const [open, setOpen] = useState(false);
  const [t, setT] = useState('');
  if (!open) return html`<button class="qadd" onClick=${() => setOpen(true)}><${Icon} n="plus" s=${14} /> Añadir</button>`;
  const ok = (e) => { e.preventDefault(); if (t.trim()) update((s) => s.tasks.push({ id: L.uid(), date, title: t.trim(), type: 'otro', done: false })); setT(''); setOpen(false); };
  return html`<form onSubmit=${ok}><input autofocus class="qinput" placeholder="Tarea y Enter" value=${t} onInput=${(e) => setT(e.target.value)} onBlur=${ok} /></form>`;
}

function PlanMes({ s, day, onDay }) {
  const ini = L.monthStart(day);
  const start = L.weekStart(ini);
  const mes = L.monthKey(ini);
  const hoy = today();
  const celdas = Array.from({ length: 42 }, (_, i) => addDays(start, i));
  const filas = celdas[35].slice(0, 7) === mes ? 6 : 5;
  const minMes = s.horas.filter((h) => L.monthKey(h.date) === mes).reduce((a, h) => a + h.min, 0);
  const regsMes = Object.values(s.temas).flatMap((t) => t.regs || []).filter((r) => L.monthKey(r.date) === mes);
  return html`
    <section class="card">
      <div class="month">${L.DIAS_CORTO.map((d) => html`<div class="mh">${d}</div>`)}
        ${celdas.slice(0, filas * 7).map((d) => { const ts = s.tasks.filter((k) => k.date === d); const hechas = ts.filter((k) => k.done).length; const m = minutosEntre(s, d, d);
          return html`<button class=${'mday ' + (L.monthKey(d) !== mes ? 'out ' : '') + (d === hoy ? 'today' : '')} onClick=${() => onDay(d)}>
            <span class="mnum">${L.parse(d).getDate()}</span>
            ${ts.length ? html`<span class="mtasks">${hechas}/${ts.length}</span>` : null}
            ${m ? html`<span class="mhours">${(m / 60).toFixed(1).replace('.', ',')} h</span>` : null}
          </button>`; })}
      </div>
      <p class="muted small">Este mes: ${fmtMin(minMes)} estudiadas · ${regsMes.filter((r) => r.tipo === 'vuelta').length} temas avanzados · ${regsMes.filter((r) => r.tipo === 'repaso').length} repasos</p>
    </section>
    <${Goals} s=${s} period="mes" k=${mes} />`;
}

// ---------- FÍSICAS ----------
function LineChart({ points, fmt, menorMejor, h = 140, w = 320, vacio = 'Registra al menos dos marcas para ver la evolución.' }) {
  if (points.length < 2) return html`<p class="muted small">${vacio}</p>`;
  const W = w, P = { l: 8, r: 8, t: 14, b: 18 };
  const xs = points.map((p) => L.parse(p.date).getTime()), ys = points.map((p) => p.value);
  const x0 = Math.min(...xs), x1 = Math.max(...xs) || x0 + 1;
  let y0 = Math.min(...ys), y1 = Math.max(...ys); if (y0 === y1) { y0 -= 1; y1 += 1; }
  const pad = (y1 - y0) * 0.15; y0 -= pad; y1 += pad;
  const X = (v) => P.l + ((v - x0) / (x1 - x0 || 1)) * (W - P.l - P.r);
  // En pruebas donde "menos es mejor" invertimos el eje para que mejorar sea subir.
  const Y = (v) => (menorMejor ? P.t + ((v - y0) / (y1 - y0)) * (h - P.t - P.b) : h - P.b - ((v - y0) / (y1 - y0)) * (h - P.t - P.b));
  const d = points.map((p, i) => `${i ? 'L' : 'M'}${X(xs[i]).toFixed(1)},${Y(p.value).toFixed(1)}`).join('');
  return html`<svg class="chart" viewBox=${`0 0 ${W} ${h}`} role="img" aria-label="Evolución de marcas">
    <line x1=${P.l} x2=${W - P.r} y1=${h - P.b} y2=${h - P.b} class="axis" />
    <path d=${d} class="line" />
    ${points.map((p, i) => html`<g><circle cx=${X(xs[i])} cy=${Y(p.value)} r="4.5" class="dot" /><circle cx=${X(xs[i])} cy=${Y(p.value)} r="14" class="hit"><title>${fmtCorto(p.date)}: ${fmt(p.value)}</title></circle></g>`)}
    <text x=${P.l} y=${h - 4} class="tick">${fmtCorto(points[0].date)}</text>
    <text x=${W - P.r} y=${h - 4} class="tick" text-anchor="end">${fmtCorto(points[points.length - 1].date)}</text>
  </svg>`;
}

function Fisicas() {
  const s = useStore();
  const sexo = s.settings.sexo;
  const F = L.OPO.fisicas;
  const apto = F.modo === 'apto';
  const tramo = s.settings.tramoEdad || 0;
  const notas = [];
  const cards = Object.keys(L.PRUEBAS).map((p) => {
    const marks = s.fisicas.filter((f) => f.prueba === p).sort((a, b) => (a.date < b.date ? -1 : 1));
    const last = marks[marks.length - 1];
    const menor = L.PRUEBAS[p].menorMejor;
    const best = marks.length ? marks.reduce((a, b) => (menor ? (b.value < a.value ? b : a) : b.value > a.value ? b : a)) : null;
    const pts = last && !apto ? L.puntos(p, sexo, last.value) : null;
    const ok = last && apto ? L.esApto(p, sexo, tramo, last.value) : null;
    if (pts !== null) notas.push(pts);
    return { p, marks, last, best, pts, ok, min: apto ? L.marcaMinima(p, sexo, tramo) : null };
  });
  const n = cards.length;
  const media = !apto && notas.length === n ? Math.round((notas.reduce((a, b) => a + b, 0) / n) * 10) / 10 : null;
  const superadas = cards.filter((c) => c.ok).length, conMarca = cards.filter((c) => c.last).length;
  return html`<div class="page">
    <header class="ph"><div><div class="muted cap">Pruebas físicas · ${L.OPO.nombre} · ${sexo === 'H' ? 'hombres' : 'mujeres'}${apto ? ' · ' + F.tramos[tramo].toLowerCase() : ''}</div><h1>Físicas</h1></div></header>
    <div class="kpis">${apto
      ? html`<div class="kpi"><div class="k-l">Pruebas superadas</div><div class="k-v">${superadas}<small>/${n}</small></div><div class="k-s">${conMarca < n ? `Registra las ${n} pruebas` : superadas === n ? 'Apto en todas ✓' : 'Aún no apto en todas'}</div></div>
        <div class="kpi"><div class="k-l">Tu tramo</div><div class="k-v sm">${F.tramos[tramo]}</div><div class="k-s"><a href="#/ajustes">Cambiar edad o sexo</a></div></div>`
      : html`<div class="kpi"><div class="k-l">Nota media estimada</div><div class="k-v">${media === null ? '—' : String(media).replace('.', ',')}</div><div class="k-s">${media === null ? `Registra las ${n} pruebas` : media >= 5 && notas.every((x) => x > 0) ? 'Apto (≥ 5 y sin ceros)' : 'Aún no apto'}</div></div>`}
    </div>
    <div class="grid3">${cards.map((c) => html`<${FisicaCard} c=${c} sexo=${sexo} apto=${apto} />`)}</div>
    <p class="muted small">${F.nota}</p>
  </div>`;
}

function FisicaCard({ c, sexo, apto }) {
  const [val, setVal] = useState('');
  const [date, setDate] = useState(today());
  const [err, setErr] = useState('');
  const tipo = L.tipoPrueba(c.p, sexo);
  const fmt = (v) => L.fmtValor(c.p, v, sexo) + (tipo === 'rep' ? ' rep.' : '');
  const add = (e) => {
    e.preventDefault();
    const v = L.parseValor(c.p, val, sexo);
    if (!isFinite(v) || v <= 0) { setErr(tipo === 'mmss' ? 'Escribe el tiempo como 3:15' : 'Escribe un número'); return; }
    update((s) => s.fisicas.push({ id: L.uid(), date, prueba: c.p, value: v }));
    setVal(''); setErr('');
  };
  const ph = tipo === 'mmss' ? 'm:ss (3:20)' : tipo === 'seg' ? 'segundos (9,8)' : 'repeticiones';
  return html`<section class="card">
    <h2>${L.nombrePrueba(c.p, sexo)}</h2>
    <div class="fis-top">
      <div><div class="k-l">Última</div><div class="k-v sm">${c.last ? fmt(c.last.value) : '—'}</div></div>
      <div><div class="k-l">Mejor</div><div class="k-v sm">${c.best ? fmt(c.best.value) : '—'}</div></div>
      ${apto ? html`<div><div class="k-l">Mínimo</div><div class=${'k-v sm ' + (c.ok === false ? 'bad' : c.ok ? 'good' : '')}>${c.min === null ? '—' : fmt(c.min)}</div></div>`
        : html`<div><div class="k-l">Puntos</div><div class=${'k-v sm ' + (c.pts === 0 ? 'bad' : '')}>${c.pts === null ? '—' : String(c.pts).replace('.', ',')}</div></div>`}
    </div>
    ${apto && c.last ? html`<p class=${'apto-tag ' + (c.ok ? 'ok' : 'ko')}>${c.ok ? '✓ Apto con tu última marca' : '✗ No apto con tu última marca'}</p>` : null}
    <${LineChart} points=${c.marks} fmt=${fmt} menorMejor=${L.PRUEBAS[c.p].menorMejor} />
    <form class="inline" onSubmit=${add}>
      <input placeholder=${ph} inputmode=${tipo === 'mmss' ? 'text' : 'decimal'} value=${val} onInput=${(e) => setVal(e.target.value)} />
      <input type="date" value=${date} max=${today()} onInput=${(e) => setDate(e.target.value)} />
      <button class="btn" type="submit"><${Icon} n="plus" s=${16} /> Marca</button>
    </form>
    ${err ? html`<p class="error small">${err}</p>` : null}
    ${c.marks.length ? html`<details><summary class="small muted">Ver todas (${c.marks.length})</summary><ul class="hist">${[...c.marks].reverse().map((m) => html`<li><span>${fmtCorto(m.date)}</span><span>${fmt(m.value)}</span><span class="muted">${apto ? (L.esApto(c.p, sexo, getState().settings.tramoEdad || 0, m.value) ? 'apto' : 'no apto') : L.puntos(c.p, sexo, m.value) + ' pts'}</span>
      <button class="icon-btn sm" aria-label="Borrar marca" onClick=${() => update((s) => { s.fisicas = s.fisicas.filter((x) => x.id !== m.id); })}><${Icon} n="trash" s=${15} /></button></li>`)}</ul></details>` : null}
  </section>`;
}

// ---------- PROGRESO ----------
function BarChart({ data, unit }) {
  const W = 300, H = 100;
  const max = Math.max(1, ...data.map((d) => d.v));
  const bw = W / data.length;
  return html`<div class="barchart">
    <svg class="chart bars" viewBox=${`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label="Gráfico de barras">
      ${data.map((d, i) => { const bh = (d.v / max) * (H - 4); return html`<g>
        ${d.v ? html`<rect x=${i * bw + bw * 0.12} y=${H - bh} width=${bw * 0.76} height=${bh} class=${'bar ' + (d.hl ? 'hl' : '')} />` : null}
        <rect x=${i * bw} y="0" width=${bw} height=${H} class="hit"><title>${d.label}: ${unit(d.v)}</title></rect></g>`; })}
    </svg>
    <div class="ticks"><span>${data[0].label}</span><span>máx. ${unit(max)}</span><span>${data[data.length - 1].label}</span></div>
  </div>`;
}


function LogrosCard({ s }) {
  const hechos = E.logrosConseguidos(s);
  return html`<section class="card"><div class="card-h"><h2>Logros</h2><span class="muted small">${hechos.length} de ${E.getLogros().length}</span></div>
    <div class="logros">${E.getLogros().map((l) => { const ok = hechos.includes(l.id); return html`<div class=${'logro ' + (ok ? 'ok' : '')} title=${l.desc}><span class="l-ico">${ok ? l.icon : '🔒'}</span><b>${l.titulo}</b><span class="muted small">${l.desc}</span></div>`; })}</div>
  </section>`;
}
function CompartirCard({ s }) {
  const [url, setUrl] = useState('');
  const [msg, setMsg] = useState('');
  const generar = () => {
    const c = E.dibujarSemana(document.createElement('canvas'), s, { marca: 'Planificador ' + L.OPO.nombre, web: location.host });
    c.toBlob((b) => { setUrl(URL.createObjectURL(b)); window.__semanaBlob = b; }, 'image/png');
  };
  useEffect(generar, [s]);
  const compartir = async () => {
    const b = window.__semanaBlob; if (!b) return;
    const file = new File([b], 'mi-semana-oposicion.png', { type: 'image/png' });
    if (navigator.canShare?.({ files: [file] })) {
      try { await navigator.share({ files: [file], title: 'Mi semana de oposición', text: `Mi semana preparando ${L.OPO.nombre} 💪 Hecho con ${location.host}` }); } catch {}
    } else { const a = document.createElement('a'); a.href = url; a.download = 'mi-semana-oposicion.png'; a.click(); setMsg('Imagen descargada. Súbela a tus historias de Instagram o TikTok.'); }
  };
  return html`<section class="card share"><div class="card-h"><h2>Comparte tu semana</h2></div>
    <p class="muted small">Una imagen con tu resumen de esta semana, lista para tus historias de Instagram o TikTok.</p>
    <div class="share-row">${url ? html`<img class="share-img" src=${url} alt="Resumen de tu semana de estudio" />` : null}
      <div><button class="btn primary" onClick=${compartir}><${Icon} n="share" s=${16} /> Compartir imagen</button>${msg ? html`<p class="muted small">${msg}</p>` : null}</div></div>
  </section>`;
}

function Progreso() {
  const s = useStore();
  const hoy = today();
  const dias = Array.from({ length: 30 }, (_, i) => addDays(hoy, i - 29));
  const horas = dias.map((d) => ({ label: fmtCorto(d), v: minutosEntre(s, d, d), hl: d === hoy }));
  const v = L.resumenVueltas(s.temas);
  const maxV = Math.max(v.actual, ...v.counts);
  const porVuelta = Array.from({ length: maxV }, (_, i) => v.counts.filter((c) => c >= i + 1).length);
  const regs = Object.values(s.temas).flatMap((t) => t.regs || []);
  const avance14 = regs.filter((r) => r.tipo === 'vuelta' && r.date > addDays(hoy, -14)).length / 14;
  const restantes = L.N_TEMAS - v.hechos;
  const objetivo = L.objetivoVuelta(s.settings, v.actual);
  const diasObj = objetivo ? L.diffDays(hoy, objetivo) + 1 : null;
  const necesario = diasObj > 0 ? restantes / diasObj : null;
  const fin = avance14 > 0 ? addDays(hoy, Math.ceil(restantes / avance14)) : null;
  const clases = { sinempezar: 0, rojo: 0, amarillo: 0, bien: 0, verde: 0 };
  L.TEMAS.forEach((t) => { clases[L.clase(s.temas[t.id])]++; });
  const atrasados = L.pendientes(s.temas, addDays(hoy, -1)).slice(0, 6);
  return html`<div class="page">
    <header class="ph"><div><div class="muted cap">Estadísticas</div><h1>Progreso</h1></div></header>
    <section class="card">
      <h2>Ritmo de la vuelta ${v.actual}${objetivo ? ` · objetivo ${fmtCorto(objetivo)}` : ''}</h2>
      <div class="kpis inner">
        <div class="kpi"><div class="k-l">Tu ritmo (14 días)</div><div class="k-v sm">${avance14.toFixed(2).replace('.', ',')}</div><div class="k-s">vueltas de tema al día</div></div>
        <div class="kpi"><div class="k-l">Necesario</div><div class="k-v sm">${necesario === null ? '—' : necesario.toFixed(2).replace('.', ',')}</div><div class="k-s">${necesario === null ? html`<a href="#/ajustes">pon una fecha objetivo</a>` : `al día para ${restantes} temas que faltan`}</div></div>
        <div class="kpi"><div class="k-l">Terminarías</div><div class="k-v sm">${fin ? fmtCorto(fin) : '—'}</div><div class="k-s">${fin && objetivo ? (fin <= objetivo ? '✓ a tiempo' : '✗ después del objetivo') : 'a este ritmo'}</div></div>
      </div>
    </section>
    <section class="card"><h2>Horas de estudio · últimos 30 días</h2>
      <${BarChart} data=${horas} unit=${fmtMin} />
      <p class="muted small">Total: ${fmtMin(horas.reduce((a, d) => a + d.v, 0))} · media ${fmtMin(horas.reduce((a, d) => a + d.v, 0) / 30)} al día</p></section>
    <div class="grid2">
      <section class="card"><h2>Temas completados por vuelta</h2>
        ${porVuelta.map((n, i) => { const o = L.objetivoVuelta(s.settings, i + 1); return html`<div class="hbar"><span class="small">Vuelta ${i + 1}${o ? html`<br /><span class="muted">obj. ${fmtCorto(o)}</span>` : null}</span><div class="progress"><div style=${{ width: (n / L.N_TEMAS) * 100 + '%' }}></div></div><span class="small">${n}/${L.N_TEMAS}</span></div>`; })}
      </section>
      <section class="card"><h2>Cómo lo llevas (según tú)</h2>
        <div class="dist">
          ${['verde', 'bien', 'amarillo', 'rojo', 'sinempezar'].map((k) => html`<a href="#/temario"><${Semaforo} value=${k} small /><b>${clases[k]}</b></a>`)}
        </div>
      </section>
    </div>
    <${TestsResumen} s=${s} />
    <${LogrosCard} s=${s} />
    <${CompartirCard} s=${s} />
    <section class="card"><h2>Repasos atrasados</h2>
      ${atrasados.length ? html`<ul class="hist">${atrasados.map(({ t, i }) => html`<li><a href=${'#/tema/' + t.id}><b>T${t.id}</b> ${t.titulo}</a><span class="due small">tocaba ${fmtRel(i.proximo)}</span><span></span></li>`)}</ul>` : html`<p class="empty">Ningún repaso atrasado. 👌</p>`}
    </section>
  </div>`;
}

// ---------- CAMBIO DE OPOSICIÓN ----------
// Los datos de cada oposición (temas, plan, tests, físicas…) se guardan aparte y vuelven al cambiar otra vez.
function cambiarOposicion(nueva, e) {
  const st = getState();
  const act = st.settings.oposicion || 'pn';
  if (nueva === act) return;
  if (!confirm(`¿Cambiar a ${OPOSICIONES[nueva].nombre}? Tus datos de ${OPOSICIONES[act].nombre} se quedan guardados y vuelven si cambias otra vez.`)) { if (e) e.target.value = act; return; }
  update((s) => {
    s.archivo = s.archivo || {};
    s.archivo[act] = { temas: s.temas, tasks: s.tasks, goals: s.goals, tests: s.tests, fisicas: s.fisicas, tarjetas: s.tarjetas, objetivosVuelta: s.settings.objetivosVuelta, examDate: s.settings.examDate };
    const r = s.archivo[nueva] || {};
    s.temas = r.temas || {}; s.tasks = r.tasks || []; s.goals = r.goals || []; s.tests = r.tests || []; s.fisicas = r.fisicas || []; s.tarjetas = r.tarjetas || {};
    s.settings.objetivosVuelta = r.objetivosVuelta || []; s.settings.examDate = r.examDate || '';
    delete s.archivo[nueva];
    s.settings.oposicion = nueva;
  });
  L.setOposicion(nueva);
  reiniciarLogrosVistos(getState());
  avisar(`Ahora preparas ${OPOSICIONES[nueva].nombre}`);
}

// ---------- TESTS Y SIMULACROS ----------
const TIPOS_TEST = { simulacro: 'Simulacro', tema: 'Test de tema', diario: 'Test diario', otro: 'Otro' };
const PREG_POR_TIPO = { simulacro: null, tema: 20, diario: 10, otro: '' };
const pctAciertos = (t) => Math.round((t.aciertos / (t.preguntas || 1)) * 100);

function Tests() {
  const s = useStore();
  const ex = L.OPO.examen;
  const tests = [...(s.tests || [])].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  const notas = tests.map((t) => L.notaTest(t));
  const ult5 = notas.slice(0, 5);
  const media = ult5.length ? ult5.reduce((a, b) => a + b, 0) / ult5.length : null;
  const sumP = tests.reduce((a, t) => a + (t.preguntas || 0), 0), sumA = tests.reduce((a, t) => a + t.aciertos, 0);
  const puntos = [...tests].reverse().map((t) => ({ date: t.date, value: L.notaTest(t) }));
  const fmt = (n) => L.fmtNota(n, ex.escala);
  const borrar = (t) => confirm('¿Borrar este test?') && update((st) => { st.tests = st.tests.filter((x) => x.id !== t.id); });
  return html`<div class="page">
    <header class="ph"><div><div class="muted cap">${L.OPO.nombre} · nota de 0 a ${ex.escala}</div><h1>Tests y simulacros</h1></div></header>
    <div class="kpis">
      <div class="kpi"><div class="k-l">Último</div><div class=${'k-v ' + (notas.length && notas[0] < ex.minimo ? 'bad' : '')}>${notas.length ? fmt(notas[0]) : '—'}</div><div class="k-s">${tests[0] ? `${TIPOS_TEST[tests[0].tipo]} · ${fmtCorto(tests[0].date)}` : 'sin tests todavía'}</div></div>
      <div class="kpi"><div class="k-l">Media</div><div class="k-v">${media === null ? '—' : fmt(media)}</div><div class="k-s">${ult5.length > 1 ? `últimos ${ult5.length} tests` : 'de tus tests'}</div></div>
      <div class="kpi"><div class="k-l">Mejor nota</div><div class="k-v">${notas.length ? fmt(Math.max(...notas)) : '—'}</div><div class="k-s">mínimo para aprobar: ${ex.minimo}</div></div>
      <div class="kpi"><div class="k-l">Aciertos</div><div class="k-v">${sumP ? Math.round((sumA / sumP) * 100) : '—'}<small>${sumP ? ' %' : ''}</small></div><div class="k-s">${tests.length} test${tests.length === 1 ? '' : 's'} · ${sumP} preguntas</div></div>
    </div>
    <${TestForm} />
    ${tests.length ? html`<section class="card"><h2>Evolución de tu nota</h2>
      <${LineChart} points=${puntos} fmt=${fmt} w=${900} h=${220} vacio="Apunta al menos dos tests para ver la evolución." />
      <p class="muted small">${ex.texto}</p></section>` : null}
    <${FallosCard} s=${s} />
    ${tests.length ? html`<section class="card"><h2>Historial</h2><ul class="hist2">${tests.map((t) => html`<li>
      <div class="h-top"><span class="h-date">${fmtCorto(t.date)}</span><span class=${'tag ' + (t.tipo === 'simulacro' ? 'simulacro' : 'repaso')}>${TIPOS_TEST[t.tipo] || t.tipo}</span>
        <b class=${L.notaTest(t) < ex.minimo ? 'bad' : ''}>${fmt(L.notaTest(t))}</b>
        <span class="small muted">${t.aciertos} ✓ · ${t.fallos} ✗ · ${t.preguntas - t.aciertos - t.fallos} en blanco · ${pctAciertos(t)} %</span>
        <button class="icon-btn sm push" aria-label="Borrar test" onClick=${() => borrar(t)}><${Icon} n="trash" s=${15} /></button></div>
      ${t.nombre || t.temaId ? html`<div class="h-note">${t.nombre || ''}${t.temaId ? `${t.nombre ? ' · ' : ''}Tema ${t.temaId} · ${temaDe(t.temaId)?.titulo || ''}` : ''}</div>` : null}</li>`)}</ul></section>` : null}
    ${(CONFIG.practicaWeb?.[L.OPO.id] || []).length ? html`<section class="card"><h2>Practica gratis en ${CONFIG.tienda || 'la web'}</h2>
      <p class="muted small">Haz un test, vuelve aquí y apunta tu resultado.</p>
      <div class="btns">${CONFIG.practicaWeb[L.OPO.id].map(([t, u]) => html`<a class="btn sm" href=${utm(u, 'tests')} target="_blank" rel="noopener">${t} →</a>`)}</div></section>` : null}
  </div>`;
}

function TestForm() {
  const ex = L.OPO.examen;
  const [tipo, setTipo] = useState('simulacro');
  const [nombre, setNombre] = useState('');
  const [date, setDate] = useState(today());
  const [preg, setPreg] = useState(String(ex.preguntas));
  const [aci, setAci] = useState('');
  const [fal, setFal] = useState('');
  const [alt, setAlt] = useState(ex.alternativas);
  const [temaId, setTemaId] = useState('');
  const [ft, setFt] = useState({});
  const [verTemas, setVerTemas] = useState(false);
  const P = parseInt(preg, 10) || 0, A = parseInt(aci, 10) || 0, F = parseInt(fal, 10) || 0;
  const blancos = P - A - F;
  const valido = P > 0 && A >= 0 && F >= 0 && A + F > 0 && blancos >= 0;
  const borrador = { preguntas: P, aciertos: A, fallos: F, alternativas: alt, escala: ex.escala };
  const cambiarTipo = (k) => { setTipo(k); const d = k === 'simulacro' ? ex.preguntas : PREG_POR_TIPO[k]; setPreg(d === '' ? '' : String(d)); };
  const sumarFallo = (id) => setFt((x) => ({ ...x, [id]: (x[id] || 0) + 1 }));
  const totalFt = Object.values(ft).reduce((a, b) => a + b, 0);
  const guardar = (e) => {
    e.preventDefault();
    if (!valido) return;
    const t = { id: L.uid(), date, tipo, nombre: nombre.trim(), preguntas: P, aciertos: A, fallos: F, alternativas: alt, escala: ex.escala };
    if (tipo === 'tema' && temaId) t.temaId = +temaId;
    if (totalFt) t.fallosTemas = ft;
    update((s) => { (s.tests = s.tests || []).push(t); });
    avisar(`📝 Test guardado: ${L.fmtNota(L.notaTest(t), ex.escala)} sobre ${ex.escala}`);
    setNombre(''); setAci(''); setFal(''); setFt({}); setVerTemas(false); setTemaId('');
  };
  return html`<section class="card"><h2>Apuntar un test</h2>
    <form onSubmit=${guardar}>
      <div class="quick">${Object.entries(TIPOS_TEST).map(([k, l]) => html`<button type="button" class=${'chip ' + (tipo === k ? 'on' : '')} onClick=${() => cambiarTipo(k)}>${l}</button>`)}</div>
      <div class="row4">
        <div><label class="lbl">Preguntas</label><input type="number" inputmode="numeric" min="1" value=${preg} onInput=${(e) => setPreg(e.target.value)} /></div>
        <div><label class="lbl">Aciertos</label><input type="number" inputmode="numeric" min="0" placeholder="0" value=${aci} onInput=${(e) => setAci(e.target.value)} /></div>
        <div><label class="lbl">Fallos</label><input type="number" inputmode="numeric" min="0" placeholder="0" value=${fal} onInput=${(e) => setFal(e.target.value)} /></div>
        <div><label class="lbl">En blanco</label><input type="number" disabled value=${P ? Math.max(0, blancos) : ''} /></div>
      </div>
      <div class="row2">
        <div><label class="lbl">Nombre (opcional)</label><input placeholder="p. ej. Simulacro academia 3" value=${nombre} onInput=${(e) => setNombre(e.target.value)} /></div>
        <div><label class="lbl">Fecha</label><input type="date" value=${date} max=${today()} onInput=${(e) => setDate(e.target.value)} /></div>
      </div>
      ${tipo === 'tema' ? html`<label class="lbl">Tema</label><select value=${temaId} onChange=${(e) => setTemaId(e.target.value)}><option value="">Elige el tema…</option>${L.TEMAS.map((t) => html`<option value=${t.id}>Tema ${t.id} · ${t.titulo}</option>`)}</select>` : null}
      <details class="mt" open=${verTemas} onToggle=${(e) => setVerTemas(e.target.open)}><summary class="small">¿En qué temas has fallado? <span class="muted">(opcional: así sabrás qué repasar)</span></summary>
        <p class="muted small">Toca el número del tema una vez por cada fallo.${totalFt ? html` <button type="button" class="link" onClick=${() => setFt({})}>Empezar de nuevo</button>` : null}</p>
        <div class="wiz-temas">${L.TEMAS.map((t) => html`<button type="button" title=${t.titulo} class=${'tnum-btn ' + (ft[t.id] ? 'on' : '')} onClick=${() => sumarFallo(t.id)}>${t.id}${ft[t.id] ? html`<sup>${ft[t.id]}</sup>` : null}</button>`)}</div>
        ${totalFt ? html`<p class="small">${totalFt} fallo${totalFt === 1 ? '' : 's'} repartido${totalFt === 1 ? '' : 's'} por temas${F && totalFt !== F ? html` <span class="muted">(has puesto ${F} fallos en total)</span>` : ''}</p>` : null}
      </details>
      <div class="test-res">
        ${valido ? html`<span>Nota: <b class=${L.notaTest(borrador) < ex.minimo ? 'bad' : ''}>${L.fmtNota(L.notaTest(borrador), ex.escala)}</b> sobre ${ex.escala} · ${Math.round((A / P) * 100)} % de aciertos</span>`
          : html`<span class="muted small">${P && blancos < 0 ? 'Aciertos y fallos suman más que las preguntas.' : 'Escribe aciertos y fallos para ver tu nota.'}</span>`}
        <label class="small muted alt">Opciones por pregunta <select value=${alt} onChange=${(e) => setAlt(+e.target.value)}>${[3, 4].map((n) => html`<option value=${n}>${n} (un fallo resta ${n === 3 ? '1/2' : '1/3'})</option>`)}</select></label>
        <button class="btn primary" type="submit" disabled=${!valido}><${Icon} n="plus" s=${16} /> Guardar test</button>
      </div>
    </form>
  </section>`;
}

function FallosCard({ s }) {
  const f = L.fallosPorTema(s.tests, 60);
  const lista = Object.entries(f).map(([id, n]) => ({ t: temaDe(+id), n })).filter((x) => x.t && x.n > 0).sort((a, b) => b.n - a.n).slice(0, 8);
  const hoy = today();
  const programar = (id) => {
    const man = addDays(hoy, 1);
    update((st) => { const x = (st.temas[id] = st.temas[id] || { semaforo: null, regs: [], proximo: null }); if (!x.proximo || x.proximo > man) x.proximo = man; });
    avisar(`🔁 Tema ${id}: repaso programado para mañana`);
  };
  if (!(s.tests || []).length) return null;
  return html`<section class="card"><h2>Temas en los que más fallas</h2>
    ${lista.length ? html`<p class="muted small">Fallos en tus tests de los últimos 60 días.</p><ul class="mini fallos">${lista.map(({ t, n }) => html`<li>
      <button class="link" onClick=${() => go('#/tema/' + t.id)}><b>T${t.id}</b> ${t.titulo}</button>
      <span class="badge-n">${n} fallo${n === 1 ? '' : 's'}</span>
      <span class="btns-r">${tarjetasTema(t.id).length ? html`<button class="btn sm" onClick=${() => abrirPractica(t.id)}><${Icon} n="bolt" s=${14} /> Practicar</button>` : null}
        <button class="btn sm" onClick=${() => programar(t.id)}>Repasar mañana</button></span></li>`)}</ul>`
    : html`<p class="muted small">Cuando apuntes un test, marca en qué temas has fallado o elige "Test de tema": aquí verás tus puntos débiles para repasarlos.</p>`}
  </section>`;
}

function TestsResumen({ s }) {
  const tests = [...(s.tests || [])].sort((a, b) => (a.date < b.date ? 1 : -1));
  const ex = L.OPO.examen;
  if (!tests.length) return html`<section class="card"><div class="card-h"><h2>Tests y simulacros</h2><a class="btn sm" href="#/tests">Apuntar un test</a></div>
    <p class="muted small">Apunta los tests y simulacros que hagas: verás tu nota con la fórmula del examen y en qué temas fallas más.</p></section>`;
  const ult = tests.slice(0, 5).map((t) => L.notaTest(t));
  return html`<section class="card"><div class="card-h"><h2>Tests y simulacros</h2><a class="btn sm ghost" href="#/tests">Ver todo</a></div>
    <p>Último: <b>${L.fmtNota(ult[0], ex.escala)}</b> · media de los últimos ${ult.length}: <b>${L.fmtNota(ult.reduce((a, b) => a + b, 0) / ult.length, ex.escala)}</b> <span class="muted small">(sobre ${ex.escala}, mínimo ${ex.minimo})</span></p></section>`;
}

// ---------- REPASO RÁPIDO (preguntas y trampas de cada tema) ----------
let abrirPractica = () => {};
// Texto con **negritas** del contenido.
const Rich = ({ t }) => html`${String(t).split(/\*\*(.+?)\*\*/g).map((x, i) => (i % 2 ? html`<b>${x}</b>` : x))}`;
function tarjetasTema(temaId, opo = L.OPO.id) {
  const c = CONTENIDO[opo]?.[temaId];
  if (!c) return [];
  const out = [];
  (c.preguntas || []).forEach((p, i) => out.push({ id: `${opo}:${temaId}:p${i}`, tipo: p.opts ? 'test' : 'abierta', ...p }));
  (c.trampas || []).forEach((t, i) => out.push({ id: `${opo}:${temaId}:t${i}`, tipo: 'trampa', texto: t }));
  return out;
}
const bloqueadas = () => !!CONFIG.practica?.soloConMapas && !tieneMapasOpo();
function tarjetasDisponibles(temaId) {
  const todas = tarjetasTema(temaId);
  return bloqueadas() ? todas.slice(0, CONFIG.practica.gratisPorTema || 3) : todas;
}
const ratingDe = (pct) => (pct >= 90 ? 4 : pct >= 70 ? 3 : pct >= 50 ? 2 : 1);
const PROX_POR_RATING = { 1: 3, 2: 7, 3: 14, 4: 30 };

function RepasoRapido({ t, s }) {
  const c = CONTENIDO[L.OPO.id]?.[t.id];
  const todas = tarjetasTema(t.id), disp = tarjetasDisponibles(t.id);
  const ult = [...(s.temas[t.id]?.regs || [])].reverse().find((r) => r.tipo === 'practica');
  const fallos = L.fallosPorTema(s.tests, 60)[t.id] || 0;
  if (!c) return html`<section class="card rr"><h2><${Icon} n="bolt" s=${18} /> Repaso rápido</h2>
    <p class="muted small">Todavía no hay preguntas de este tema en la app.${fallos ? ` En tus tests de los últimos 60 días has fallado ${fallos} pregunta${fallos === 1 ? '' : 's'} de este tema.` : ''}</p></section>`;
  const nP = (c.preguntas || []).length, nT = (c.trampas || []).length;
  return html`<section class="card rr">
    <div class="card-h"><h2><${Icon} n="bolt" s=${18} /> Repaso rápido</h2>
      <button class="btn primary sm" onClick=${() => abrirPractica(t.id)}>Practicar ${Math.min(disp.length, CONFIG.practica?.porSesion || 10)} tarjetas</button></div>
    <p class="muted small">${nP ? `${nP} pregunta${nP === 1 ? '' : 's'} tipo test` : ''}${nP && nT ? ' · ' : ''}${nT ? `${nT} trampa${nT === 1 ? '' : 's'} de examen` : ''} de ${CONFIG.tienda || 'OpoMapas'}.
      ${ult ? ` Último repaso rápido: ${ult.note?.replace('Repaso rápido: ', '') || ''} (${fmtRel(ult.date)}).` : ''}
      ${fallos ? ` En tus tests has fallado ${fallos} pregunta${fallos === 1 ? '' : 's'} de este tema.` : ''}</p>
    ${bloqueadas() && todas.length > disp.length ? html`<div class="note small">🔒 Con los mapas de ${L.OPO.nombre} desbloqueas las ${todas.length} tarjetas de este tema.</div>` : null}
    ${nT ? html`<details><summary class="small"><b>⚠️ Trampas de examen</b> (${nT})</summary><ul class="rr-list">${c.trampas.map((x) => html`<li><${Rich} t=${x} /></li>`)}</ul></details>` : null}
    ${(c.ideas || []).length ? html`<details><summary class="small"><b>💡 Ideas clave</b> (${c.ideas.length})</summary><ul class="rr-list">${c.ideas.map((x) => html`<li><${Rich} t=${x} /></li>`)}</ul></details>` : null}
  </section>`;
}

function PracticaModal({ temaId, onClose }) {
  const t = temaDe(temaId);
  const [mazo] = useState(() => {
    const st = getState().tarjetas || {};
    const peso = (c) => { const x = st[c.id]; return !x ? 0 : x.ko > x.ok ? 1 : 2; };
    return tarjetasDisponibles(temaId).map((c) => ({ c, k: peso(c) + Math.random() * 0.9 })).sort((a, b) => a.k - b.k).map((x) => x.c).slice(0, CONFIG.practica?.porSesion || 10);
  });
  const [i, setI] = useState(0);
  const [elegida, setElegida] = useState(null);
  const [ver, setVer] = useState(false);
  const [res, setRes] = useState([]);
  const fin = i >= mazo.length;
  const aciertos = res.filter((r) => r.ok).length;
  const pct = mazo.length ? Math.round((aciertos / mazo.length) * 100) : 0;
  const rating = ratingDe(pct);
  const [prox, setProx] = useState('');
  const responder = (ok) => { setRes((r) => [...r, { id: mazo[i].id, ok }]); setI(i + 1); setElegida(null); setVer(false); };
  const guardar = () => {
    const hoy = today();
    const p = prox || addDays(hoy, PROX_POR_RATING[rating]);
    update((s) => {
      s.tarjetas = s.tarjetas || {};
      res.forEach((r) => { const x = (s.tarjetas[r.id] = s.tarjetas[r.id] || { ok: 0, ko: 0 }); r.ok ? x.ok++ : x.ko++; x.last = hoy; });
      const tm = (s.temas[temaId] = s.temas[temaId] || { semaforo: null, regs: [], proximo: null });
      tm.regs.push({ id: L.uid(), date: hoy, tipo: 'practica', rating, note: `Repaso rápido: ${aciertos}/${mazo.length}` });
      tm.proximo = p;
    });
    if (pct >= 90) E.confeti();
    avisar(`⚡ Repaso rápido del tema ${temaId}: ${aciertos}/${mazo.length}. Próximo repaso ${fmtRel(p)}.`);
    onClose();
  };
  const salir = () => { if (!res.length || confirm('¿Salir sin guardar este repaso?')) onClose(); };
  const c = mazo[i];
  return html`<div class="modal-bg" onClick=${(e) => e.target === e.currentTarget && salir()}>
    <div class="modal practica" role="dialog" aria-label="Repaso rápido">
      <div class="modal-h"><div><div class="muted small">Repaso rápido · Tema ${t.id}</div><h3>${t.titulo}</h3></div>
        <button class="icon-btn" onClick=${salir} aria-label="Cerrar"><${Icon} n="x" /></button></div>
      ${!mazo.length ? html`<p class="muted">No hay tarjetas para este tema.</p>` : null}
      ${mazo.length && !fin ? html`<div class="progress thin"><div style=${{ width: (i / mazo.length) * 100 + '%' }}></div></div>
        <p class="muted small">Tarjeta ${i + 1} de ${mazo.length} · ${aciertos} acierto${aciertos === 1 ? '' : 's'}</p>
        ${c.tipo === 'trampa' ? html`<div class="pq trampa"><div class="k-l">⚠️ Ojo con la trampa</div><p><${Rich} t=${c.texto} /></p></div>
            <p class="muted small">¿Lo tenías claro?</p>
            <div class="modal-f"><button class="btn" onClick=${() => responder(false)}>✗ No lo sabía</button><button class="btn primary" onClick=${() => responder(true)}>✓ Lo sabía</button></div>`
        : c.tipo === 'test' ? html`<div class="pq"><p class="pq-q"><${Rich} t=${c.q} /></p>
            <div class="pq-opts">${c.opts.map((o, k) => html`<button class=${'pq-opt ' + (elegida === null ? '' : k === c.ok ? 'ok' : k === elegida ? 'ko' : 'off')} disabled=${elegida !== null} onClick=${() => setElegida(k)}><i>${'abcd'[k]}</i><span><${Rich} t=${o} /></span></button>`)}</div>
            ${elegida !== null ? html`<p class=${'pq-sol ' + (elegida === c.ok ? 'ok' : 'ko')}>${elegida === c.ok ? '✓ ¡Correcto!' : `✗ Era la ${'abcd'[c.ok]})`}${c.src ? html` · <${Rich} t=${c.src} />` : null}</p>` : null}</div>
            <div class="modal-f">${elegida !== null ? html`<button class="btn primary" onClick=${() => responder(elegida === c.ok)}>Siguiente →</button>` : html`<span class="muted small">Elige una respuesta</span>`}</div>`
        : html`<div class="pq"><p class="pq-q"><${Rich} t=${c.q} /></p>
            ${ver ? html`<p class="pq-sol ok">→ <${Rich} t=${c.a} /></p>` : null}</div>
            <div class="modal-f">${ver ? html`<button class="btn" onClick=${() => responder(false)}>✗ No la sabía</button><button class="btn primary" onClick=${() => responder(true)}>✓ La sabía</button>`
              : html`<span class="muted small">Piensa la respuesta…</span><button class="btn primary" onClick=${() => setVer(true)}>Ver respuesta</button>`}</div>`}` : null}
      ${mazo.length && fin ? html`<div class="pq-fin">
        <div class="wiz-emoji">${L.RATINGS[rating - 1].emoji}</div>
        <h2>${aciertos} de ${mazo.length} (${pct} %)</h2>
        <p class="muted small">${pct >= 90 ? '¡Lo dominas!' : pct >= 70 ? 'Bien, repasa los fallos.' : pct >= 50 ? 'Regular: conviene volver pronto.' : 'Toca repasar este tema.'} Se guarda como repaso y cuenta para tu estimación del tema.</p>
        <label class="lbl">¿Cuándo vuelves a repasarlo?</label>
        <div class="quick">${PROX_CHIPS.map(([n, l]) => { const d = addDays(today(), n); const on = prox ? prox === d : n === PROX_POR_RATING[rating]; return html`<button type="button" class=${'chip ' + (on ? 'on' : '')} onClick=${() => setProx(d)}>${l}</button>`; })}</div>
        <div class="modal-f"><button class="btn ghost" onClick=${onClose}>Descartar</button><button class="btn primary" onClick=${guardar}>Guardar repaso</button></div>
      </div>` : null}
    </div></div>`;
}

// ---------- AJUSTES ----------
function Ajustes() {
  const s = useStore();
  const st = s.settings;
  const set = (k, v) => update((x) => { x.settings[k] = v; });
  const objs = st.objetivosVuelta || [];
  const setObj = (i, d) => update((x) => { const a = [...(x.settings.objetivosVuelta || [])]; a[i] = d; x.settings.objetivosVuelta = a; });
  const quitarObj = (i) => update((x) => { x.settings.objetivosVuelta = (x.settings.objetivosVuelta || []).filter((_, k) => k !== i); });
  const exportar = () => {
    const blob = new Blob([JSON.stringify(s, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `oposicion-pn-${today()}.json`; a.click();
  };
  const importar = (e) => {
    const f = e.target.files[0]; if (!f) return;
    f.text().then((t) => { try { const d = JSON.parse(t); if (!d.settings || !d.temas) throw 0; if (confirm('Esto reemplazará todos tus datos actuales. ¿Continuar?')) replaceAll(d); } catch { alert('El archivo no es una copia válida.'); } });
    e.target.value = '';
  };
  return html`<div class="page">
    <header class="ph"><div><div class="muted cap">Configuración</div><h1>Ajustes</h1></div></header>
    <${CuentaCard} />
    <section class="card"><h2>Oposición</h2>
      <div class="form">
        <label>Oposición que preparas<select value=${st.oposicion || 'pn'} onChange=${(e) => cambiarOposicion(e.target.value, e)}>${LISTA_OPOSICIONES.map((o) => html`<option value=${o.id}>${o.nombre} · ${o.escala}</option>`)}</select></label>
        <label>Fecha del examen<input type="date" value=${st.examDate} onInput=${(e) => set('examDate', e.target.value)} /></label>
        <label>Baremo de pruebas físicas<select value=${st.sexo} onChange=${(e) => set('sexo', e.target.value)}><option value="H">Hombres</option><option value="M">Mujeres</option></select></label>
        ${L.OPO.fisicas.tramos ? html`<label>Edad (marcas mínimas)<select value=${st.tramoEdad || 0} onChange=${(e) => set('tramoEdad', +e.target.value)}>${L.OPO.fisicas.tramos.map((t, i) => html`<option value=${i}>${t}</option>`)}</select></label>` : null}
        <label>Objetivo de horas por semana<input type="number" min="0" value=${st.horasObjetivoSemana} onInput=${(e) => set('horasObjetivoSemana', +e.target.value || 0)} /></label>
      </div></section>
    <section class="card"><h2>Objetivos de vueltas</h2>
      <p class="muted small">¿Cuándo quieres terminar cada vuelta entera? Autoplanificar reparte los temas que faltan hasta esa fecha.</p>
      <div class="objs">${[...objs, ''].slice(0, objs.length + 1).map((d, i) => html`<div class="objrow">
        <span class="small"><b>Vuelta ${i + 1}</b></span>
        <input type="date" value=${d || ''} min=${i ? objs[i - 1] || '' : ''} onInput=${(e) => setObj(i, e.target.value)} aria-label=${'Fecha objetivo vuelta ' + (i + 1)} />
        ${i < objs.length ? html`<button class="icon-btn sm" aria-label="Quitar" onClick=${() => quitarObj(i)}><${Icon} n="trash" s=${15} /></button>` : html`<span class="muted small">${i ? 'añadir siguiente' : ''}</span>`}
      </div>`)}</div>
      ${st.examDate ? html`<p class="muted small">Examen: ${fmtCorto(st.examDate)}</p>` : null}
    </section>
    <section class="card"><h2>Autoplanificación</h2>
      <div class="form">
        <label>Máximo de repasos por día<input type="number" min="0" max="10" value=${st.maxRepasosDia} onInput=${(e) => set('maxRepasosDia', Math.max(0, +e.target.value || 0))} /></label>
        <label>Temas por día si no hay fecha objetivo<input type="number" min="0" max="5" value=${st.nuevosPorDia} onInput=${(e) => set('nuevosPorDia', Math.max(0, +e.target.value || 0))} /></label>
      </div>
      <label class="toggle"><input type="checkbox" checked=${!!st.repasosEnPrimeraVuelta} onChange=${(e) => set('repasosEnPrimeraVuelta', e.target.checked)} />
        <span>Incluir repasos en el plan durante la 1ª vuelta<br /><span class="muted small">Desactivado: el plan solo mete temas sin dar hasta acabar la 1ª vuelta; los repasos, después.</span></span></label>
      <label class="lbl">Días de estudio</label>
      <div class="days">${L.DIAS_CORTO.map((d, i) => html`<button class=${'chip ' + (st.diasEstudio.includes(i) ? 'on' : '')} onClick=${() => set('diasEstudio', st.diasEstudio.includes(i) ? st.diasEstudio.filter((x) => x !== i) : [...st.diasEstudio, i].sort())}>${d}</button>`)}</div>
    </section>
    <section class="card"><h2>Apariencia</h2>
      <div class="seg">${[['auto', 'Automático'], ['light', 'Claro'], ['dark', 'Oscuro']].map(([k, l]) => html`<button class=${st.theme === k ? 'on' : ''} onClick=${() => set('theme', k)}>${l}</button>`)}</div></section>
    <section class="card"><h2>Copia de seguridad</h2>
      <p class="muted small">Descarga todos tus datos en un archivo. Guárdalo de vez en cuando por si acaso.</p>
      <div class="btns"><button class="btn" onClick=${exportar}>Descargar copia</button>
        <label class="btn">Restaurar copia<input type="file" accept="application/json" hidden onChange=${importar} /></label>
        <button class="btn danger" onClick=${() => confirm('¿Borrar TODOS los datos? No se puede deshacer.') && confirm('¿Seguro del todo?') && replaceAll(defaultState())}>Borrar todo</button></div>
    </section>
  </div>`;
}

// ---------- CUENTA, PRUEBA Y PAGO ----------
const DIA_MS = 86400000;
function restante(ms) {
  if (ms <= 0) return 'nada';
  const d = Math.floor(ms / DIA_MS), h = Math.floor((ms % DIA_MS) / 3600000);
  if (d >= 1) return `${d} día${d > 1 ? 's' : ''}${h ? ` y ${h} h` : ''}`;
  const m = Math.floor((ms % 3600000) / 60000);
  return h ? `${h} h ${m} min` : `${m} min`;
}
const fechaHora = (ms) => new Date(ms).toLocaleString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

function BotonPago({ cls = 'btn primary', texto, medio = 'pago' }) {
  const url = urlPago(medio);
  if (!url) return html`<p class="note warn small">El enlace de pago aún no está configurado. ${CONFIG.emailSoporte ? html`Escribe a <a href=${'mailto:' + CONFIG.emailSoporte}>${CONFIG.emailSoporte}</a>.` : ''}</p>`;
  return html`<a class=${cls} href=${url} target="_blank" rel="noopener">${texto || `Comprar acceso de por vida · ${CONFIG.precio}`}</a>${CONFIG.tienda ? html`<span class="muted small">Pago seguro en la tienda ${CONFIG.tienda}</span>` : null}`;
}

// Precio con oferta (precio anterior tachado) si está configurada.
function Precio() {
  return html`${CONFIG.oferta ? html`<span class="oferta">${CONFIG.oferta}</span>` : null}
    <div class="p-num">${CONFIG.precioAntes ? html`<s class="p-antes">${CONFIG.precioAntes}</s> ` : null}${CONFIG.precio}</div>`;
}

function TrialBanner() {
  useStore();
  if (acceso.estado !== 'prueba') return null;
  const ms = acceso.finPrueba - Date.now();
  const c = E.cifras(getState());
  if (ms < 1.5 * DIA_MS && c.actividad) return html`<div class="trial urge"><span>⏳ <b>Te queda ${restante(ms)} de prueba.</b> Llevas ${fmtMin(c.min)} de estudio y ${c.temas} tema${c.temas === 1 ? '' : 's'} trabajado${c.temas === 1 ? '' : 's'}${c.planHasta ? `, con plan hasta el ${fmtCorto(c.planHasta)}` : ''}. No lo pierdas:</span>
    <a class="link" href="#/cuenta">acceso de por vida por ${CONFIG.precio} →</a></div>`;
  return html`<div class="trial"><span><b>Prueba gratuita:</b> te quedan ${restante(ms)}.</span>
    <a class="link" href="#/cuenta">Conseguir acceso de por vida (${CONFIG.precio}) →</a></div>`;
}

function Splash() {
  useStore();
  if (cloud.user && cloud.error) return html`<div class="splash"><img src="icon.svg" alt="" width="56" height="56" />
    <p><b>No se pudo comprobar tu cuenta.</b></p><p class="muted small">${cloud.error}</p>
    <div class="btns"><button class="btn primary" onClick=${reComprobar}>Reintentar</button><button class="btn ghost" onClick=${logout}>Cerrar sesión</button></div></div>`;
  return html`<div class="splash"><img src="icon.svg" alt="" width="56" height="56" /><p class="muted">Cargando…</p></div>`;
}

function GoogleBtn({ texto = 'Empezar prueba gratis con Google', big }) {
  return html`<button class=${'btn primary ' + (big ? 'big' : '')} onClick=${login}>
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>
    ${texto}</button>`;
}

const FEATURES = [
  ['temario', 'Todo el temario, ordenado', 'Los 45 temas de Policía Nacional o los 22 de Guardia Civil. Clasifica cada tema: No lo sé, Flojo, Bien o Dominado.'],
  ['check', 'Vueltas bajo control', 'Contador de vueltas por tema y fecha objetivo para cerrar cada vuelta. Tú decides cuándo vuelves a cada tema.'],
  ['clock', 'Por dónde te quedaste', 'Registra cada sesión con minutos y una nota. Al volver, sabes exactamente dónde retomar.'],
  ['plan', 'Plan automático', 'Reparte los temas que faltan hasta tu fecha objetivo, día a día, y añade tus clases y simulacros.'],
  ['tests', 'Tests y simulacros', 'Apunta cada test: tu nota con la fórmula del examen, su evolución y los temas en los que más fallas.'],
  ['bolt', 'Repaso rápido', 'Preguntas tipo test y trampas de examen de cada tema, de OpoMapas, para repasar en 5 minutos.'],
  ['fisicas', 'Pruebas físicas', 'Policía Nacional: nota orientativa de cada prueba. Guardia Civil: apto o no apto según tu edad.'],
  ['cloud', 'PC y móvil', 'Sincronizado en todos tus dispositivos, instalable como app y funciona sin conexión.'],
];
const FAQ = [
  ['¿Necesito tarjeta para la prueba?', `No. Entras con tu cuenta de Google y tienes ${CONFIG.diasPrueba} días con todo desbloqueado.`],
  ['¿Qué pasa cuando acaba la prueba?', `Si te convence, haces un único pago de ${CONFIG.precio} y sigues donde lo dejaste: tus datos se conservan.`],
  ['¿De por vida significa sin suscripción?', 'Sí: pagas una vez y tienes acceso mientras el servicio exista, con todas las mejoras que se vayan añadiendo.'],
  ['¿Sirve para Guardia Civil?', 'Sí. Al empezar eliges Policía Nacional (Escala Básica) o Guardia Civil (Escala de Cabos y Guardias) y la app se adapta: temario, pruebas físicas y nota de los tests. Puedes cambiar cuando quieras.'],
  ['¿Incluye temario o test?', 'No incluye el temario: organiza tu estudio con tus apuntes o los de tu academia. Sí trae un repaso rápido con preguntas tipo test y trampas de examen de cada tema (de OpoMapas, de elaboración propia) y te deja apuntar tus tests y simulacros.'],
  ['¿Es una herramienta oficial?', 'No. Es una herramienta independiente, sin relación con la Policía Nacional, la Guardia Civil ni el Ministerio del Interior.'],
];

function Landing() {
  return html`<div class="landing">
    <header class="l-top"><div class="brand"><img src="icon.svg" alt="" width="30" height="30" /><div><b>${CONFIG.nombre}</b><span class="muted small">${CONFIG.subtitulo}</span></div></div>
      <button class="btn ghost" onClick=${login}>Entrar</button></header>
    <section class="hero">
      <div class="hero-txt">
        <span class="pill">Prueba gratis ${CONFIG.diasPrueba} días · sin tarjeta</span>${CONFIG.oferta ? html` <span class="pill oferta-pill">${CONFIG.oferta}: ${CONFIG.precio}</span>` : null}
        <h1>${CONFIG.eslogan}</h1>
        <p class="lead">Vueltas, repasos, tests, horas de estudio, plan semanal y pruebas físicas en un solo sitio. Para la Escala Básica de Policía Nacional y la Escala de Cabos y Guardias de Guardia Civil.</p>
        <div class="cta"><${GoogleBtn} big /></div>
        <p class="muted small">Después, pago único de <b>${CONFIG.precio}</b>${CONFIG.precioAntes ? html` <s>${CONFIG.precioAntes}</s>` : null} para siempre. Sin suscripciones.</p>
        ${cloud.error ? html`<p class="error small">${cloud.error}</p>` : null}
      </div>
      <div class="hero-img"><img src="captura.png" alt="Pantalla principal de la aplicación con el plan del día" width="1200" height="820" /></div>
    </section>
    <section class="feats">${FEATURES.map(([ic, t, d]) => html`<div class="feat"><span class="f-ico"><${Icon} n=${ic} /></span><h3>${t}</h3><p>${d}</p></div>`)}</section>
    ${CONFIG.mapas ? html`<section class="gratis-wrap"><div class="gratis">
      <span class="g-ico">🎁</span><div><b>¿Aún no te decides?</b> Descarga 12 mapas gratis del temario en PDF.</div>
      <div class="btns"><a class="btn" href=${utm(CONFIG.mapas.gratis, 'portada')} target="_blank" rel="noopener">Policía Nacional</a>${CONFIG.mapasGC ? html`<a class="btn" href=${utm(CONFIG.mapasGC.gratis, 'portada')} target="_blank" rel="noopener">Guardia Civil</a>` : null}</div></div></section>` : null}
    <section class="price-wrap"><div class="price">
      <div class="k-l">Acceso de por vida</div>
      <${Precio} /><div class="muted">pago único</div>
      <ul>${['Todas las funciones, sin límites', 'Sincronización entre PC y móvil', 'Todas las actualizaciones futuras', `${CONFIG.diasPrueba} días de prueba gratis antes de pagar`].map((x) => html`<li><${Icon} n="check" s=${16} /> ${x}</li>`)}</ul>
      <${GoogleBtn} texto="Probar gratis" />
    </div></section>
    <section class="faq"><h2>Preguntas frecuentes</h2>${FAQ.map(([q, a]) => html`<details><summary>${q}</summary><p>${a}</p></details>`)}</section>
    <${Footer} />
  </div>`;
}

function Footer() {
  return html`<footer class="l-foot">
    <div><a href="#/legal/aviso">Aviso legal</a> · <a href="#/legal/privacidad">Privacidad</a> · <a href="#/legal/terminos">Términos y condiciones</a>${CONFIG.emailSoporte ? html` · <a href=${'mailto:' + CONFIG.emailSoporte}>Contacto</a>` : null}${CONFIG.urlTienda ? html` · <a href=${utm(CONFIG.urlTienda, 'pie')} target="_blank" rel="noopener">Tienda ${CONFIG.tienda || ''}</a>` : null}</div>
    <p class="muted small">${CONFIG.nombre} es una herramienta independiente y no está vinculada a la Policía Nacional, a la Guardia Civil ni al Ministerio del Interior.</p>
  </footer>`;
}

function Paywall() {
  useStore();
  const [msg, setMsg] = useState('');
  const comprobar = async () => { setMsg('Comprobando…'); await reComprobar(); setMsg(acceso.estado === 'caducada' ? 'Todavía no consta el pago. Si acabas de pagar, la activación puede tardar un poco.' : ''); };
  return html`<div class="landing pay">
    <header class="l-top"><div class="brand"><img src="icon.svg" alt="" width="30" height="30" /><div><b>${CONFIG.nombre}</b></div></div>
      <button class="btn ghost" onClick=${logout}>Cerrar sesión</button></header>
    <section class="price-wrap"><div class="price">
      <h1>Tu prueba gratuita ha terminado</h1>
      ${(() => { const c = E.cifras(getState()); return c.actividad ? html`<div class="cifras">
        <div class="k-l">Tu prueba en cifras</div>
        <div class="cifras-g"><div><b>${E.fmtNum(c.min / 60)} h</b><span>de estudio</span></div><div><b>${c.temas}</b><span>${c.temas === 1 ? 'tema trabajado' : 'temas trabajados'}</span></div><div><b>${c.vueltas + c.repasos}</b><span>vueltas y repasos</span></div><div><b>${c.dias}</b><span>${c.dias === 1 ? 'día estudiando' : 'días estudiando'}</span></div></div>
        ${c.tareasFuturas ? html`<p class="small">📅 Tienes <b>${c.tareasFuturas} tareas</b> planificadas${c.planHasta ? ` hasta el ${fmtCorto(c.planHasta)}` : ''}. Todo sigue guardado.</p>` : null}
      </div>
      <p class="muted">No pierdas tu progreso: sigue exactamente donde lo dejaste.</p>` : html`<p class="muted">Tus datos están guardados. Consigue el acceso de por vida para seguir donde lo dejaste.</p>`; })()}
      <${Precio} /><div class="muted">pago único · sin suscripción</div>
      <${BotonPago} cls="btn primary big" />
      <${OfertaPack} medio="pago-pack" />
      <ol class="steps">
        <li>Completa la compra${CONFIG.tienda ? ` en ${CONFIG.tienda}` : ''}. Tu cuenta <b>${cloud.user?.email}</b> va vinculada al pedido.</li>
        <li>Tu acceso se activa ${CONFIG.tiempoActivacion}: vuelve a esta pestaña y la app se desbloquea sola.</li>
        <li>Sigues exactamente donde lo dejaste.</li>
      </ol>
      <button class="btn" onClick=${comprobar}>Ya he pagado: comprobar</button>
      ${msg ? html`<p class="muted small">${msg}</p>` : null}
      ${CONFIG.emailSoporte ? html`<p class="muted small">¿Has pagado con otro email o tienes algún problema? Escribe a <a href=${'mailto:' + CONFIG.emailSoporte}>${CONFIG.emailSoporte}</a>.</p>` : null}
    </div></section>
    <${Footer} />
  </div>`;
}

function CuentaCard() {
  useStore();
  const [borrando, setBorrando] = useState(false);
  const u = cloud.user;
  if (!cloud.enabled && !u) return html`<section class="card"><h2>Cuenta</h2><div class="note"><b>Modo local.</b> Falta configurar Firebase (ver LEEME.md).</div></section>`;
  if (!u) return null;
  const est = {
    prueba: html`<span class="badge prueba">Prueba gratuita</span> <span class="muted small">termina el ${fechaHora(acceso.finPrueba)} (quedan ${restante(acceso.finPrueba - Date.now())})</span>`,
    pago: html`<span class="badge pago">Acceso de por vida</span>`,
    admin: html`<span class="badge admin">Administrador</span>`,
  }[acceso.estado];
  const borrar = async () => {
    if (!confirm('Se borrarán todos tus datos de estudio de la nube y de este dispositivo. ¿Continuar?') || !confirm('¿Seguro? No se puede deshacer.')) return;
    setBorrando(true);
    try { await borrarMisDatos(); } catch (e) { alert('No se pudo borrar: ' + e.message); setBorrando(false); }
  };
  return html`<section class="card" id="cuenta"><h2>Tu cuenta</h2>
    <div class="acct">${u.photo ? html`<img src=${u.photo} alt="" referrerpolicy="no-referrer" />` : null}
      <div><b>${u.name}</b><div class="muted small">${u.email} · ${cloud.status}</div></div>
      <button class="btn sm ghost" onClick=${logout}>Cerrar sesión</button></div>
    <p>${est}</p>
    ${acceso.estado === 'prueba' ? html`<div class="buy"><p>${CONFIG.oferta ? html`<span class="oferta">${CONFIG.oferta}</span> ` : null}Pago único de <b>${CONFIG.precio}</b>${CONFIG.precioAntes ? html` <s class="muted">${CONFIG.precioAntes}</s>` : null} para usarla para siempre. Tus datos se conservan.</p><${BotonPago} medio="cuenta" />
      <p class="muted small">Tras pagar, tu acceso se activa ${CONFIG.tiempoActivacion}.</p>
      <${OfertaPack} medio="cuenta-pack" /></div>` : null}
    ${acceso.esAdmin ? html`<p><a class="btn" href="#/admin">Abrir panel de administración</a></p>` : null}
    ${cloud.error ? html`<p class="error small">${cloud.error}</p>` : null}
    <details><summary class="small muted">Eliminar mi cuenta</summary>
      <p class="small muted">Borra todos tus datos de estudio. ${CONFIG.emailSoporte ? `Para eliminar también tu registro de cuenta, escribe a ${CONFIG.emailSoporte}.` : ''}</p>
      <button class="btn danger sm" disabled=${borrando} onClick=${borrar}>Borrar mis datos y cerrar sesión</button></details>
  </section>`;
}

// ---------- ADMINISTRACIÓN ----------
function Admin() {
  useStore();
  const [filas, setFilas] = useState(null);
  const [err, setErr] = useState('');
  const [q, setQ] = useState('');
  const [nuevo, setNuevo] = useState('');
  const [ocupado, setOcupado] = useState('');
  const cargar = async () => { setErr(''); try { setFilas(await adminListar()); } catch (e) { setErr(e.message); } };
  useEffect(() => { if (acceso.esAdmin) cargar(); }, []);
  if (!acceso.esAdmin) return html`<div class="page"><p>Solo para administradores.</p></div>`;
  const accion = async (key, fn) => { setOcupado(key); try { await fn(); await cargar(); } catch (e) { setErr(e.message); } setOcupado(''); };
  const ahora = Date.now();
  const estado = (f) => (f.licencia ? 'pago' : !f.inicio ? 'pendiente' : f.finPrueba > ahora ? 'prueba' : 'caducada');
  const ETQ = { pago: 'De pago', prueba: 'En prueba', caducada: 'Prueba terminada', pendiente: 'Pagado, sin registrar' };
  const lista = (filas || []).filter((f) => !q || f.email.includes(q.toLowerCase()) || f.nombre.toLowerCase().includes(q.toLowerCase()));
  const n = (e) => (filas || []).filter((f) => estado(f) === e).length;
  return html`<div class="page">
    <header class="ph"><div><div class="muted cap">Solo tú ves esta sección</div><h1>Administración</h1></div><button class="btn" onClick=${cargar}>Actualizar</button></header>
    <div class="kpis">
      <div class="kpi"><div class="k-l">Registrados</div><div class="k-v">${filas ? filas.filter((f) => f.inicio).length : '…'}</div></div>
      <div class="kpi"><div class="k-l">En prueba</div><div class="k-v">${filas ? n('prueba') : '…'}</div></div>
      <div class="kpi"><div class="k-l">Prueba terminada</div><div class="k-v">${filas ? n('caducada') : '…'}</div><div class="k-s">posibles compradores</div></div>
      <div class="kpi"><div class="k-l">De pago</div><div class="k-v">${filas ? n('pago') + n('pendiente') : '…'}</div></div>
    </div>
    <section class="card"><h2>Activar acceso de por vida</h2>
      <p class="muted small">Las compras en Shopify se activan solas. Usa esto solo para casos especiales (regalos, pagos por otro medio o compras con otro email): pega el email. Si ya está registrado, se le desbloquea al momento; si no, en cuanto entre con ese email.</p>
      <form class="inline" onSubmit=${(e) => { e.preventDefault(); accion('nuevo', async () => { await adminActivar(nuevo, 'manual'); setNuevo(''); }); }}>
        <input type="email" placeholder="email@ejemplo.com" value=${nuevo} onInput=${(e) => setNuevo(e.target.value)} required />
        <button class="btn primary" type="submit" disabled=${ocupado === 'nuevo'}>Activar</button></form>
    </section>
    ${err ? html`<div class="note warn">${err}</div>` : null}
    <section class="card flush">
      <div class="pad card-h"><h2>Usuarios</h2><input class="search" placeholder="Buscar email o nombre" value=${q} onInput=${(e) => setQ(e.target.value)} /></div>
      ${!filas ? html`<p class="pad muted">Cargando…</p>` : !lista.length ? html`<p class="pad empty">Nadie todavía.</p>` : html`<div class="ulist">${lista.map((f) => { const e = estado(f); return html`<div class="urow">
        <div class="u-main"><b>${f.email}</b><span class="muted small">${f.nombre}${f.inicio ? ` · alta ${fechaHora(f.inicio)}` : ''}${f.licencia?.pedido ? ` · pedido Shopify ${f.licencia.pedido}` : ''}</span></div>
        <div class="u-est"><span class=${'badge ' + e}>${ETQ[e]}</span>${e === 'prueba' ? html`<span class="muted small">quedan ${restante(f.finPrueba - ahora)}</span>` : null}</div>
        <div class="u-act">
          ${f.licencia ? html`<button class="btn sm ghost danger" disabled=${!!ocupado} onClick=${() => confirm(`¿Quitar el acceso de por vida a ${f.email}?`) && accion(f.email, () => adminRevocar(f.email))}>Quitar acceso</button>`
            : html`<button class="btn sm primary" disabled=${!!ocupado} onClick=${() => accion(f.email, () => adminActivar(f.email, 'panel'))}>Activar de por vida</button>`}
          ${f.uid && !f.licencia ? html`<button class="btn sm" disabled=${!!ocupado} onClick=${() => accion(f.uid, () => adminAmpliarPrueba(f.uid, 3))}>Prueba +3 días</button>` : null}
        </div></div>`; })}</div>`}
    </section>
  </div>`;
}

// ---------- TEXTOS LEGALES ----------
const dato = (v, etiqueta) => (v ? v : html`<mark>[COMPLETA ${etiqueta} EN app-config.js]</mark>`);
function Legal({ doc }) {
  const C = CONFIG;
  const T = dato(C.titular, 'titular'), NIF = dato(C.nif, 'nif'), DOM = dato(C.domicilio, 'domicilio'), EM = dato(C.emailSoporte, 'emailSoporte'), WEB = C.web || location.origin;
  const docs = {
    aviso: ['Aviso legal', html`
      <p>En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:</p>
      <ul><li><b>Titular:</b> ${T}</li><li><b>NIF:</b> ${NIF}</li><li><b>Domicilio:</b> ${DOM}</li><li><b>Email de contacto:</b> ${EM}</li><li><b>Sitio web:</b> ${WEB}</li></ul>
      <h3>Objeto</h3><p>${C.nombre} es una aplicación web de planificación del estudio para personas que preparan la oposición a la Escala Básica de la Policía Nacional o a la Escala de Cabos y Guardias de la Guardia Civil. Es una herramienta independiente: no está vinculada, patrocinada ni autorizada por la Dirección General de la Policía, la Dirección General de la Guardia Civil ni el Ministerio del Interior. No incluye temario oficial ni garantiza resultados en el proceso selectivo. Las preguntas de práctica son de elaboración propia y no proceden de exámenes oficiales.</p>
      <h3>Propiedad intelectual</h3><p>El diseño, el código y los textos de la aplicación pertenecen a su titular. Los títulos del programa oficial se citan con fines informativos; el contenido normativo pertenece a sus autores y organismos.</p>
      <h3>Responsabilidad</h3><p>La información que muestra la aplicación (como las puntuaciones y marcas de las pruebas físicas, las notas de los tests o las preguntas de práctica) es orientativa. Consulta siempre las bases oficiales de la convocatoria publicadas en el BOE.</p>
      <h3>Legislación aplicable</h3><p>Estas condiciones se rigen por la legislación española.</p>`],
    privacidad: ['Política de privacidad', html`
      <h3>Responsable del tratamiento</h3><p>${T} (NIF ${NIF}), ${DOM}. Contacto: ${EM}.</p>
      <h3>Qué datos tratamos</h3><ul>
        <li><b>Datos de tu cuenta de Google:</b> nombre, email, foto de perfil e identificador, para darte acceso.</li>
        <li><b>Datos de uso que tú introduces:</b> tu oposición, tu progreso de estudio, notas, horas, planificación, resultados de tests y marcas de pruebas físicas.</li>
        <li><b>Datos de la cuenta:</b> fecha de alta e inicio de la prueba gratuita y si has comprado el acceso.</li>
        <li><b>Datos de pago:</b> los trata directamente la plataforma de pago. Nosotros no vemos ni guardamos tu tarjeta; solo recibimos el email y el importe de la compra.</li></ul>
      <h3>Para qué y con qué base legal</h3><ul>
        <li>Prestarte el servicio, sincronizar tus datos y gestionar la prueba y la compra: ejecución del contrato (art. 6.1.b RGPD).</li>
        <li>Conservar el registro de alta para evitar el uso abusivo de las pruebas gratuitas y atender reclamaciones: interés legítimo (art. 6.1.f RGPD).</li>
        <li>Cumplir obligaciones contables y fiscales: obligación legal (art. 6.1.c RGPD).</li></ul>
      <h3>Encargados y transferencias</h3><p>Usamos Google Firebase (Google Ireland Ltd.) para el inicio de sesión y el almacenamiento, y una plataforma de pago para cobrar. Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo con garantías adecuadas (Marco de Privacidad de Datos UE-EE. UU. o cláusulas contractuales tipo). No vendemos ni cedemos tus datos a terceros.</p>
      <h3>Cuánto tiempo</h3><p>Mientras mantengas tu cuenta. Puedes borrar tus datos de estudio cuando quieras desde Ajustes → Tu cuenta. Los datos de facturación se conservan el plazo que exige la ley.</p>
      <h3>Tus derechos</h3><p>Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${EM}. También puedes descargar una copia de tus datos desde Ajustes. Si no estás conforme, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).</p>
      <h3>Cookies y almacenamiento local</h3><p>La aplicación solo usa almacenamiento técnico del navegador, necesario para mantener tu sesión y funcionar sin conexión. No usamos cookies publicitarias ni de analítica.</p>`],
    terminos: ['Términos y condiciones', html`
      <h3>1. Servicio</h3><p>${C.nombre} es una aplicación web de planificación del estudio de las oposiciones a la Escala Básica de la Policía Nacional y a la Escala de Cabos y Guardias de la Guardia Civil, ofrecida por ${T} (NIF ${NIF}). No incluye el temario. Incluye preguntas de práctica de elaboración propia, que no proceden de exámenes oficiales.</p>
      <h3>2. Prueba gratuita</h3><p>Al registrarte con tu cuenta de Google dispones de ${C.diasPrueba} días de prueba con todas las funciones, sin necesidad de pago ni de tarjeta. Al terminar, puedes adquirir el acceso de por vida para seguir usándola. Tus datos se conservan aunque no compres. La prueba es una por persona.</p>
      <h3>3. Precio y pago</h3><p>El acceso de por vida tiene un precio único de ${C.precio} (impuestos incluidos), sin suscripción ni renovaciones. El pago se realiza a través de una plataforma de pago externa, que emite el justificante de compra.</p>
      <h3>4. Qué significa "de por vida"</h3><p>Acceso a la aplicación y a sus actualizaciones mientras el servicio se mantenga activo. Si el servicio dejara de prestarse, se avisará con antelación razonable y podrás descargar todos tus datos.</p>
      <h3>5. Activación</h3><p>Tras el pago, el acceso se activa en la cuenta asociada al email de compra, ${C.tiempoActivacion}. Si pagaste con otro email, escríbenos a ${EM}.</p>
      <h3>6. Derecho de desistimiento</h3><p>Al tratarse de contenido digital que se presta de forma inmediata, al comprar das tu consentimiento expreso para que el acceso empiece en ese momento y reconoces que pierdes el derecho de desistimiento de 14 días (art. 103.m del Real Decreto Legislativo 1/2007). Para eso existe la prueba gratuita. Si hay un problema técnico que te impida usarla, escríbenos y lo resolveremos o te devolveremos el dinero.</p>
      <h3>7. Uso correcto</h3><p>La cuenta es personal e intransferible. No está permitido compartirla, revenderla ni intentar saltarse las limitaciones de la prueba.</p>
      <h3>8. Responsabilidad</h3><p>La aplicación es una ayuda para organizarte; no garantiza ningún resultado en el proceso selectivo. Las puntuaciones y marcas de pruebas físicas, las notas de los tests y las preguntas de práctica son orientativas: consulta siempre las bases oficiales. Recomendamos descargar periódicamente una copia de tus datos.</p>
      <h3>9. Contacto y legislación</h3><p>Para cualquier duda o reclamación: ${EM}. Se aplica la legislación española. Como consumidor, también puedes acudir a la plataforma europea de resolución de litigios en línea.</p>`],
  };
  const [titulo, cuerpo] = docs[doc] || docs.aviso;
  return html`<div class="landing legal">
    <header class="l-top"><a class="brand" href="#/"><img src="icon.svg" alt="" width="30" height="30" /><div><b>${C.nombre}</b></div></a><a class="btn ghost" href="#/">Volver</a></header>
    <article class="legal-body"><h1>${titulo}</h1><p class="muted small">Última actualización: ${C.fechaLegal}</p>${cuerpo}</article>
    <${Footer} />
  </div>`;
}

// ---------- APP ----------
function SyncDot() {
  useStore();
  const st = cloud.status;
  const cls = st === 'sincronizado' ? 'ok' : st === 'error' ? 'bad' : st === 'local' ? 'off' : 'mid';
  return html`<a class=${'sync ' + cls} href="#/ajustes" title=${'Datos: ' + st}><i></i><span>${st === 'local' ? 'Local' : st}</span></a>`;
}

function App() {
  const s = useStore();
  L.setOposicion(s.settings.oposicion || 'pn');
  const [practica, setPractica] = useState(null);
  abrirPractica = (temaId) => setPractica({ temaId });
  const hash = useHash();
  const [modal, setModal] = useState(null);
  openRegistroGlobal = setModal;
  useEffect(() => {
    const th = s.settings.theme;
    if (th === 'auto') delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = th;
  }, [s.settings.theme]);
  useEffect(() => { window.scrollTo(0, 0); }, [hash]);
  useEffect(() => { if (cloud.user || acceso.estado === 'local') document.title = CONFIG.nombre; }, [acceso.estado]);
  useLogros(s);
  const [wiz, setWiz] = useState(null);
  const sincronizado = ['sincronizado', 'local'].includes(cloud.status);
  useEffect(() => { if (wiz === null && permitido() && sincronizado && necesitaBienvenida(s)) setWiz(true); }, [s, sincronizado]);
  const parts = hash.replace(/^#\/?/, '').split('/');
  const route = parts[0] || 'hoy';
  if (route === 'legal') return html`<${Legal} doc=${parts[1]} />`;
  // Sin sesión guardada en este navegador, mostramos la portada mientras Firebase arranca (sin parpadeo).
  const haySesion = (() => { try { return !!localStorage.getItem('pn-sesion'); } catch { return true; } })();
  if (acceso.estado === 'cargando' && !cloud.user && !haySesion && !cloud.error) return html`<${Landing} />`;
  if (acceso.estado === 'cargando') return html`<${Splash} />`;
  if (acceso.estado === 'sin-sesion') return html`<${Landing} />`;
  if (acceso.estado === 'caducada') return html`<${Paywall} />`;
  let Page;
  if (route === 'tema') Page = html`<${TemaDetalle} id=${parseInt(parts[1], 10)} />`;
  else Page = { hoy: html`<${Hoy} />`, temario: html`<${Temario} />`, plan: html`<${Plan} />`, fisicas: html`<${Fisicas} />`, tests: html`<${Tests} />`, stats: html`<${Progreso} />`, ajustes: html`<${Ajustes} />`, cuenta: html`<${Ajustes} />`, admin: html`<${Admin} />` }[route] || html`<${Hoy} />`;
  const active = route === 'tema' ? 'temario' : route === 'cuenta' ? 'ajustes' : route;
  return html`<div class="shell">
    <nav class="side" aria-label="Secciones">
      <div class="brand"><img src="icon.svg" alt="" width="28" height="28" /><div><b>${CONFIG.nombre}</b><span class="muted small">${L.OPO.nombre} · ${L.OPO.escala}</span></div></div>
      ${NAV.map(([k, l]) => html`<a class=${'nav ' + (active === k ? 'on' : '')} href=${'#/' + k} aria-current=${active === k ? 'page' : null}><${Icon} n=${k} /><span>${l}</span></a>`)}
      ${acceso.esAdmin ? html`<a class=${'nav desk ' + (active === 'admin' ? 'on' : '')} href="#/admin"><${Icon} n="admin" /><span>Admin</span></a>` : null}
      <div class="side-f"><${SyncDot} /><div class="legal-links"><a href="#/legal/terminos">Términos</a> · <a href="#/legal/privacidad">Privacidad</a></div></div>
    </nav>
    <main><${TrialBanner} />${Page}</main>
    <${Timer} onTerminar=${setModal} />
    ${modal ? html`<${RegistroModal} key=${JSON.stringify(modal)} ...${modal} onClose=${() => setModal(null)} />` : null}
    ${practica ? html`<${PracticaModal} key=${practica.temaId} temaId=${practica.temaId} onClose=${() => setPractica(null)} />` : null}
    ${wiz ? html`<${Bienvenida} onFin=${() => { setWiz(false); go('#/hoy'); }} />` : null}
    <${Toasts} />
  </div>`;
}

const root = document.getElementById('app');
root.textContent = '';
render(html`<${App} />`, root);
initCloud();
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
