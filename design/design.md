# VedaDB — Global Design Document

A single-page landing page for VedaDB, a GPU-native multi-model database. The design fuses deep black voids with vivid NVIDIA-green energy to evoke computational speed and raw GPU hardware power.

---

## Page List

| Page | File | Route | Description |
|------|------|-------|-------------|
| Home | `home.md` | `/` | Single landing page with 6 sections: Hero, Features, Architecture, Benchmarks, Install, CTA |

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#000000` | Body background, main void |
| `--bg-secondary` | `#050505` | Card backgrounds, nav bar |
| `--bg-tertiary` | `#0A0A0A` | Elevated surfaces, code blocks |
| `--bg-glass` | `rgba(10, 10, 10, 0.8)` | Nav backdrop with `backdrop-filter: blur(12px)` |
| `--accent-green` | `#76B900` | Primary accent — CTAs, particle color, active states |
| `--accent-green-hover` | `#8CD600` | Hover state for green elements |
| `--accent-green-dim` | `rgba(118, 185, 0, 0.15)` | Subtle green glow backgrounds |
| `--text-primary` | `#EAEAEA` | Main headings |
| `--text-secondary` | `#A0A0A0` | Body text, descriptions |
| `--text-muted` | `#555555` | Code comments, subtle labels |
| `--border-subtle` | `#222222` | Card borders, dividers |
| `--border-green` | `rgba(118, 185, 0, 0.4)` | Accent borders, glowing edges |
| `--gpu-tier` | `#76B900` | GPU tier in architecture diagram |
| `--tpu-tier` | `#FF6D00` | TPU tier in architecture diagram |
| `--cpu-tier` | `#2962FF` | CPU tier in architecture diagram |

### Usage Rules
- Dark void dominates: 80%+ of page area uses `--bg-primary` or `--bg-secondary`
- Green accent is for CTAs, highlights, particle colors, and active states only (never body text)
- Tier colors are restricted to the Architecture diagram only
- All text on dark backgrounds uses `--text-primary` or `--text-secondary`

---

## Typography

| Role | Font | Weight | Size | Line Height | Letter Spacing |
|------|------|--------|------|-------------|----------------|
| Display H1 | Inter | 800 | 72px / 4.5rem | 1.0 | -0.03em |
| Section H2 | Inter | 700 | 48px / 3rem | 1.1 | -0.02em |
| Subheadline | Inter | 400 | 20px / 1.25rem | 1.6 | 0 |
| Feature Title | Inter | 600 | 18px / 1.125rem | 1.4 | -0.01em |
| Body | Inter | 400 | 16px / 1rem | 1.6 | 0 |
| Code/Terminal | JetBrains Mono | 400 | 14px / 0.875rem | 1.5 | 0 |
| Label/Badge | JetBrains Mono | 500 | 12px / 0.75rem | 1.4 | 0.05em |
| Nav Link | Inter | 500 | 14px / 0.875rem | 1.0 | 0.01em |

### Responsive Scale (≤768px)
| Role | Size |
|------|------|
| Display H1 | 40px / 2.5rem |
| Section H2 | 32px / 2rem |
| Subheadline | 18px / 1.125rem |

---

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-section` | 120px | Vertical padding between sections |
| `--space-content` | 64px | Inner section content gaps |
| `--space-card` | 32px | Card internal padding |
| `--space-element` | 24px | Between sibling elements |
| `--space-tight` | 12px | Tight groupings, badge margins |
| `--container-max` | 1280px | Max content width |
| `--container-pad` | 24px / 1.5rem | Horizontal page padding |

---

## Component Design

### Button (Primary — CTA)
```
Background: --accent-green
Text: #000000 (black), Inter 600, 14px, uppercase, letter-spacing: 0.05em
Padding: 14px 28px
Border-radius: 6px
Border: none
Hover: background shifts to --accent-green-hover, scale(1.02)
Active: scale(0.98)
Transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)
```

### Button (Secondary)
```
Background: transparent
Text: --text-primary, Inter 500, 14px
Padding: 14px 28px
Border-radius: 6px
Border: 1px solid --border-subtle
Hover: border-color --accent-green, text-color --accent-green
Transition: all 0.2s ease
```

### Feature Card
```
Background: --bg-secondary
Border: 1px solid --border-subtle
Border-radius: 8px
Padding: --space-card
Hover: border-color --border-green, translateY(-4px), box-shadow: 0 0 20px rgba(118,185,0,0.1)
Transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

### Engine Icon Badge
```
Size: 48px × 48px
Background: --bg-tertiary
Border: 1px solid --border-subtle
Border-radius: 8px
Icon color: --accent-green
Hover: background --accent-green-dim, border-color --border-green
```

### Code Block (Install Section)
```
Background: #0D0D0D
Border: 1px solid --border-subtle
Border-radius: 8px
Padding: 20px 24px
Font: JetBrains Mono 400, 14px
Syntax highlight: --accent-green for commands, --text-secondary for args
Copy button: top-right, icon swaps on click
```

### Version Badge
```
Background: --accent-green-dim
Border: 1px solid rgba(118,185,0,0.3)
Border-radius: 20px (pill)
Padding: 6px 14px
Text: --accent-green, JetBrains Mono 500, 12px
```

---

## Animation & Motion

### Easing Tokens
| Name | Value | Usage |
|------|-------|-------|
| `ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard transitions |
| `ease-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Enter animations |
| `ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Exit animations |
| `ease-dramatic` | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero reveals |

### Global Patterns
- **Scroll**: Lenis smooth scroll, `lerp: 0.1`, `duration: 1.2`
- **Section entrance**: Elements fade in from `translateY(40px)` + `opacity: 0` → `translateY(0)` + `opacity: 1`, duration `0.8s`, easing `ease-dramatic`
- **Stagger**: `0.08s` between sibling elements
- **Trigger**: GSAP ScrollTrigger, `start: "top 80%"`, `toggleActions: "play none none none"`

### Hover Micro-interactions
- Buttons: `scale(1.02)` + color shift, `0.2s ease-smooth`
- Cards: `translateY(-4px)` + border glow + shadow, `0.3s ease-smooth`
- Links: underline slides in from left via `background-size` animation
- Icons: `scale(1.1)` + color transition to `--accent-green`

### Reduced Motion
- Respect `prefers-reduced-motion: reduce`
- Disable particle system, replace with static gradient
- Reduce all transitions to `0.1s` or instant
- Skip ScrollTrigger animations, show content immediately

---

## Responsive Breakpoints

| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Desktop | ≥1024px | Full layout, 3-column feature grid, side-by-side architecture |
| Tablet | 768–1023px | 2-column feature grid, stacked architecture, reduced particle count |
| Mobile | ≤767px | Single column, hamburger nav, particle count halved, simplified diagram |

---

## Dependencies

```json
{
  "gsap": "^3.12",
  "lenis": "^1.1",
  "three": "^0.160",
  "@react-three/fiber": "^8.16",
  "@react-three/drei": "^9.105",
  "lucide-react": "latest"
}
```

---

## Assets

### Logo
- **File**: `vedadb-logo.svg`
- **Description**: The word "VedaDB" rendered in a clean, geometric monospace-tech font. The "DB" characters are highlighted in NVIDIA green (#76B900) while "Veda" is rendered in white. Subtle circuit-trace styling around the letterforms.
- **Dimensions**: 160×40
- **Type**: SVG

### Engine Icons (9 total)
- **Files**: `icon-sql.svg`, `icon-document.svg`, `icon-graph.svg`, `icon-keyvalue.svg`, `icon-vector.svg`, `icon-columnar.svg`, `icon-timeseries.svg`, `icon-cache.svg`, `icon-ledger.svg`
- **Description**: Minimalist geometric icons representing each database engine type — e.g., a table grid for SQL, a document outline for Document DB, connected nodes for Graph, a lightning bolt for Key-Value, concentric circles for Vector, a column chart for Columnar, a time axis for Time-Series, stacked layers for Cache, a chain link for Ledger. All icons use single-color NVIDIA green (#76B900) on a transparent background.
- **Dimensions**: 48×48
- **Type**: SVG

### Architecture Diagram
- **File**: `architecture-diagram.svg`
- **Description**: A stylized 3-tier technology stack diagram. Top tier labeled "GPU Acceleration" in NVIDIA green with GPU chip icon. Middle tier labeled "TPU Inference" in orange with neural network nodes. Bottom tier labeled "CPU Core" in blue with processor icon. Arrows connecting tiers showing data flow. Dark background matching #050505.
- **Dimensions**: 800×600
- **Type**: SVG

### Hero Particle Texture
- **File**: `particle-glow.png`
- **Description**: A soft radial glow gradient transitioning from bright NVIDIA green (#76B900) at the center to fully transparent at the edges. Used as a sprite texture for Three.js particles to create glowing point effects resembling GPU data flow points.
- **Dimensions**: 128×128
- **Type**: Image

### Benchmark Bars Background
- **File**: `benchmark-bg.svg`
- **Description**: Subtle horizontal grid lines on a transparent background for the benchmark comparison chart section. Provides visual structure for the bar charts comparing VedaDB against MySQL, MongoDB, and Redis. Dark gray (#222222) lines.
- **Dimensions**: 1200×400
- **Type**: SVG

---