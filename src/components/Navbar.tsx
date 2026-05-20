import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Database } from 'lucide-react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setProductOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Features', path: '/features' },
    { label: 'Compare', path: '/compare' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Docs', path: '/docs' },
  ];

  const productLinks = [
    { label: 'Overview', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'Playground', path: '/playground' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-veda-bg/80 backdrop-blur-xl border-b border-veda-border-subtle'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="veda-container">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Database className="w-6 h-6 text-veda-amber group-hover:text-veda-amber-light transition-colors" />
            <span className="text-xl font-bold tracking-tight">
              <span className="text-veda-amber">VEDA</span>
              <span className="text-white">DB</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {/* Product dropdown */}
            <div className="relative">
              <button
                onClick={() => setProductOpen(!productOpen)}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-veda-off-white hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                Product
                <ChevronDown
                  size={14}
                  className={`transition-transform ${productOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {productOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-veda-card border border-veda-border-subtle rounded-xl shadow-xl overflow-hidden">
                  {productLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="block px-4 py-2.5 text-sm text-veda-off-white hover:text-white hover:bg-veda-amber/10 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'text-veda-amber bg-veda-amber/10'
                    : 'text-veda-off-white hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/pricing"
              className="inline-flex items-center px-6 py-2.5 bg-veda-amber text-veda-bg text-sm font-bold rounded-lg hover:bg-veda-amber-light hover:shadow-lg hover:shadow-veda-amber/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-250"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-veda-bg/95 backdrop-blur-xl border-t border-veda-border-subtle">
          <div className="veda-container py-4 space-y-1">
            <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-veda-gray">
              Product
            </div>
            {productLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-4 py-2.5 text-sm text-veda-off-white hover:text-veda-amber transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-veda-border-subtle my-2" />
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'text-veda-amber bg-veda-amber/10'
                    : 'text-veda-off-white hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link
                to="/pricing"
                className="block w-full text-center px-6 py-3 bg-veda-amber text-veda-bg text-sm font-bold rounded-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export { Navbar };
