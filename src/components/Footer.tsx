import { Github, Twitter, MessageCircle } from 'lucide-react';

function Footer() {
  const productLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Benchmarks', href: '#benchmarks' },
    { label: 'Install', href: '#install' },
  ];

  const resourceLinks = [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Tutorials', href: '#' },
    { label: 'Blog', href: '#' },
  ];

  const companyLinks = [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Partners', href: '#' },
  ];

  const socialLinks = [
    { label: 'GitHub', icon: Github, href: 'https://github.com/vedadb' },
    { label: 'Twitter', icon: Twitter, href: 'https://twitter.com/vedadb' },
    { label: 'Discord', icon: MessageCircle, href: 'https://discord.gg/vedadb' },
  ];

  // MIT License badge component
  const LicenseBadge = () => (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium"
      style={{
        backgroundColor: 'var(--bg-tertiary)',
        border: '1px solid var(--border-subtle)',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
      }}
    >
      MIT License
    </span>
  );

  return (
    <footer className="relative bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
      {/* Green glow top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, var(--accent-green) 50%, transparent 100%)',
          opacity: 0.4,
        }}
      />

      <div className="veda-container" style={{ paddingTop: '64px', paddingBottom: '48px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="6" fill="#111" stroke="#222" strokeWidth="1" />
                <path d="M8 20L12 12L16 20L20 12L24 20" stroke="#76B900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-[var(--text-primary)]">Veda</span>
                <span className="text-[var(--accent-green)]">DB</span>
              </span>
            </div>

            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: 'var(--text-secondary)' }}>
              A GPU-native multi-model database. SQL, Graph, Vector, Document,
              Key-Value, Time-Series, Columnar, and Ledger — unified on GPU.
            </p>

            {/* Version + License */}
            <div className="flex items-center gap-3 mb-6">
              <span className="veda-badge">v2.4.0</span>
              <LicenseBadge />
            </div>
          </div>

          {/* Product column */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              Product
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-[var(--accent-green)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-[var(--accent-green)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-[var(--accent-green)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            &copy; 2025 VedaDB. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 transition-colors hover:text-[var(--accent-green)]"
                style={{ color: 'var(--text-muted)' }}
                aria-label={link.label}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
