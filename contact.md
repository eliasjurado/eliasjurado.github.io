---
title: Contacto
permalink: /contact/
kicker: Conversemos
subtitle: La forma más rápida de empezar es escribirme. Te respondo en menos de 24 horas en días hábiles.
i18n_prefix: contact
---

## <span data-i18n-en="How to reach me">Por dónde escribirme</span>

<div class="grid grid--2 contact-grid">
  <div class="card"
       data-wa-number="{{ site.contact.whatsapp }}"
       data-wa-base="{{ site.whatsapp_messages.contacto }}">
    <div class="card__icon" aria-hidden="true">💬</div>
    <h3 class="card__title">WhatsApp</h3>
    <p class="card__body">{{ site.contact.phone }}</p>
    <form class="wa-form" id="wa-contact-form" onsubmit="return false;">
      <div class="wa-form__field">
        <label for="wa-nombre" data-i18n-en="Your name">Tu nombre</label>
        <input id="wa-nombre" type="text" placeholder="Ej. María García" data-i18n-attr-placeholder="contact.name_placeholder" autocomplete="given-name" maxlength="80">
      </div>
      <div class="wa-form__field">
        <label for="wa-empresa" data-i18n-en-html="Company or business <span class='contact-optional'>(optional)</span>">Empresa o emprendimiento <span class="contact-optional">(opcional)</span></label>
        <input id="wa-empresa" type="text" placeholder="Ej. Estudio Nómada" data-i18n-attr-placeholder="contact.company_placeholder" autocomplete="organization" maxlength="80">
      </div>
      <div class="wa-form__submit">
        <button type="submit" class="btn btn--primary contact-wa-btn" id="wa-open-btn" data-i18n-en="Open conversation →">
          Abrir conversación →
        </button>
      </div>
    </form>
  </div>

  <a href="mailto:{{ site.contact.email }}" class="card contact-email-card">
    <div class="card__icon" aria-hidden="true">✉️</div>
    <h3 class="card__title" data-i18n-en="Email">Correo</h3>
    <p class="card__body">{{ site.contact.email }}</p>
    <p class="contact-email-link" data-i18n-en="Send email →">Enviar correo →</p>
  </a>
</div>

## <span data-i18n-en="What happens after you write to me?">¿Qué pasa después de escribirme?</span>

1. <strong data-i18n-en="I reply within 24 business hours">Respondo en menos de 24 horas hábiles</strong> <span data-i18n-en="with concrete questions to understand what you need.">con preguntas concretas para entender qué necesitas.</span>
2. <strong data-i18n-en="We schedule a 30-minute call">Coordinamos un llamado de 30 minutos</strong> <span data-i18n-en="with no commitment. I ask you, you ask me. If we fit, we continue.">sin compromiso. Te pregunto, tú me preguntas. Si encajamos, seguimos.</span>
3. <strong data-i18n-en="I send you a written proposal">Te mando una propuesta por escrito</strong> <span data-i18n-en="with scope, milestones, timeline and cost. Valid for 15 days.">con alcance, hitos, tiempos y costo. Vigencia 15 días.</span>
4. <strong data-i18n-en="If you sign, we start.">Si firmas, arrancamos.</strong> <span data-i18n-en="The first milestone is invoiced to secure the schedule; the rest is released against deliveries.">El primer hito se factura para asegurar el cronograma; el resto se libera contra entregas.</span>

## <span data-i18n-en="Location">Ubicación</span>

<p data-i18n-en="{{ site.contact.city }}. Remote work with clients across LATAM.">{{ site.contact.city }}. Trabajo remoto con clientes de toda LATAM.</p>

<script>
(function () {
  var form   = document.getElementById('wa-contact-form');
  var btn    = document.getElementById('wa-open-btn');
  var card   = form.closest('[data-wa-number]');
  var number = card.dataset.waNumber;
  var base   = card.dataset.waBase;

  btn.addEventListener('click', function () {
    var nombre  = document.getElementById('wa-nombre').value.trim();
    var empresa = document.getElementById('wa-empresa').value.trim();

    var intro = '';
    if (nombre && empresa) {
      intro = 'Hola Elías, soy ' + nombre + ' de ' + empresa + '. ';
    } else if (nombre) {
      intro = 'Hola Elías, soy ' + nombre + '. ';
    }

    var mensaje = intro + base.replace(/^Hola Elías[,.]?\s*/i, '');
    var url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(mensaje);
    window.open(url, '_blank', 'noopener,noreferrer');
  });
})();
</script>

<style>
  .contact-grid {
    margin-bottom: 3rem;
  }

  .contact-wa-btn {
    width: 100%;
  }

  .contact-email-card {
    text-decoration: none;
    color: inherit;
  }

  .contact-email-link {
    margin-top: 1rem;
    color: #000;
    font-size: 0.9rem;
  }

  .contact-optional {
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0;
  }

  @media (max-width: 767px) {
    .contact-email-card {
      text-align: center;
    }

    .contact-email-link {
      margin-top: 0.8rem;
    }
  }
</style>
