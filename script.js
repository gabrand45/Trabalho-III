document.addEventListener('DOMContentLoaded', () => {

  // THEME TOGGLE //
  const themeBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('pf-theme');
  if (savedTheme === 'light') document.body.classList.add('light-mode');

  themeBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('pf-theme', isLight ? 'light' : 'dark');
    themeBtn.setAttribute('aria-label', isLight ? 'Ativar modo escuro' : 'Ativar modo claro');
  });

  // CUSTOM CURSOR (desktop) //
  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');
  const hasMouse = window.matchMedia('(pointer: fine)').matches;

  if (hasMouse && dot && outline) {
    document.body.classList.add('has-custom-cursor');

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    let cursorVisible = false;

    dot.style.opacity = '0';
    outline.style.opacity = '0';

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      if (!cursorVisible) {
        cursorVisible = true;
        dot.style.opacity = '1';
        outline.style.opacity = '1';
      }
    });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      outline.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      if (cursorVisible) {
        dot.style.opacity = '1';
        outline.style.opacity = '1';
      }
    });

    function animateOutline() {
      outlineX += (mouseX - outlineX) * 0.12;
      outlineY += (mouseY - outlineY) * 0.12;
      outline.style.transform = `translate(${outlineX - 16}px, ${outlineY - 16}px)`;
      requestAnimationFrame(animateOutline);
    }
    animateOutline();

    const interactives = document.querySelectorAll('a, button, .game-card, .testimonial-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        outline.style.width = '48px';
        outline.style.height = '48px';
        outline.style.borderColor = 'rgba(0,245,255,0.8)';
      });
      el.addEventListener('mouseleave', () => {
        outline.style.width = '32px';
        outline.style.height = '32px';
        outline.style.borderColor = 'rgba(0,245,255,0.5)';
      });
    });
  } else {
    if (dot) dot.remove();
    if (outline) outline.remove();
  }

  // NAVBAR SCROLL //
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // MOBILE MENU //
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      // Animate bars//
      const bars = hamburger.querySelectorAll('span');
      if (open) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity = '1';
        bars[2].style.transform = '';
      }
    });

    // Close on link click //
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const bars = hamburger.querySelectorAll('span');
        bars.forEach(b => { b.style.transform = ''; b.style.opacity = '1'; });
      });
    });
  }

  // SCROLL REVEAL //
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger para aura//
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach((el, i) => {
    revealObserver.observe(el);
  });

  // GAME CARD TILT //
  const gameCards = document.querySelectorAll('.game-card');
  gameCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -6;
      const rotY = ((x - cx) / cx) * 6;
      card.style.transform = `translateY(-8px) scale(1.01) perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
  });

  // TEXT //
  const typedEl = document.getElementById('typedText');
  if (typedEl) {
    const phrases = ['INDIE GAMES', 'EPIC WORLDS', 'PIXEL ART', 'GREAT STORIES'];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
      const current = phrases[phraseIndex];
      if (!deleting) {
        typedEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          setTimeout(() => { deleting = true; }, 2000);
          setTimeout(type, 2100);
          return;
        }
      } else {
        typedEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(type, deleting ? 60 : 110);
    }
    setTimeout(type, 800);
  }

  // COUNTER ANIMATION //
   const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current).toLocaleString() + suffix;
          if (current >= target) clearInterval(timer);
        }, 16);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // FORM VALIDATION //
  const form = document.getElementById('contactForm');
  if (form) {
    const successMsg = document.getElementById('formSuccess');

    function validateField(group, inputEl) {
      const val = inputEl.value.trim();
      const type = inputEl.type;
      let valid = true;

      if (val === '') {
        valid = false;
      } else if (type === 'email') {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      } else if (inputEl.tagName === 'TEXTAREA') {
        valid = val.length >= 20;
      }

      group.classList.toggle('error', !valid);
      return valid;
    }

    // Live validation //
    form.querySelectorAll('input, textarea, select').forEach(input => {
      input.addEventListener('blur', () => {
        const group = input.closest('.form-group');
        if (group) validateField(group, input);
      });
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group && group.classList.contains('error')) validateField(group, input);
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      let allValid = true;

      form.querySelectorAll('input[required], textarea[required]').forEach(input => {
        const group = input.closest('.form-group');
        if (group && !validateField(group, input)) allValid = false;
      });

      if (allValid) {
        const btn = form.querySelector('.btn-submit');
        btn.textContent = 'ENVIANDO...';
        btn.disabled = true;

        // Gaslighting //
        setTimeout(() => {
          form.style.display = 'none';
          successMsg.classList.add('show');
        }, 1400);
      }
    });
  }

  // ACTIVE NAV HIGHLIGHT //
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navItems.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}`
        ? 'var(--neon)'
        : '';
    });
  });

  // GLITCH EFFECT LOGO //
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    setInterval(() => {
      logo.style.filter = 'hue-rotate(90deg) brightness(1.5)';
      setTimeout(() => { logo.style.filter = ''; }, 80);
    }, 5000);
  }

  // PARALLAX HERO 
   const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBg.style.transform = `translateY(${y * 0.3}px)`;
    }, { passive: true });
  }

  console.log('%c⚔ PIXELFORGE STUDIOS ⚔', 'color:#00F5FF;font-family:monospace;font-size:18px;font-weight:bold;text-shadow:0 0 10px #00F5FF');
  console.log('%cCraft. Forge. Conquer.', 'color:#3D348B;font-family:monospace;font-size:11px;');
});
