import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  Star,
  Github,
  Database,
  Server,
  Layers,
  Cpu,
  TrendingUp,
  Grid,
  Search,
  Hexagon,
} from 'lucide-react';
import { ParticleNetwork } from '@/components/ParticleNetwork';
import { SectionReveal } from '@/components/SectionReveal';
import { AnimatedCounter } from '@/components/AnimatedCounter';


gsap.registerPlugin(ScrollTrigger);

/* ───────────────────── Section 1: Hero ───────────────────── */

function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({ delay: 0.3 });

    // Headline word reveal
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll('.word');
      gsap.set(words, { opacity: 0, y: 30 });
      tl.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
      });
    }

    // Subheadline
    if (subRef.current) {
      gsap.set(subRef.current, { opacity: 0, y: 20 });
      tl.to(subRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, '-=0.4');
    }

    // CTAs
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });
      tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, '-=0.3');
    }

    // Stats
    if (statsRef.current) {
      const items = statsRef.current.children;
      gsap.set(items, { opacity: 0, y: 20 });
      tl.to(items, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'expo.out' }, '-=0.3');
    }

    // Chevron
    if (chevronRef.current) {
      gsap.set(chevronRef.current, { opacity: 0 });
      tl.to(chevronRef.current, { opacity: 1, duration: 0.5 }, '-=0.2');
    }
  }, { scope: sectionRef });

  const headlineWords = ['One', 'Database.', 'Infinite', 'Possibilities.'];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A0E1A 0%, #0F1923 50%, #0A0E1A 100%)' }}
    >
      <ParticleNetwork />

      <div className="relative z-10 veda-container text-center max-w-[900px] mx-auto px-6 py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-veda-border-subtle bg-veda-amber/5 mb-8">
          <span className="w-2 h-2 rounded-full bg-veda-amber animate-pulse" />
          <span className="text-[13px] font-medium text-veda-amber tracking-wide">v3.0.0 Now Available</span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-white mb-6"
        >
          {headlineWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="text-lg md:text-xl text-veda-gray max-w-[640px] mx-auto leading-relaxed mb-10"
        >
          SQL &middot; Graph &middot; Vector &middot; Document &middot; Key-Value &middot; Time-Series &middot; Columnar &middot; Search — all in one engine.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            to="/pricing"
            className="inline-flex items-center px-8 py-4 bg-veda-amber text-veda-bg text-lg font-bold rounded-lg hover:bg-veda-amber-light hover:shadow-lg hover:shadow-veda-amber/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-250"
          >
            Get Started Free
          </Link>
          <a
            href="https://github.com/vedadb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-veda-border-subtle text-white font-semibold rounded-lg hover:border-veda-amber hover:text-veda-amber hover:bg-veda-amber/5 transition-all duration-250"
          >
            <Github size={20} />
            View on GitHub
          </a>
        </div>

        {/* Stats Bar */}
        <div
          ref={statsRef}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {[
            { value: '174K+', label: 'lines of code' },
            { value: '226', label: 'files' },
            { value: '50+', label: 'features' },
            { value: 'v3.0.0', label: 'latest', highlight: true },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-2xl md:text-3xl font-bold ${stat.highlight ? 'text-veda-amber' : 'text-white'}`}>
                {stat.value}
              </div>
              <div className="text-xs font-medium text-veda-gray-muted uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll chevron */}
      <div
        ref={chevronRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"
      >
        <ChevronDown className="w-6 h-6 text-veda-gray-muted" />
      </div>
    </section>
  );
}

/* ───────────────────── Section 2: Trusted By ───────────────────── */

function TrustedBySection() {
  const logos = ['TechCorp', 'DataFlow', 'CloudNine', 'AppWorks', 'DevStack', 'ByteScale'];

  return (
    <section className="bg-veda-bg border-t border-b border-veda-border-subtle/50 py-12">
      <SectionReveal className="veda-container">
        <p className="text-sm font-medium text-veda-gray-muted uppercase tracking-widest text-center mb-6">
          Trusted by developers at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((name) => (
            <span
              key={name}
              className="text-lg md:text-xl font-bold text-veda-gray-muted hover:text-veda-gray transition-colors duration-300 cursor-default select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}

/* ───────────────────── Section 3: The Problem ───────────────────── */

const dbIcons = [
  { Icon: Database, label: 'PostgreSQL' },
  { Icon: Layers, label: 'MongoDB' },
  { Icon: Server, label: 'Neo4j' },
  { Icon: Hexagon, label: 'Redis' },
  { Icon: Cpu, label: 'Pinecone' },
  { Icon: TrendingUp, label: 'InfluxDB' },
  { Icon: Grid, label: 'ClickHouse' },
  { Icon: Search, label: 'Elasticsearch' },
];

function ProblemSection() {
  const convergeRef = useRef<HTMLDivElement>(null);

  return (
    <section className="veda-section bg-veda-bg">
      <div className="veda-container">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <SectionReveal>
            <div>
              <span className="text-xs font-semibold text-veda-amber uppercase tracking-[0.1em]">
                The Problem
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mt-4">
                Your database stack is bleeding money.
              </h2>
              <p className="text-lg text-veda-gray leading-relaxed mt-6 max-w-[520px]">
                The average company juggles 6+ separate databases — each with its own connection pool, query language, monitoring, backups, and operational overhead. The result? Wasted engineering hours, data consistency nightmares, and runaway infrastructure costs.
              </p>

              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-4 mt-8 max-w-[400px]">
                <div className="bg-veda-card border border-veda-border-subtle rounded-xl p-6">
                  <div className="text-4xl font-extrabold text-veda-red">$2.1M</div>
                  <div className="text-sm text-veda-gray mt-1">yearly waste per company</div>
                </div>
                <div className="bg-veda-card border border-veda-border-subtle rounded-xl p-6">
                  <div className="text-4xl font-extrabold text-veda-amber">6+</div>
                  <div className="text-sm text-veda-gray mt-1">databases to maintain</div>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Right: Converge Animation */}
          <div ref={convergeRef} className="relative h-[400px] flex items-center justify-center">
            <ConvergeAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Isolated Framer Motion component for the converge animation */
function ConvergeAnimation() {
  const positions = [
    { x: -120, y: -100 }, { x: 120, y: -100 },
    { x: -140, y: 0 },    { x: 140, y: 0 },
    { x: -100, y: 100 },  { x: 100, y: 100 },
    { x: -40, y: -140 },  { x: 40, y: 140 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Connection lines (decorative, behind icons) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <line x1="30%" y1="25%" x2="70%" y2="30%" stroke="#2A3A50" strokeWidth="1" strokeDasharray="4" />
        <line x1="25%" y1="50%" x2="75%" y2="50%" stroke="#2A3A50" strokeWidth="1" strokeDasharray="4" />
        <line x1="35%" y1="75%" x2="65%" y2="70%" stroke="#2A3A50" strokeWidth="1" strokeDasharray="4" />
        <line x1="45%" y1="20%" x2="55%" y2="80%" stroke="#2A3A50" strokeWidth="1" strokeDasharray="4" />
      </svg>

      {/* 8 DB icons that converge */}
      {dbIcons.map((db, i) => (
        <motion.div
          key={db.label}
          className="absolute"
          initial={{ x: positions[i].x, y: positions[i].y, opacity: 0.7, scale: 1 }}
          whileInView={{ x: 0, y: 0, opacity: 1, scale: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 1.5,
            delay: i * 0.1,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-veda-card border border-veda-border-subtle flex items-center justify-center">
            <db.Icon className="w-6 h-6 md:w-7 md:h-7 text-veda-gray-muted" />
          </div>
        </motion.div>
      ))}

      {/* Central VedaDB icon that appears */}
      <motion.div
        className="absolute z-10"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.8,
          delay: 1.2,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        }}
      >
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-veda-amber/15 border-2 border-veda-amber flex items-center justify-center shadow-lg shadow-veda-amber/20">
          <Database className="w-8 h-8 md:w-10 md:h-10 text-veda-amber" />
        </div>
      </motion.div>
    </div>
  );
}

/* ───────────────────── Section 4: Feature Grid ───────────────────── */

const features = [
  {
    icon: '\u25C6',
    name: 'SQL',
    color: '#3B82F6',
    replaces: 'PostgreSQL, MySQL',
    features: ['Full ACID transactions', 'Complex JOINs & CTEs', 'Stored procedures'],
  },
  {
    icon: '\u25CF',
    name: 'Graph',
    color: '#A855F7',
    replaces: 'Neo4j, Amazon Neptune',
    features: ['Native Cypher support', 'Pattern matching', 'Shortest path queries'],
  },
  {
    icon: '\u25B2',
    name: 'Document',
    color: '#22C55E',
    replaces: 'MongoDB, Couchbase',
    features: ['Nested document queries', 'Flexible schema', 'Auto-sharding'],
  },
  {
    icon: '\u25C9',
    name: 'Vector',
    color: '#E8A838',
    replaces: 'Pinecone, Milvus',
    features: ['HNSW indexing', 'Similarity search', 'Embedding storage'],
  },
  {
    icon: '\u25A0',
    name: 'Key-Value',
    color: '#EF4444',
    replaces: 'Redis, DynamoDB',
    features: ['Sub-millisecond latency', 'TTL support', 'Pub/sub messaging'],
  },
  {
    icon: '\u25BC',
    name: 'Time-Series',
    color: '#06B6D4',
    replaces: 'InfluxDB, TimescaleDB',
    features: ['Automatic downsampling', 'Retention policies', 'Range aggregations'],
  },
  {
    icon: '\u25C7',
    name: 'Columnar',
    color: '#F97316',
    replaces: 'ClickHouse, BigQuery',
    features: ['Vectorized execution', 'Compression', 'Analytical queries'],
  },
  {
    icon: '\u2606',
    name: 'Search',
    color: '#EC4899',
    replaces: 'Elasticsearch, Solr',
    features: ['Full-text + fuzzy search', 'Highlighting', 'Faceted navigation'],
  },
];

function FeatureGridSection() {
  return (
    <section
      className="veda-section"
      style={{ background: 'linear-gradient(180deg, #0A0E1A 0%, #0F1923 100%)' }}
    >
      <div className="veda-container">
        {/* Header */}
        <SectionReveal className="text-center mb-16">
          <span className="text-xs font-semibold text-veda-amber uppercase tracking-[0.1em]">
            Eight Models. One Engine.
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4">
            One engine. Every data model.
          </h2>
          <p className="text-lg text-veda-gray max-w-[560px] mx-auto mt-4">
            Replace your entire database stack with a single, unified platform.
          </p>
        </SectionReveal>

        {/* Grid */}
        <SectionReveal
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          stagger={0.08}
          duration={0.5}
          y={30}
        >
          {features.map((f) => (
            <div
              key={f.name}
              className="group relative bg-veda-card border border-veda-border-subtle rounded-xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 hover:border-veda-border-active transition-all duration-300"
              style={{ borderTopWidth: '2px', borderTopColor: f.color }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${f.color}15`, color: f.color }}
              >
                {f.icon}
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-white mb-1">{f.name}</h3>

              {/* Replaces */}
              <p className="text-sm text-veda-gray mb-3">
                Replaces: {f.replaces}
              </p>

              {/* Features */}
              <ul className="space-y-1.5">
                {f.features.map((feat) => (
                  <li key={feat} className="text-sm text-veda-cyan flex items-start gap-2">
                    <span className="text-veda-cyan mt-1">&bull;</span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}

/* ───────────────────── Section 5: Quick Stats ───────────────────── */

function QuickStatsSection() {
  const stats = [
    { value: 174093, suffix: '', label: 'Lines of Code' },
    { value: 226, suffix: '', label: 'Source Files' },
    { value: 50, suffix: '+', label: 'Features' },
    { value: 8, suffix: '', label: 'Data Models' },
  ];

  return (
    <section
      className="veda-section"
      style={{ background: 'linear-gradient(180deg, #0F1923 0%, #0A0E1A 100%)' }}
    >
      <div className="veda-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center py-8 ${
                i < stats.length - 1 ? 'lg:border-r lg:border-veda-border-subtle' : ''
              }`}
            >
              <div className="text-4xl md:text-6xl font-black text-white">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2000} />
              </div>
              <div className="text-sm font-medium text-veda-gray uppercase tracking-wider mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Section 6: Terminal Demo ───────────────────── */

const terminalCommands = [
  {
    label: 'SQL Query',
    code: `$ vedadb-cli -e "SELECT * FROM users LIMIT 5"

 id | name    | email             | role
----+---------+-------------------+-------
  1 | Alice   | alice@acme.com    | admin
  2 | Bob     | bob@acme.com      | user
  3 | Charlie | charlie@acme.com  | user
  4 | Diana   | diana@acme.com    | editor
  5 | Eve     | eve@acme.com      | user

(5 rows in 0.4ms)`,
  },
  {
    label: 'Graph Query',
    code: `$ vedadb-cli -m cypher -e "MATCH (n:Person) RETURN n.name"

 n.name
--------
 Alice
 Bob
 Charlie
 Diana

(4 nodes in 0.8ms)`,
  },
  {
    label: 'Document Query',
    code: `$ vedadb-cli -m document -e "FIND products WHERE price > 100"

[{
  "_id": "p1",
  "name": "Ergonomic Chair",
  "price": 499,
  "category": "furniture"
}, {
  "_id": "p2",
  "name": "4K Monitor",
  "price": 699,
  "category": "electronics"
}]

(2 docs in 1.1ms)`,
  },
];

function TerminalDemoSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % terminalCommands.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="veda-section bg-veda-bg-light">
      <div className="veda-container max-w-[900px]">
        {/* Header */}
        <SectionReveal className="text-center mb-12">
          <span className="text-xs font-semibold text-veda-amber uppercase tracking-[0.1em]">
            See it in action
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4">
            One query language. Every data model.
          </h2>
        </SectionReveal>

        {/* Terminal */}
        <SectionReveal>
          <div className="rounded-xl overflow-hidden border border-veda-border-subtle shadow-2xl shadow-black/50">
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0D1117] border-b border-veda-border-subtle">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <span className="text-sm text-veda-gray-muted font-mono">vedadb-cli</span>
              <div className="w-16" />
            </div>

            {/* Terminal body with cycling content */}
            <div className="relative bg-[#0D1117] min-h-[320px] p-4 overflow-hidden">
              {terminalCommands.map((cmd, i) => (
                <div
                  key={i}
                  className={`transition-opacity duration-500 ${
                    i === activeIndex ? 'opacity-100' : 'opacity-0 absolute inset-0 p-4'
                  }`}
                >
                  <pre className="font-mono text-sm leading-relaxed text-veda-off-white overflow-x-auto">
                    <code dangerouslySetInnerHTML={{ __html: highlightTerminalCode(cmd.code) }} />
                  </pre>
                </div>
              ))}

              {/* Command tabs */}
              <div className="flex gap-2 mt-6 pt-4 border-t border-veda-border-subtle/50">
                {terminalCommands.map((cmd, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      i === activeIndex
                        ? 'bg-veda-amber text-veda-bg'
                        : 'text-veda-gray-muted hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {cmd.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function highlightTerminalCode(code: string): string {
  return code
    .replace(/\$ /g, '<span class="text-veda-amber">$ </span>')
    .replace(/(SELECT|FROM|WHERE|LIMIT|MATCH|RETURN|FIND)/g, '<span class="text-veda-cyan font-medium">$1</span>')
    .replace(/(vedadb-cli)/g, '<span class="text-veda-green">$1</span>')
    .replace(/("[^"]*")/g, '<span class="text-veda-amber-light">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="text-veda-amber-light">$1</span>');
}

/* ───────────────────── Section 7: Testimonials ───────────────────── */

const testimonials = [
  {
    quote: 'VedaDB replaced our entire database stack. One system, zero complexity. Our engineering team is 3x more productive.',
    name: 'Alex K.',
    title: 'CTO, TechFlow',
    initial: 'A',
  },
  {
    quote: 'The AI functions in SQL are game-changing. We built our recommendation engine in days, not months.',
    name: 'Priya M.',
    title: 'Lead Engineer, DataVerse',
    initial: 'P',
  },
  {
    quote: 'From 6 databases to 1. Our infrastructure costs dropped 70% and our ops team finally sleeps at night.',
    name: 'James L.',
    title: 'VP Engineering, CloudScale',
    initial: 'J',
  },
];

function TestimonialsSection() {
  return (
    <section className="veda-section bg-veda-bg">
      <div className="veda-container">
        {/* Header */}
        <SectionReveal className="text-center mb-12">
          <span className="text-xs font-semibold text-veda-amber uppercase tracking-[0.1em]">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4">
            Loved by developers
          </h2>
        </SectionReveal>

        {/* Cards */}
        <SectionReveal
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          stagger={0.1}
          duration={0.5}
          y={30}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-veda-card border border-veda-border-subtle rounded-xl p-8 hover:-translate-y-1 hover:border-veda-border-active transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-veda-amber text-veda-amber" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-base text-veda-off-white leading-relaxed italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-veda-border-subtle flex items-center justify-center">
                  <span className="text-sm font-bold text-veda-amber">{t.initial}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-sm text-veda-gray-muted">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}

/* ───────────────────── Section 8: CTA Banner ───────────────────── */

function CTABannerSection() {
  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #E8A838 0%, #FFC850 50%, #E8A838 100%)' }}
    >
      <div className="veda-container text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-veda-bg">
          Ready to replace your database stack?
        </h2>
        <p className="text-lg text-veda-bg/70 mt-3">
          Get started free. No credit card required.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            to="/pricing"
            className="inline-flex items-center px-8 py-3.5 bg-veda-bg text-veda-amber font-bold rounded-lg hover:bg-veda-bg-light transition-colors"
          >
            Start Free
          </Link>
          <a
            href="mailto:sales@vedadb.io"
            className="inline-flex items-center px-8 py-3.5 border border-veda-bg text-veda-bg font-semibold rounded-lg hover:bg-veda-bg/10 transition-colors"
          >
            Talk to Sales
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Home Page ───────────────────── */

export default function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <TrustedBySection />
      <ProblemSection />
      <FeatureGridSection />
      <QuickStatsSection />
      <TerminalDemoSection />
      <TestimonialsSection />
      <CTABannerSection />
    </div>
  );
}
