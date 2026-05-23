import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  BookOpen,
  GraduationCap,
  Code,
  Table,
  Share2,
  FileText,
  Brain,
  Activity,
  Shield,
  ArrowRightCircle,
  MessageCircle,
  Github,
  Mail,
  Copy,
  Check,
  Terminal,
} from 'lucide-react';
import { SectionReveal } from '@/components/SectionReveal';

/* ───────── easing ───────── */
const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ───────── sidebar nav ───────── */

const sidebarItems = [
  { label: 'Install', href: '#install' },
  { label: 'Configure', href: '#configure' },
  { label: 'Connect', href: '#connect' },
  { label: 'First Query', href: '#first-query' },
  { label: "Next Steps", href: '#next-steps' },
];

/* ───────── topic grid data ───────── */

const topics = [
  { icon: Table, title: 'SQL Reference', description: 'Complete SQL syntax, functions, and operators' },
  { icon: Share2, title: 'Graph / Cypher', description: 'Cypher query language for graph data' },
  { icon: Search, title: 'Vector Search', description: 'Embedding models, similarity search, HNSW' },
  { icon: FileText, title: 'Document Store', description: 'JSON documents, flexible schema' },
  { icon: Brain, title: 'AI Integration', description: 'LLM functions, RAG, model deployment' },
  { icon: Activity, title: 'Streaming', description: 'Real-time subscriptions, CDC, triggers' },
  { icon: Shield, title: 'Security', description: 'RLS, encryption, TEE, audit logging' },
  { icon: ArrowRightCircle, title: 'Migration Guide', description: 'Migrate from PostgreSQL, MongoDB, etc.' },
];

/* ───────── community data ───────── */

const communityLinks = [
  { icon: MessageCircle, title: 'Join Discord', description: 'Get help from 2,000+ developers' },
  { icon: Github, title: 'Open an Issue', description: 'Report bugs or request features' },
  { icon: Mail, title: 'Email Support', description: 'Reach our team directly' },
];

/* ───────── CodeBlock with copy ───────── */

function DocsCodeBlock({ code, filename }: { code: string; filename?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-xl overflow-hidden border border-veda-border-subtle my-4"
      style={{ background: '#0D1117' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-veda-border-subtle">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F56' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#27C93F' }} />
          {filename && (
            <span className="ml-3 text-sm font-mono" style={{ color: '#5A6A7F' }}>
              {filename}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-sm transition-colors hover:text-white"
          style={{ color: '#5A6A7F' }}
        >
          {copied ? <Check size={14} className="text-veda-green" /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      {/* Code */}
      <pre className="p-4 overflow-x-auto">
        <code className="font-mono text-sm leading-relaxed text-veda-off-white whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}

/* ───────── Step component ───────── */

function Step({
  number,
  title,
  id,
  children,
}: {
  number: string;
  title: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: easeOutExpo }}
      className="scroll-mt-28"
    >
      <span
        className="text-5xl font-black block"
        style={{ color: 'rgba(232,168,56,0.15)' }}
      >
        {number}
      </span>
      <h2 className="text-[28px] font-extrabold text-white" style={{ marginTop: -20 }}>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </motion.div>
  );
}

/* ───────── main component ───────── */

export default function Docs() {
  const [activeSection, setActiveSection] = useState('#install');
  const [searchQuery, setSearchQuery] = useState('');

  /* Scroll spy: track active section */
  useEffect(() => {
    const handleScroll = () => {
      const sections = sidebarItems.map((item) => {
        const el = document.querySelector(item.href);
        if (!el) return { href: item.href, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { href: item.href, top: rect.top };
      });

      const current = sections.reduce((closest, section) => {
        if (section.top > 100 && section.top < closest.top) return section;
        return closest;
      }, sections[0]);

      if (current) setActiveSection(current.href);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      {/* ════════════ HERO ════════════ */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden px-6"
        style={{
          minHeight: '35vh',
          background: 'linear-gradient(135deg, #0A0E1A 0%, #0F1923 50%, #0A0E1A 100%)',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-xs font-semibold tracking-[0.1em] uppercase mb-4"
          style={{ color: '#E8A838' }}
        >
          DOCUMENTATION
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.1 }}
          className="text-3xl md:text-5xl font-black text-white leading-[1.1]"
        >
          Get started with VedaDB
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 }}
          className="text-lg mt-3 max-w-[600px]"
          style={{ color: '#8B95A5' }}
        >
          From installation to your first query in under 5 minutes.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.3 }}
          className="relative mt-8 w-full max-w-[480px]"
        >
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#5A6A7F' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documentation..."
            className="w-full py-3 pl-11 pr-4 rounded-lg text-[15px] text-white outline-none transition-all duration-200 focus:ring-2"
            style={{
              background: '#1A2433',
              border: '1px solid #2A3A50',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#E8A838';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232,168,56,0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#2A3A50';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </motion.div>
      </section>

      {/* ════════════ QUICK START ════════════ */}
      <section className="relative py-24 px-6" style={{ background: '#0A0E1A' }}>
        <div className="max-w-[900px] mx-auto">
          {/* Sidebar (desktop) */}
          <aside
            className="hidden lg:block fixed w-[240px]"
            style={{
              left: 'max(24px, calc(50% - 640px))',
              top: 120,
            }}
          >
            <p
              className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-4"
              style={{ color: '#8B95A5' }}
            >
              QUICK START
            </p>
            <nav className="space-y-0">
              {sidebarItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="block w-full text-left text-sm py-1.5 pl-3 transition-all duration-200 border-l-2"
                  style={{
                    color: activeSection === item.href ? '#E8A838' : '#8B95A5',
                    borderLeftColor: activeSection === item.href ? '#E8A838' : 'transparent',
                    background:
                      activeSection === item.href ? 'rgba(232,168,56,0.05)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== item.href) {
                      e.currentTarget.style.color = '#FFFFFF';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== item.href) {
                      e.currentTarget.style.color = '#8B95A5';
                    }
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <div className="lg:ml-[280px]">
            {/* ── Step 1 ── */}
            <Step number="01" title="Install VedaDB" id="install">
              <p className="text-base leading-relaxed" style={{ color: '#8B95A5' }}>
                VedaDB runs on Linux, macOS, and Windows (via WSL). The fastest way to get started
                is with our install script.
              </p>
              <DocsCodeBlock
                code={`$ curl -fsSL https://get.vedadb.dev | bash
# Or with wget:
$ wget -qO- https://get.vedadb.dev | bash`}
              />
              <div className="flex flex-wrap gap-4 mt-2 text-sm" style={{ color: '#8B95A5' }}>
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-veda-cyan" />
                  <span className="font-mono text-xs" style={{ color: '#5A6A7F' }}>
                    $ docker run -p 5432:5432 vedadb/vedadb:latest
                  </span>
                </div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#5A6A7F' }}>
                Homebrew:{' '}
                <code className="font-mono text-xs" style={{ color: '#00D4AA' }}>
                  $ brew tap tiennesdm/vedadb && brew install vedadb-server vedadb-cli
                </code>
              </p>
            </Step>

            {/* ── Step 2 ── */}
            <div className="mt-20">
              <Step number="02" title="Initialize your database" id="configure">
                <p className="text-base leading-relaxed" style={{ color: '#8B95A5' }}>
                  After installation, initialize a new VedaDB instance. This creates the data
                  directory and starts all eight model engines.
                </p>
                <DocsCodeBlock
                  code={`$ vedadb init --data-dir ./mydb
$ vedadb start --data-dir ./mydb
# VedaDB v3.0.0 ready on port 5432
# All 8 model engines initialized`}
                />
                <p className="text-sm mt-2" style={{ color: '#8B95A5' }}>
                  Check the server is running:
                </p>
                <DocsCodeBlock
                  code={`$ curl http://localhost:7480/health
# {"status":"ok","version":"3.0.0","models":8}`}
                />
              </Step>
            </div>

            {/* ── Step 3 ── */}
            <div className="mt-20">
              <Step number="03" title="Connect with your client" id="connect">
                <p className="text-base leading-relaxed" style={{ color: '#8B95A5' }}>
                  VedaDB speaks the PostgreSQL wire protocol. Use any Postgres client — psql,
                  pgAdmin, or your ORM of choice.
                </p>
                <DocsCodeBlock
                  code={`$ vedadb-cli
# Connected to VedaDB v3.0.0
vedadb=> 

# Or with host and port:
$ vedadb-cli -h localhost -P 7480`}
                />

                {/* Language tabs */}
                <div className="mt-6">
                  <p className="text-sm font-semibold mb-3" style={{ color: '#8B95A5' }}>
                    Connect with your language:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DocsCodeBlock
                      filename="Python"
                      code={`import psycopg2
conn = psycopg2.connect("postgres://localhost:5432/vedadb")
# You're connected to all 8 models`}
                    />
                    <DocsCodeBlock
                      filename="Node.js"
                      code={`const { Client } = require('pg');
const client = new Client({ 
  connectionString: 'postgres://localhost:5432/vedadb' 
});
await client.connect();`}
                    />
                  </div>
                </div>
              </Step>
            </div>

            {/* ── Step 4 ── */}
            <div className="mt-20">
              <Step number="04" title="Run your first query" id="first-query">
                <p className="text-base leading-relaxed" style={{ color: '#8B95A5' }}>
                  VedaDB handles SQL, Cypher, Document, and Vector queries. Try each one to see how
                  they work.
                </p>

                <DocsCodeBlock
                  filename="SQL"
                  code={`vedadb=> CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name STRING NOT NULL,
    email STRING UNIQUE
);

vedadb=> INSERT INTO users (name, email) VALUES 
    ('Alice', 'alice@vedadb.io'),
    ('Bob', 'bob@vedadb.io');

vedadb=> SELECT * FROM users;
 id | name  | email
----+-------+-----------------
  1 | Alice | alice@vedadb.io
  2 | Bob   | bob@vedadb.io
(2 rows)`}
                />
              </Step>
            </div>

            {/* ── Step 5: Model Grid ── */}
            <div className="mt-20">
              <Step number="05" title="Explore all 8 models" id="next-steps">
                <p className="text-base leading-relaxed mb-6" style={{ color: '#8B95A5' }}>
                  You're up and running. VedaDB unifies 8 data models in a single engine.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { name: 'SQL/Relational', icon: Table, desc: 'ACID transactions' },
                    { name: 'Document', icon: FileText, desc: 'JSON, flexible schema' },
                    { name: 'Graph', icon: Share2, desc: 'Cypher queries' },
                    { name: 'Vector', icon: Search, desc: 'Similarity search' },
                    { name: 'Key-Value', icon: Code, desc: 'Sub-millisecond' },
                    { name: 'Time-Series', icon: Activity, desc: 'Aggregations' },
                    { name: 'Columnar', icon: Table, desc: 'Analytics' },
                    { name: 'Full-Text', icon: Search, desc: 'Search ranking' },
                  ].map((model) => (
                    <motion.div
                      key={model.name}
                      whileHover={{ y: -2, borderColor: '#3A4F6B' }}
                      className="rounded-lg p-4 border transition-all duration-200 cursor-pointer"
                      style={{ background: '#1A2433', borderColor: '#2A3A50' }}
                    >
                      <model.icon size={20} className="text-veda-amber mb-2" />
                      <p className="text-sm font-semibold text-white">{model.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#5A6A7F' }}>
                        {model.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Resource cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  {[
                    { icon: BookOpen, title: 'API Reference', desc: 'Complete API documentation for all 8 query languages.' },
                    { icon: GraduationCap, title: 'Tutorials', desc: 'Step-by-step guides for common use cases.' },
                    { icon: Code, title: 'Example Projects', desc: 'Clone a starter repo and build something real.' },
                  ].map((card) => (
                    <motion.div
                      key={card.title}
                      whileHover={{ y: -2, borderColor: '#3A4F6B' }}
                      className="rounded-xl p-6 border transition-all duration-200 cursor-pointer"
                      style={{ background: '#1A2433', borderColor: '#2A3A50' }}
                    >
                      <card.icon size={24} className="text-veda-cyan mb-3" />
                      <p className="text-base font-bold text-white">{card.title}</p>
                      <p className="text-sm mt-1" style={{ color: '#8B95A5' }}>
                        {card.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </Step>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ TOPIC GRID ════════════ */}
      <section className="py-16 px-6 border-t" style={{ background: '#0F1923', borderColor: '#1A2433' }}>
        <div className="max-w-[1280px] mx-auto">
          <SectionReveal>
            <h2 className="text-[28px] font-extrabold text-white mb-8">Explore by topic</h2>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map((topic, i) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: easeOutExpo }}
                whileHover={{ background: '#223044', borderColor: '#3A4F6B' }}
                className="rounded-lg p-5 border transition-all duration-200 cursor-pointer"
                style={{ background: '#1A2433', borderColor: '#2A3A50' }}
              >
                <topic.icon size={20} className="text-veda-amber mb-2.5" />
                <p className="text-[15px] font-semibold text-white">{topic.title}</p>
                <p className="text-[13px] mt-1" style={{ color: '#8B95A5' }}>
                  {topic.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ COMMUNITY CTA ════════════ */}
      <section className="py-20 px-6" style={{ background: '#0A0E1A' }}>
        <div className="max-w-[800px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-3xl font-extrabold text-white"
          >
            Need help?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
            className="text-base mt-2"
            style={{ color: '#8B95A5' }}
          >
            Our community and support team are here for you.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {communityLinks.map((link, i) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: easeOutExpo }}
                whileHover={{ y: -2, borderColor: '#3A4F6B' }}
                className="rounded-lg p-6 border transition-all duration-200 cursor-pointer text-left"
                style={{ background: '#1A2433', borderColor: '#2A3A50' }}
              >
                <link.icon size={24} className="text-veda-cyan mb-3" />
                <p className="text-base font-semibold text-white">{link.title}</p>
                <p className="text-sm mt-1" style={{ color: '#8B95A5' }}>
                  {link.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
