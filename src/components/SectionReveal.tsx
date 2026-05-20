import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  y?: number;
}

function SectionReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  stagger = 0.08,
  y = 40,
}: SectionRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.children;
    if (elements.length === 0) return;

    gsap.set(elements, { opacity: 0, y });

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

export { SectionReveal };
