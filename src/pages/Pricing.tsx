import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus, Plus, ChevronRight } from 'lucide-react';
import { SectionReveal } from '@/components/SectionReveal';

/* ───────── data ───────── */

interface Tier {
  name: string;
  color: string;
  priceMonthly: string;
  priceYearly: string;
  period: string;
  periodYearly: string;
  description: string;
  features: string[];
  cta: string;
  ctaStyle: 'primary' | 'secondary';
  popular?: boolean;
}

const tiers: Tier[] = [
  {
    name: 'Free',
    color: '#8B95A5',
    priceMonthly: '$0',
    priceYearly: '$0',
    period: '/month, forever',
    periodYearly: '/month, forever',
    description: 'For hobbyists, students, and early experimentation.',
    features: [
      'Up to 3 projects',
      '1 GB storage',
      'Community support (Discord)',
      'All 8 data models',
      'REST API access',
    ],
    cta: 'Get Started',
    ctaStyle: 'secondary',
  },
  {
    name: 'Starter',
    color: '#00D4AA',
    priceMonthly: '$49',
    priceYearly: '$39',
    period: '/month',
    periodYearly: '/month, billed yearly',
    description: 'For small teams shipping production workloads.',
    features: [
      'Everything in Free',
      '50 GB storage',
      'Email support (48h SLA)',
      'AI functions',
      'Database branching',
      'SSL certificates included',
      'Up to 5 team seats',
    ],
    cta: 'Start Free Trial',
    ctaStyle: 'secondary',
  },
  {
    name: 'Pro',
    color: '#E8A838',
    priceMonthly: '$299',
    priceYearly: '$239',
    period: '/month',
    periodYearly: '/month, billed yearly',
    description: 'For growing teams that need power and reliability.',
    features: [
      'Everything in Starter',
      '500 GB storage',
      'Priority support (4h SLA)',
      'Multimodal search (image, audio, video)',
      'Streaming SQL subscriptions',
      'CDC replication',
      'Custom domains',
      '10 team seats',
      'Advanced query analytics',
      '99.99% uptime SLA',
      'Dedicated account manager',
    ],
    cta: 'Start Free Trial',
    ctaStyle: 'primary',
    popular: true,
  },
  {
    name: 'Enterprise',
    color: '#FFFFFF',
    priceMonthly: 'Custom',
    priceYearly: 'Custom',
    period: 'Contact us for pricing',
    periodYearly: 'Contact us for pricing',
    description: 'For organizations with mission-critical data at scale.',
    features: [
      'Everything in Pro',
      'Unlimited storage',
      'Dedicated infrastructure (single-tenant)',
      'TEE / Confidential computing',
      'Custom SLAs and contracts',
      'On-premise deployment option',
      '24/7 phone + Slack support',
    ],
    cta: 'Talk to Sales',
    ctaStyle: 'secondary',
  },
];

/* Feature-matrix data */

interface FeatureRow {
  feature: string;
  free: string;
  starter: string;
  pro: string;
  enterprise: string;
}

interface FeatureCategory {
  category: string;
  rows: FeatureRow[];
}

const featureCategories: FeatureCategory[] = [
  {
    category: 'Core Database',
    rows: [
      { feature: 'SQL/Relational', free: 'y', starter: 'y', pro: 'y', enterprise: 'y' },
      { feature: 'Document Store', free: 'y', starter: 'y', pro: 'y', enterprise: 'y' },
      { feature: 'Graph Queries', free: 'y', starter: 'y', pro: 'y', enterprise: 'y' },
      { feature: 'Vector Search', free: 'y', starter: 'y', pro: 'y', enterprise: 'y' },
      { feature: 'Key-Value', free: 'y', starter: 'y', pro: 'y', enterprise: 'y' },
      { feature: 'Time-Series', free: 'y', starter: 'y', pro: 'y', enterprise: 'y' },
      { feature: 'Columnar', free: 'y', starter: 'y', pro: 'y', enterprise: 'y' },
      { feature: 'Full-Text Search', free: 'y', starter: 'y', pro: 'y', enterprise: 'y' },
    ],
  },
  {
    category: 'AI & Advanced',
    rows: [
      { feature: 'AI Functions (LLM calls)', free: '100/mo', starter: '1,000/mo', pro: '10,000/mo', enterprise: 'Unlimited' },
      { feature: 'Vector Embeddings', free: 'y', starter: 'y', pro: 'y', enterprise: 'y' },
      { feature: 'Multimodal Search', free: 'n', starter: 'n', pro: 'y', enterprise: 'y' },
      { feature: 'Model Hosting', free: 'n', starter: 'n', pro: '3 models', enterprise: 'Unlimited' },
    ],
  },
  {
    category: 'Operations',
    rows: [
      { feature: 'Database Branching', free: '3 branches', starter: '10 branches', pro: 'Unlimited', enterprise: 'Unlimited' },
      { feature: 'Streaming SQL', free: 'n', starter: 'n', pro: 'y', enterprise: 'y' },
      { feature: 'CDC Replication', free: 'n', starter: 'n', pro: 'y', enterprise: 'y' },
      { feature: 'Auto-Scaling', free: 'n', starter: 'y', pro: 'y', enterprise: 'y' },
    ],
  },
  {
    category: 'Security',
    rows: [
      { feature: 'Row-Level Security', free: 'y', starter: 'y', pro: 'y', enterprise: 'y' },
      { feature: 'SSL/TLS', free: 'y', starter: 'y', pro: 'y', enterprise: 'y' },
      { feature: 'TEE/Confidential', free: 'n', starter: 'n', pro: 'n', enterprise: 'y' },
      { feature: 'Audit Logging', free: 'n', starter: 'n', pro: 'y', enterprise: 'y' },
      { feature: 'SSO/SAML', free: 'n', starter: 'n', pro: 'n', enterprise: 'y' },
    ],
  },
  {
    category: 'Support & Scale',
    rows: [
      { feature: 'Storage', free: '1 GB', starter: '50 GB', pro: '500 GB', enterprise: 'Unlimited' },
      { feature: 'Projects', free: '3', starter: 'Unlimited', pro: 'Unlimited', enterprise: 'Unlimited' },
      { feature: 'Team Seats', free: '1', starter: '5', pro: '10', enterprise: 'Unlimited' },
      { feature: 'Support', free: 'Community', starter: 'Email (48h)', pro: 'Priority (4h)', enterprise: '24/7 Phone' },
      { feature: 'Uptime SLA', free: 'n', starter: '99.9%', pro: '99.99%', enterprise: 'Custom' },
      { feature: 'Dedicated Infra', free: 'n', starter: 'n', pro: 'n', enterprise: 'y' },
    ],
  },
];

/* FAQ data */

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What happens when I exceed my plan limits?',
    answer: "We'll notify you at 80% usage. You can upgrade instantly or purchase add-on packs for storage and AI calls.",
  },
  {
    question: 'Can I self-host VedaDB?',
    answer: 'Enterprise plans include an on-premise deployment option with full source access and dedicated support.',
  },
  {
    question: 'Is there a free tier for open source?',
    answer: 'Yes, our Free tier is available forever for hobbyists, students, and open-source projects. No credit card required.',
  },
  {
    question: 'How does billing work?',
    answer: 'Monthly plans are billed at the start of each billing cycle. Yearly plans offer a 20% discount and are billed annually. You can cancel anytime.',
  },
  {
    question: 'Can I change plans anytime?',
    answer: 'Absolutely. Upgrade or downgrade your plan at any time. Prorated charges or credits will be applied automatically.',
  },
];

/* ───────── easing helpers ───────── */

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ───────── cell renderer ───────── */

function Cell({ value }: { value: string }) {
  if (value === 'y') return <Check size={16} className="text-veda-green mx-auto" />;
  if (value === 'n') return <Minus size={16} className="text-veda-border-subtle mx-auto" />;
  return <span className="text-sm text-veda-off-white">{value}</span>;
}

/* ───────── component ───────── */

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* ════════════ HERO ════════════ */}
      <section
        className="relative flex items-center justify-center text-center overflow-hidden"
        style={{
          minHeight: '45vh',
          background: 'linear-gradient(135deg, #0A0E1A 0%, #0F1923 50%, #0A0E1A 100%)',
        }}
      >
        <div className="max-w-[680px] mx-auto px-6 py-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-xs font-semibold tracking-[0.1em] uppercase mb-4"
            style={{ color: '#E8A838' }}
          >
            PRICING
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.1 }}
            className="text-4xl md:text-[56px] font-black text-white leading-[1.1]"
          >
            Simple, transparent pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.3 }}
            className="text-lg mt-4"
            style={{ color: '#8B95A5' }}
          >
            Start free. Scale as you grow. No hidden fees, no surprises.
          </motion.p>
        </div>
      </section>

      {/* ════════════ PRICING CARDS ════════════ */}
      <section className="py-20 px-6" style={{ background: '#0A0E1A' }}>
        <div className="max-w-[1200px] mx-auto">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div
              className="relative flex items-center rounded-full p-1 cursor-pointer"
              style={{
                width: 200,
                height: 40,
                background: '#1A2433',
                border: '1px solid #2A3A50',
              }}
              onClick={() => setIsYearly(!isYearly)}
            >
              <motion.div
                className="absolute top-1 bottom-1 rounded-full"
                style={{ background: '#E8A838' }}
                animate={{ left: isYearly ? '50%' : 4, right: isYearly ? 4 : '50%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
              <button
                className="relative z-10 flex-1 text-center text-sm font-bold transition-colors"
                style={{
                  color: !isYearly ? '#0A0E1A' : '#8B95A5',
                  background: 'transparent',
                }}
                onClick={() => setIsYearly(false)}
              >
                Monthly
              </button>
              <button
                className="relative z-10 flex-1 text-center text-sm font-bold transition-colors"
                style={{
                  color: isYearly ? '#0A0E1A' : '#8B95A5',
                  background: 'transparent',
                }}
                onClick={() => setIsYearly(true)}
              >
                Yearly
              </button>
            </div>
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-xl"
              style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E' }}
            >
              Save 20%
            </span>
          </div>

          {/* Cards Grid */}
          <SectionReveal stagger={0.1} duration={0.5} y={20}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1.15fr_1fr] gap-6">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: easeOutExpo, delay: i * 0.1 }}
                  whileHover={{ y: tier.popular ? -20 : -6 }}
                  className="relative rounded-xl p-8 flex flex-col"
                  style={{
                    background: '#1A2433',
                    border: tier.popular ? '2px solid #E8A838' : '1px solid #2A3A50',
                    boxShadow: tier.popular ? '0 12px 48px rgba(232,168,56,0.12)' : undefined,
                    transform: tier.popular ? 'translateY(-16px)' : undefined,
                  }}
                >
                  {/* Popular Badge */}
                  {tier.popular && (
                    <div
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded"
                      style={{
                        background: '#E8A838',
                        color: '#0A0E1A',
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}
                    >
                      MOST POPULAR
                    </div>
                  )}

                  {/* Tier Name */}
                  <p
                    className="text-sm font-semibold uppercase tracking-[0.08em] mb-4"
                    style={{ color: tier.color }}
                  >
                    {tier.name}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={isYearly ? 'yearly' : 'monthly' + tier.name}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="text-5xl font-black text-white"
                      >
                        {isYearly ? tier.priceYearly : tier.priceMonthly}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <p className="text-sm mt-1" style={{ color: '#5A6A7F' }}>
                    {isYearly ? tier.periodYearly : tier.period}
                  </p>

                  {/* Description */}
                  <p className="text-[15px] mt-3 leading-relaxed" style={{ color: '#8B95A5' }}>
                    {tier.description}
                  </p>

                  {/* Divider */}
                  <div className="my-6 h-px" style={{ background: '#2A3A50' }} />

                  {/* Features */}
                  <ul className="flex-1 space-y-2.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check size={16} className="text-veda-green mt-0.5 flex-shrink-0" />
                        <span className="text-sm" style={{ color: '#E2E8F0', lineHeight: 2.2 }}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className="w-full mt-6 py-3 px-6 rounded-lg font-bold text-base transition-all duration-300"
                    style={
                      tier.ctaStyle === 'primary'
                        ? {
                            background: '#E8A838',
                            color: '#0A0E1A',
                          }
                        : {
                            background: 'transparent',
                            border: `1px solid ${tier.popular ? '#E8A838' : '#2A3A50'}`,
                            color: '#FFFFFF',
                          }
                    }
                  >
                    {tier.cta}
                  </button>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ════════════ FEATURE MATRIX ════════════ */}
      <section className="py-24 px-6" style={{ background: '#0F1923' }}>
        <div className="max-w-[1200px] mx-auto">
          <SectionReveal>
            <h2 className="text-4xl font-extrabold text-white mb-2">Compare all features</h2>
            <p className="text-base mb-12" style={{ color: '#8B95A5' }}>
              Every feature, every tier. Choose what fits your team.
            </p>
          </SectionReveal>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr style={{ borderBottom: '2px solid #2A3A50' }}>
                  <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: '#8B95A5' }}>
                    Feature
                  </th>
                  <th className="text-center py-3 px-4 text-[13px] font-semibold" style={{ color: '#8B95A5' }}>
                    Free
                  </th>
                  <th className="text-center py-3 px-4 text-[13px] font-semibold" style={{ color: '#00D4AA' }}>
                    Starter
                  </th>
                  <th
                    className="text-center py-3 px-4 text-[13px] font-semibold rounded-t"
                    style={{ color: '#E8A838', background: 'rgba(232,168,56,0.08)' }}
                  >
                    Pro
                  </th>
                  <th className="text-center py-3 px-4 text-[13px] font-semibold text-white">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {featureCategories.map((cat) => (
                  <>
                    <tr key={cat.category}>
                      <td
                        colSpan={5}
                        className="text-[13px] font-bold uppercase tracking-wide px-4 py-3 mt-2"
                        style={{ background: '#1A2433', color: '#8B95A5' }}
                      >
                        {cat.category}
                      </td>
                    </tr>
                    {cat.rows.map((row) => (
                      <tr
                        key={row.feature}
                        className="transition-colors hover:bg-white/[0.01]"
                        style={{ borderBottom: '1px solid #1A2433', height: 48 }}
                      >
                        <td className="px-4 text-sm" style={{ color: '#E2E8F0' }}>
                          {row.feature}
                        </td>
                        <td className="text-center px-2">
                          <Cell value={row.free} />
                        </td>
                        <td className="text-center px-2">
                          <Cell value={row.starter} />
                        </td>
                        <td
                          className="text-center px-2"
                          style={{ background: 'rgba(232,168,56,0.04)' }}
                        >
                          <Cell value={row.pro} />
                        </td>
                        <td className="text-center px-2">
                          <Cell value={row.enterprise} />
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ════════════ FAQ & CTA ════════════ */}
      <section className="py-16 px-6" style={{ background: '#0A0E1A' }}>
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-4xl font-extrabold text-white text-center mb-10">
            Frequently asked questions
          </h2>

          {/* Accordion */}
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: easeOutExpo }}
                style={{ borderBottom: '1px solid #2A3A50' }}
              >
                <button
                  className="w-full flex items-center justify-between py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-base font-semibold text-white">{faq.question}</span>
                  {openFaq === i ? (
                    <Minus size={20} style={{ color: '#8B95A5' }} />
                  ) : (
                    <Plus size={20} style={{ color: '#8B95A5' }} />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: easeOutExpo }}
                      className="overflow-hidden"
                    >
                      <p
                        className="pb-5 text-[15px] leading-relaxed"
                        style={{ color: '#8B95A5' }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* CTA Band */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: easeOutExpo }}
            className="mt-16 text-center rounded-xl p-12"
            style={{ background: '#1A2433' }}
          >
            <h3 className="text-[28px] font-extrabold text-white mb-2">Still have questions?</h3>
            <p className="text-[15px]" style={{ color: '#8B95A5' }}>
              Our team is happy to help you find the right plan.
            </p>
            <div className="flex items-center justify-center gap-3 mt-5 flex-wrap">
              <button
                className="px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 hover:translate-y-[-2px]"
                style={{ background: '#E8A838', color: '#0A0E1A' }}
              >
                Contact Sales
              </button>
              <button
                className="px-6 py-3 rounded-lg font-semibold text-sm border transition-all duration-300 hover:border-veda-amber hover:text-veda-amber"
                style={{
                  borderColor: '#2A3A50',
                  color: '#FFFFFF',
                  background: 'transparent',
                }}
              >
                View Documentation
                <ChevronRight size={14} className="inline ml-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
