'use strict';

/* ==========================================================================
   Datos base
   ========================================================================== */

const SEED_ROWS = [
  ['INC2764299','OXXO-Mx TI SopPOS.SpinbyOXXO','Error al realizar retiros con QR / sin tarjeta','Copiar la tabla TENDER de una tienda que funcione correctamente. Referencia: tienda 50T7N-CHAPALA.','Solicitan apoyo en tienda 50 por error al realizar retiros sin tarjeta de Spin.'],
  ['INC4093079','OXXO-Mx TI SopPOS.Tipo_de_cambio','No actualiza tipo de cambio / aperturas','Ejecutar la mitigación en la caja VT1 y copiar la tabla EXCHANGE_RATE de la caja de procesos a la caja 1.','La caja 1 no actualiza automáticamente el tipo de cambio.'],
  ['INC3022869','OXXO-Mx TI SopPOS.Performance','Retiros con tarjeta no cobran comisión','','En tienda 504EP-BEGONIAS los retiros de distintos bancos no cobran comisión y se rechazan.'],
  ['INC3153371','OXXO-Mx TI SopPOS DAI.Dif ValdeInv/SaldoDiario','Análisis de diferencia en saldo diario','Asignar al segmento Tipo de cambio.','Tienda 50CP7-BOCANEGRA presenta una diferencia en saldo de -3155.38.'],
  ['INC3260995','OXXO-Mx TI SopPOS.OXXOPremia','No descuenta puntos en saldo / Premia','','Error al redimir puntos: no descuenta la cantidad del total.'],
  ['INC3974944','XPE.TI RyT NOC SC Inc Configuración por Daño de Equipo','Apoyo con activación de AP','','Cambio de AP por daño. El equipo ya fue dado de alta en EVOTI.'],
  ['INC3895268','OXXO-Mx TI Movilidad en Tienda.Preinventarios','Categoría error movilidad','','El equipo de movilidad no guarda los preinventarios realizados.'],
  ['INC4028880','OXXO-Mx TI Alta Servicios Telefonía','Alta teléfono','Aperturas.','Solicitud de alta de teléfonos IP para tiendas nuevas.'],
  ['INC4093131','OXXO-Mx TI SopPOS.Performance','Cierres inesperados por Premia XPOS','',''],
  ['INC4318614','','Preinventarios movilidad','',''],
  ['INC4335242','','Folios para alta equipo Meraki','','Tienda próxima apertura: equipos registrados mediante EVOTI.'],
  ['INC4421717','','Apoyo con alta para cambio dinámico Meraki','','Alta de equipos SW y RT para cambio dinámico Cisco 800 a Meraki.'],
  ['INC4456533','','Apoyo con revisión por bloqueo de puertos TDA Mayapán','',''],
  ['INC4540246','','Impresora de gafetes','',''],
  ['INC4540374','','Error en actualización de equipos','',''],
  ['INC4556086','','Alta de extensión telefónica tiendas nuevas','','Tienda 50CCP-TANAMA.'],
  ['INC4768361','','Falla en RPD','','No respeta los rangos de retiro asignados.'],
  ['INC4983118','','Fallo updater parches','','Solicita retiros a cantidades menores.'],
  ['INC4559804','','Apoyo con archivo .DAT para tienda de apertura MAESERVCONFIG','',''],
  ['INC5768197','','Error en POSMóvil al inyectar las llaves','','Llaves no encontradas. Error 500 al vincular HH con Pin Pad. Se aplicó checklist y persiste.'],
  ['INC5655677','OXXO-Mx TI Colaboración.Office 365','Error en cuenta de PART tiendas nuevas','Generar folio a Colaboración 360 para reinicio de contraseña.','Tienda nueva sin acceso al Portal de aplicaciones.'],
  ['INC8236249','OXXO-MX TI RMS16.Folios POS','Error en foliadores de tiendas, RMS folios POS','Apoyo con información de foliador de tienda Maldonado.','Posterior a truene de disco se perdió la información del foliador.'],
  ['INC8249864','OXXO-Mx TI SopPOS.Actualizar_Folios_de_Mov','Actualizar foliadores retransición sin respaldo','','Retransición sin respaldo en caja de procesos.'],
  ['CHECK LIST TRUENE DISCO','DETENER CEDIS','Checklist truene de disco','Foliadores\nReenvío de catálogos, promociones y precios\nDetener CEDIS\nEnviar inventario\nActivar recolección total','Reenvío de catálogos, promociones y precios. Detener CEDIS, enviar inventario y activar recolección total.'],
  ['CHECK LIST APERTURAS','APERTURAS','Checklist aperturas','Transición y planchado\nAsignación de red\nAsegurar precios, promociones y catálogos\nAltas SW, RT, AP, HH, TT\nAlta de teléfono IP\nRed y segmentación\nMovilidad','Altas SW, RT, AP, HH, TT, teléfono IP, red, segmentación, movilidad.'],
  ['INC11473557','OXXO-Mx TI Soporte Xmonitor.Tienda no visible','Tienda no se ve en Xmonitor: próxima apertura','','']
];

// Los ids `seed-N` se mantienen estables para respetar ediciones guardadas por versiones anteriores.
const SEED = SEED_ROWS.map(([folio, categoria, descripcion, solucion, dialogo], i) =>
  ({ id: `seed-${i}`, folio, categoria, descripcion, solucion, dialogo, video: '', createdAt: -i }));
const SEED_IDS = new Set(SEED.map(s => s.id));

const TEXT_FIELDS = ['folio', 'categoria', 'grupo', 'descripcion', 'solucion', 'dialogo', 'video'];
const TYPES = ['documentada', 'informativa', 'pendiente'];
const TYPE_INFO = {
  documentada: { label: 'Documentada', long: 'Solución documentada' },
  informativa: { label: 'Informativa', long: 'Guía de escalamiento' },
  pendiente: { label: 'Pendiente', long: 'Por documentar' }
};
const VIEWS = {
  library: { title: 'Soluciones que el equipo ya conoce', list: 'Soluciones e incidencias', empty: 'Aún no hay soluciones registradas.' },
  checklists: { title: 'Checklists operativos', list: 'Checklists', empty: 'Aún no hay checklists registrados.' },
  unresolved: { title: 'Incidencias por documentar', list: 'Pendientes de documentar', empty: '¡Todo documentado! No quedan pendientes.' },
  pinned: { title: 'Tus registros fijados', list: 'Fijados', empty: 'Fija registros con ☆ o la tecla P para tenerlos a mano.' }
};
const THEMES = { system: '◐ Tema: sistema', light: '☀ Tema: claro', dark: '☾ Tema: oscuro' };
const KEYS = {
  custom: 'kbd-custom', hidden: 'kbd-hidden', pinned: 'kbd-pinned', progress: 'kbd-progress',
  snow: 'kbd-servicenow-base', theme: 'kbd-theme', sort: 'kbd-sort'
};

/* ==========================================================================
   Utilidades
   ========================================================================== */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));
const norm = s => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const isSafeUrl = u => /^https?:\/\/\S+$/i.test(u || '');
const isSafeImage = u => /^data:image\/(png|jpe?g|webp|gif);base64,/i.test(u || '');
const uid = () => `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const formatDate = ts => ts > 0 ? new Date(ts).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Base inicial';
const formatBytes = b => b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`;

const store = {
  get(key, fallback) {
    try { const raw = localStorage.getItem(key); return raw == null ? fallback : JSON.parse(raw); } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (err) {
      toast(err?.name === 'QuotaExceededError'
        ? 'No hay espacio en el almacenamiento local. Quita imágenes o exporta un respaldo.'
        : 'No se pudo guardar en este navegador.', { kind: 'error' });
      return false;
    }
  },
  raw(key) { try { return localStorage.getItem(key) || ''; } catch { return ''; } },
  setRaw(key, value) {
    try { value ? localStorage.setItem(key, value) : localStorage.removeItem(key); return true; } catch { return false; }
  }
};

/* ==========================================================================
   Estado
   ========================================================================== */

const state = {
  custom: sanitizeEntries(store.get(KEYS.custom, [])),
  hidden: new Set(stringList(store.get(KEYS.hidden, []))),
  pinned: new Set(stringList(store.get(KEYS.pinned, []))),
  progress: sanitizeProgress(store.get(KEYS.progress, {})),
  view: 'library',
  status: '',
  selectedId: null,
  editingId: null,
  pendingImage: null,
  formDirty: false,
  visible: []
};

function stringList(v) { return Array.isArray(v) ? v.filter(x => typeof x === 'string') : []; }

function sanitizeProgress(v) {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return {};
  const out = {};
  for (const [id, steps] of Object.entries(v)) {
    if (Array.isArray(steps)) out[id] = steps.filter(Number.isInteger);
  }
  return out;
}

function sanitizeEntries(list) {
  if (!Array.isArray(list)) return [];
  const seen = new Set();
  return list.filter(x => x && typeof x === 'object').map(x => {
    const e = {};
    for (const k of TEXT_FIELDS) e[k] = typeof x[k] === 'string' ? x[k] : '';
    e.id = typeof x.id === 'string' && x.id ? x.id : uid();
    if (typeof x.originalId === 'string') e.originalId = x.originalId;
    if (x.clase === 'checklist' || x.clase === 'solucion') e.clase = x.clase;
    if (TYPES.includes(x.tipo)) e.tipo = x.tipo;
    if (isSafeImage(x.imagen)) e.imagen = x.imagen;
    if (e.video && !isSafeUrl(e.video)) e.video = '';
    e.createdAt = Number.isFinite(x.createdAt) ? x.createdAt : Date.now();
    if (Number.isFinite(x.updatedAt)) e.updatedAt = x.updatedAt;
    return e;
  }).filter(e => {
    if (seen.has(e.id) || !(e.folio || e.descripcion)) return false;
    seen.add(e.id);
    return true;
  });
}

function snapshot() {
  return { custom: [...state.custom], hidden: new Set(state.hidden), pinned: new Set(state.pinned), progress: structuredClone(state.progress) };
}
function restore(snap) { Object.assign(state, snap); }

function persistAll() {
  return store.set(KEYS.custom, state.custom)
    && store.set(KEYS.hidden, [...state.hidden])
    && store.set(KEYS.pinned, [...state.pinned])
    && store.set(KEYS.progress, state.progress);
}

/* ==========================================================================
   Modelo
   ========================================================================== */

function allEntries() {
  const overridden = new Set(state.custom.map(e => e.originalId || e.id));
  return [...state.custom, ...SEED.filter(s => !overridden.has(s.id) && !state.hidden.has(s.id))];
}
const currentEntry = () => allEntries().find(e => e.id === state.selectedId) || null;

const classOf = e => (e.clase === 'checklist' || e.clase === 'solucion')
  ? e.clase
  : (/^CHECK\s*LIS/i.test(e.folio || '') ? 'checklist' : 'solucion');

const typeOf = e => TYPES.includes(e.tipo)
  ? e.tipo
  : e.solucion ? 'documentada'
  : /check list|alta|activación|folios|extensión/i.test(`${e.folio} ${e.descripcion}`) ? 'informativa' : 'pendiente';

const groupOf = e => e.grupo || (e.categoria || '').split('.')[0];

function stepsOf(e) {
  const text = (e.solucion || '').trim();
  if (!text) return [];
  let lines = text.split(/\r?\n/).map(l => l.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, '').trim()).filter(Boolean);
  if (lines.length === 1) lines = lines[0].split(/[;.]\s+/).map(s => s.replace(/[.;]$/, '').trim()).filter(Boolean);
  return lines;
}

function doneSteps(e) {
  const total = stepsOf(e).length;
  return new Set((state.progress[e.id] || []).filter(i => i < total));
}

function inView(e, view) {
  const c = classOf(e);
  switch (view) {
    case 'library': return c === 'solucion';
    case 'checklists': return c === 'checklist';
    case 'unresolved': return c === 'solucion' && typeOf(e) === 'pendiente';
    case 'pinned': return state.pinned.has(e.id);
    default: return true;
  }
}
const showsChips = () => state.view === 'library' || state.view === 'pinned';

/* ---------- Búsqueda ---------- */

const queryTerms = () => norm($('#search').value).split(/\s+/).filter(Boolean);
const SEARCH_FIELDS = [['folio', 8], ['descripcion', 5], ['categoria', 3], ['grupo', 2], ['solucion', 2], ['dialogo', 1]];

function score(e, terms) {
  if (!terms.length) return 1;
  let total = 0;
  for (const t of terms) {
    let found = false;
    for (const [field, weight] of SEARCH_FIELDS) {
      const i = norm(e[field]).indexOf(t);
      if (i < 0) continue;
      found = true;
      total += weight + (i === 0 ? weight / 2 : 0);
    }
    if (!found) return 0;
  }
  return total;
}

function filterEntries(entries) {
  const terms = queryTerms(), cat = $('#category').value, sort = $('#sort').value;
  const scored = [];
  for (const e of entries) {
    if (!inView(e, state.view) || (cat && e.categoria !== cat)) continue;
    const s = score(e, terms);
    if (s) scored.push({ e, s });
  }
  const pin = x => state.pinned.has(x.e.id) ? 1 : 0;
  const recent = (a, b) => (b.e.updatedAt || b.e.createdAt || 0) - (a.e.updatedAt || a.e.createdAt || 0);
  scored.sort((a, b) => {
    if (sort === 'folio') return (a.e.folio || '').localeCompare(b.e.folio || '', 'es', { numeric: true });
    if (sort === 'relevance' && terms.length) return b.s - a.s || recent(a, b);
    return pin(b) - pin(a) || recent(a, b);
  });
  return scored.map(x => x.e);
}

const ACCENTS = { a: 'aáàä', e: 'eéèë', i: 'iíìï', o: 'oóòö', u: 'uúùü', n: 'nñ', c: 'cç' };
const termPattern = t => [...t].map(ch => ACCENTS[ch] ? `[${ACCENTS[ch]}]` : ch.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')).join('');

function hl(text, terms) {
  const str = String(text ?? '');
  if (!terms.length || !str) return esc(str);
  const re = new RegExp(`(${terms.map(termPattern).sort((a, b) => b.length - a.length).join('|')})`, 'giu');
  return str.split(re).map((part, i) => i % 2 ? `<mark>${esc(part)}</mark>` : esc(part)).join('');
}

function snippet(e, terms) {
  if (!terms.length) return '';
  const visible = norm(`${e.folio} ${e.descripcion} ${e.categoria}`);
  if (terms.every(t => visible.includes(t))) return '';
  for (const field of ['solucion', 'dialogo', 'grupo']) {
    const raw = String(e[field] || ''), n = norm(raw);
    const idx = Math.min(...terms.map(t => { const i = n.indexOf(t); return i < 0 ? Infinity : i; }));
    if (idx === Infinity) continue;
    const start = Math.max(0, idx - 40), end = Math.min(raw.length, idx + 90);
    const text = (start ? '…' : '') + raw.slice(start, end).replace(/\s+/g, ' ') + (end < raw.length ? '…' : '');
    return `<span class="card-snippet">${hl(text, terms)}</span>`;
  }
  return '';
}

/* ==========================================================================
   Render
   ========================================================================== */

function render() {
  const entries = allEntries();
  if (state.selectedId && !entries.some(e => e.id === state.selectedId)) state.selectedId = null;

  const counts = renderNav(entries);
  renderStats(entries, counts);
  renderCategories(entries);

  const base = filterEntries(entries);
  const list = state.status && showsChips() ? base.filter(e => typeOf(e) === state.status) : base;
  state.visible = list;

  renderChips(base);
  renderCards(list);
  renderEmpty(list);
  renderDetail(entries);
}

function renderNav(entries) {
  const counts = { library: 0, checklists: 0, unresolved: 0, pinned: 0 };
  for (const e of entries) for (const v in counts) if (inView(e, v)) counts[v]++;
  $$('[data-count]').forEach(b => { b.textContent = counts[b.dataset.count]; });
  $$('.nav').forEach(n => {
    const on = n.dataset.view === state.view;
    n.classList.toggle('is-active', on);
    n.setAttribute('aria-current', on ? 'page' : 'false');
  });
  $('#viewTitle').textContent = VIEWS[state.view].title;
  return counts;
}

function renderStats(entries, counts) {
  const documented = entries.filter(e => classOf(e) === 'solucion' && typeOf(e) === 'documentada').length;
  const pct = counts.library ? Math.round(documented / counts.library * 100) : 0;
  $('#stats').innerHTML = `
    <button class="stat" type="button" data-go="library"><span class="stat-label">Soluciones</span><strong>${counts.library}</strong></button>
    <div class="stat"><span class="stat-label">Documentadas</span><strong>${documented}<small>${pct}%</small></strong><div class="meter"><span style="width:${pct}%"></span></div></div>
    <button class="stat" type="button" data-go="unresolved"><span class="stat-label">Por documentar</span><strong>${counts.unresolved}</strong></button>
    <button class="stat" type="button" data-go="checklists"><span class="stat-label">Checklists</span><strong>${counts.checklists}</strong></button>`;
}

function renderCategories(entries) {
  const select = $('#category'), current = select.value;
  const cats = [...new Set(entries.map(e => e.categoria).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));
  select.innerHTML = '<option value="">Todas las categorías</option>' +
    cats.map(c => `<option value="${esc(c)}"${c === current ? ' selected' : ''}>${esc(c)}</option>`).join('');
  if (!cats.includes(current)) select.value = '';
  $('#categoryList').innerHTML = cats.map(c => `<option value="${esc(c)}">`).join('');
  const groups = [...new Set(entries.map(e => e.grupo).filter(Boolean))].sort();
  $('#groupList').innerHTML = groups.map(g => `<option value="${esc(g)}">`).join('');
}

function renderChips(base) {
  const box = $('#chips');
  box.hidden = !showsChips();
  if (box.hidden) return;
  const count = t => t ? base.filter(e => typeOf(e) === t).length : base.length;
  const chips = [['', 'Todas'], ['documentada', 'Documentadas'], ['informativa', 'Informativas'], ['pendiente', 'Pendientes']];
  box.innerHTML = chips.map(([value, label]) =>
    `<button type="button" class="chip${state.status === value ? ' is-active' : ''}" data-status="${value}" aria-pressed="${state.status === value}">
      ${value ? `<span class="dot dot-${value}"></span>` : ''}${label}<b>${count(value)}</b></button>`).join('');
}

function renderCards(list) {
  const terms = queryTerms();
  $('#resultsText').textContent = VIEWS[state.view].list;
  $('#resultsMeta').textContent = plural(list.length, 'resultado', 'resultados');
  $('#cards').hidden = !list.length;
  $('#cards').innerHTML = list.map(e => cardHtml(e, terms)).join('');
}

function cardHtml(e, terms) {
  const type = typeOf(e), checklist = classOf(e) === 'checklist', selected = e.id === state.selectedId;
  const badge = checklist
    ? '<span class="badge badge-checklist">Checklist</span>'
    : `<span class="badge badge-${type}">${TYPE_INFO[type].label}</span>`;
  const icons = [
    state.pinned.has(e.id) ? '<span class="card-pin" title="Fijado">★</span>' : '',
    e.imagen ? '<span title="Incluye imagen">▣</span>' : '',
    isSafeUrl(e.video) ? '<span title="Incluye video">▶</span>' : ''
  ].join('');
  let progress = '';
  if (checklist) {
    const total = stepsOf(e).length, done = doneSteps(e).size;
    if (total) progress = `<span class="card-progress"><span class="meter"><span style="width:${Math.round(done / total * 100)}%"></span></span><small>${done}/${total}</small></span>`;
  }
  return `<button type="button" class="card${selected ? ' is-selected' : ''}" data-id="${esc(e.id)}" role="option" aria-selected="${selected}">
    <span class="card-top"><span class="folio">${hl(e.folio || 'SIN FOLIO', terms)}</span>${badge}<span class="card-icons">${icons}</span></span>
    <span class="card-title">${hl(e.descripcion || 'Sin descripción', terms)}</span>
    <span class="card-sub">${hl(e.categoria || 'Sin categoría', terms)}</span>
    ${snippet(e, terms)}${progress}
  </button>`;
}

function renderEmpty(list) {
  const el = $('#empty');
  el.hidden = list.length > 0;
  if (list.length) return;
  const q = $('#search').value.trim();
  const filtered = q || $('#category').value || (state.status && showsChips());
  const message = filtered ? 'No encontramos coincidencias con esos filtros.' : VIEWS[state.view].empty;
  const newLabel = q ? `Registrar “${esc(q.length > 40 ? q.slice(0, 40) + '…' : q)}”` : 'Registrar entrada';
  el.innerHTML = `
    <div class="empty-icon">${state.view === 'unresolved' && !filtered ? '✓' : '⌕'}</div>
    <p>${esc(message)}</p>
    <div class="empty-actions">
      ${filtered ? '<button type="button" class="btn btn-ghost btn-sm" data-empty="clear">Limpiar filtros</button>' : ''}
      ${state.view !== 'pinned' ? `<button type="button" class="btn btn-primary btn-sm" data-empty="new">${newLabel}</button>` : ''}
    </div>`;
}

const copyBtn = value => `<button type="button" class="copy-btn" data-copy="${esc(value)}" title="Copiar" aria-label="Copiar">⧉</button>`;

function fieldView(label, value, { wide = false, copy = true } = {}) {
  const v = String(value ?? '').trim();
  return `<div class="field-view${wide ? ' is-wide' : ''}">
    <span class="field-view-label">${label}</span>
    <div class="field-view-value${v ? '' : ' is-empty'}"><span>${esc(v || 'No disponible')}</span>${v && copy ? copyBtn(v) : ''}</div>
  </div>`;
}

function textSection(title, text, { tone = '', empty = '' } = {}) {
  const v = String(text ?? '').trim();
  return `<section class="record-section">
    <div class="section-head"><h3>${title}</h3>${v ? copyBtn(v) : ''}</div>
    <div class="record-text ${tone}${v ? '' : ' is-blank'}">${esc(v || empty)}</div>
  </section>`;
}

function checklistSection(e) {
  const steps = stepsOf(e);
  if (!steps.length) {
    return textSection('Pasos', '', { empty: 'Este checklist aún no tiene pasos. Edita el registro y escribe un paso por línea.' });
  }
  const done = doneSteps(e), pct = Math.round(done.size / steps.length * 100);
  return `<section class="record-section">
    <div class="section-head">
      <h3>Pasos</h3><span class="progress-text">${done.size}/${steps.length}</span>
      <button type="button" class="btn btn-ghost btn-xs" data-act="reset-progress"${done.size ? '' : ' disabled'}>Reiniciar</button>
    </div>
    <div class="meter meter-lg"><span style="width:${pct}%"></span></div>
    <ol class="steps">${steps.map((s, i) => `
      <li><label class="step${done.has(i) ? ' is-done' : ''}">
        <input type="checkbox" data-step="${i}"${done.has(i) ? ' checked' : ''}>
        <span class="step-num">${i + 1}</span><span class="step-text">${esc(s)}</span>
      </label></li>`).join('')}
    </ol>
    ${done.size === steps.length ? '<div class="checklist-done">✓ Checklist completado</div>' : ''}
  </section>`;
}

let lastDetailId = null;

function renderDetail(entries) {
  const el = $('#detail'), e = entries.find(x => x.id === state.selectedId);
  document.body.classList.toggle('detail-open', !!e);
  if ((e?.id || null) !== lastDetailId) el.scrollTop = 0;
  lastDetailId = e?.id || null;

  if (!e) {
    el.innerHTML = `<div class="placeholder">
      <div class="placeholder-icon">◫</div>
      <h2>Selecciona un registro</h2>
      <p>Consulta los pasos, copia el texto para ServiceNow o completa la información faltante.</p>
      <p><kbd>↑</kbd> <kbd>↓</kbd> para moverte entre resultados</p>
    </div>`;
    return;
  }

  const type = typeOf(e), checklist = classOf(e) === 'checklist', pinned = state.pinned.has(e.id);
  const status = checklist
    ? '<span class="status status-checklist">Checklist operativo</span>'
    : `<span class="status status-${type}">${TYPE_INFO[type].long}</span>`;
  const main = checklist
    ? checklistSection(e)
    : textSection(type === 'informativa' ? 'Referencia de escalamiento' : 'Solución', e.solucion, {
        tone: 'tone-solution',
        empty: type === 'informativa'
          ? 'Esta entrada es una guía de referencia. Usa la categoría y el comentario para escalar el caso.'
          : 'Aún no hay una solución documentada. Si ya la conoces, edita el registro para agregarla.'
      });

  el.innerHTML = `<article class="record">
    <div class="record-head">
      <button type="button" class="icon-btn back-btn" data-act="close" aria-label="Volver a la lista">←</button>
      <div class="record-title">
        <div class="record-folio"><span>${esc(e.folio || 'SIN FOLIO')}</span>${e.folio ? copyBtn(e.folio) : ''}</div>
        <h2>${esc(e.descripcion || 'Sin descripción')}</h2>
      </div>
      ${status}
    </div>

    <div class="record-actions">
      <button type="button" class="btn btn-ghost btn-sm${pinned ? ' is-on' : ''}" data-act="pin" aria-pressed="${pinned}">${pinned ? '★ Fijado' : '☆ Fijar'}</button>
      <button type="button" class="btn btn-ghost btn-sm" data-act="copy-snow">⧉ Copiar para ServiceNow</button>
      ${/^INC\d+$/i.test(e.folio || '') ? '<button type="button" class="btn btn-ghost btn-sm" data-act="open-snow">↗ Abrir en ServiceNow</button>' : ''}
      <span class="spacer"></span>
      <button type="button" class="btn btn-danger-ghost btn-sm" data-act="delete">Eliminar</button>
      <button type="button" class="btn btn-ghost btn-sm" data-act="duplicate">Duplicar</button>
      <button type="button" class="btn btn-primary btn-sm" data-act="edit">Editar</button>
    </div>

    ${main}
    ${textSection('Comentarios / contexto', e.dialogo, { empty: 'No se agregó un comentario para este folio.' })}
    ${e.imagen && isSafeImage(e.imagen) ? `<section class="record-section"><div class="section-head"><h3>Imagen de referencia</h3></div>
      <button type="button" class="record-image" data-act="zoom" aria-label="Ampliar imagen"><img src="${e.imagen}" alt="Referencia: ${esc(e.descripcion)}"></button></section>` : ''}
    ${isSafeUrl(e.video) ? `<section class="record-section"><a class="video-link" href="${esc(e.video)}" target="_blank" rel="noopener noreferrer">▶ Ver video de solución</a></section>` : ''}

    <div class="record-grid">
      ${fieldView('Descripción breve', e.descripcion, { wide: true })}
      ${fieldView('Categoría', e.categoria, { wide: true })}
      ${fieldView('Grupo de asignación', groupOf(e))}
      ${fieldView('Clase', checklist ? 'Checklist operativo' : 'Solución / incidencia', { copy: false })}
      ${fieldView('Registrado', formatDate(e.createdAt), { copy: false })}
      ${fieldView('Última edición', e.updatedAt ? formatDate(e.updatedAt) : 'Sin cambios', { copy: false })}
    </div>
  </article>`;
}

/* ==========================================================================
   Acciones
   ========================================================================== */

function setHash(id) {
  try { history.replaceState(null, '', id ? `#${encodeURIComponent(id)}` : location.pathname + location.search); } catch { /* file:// restringido */ }
}

function select(id, { scroll = false } = {}) {
  state.selectedId = id || null;
  setHash(state.selectedId);
  render();
  if (scroll && id) $(`.card[data-id="${CSS.escape(id)}"]`)?.scrollIntoView({ block: 'nearest' });
}

function setView(view) {
  if (!VIEWS[view]) return;
  state.view = view;
  if (!showsChips()) state.status = '';
  const selected = currentEntry();
  if (selected && !inView(selected, view)) { state.selectedId = null; setHash(null); }
  document.body.classList.remove('menu-open');
  render();
}

function move(delta) {
  const list = state.visible;
  if (!list.length) return;
  const i = list.findIndex(e => e.id === state.selectedId);
  const next = i < 0 ? (delta > 0 ? 0 : list.length - 1) : Math.max(0, Math.min(list.length - 1, i + delta));
  select(list[next].id, { scroll: true });
}

function clearFilters() {
  $('#search').value = '';
  $('#category').value = '';
  state.status = '';
  render();
}

function togglePin(e) {
  state.pinned.has(e.id) ? state.pinned.delete(e.id) : state.pinned.add(e.id);
  store.set(KEYS.pinned, [...state.pinned]);
  render();
  toast(state.pinned.has(e.id) ? `${e.folio || 'Registro'} fijado.` : `${e.folio || 'Registro'} ya no está fijado.`);
}

function toggleStep(e, index, checked) {
  const done = doneSteps(e);
  checked ? done.add(index) : done.delete(index);
  if (done.size) state.progress[e.id] = [...done].sort((a, b) => a - b);
  else delete state.progress[e.id];
  store.set(KEYS.progress, state.progress);
  render();
  $(`[data-step="${index}"]`)?.focus();
  if (checked && done.size === stepsOf(e).length) toast('¡Checklist completado!');
}

function resetProgress(e) {
  const prev = state.progress[e.id];
  delete state.progress[e.id];
  store.set(KEYS.progress, state.progress);
  render();
  toast('Progreso reiniciado.', { action: { label: 'Deshacer', run() { state.progress[e.id] = prev; store.set(KEYS.progress, state.progress); render(); } } });
}

function removeEntry(e) {
  const snap = snapshot();
  const baseId = e.originalId || e.id;
  state.custom = state.custom.filter(x => x.id !== e.id);
  if (SEED_IDS.has(baseId)) state.hidden.add(baseId);
  state.pinned.delete(e.id);
  delete state.progress[e.id];
  if (!persistAll()) { restore(snap); return; }
  select(null);
  toast(`Se eliminó ${e.folio || 'el registro'}.`, {
    action: { label: 'Deshacer', run() { restore(snap); persistAll(); select(e.id, { scroll: true }); } }
  });
}

function snowText(e) {
  const lines = [`Folio: ${e.folio || 'SIN FOLIO'}`];
  if (e.categoria) lines.push(`Categoría: ${e.categoria}`);
  if (groupOf(e)) lines.push(`Grupo de asignación: ${groupOf(e)}`);
  lines.push(`Descripción: ${e.descripcion || ''}`);
  if (classOf(e) === 'checklist') {
    const steps = stepsOf(e), done = doneSteps(e);
    if (steps.length) lines.push('', `Checklist (${done.size}/${steps.length}):`, ...steps.map((s, i) => `[${done.has(i) ? 'x' : ' '}] ${s}`));
  } else if (e.solucion) {
    lines.push('', typeOf(e) === 'informativa' ? 'Referencia de escalamiento:' : 'Solución aplicada:', e.solucion.trim());
  }
  if (e.dialogo) lines.push('', 'Contexto:', e.dialogo.trim());
  if (isSafeUrl(e.video)) lines.push('', `Video: ${e.video}`);
  return lines.join('\n');
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch {
    const ta = Object.assign(document.createElement('textarea'), { value: text });
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.append(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { /* sin permiso */ }
    ta.remove();
    return ok;
  }
}

function flashCopy(button, ok) {
  button.textContent = ok ? '✓' : '!';
  button.classList.toggle('is-done', ok);
  setTimeout(() => { button.textContent = '⧉'; button.classList.remove('is-done'); }, 1100);
  if (!ok) toast('No se pudo copiar al portapapeles.', { kind: 'error' });
}

function openSnow(folio) {
  const base = store.raw(KEYS.snow);
  if (!base) {
    toast('Primero configura la URL de tu instancia de ServiceNow.', { action: { label: 'Configurar', run: () => openSettings('snow') } });
    return;
  }
  window.open(`${base}/incident_list.do?sysparm_query=number%3D${encodeURIComponent(folio)}`, '_blank', 'noopener');
}

function openLightbox(src) {
  if (!isSafeImage(src)) return;
  $('#lightboxImg').src = src;
  $('#lightbox').showModal();
}

/* ---------- Toasts y confirmaciones ---------- */

function toast(message, { kind = 'info', action = null } = {}) {
  const box = $('#toasts');
  if (!box) return;
  const el = document.createElement('div');
  el.className = `toast toast-${kind}`;
  el.setAttribute('role', kind === 'error' ? 'alert' : 'status');
  el.append(Object.assign(document.createElement('span'), { textContent: message }));

  let timer;
  const dismiss = () => {
    clearTimeout(timer);
    el.classList.add('is-leaving');
    setTimeout(() => { el.remove(); if (!box.children.length) try { box.hidePopover?.(); } catch { /* ok */ } }, 200);
  };
  if (action) {
    const b = Object.assign(document.createElement('button'), { type: 'button', className: 'toast-action', textContent: action.label });
    b.onclick = () => { dismiss(); action.run(); };
    el.append(b);
  }
  const close = Object.assign(document.createElement('button'), { type: 'button', className: 'toast-close', textContent: '×' });
  close.setAttribute('aria-label', 'Cerrar aviso');
  close.onclick = dismiss;
  el.append(close);

  box.append(el);
  while (box.children.length > 4) box.firstElementChild.remove();
  try {
    // Re-eleva los avisos a la capa superior para que se vean sobre los diálogos abiertos.
    if (box.matches(':popover-open')) box.hidePopover();
    box.showPopover?.();
  } catch { /* navegador sin popover */ }
  timer = setTimeout(dismiss, action ? 7000 : 3800);
}

function ask({ title, message, actions }) {
  const dlg = $('#ask'), box = $('#askActions');
  $('#askTitle').textContent = title;
  $('#askMessage').textContent = message;
  box.innerHTML = '';
  return new Promise(resolve => {
    let result = null;
    for (const a of actions) {
      const kind = a.kind === 'danger' ? 'btn-danger' : a.kind === 'primary' ? 'btn-primary' : 'btn-ghost';
      const b = Object.assign(document.createElement('button'), { type: 'button', className: `btn ${kind}`, textContent: a.label });
      b.onclick = () => { result = a.value; dlg.close(); };
      box.append(b);
    }
    dlg.addEventListener('close', () => resolve(result), { once: true });
    dlg.showModal();
    box.lastElementChild?.focus();
  });
}

/* ==========================================================================
   Formulario de registro
   ========================================================================== */

function contextPrefill(descripcion = '') {
  return {
    clase: state.view === 'checklists' ? 'checklist' : 'solucion',
    tipo: state.view === 'unresolved' ? 'pendiente' : 'documentada',
    descripcion
  };
}

function openEntryModal(e = null, { duplicate = false, prefill = contextPrefill() } = {}) {
  const f = $('#entryForm');
  f.reset();
  delete f.dataset.tipoTouched;
  state.editingId = e && !duplicate ? e.id : null;
  const src = e || prefill;

  $('#modalEyebrow').textContent = state.editingId ? 'Editar entrada' : duplicate ? 'Duplicar entrada' : 'Nueva entrada';
  $('#modalTitle').textContent = state.editingId ? (e.folio || 'Actualizar registro') : 'Documentar conocimiento';

  for (const k of TEXT_FIELDS) f.elements[k].value = src[k] || '';
  if (duplicate) f.elements.folio.value = '';
  f.elements.tipo.value = e ? typeOf(e) : (prefill.tipo || 'documentada');
  const clase = e ? classOf(e) : (prefill.clase || 'solucion');
  f.querySelector(`input[name="clase"][value="${clase}"]`).checked = true;

  state.pendingImage = isSafeImage(src.imagen) ? src.imagen : null;
  setPreview(state.pendingImage);
  updateClaseUI();
  updateFolioHint();
  state.formDirty = !!duplicate;

  $('#modal').showModal();
  (state.editingId ? f.elements.descripcion : f.elements.folio).focus();
}

async function closeEntryModal() {
  if (state.formDirty) {
    const discard = await ask({
      title: '¿Descartar cambios?',
      message: 'Tienes cambios sin guardar en este registro.',
      actions: [{ label: 'Seguir editando', value: false }, { label: 'Descartar', value: true, kind: 'danger' }]
    });
    if (!discard) return;
  }
  state.formDirty = false;
  $('#modal').close();
}

function updateClaseUI() {
  const checklist = $('#entryForm').elements.clase.value === 'checklist';
  const area = $('#entryForm').elements.solucion;
  $('#solucionLabel').textContent = checklist ? 'Pasos del checklist' : 'Solución detallada';
  $('#solucionHint').textContent = checklist
    ? 'Escribe un paso por línea. Se mostrarán como casillas para marcar el avance.'
    : 'Describe cómo se resolvió; un paso por línea facilita seguirlo.';
  area.placeholder = checklist ? 'Detener CEDIS\nEnviar inventario\nActivar recolección total' : 'Ej. Copiar la tabla TENDER de una tienda que funcione correctamente.';
}

function updateFolioHint() {
  const value = norm($('#entryForm').elements.folio.value.trim());
  const hint = $('#folioHint');
  const match = value && allEntries().find(x => norm(x.folio) === value && x.id !== state.editingId);
  hint.textContent = match ? `Ya existe un registro con este folio: “${match.descripcion || 'sin descripción'}”.` : '';
  hint.classList.toggle('is-warn', !!match);
}

function setPreview(image) {
  $('#imagePreview').hidden = !image;
  $('#dropEmpty').hidden = !!image;
  $('#imagePreviewImg').src = image || '';
}

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function compressImage(file) {
  const src = await readAsDataURL(file);
  if (file.type === 'image/gif') return src; // conserva la animación
  const img = await new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = src;
  });
  const scale = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  let out = canvas.toDataURL('image/webp', 0.85);
  if (!out.startsWith('data:image/webp')) out = canvas.toDataURL('image/jpeg', 0.85);
  return out.length < src.length ? out : src;
}

async function acceptImage(file) {
  if (!file) return;
  if (!/^image\/(png|jpe?g|webp|gif)$/.test(file.type)) { toast('Formato no compatible. Usa PNG, JPG, WEBP o GIF.', { kind: 'error' }); return; }
  if (file.size > (file.type === 'image/gif' ? 2 : 15) * 1024 * 1024) {
    toast(file.type === 'image/gif' ? 'El GIF supera 2 MB.' : 'La imagen supera 15 MB.', { kind: 'error' });
    return;
  }
  try {
    state.pendingImage = await compressImage(file);
    state.formDirty = true;
    setPreview(state.pendingImage);
  } catch {
    toast('No se pudo leer la imagen.', { kind: 'error' });
  }
}

function saveEntry(ev) {
  ev.preventDefault();
  const f = ev.currentTarget;
  if (!f.reportValidity()) return;

  const data = Object.fromEntries(new FormData(f));
  const obj = {};
  for (const k of TEXT_FIELDS) obj[k] = String(data[k] || '').trim();
  if (/^inc\d+$/i.test(obj.folio)) obj.folio = obj.folio.toUpperCase();
  obj.clase = data.clase === 'checklist' ? 'checklist' : 'solucion';
  obj.tipo = TYPES.includes(data.tipo) ? data.tipo : 'documentada';
  if (obj.video && !isSafeUrl(obj.video)) {
    toast('El video debe ser un enlace que empiece con http:// o https://', { kind: 'error' });
    f.elements.video.focus();
    return;
  }

  const prev = [...state.custom];
  let saved;
  if (state.editingId) {
    const current = allEntries().find(x => x.id === state.editingId);
    saved = { ...current, ...obj, updatedAt: Date.now() };
    if (state.pendingImage) saved.imagen = state.pendingImage; else delete saved.imagen;
    const idx = state.custom.findIndex(x => x.id === state.editingId);
    if (idx >= 0) state.custom[idx] = saved;
    else { saved.originalId = current.id; state.custom.unshift(saved); }
  } else {
    saved = { id: uid(), ...obj, createdAt: Date.now() };
    if (state.pendingImage) saved.imagen = state.pendingImage;
    state.custom.unshift(saved);
  }

  if (!store.set(KEYS.custom, state.custom)) { state.custom = prev; return; }

  state.formDirty = false;
  $('#modal').close();
  render();
  if (!state.visible.some(x => x.id === saved.id)) {
    $('#search').value = '';
    $('#category').value = '';
    state.status = '';
    if (!inView(saved, state.view)) state.view = saved.clase === 'checklist' ? 'checklists' : 'library';
  }
  select(saved.id, { scroll: true });
  toast(state.editingId ? 'Cambios guardados.' : 'Registro creado.');
  state.editingId = null;
}

/* ==========================================================================
   Respaldo y ajustes
   ========================================================================== */

function exportBackup() {
  const payload = {
    app: 'KBD', version: 2, exportedAt: new Date().toISOString(),
    entries: state.custom, hidden: [...state.hidden], pinned: [...state.pinned], progress: state.progress
  };
  const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: `kbd-respaldo-${new Date().toISOString().slice(0, 10)}.json` });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast(`Respaldo exportado con ${plural(state.custom.length, 'registro propio', 'registros propios')}.`);
}

async function importBackup(file) {
  let parsed;
  try { parsed = JSON.parse(await file.text()); } catch { toast('El archivo no es un JSON válido.', { kind: 'error' }); return; }
  const rawEntries = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.entries) ? parsed.entries : null;
  if (!rawEntries) { toast('El archivo no es un respaldo válido de KBD.', { kind: 'error' }); return; }

  const entries = sanitizeEntries(rawEntries);
  const extra = Array.isArray(parsed) ? {} : parsed;
  const mode = await ask({
    title: 'Importar respaldo',
    message: `El archivo contiene ${plural(entries.length, 'registro', 'registros')}. Puedes combinarlos con los actuales (los mismos folios editados se actualizan) o reemplazar todo lo que tienes guardado.`,
    actions: [
      { label: 'Cancelar', value: null },
      { label: 'Reemplazar todo', value: 'replace', kind: 'danger' },
      { label: 'Combinar', value: 'merge', kind: 'primary' }
    ]
  });
  if (!mode) return;

  const snap = snapshot();
  if (mode === 'replace') {
    state.custom = entries;
    state.hidden = new Set(stringList(extra.hidden));
    state.pinned = new Set(stringList(extra.pinned));
    state.progress = sanitizeProgress(extra.progress);
  } else {
    const byKey = new Map(state.custom.map(e => [e.originalId || e.id, e]));
    for (const e of entries) byKey.set(e.originalId || e.id, e);
    state.custom = [...byKey.values()];
    stringList(extra.hidden).forEach(id => state.hidden.add(id));
    stringList(extra.pinned).forEach(id => state.pinned.add(id));
    Object.assign(state.progress, sanitizeProgress(extra.progress));
  }
  if (!persistAll()) { restore(snap); persistAll(); return; }

  state.selectedId = null;
  render();
  toast(`Se importaron ${plural(entries.length, 'registro', 'registros')}.`, {
    action: { label: 'Deshacer', run() { restore(snap); persistAll(); render(); } }
  });
}

function applyTheme(theme) {
  if (!THEMES[theme]) theme = 'system';
  if (theme === 'system') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  store.setRaw(KEYS.theme, theme === 'system' ? '' : theme);
  $('#themeBtn').textContent = THEMES[theme];
  $('#settingsForm').elements.theme.value = theme;
}

function refreshSettingsInfo() {
  const bytes = Object.values(KEYS).reduce((n, k) => n + (store.raw(k).length + k.length) * 2, 0);
  $('#storageText').textContent = `${formatBytes(bytes)} de ~5 MB usados`;
  $('#storageMeter').style.width = `${Math.min(100, bytes / (5 * 1024 * 1024) * 100)}%`;
  $('#hiddenCount').textContent = state.hidden.size;
  $('#restoreHidden').disabled = !state.hidden.size;
  const withProgress = Object.keys(state.progress).length;
  $('#progressCount').textContent = withProgress;
  $('#resetAllProgress').disabled = !withProgress;
}

function openSettings(focus) {
  const f = $('#settingsForm');
  f.elements.snow.value = store.raw(KEYS.snow);
  f.elements.theme.value = store.raw(KEYS.theme) || 'system';
  refreshSettingsInfo();
  document.body.classList.remove('menu-open');
  $('#settings').showModal();
  if (focus) f.elements[focus]?.focus();
}

function saveSettings(ev) {
  ev.preventDefault();
  const value = ev.currentTarget.elements.snow.value.trim();
  if (value) {
    let url = null;
    try { url = new URL(value); } catch { /* inválida */ }
    if (!url || !/^https?:$/.test(url.protocol)) {
      toast('Escribe una URL válida, por ejemplo https://empresa.service-now.com', { kind: 'error' });
      return;
    }
    store.setRaw(KEYS.snow, url.origin);
  } else {
    store.setRaw(KEYS.snow, '');
  }
  $('#settings').close();
  toast('Ajustes guardados.');
}

/* ==========================================================================
   Eventos
   ========================================================================== */

function bindEvents() {
  // Navegación
  $$('.nav').forEach(n => n.addEventListener('click', () => setView(n.dataset.view)));
  $('#menuBtn').addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    $('#menuBtn').setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', ev => {
    if (document.body.classList.contains('menu-open') && (!ev.target.closest('.sidebar') || ev.target.closest('.side-action'))) {
      if (ev.target.closest('#menuBtn')) return;
      document.body.classList.remove('menu-open');
      $('#menuBtn').setAttribute('aria-expanded', 'false');
    }
  });

  // Acciones generales
  $('#newBtn').addEventListener('click', () => openEntryModal());
  $('#newTopBtn').addEventListener('click', () => openEntryModal());
  $('#exportBtn').addEventListener('click', exportBackup);
  $('#importInput').addEventListener('change', async ev => {
    const file = ev.target.files[0];
    ev.target.value = '';
    if (file) await importBackup(file);
  });
  $('#settingsBtn').addEventListener('click', () => openSettings());
  $('#themeBtn').addEventListener('click', () => {
    const order = ['system', 'light', 'dark'];
    applyTheme(order[(order.indexOf(store.raw(KEYS.theme) || 'system') + 1) % order.length]);
  });

  // Filtros
  $('#search').addEventListener('input', render);
  $('#category').addEventListener('change', render);
  $('#sort').addEventListener('change', () => { store.setRaw(KEYS.sort, $('#sort').value); render(); });
  $('#clearFilters').addEventListener('click', clearFilters);
  $('#chips').addEventListener('click', ev => {
    const chip = ev.target.closest('[data-status]');
    if (!chip) return;
    state.status = chip.dataset.status === state.status ? '' : chip.dataset.status;
    render();
  });
  $('#stats').addEventListener('click', ev => {
    const stat = ev.target.closest('[data-go]');
    if (stat) setView(stat.dataset.go);
  });

  // Lista
  $('#cards').addEventListener('click', ev => {
    const card = ev.target.closest('.card');
    if (card) select(card.dataset.id);
  });
  $('#empty').addEventListener('click', ev => {
    const btn = ev.target.closest('[data-empty]');
    if (!btn) return;
    if (btn.dataset.empty === 'clear') clearFilters();
    else openEntryModal(null, { prefill: contextPrefill($('#search').value.trim()) });
  });

  // Detalle
  $('#detail').addEventListener('click', async ev => {
    const copy = ev.target.closest('[data-copy]');
    if (copy) { flashCopy(copy, await copyText(copy.dataset.copy)); return; }
    const btn = ev.target.closest('[data-act]');
    const e = currentEntry();
    if (!btn || !e) return;
    switch (btn.dataset.act) {
      case 'close': select(null); break;
      case 'pin': togglePin(e); break;
      case 'copy-snow':
        if (await copyText(snowText(e))) toast('Texto copiado. Pégalo en las notas de trabajo de ServiceNow.');
        else toast('No se pudo copiar al portapapeles.', { kind: 'error' });
        break;
      case 'open-snow': openSnow(e.folio); break;
      case 'edit': openEntryModal(e); break;
      case 'duplicate': openEntryModal(e, { duplicate: true }); break;
      case 'delete': removeEntry(e); break;
      case 'reset-progress': resetProgress(e); break;
      case 'zoom': openLightbox(e.imagen); break;
    }
  });
  $('#detail').addEventListener('change', ev => {
    const box = ev.target.closest('[data-step]');
    const e = currentEntry();
    if (box && e) toggleStep(e, Number(box.dataset.step), box.checked);
  });

  // Formulario
  const form = $('#entryForm'), modal = $('#modal');
  form.addEventListener('submit', saveEntry);
  form.addEventListener('input', ev => {
    state.formDirty = true;
    if (ev.target.name === 'folio') updateFolioHint();
    if (ev.target.name === 'tipo') form.dataset.tipoTouched = '1';
    // Al escribir la solución de un pendiente, se marca como documentada salvo que el usuario haya elegido el estado.
    if (ev.target.name === 'solucion' && ev.target.value.trim() && form.elements.tipo.value === 'pendiente' && !form.dataset.tipoTouched) {
      form.elements.tipo.value = 'documentada';
    }
  });
  form.addEventListener('change', ev => { if (ev.target.name === 'clase') updateClaseUI(); });
  $$('[data-close]', modal).forEach(b => b.addEventListener('click', closeEntryModal));
  modal.addEventListener('cancel', ev => { ev.preventDefault(); closeEntryModal(); });
  modal.addEventListener('keydown', ev => {
    if ((ev.ctrlKey || ev.metaKey) && (ev.key === 'Enter' || ev.key.toLowerCase() === 's')) {
      ev.preventDefault();
      form.requestSubmit();
    }
  });
  modal.addEventListener('paste', ev => {
    const item = [...(ev.clipboardData?.items || [])].find(i => i.kind === 'file' && i.type.startsWith('image/'));
    if (!item) return;
    ev.preventDefault();
    acceptImage(item.getAsFile());
  });

  const drop = $('#dropzone');
  $('#pickImage').addEventListener('click', () => $('#imageInput').click());
  drop.addEventListener('keydown', ev => {
    if ((ev.key === 'Enter' || ev.key === ' ') && ev.target === drop) { ev.preventDefault(); $('#imageInput').click(); }
  });
  $('#imageInput').addEventListener('change', ev => { acceptImage(ev.target.files[0]); ev.target.value = ''; });
  $('#removeImage').addEventListener('click', () => { state.pendingImage = null; state.formDirty = true; setPreview(null); });
  drop.addEventListener('dragover', ev => { ev.preventDefault(); drop.classList.add('is-over'); });
  drop.addEventListener('dragleave', () => drop.classList.remove('is-over'));
  drop.addEventListener('drop', ev => {
    ev.preventDefault();
    drop.classList.remove('is-over');
    acceptImage(ev.dataTransfer.files[0]);
  });

  // Ajustes
  const settings = $('#settings');
  $('#settingsForm').addEventListener('submit', saveSettings);
  $$('[data-dismiss]', settings).forEach(b => b.addEventListener('click', () => settings.close()));
  $('#settingsForm').elements.theme.addEventListener('change', ev => applyTheme(ev.target.value));
  $('#restoreHidden').addEventListener('click', () => {
    const n = state.hidden.size;
    state.hidden.clear();
    store.set(KEYS.hidden, []);
    refreshSettingsInfo();
    render();
    toast(`Se restauraron ${plural(n, 'registro', 'registros')} de ejemplo.`);
  });
  $('#resetAllProgress').addEventListener('click', () => {
    const prev = state.progress;
    state.progress = {};
    store.set(KEYS.progress, state.progress);
    refreshSettingsInfo();
    render();
    toast('Se reinició el progreso de todos los checklists.', {
      action: { label: 'Deshacer', run() { state.progress = prev; store.set(KEYS.progress, prev); render(); } }
    });
  });

  $('#lightbox').addEventListener('click', () => $('#lightbox').close());

  // Teclado
  document.addEventListener('keydown', onKeydown);
  window.addEventListener('hashchange', () => { if (selectFromHash()) render(); });
}

function onKeydown(ev) {
  if (document.querySelector('dialog[open]')) return;
  const target = ev.target, search = $('#search');
  const typing = target.closest?.('input, textarea, select, [contenteditable="true"]');

  if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'k') { ev.preventDefault(); search.focus(); search.select(); return; }

  if (target === search) {
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') { ev.preventDefault(); move(ev.key === 'ArrowDown' ? 1 : -1); }
    else if (ev.key === 'Enter' && state.visible.length) { ev.preventDefault(); select(state.selectedId && state.visible.some(e => e.id === state.selectedId) ? state.selectedId : state.visible[0].id, { scroll: true }); }
    else if (ev.key === 'Escape' && search.value) { search.value = ''; render(); }
    return;
  }

  if (ev.key === 'Escape') {
    if (document.body.classList.contains('menu-open')) document.body.classList.remove('menu-open');
    else if (state.selectedId) select(null);
    return;
  }
  if (typing || ev.ctrlKey || ev.metaKey || ev.altKey) return;

  const e = currentEntry();
  switch (ev.key) {
    case '/': ev.preventDefault(); search.focus(); break;
    case 'n': case 'N': ev.preventDefault(); openEntryModal(); break;
    case 'ArrowDown': case 'j': ev.preventDefault(); move(1); break;
    case 'ArrowUp': case 'k': ev.preventDefault(); move(-1); break;
    case 'e': case 'E': if (e) { ev.preventDefault(); openEntryModal(e); } break;
    case 'p': case 'P': if (e) { ev.preventDefault(); togglePin(e); } break;
  }
}

function selectFromHash() {
  let hash = '';
  try { hash = decodeURIComponent(location.hash.slice(1)); } catch { return false; }
  if (!hash || hash === state.selectedId) return false;
  const entries = allEntries();
  const e = entries.find(x => x.id === hash) || entries.find(x => norm(x.folio) === norm(hash));
  if (!e) return false;
  state.selectedId = e.id;
  if (!inView(e, state.view)) state.view = classOf(e) === 'checklist' ? 'checklists' : 'library';
  return true;
}

/* ==========================================================================
   Inicio
   ========================================================================== */

(function init() {
  applyTheme(store.raw(KEYS.theme) || 'system');
  const sort = store.raw(KEYS.sort);
  if (['relevance', 'recent', 'folio'].includes(sort)) $('#sort').value = sort;
  bindEvents();
  selectFromHash();
  render();
})();
