import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}

/**
 * SectionReveal — wraps content with GSAP scroll-triggered fade-in-up animation.
 *
 * Uses GSAP ScrollTrigger (not Framer Motion) since this is scroll-driven.
 * Per design spec:
 *   - translateY(40px) + opacity:0 → translateY(0) + opacity:1
 *   - Duration: 0.8s
 *   - Easing: ease-dramatic (power3.out)
 *   - Trigger: start "top 80%"
 */
function SectionReveal({
  children,
  className = '',
  delay = 0,
  y = 40,
  duration = 0.8,
  start = 'top 80%',
}: SectionRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Mark as reveal target to prevent FOUC
    const el = containerRef.current;
    el.classList.add('gsap-reveal');

    gsap.fromTo(
      el,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
          onEnter: () => el.classList.add('revealed'),
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

export { SectionReveal };
