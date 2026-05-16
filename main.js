/**
 * VedaDB Landing Page - Main JavaScript
 * Features: Smooth scroll, animated counters, mobile menu, theme toggle, code tabs, copy button, scroll reveal
 */

(function() {
  'use strict';

  // ==========================================
  // Theme Toggle (Dark/Light Mode)
  // ==========================================
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem('vedadb-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('vedadb-theme', newTheme);
  });

  // ==========================================
  // Mobile Menu Toggle
  // ==========================================
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ==========================================
  // Navbar Scroll Effect
  // ==========================================
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ==========================================
  // Smooth Scroll for Anchor Links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // Animated Number Counters
  // ==========================================
  const animatedNumbers = document.querySelectorAll('.stat-number[data-target], .perf-number[data-target]');

  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const start = performance.now();

    const step = (timestamp) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      if (isDecimal) {
        el.textContent = current.toFixed(1);
      } else {
        el.textContent = Math.floor(current).toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (isDecimal) {
          el.textContent = target.toFixed(1);
        } else {
          el.textContent = target.toLocaleString();
        }
      }
    };

    requestAnimationFrame(step);
  };

  // Intersection Observer for counters
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  animatedNumbers.forEach(el => counterObserver.observe(el));

  // ==========================================
  // Performance Bar Animation
  // ==========================================
  const perfBars = document.querySelectorAll('.perf-bar');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        const delay = parseInt(bar.getAttribute('data-delay') || '0');

        setTimeout(() => {
          bar.style.setProperty('--bar-width', width + '%');
          bar.classList.add('animated');
        }, delay);

        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  perfBars.forEach(bar => barObserver.observe(bar));

  // ==========================================
  // Code Tab Switching
  // ==========================================
  const codeTabs = document.querySelectorAll('.code-tab');
  const codeContents = document.querySelectorAll('.code-content');
  const codeFilename = document.querySelector('.code-filename');

  const filenames = {
    sql: 'multi_model_query.sql',
    python: 'query_example.py',
    js: 'transaction.js',
    go: 'main.go'
  };

  codeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      // Update tab states
      codeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update content visibility
      codeContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === 'tab-' + targetTab) {
          content.classList.add('active');
        }
      });

      // Update filename
      if (codeFilename && filenames[targetTab]) {
        codeFilename.textContent = filenames[targetTab];
      }
    });
  });

  // ==========================================
  // Copy Install Command
  // ==========================================
  const copyBtn = document.getElementById('copyBtn');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = copyBtn.previousElementSibling.textContent;
      navigator.clipboard.writeText(code).then(() => {
        const tooltip = copyBtn.querySelector('.copy-tooltip');
        tooltip.classList.add('show');

        setTimeout(() => {
          tooltip.classList.remove('show');
        }, 2000);
      }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        const tooltip = copyBtn.querySelector('.copy-tooltip');
        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 2000);
      });
    });
  }

  // ==========================================
  // Scroll Reveal Animation
  // ==========================================
  const revealElements = document.querySelectorAll(
    '.feature-card, .testimonial-card, .pricing-card, .perf-card, .driver-card, .arch-layer, .video-card'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // Parallax Effect for Hero Orbs
  // ==========================================
  const orbs = document.querySelectorAll('.gradient-orb');

  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      orbs.forEach((orb, i) => {
        const speed = (i + 1) * 10;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
  }

  // ==========================================
  // Keyboard Navigation
  // ==========================================
  document.addEventListener('keydown', (e) => {
    // Press 'T' to toggle theme
    if (e.key === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const activeElement = document.activeElement;
      if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
        themeToggle.click();
      }
    }
  });

  // ==========================================
  // Active Section Highlight in Nav
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3
  });

  sections.forEach(section => sectionObserver.observe(section));

})();
