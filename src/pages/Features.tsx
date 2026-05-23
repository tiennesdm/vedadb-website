import { useState, useRef } from 'react';
import type { ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Brain,
  Database,
  Cpu,
  Layers,
  Image,
  AudioLines,
  Video,
  Merge,
  GitBranch,
  ArrowUpCircle,
  TrendingUp,
  Globe,
  Waves,
  Repeat,
  Bell,
  RefreshCw,
  Lock,
  Shield,
  Key,
  ClipboardList,
  ChevronRight,
} from 'lucide-react';
import { CodeBlock } from '@/components/CodeBlock';
import { SectionReveal } from '@/components/SectionReveal';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type IconType = ComponentType<LucideProps>;

interface FeatureItem {
  title: string;
  icon: IconType;
  description: string;
  code: string;
}

interface Category {
  id: string;
  label: string;
  heading: string;
  description: string;
  features: FeatureItem[];
}

const categories: Category[] = [
  {
    id: 'ai-native',
    label: 'AI-Native',
    heading: 'Built for the AI era',
    description:
      "AI isn't bolted on — it's woven into the core. Run inference, generate embeddings, and query vectors without ever leaving SQL.",
    features: [
      {
        title: 'SQL-Powered AI',
        icon: Brain,
        description:
          'Call LLMs and embedding models directly from SQL queries. Chain multiple AI operations in a single transaction.',
        code: "SELECT veda.ai.complete('Summarize this:', article_text) FROM articles WHERE id = 42;",
      },
      {
        title: 'Vector Embeddings',
        icon: Database,
        description:
          'Store and query high-dimensional vectors with HNSW indexing. Automatic embedding generation on insert.',
        code: "SELECT * FROM products ORDER BY embedding <-> veda.ai.embed('running shoes') LIMIT 10;",
      },
      {
        title: 'Model Management',
        icon: Cpu,
        description:
          'Deploy ONNX models inside the database. Version, hot-swap, and monitor inference workloads.',
        code: "CALL veda.ai.deploy_model('classifier_v2', './model.onnx', 'cpu');",
      },
      {
        title: 'GraphRAG Pipeline',
        icon: Layers,
        description:
          'Built-in retrieval-augmented generation combining Graph + Vector + LLM. Context-aware answers in one query.',
        code: "SELECT veda.ai.chat(ctx, 'Answer: ' || question) FROM (SELECT * FROM docs ORDER BY embedding <-> q LIMIT 5) ctx;",
      },
    ],
  },
  {
    id: 'multimodal',
    label: 'Multimodal',
    heading: 'Search beyond text',
    description:
      'Query images, audio, and video as naturally as you query rows. VedaDB understands content, not just structure.',
    features: [
      {
        title: 'Image Search',
        icon: Image,
        description:
          'Upload an image and find visually similar content. Supports CLIP-style embeddings for semantic image search.',
        code: "SELECT * FROM images WHERE content ~= upload('photo.jpg') LIMIT 5;",
      },
      {
        title: 'Audio Indexing',
        icon: AudioLines,
        description:
          'Transcribe audio with Whisper and search by sound similarity. Ideal for music, podcasts, and voice data.',
        code: "SELECT * FROM audio WHERE waveform <-> query_vec LIMIT 10;",
      },
      {
        title: 'Video Analysis',
        icon: Video,
        description:
          'Extract frames, index visual content, and search video libraries with natural language.',
        code: "SELECT * FROM video WHERE frames ~= 'person riding bicycle' LIMIT 5;",
      },
      {
        title: 'Cross-Modal Join',
        icon: Merge,
        description:
          'Join across media types — e.g., find products where image matches AND description contains keyword.',
        code: "SELECT p.* FROM products p JOIN images i ON p.id = i.product_id WHERE i.content ~= img AND p.name ILIKE '%shoe%';",
      },
    ],
  },
  {
    id: 'cloud-native',
    label: 'Cloud-Native',
    heading: 'Built for modern infrastructure',
    description:
      'Kubernetes-native, horizontally scalable, with Git-like branching for your data.',
    features: [
      {
        title: 'Database Branching',
        icon: GitBranch,
        description:
          'Create isolated branches of your database for development, testing, and CI/CD. Merge back when ready.',
        code: 'CREATE BRANCH feature_login FROM main; -- work, test, merge',
      },
      {
        title: 'Zero-Downtime Migrations',
        icon: ArrowUpCircle,
        description:
          'Apply schema changes without locking tables. Background migration engine handles large tables safely.',
        code: 'ALTER TABLE users ADD COLUMN mfa_enabled BOOLEAN DEFAULT false; -- zero lock',
      },
      {
        title: 'Auto-Scaling',
        icon: TrendingUp,
        description:
          'Compute and storage scale independently based on workload. Pay for what you use, when you use it.',
        code: 'SET auto_scale = true; -- handles the rest',
      },
      {
        title: 'Multi-Region',
        icon: Globe,
        description:
          'Replicate data across regions with configurable consistency. Built-in conflict resolution.',
        code: "CREATE REPLICATION london FROM us_east WITH consistency = 'strong';",
      },
    ],
  },
  {
    id: 'streaming',
    label: 'Streaming',
    heading: 'Real-time data, real-time queries',
    description:
      'Subscribe to queries, stream changes, and build reactive applications on live data.',
    features: [
      {
        title: 'Streaming SQL',
        icon: Waves,
        description:
          'Subscribe to any SELECT query and receive live updates as underlying data changes.',
        code: 'SUBSCRIBE SELECT symbol, AVG(price) FROM trades GROUP BY symbol;',
      },
      {
        title: 'Native CDC',
        icon: Repeat,
        description:
          'Capture every change and stream to external systems. Kafka, WebSocket, and webhook targets.',
        code: "CREATE REPLICATION_SLOT warehouse TO kafka('events-topic');",
      },
      {
        title: 'Event Triggers',
        icon: Bell,
        description:
          'Execute functions when data changes. Build reactive workflows without polling.',
        code: "CREATE TRIGGER notify ON orders AFTER INSERT EXECUTE send_webhook('https://api.store/notify');",
      },
      {
        title: 'Materialized Views',
        icon: RefreshCw,
        description:
          'Pre-computed views that refresh automatically or on demand. Perfect for dashboards.',
        code: 'CREATE MATERIALIZED VIEW daily_sales AS SELECT date, SUM(amount) FROM orders GROUP BY date;',
      },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    heading: 'Enterprise-grade protection',
    description:
      'Confidential computing, row-level security, and encryption — because your data deserves fortress-level defense.',
    features: [
      {
        title: 'Confidential Computing (TEE)',
        icon: Lock,
        description:
          'Run queries inside Trusted Execution Environments. Data is encrypted even during processing.',
        code: 'SET confidential_compute = true; -- hardware-isolated enclave',
      },
      {
        title: 'Row-Level Security',
        icon: Shield,
        description:
          'Define per-row access policies. Users automatically see only data they\'re authorized for.',
        code: 'CREATE POLICY tenant_isolation ON orders USING (tenant_id = current_tenant());',
      },
      {
        title: 'Differential Privacy',
        icon: Key,
        description:
          'Client-side encryption with keys you control. VedaDB never sees plaintext.',
        code: "INSERT INTO secrets VALUES (encrypt('password', client_key));",
      },
      {
        title: 'Zero-Knowledge Proofs',
        icon: ClipboardList,
        description:
          'Comprehensive audit trail of every query, connection, and administrative action. SIEM-ready.',
        code: "SELECT * FROM audit_log WHERE action = 'schema_change' AND ts > NOW() - INTERVAL '7 days';",
      },
    ],
  },
];

const tabColors: Record<string, string> = {
  'ai-native': '#00D4AA',
  multimodal: '#E8A838',
  'cloud-native': '#3B82F6',
  streaming: '#8B5CF6',
  security: '#22C55E',
};

const stats = [
  { value: '174,093', label: 'Lines of Code' },
  { value: '226', label: 'Source Files' },
  { value: '373+', label: 'Tests' },
  { value: '37', label: 'Benchmarks' },
];

/* ------------------------------------------------------------------ */
/*  Feature Card (Framer Motion — isolated from GSAP)                  */
/* ------------------------------------------------------------------ */

function FeatureCard({
  feature,
  accentColor,
  index,
}: {
  feature: FeatureItem;
  accentColor: string;
  index: number;
}) {
  const IconComp = feature.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className="group bg-veda-card border border-veda-border-subtle rounded-xl p-8 hover:border-veda-border-active hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <IconComp size={24} style={{ color: accentColor }} />
        <h3 className="text-xl font-bold text-white">{feature.title}</h3>
      </div>
      <p className="text-[15px] text-veda-gray leading-relaxed mb-4">
        {feature.description}
      </p>
      <CodeBlock code={feature.code} />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);

  /* Count-up animation for stats — GSAP isolated */
  useGSAP(() => {
    if (!statsRef.current) return;
    const statEls = statsRef.current.querySelectorAll('.stat-number');
    gsap.from(statEls, {
      textContent: 0,
      duration: 1.5,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: statsRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      snap: { textContent: 1 },
      onUpdate: function () {
        const el = this.targets()[0] as HTMLElement;
        const val = parseFloat(el.textContent || '0');
        el.textContent = Math.floor(val).toLocaleString();
      },
    });
  }, { scope: statsRef });

  const currentCategory = categories[activeTab];
  const accentColor = tabColors[currentCategory.id] || '#00D4AA';

  return (
    <div>
      {/* ========== HERO ========== */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-veda-bg via-veda-bg-light to-veda-bg" />
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[150px]"
            style={{
              background: 'radial-gradient(circle, rgba(232,168,56,0.25) 0%, transparent 70%)',
              top: '-10%',
              left: '20%',
              animation: 'float 8s ease-in-out infinite',
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[150px]"
            style={{
              background: 'radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%)',
              bottom: '-10%',
              right: '15%',
              animation: 'float 10s ease-in-out infinite reverse',
            }}
          />
        </div>

        <div className="relative z-10 veda-container text-center max-w-[720px] mx-auto py-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs font-semibold text-veda-amber uppercase tracking-[0.1em] mb-6"
          >
            Features
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-5xl md:text-[56px] font-black text-white leading-[1.1]"
          >
            Everything you need. Nothing you don&apos;t.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-veda-gray mt-4"
          >
            One database with 8 models, AI functions, multimodal search, and enterprise security.
          </motion.p>

          {/* Category pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2.5 mt-10"
          >
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                  activeTab === i
                    ? 'border-veda-amber text-veda-amber bg-[rgba(232,168,56,0.1)]'
                    : 'border-veda-border-subtle text-veda-gray hover:border-veda-amber hover:text-veda-amber hover:bg-[rgba(232,168,56,0.05)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== FEATURE CATEGORIES ========== */}
      <section className="veda-section bg-veda-bg">
        <div className="veda-container">
          {/* Tab Header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id + '-header'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mb-10"
            >
              <span
                className="text-xs font-semibold uppercase tracking-[0.1em]"
                style={{ color: accentColor }}
              >
                {currentCategory.label}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
                {currentCategory.heading}
              </h2>
              <p className="text-base text-veda-gray max-w-[640px] mt-3">
                {currentCategory.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Feature Cards Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              className="grid md:grid-cols-2 gap-6"
            >
              {currentCategory.features.map((feature, i) => (
                <FeatureCard
                  key={feature.title}
                  feature={feature}
                  accentColor={accentColor}
                  index={i}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ========== STATS STRIP ========== */}
      <section className="relative border-t border-veda-border-subtle bg-veda-bg-light py-16">
        <div className="veda-container">
          <SectionReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-bold text-veda-amber mb-1">
                    {s.value}
                  </div>
                  <div className="text-sm text-veda-gray">{s.label}</div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-20 bg-veda-bg">
        <div className="veda-container max-w-[640px] text-center">
          <SectionReveal>
            <h2 className="text-4xl font-extrabold text-white">
              Ready to explore VedaDB?
            </h2>
            <p className="text-base text-veda-gray mt-3">
              Start building free. No credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a
                href="#/pricing"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-veda-amber text-veda-bg font-bold rounded-lg hover:bg-veda-amber-glow hover:shadow-[0_0_24px_rgba(232,168,56,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                Get Started Free
                <ChevronRight size={18} />
              </a>
              <a
                href="#/docs"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-veda-border-subtle text-white font-semibold rounded-lg hover:border-veda-amber hover:text-veda-amber hover:bg-[rgba(232,168,56,0.05)] transition-all duration-300"
              >
                View Documentation
              </a>
            </div>
          </SectionReveal>
         </div>
      </section>
    </div>
  );
}
