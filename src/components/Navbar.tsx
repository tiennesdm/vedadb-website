import type { MouseEvent } from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Track scroll position for transparent → solid transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Smooth scroll to section handler
  const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      // Navigate to home first, then scroll
      window.location.hash = '/'; 
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  // Nav links for single-page anchor navigation
  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Benchmarks', href: '#benchmarks' },
    { label: 'Install', href: '#install' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--bg-glass)] backdrop-blur-[12px] border-b border-[var(--border-subtle)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="veda-container">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            {/* Logo icon */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-200 group-hover:scale-110"
            >
              <rect width="32" height="32" rx="6" fill="#111" stroke="#222" strokeWidth="1" />
              <path d="M8 20L12 12L16 20L20 12L24 20" stroke="#76B900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xl font-bold tracking-tight font-[var(--font-heading)]">
              <span className="text-[var(--text-primary)]">Veda</span>
              <span className="text-[var(--accent-green)]">DB</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href.slice(1))}
                className="veda-nav-link px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '1.0',
                  letterSpacing: '0.01em',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#install"
              onClick={(e) => scrollToSection(e, 'install')}
              className="veda-btn-primary"
            >
              <Zap size={16} className="mr-2" />
              Get Started
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[var(--text-primary)] hover:text-[var(--accent-green)] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--bg-glass)] backdrop-blur-[12px] border-t border-[var(--border-subtle)]">
          <div className="veda-container py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href.slice(1))}
                className="block px-4 py-3 text-sm font-medium rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-[var(--border-subtle)] my-2 pt-2">
              <a
                href="#install"
                onClick={(e) => scrollToSection(e, 'install')}
                className="veda-btn-primary w-full"
              >
                <Zap size={16} className="mr-2" />
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export { Navbar };
