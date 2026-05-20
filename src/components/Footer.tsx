import { Link } from 'react-router-dom';
import { Database, Github, Twitter, MessageCircle } from 'lucide-react';

function Footer() {
  const productLinks = [
    { label: 'Features', path: '/features' },
    { label: 'Compare', path: '/compare' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Playground', path: '/playground' },
  ];

  const resourceLinks = [
    { label: 'Documentation', path: '/docs' },
    { label: 'API Reference', path: '/docs' },
    { label: 'Tutorials', path: '/docs' },
    { label: 'Blog', path: '/' },
  ];

  const companyLinks = [
    { label: 'About', path: '/' },
    { label: 'Careers', path: '/' },
    { label: 'Contact', path: '/' },
    { label: 'Partners', path: '/' },
  ];

  const socialLinks = [
    { label: 'GitHub', icon: Github, href: 'https://github.com/vedadb' },
    { label: 'Twitter', icon: Twitter, href: 'https://twitter.com/vedadb' },
    { label: 'Discord', icon: MessageCircle, href: 'https://discord.gg/vedadb' },
  ];

  return (
    <footer className="relative bg-veda-bg border-t border-veda-border-subtle">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-veda-amber/50 to-transparent" />

      <div className="veda-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <Database className="w-6 h-6 text-veda-amber group-hover:text-veda-amber-light transition-colors" />
              <span className="text-xl font-bold tracking-tight">
                <span className="text-veda-amber">VEDA</span>
                <span className="text-white">DB</span>
              </span>
            </Link>
            <p className="text-veda-gray text-sm leading-relaxed mb-6 max-w-sm">
              One database engine that replaces eight separate systems. SQL, Graph, Vector, Document, Key-Value, Time-Series, Columnar, and Search — unified.
            </p>
            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-veda-card border border-veda-border-subtle rounded-lg text-sm text-white placeholder:text-veda-gray-muted focus:outline-none focus:border-veda-amber transition-colors"
              />
              <button className="px-4 py-2.5 bg-veda-amber text-veda-bg text-sm font-bold rounded-lg hover:bg-veda-amber-light transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Product column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-veda-gray mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-veda-off-white hover:text-veda-amber transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-veda-gray mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-veda-off-white hover:text-veda-amber transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-veda-gray mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-veda-off-white hover:text-veda-amber transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-veda-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-veda-gray">
            &copy; 2026 VedaDB. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-veda-gray hover:text-veda-amber transition-colors"
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
