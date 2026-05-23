import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Zap, Cpu, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const techBadges = ['Go', 'Rust', 'CUDA', 'Apache Arrow', 'cuVS', 'cuGraph'];

const tiers = [
  {
    key: 'gpu',
    label: 'GPU ACCELERATION',
    sublabel: 'cuVS \u00B7 cuGraph \u00B7 CUDA Kernels',
    color: 'var(--gpu-tier)',
    bg: 'rgba(118,185,0,0.05)',
    icon: Zap,
  },
  {
    key: 'tpu',
    label: 'TPU INFERENCE',
    sublabel: 'Neural Query Optimizer',
    color: 'var(--tpu-tier)',
    bg: 'rgba(255,109,0,0.05)',
    icon: Cpu,
  },
  {
    key: 'cpu',
    label: 'CPU CORE',
    sublabel: 'Transactional Engine \u00B7 SQL Parser',
    color: 'var(--cpu-tier)',
    bg: 'rgba(41,98,255,0.05)',
    icon: Database,
  },
];

function ArchitectureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const ease = 'power3.out';

    // Left column text elements
    gsap.fromTo(
      '.arch-text-item',
      { x: -30, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.7,
        stagger: 0.1,
        ease,
        scrollTrigger: { trigger: '.arch-left', start: 'top 75%' },
      }
    );

    // Tech badges
    gsap.fromTo(
      '.arch-badge',
      { scale: 0.9, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.4,
        stagger: 0.05,
        delay: 0.4,
        ease,
        scrollTrigger: { trigger: '.arch-badges', start: 'top 75%' },
      }
    );

    // Tier cards (right column)
    gsap.fromTo(
      '.arch-tier',
      { x: 60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8,
        stagger: 0.15,
        ease,
        scrollTrigger: { trigger: '.arch-right', start: 'top 75%' },
      }
    );

    // Arrows
    gsap.fromTo(
      '.arch-arrow',
      { opacity: 0 },
      {
        opacity: 1, duration: 0.5, delay: 0.6,
        ease,
        scrollTrigger: { trigger: '.arch-right', start: 'top 75%' },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="architecture"
      className="veda-section"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="veda-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column — Text */}
          <div className="arch-left space-y-6">
            <div className="arch-text-item">
              <h2 className="veda-section-h2 text-[var(--text-primary)] mb-4">
                GPU-First Architecture
              </h2>
            </div>

            <p
              className="arch-text-item veda-subheadline"
              style={{ color: 'var(--text-secondary)' }}
            >
              Workload-adaptive execution that routes queries to the optimal compute tier.
            </p>

            <p
              className="arch-text-item text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              VedaDB&apos;s 3-tier execution model automatically offloads queries to GPU for
              maximum parallelism, falls back to TPU for inference-heavy workloads, and uses
              CPU for transactional operations.
            </p>

            {/* Tech stack badges */}
            <div className="arch-badges arch-text-item flex flex-wrap gap-2 pt-2">
              {techBadges.map((badge) => (
                <span
                  key={badge}
                  className="arch-badge px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="arch-text-item flex items-center gap-8 pt-4">
              <div>
                <span
                  className="text-2xl font-bold block"
                  style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-heading)' }}
                >
                  230K+
                </span>
                <span
                  className="text-xs uppercase tracking-wide"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                >
                  Lines of Code
                </span>
              </div>
              <div>
                <span
                  className="text-2xl font-bold block"
                  style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-heading)' }}
                >
                  1,382+
                </span>
                <span
                  className="text-xs uppercase tracking-wide"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                >
                  Tests
                </span>
              </div>
            </div>
          </div>

          {/* Right Column — 3-Tier Diagram */}
          <div className="arch-right space-y-0">
            {tiers.map((tier, idx) => {
              const Icon = tier.icon;
              const isDimmed = hoveredTier !== null && hoveredTier !== tier.key;
              const isHighlighted = hoveredTier === tier.key;

              return (
                <div key={tier.key} className="relative">
                  {/* Tier card */}
                  <div
                    className="arch-tier relative p-5 rounded-lg border cursor-default transition-all duration-300"
                    style={{
                      backgroundColor: tier.bg,
                      borderColor: isHighlighted
                        ? tier.color
                        : 'transparent',
                      opacity: isDimmed ? 0.5 : 1,
                      borderLeftWidth: '3px',
                      marginBottom: idx < tiers.length - 1 ? '12px' : '0',
                    }}
                    onMouseEnter={() => setHoveredTier(tier.key)}
                    onMouseLeave={() => setHoveredTier(null)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${tier.color}20` }}
                      >
                        <Icon size={20} style={{ color: tier.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-sm font-semibold uppercase tracking-wide mb-0.5"
                          style={{
                            color: tier.color,
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 500,
                          }}
                        >
                          {tier.label}
                        </h3>
                        <p
                          className="text-sm truncate"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {tier.sublabel}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow between tiers */}
                  {idx < tiers.length - 1 && (
                    <div className="arch-arrow flex justify-center py-1.5">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="animate-bounce"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <path
                          d="M8 3v10m0 0L4 9m4 4l4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export { ArchitectureSection };
