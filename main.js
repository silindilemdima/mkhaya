// Mkhaya — main interactivity script
(function () {
  // ===== Mobile hamburger =====
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    // Close on link click
    mobileMenu.querySelectorAll('a:not(.dropdown-menu-mobile a):not(.no-close), .dropdown-menu-mobile a').forEach((a) => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }

  // ===== Dropdowns (Order Online) — click toggle for desktop + mobile =====
  document.querySelectorAll('.dropdown').forEach((dd) => {
    const toggle = dd.querySelector('.dropdown-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // close other dropdowns
      document.querySelectorAll('.dropdown.open').forEach((o) => { if (o !== dd) o.classList.remove('open'); });
      dd.classList.toggle('open');
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown.open').forEach((o) => o.classList.remove('open'));
    }
  });

  // ===== Active nav link based on current path =====
  const path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  document.querySelectorAll('.nav-link, .mobile-menu a').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;
    const norm = href.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
    if (norm === path || (norm === '/' && (path === '/' || path === ''))) {
      a.classList.add('active');
    }
  });

  // ===== Scroll reveal =====
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add('is-visible'));
  }

  // ===== Catering form =====
  const form = document.querySelector('#catering-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const card = form.closest('.cat-form-card');
      if (card) {
        form.style.display = 'none';
        const ok = document.createElement('div');
        ok.className = 'form-success';
        ok.innerHTML = '<p style="font-weight:600;color:var(--foreground)">Thank you! We\'ve received your enquiry and will contact you soon.</p>';
        card.appendChild(ok);
      }
    });
  }
})();
