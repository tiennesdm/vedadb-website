import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Download, Github } from 'lucide-react';

/* ──────────────────────── */
/*  Three.js Particle Field  */
/* ──────────────────────── */

const PARTICLE_COUNT = 800;
const PARTICLE_COUNT_MOBILE = 400;
const BOUNDS = { x: 15, y: 8, z: 5 };
const MOUSE_RADIUS = 2.0;
const MOUSE_FORCE = 0.03;

interface ParticlesProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

function Particles({ mouseRef }: ParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();

  const count = typeof window !== 'undefined' && window.innerWidth < 768
    ? PARTICLE_COUNT_MOBILE
    : PARTICLE_COUNT;

  // Precompute random positions and phase offsets
  const { positions, phases, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const pha = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * BOUNDS.x * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS.y * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS.z * 2;
      pha[i * 3] = Math.random() * Math.PI * 2;
      pha[i * 3 + 1] = Math.random() * Math.PI * 2;
      pha[i * 3 + 2] = Math.random() * Math.PI * 2;
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = 0.001 + Math.random() * 0.001;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, phases: pha, velocities: vel };
  }, [count]);

  // Per-particle displacement vector (mouse repulsion)
  const displacement = useMemo(() => new Float32Array(count * 3), [count]);

  // Dummy for matrix updates
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const mx = mouseRef.current.x * viewport.width * 0.5;
    const my = mouseRef.current.y * viewport.height * 0.5;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Base drift motion
      const baseX = positions[ix] + Math.sin(time * 0.5 + phases[ix]) * 0.3;
      let baseY = positions[iy] + time * velocities[iy];
      const baseZ = positions[iz] + Math.cos(time * 0.3 + phases[iz]) * 0.2;

      // Wrap Y
      if (baseY > BOUNDS.y) {
        baseY = -BOUNDS.y;
        positions[iy] = -BOUNDS.y;
      }

      // Mouse repulsion (in 2D plane)
      const dx = baseX - mx;
      const dy = baseY - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS && dist > 0.01) {
        const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
        displacement[ix] += (dx / dist) * force;
        displacement[iy] += (dy / dist) * force;
      }

      // Decay displacement
      displacement[ix] *= 0.95;
      displacement[iy] *= 0.95;
      displacement[iz] *= 0.95;

      // Final position
      dummy.position.set(
        baseX + displacement[ix],
        baseY + displacement[iy],
        baseZ + displacement[iz]
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial color="#76B900" />
    </instancedMesh>
  );
}

/* ──────────────────────── */
/*  Hero Section Component   */
/* ──────────────────────── */

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  // Track mouse for Three.js
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP entrance animations
  useGSAP(() => {
    if (!containerRef.current) return;
    const easeDramatic = 'power3.out';

    // Canvas fade in
    if (canvasWrapRef.current) {
      gsap.fromTo(
        canvasWrapRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: easeDramatic }
      );
    }

    // Version badge
    gsap.fromTo(
      '.hero-badge',
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: easeDramatic }
    );

    // Headline Line 1 — word by word
    const words1 = containerRef.current.querySelectorAll('.hero-line1 .hero-word');
    gsap.fromTo(
      words1,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, delay: 0.5, ease: easeDramatic }
    );

    // Headline Line 2 — word by word
    const words2 = containerRef.current.querySelectorAll('.hero-line2 .hero-word');
    gsap.fromTo(
      words2,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, delay: 0.9, ease: easeDramatic }
    );

    // Subheadline
    gsap.fromTo(
      '.hero-sub',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 1.4, ease: easeDramatic }
    );

    // CTA buttons
    gsap.fromTo(
      '.hero-cta',
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, delay: 1.7, ease: easeDramatic }
    );

    // Stats row
    gsap.fromTo(
      '.hero-stat',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 2.0, ease: easeDramatic }
    );
  }, { scope: containerRef });

  const headline1 = 'The GPU-Native';
  const headline2 = 'Multi-Model Database';

  const stats = [
    { value: '230K+', label: 'LOC' },
    { value: '1,382+', label: 'Tests' },
    { value: '9', label: 'Engines' },
    { value: 'v2.3.1', label: 'Latest' },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Three.js Particle Canvas */}
      <div
        ref={canvasWrapRef}
        className="absolute inset-0"
        style={{ opacity: 0, zIndex: 0 }}
      >
        <Canvas
          camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 10] }}
          style={{ position: 'absolute', inset: 0 }}
          gl={{ alpha: true, antialias: false }}
        >
          <Particles mouseRef={mouseRef} />
        </Canvas>
      </div>

      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(118,185,0,0.06) 0%, transparent 60%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="veda-container relative flex flex-col items-center justify-center text-center"
        style={{ zIndex: 2, maxWidth: '800px', minHeight: '100dvh' }}
      >
        {/* Version Badge */}
        <div className="hero-badge inline-flex items-center gap-2 mb-8">
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: 'var(--accent-green-dim)',
              border: '1px solid rgba(118,185,0,0.3)',
              color: 'var(--accent-green)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ backgroundColor: 'var(--accent-green)' }}
            />
            v2.3.1
          </span>
        </div>

        {/* Headline Line 1 */}
        <h1 className="veda-display-h1 text-[var(--text-primary)] mb-2 hero-line1">
          {headline1.split(' ').map((word, i) => (
            <span key={i} className="hero-word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </h1>

        {/* Headline Line 2 */}
        <h1 className="veda-display-h1 text-gradient-green mb-6 hero-line2">
          {headline2.split(' ').map((word, i) => (
            <span key={i} className="hero-word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p
          className="hero-sub veda-subheadline max-w-2xl mx-auto mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          9 engines. One binary. Zero configuration. Runs on GPU, TPU, and CPU with adaptive workload offloading.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#install"
            className="hero-cta veda-btn-primary"
          >
            <Download size={16} className="mr-2" />
            Install Now
          </a>
          <a
            href="https://github.com/vedadb"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta veda-btn-secondary"
          >
            <Github size={16} className="mr-2" />
            View on GitHub
          </a>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="hero-stat flex items-center gap-2">
              <span
                className="text-lg sm:text-xl font-bold"
                style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-heading)' }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs uppercase tracking-wide"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
              >
                {stat.label}
              </span>
              <span className="hidden sm:inline-block ml-2 text-[var(--border-subtle)]">|</span>
            </div>
          ))}
          {/* Apache badge */}
          <div className="hero-stat">
            <span
              className="inline-flex items-center px-2.5 py-1 rounded text-xs"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
              }}
            >
              Apache 2.0
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export { HeroSection };
