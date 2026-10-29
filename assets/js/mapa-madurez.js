/* mapa-madurez.js — Mapa de Madurez Digital animado (spec 017)
 * - Estado por defecto: todo visible (sin JS el mapa se ve completo).
 * - Momento autoral: al entrar en vista, el camino se "arma" y se traza una vez.
 * - Selector "¿Dónde está tu negocio hoy?": traza hasta la estación elegida y
 *   muestra el panel (textos ya renderizados e i18n-eados por Liquid/i18n.js).
 * - prefers-reduced-motion: sin trazo, fundido de 150 ms.
 */
(function () {
  'use strict';

  var root = document.getElementById('mapa-madurez');
  if (!root) return;

  var map = root.querySelector('[data-mm-map]');
  var select = root.querySelector('[data-mm-select]');
  var stations = Array.prototype.slice.call(root.querySelectorAll('[data-mm-station]'));
  var picks = Array.prototype.slice.call(root.querySelectorAll('[data-mm-pick]'));
  var panels = Array.prototype.slice.call(root.querySelectorAll('[data-mm-panel]'));
  var resetBtn = root.querySelector('[data-mm-reset]');
  if (!map || !stations.length) return;

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var STEP_MS = 360;
  var wide = window.matchMedia ? window.matchMedia('(min-width: 900px)') : null;

  // ── Selector (solo existe con JS: se muestra aquí) ─────────────────────
  if (select) select.hidden = false;

  function indexOfSlug(slug) {
    for (var i = 0; i < stations.length; i++) {
      if (stations[i].getAttribute('data-mm-station') === slug) return i;
    }
    return -1;
  }

  function select_(slug) {
    var k = slug ? indexOfSlug(slug) : -1;
    // Al elegir, el trazo inicial ya no manda: sin retardos escalonados, el redibujo responde de inmediato.
    root.classList.add('mm--interactive');
    stations.forEach(function (st, i) {
      var seg = st.querySelector('.mm__seg-fill');
      if (seg) seg.classList.toggle('is-undrawn', k !== -1 && i >= k);
      st.classList.toggle('is-selected', k !== -1 && i === k);
      st.classList.toggle('is-dim', k !== -1 && i !== k);
      // La entrada (WhatsApp, idx 0) es transversal: nunca se marca como "pasada".
      st.classList.toggle('is-past', k !== -1 && i > 0 && i < k);
      st.classList.toggle('is-ahead', k !== -1 && i > k);
    });
    picks.forEach(function (b) {
      b.setAttribute('aria-pressed', k !== -1 && b.getAttribute('data-mm-pick') === slug ? 'true' : 'false');
    });
    panels.forEach(function (p) {
      p.hidden = !(k !== -1 && p.getAttribute('data-mm-panel') === slug);
    });
    if (resetBtn) resetBtn.hidden = k === -1;
    // En móvil (<900px) el panel queda bajo las opciones: llevar la vista hasta él.
    if (k !== -1 && wide && !wide.matches) {
      var panelWrap = root.querySelector('[data-mm-panel-wrap]');
      if (panelWrap) {
        panelWrap.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
      }
    }
  }

  var current = null;
  picks.forEach(function (b) {
    b.addEventListener('click', function () {
      var slug = b.getAttribute('data-mm-pick');
      current = current === slug ? null : slug; // pulsar de nuevo = restablecer
      select_(current);
    });
  });
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      current = null;
      select_(null);
      if (picks[0]) picks[0].focus();
    });
  }

  // ── Momento autoral: "El camino se traza" (una sola vez) ───────────────
  var played = false;
  function play() {
    if (played) return;
    played = true;
    if (reduced) {
      root.classList.add('mm--fade');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          root.classList.add('mm--fade-in');
          root.classList.remove('mm--fade');
        });
      });
      return;
    }
    root.classList.add('mm--arm');
    void map.offsetWidth; // fija el estado armado antes de soltarlo
    requestAnimationFrame(function () {
      root.classList.add('mm--play');
      root.classList.remove('mm--arm');
      window.setTimeout(function () {
        root.classList.remove('mm--play');
      }, STEP_MS * stations.length + 700);
    });
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { io.disconnect(); play(); }
      });
    }, { threshold: 0.25 });
    io.observe(map);
  }
  // Sin IntersectionObserver: se queda el estado por defecto (todo visible).
})();
