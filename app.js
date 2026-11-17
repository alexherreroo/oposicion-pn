import { html, render, useState, useEffect, useMemo } from '../vendor/preact-htm.js';
import * as L from './logic.js';
import { getState, subscribe, update, replaceAll, cloud, initCloud, login, logout, defaultState } from './store.js';

const { TEMAS, BLOQUES, today, addDays, fmtRel, fmtCorto, fmtLargo, fmtMin, schedule, dominio } = L;

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
};
const Icon = ({ n, s = 20 }) => html`<svg class="ico" width=${s} height=${s} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d=${ICONS[n]} /></svg>`;

const NAV = [
  ['hoy', 'Hoy'], ['temario', 'Temario'], ['plan', 'Plan'], ['fisicas', 'Físicas'], ['stats', 'Progreso'], ['ajustes', 'Ajustes'],
];
const TIPOS = {
  estudio: 'Tema nuevo', repaso: 'Repaso', academia: 'Academia', simulacro: 'Simulacro', fisico: 'Entreno físico', descanso: 'Descanso', otro: 'Otro',
};

const temaDe = (id) => TEMAS[id - 1];
const regsDe = (s, id) => s.temas[id]?.regs || [];

function Semaforo({ value, small }) {
  if (!value) return html`<span class="sem vacio ${small ? 'sm' : ''}">Sin marcar</span>`;
  const m = L.SEMAFORO[value];
  return html`<span class="sem ${m.cls} ${small ? 'sm' : ''}"><i></i>${m.label}</span>`;
}
function Barra({ pct }) {
  const c = L.semaforoDe(pct);
  return html`<div class="barra" title=${pct + ' % estimado'}><div class=${'fill ' + c} style=${{ width: Math.max(2, pct) + '%' }}></div></div>`;
}

// ---------- Modal para registrar una vuelta o un repaso ----------
let openRegistroGlobal = () => {};
function RegistroModal({ temaId, tipo: tipoInicial, taskId, onClose }) {
  const [tipo, setTipo] = useState(tipoInicial || 'vuelta');
  const [rating, setRating] = useState(0);
  const [min, setMin] = useState('');
  const [date, setDate] = useState(today());
  const t = temaDe(temaId);
  const guardar = () => {
    if (!rating) return;
    update((s) => {
      s.temas[temaId] = s.temas[temaId] || { semaforo: null, regs: [] };
      s.temas[temaId].regs.push({ id: L.uid(), date, tipo, rating });
      const m = parseInt(min, 10);
      if (m > 0) s.horas.push({ id: L.uid(), date, min: m, note: `Tema ${temaId}` });
      if (taskId) { const k = s.tasks.find((x) => x.id === taskId); if (k) k.done = true; }
    });
    onClose();
  };
  const sched = schedule([...(getState().temas[temaId]?.regs || []), ...(rating ? [{ date, rating, tipo }] : [])]);
  return html`<div class="modal-bg" onClick=${(e) => e.target === e.currentTarget && onClose()}>
    <div class="modal" role="dialog" aria-label="Registrar estudio">
      <div class="modal-h"><div><div class="muted small">Tema ${t.id} · ${BLOQUES[t.bloque]}</div><h3>${t.titulo}</h3></div>
        <button class="icon-btn" onClick=${onClose} aria-label="Cerrar"><${Icon} n="x" /></button></div>
      <div class="seg">
        <button class=${tipo === 'vuelta' ? 'on' : ''} onClick=${() => setTipo('vuelta')}>Vuelta completa</button>
        <button class=${tipo === 'repaso' ? 'on' : ''} onClick=${() => setTipo('repaso')}>Repaso</button>
      </div>
      <p class="muted small">${tipo === 'vuelta' ? 'Cuenta como una vuelta más a este tema.' : 'Repaso rápido: no suma vuelta, pero sí cuenta para el dominio y la próxima fecha.'}</p>
      <label class="lbl">¿Qué tal te lo sabías?</label>
      <div class="ratings">${L.RATINGS.map((r) => html`<button class=${'rating ' + (rating === r.v ? 'on' : '')} onClick=${() => setRating(r.v)}><span class="emo">${r.emoji}</span>${r.label}</button>`)}</div>
      <div class="row2">
        <div><label class="lbl">Minutos (opcional)</label><input type="number" inputmode="numeric" min="0" placeholder="p. ej. 90" value=${min} onInput=${(e) => setMin(e.target.value)} /></div>
        <div><label class="lbl">Fecha</label><input type="date" value=${date} max=${today()} onInput=${(e) => setDate(e.target.value)} /></div>
      </div>
      ${rating ? html`<p class="hint">Próximo repaso: <b>${fmtRel(sched.next)}</b> (${fmtCorto(sched.next)})</p>` : null}
      <div class="modal-f"><button class="btn ghost" onClick=${onClose}>Cancelar</button><button class="btn primary" disabled=${!rating} onClick=${guardar}>Guardar</button></div>
    </div></div>`;
}

// ---------- HOY ----------
function racha(s) {
  const dias = new Set([...s.horas.map((h) => h.date), ...Object.values(s.temas).flatMap((t) => (t.regs || []).map((r) => r.date))]);
  let d = dias.has(today()) ? today() : addDays(today(), -1), n = 0;
  while (dias.has(d)) { n++; d = addDays(d, -1); }
  return n;
}
const minutosEntre = (s, a, b) => s.horas.filter((h) => h.date >= a && h.date <= b).reduce((x, h) => x + h.min, 0);

function Hoy() {
  const s = useStore();
  const hoy = today();
  const v = L.resumenVueltas(s.temas);
  const pend = L.pendientes(s.temas, hoy);
  const tareas = s.tasks.filter((k) => k.date === hoy);
  const atrasadas = s.tasks.filter((k) => k.date < hoy && !k.done);
  const diasExamen = s.settings.examDate ? L.diffDays(hoy, s.settings.examDate) : null;
  const minHoy = minutosEntre(s, hoy, hoy);
  const minSemana = minutosEntre(s, L.weekStart(hoy), hoy);
  const objetivo = (s.settings.horasObjetivoSemana || 0) * 60;
  const [otro, setOtro] = useState('');
  const estudiados = TEMAS.filter((t) => regsDe(s, t.id).length);

  return html`<div class="page">
    <header class="ph"><div><div class="muted cap">${fmtLargo(hoy)}</div><h1>Hoy</h1></div></header>
    <div class="kpis">
      <div class="kpi"><div class="k-l">Examen</div><div class="k-v">${diasExamen === null ? '—' : diasExamen}</div><div class="k-s">${diasExamen === null ? html`<a href="#/ajustes">Pon la fecha</a>` : 'días restantes'}</div></div>
      <div class="kpi"><div class="k-l">Vuelta ${v.actual}</div><div class="k-v">${v.hechos}<small>/45</small></div><div class="k-s">${Math.round((v.hechos / 45) * 100)} % completada</div></div>
      <div class="kpi"><div class="k-l">Racha</div><div class="k-v">${racha(s)}</div><div class="k-s">días seguidos</div></div>
      <div class="kpi"><div class="k-l">Esta semana</div><div class="k-v">${(minSemana / 60).toFixed(1).replace('.', ',')}<small> h</small></div><div class="k-s">${objetivo ? `de ${s.settings.horasObjetivoSemana} h objetivo` : 'estudiadas'}</div></div>
    </div>

    <section class="card">
      <h2>¿Qué toca hoy?</h2>
      <p class="muted small">Elige: avanzar con temario nuevo o repasar un tema anterior.</p>
      <div class="choice">
        <div class="opt">
          <div class="opt-h"><span class="tag nuevo">Avanzar</span><span class="muted small">Vuelta ${v.actual}</span></div>
          ${v.siguiente ? html`<div class="opt-t"><b>Tema ${v.siguiente.id}</b> · ${v.siguiente.titulo}</div>
            <button class="btn primary" onClick=${() => openRegistroGlobal({ temaId: v.siguiente.id, tipo: 'vuelta' })}><${Icon} n="check" s=${18} /> Lo he estudiado</button>` : html`<div class="opt-t">¡Vuelta terminada!</div>`}
        </div>
        <div class="opt">
          <div class="opt-h"><span class="tag repaso">Repasar</span><span class="muted small">${pend.length ? `${pend.length} pendiente${pend.length > 1 ? 's' : ''}` : 'Nada pendiente'}</span></div>
          ${pend.length ? html`<ul class="mini">${pend.slice(0, 4).map(({ t, s: sc }) => html`<li>
              <button class="link" onClick=${() => go('#/tema/' + t.id)}><b>T${t.id}</b> ${t.titulo}</button>
              <span class="muted small">${sc.next < hoy ? 'atrasado ' + fmtRel(sc.next) : 'toca hoy'}</span>
              <button class="btn sm" onClick=${() => openRegistroGlobal({ temaId: t.id, tipo: 'repaso' })}>Repasado</button></li>`)}</ul>` : null}
          <div class="pick">
            <select value=${otro} onChange=${(e) => setOtro(e.target.value)} aria-label="Elegir tema anterior">
              <option value="">${estudiados.length ? 'Repasar otro tema anterior…' : 'Aún no has estudiado ningún tema'}</option>
              ${estudiados.map((t) => html`<option value=${t.id}>Tema ${t.id} · ${t.titulo}</option>`)}
            </select>
            <button class="btn" disabled=${!otro} onClick=${() => { openRegistroGlobal({ temaId: +otro, tipo: 'repaso' }); setOtro(''); }}>Repasar</button>
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

    <section class="card">
      <h2>Horas de hoy: ${fmtMin(minHoy)}</h2>
      ${objetivo ? html`<div class="progress"><div style=${{ width: Math.min(100, (minSemana / objetivo) * 100) + '%' }}></div></div>
        <p class="muted small">${fmtMin(minSemana)} de ${s.settings.horasObjetivoSemana} h esta semana</p>` : null}
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
    if (!k.done && k.temaId) openRegistroGlobal({ temaId: k.temaId, tipo: k.kind === 'nuevo' ? 'vuelta' : 'repaso', taskId: k.id });
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
      <option value="">Tema…</option>${TEMAS.map((t) => html`<option value=${t.id}>T${t.id} · ${t.titulo}</option>`)}</select>` : null}
    <button class="btn" type="submit" aria-label="Añadir"><${Icon} n="plus" s=${16} /></button>
  </form>`;
}

// ---------- TEMARIO ----------
function Temario() {
  const s = useStore();
  const [filtro, setFiltro] = useState('todos');
  const hoy = today();
  const v = L.resumenVueltas(s.temas);
  const rows = TEMAS.map((t) => {
    const regs = regsDe(s, t.id);
    const sc = schedule(regs);
    const est = dominio(regs, hoy);
    return { t, sc, est, manual: s.temas[t.id]?.semaforo || null, aviso: L.aviso(s.temas[t.id]?.semaforo, est, sc.n) };
  });
  const visibles = rows.filter((r) => filtro === 'todos' || (filtro === 'pendientes' && r.sc.n && r.sc.next <= hoy) || (filtro === 'flojos' && r.sc.n && r.est < 50) || (filtro === 'sin' && !r.sc.n));
  const media = Math.round(rows.reduce((a, r) => a + r.est, 0) / rows.length);
  return html`<div class="page">
    <header class="ph"><div><div class="muted cap">Vuelta ${v.actual} · ${v.hechos}/45 temas · dominio medio ${media} %</div><h1>Temario</h1></div></header>
    <div class="filters">${[['todos', 'Todos'], ['pendientes', 'Repaso pendiente'], ['flojos', 'Flojos (<50 %)'], ['sin', 'Sin empezar']].map(([k, l]) => html`<button class=${'chip ' + (filtro === k ? 'on' : '')} onClick=${() => setFiltro(k)}>${l}</button>`)}</div>
    ${Object.entries(BLOQUES).map(([b, nombre]) => {
      const list = visibles.filter((r) => r.t.bloque === b);
      if (!list.length) return null;
      return html`<section class="card flush">
        <h2 class="pad">${nombre}</h2>
        <div class="tlist">${list.map((r) => html`<a class="trow" href=${'#/tema/' + r.t.id}>
          <span class="tnum">${r.t.id}</span>
          <span class="tmain"><span class="ttit">${r.t.titulo}${r.aviso ? html` <span class="warn-ico" title=${r.aviso}><${Icon} n="alert" s=${14} /></span>` : null}</span>
            <span class="tmeta">${r.manual ? html`<${Semaforo} value=${r.manual} small />` : null}<span class="muted small">${r.sc.vueltas} vuelta${r.sc.vueltas === 1 ? '' : 's'}${r.sc.n > r.sc.vueltas ? ` · ${r.sc.n - r.sc.vueltas} repasos` : ''}</span>
            ${r.sc.n ? html`<span class=${'small ' + (r.sc.next <= hoy ? 'due' : 'muted')}>${r.sc.next < hoy ? 'Repaso atrasado' : 'Repaso ' + fmtRel(r.sc.next)}</span>` : null}</span></span>
          <span class="tdom"><span class="small">${r.est} %</span><${Barra} pct=${r.est} /></span>
        </a>`)}</div></section>`;
    })}
    ${!visibles.length ? html`<p class="empty">No hay temas con ese filtro.</p>` : null}
  </div>`;
}

function TemaDetalle({ id }) {
  const s = useStore();
  const t = temaDe(id);
  if (!t) return html`<div class="page"><p>Tema no encontrado.</p></div>`;
  const regs = regsDe(s, id);
  const sc = schedule(regs);
  const est = dominio(regs);
  const manual = s.temas[id]?.semaforo || null;
  const aviso = L.aviso(manual, est, sc.n);
  const setSem = (v) => update((st) => { st.temas[id] = st.temas[id] || { semaforo: null, regs: [] }; st.temas[id].semaforo = st.temas[id].semaforo === v ? null : v; });
  return html`<div class="page">
    <header class="ph"><div><a class="muted small back" href="#/temario"><${Icon} n="left" s=${14} /> Temario</a>
      <div class="muted cap">Tema ${t.id} · ${BLOQUES[t.bloque]}</div><h1>${t.titulo}</h1></div>
      <div class="nav-t">${id > 1 ? html`<a class="icon-btn" href=${'#/tema/' + (id - 1)} aria-label="Tema anterior"><${Icon} n="left" /></a>` : null}
        ${id < 45 ? html`<a class="icon-btn" href=${'#/tema/' + (id + 1)} aria-label="Tema siguiente"><${Icon} n="right" /></a>` : null}</div></header>
    <div class="kpis">
      <div class="kpi"><div class="k-l">Dominio estimado</div><div class="k-v">${est}<small> %</small></div><${Barra} pct=${est} /></div>
      <div class="kpi"><div class="k-l">Vueltas</div><div class="k-v">${sc.vueltas}</div><div class="k-s">${sc.n - sc.vueltas} repaso${sc.n - sc.vueltas === 1 ? '' : 's'}</div></div>
      <div class="kpi"><div class="k-l">Próximo repaso</div><div class=${'k-v sm ' + (sc.next && sc.next < today() ? 'due' : '')}>${sc.next ? (sc.next < today() ? 'Atrasado' : fmtRel(sc.next)) : '—'}</div><div class="k-s">${sc.next ? (sc.next < today() ? 'tocaba ' + fmtRel(sc.next) : fmtCorto(sc.next)) : 'Aún sin estudiar'}</div></div>
    </div>
    ${aviso ? html`<div class="note warn"><${Icon} n="alert" s=${16} /> ${aviso}</div>` : null}
    <section class="card">
      <h2>Cómo lo llevo (tu valoración)</h2>
      <div class="semsel">${Object.entries(L.SEMAFORO).map(([k, m]) => html`<button class=${'sembtn ' + k + (manual === k ? ' on' : '')} onClick=${() => setSem(k)} aria-pressed=${manual === k}><i></i>${m.label}</button>`)}</div>
      <p class="muted small">La estimación de la app sale de tus valoraciones en cada vuelta o repaso, del número de vueltas y del tiempo que ha pasado sin tocar el tema.</p>
    </section>
    <section class="card">
      <div class="card-h"><h2>Registrar</h2></div>
      <div class="btns">
        <button class="btn primary" onClick=${() => openRegistroGlobal({ temaId: id, tipo: 'vuelta' })}>+ Vuelta completa</button>
        <button class="btn" onClick=${() => openRegistroGlobal({ temaId: id, tipo: 'repaso' })}>+ Repaso</button>
      </div>
    </section>
    <section class="card">
      <h2>Historial</h2>
      ${sc.list.length ? html`<ul class="hist">${[...sc.list].reverse().map((r) => { const R = L.RATINGS[r.rating - 1]; return html`<li>
        <span>${fmtCorto(r.date)}</span><span class=${'tag ' + (r.tipo === 'vuelta' ? 'estudio' : 'repaso')}>${r.tipo === 'vuelta' ? 'Vuelta' : 'Repaso'}</span><span>${R.emoji} ${R.label}</span>
        <button class="icon-btn sm" aria-label="Borrar registro" onClick=${() => confirm('¿Borrar este registro?') && update((st) => { st.temas[id].regs = st.temas[id].regs.filter((x) => x.id !== r.id); })}><${Icon} n="trash" s=${15} /></button></li>`; })}</ul>` : html`<p class="empty">Aún no hay registros.</p>`}
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
    const nuevas = L.autoplan(s, from, to);
    if (!nuevas.length) { setMsg('No hay nada nuevo que añadir: la semana ya está planificada.'); return; }
    update((st) => nuevas.forEach((k) => st.tasks.push({ id: L.uid(), done: false, ...k })));
    setMsg(`Añadidas ${nuevas.length} tareas (temas nuevos y repasos que vencen). Puedes borrar o mover las que quieras.`);
  };
  const minSem = minutosEntre(s, ini, addDays(ini, 6));
  const obj = s.settings.horasObjetivoSemana || 0;
  return html`
    <section class="card">
      <div class="card-h"><h2>Semana</h2><button class="btn primary sm" onClick=${auto}><${Icon} n="wand" s=${16} /> Autoplanificar</button></div>
      <p class="muted small">Autoplanificar reparte ${s.settings.nuevosPorDia} tema${s.settings.nuevosPorDia > 1 ? 's' : ''} nuevo${s.settings.nuevosPorDia > 1 ? 's' : ''} al día y hasta ${s.settings.maxRepasosDia} repasos de los que te tocan (arrastre), en tus días de estudio.</p>
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
function LineChart({ points, fmt, menorMejor, h = 140 }) {
  if (points.length < 2) return html`<p class="muted small">Registra al menos dos marcas para ver la evolución.</p>`;
  const W = 320, P = { l: 8, r: 8, t: 14, b: 18 };
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
  const notas = [];
  const cards = Object.keys(L.PRUEBAS).map((p) => {
    const marks = s.fisicas.filter((f) => f.prueba === p).sort((a, b) => (a.date < b.date ? -1 : 1));
    const last = marks[marks.length - 1];
    const menor = L.PRUEBAS[p].menorMejor;
    const best = marks.length ? marks.reduce((a, b) => (menor ? (b.value < a.value ? b : a) : b.value > a.value ? b : a)) : null;
    const pts = last ? L.puntos(p, sexo, last.value) : null;
    if (pts !== null) notas.push(pts);
    return { p, marks, last, best, pts };
  });
  const media = notas.length === 3 ? Math.round((notas.reduce((a, b) => a + b, 0) / 3) * 10) / 10 : null;
  return html`<div class="page">
    <header class="ph"><div><div class="muted cap">Pruebas físicas · ${sexo === 'H' ? 'baremo hombres' : 'baremo mujeres'}</div><h1>Físicas</h1></div></header>
    <div class="kpis">
      <div class="kpi"><div class="k-l">Nota media estimada</div><div class="k-v">${media === null ? '—' : String(media).replace('.', ',')}</div><div class="k-s">${media === null ? 'Registra las 3 pruebas' : media >= 5 && notas.every((n) => n > 0) ? 'Apto (≥ 5 y sin ceros)' : 'Aún no apto'}</div></div>
    </div>
    <div class="grid3">${cards.map((c) => html`<${FisicaCard} c=${c} sexo=${sexo} />`)}</div>
    <p class="muted small">Puntos aproximados por interpolación entre las marcas de 0, 5 y 10 puntos. Compruébalo con el baremo oficial de las bases de tu convocatoria (anexo de pruebas físicas).</p>
  </div>`;
}

function FisicaCard({ c, sexo }) {
  const [val, setVal] = useState('');
  const [date, setDate] = useState(today());
  const [err, setErr] = useState('');
  const unidad = L.unidadPrueba(c.p, sexo);
  const fmt = (v) => L.fmtValor(c.p, v) + (c.p === 'fuerza' ? ' ' + unidad : '');
  const add = (e) => {
    e.preventDefault();
    const v = L.parseValor(c.p, val);
    if (!isFinite(v) || v <= 0) { setErr(c.p === 'carrera' ? 'Escribe el tiempo como 3:15' : 'Escribe un número'); return; }
    update((s) => s.fisicas.push({ id: L.uid(), date, prueba: c.p, value: v }));
    setVal(''); setErr('');
  };
  return html`<section class="card">
    <h2>${L.nombrePrueba(c.p, sexo)}</h2>
    <div class="fis-top">
      <div><div class="k-l">Última</div><div class="k-v sm">${c.last ? fmt(c.last.value) : '—'}</div></div>
      <div><div class="k-l">Mejor</div><div class="k-v sm">${c.best ? fmt(c.best.value) : '—'}</div></div>
      <div><div class="k-l">Puntos</div><div class=${'k-v sm ' + (c.pts === 0 ? 'bad' : '')}>${c.pts === null ? '—' : String(c.pts).replace('.', ',')}</div></div>
    </div>
    <${LineChart} points=${c.marks} fmt=${fmt} menorMejor=${L.PRUEBAS[c.p].menorMejor} />
    <form class="inline" onSubmit=${add}>
      <input placeholder=${c.p === 'carrera' ? 'm:ss (3:20)' : c.p === 'agilidad' ? 'segundos (9,8)' : unidad === 's' ? 'segundos' : 'repeticiones'} inputmode=${c.p === 'carrera' ? 'text' : 'decimal'} value=${val} onInput=${(e) => setVal(e.target.value)} />
      <input type="date" value=${date} max=${today()} onInput=${(e) => setDate(e.target.value)} />
      <button class="btn" type="submit"><${Icon} n="plus" s=${16} /> Marca</button>
    </form>
    ${err ? html`<p class="error small">${err}</p>` : null}
    ${c.marks.length ? html`<details><summary class="small muted">Ver todas (${c.marks.length})</summary><ul class="hist">${[...c.marks].reverse().map((m) => html`<li><span>${fmtCorto(m.date)}</span><span>${fmt(m.value)}</span><span class="muted">${L.puntos(c.p, sexo, m.value)} pts</span>
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

function Progreso() {
  const s = useStore();
  const hoy = today();
  const dias = Array.from({ length: 30 }, (_, i) => addDays(hoy, i - 29));
  const horas = dias.map((d) => ({ label: fmtCorto(d), v: minutosEntre(s, d, d), hl: d === hoy }));
  const v = L.resumenVueltas(s.temas);
  const maxV = Math.max(v.actual, ...v.counts);
  const porVuelta = Array.from({ length: maxV }, (_, i) => v.counts.filter((c) => c >= i + 1).length);
  // Ritmo: temas avanzados (vueltas) en los últimos 14 días.
  const regs = Object.values(s.temas).flatMap((t) => t.regs || []);
  const avance14 = regs.filter((r) => r.tipo === 'vuelta' && r.date > addDays(hoy, -14)).length / 14;
  const restantes = 45 - v.hechos;
  const diasExamen = s.settings.examDate ? L.diffDays(hoy, s.settings.examDate) : null;
  const necesario = diasExamen > 0 ? restantes / diasExamen : null;
  const fin = avance14 > 0 ? addDays(hoy, Math.ceil(restantes / avance14)) : null;
  const ests = TEMAS.map((t) => dominio(regsDe(s, t.id), hoy));
  const dist = { rojo: 0, amarillo: 0, verde: 0 };
  TEMAS.forEach((t, i) => { if (regsDe(s, t.id).length) dist[L.semaforoDe(ests[i])]++; });
  const sinEmpezar = TEMAS.filter((t) => !regsDe(s, t.id).length).length;
  const olvidados = TEMAS.map((t, i) => ({ t, sc: schedule(regsDe(s, t.id)), e: ests[i] })).filter((x) => x.sc.n && x.sc.next < hoy).sort((a, b) => (a.sc.next < b.sc.next ? -1 : 1)).slice(0, 5);
  const bloques = Object.entries(BLOQUES).map(([b, n]) => { const ids = TEMAS.filter((t) => t.bloque === b); return { n, pct: Math.round(ids.reduce((a, t) => a + ests[t.id - 1], 0) / ids.length) }; });
  return html`<div class="page">
    <header class="ph"><div><div class="muted cap">Estadísticas</div><h1>Progreso</h1></div></header>
    <section class="card">
      <h2>Ritmo de la vuelta ${v.actual}</h2>
      <div class="kpis inner">
        <div class="kpi"><div class="k-l">Tu ritmo (14 días)</div><div class="k-v sm">${avance14.toFixed(2).replace('.', ',')}</div><div class="k-s">temas/día</div></div>
        <div class="kpi"><div class="k-l">Necesario</div><div class="k-v sm">${necesario === null ? '—' : necesario.toFixed(2).replace('.', ',')}</div><div class="k-s">${necesario === null ? 'pon la fecha del examen' : 'temas/día para cerrar la vuelta'}</div></div>
        <div class="kpi"><div class="k-l">Terminarías</div><div class="k-v sm">${fin ? fmtCorto(fin) : '—'}</div><div class="k-s">${fin && s.settings.examDate ? (fin <= s.settings.examDate ? '✓ antes del examen' : '✗ después del examen') : 'a este ritmo'}</div></div>
      </div>
    </section>
    <section class="card"><h2>Horas de estudio · últimos 30 días</h2>
      <${BarChart} data=${horas} unit=${fmtMin} />
      <p class="muted small">Total: ${fmtMin(horas.reduce((a, d) => a + d.v, 0))} · media ${fmtMin(horas.reduce((a, d) => a + d.v, 0) / 30)} al día</p></section>
    <div class="grid2">
      <section class="card"><h2>Temas completados por vuelta</h2>
        ${porVuelta.map((n, i) => html`<div class="hbar"><span class="small">Vuelta ${i + 1}</span><div class="progress"><div style=${{ width: (n / 45) * 100 + '%' }}></div></div><span class="small">${n}/45</span></div>`)}
      </section>
      <section class="card"><h2>Dominio estimado</h2>
        <div class="dist">
          <div><${Semaforo} value="verde" small /><b>${dist.verde}</b></div>
          <div><${Semaforo} value="amarillo" small /><b>${dist.amarillo}</b></div>
          <div><${Semaforo} value="rojo" small /><b>${dist.rojo}</b></div>
          <div><span class="sem vacio sm">Sin empezar</span><b>${sinEmpezar}</b></div>
        </div>
        ${bloques.map((b) => html`<div class="hbar"><span class="small">${b.n}</span><${Barra} pct=${b.pct} /><span class="small">${b.pct} %</span></div>`)}
      </section>
    </div>
    <section class="card"><h2>Temas más olvidados</h2>
      ${olvidados.length ? html`<ul class="hist">${olvidados.map((o) => html`<li><a href=${'#/tema/' + o.t.id}><b>T${o.t.id}</b> ${o.t.titulo}</a><span class="due small">${fmtRel(o.sc.next)}</span><span class="small">${o.e} %</span></li>`)}</ul>` : html`<p class="empty">Ningún repaso atrasado. 👌</p>`}
    </section>
  </div>`;
}

// ---------- AJUSTES ----------
function Ajustes() {
  const s = useStore();
  const st = s.settings;
  const set = (k, v) => update((x) => { x.settings[k] = v; });
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
    <section class="card"><h2>Sincronización</h2><${CloudBox} /></section>
    <section class="card"><h2>Apariencia</h2>
      <div class="seg">${[['auto', 'Automático'], ['light', 'Claro'], ['dark', 'Oscuro']].map(([k, l]) => html`<button class=${st.theme === k ? 'on' : ''} onClick=${() => set('theme', k)}>${l}</button>`)}</div></section>
    <section class="card"><h2>Oposición</h2>
      <div class="form">
        <label>Fecha del examen<input type="date" value=${st.examDate} onInput=${(e) => set('examDate', e.target.value)} /></label>
        <label>Baremo de pruebas físicas<select value=${st.sexo} onChange=${(e) => set('sexo', e.target.value)}><option value="H">Hombres</option><option value="M">Mujeres</option></select></label>
        <label>Objetivo de horas por semana<input type="number" min="0" value=${st.horasObjetivoSemana} onInput=${(e) => set('horasObjetivoSemana', +e.target.value || 0)} /></label>
      </div></section>
    <section class="card"><h2>Autoplanificación (arrastre)</h2>
      <div class="form">
        <label>Temas nuevos por día<input type="number" min="0" max="5" value=${st.nuevosPorDia} onInput=${(e) => set('nuevosPorDia', Math.max(0, +e.target.value || 0))} /></label>
        <label>Máximo de repasos por día<input type="number" min="0" max="10" value=${st.maxRepasosDia} onInput=${(e) => set('maxRepasosDia', Math.max(0, +e.target.value || 0))} /></label>
      </div>
      <label class="lbl">Días de estudio</label>
      <div class="days">${L.DIAS_CORTO.map((d, i) => html`<button class=${'chip ' + (st.diasEstudio.includes(i) ? 'on' : '')} onClick=${() => set('diasEstudio', st.diasEstudio.includes(i) ? st.diasEstudio.filter((x) => x !== i) : [...st.diasEstudio, i].sort())}>${d}</button>`)}</div>
    </section>
    <section class="card"><h2>Copia de seguridad</h2>
      <p class="muted small">Descarga todos tus datos en un archivo. Guárdalo de vez en cuando por si acaso.</p>
      <div class="btns"><button class="btn" onClick=${exportar}>Descargar copia</button>
        <label class="btn">Restaurar copia<input type="file" accept="application/json" hidden onChange=${importar} /></label>
        <button class="btn danger" onClick=${() => confirm('¿Borrar TODOS los datos? No se puede deshacer.') && confirm('¿Seguro del todo?') && replaceAll(defaultState())}>Borrar todo</button></div>
    </section>
  </div>`;
}

function CloudBox() {
  useStore();
  if (!cloud.enabled) return html`<div class="note"><b>Modo local.</b> Tus datos se guardan solo en este navegador. Para sincronizar PC y móvil, sigue la guía del archivo <code>LEEME.md</code> (configurar Firebase, 15 min).</div>`;
  if (!cloud.user) return html`<div><p class="muted small">Inicia sesión con Google para guardar tus datos en la nube y verlos en todos tus dispositivos.</p>
    <button class="btn primary" onClick=${login}>Iniciar sesión con Google</button>${cloud.error ? html`<p class="error small">${cloud.error}</p>` : null}</div>`;
  return html`<div class="acct">${cloud.user.photo ? html`<img src=${cloud.user.photo} alt="" referrerpolicy="no-referrer" />` : null}
    <div><b>${cloud.user.name}</b><div class="muted small">${cloud.user.email} · ${cloud.status}</div></div>
    <button class="btn sm ghost" onClick=${logout}>Cerrar sesión</button></div>${cloud.error ? html`<p class="error small">${cloud.error}</p>` : null}`;
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
  const hash = useHash();
  const [modal, setModal] = useState(null);
  openRegistroGlobal = setModal;
  useEffect(() => {
    const th = s.settings.theme;
    if (th === 'auto') delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = th;
  }, [s.settings.theme]);
  useEffect(() => { window.scrollTo(0, 0); }, [hash]);
  const parts = hash.replace(/^#\//, '').split('/');
  const route = parts[0] || 'hoy';
  let Page;
  if (route === 'tema') Page = html`<${TemaDetalle} id=${parseInt(parts[1], 10)} />`;
  else Page = { hoy: html`<${Hoy} />`, temario: html`<${Temario} />`, plan: html`<${Plan} />`, fisicas: html`<${Fisicas} />`, stats: html`<${Progreso} />`, ajustes: html`<${Ajustes} />` }[route] || html`<${Hoy} />`;
  const active = route === 'tema' ? 'temario' : route;
  return html`<div class="shell">
    <nav class="side" aria-label="Secciones">
      <div class="brand"><img src="icons/icon.svg" alt="" width="28" height="28" /><div><b>Oposición PN</b><span class="muted small">Escala Básica</span></div></div>
      ${NAV.map(([k, l]) => html`<a class=${'nav ' + (active === k ? 'on' : '')} href=${'#/' + k} aria-current=${active === k ? 'page' : null}><${Icon} n=${k} /><span>${l}</span></a>`)}
      <div class="side-f"><${SyncDot} /></div>
    </nav>
    <main>${Page}</main>
    ${modal ? html`<${RegistroModal} ...${modal} onClose=${() => setModal(null)} />` : null}
  </div>`;
}

const root = document.getElementById('app');
root.textContent = '';
render(html`<${App} />`, root);
initCloud();
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
