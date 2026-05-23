# Compare Page Design

The definitive comparison page. VedaDB versus eight separate databases in a full feature matrix. This page is designed to be the page visitors bookmark and share — overwhelming evidence that multi-model is the future. Clean, scannable, and impossible to ignore.

| Property | Value |
|----------|-------|
| Route | `/compare` |
| Sections | 5 |
| Purpose | Competitive comparison — the "smoking gun" page |

---

## Section 1: Page Hero

**Layout:** Height 50vh (min 400px). Content centered. Background: Hero BG gradient. No particles.

**Content (centered, max-width 800px):**
1. **Label**: "COMPARE" — Inter 12px, 600, color #E8A838, uppercase, letter-spacing 0.1em
2. **Heading**: "VedaDB vs. The World" — Inter 56px, 900, line-height 1.1, color #FFFFFF, text-align center
3. **Subheading**: "See how VedaDB stacks up against every specialized database you'd need to replace. One column. Every checkmark." — Inter 18px, 400, color #8B95A5, text-align center, margin-top 16px

**Animations:**
- **Heading**: Word-by-word text reveal, stagger 0.1s, 0.8s, ease-out-expo.
- **Subheading**: Fade-up, 0.3s delay.

**Mobile (<768px):** Heading → 36px.

---

## Section 2: At-a-Glance Cards

**Layout:** Max-width 1280px centered. Padding 64px vertical. Background #0A0E1A.

**9 summary cards in a 3×3 grid**, gap 16px. Each card represents one database (VedaDB + 8 competitors).

**VedaDB Card (first, highlighted):**
- Background #1A2433, border 2px solid #E8A838, border-radius 12px, padding 24px
- Icon: VedaDB logo mark, 32px, color #E8A838
- Name: "VedaDB" — Inter 20px, 700, color #E8A838
- Score: "14/14" — Inter 14px, 500, color #22C55E, margin-top 4px
- Feature count: "All features" — Inter 13px, 400, color #8B95A5

**Competitor Cards:**
- Background #1A2433, border 1px solid #2A3A50, border-radius 12px, padding 24px
- Icon: Lucide `database`, 32px, color #5A6A7F
- Name: Database name — Inter 20px, 700, color #FFFFFF
- Score: "X/14" — Inter 14px, 500 (color: #22C55E if >7, #E8A838 if 3-7, #EF4444 if <3)
- Feature count: "Y features" — Inter 13px, 400, color #8B95A5

| Database | Score | Features |
|----------|-------|----------|
| PostgreSQL | 3/14 | SQL, Full-Text, basic JSON |
| MongoDB | 2/14 | Document, basic Search |
| Neo4j | 1/14 | Graph only |
| Redis | 1/14 | Key-Value only |
| Pinecone | 1/14 | Vector only |
| InfluxDB | 1/14 | Time-Series only |
| ClickHouse | 2/14 | Columnar, SQL |
| Elasticsearch | 2/14 | Search, basic analytics |

**Animations:**
- **Cards**: Scale-in (scale 0.95 → 1, opacity 0 → 1), stagger 0.06s per card, 0.5s, ease-out-expo. ScrollTrigger: start "top 75%".

---

## Section 3: Feature Matrix

**Layout:** Full-width. Padding 96px vertical. Background #0F1923.

**Header:**
- Heading: "The complete feature matrix" — Inter 40px, 800
- Subheading: "Every feature. Every competitor. The full picture." — Inter 16px, 400, color #8B95A5

**Table:** Full-width, horizontal scroll on mobile (`overflow-x: auto`).

**Columns:** Feature | VedaDB | PostgreSQL | MongoDB | Neo4j | Redis | Pinecone | InfluxDB | ClickHouse | ES

**Header row styling:**
- Sticky at top: 72px
- Background: #1A2433
- Height: 56px
- VedaDB cell: background #E8A838, color #0A0E1A, Inter 14px, 700
- Competitor cells: Inter 13px, 600, color #8B95A5

**Data rows (14 features):**

| Feature | VedaDB | PG | Mongo | Neo4j | Redis | Pinecone | Influx | CH | ES |
|---------|--------|-----|-------|-------|-------|----------|--------|-----|-----|
| SQL Support | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Document Store | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Graph Queries | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Vector Search | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ |
| Key-Value | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Time-Series | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ |
| Columnar | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Full-Text Search | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |
| AI Functions | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Multimodal Search | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| TEE / Confidential | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Streaming SQL | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Branching | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Unified API | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |

**Cell styling:**
- ✓: Lucide `check`, 16px, color #22C55E
- ✗: Lucide `x`, 16px, color #EF4444
- Feature name: Inter 14px, 500, color #E2E8F0, padding-left 16px
- VedaDB column cells: background rgba(232,168,56,0.04)
- Row height: 52px
- Row border-bottom: 1px solid #1A2433
- Row hover: background rgba(255,255,255,0.015)

**VedaDB score bar (right of table on desktop):**
- Vertical bar showing 14/14 checkmarks, amber color, fixed position

**Animations:**
- **Table rows**: Fade-up, stagger 0.03s per row, 0.4s. ScrollTrigger: start "top 70%".

---

## Section 4: Cost Comparison

**Layout:** Max-width 1280px centered. Padding 96px vertical. Background #0A0E1A.

**Header:**
- Heading: "The cost of running eight databases" — Inter 40px, 800
- Subheading: "Infrastructure + operational overhead. One number tells the story." — Inter 16px, 400, color #8B95A5

**Comparison visualization (2-column):**

**Left: "The Stack Approach"**
- Stacked bar chart (horizontal) showing costs:
  - PostgreSQL: $400/mo (blue bar)
  - MongoDB: $500/mo (green bar)
  - Neo4j: $1,200/mo (purple bar)
  - Redis: $200/mo (red bar)
  - Pinecone: $700/mo (amber bar)
  - InfluxDB: $400/mo (cyan bar)
  - ClickHouse: $600/mo (orange bar)
  - Elasticsearch: $800/mo (pink bar)
- Total bar at bottom: $4,800/mo — Inter 24px, 800, color #EF4444
- Label: "8 databases to manage" — Inter 14px, color #8B95A5

**Right: "The VedaDB Approach"**
- Single bar: $299/mo (amber bar, full width)
- Label: "One platform. All models." — Inter 14px, color #8B95A5
- Savings badge: "Save $4,501/mo" — background rgba(34,197,94,0.15), color #22C55E, Inter 18px, 700, padding 12px 24px, border-radius 8px, margin-top 16px
- Below badge: "That's $54,012 saved per year" — Inter 14px, color #5A6A7F

**Bar styling:**
- Each bar: height 32px, border-radius 6px, margin-bottom 8px
- Bar labels: database name left, price right, Inter 13px
- Background: #1A2433

**Animations:**
- **Bars**: Width animates from 0 to final value. Duration 1.5s, easing power2.out, stagger 0.08s. ScrollTrigger: start "top 75%".
- **Savings badge**: Scale-in (scale 0.9 → 1), 0.3s delay after bars complete.

---

## Section 5: CTA Section

**Layout:** Full-width. Padding 80px vertical. Background #0F1923.

**Content (centered, max-width 640px):**
- Heading: "One database. Zero compromises." — Inter 40px, 800
- Subheading: "Join thousands of developers who've simplified their stack with VedaDB." — Inter 16px, 400, color #8B95A5, margin-top 12px
- Button row: gap 16px, margin-top 32px, centered
  - "Start Free" — Primary Button (Amber CTA)
  - "Schedule Demo" — Secondary Button (Outline)

**Animations:** Fade-up, 0.6s. ScrollTrigger: start "top 80%".

---