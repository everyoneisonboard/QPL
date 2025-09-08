// =====================
// Utilidades
// =====================
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// =====================
// Navegación móvil
// =====================
(() => {
  const toggle = $('.nav-toggle');
  const nav = $('#mainNav') || $('.nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
})();

// =====================
// Back to top
// =====================
(() => {
  const backBtn   = $('#backtop');
  const footerBtn = $('#footerBackTop');
  const onScroll  = () => backBtn && backBtn.classList.toggle('show', window.scrollY > 400);
  if (backBtn) {
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  if (footerBtn) {
    footerBtn.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }
})();

// =====================
// Smooth scroll anclas internas
// =====================
(() => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
      const nav = $('#mainNav') || $('.nav');
      if (nav) nav.classList.remove('open');
    });
  });
})();

// =====================
// Botón WhatsApp del form
// =====================
(() => {
  const btn = $('#btnWhatsapp');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const f = $('#quoteForm');
    const get = (name) => f?.querySelector(`[name="${name}"]`)?.value?.trim() || '';

    const name = get('name');
    const origin = get('origin');
    const destination = get('destination');
    const petType = get('petType');
    const weight = get('weight');
    const crate = get('crate');
    const date = get('date');
    const message = get('message');

    const parts = [
      'Hola, quiero cotizar el traslado de mi mascota.',
      name ? `\n• Nombre: ${name}` : '',
      petType ? `\n• Tipo: ${petType}` : '',
      origin ? `\n• Origen: ${origin}` : '',
      destination ? `\n• Destino: ${destination}` : '',
      weight ? `\n• Peso (mascota+jaula): ${weight} kg` : '',
      crate ? `\n• Jaula (LxAxH): ${crate}` : '',
      date ? `\n• Fecha estimada: ${date}` : '',
      message ? `\n• Detalles: ${message}` : ''
    ];

    const text = encodeURIComponent(parts.join(''));
    const phone = '18095203331';
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  });
})();

// =====================
// Tabs scopeadas (Requisitos / Servicios)
// =====================
function initTabsScoped(rootSelector) {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const tabs   = [...root.querySelectorAll('.tab-btn')];
  const panels = [...root.querySelectorAll('.panel')];
  if (!tabs.length || !panels.length) return;

  const first = tabs[0]?.dataset.target || null;

  const show = (id) => {
    if (!id) return;
    tabs.forEach(b => b.setAttribute('aria-selected', String(b.dataset.target === id)));
    panels.forEach(p => p.classList.toggle('active', p.id === id));
  };

  const openFromHash = () => {
    const id = (location.hash || '').slice(1);
    show(root.querySelector('#' + id) ? id : first);
  };

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.target;
      if (!id) return;
      history.replaceState(null, '', '#' + id);
      show(id);
    });
  });

  window.addEventListener('hashchange', openFromHash);
  openFromHash();
}

initTabsScoped('#requisitos-destino');
initTabsScoped('#servicios');   // si lo necesitas en servicios.html
