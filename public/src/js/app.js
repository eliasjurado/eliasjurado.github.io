/* ==========================================================================
   Mis Cosas — App Logic
   ========================================================================== */

// ---- Data (from inventory.csv) ----
const WHATSAPP_NUMBER = '51920050617';

const items = [
  {
    id: 1,
    name: 'Juego de Comedor - 6 Sillas',
    description: 'La mesa tiene una base de cedro y un vidrio biselado de 1.25 metros de diámetro. Cuenta con 6 sillas también de cedro.',
    price: 3500,
    image: 'images/1.webp',
    status: 'available'
  },
  {
    id: 2,
    name: 'Sofá Seccional en L',
    description: 'Sofá de dos cuerpos en L con cojines removibles en color blanco hueso.',
    price: 2500,
    image: 'images/2.jpeg',
    status: 'available'
  }
];

// ---- Helpers ----
function formatPrice(amount) {
  return amount.toLocaleString('es-PE');
}

function buildWhatsAppURL(itemName) {
  const message = `¡Hola! Vi que tienes disponible "${itemName}" y me interesa. ¿Podemos hablar?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ---- Render Items ----
function renderItems() {
  const grid = document.getElementById('items-grid');
  if (!grid) return;

  grid.innerHTML = items.map(item => {
    const isSold = item.status === 'sold';
    return `
      <article class="card fade-in" data-id="${item.id}">
        <div class="card__image-container">
          <img
            class="card__image"
            src="${item.image}"
            alt="${item.name}"
            loading="lazy"
          >
          ${isSold
            ? '<span class="card__badge" style="background:#6b7280;">Vendido</span>'
            : '<span class="card__badge">Disponible</span>'
          }
        </div>
        <div class="card__body">
          <h3 class="card__name">${item.name}</h3>
          <p class="card__description">${item.description}</p>
          <div class="card__footer">
            <div class="card__price">
              <span class="card__price-current">S/ ${formatPrice(item.price)}</span>
              <span class="card__price-currency">PEN (Soles)</span>
            </div>
            ${!isSold
              ? `<a href="${buildWhatsAppURL(item.name)}" class="card__cta" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>`
              : '<span class="card__cta" style="background:#9ca3af;cursor:default;">Vendido</span>'
            }
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ---- Scroll Animations ----
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ---- Header Scroll Effect ----
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 10) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ---- Smooth Scroll for anchor links ----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = document.getElementById('header')?.offsetHeight || 64;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  renderItems();
  initScrollAnimations();
  initHeaderScroll();
  initSmoothScroll();
});
