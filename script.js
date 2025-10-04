// script.js
// Minimal interactivity: mobile nav toggle, testimonial carousel, year in footer.

document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile navigation toggle
  const navToggle = document.getElementById('nav-toggle');
  const siteHeader = document.getElementById('site-header');
  navToggle && navToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', (!expanded).toString());
    document.documentElement.classList.toggle('nav-open');
  });

  // Close mobile nav on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      document.documentElement.classList.remove('nav-open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Simple testimonials carousel
  (function () {
    const carousel = document.getElementById('testimonial-carousel');
    if (!carousel) return;
    const slides = Array.from(carousel.querySelectorAll('.testimonial'));
    let index = 0;
    const total = slides.length;

    // position slides horizontally via transform
    function update() {
      slides.forEach((s, i) => {
        s.style.transform = `translateX(${(i - index) * 100}%)`;
        s.style.transition = 'transform 450ms ease';
      });
    }
    update();

    // next/prev buttons
    const btnNext = document.querySelector('.tnext');
    const btnPrev = document.querySelector('.tprev');
    btnNext && btnNext.addEventListener('click', () => {
      index = (index + 1) % total;
      update();
      resetAuto();
    });
    btnPrev && btnPrev.addEventListener('click', () => {
      index = (index - 1 + total) % total;
      update();
      resetAuto();
    });

    // Auto-play
    let auto = setInterval(() => {
      index = (index + 1) % total;
      update();
    }, 6000);

    function resetAuto() {
      clearInterval(auto);
      auto = setInterval(() => {
        index = (index + 1) % total;
        update();
      }, 6000);
    }

    // accessibility: allow left/right arrow navigation when focused
    carousel.tabIndex = 0;
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { index = (index - 1 + total) % total; update(); resetAuto(); }
      if (e.key === 'ArrowRight') { index = (index + 1) % total; update(); resetAuto(); }
    });
  })();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 72; // adjust for fixed header
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});
