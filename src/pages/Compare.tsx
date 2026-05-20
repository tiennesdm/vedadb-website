import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Database, ChevronRight } from 'lucide-react';
import { ComparisonTable } from '@/components/ComparisonTable';
import type { ComparisonRow } from '@/components/ComparisonTable';
import { SectionReveal } from '@/components/SectionReveal';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const competitors = [
  { name: 'PostgreSQL', score: '3/14', features: 'SQL, Full-Text, basic JSON', scoreColor: '#EF4444' },
  { name: 'MongoDB', score: '2/14', features: 'Document, basic Search', scoreColor: '#EF4444' },
  { name: 'Neo4j', score: '1/14', features: 'Graph only', scoreColor: '#EF4444' },
  { name: 'Redis', score: '1/14', features: 'Key-Value only', scoreColor: '#EF4444' },
  { name: 'Pinecone', score: '1/14', features: 'Vector only', scoreColor: '#EF4444' },
  { name: 'InfluxDB', score: '1/14', features: 'Time-Series only', scoreColor: '#EF4444' },
  { name: 'ClickHouse', score: '2/14', features: 'Columnar, SQL', scoreColor: '#EF4444' },
  { name: 'Elasticsearch', score: '2/14', features: 'Search, basic analytics', scoreColor: '#EF4444' },
];

const tableHeaders = [
  'Feature',
  'VedaDB',
  'PostgreSQL',
  'MongoDB',
  'Neo4j',
  'Redis',
  'Pinecone',
  'InfluxDB',
  'ClickHouse',
  'Elasticsearch',
];

const tableRows: ComparisonRow[] = [
  { feature: 'SQL Queries', vedadb: true, postgresql: true, mongodb: false, neo4j: false, redis: false, pinecone: false, influxdb: 'partial', clickhouse: 'partial', elasticsearch: false },
  { feature: 'Document Store', vedadb: true, postgresql: false, mongodb: true, neo4j: false, redis: false, pinecone: false, influxdb: false, clickhouse: false, elasticsearch: false },
  { feature: 'Graph Queries', vedadb: true, postgresql: false, mongodb: false, neo4j: true, redis: false, pinecone: false, influxdb: false, clickhouse: false, elasticsearch: false },
  { feature: 'Vector Search', vedadb: true, postgresql: false, mongodb: false, neo4j: false, redis: false, pinecone: true, influxdb: false, clickhouse: false, elasticsearch: false },
  { feature: 'Key-Value', vedadb: true, postgresql: false, mongodb: false, neo4j: false, redis: true, pinecone: false, influxdb: false, clickhouse: false, elasticsearch: false },
  { feature: 'Time-Series', vedadb: true, postgresql: false, mongodb: false, neo4j: false, redis: false, pinecone: false, influxdb: true, clickhouse: false, elasticsearch: false },
  { feature: 'Columnar', vedadb: true, postgresql: false, mongodb: false, neo4j: false, redis: false, pinecone: false, influxdb: false, clickhouse: true, elasticsearch: false },
  { feature: 'Full-Text Search', vedadb: true, postgresql: false, mongodb: false, neo4j: false, redis: false, pinecone: false, influxdb: false, clickhouse: false, elasticsearch: true },
  { feature: 'AI-Native Functions', vedadb: true, postgresql: false, mongodb: false, neo4j: false, redis: false, pinecone: false, influxdb: false, clickhouse: false, elasticsearch: false },
  { feature: 'Multimodal Search', vedadb: true, postgresql: false, mongodb: false, neo4j: false, redis: false, pinecone: false, influxdb: false, clickhouse: false, elasticsearch: false },
  { feature: 'Confidential Computing', vedadb: true, postgresql: false, mongodb: false, neo4j: false, redis: false, pinecone: false, influxdb: false, clickhouse: false, elasticsearch: false },
  { feature: 'Streaming SQL', vedadb: true, postgresql: false, mongodb: false, neo4j: false, redis: false, pinecone: false, influxdb: false, clickhouse: false, elasticsearch: false },
  { feature: 'Database Branching', vedadb: true, postgresql: false, mongodb: false, neo4j: false, redis: false, pinecone: false, influxdb: false, clickhouse: false, elasticsearch: false },
  { feature: 'Monthly Cost', vedadb: '$299', postgresql: '$600+', mongodb: '$600+', neo4j: '$900+', redis: '$300+', pinecone: '$200+', influxdb: '$300+', clickhouse: '$500+', elasticsearch: '$400+' },
];

const costData = [
  { name: 'PostgreSQL', cost: 400, color: '#3B82F6' },
  { name: 'MongoDB', cost: 500, color: '#22C55E' },
  { name: 'Neo4j', cost: 1200, color: '#A855F7' },
  { name: 'Redis', cost: 200, color: '#EF4444' },
  { name: 'Pinecone', cost: 700, color: '#E8A838' },
  { name: 'InfluxDB', cost: 400, color: '#06B6D4' },
  { name: 'ClickHouse', cost: 600, color: '#F97316' },
  { name: 'Elasticsearch', cost: 800, color: '#EC4899' },
];

const vedadbCost = 299;
const othersTotal = costData.reduce((sum, d) => sum + d.cost, 0);
const yearlySavings = (othersTotal - vedadbCost) * 12;

/* ------------------------------------------------------------------ */
/*  At-a-Glance Card                                                   */
/* ------------------------------------------------------------------ */

function CompetitorCard({
  name,
  score,
  features,
  scoreColor,
  highlighted,
  index,
}: {
  name: string;
  score: string;
  features: string;
  scoreColor: string;
  highlighted?: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className={`rounded-xl p-6 ${
        highlighted
          ? 'bg-veda-card border-2 border-veda-amber'
          : 'bg-veda-card border border-veda-border-subtle'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            highlighted ? 'bg-veda-amber/20' : 'bg-veda-bg-light'
          }`}
        >
          <Database size={20} className={highlighted ? 'text-veda-amber' : 'text-veda-gray-muted'} />
        </div>
        <div>
          <h3 className={highlighted ? 'text-xl font-bold text-veda-amber' : 'text-xl font-bold text-white'}>
            {name}
          </h3>
          <p className="text-sm font-medium" style={{ color: scoreColor }}>
            {score}
          </p>
        </div>
      </div>
      <p className="text-sm text-veda-gray mt-3">{features}</p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function Compare() {
  const costSectionRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  /* Animated cost bars — GSAP isolated */
  useGSAP(() => {
    if (!barsRef.current) return;

    const bars = barsRef.current.querySelectorAll('.cost-bar');
    gsap.from(bars, {
      scaleX: 0,
      duration: 1.5,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: barsRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    const badge = barsRef.current.querySelector('.savings-badge');
    if (badge) {
      gsap.from(badge, {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        delay: 1.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: barsRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, { scope: costSectionRef });

  return (
    <div>
      {/* ========== HERO ========== */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-veda-bg via-veda-bg-light to-veda-bg" />
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[140px]"
            style={{
              background: 'radial-gradient(circle, rgba(232,168,56,0.3) 0%, transparent 70%)',
              top: '10%',
              left: '30%',
            }}
          />
        </div>

        <div className="relative z-10 veda-container text-center max-w-[800px] mx-auto py-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs font-semibold text-veda-amber uppercase tracking-[0.1em] mb-6"
          >
            Compare
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-5xl md:text-[56px] font-black text-white leading-[1.1]"
          >
            Compare VedaDB
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-veda-gray mt-4"
          >
            See how we stack up against the competition
          </motion.p>
        </div>
      </section>

      {/* ========== AT-A-GLANCE CARDS ========== */}
      <section className="py-16 bg-veda-bg">
        <div className="veda-container">
          <SectionReveal>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-10">
              At a Glance
            </h2>
          </SectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* VedaDB card — highlighted, always first */}
            <CompetitorCard
              name="VedaDB"
              score="14/14"
              features="All features — SQL, Document, Graph, Vector, Key-Value, Time-Series, Columnar, Search, AI-Native, Multimodal, Confidential Computing, Streaming, Branching, Unified API"
              scoreColor="#22C55E"
              highlighted
              index={0}
            />
            {competitors.map((c, i) => (
              <CompetitorCard
                key={c.name}
                name={c.name}
                score={c.score}
                features={c.features}
                scoreColor={c.scoreColor}
                index={i + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== FULL COMPARISON TABLE ========== */}
      <section className="py-20 bg-veda-bg-light">
        <div className="veda-container">
          <SectionReveal>
            <h2 className="text-3xl md:text-[40px] font-extrabold text-white">
              The complete feature matrix
            </h2>
            <p className="text-base text-veda-gray mt-2 mb-10">
              Every feature. Every competitor. The full picture.
            </p>
          </SectionReveal>

          <SectionReveal>
            <ComparisonTable headers={tableHeaders} rows={tableRows} />
          </SectionReveal>
        </div>
      </section>

      {/* ========== COST COMPARISON ========== */}
      <section ref={costSectionRef} className="py-20 bg-veda-bg">
        <div className="veda-container">
          <SectionReveal>
            <h2 className="text-3xl md:text-[40px] font-extrabold text-white">
              The cost of running eight databases
            </h2>
            <p className="text-base text-veda-gray mt-2 mb-10">
              Infrastructure + operational overhead. One number tells the story.
            </p>
          </SectionReveal>

          <div
            ref={barsRef}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            {/* Left: The Stack Approach */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                The Stack Approach
              </h3>
              <div className="bg-veda-card rounded-xl p-6 border border-veda-border-subtle space-y-2">
                {costData.map((d) => (
                  <div key={d.name} className="flex items-center gap-3">
                    <span className="text-sm text-veda-gray w-32 shrink-0 text-right">
                      {d.name}
                    </span>
                    <div className="flex-1 h-8 bg-veda-bg rounded-md overflow-hidden">
                      <div
                        className="cost-bar h-full rounded-md flex items-center justify-end pr-3 origin-left"
                        style={{
                          width: `${(d.cost / 1200) * 100}%`,
                          backgroundColor: d.color,
                        }}
                      >
                        <span className="text-xs font-semibold text-white drop-shadow">
                          ${d.cost}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t border-veda-border-subtle flex items-center justify-between">
                  <span className="text-sm text-veda-gray">Total</span>
                  <span className="text-2xl font-extrabold text-veda-red">
                    ${othersTotal.toLocaleString()}/mo
                  </span>
                </div>
                <p className="text-sm text-veda-gray">8 databases to manage</p>
              </div>
            </div>

            {/* Right: The VedaDB Approach */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                The VedaDB Approach
              </h3>
              <div className="bg-veda-card rounded-xl p-6 border border-veda-border-subtle">
                <div className="h-8 bg-veda-bg rounded-md overflow-hidden mb-4">
                  <div
                    className="cost-bar h-full rounded-md flex items-center justify-end pr-3 origin-left"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(90deg, #E8A838 0%, #FFC850 100%)',
                    }}
                  >
                    <span className="text-xs font-semibold text-veda-bg">
                      ${vedadbCost}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-veda-gray mb-4">
                  One platform. All models.
                </p>

                <div className="savings-badge inline-block bg-veda-green/15 text-veda-green px-6 py-3 rounded-lg text-lg font-bold">
                  Save ${(othersTotal - vedadbCost).toLocaleString()}/mo
                </div>
                <p className="text-sm text-veda-gray-muted mt-3">
                  That&apos;s ${yearlySavings.toLocaleString()} saved per year
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-20 bg-veda-bg-light">
        <div className="veda-container max-w-[640px] text-center">
          <SectionReveal>
            <h2 className="text-4xl font-extrabold text-white">
              One database. Zero compromises.
            </h2>
            <p className="text-base text-veda-gray mt-3">
              Join thousands of developers who&apos;ve simplified their stack with VedaDB.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a
                href="#/pricing"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-veda-amber text-veda-bg font-bold rounded-lg hover:bg-veda-amber-glow hover:shadow-[0_0_24px_rgba(232,168,56,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                Start Free
                <ChevronRight size={18} />
              </a>
              <a
                href="#/docs"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-veda-border-subtle text-white font-semibold rounded-lg hover:border-veda-amber hover:text-veda-amber hover:bg-[rgba(232,168,56,0.05)] transition-all duration-300"
              >
                Schedule Demo
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
