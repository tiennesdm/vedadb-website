# Home Page — Single Page Landing

The entire experience lives on one long-scroll page with 6 sections. Lenis provides buttery-smooth scrolling. A fixed Navbar anchors navigation.

| Property | Value |
|----------|-------|
| Route | `/` |
| Sections | 6 |
| Purpose | Product landing, feature showcase, install conversion |

---

## Section 1: Hero

**Layout:** Full viewport height (`100vh`), centered content, Three.js `<canvas>` absolutely positioned behind at `z-index: 0`.

**Content:**
- Version Badge: "v2.3.1" (pill-shaped, top-center, above headline)
- Headline Line 1: "The GPU-Native"
- Headline Line 2: "Multi-Model Database"
- Subheadline: "9 engines. One binary. Zero configuration. Runs on GPU, TPU, and CPU with adaptive workload offloading."
- CTA Group (horizontal row):
  - Primary: "Install Now" → scrolls to Install section
  - Secondary: "View on GitHub" → external link
- Stats row (4 items, horizontal, below CTAs): "230K+ LOC", "1,382+ Tests", "9 Engines", "Apache 2.0"

**Visual:**
- Background: Pure `#000000` with Three.js particle canvas covering full viewport
- Particle canvas: `position: absolute; inset: 0; z-index: 0`
- Content wrapper: `position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh`
- Text alignment: Center
- Max content width: `800px`

**Three.js Particle System:**
- 800 glowing green particles floating in 3D space (400 on mobile)
- Particles are small sphere geometries (`SphereGeometry`, radius `0.08`) with `MeshBasicMaterial` colored `#76B900`
- Distributed randomly in a bounding box of `x: ±15`, `y: ±8`, `z: ±5`
- Animation loop:
  1. Each particle has independent drift velocity: `sin(time * freq + offset) * 0.002` on each axis
  2. Slow upward drift on Y: `position.y += 0.001` (reset to bottom when exceeding bounds)
  3. Mouse interaction: cursor position (normalized to `±1`) gently pushes nearby particles within radius `2.0` with force `0.03` per frame
- Camera: Perspective, `fov: 60`, `z: 10`, no camera movement
- Post-processing: None (keep it performant — pure `MeshBasicMaterial` spheres)

**Entrance Animations:**
- Particle canvas: fades in from `opacity: 0` over `1.2s` on page load
- Version badge: fades in `opacity: 0→1`, `translateY(-10px)→0`, delay `0.3s`, duration `0.6s`, easing `ease-dramatic`
- Headline Line 1: per-word reveal, each word `translateY(30px)→0`, `opacity: 0→1`, stagger `0.12s`, delay `0.5s`, duration `0.7s`
- Headline Line 2: per-word reveal, stagger `0.12s`, delay `0.9s` (after Line 1 completes)
- Subheadline: `translateY(20px)→0`, `opacity: 0→1`, delay `1.4s`, duration `0.6s`
- CTA buttons: `scale(0.95)→1`, `opacity: 0→1`, delay `1.7s`, duration `0.5s`, stagger `0.1s`
- Stats row: each stat `translateY(15px)→0`, `opacity: 0→1`, stagger `0.08s`, delay `2.0s`
- Easing for all: `ease-dramatic`

---

## Section 2: Features

**Layout:** Standard section padding, heading centered, 3×3 grid of feature cards below.

**Content:**
- Section heading: "One Binary. Nine Engines."
- Section subhead: "From relational queries to vector search — all included, no plugins needed."
- 9 feature cards in grid:

| # | Engine | Icon | Description |
|---|--------|------|-------------|
| 1 | SQL + Joins | `icon-sql.svg` | Full relational engine with JOINs, subqueries, and ACID transactions |
| 2 | Document Store | `icon-document.svg` | Native JSON document storage with nested query support |
| 3 | Graph Database | `icon-graph.svg` | Cypher-compatible graph engine for connected data |
| 4 | Key-Value | `icon-keyvalue.svg` | In-memory speed with persistence, Redis-compatible protocol |
| 5 | Vector Search | `icon-vector.svg` | HNSW and IVF indexes for similarity search |
| 6 | Columnar | `icon-columnar.svg` | Apache Arrow columnar engine for analytics workloads |
| 7 | Time-Series | `icon-timeseries.svg` | Optimized for high-ingest time-series data |
| 8 | Cache Engine | `icon-cache.svg` | Multi-tier caching with LRU and TTL eviction |
| 9 | Ledger | `icon-ledger.svg` | Append-only immutable ledger with cryptographic verification |

**Grid:**
- Desktop: `grid-template-columns: repeat(3, 1fr)`, gap `24px`
- Tablet: `repeat(2, 1fr)`
- Mobile: `repeat(1, 1fr)`

**Card Layout:**
```
┌─────────────────────────────────────┐
│  [Icon Badge]                       │
│                                     │
│  Engine Name                        │
│  Description text here...           │
│                                     │
│  Engine #01          →              │
└─────────────────────────────────────┘
```
- Icon: top-left, 48×48 badge (see component spec in design.md)
- Engine name: `--text-primary`, Inter 600, 18px
- Description: `--text-secondary`, Inter 400, 14px, 2-line max
- Engine number: `--text-muted`, JetBrains Mono 500, 12px, right-aligned with arrow icon

**Entrance Animations:**
- Section heading: `translateY(40px)→0`, `opacity: 0→1`, trigger at `top 80%`, duration `0.8s`
- Section subhead: same, delay `0.15s`
- Cards: staggered entrance, each card `translateY(50px)→0`, `opacity: 0→1`, `scale(0.97)→1`, stagger `0.08s`, duration `0.7s`, easing `ease-dramatic`

**Hover Interactions:**
- Card: `translateY(-4px)`, border color → `--border-green`, `box-shadow: 0 0 24px rgba(118,185,0,0.08)`, `0.3s ease-smooth`
- Icon badge: background → `--accent-green-dim`, border → `--border-green`, `0.2s`
- Engine number + arrow: arrow `translateX(4px)`, text color → `--accent-green`, `0.2s`

---

## Section 3: Architecture

**Layout:** Two-column layout on desktop (text left, diagram right), stacked on mobile.

**Content:**
- Left column:
  - Section heading: "GPU-First Architecture"
  - Subhead: "Workload-adaptive execution that routes queries to the optimal compute tier."
  - Description: "VedaDB's 3-tier execution model automatically offloads queries to GPU for maximum parallelism, falls back to TPU for inference-heavy workloads, and uses CPU for transactional operations."
  - Tech stack badges (horizontal row of pills):
    - "Go"
    - "Rust"
    - "CUDA"
    - "Apache Arrow"
    - "cuVS"
    - "cuGraph"
  - Stats: "230K+ Lines of Code" / "1,382+ Tests"
- Right column: Interactive 3-tier diagram

**Diagram Structure:**
Three horizontal stacked tiers, each a rounded card:

```
┌──────────────────────────────────────┐
│  🟢 GPU ACCELERATION  (Top)          │
│  cuVS · cuGraph · CUDA Kernels       │
├──────────────────────────────────────┤
│  🟠 TPU INFERENCE  (Middle)          │
│  Neural Query Optimizer              │
├──────────────────────────────────────┤
│  🔵 CPU CORE  (Bottom)               │
│  Transactional Engine · SQL Parser   │
└──────────────────────────────────────┘
     ↓ Arrows showing data flow
```

- Each tier card: full width of right column, height ~80px, border-radius 8px
- Tier colors: GPU top border `--gpu-tier`, TPU `--tpu-tier`, CPU `--cpu-tier`
- Tier labels: JetBrains Mono 500, 12px, uppercase, colored by tier
- Tech chips inside each tier: pill badges, `--bg-tertiary` background, `--text-secondary` text
- Animated arrows between tiers: small chevron arrows, `--text-muted`, animated `translateY` bounce loop

**Layout Specs:**
- Container: `display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center`
- Mobile: `grid-template-columns: 1fr`

**Entrance Animations:**
- Left column text: stagger from top, `translateX(-30px)→0`, `opacity: 0→1`, stagger `0.1s`, duration `0.7s`
- Tech stack badges: `scale(0.9)→1`, `opacity: 0→1`, stagger `0.05s`, delay after text block
- GPU tier card: slides in from `translateX(60px)`, `opacity: 0→1`, duration `0.8s`
- TPU tier card: same, delay `0.15s`
- CPU tier card: same, delay `0.3s`
- Arrows: fade in after all tiers visible, `opacity: 0→1`, continuous subtle `translateY(0→6px)` loop, `1.5s` duration
- Easing: `ease-dramatic`
- Trigger: `top 75%`

**Hover Interaction:**
- Hovering a tier card highlights its border (intensity +30%) and dims the other two tiers to `opacity: 0.5`
- Duration `0.3s`

---

## Section 4: Benchmarks

**Layout:** Full-width section with heading left-aligned, comparison chart below.

**Content:**
- Section heading: "Performance That Speaks"
- Section subhead: "Real benchmarks against industry-standard databases."
- 4 benchmark comparison rows (horizontal bar chart):

| # | Test | VedaDB | MySQL | MongoDB | Redis |
|---|------|--------|-------|---------|-------|
| 1 | SQL Queries/sec | 1.2M | 120K | 85K | — |
| 2 | Vector Search (Recall@10) | 0.98 | — | — | — |
| 3 | Key-Value ops/sec | 2.8M | — | — | 800K |
| 4 | Mixed Workload | 450K | 45K | 30K | 120K |

- Each row shows: label (left), then 4 bars side by side with database name below
- VedaDB bar color: `--accent-green`
- Competitor bar colors: MySQL `#4479A1`, MongoDB `#47A248`, Redis `#DC382D`
- Bar background track: `--bg-tertiary`
- Bar height: 28px, border-radius 4px

- Section footer: "Results from internal benchmark suite. Your results may vary based on hardware configuration." in `--text-muted`, 12px

**Layout:**
- Chart container: max-width `--container-max`, centered
- Each benchmark row: `display: grid; grid-template-columns: 200px 1fr; gap: 24px; align-items: center`
- Bars within row: `display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px`
- Mobile: label stacks above bars, `grid-template-columns: 1fr`

**Entrance Animations:**
- Heading: `translateY(30px)→0`, `opacity: 0→1`, duration `0.7s`
- Subhead: delay `0.1s`, same animation
- Each benchmark row: stagger `0.15s`, `translateY(30px)→0`, `opacity: 0→1`
- Bars: width animates from `0%` to target percentage, duration `1.2s`, easing `ease-dramatic`, triggered after row enters
- Animated number counters: numbers count up from 0 to final value over `1.2s`, synchronized with bar width animation
- Trigger: `top 75%`

---

## Section 5: Install

**Layout:** Centered content, max-width `800px`, tabbed interface for platforms.

**Content:**
- Section heading: "Install in Seconds"
- Section subhead: "One binary. No dependencies. No configuration."
- Tab group (horizontal pills):
  - "Linux" | "macOS" | "Docker"
- Active tab: `--accent-green` background, black text
- Inactive tab: `--bg-secondary` background, `--text-secondary` text
- Content area below tabs (code block):

**Tab Content:**
- **Linux** (default):
  ```bash
  curl -fsSL https://get.vedadb.dev | bash
  vedadb --version
  ```
- **macOS**:
  ```bash
  brew install vedadb
  vedadb --version
  ```
- **Docker**:
  ```bash
  docker pull vedadb/vedadb:latest
  docker run -p 5432:5432 vedadb/vedadb
  ```
- Code block: dark background (`#0D0D0D`), syntax highlighted (commands in `--accent-green`, args in `--text-secondary`)
- Copy button: top-right of code block, clipboard icon → checkmark on click (1.5s timeout)

**Below code block:**
- Quick start hint: "Then open http://localhost:5432/workbench for the built-in query UI." in `--text-muted`, 14px
- Secondary CTA row:
  - "View Documentation" (secondary button)
  - "Join Discord" (secondary button with Discord icon)

**Entrance Animations:**
- Heading: `translateY(30px)→0`, `opacity: 0→1`, duration `0.7s`
- Subhead: delay `0.1s`
- Tabs: `translateY(15px)→0`, `opacity: 0→1`, stagger `0.05s`, delay `0.2s`
- Code block: `translateY(20px)→0`, `opacity: 0→1`, `scale(0.98)→1`, delay `0.3s`, duration `0.6s`
- Trigger: `top 80%`

**Tab Switch Animation:**
- Active indicator slides horizontally to new tab position, `0.3s ease-smooth`
- Code content cross-fades: `opacity: 1→0→1` over `0.2s`

**Copy Button Interaction:**
- Click: copies text to clipboard
- Icon morphs: clipboard → checkmark (Lucide icons)
- Brief flash: button background pulses `--accent-green-dim`
- Reverts after `1.5s`

---

## Section 6: CTA Footer

**Layout:** Full-width, generous vertical padding (`120px`), centered content.

**Content:**
- Large CTA heading: "Ready to Accelerate Your Data?"
- Subtext: "Open source, Apache 2.0 licensed. Join the growing community of developers building on GPU-native infrastructure."
- CTA button group (horizontal):
  - Primary: "★ Star on GitHub" with star icon
  - Secondary: "Read the Docs"
- Stats bar (horizontal, centered):
  - "GitHub Stars" with animated counter
  - "Contributors" with animated counter
  - "Latest Release" with version badge
- License badge: "Apache 2.0 Licensed" pill badge
- Bottom row: "© 2025 VedaDB Contributors" in `--text-muted`, 12px

**Entrance Animations:**
- Heading: `translateY(30px)→0`, `opacity: 0→1`, duration `0.8s`
- Subtext: delay `0.15s`, same
- CTA buttons: `scale(0.95)→1`, `opacity: 0→1`, stagger `0.1s`, delay `0.3s`
- Stats bar: each item `translateY(15px)→0`, `opacity: 0→1`, stagger `0.08s`, delay `0.5s`
- License + copyright: `opacity: 0→1`, delay `0.7s`
- Trigger: `top 80%`

**Star Button Interaction:**
- Hover: star icon rotates `15deg` and scales `1.2`, `0.3s`
- Click: brief scale pulse `1.05`, opens GitHub in new tab

---