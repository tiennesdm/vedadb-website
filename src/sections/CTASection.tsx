import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Star, BookOpen, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const ease = 'power3.out';

    // Heading
    gsap.fromTo(
      '.cta-heading',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8,
        ease,
        scrollTrigger: { trigger: '.cta-heading', start: 'top 80%' },
      }
    );

    // Subtext
    gsap.fromTo(
      '.cta-sub',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, delay: 0.15,
        ease,
        scrollTrigger: { trigger: '.cta-sub', start: 'top 80%' },
      }
    );

    // CTA buttons
    gsap.fromTo(
      '.cta-btn',
      { scale: 0.95, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.5,
        stagger: 0.1, delay: 0.3,
        ease,
        scrollTrigger: { trigger: '.cta-buttons', start: 'top 80%' },
      }
    );

    // Stats
    gsap.fromTo(
      '.cta-stat',
      { y: 15, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5,
        stagger: 0.08, delay: 0.5,
        ease,
        scrollTrigger: { trigger: '.cta-stats', start: 'top 80%' },
      }
    );

    // License + copyright
    gsap.fromTo(
      '.cta-footer',
      { opacity: 0 },
      {
        opacity: 1, duration: 0.6, delay: 0.7,
        ease,
        scrollTrigger: { trigger: '.cta-footer', start: 'top 90%' },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="veda-section relative overflow-hidden"
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(118,185,0,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="veda-container relative text-center max-w-2xl mx-auto">
        {/* Large heading */}
        <h2 className="cta-heading veda-section-h2 text-[var(--text-primary)] mb-6">
          Ready to Accelerate
          <span className="text-gradient-green block mt-2">Your Data?</span>
        </h2>

        {/* Subtext */}
        <p
          className="cta-sub veda-subheadline mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          Open source, Apache 2.0 licensed. Join the growing community of developers
          building on GPU-native infrastructure.
        </p>

        {/* CTA buttons */}
        <div className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href="#install"
            className="cta-btn veda-btn-primary text-base px-8 py-4 group"
          >
            <Star
              size={18}
              className="mr-2 transition-transform duration-300 group-hover:rotate-[15deg] group-hover:scale-120"
            />
            Star on GitHub
          </a>
          <a
            href="#docs"
            className="cta-btn veda-btn-secondary inline-flex items-center gap-2"
          >
            <BookOpen size={16} />
            Read the Docs
          </a>
        </div>

        {/* Stats bar */}
        <div className="cta-stats flex flex-wrap items-center justify-center gap-8 sm:gap-12 mb-10">
          <div className="cta-stat text-center">
            <div
              className="flex items-center justify-center gap-1.5 mb-1"
              style={{ color: 'var(--accent-green)' }}
            >
              <Star size={14} />
              <span
                className="text-xl font-bold"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                2.4k
              </span>
            </div>
            <span
              className="text-xs uppercase tracking-wide"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
            >
              GitHub Stars
            </span>
          </div>

          <div className="cta-stat text-center">
            <div
              className="flex items-center justify-center gap-1.5 mb-1"
              style={{ color: 'var(--accent-green)' }}
            >
              <Github size={14} />
              <span
                className="text-xl font-bold"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                89
              </span>
            </div>
            <span
              className="text-xs uppercase tracking-wide"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
            >
              Contributors
            </span>
          </div>

          <div className="cta-stat text-center">
            <span
              className="inline-flex items-center px-2.5 py-1 rounded mb-1"
              style={{
                backgroundColor: 'var(--accent-green-dim)',
                border: '1px solid rgba(118,185,0,0.3)',
                color: 'var(--accent-green)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 500,
              }}
            >
              v2.3.1
            </span>
            <span
              className="block text-xs uppercase tracking-wide mt-1"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
            >
              Latest Release
            </span>
          </div>
        </div>

        {/* License badge + copyright */}
        <div className="cta-footer flex flex-col items-center gap-4">
          <span
            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
            }}
          >
            Apache 2.0 Licensed
          </span>
          <p
            className="text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            &copy; 2025 VedaDB Contributors
          </p>
        </div>
      </div>
    </section>
  );
}

export { CTASection };
