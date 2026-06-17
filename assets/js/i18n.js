/* ----------------------------------------------------------------------------
 * i18n.js — switcher de idioma ES/EN para eliasjurado.com
 *
 * - Diccionario cargado desde <script id="i18n-data" type="application/json">.
 * - Idioma inicial: localStorage > navigator.language (es-* → ES, otro → EN) > ES.
 * - Persiste preferencia en localStorage bajo "eliasjurado_lang".
 * - Reemplaza textContent de [data-i18n="key.subkey"] al cambiar idioma.
 * - Soporta atributos especiales:
 *     data-i18n-attr-placeholder, data-i18n-attr-aria-label, data-i18n-attr-title
 *   con valor "key.subkey".
 * - Expone window.eliasI18n con .setLang(lang) y .getLang() para integraciones.
 * -------------------------------------------------------------------------- */
(function () {
  'use strict';

  var STORAGE_KEY = 'eliasjurado_lang';
  var DEFAULT_LANG = 'es';
  var SUPPORTED = ['es', 'en'];

  // ── Cargar diccionario embebido ──────────────────────────────────────────
  var dictEl = document.getElementById('i18n-data');
  if (!dictEl) {
    console.warn('[i18n] No se encontró <script id="i18n-data">. Switcher inactivo.');
    return;
  }
  var dict;
  try {
    dict = JSON.parse(dictEl.textContent);
  } catch (e) {
    console.error('[i18n] Diccionario inválido:', e);
    return;
  }

  // ── Resolver una clave "nav.home" → "Inicio" / "Home" ───────────────────
  function lookup(key, lang) {
    var parts = key.split('.');
    var node = dict;
    for (var i = 0; i < parts.length; i++) {
      if (!node || typeof node !== 'object') return null;
      node = node[parts[i]];
    }
    if (!node) return null;
    if (typeof node === 'object' && node[lang]) return node[lang];
    return null;
  }

  // ── Detectar idioma inicial ──────────────────────────────────────────────
  function detectLang() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* private mode */ }
    if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;

    var nav = (navigator.language || navigator.userLanguage || DEFAULT_LANG).toLowerCase();
    if (nav.indexOf('es') === 0) return 'es';
    return 'en';
  }

  // ── Aplicar traducción a todo el DOM ────────────────────────────────────
  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;

    // 1. textContent: [data-i18n="key"]
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      var val = lookup(key, lang);
      if (val !== null) nodes[i].textContent = val;
    }

    // 2. atributos especiales: data-i18n-attr-X="key"
    var attrSelectors = ['placeholder', 'aria-label', 'title', 'alt'];
    for (var a = 0; a < attrSelectors.length; a++) {
      var attr = attrSelectors[a];
      var attrNodes = document.querySelectorAll('[data-i18n-attr-' + attr + ']');
      for (var j = 0; j < attrNodes.length; j++) {
        var akey = attrNodes[j].getAttribute('data-i18n-attr-' + attr);
        var aval = lookup(akey, lang);
        if (aval !== null) attrNodes[j].setAttribute(attr, aval);
      }
    }

    // 3. Patrón data-i18n-en/data-i18n-es para contenido dinámico desde YAML bilingüe
    //    Soporta dos variantes:
    //    - data-i18n-en       → reemplaza con textContent (texto plano, escape automático)
    //    - data-i18n-en-html  → reemplaza con innerHTML  (permite <strong>, <a>, etc.)
    var bilingueNodes = document.querySelectorAll('[data-i18n-en], [data-i18n-en-html]');
    for (var b = 0; b < bilingueNodes.length; b++) {
      var node = bilingueNodes[b];
      var isHtml = node.hasAttribute('data-i18n-en-html');
      var enAttr = isHtml ? 'data-i18n-en-html' : 'data-i18n-en';
      var esAttr = isHtml ? 'data-i18n-es-html' : 'data-i18n-es';
      // Guardar el original ES la primera vez
      if (!node.hasAttribute(esAttr)) {
        node.setAttribute(esAttr, isHtml ? node.innerHTML.trim() : node.textContent.trim());
      }
      var targetText = lang === 'en'
        ? node.getAttribute(enAttr)
        : node.getAttribute(esAttr);
      if (targetText) {
        if (isHtml) node.innerHTML = targetText;
        else node.textContent = targetText;
      }
    }

    // 4. actualizar <html lang>
    document.documentElement.setAttribute('lang', lang);

    // 5. actualizar estado activo del toggle
    var toggles = document.querySelectorAll('[data-lang-toggle] [data-lang]');
    for (var k = 0; k < toggles.length; k++) {
      var t = toggles[k];
      if (t.getAttribute('data-lang') === lang) {
        t.classList.add('is-active');
        t.setAttribute('aria-pressed', 'true');
      } else {
        t.classList.remove('is-active');
        t.setAttribute('aria-pressed', 'false');
      }
    }

    // 6. persistir
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
  }

  // ── Bind clicks al toggle ───────────────────────────────────────────────
  function bindToggle() {
    var toggles = document.querySelectorAll('[data-lang-toggle]');
    if (!toggles.length) return;
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener('click', function (e) {
        var btn = e.target.closest('[data-lang]');
        if (!btn) return;
        e.preventDefault();
        var lang = btn.getAttribute('data-lang');
        if (SUPPORTED.indexOf(lang) === -1) return;
        var currentLang = document.documentElement.getAttribute('lang') || detectLang();
        applyLang(lang);
        if (currentLang !== lang && typeof window.eliasTrackEvent === 'function') {
          window.eliasTrackEvent('lang_switch', {
            from_lang: currentLang,
            to_lang: lang,
            page_path: window.location.pathname
          });
        }
      });
    }
  }

  // ── API pública ──────────────────────────────────────────────────────────
  window.eliasI18n = {
    setLang: applyLang,
    getLang: function () {
      try { return localStorage.getItem(STORAGE_KEY) || detectLang(); }
      catch (e) { return detectLang(); }
    },
    lookup: lookup
  };

  // ── Bootstrap ────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    bindToggle();
    applyLang(detectLang());
  });

  // Si el DOM ya está parseado al llegar el script (defer), boot ahora
  if (document.readyState !== 'loading') {
    bindToggle();
    applyLang(detectLang());
  }
})();
