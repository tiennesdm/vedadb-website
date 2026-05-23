import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

gsap.registerPlugin(ScrollTrigger);

interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout — root wrapper providing:
 * - Lenis smooth scroll (lerp: 0.1, duration: 1.2)
 * - GSAP ScrollTrigger sync
 * - Fixed navbar + footer
 * - Scroll-to-top on route change
 */
function Layout({ children }: LayoutProps) {
  // Initialize Lenis + GSAP ScrollTrigger sync
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    });

    // Sync Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker for performance
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable lag smoothing for smoother animation
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[var(--bg-primary)]">
      <Navbar />
      <main className="flex-1 pt-[72px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export { Layout };
