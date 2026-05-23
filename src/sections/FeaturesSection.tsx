import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  TableProperties,
  FileJson,
  Share2,
  HardDrive,
  CircleDot,
  BarChart3,
  Clock,
  Layers,
  Link,
  ArrowRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const engines = [
  {
    icon: TableProperties,
    name: 'SQL + Joins',
    desc: 'Full relational engine with JOINs, subqueries, and ACID transactions',
  },
  {
    icon: FileJson,
    name: 'Document Store',
    desc: 'Native JSON document storage with nested query support',
  },
  {
    icon: Share2,
    name: 'Graph Database',
    desc: 'Cypher-compatible graph engine for connected data',
  },
  {
    icon: HardDrive,
    name: 'Key-Value',
    desc: 'In-memory speed with persistence, Redis-compatible protocol',
  },
  {
    icon: CircleDot,
    name: 'Vector Search',
    desc: 'HNSW and IVF indexes for similarity search',
  },
  {
    icon: BarChart3,
    name: 'Columnar',
    desc: 'Apache Arrow columnar engine for analytics workloads',
  },
  {
    icon: Clock,
    name: 'Time-Series',
    desc: 'Optimized for high-ingest time-series data',
  },
  {
    icon: Layers,
    name: 'Cache Engine',
    desc: 'Multi-tier caching with LRU and TTL eviction',
  },
  {
    icon: Link,
    name: 'Ledger',
    desc: 'Append-only immutable ledger with cryptographic verification',
  },
];

function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const ease = 'power3.out';

    // Heading
    gsap.fromTo(
      '.features-heading',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8,
        ease,
        scrollTrigger: { trigger: '.features-heading', start: 'top 80%' },
      }
    );

    // Subhead
    gsap.fromTo(
      '.features-sub',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, delay: 0.15,
        ease,
        scrollTrigger: { trigger: '.features-sub', start: 'top 80%' },
      }
    );

    // Cards
    gsap.fromTo(
      '.feature-card',
      { y: 50, opacity: 0, scale: 0.97 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.7,
        stagger: 0.08,
        ease,
        scrollTrigger: { trigger: '.features-grid', start: 'top 80%' },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="features" className="veda-section">
      <div className="veda-container">
        {/* Green accent line */}
        <div
          className="features-heading w-16 h-0.5 mx-auto mb-8"
          style={{ backgroundColor: 'var(--accent-green)' }}
        />

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="veda-section-h2 text-[var(--text-primary)] mb-4">
            One Binary. Nine Engines.
          </h2>
          <p
            className="features-sub veda-subheadline max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            From relational queries to vector search — all included, no plugins needed.
          </p>
        </div>

        {/* 3x3 Grid */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engines.map((engine, idx) => {
            const Icon = engine.icon;
            return (
              <div
                key={engine.name}
                className="feature-card veda-card group cursor-default"
              >
                {/* Icon Badge */}
                <div className="veda-icon-badge mb-6 group-hover:bg-[var(--accent-green-dim)] group-hover:border-[var(--border-green)]">
                  <Icon
                    size={22}
                    style={{ color: 'var(--accent-green)' }}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Engine Name */}
                <h3 className="veda-feature-title text-[var(--text-primary)] mb-2">
                  {engine.name}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-6 line-clamp-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {engine.desc}
                </p>

                {/* Engine number + arrow */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs uppercase tracking-wide"
                    style={{
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 500,
                    }}
                  >
                    Engine #{String(idx + 1).padStart(2, '0')}
                  </span>
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: 'var(--text-muted)' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { FeaturesSection };
