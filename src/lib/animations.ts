/**
 * VedaDB Shared Animation Utilities
 *
 * Centralizes GSAP ScrollTrigger animations, Framer Motion presets,
 * and reusable animation configurations.
 *
 * Rules:
 * - GSAP/ScrollTrigger: scroll-driven animations, canvas backgrounds
 * - Framer Motion: UI interactions (buttons, cards, hover states)
 * - NEVER mix both in the same component tree
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Variants } from 'framer-motion';

// Register GSAP plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ===== GSAP Animation Helpers =====

interface FadeInUpOptions {
  duration?: number;
  delay?: number;
  stagger?: number;
  y?: number;
  start?: string;
  toggleActions?: string;
}

/**
 * Fade in + slide up reveal — section entrance pattern
 * Per design spec: translateY(40px) + opacity:0 → translateY(0) + opacity:1
 * Duration: 0.8s, Easing: ease-dramatic
 */
export function fadeInUp(
  elements: gsap.TweenTarget,
  options: FadeInUpOptions = {}
): gsap.core.Tween | gsap.core.Timeline {
  const {
    duration = 0.8,
    delay = 0,
    stagger = 0,
    y = 40,
    start = 'top 80%',
    toggleActions = 'play none none none',
  } = options;

  const tween = gsap.fromTo(
    elements,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      stagger: stagger || undefined,
      ease: 'power3.out', // ease-dramatic approximation
      scrollTrigger: {
        trigger: elements as gsap.DOMTarget,
        start,
        toggleActions: toggleActions as 'play none none none' | 'restart none none none' | undefined,
      },
    }
  );

  return tween;
}

interface FadeInOptions {
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  toggleActions?: string;
}

/**
 * Simple fade in with optional slide direction
 */
export function fadeIn(
  elements: gsap.TweenTarget,
  options: FadeInOptions = {}
): gsap.core.Tween {
  const {
    duration = 0.6,
    delay = 0,
    stagger = 0,
    start = 'top 85%',
    toggleActions = 'play none none none',
  } = options;

  return gsap.fromTo(
    elements,
    { opacity: 0 },
    {
      opacity: 1,
      duration,
      delay,
      stagger: stagger || undefined,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: elements as gsap.DOMTarget,
        start,
        toggleActions: toggleActions as 'play none none none' | 'restart none none none' | undefined,
      },
    }
  );
}

interface StaggerRevealOptions {
  duration?: number;
  stagger?: number;
  y?: number;
  start?: string;
}

/**
 * Staggered container reveal — children fade in with stagger
 * Per design spec: 0.08s stagger between siblings
 */
export function staggerReveal(
  container: gsap.TweenTarget,
  childrenSelector: string,
  options: StaggerRevealOptions = {}
): gsap.core.Tween {
  const {
    duration = 0.8,
    stagger = 0.08,
    y = 40,
    start = 'top 80%',
  } = options;

  const children = (container as HTMLElement)?.querySelectorAll?.(childrenSelector) || container;

  return gsap.fromTo(
    children,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container as gsap.DOMTarget,
        start,
        toggleActions: 'play none none none',
      },
    }
  );
}

/**
 * Create a GSAP scroll-triggered tween and return it for cleanup.
 * Use inside @gsap/react's useGSAP hook.
 */
export function createScrollTween(
  element: gsap.TweenTarget,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  scrollTriggerVars?: Record<string, unknown>
): gsap.core.Tween {
  return gsap.fromTo(
    element,
    fromVars,
    {
      ...toVars,
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: 'top 80%',
        toggleActions: 'play none none none',
        ...scrollTriggerVars,
      },
    }
  );
}

/**
 * Batch setup multiple fadeInUp animations for a section
 */
export function animateSectionElements(
  sectionSelector: string,
  elementSelectors: string[]
): (gsap.core.Tween | gsap.core.Timeline)[] {
  const section = document.querySelector(sectionSelector);
  if (!section) return [];

  const tweens: (gsap.core.Tween | gsap.core.Timeline)[] = [];

  elementSelectors.forEach((selector, index) => {
    const el = section.querySelector(selector);
    if (el) {
      tweens.push(fadeInUp(el, { delay: index * 0.1 }));
    }
  });

  return tweens;
}

/**
 * Refresh all ScrollTriggers — call after layout changes
 */
export function refreshScrollTriggers(): void {
  ScrollTrigger.refresh();
}

/**
 * Kill all ScrollTriggers for an element — cleanup on unmount
 */
export function killScrollTriggers(element: HTMLElement): void {
  const triggers = ScrollTrigger.getAll().filter(
    (st) => st.trigger === element
  );
  triggers.forEach((st) => st.kill());
}

// ===== Framer Motion Variants (UI interactions only) =====

/**
 * Fade in + slide up variant for Framer Motion
 * Use for: buttons, cards, modal content — NOT scroll-driven animations
 */
export const fadeInUpVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

/**
 * Fade in variant for Framer Motion
 */
export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

/**
 * Stagger container variant — children animate with stagger
 */
export const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/**
 * Stagger child item variant
 */
export const staggerItemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

/**
 * Scale up + fade in (for badges, icons)
 */
export const scaleInVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

/**
 * Slide in from side variant
 */
export const slideInLeftVariant: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export const slideInRightVariant: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

// ===== Reusable Animation Config Objects =====

/** Default GSAP ScrollTrigger config per design spec */
export const defaultScrollTriggerConfig: Record<string, unknown> = {
  start: 'top 80%',
  toggleActions: 'play none none none',
};

/** Easing tokens as GSAP ease strings */
export const EASE = {
  smooth: 'power2.out',
  enter: 'power2.out',
  exit: 'power2.in',
  dramatic: 'power3.out',
} as const;

/** Duration tokens (seconds) */
export const DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  reveal: 0.8,
} as const;

/** Stagger tokens (seconds) */
export const STAGGER = {
  fast: 0.05,
  normal: 0.08,
  slow: 0.12,
} as const;