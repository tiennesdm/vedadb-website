import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BenchmarkData {
  label: string;
  vedadb: { value: number; display: string };
  mysql?: { value: number; display: string };
  mongodb?: { value: number; display: string };
  redis?: { value: number; display: string };
}

const benchmarks: BenchmarkData[] = [
  {
    label: 'SQL Queries/sec',
    vedadb: { value: 100, display: '1.2M' },
    mysql: { value: 10, display: '120K' },
    mongodb: { value: 7, display: '85K' },
  },
  {
    label: 'Vector Search (Recall@10)',
    vedadb: { value: 100, display: '0.98' },
  },
  {
    label: 'Key-Value ops/sec',
    vedadb: { value: 100, display: '2.8M' },
    redis: { value: 29, display: '800K' },
  },
  {
    label: 'Mixed Workload',
    vedadb: { value: 100, display: '450K' },
    mysql: { value: 10, display: '45K' },
    mongodb: { value: 7, display: '30K' },
    redis: { value: 27, display: '120K' },
  },
];

const COLORS = {
  vedadb: '#76B900',
  mysql: '#4479A1',
  mongodb: '#47A248',
  redis: '#DC382D',
};

/**
 * AnimatedCounter — counts up from 0 to target when in viewport
 */
function AnimatedCounter({
  target,
  display,
  className = '',
}: {
  target: number;
  display: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted || !ref.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.2,
      ease: 'power3.out',
      onUpdate: () => {
        if (ref.current) {
          // Show the final formatted display string, but animate opacity
          ref.current.style.opacity = String(Math.min(obj.val / target, 1));
          ref.current.textContent = display;
        }
      },
    });
  }, [hasStarted, target, display]);

  return (
    <span ref={ref} className={className} style={{ opacity: 0 }}>
      0
    </span>
  );
}

function BenchmarksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const ease = 'power3.out';

    // Heading
    gsap.fromTo(
      '.bench-heading',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7,
        ease,
        scrollTrigger: { trigger: '.bench-heading', start: 'top 75%' },
      }
    );

    gsap.fromTo(
      '.bench-sub',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, delay: 0.1,
        ease,
        scrollTrigger: { trigger: '.bench-sub', start: 'top 75%' },
      }
    );

    // Each benchmark row
    gsap.fromTo(
      '.bench-row',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7,
        stagger: 0.15,
        ease,
        scrollTrigger: { trigger: '.bench-rows', start: 'top 75%' },
      }
    );

    // Bar width animations
    const bars = sectionRef.current.querySelectorAll('.bench-bar');
    bars.forEach((bar) => {
      const targetWidth = (bar as HTMLElement).dataset.width || '0';
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: `${targetWidth}%`,
          duration: 1.2,
          ease,
          scrollTrigger: { trigger: bar, start: 'top 85%' },
        }
      );
    });
  }, { scope: sectionRef });

  const renderBar = (
    db: string,
    data: { value: number; display: string } | undefined,
    color: string
  ) => {
    if (!data) return null;
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-medium"
            style={{ color: 'var(--text-muted)' }}
          >
            {db}
          </span>
          <AnimatedCounter
            target={data.value}
            display={data.display}
            className="text-xs font-mono"
            // Color: green for VedaDB, muted for others
            // We'll handle color via inline in the span
          />
        </div>
        <div
          className="h-7 rounded overflow-hidden"
          style={{ backgroundColor: 'var(--bg-tertiary)' }}
        >
          <div
            className="bench-bar h-full rounded flex items-center px-2"
            data-width={data.value}
            style={{
              width: '0%',
              backgroundColor: color,
              boxShadow: db === 'VedaDB' ? '0 0 12px rgba(118,185,0,0.4)' : 'none',
            }}
          >
            <span
              className="text-xs font-mono font-medium"
              style={{ color: db === 'VedaDB' ? '#000' : 'var(--text-primary)' }}
            >
              {data.display}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} id="benchmarks" className="veda-section">
      <div className="veda-container">
        {/* Heading */}
        <div className="mb-16">
          <h2 className="bench-heading veda-section-h2 text-[var(--text-primary)] mb-4">
            Performance That Speaks
          </h2>
          <p
            className="bench-sub veda-subheadline max-w-2xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            Real benchmarks against industry-standard databases. Same hardware, same dataset.
          </p>
        </div>

        {/* Benchmark Rows */}
        <div className="bench-rows space-y-10 max-w-4xl">
          {benchmarks.map((bm) => (
            <div key={bm.label} className="bench-row">
              {/* Label */}
              <div
                className="text-sm font-medium mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                {bm.label}
              </div>

              {/* Bars grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {renderBar('VedaDB', bm.vedadb, COLORS.vedadb)}
                {renderBar('MySQL', bm.mysql, COLORS.mysql)}
                {renderBar('MongoDB', bm.mongodb, COLORS.mongodb)}
                {renderBar('Redis', bm.redis, COLORS.redis)}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note + link */}
        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-4xl">
          <p
            className="text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            Results from internal benchmark suite. Your results may vary based on hardware configuration.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-[var(--accent-green)]"
            style={{ color: 'var(--accent-green)' }}
          >
            <ExternalLink size={14} />
            Run benchmarks yourself
          </a>
        </div>
      </div>
    </section>
  );
}

export { BenchmarksSection };
