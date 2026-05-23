import { HeroSection } from '@/sections/HeroSection';
import { FeaturesSection } from '@/sections/FeaturesSection';
import { ArchitectureSection } from '@/sections/ArchitectureSection';
import { BenchmarksSection } from '@/sections/BenchmarksSection';
import { InstallSection } from '@/sections/InstallSection';
import { CTASection } from '@/sections/CTASection';

/**
 * Home Page — Single page landing with 6 sections
 *
 * Sections (in order):
 * 1. HeroSection      — Full-viewport with Three.js particles, headline, CTAs, stats
 * 2. FeaturesSection  — 3x3 grid of engine cards with hover effects
 * 3. ArchitectureSection — 3-tier GPU/TPU/CPU diagram
 * 4. BenchmarksSection — Animated bar charts with counters
 * 5. InstallSection   — Tabbed code blocks with copy-to-clipboard
 * 6. CTASection       — Final call-to-action with GitHub stars
 */
function Home() {
  return (
    <div className="bg-[var(--bg-primary)]">
      <HeroSection />
      <FeaturesSection />
      <ArchitectureSection />
      <BenchmarksSection />
      <InstallSection />
      <CTASection />
    </div>
  );
}

export default Home;
