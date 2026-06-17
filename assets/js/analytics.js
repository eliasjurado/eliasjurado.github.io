/* ----------------------------------------------------------------------------
 * analytics.js — tracking minimo de eventos comerciales
 *
 * Eventos actuales:
 * - click_whatsapp
 * - click_email
 * - click_cta_services
 * - lang_switch (invocado desde i18n.js)
 *
 * El script no falla si GA4 no esta cargado.
 * Si gtag existe, envia eventos; si no, hace no-op silencioso.
 * -------------------------------------------------------------------------- */
(function () {
  'use strict';

  function trackEvent(eventName, params) {
    if (!eventName) return;
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params || {});
      return;
    }
    if (Array.isArray(window.dataLayer)) {
      var payload = { event: eventName };
      var key;
      var source = params || {};
      for (key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          payload[key] = source[key];
        }
      }
      window.dataLayer.push(payload);
    }
  }

  function bindClicks() {
    document.addEventListener('click', function (event) {
      var link = event.target.closest('a');
      if (!link) return;

      var href = link.getAttribute('href') || '';
      if (!href) return;

      if (href.indexOf('wa.me/') !== -1) {
        trackEvent('click_whatsapp', {
          link_href: href,
          page_path: window.location.pathname
        });
        return;
      }

      if (href.indexOf('mailto:') === 0) {
        trackEvent('click_email', {
          link_href: href,
          page_path: window.location.pathname
        });
        return;
      }

      if (href === '/services/' || href.indexOf('/services/?') === 0) {
        trackEvent('click_cta_services', {
          link_href: href,
          page_path: window.location.pathname
        });
      }
    });
  }

  // API publica para usar desde otros scripts (ej. i18n.js)
  window.eliasTrackEvent = trackEvent;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindClicks);
  } else {
    bindClicks();
  }
})();
