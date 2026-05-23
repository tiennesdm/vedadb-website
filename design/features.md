# Features Page Design

A deep-dive feature explorer that showcases VedaDB's 50+ capabilities organized into five category tabs. The page opens with a bold hero statement, then presents features as rich cards with descriptions and live code snippets. Developers come here to understand exactly what VedaDB can do.

| Property | Value |
|----------|-------|
| Route | `/features` |
| Sections | 4 |
| Purpose | Comprehensive feature catalog — builds confidence through specificity |

---

## Section 1: Page Hero

**Layout:** Height 60vh (min 480px), content centered vertically and horizontally. Background: Hero BG gradient. No particle canvas (clean, readable).

**Content (centered, max-width 720px):**
1. **Label**: "FEATURES" — Inter 12px, 600, color #E8A838, uppercase, letter-spacing 0.1em
2. **Heading**: "50+ features. One powerful engine." — Inter 56px, 900, line-height 1.1, color #FFFFFF, text-align center
3. **Subheading**: "Explore every capability that makes VedaDB the most versatile database platform on the planet." — Inter 18px, 400, color #8B95A5, text-align center, margin-top 16px
4. **Category pills**: 5 horizontal pills, gap 10px, margin-top 40px, centered
   - Each pill: padding 8px 20px, border-radius 20px, border 1px solid #2A3A50, Inter 14px, 500, color #8B95A5
   - Hover: border-color #E8A838, color #E8A838, background rgba(232,168,56,0.05)
   - Labels: AI-Native · Multimodal · Cloud-Native · Streaming · Security
   - Clicking smooth-scrolls to corresponding section anchor

**Animations:**
- **Heading**: Text reveal, word-by-word fade-up, stagger 0.08s, duration 0.8s, ease-out-expo. Trigger: on load.
- **Subheading**: Fade-up, 0.3s delay after heading.
- **Pills**: Fade-up, stagger 0.06s, 0.5s delay.

**Mobile (<768px):** Heading → 36px. Pills wrap to 2 rows.

---

## Section 2: Feature Category Explorer

**Layout:** Max-width 1280px centered. Padding 80px vertical per category. Each category is a self-contained block with its own anchor ID.

**Category Header (per block):**
- Label: Category name — Inter 12px, 600, color #E8A838, uppercase, letter-spacing 0.1em
- Heading: Category title — Inter 36px, 800, color #FFFFFF, margin-top 8px
- Description: Category overview — Inter 16px, 400, color #8B95A5, max-width 640px, margin-top 12px

**Feature Cards Grid:** 2 columns, gap 24px, margin-top 40px.

**Feature Card:**
- Background #1A2433, border 1px solid #2A3A50, border-radius 12px, padding 32px, hover: border-color #3A4F6B, translateY(-4px)
- Top row: Lucide icon (24px, color #00D4AA) + Feature name (Inter 20px, 700, color #FFFFFF, margin-left 12px)
- Description: Inter 15px, 400, color #8B95A5, margin-top 12px, line-height 1.6
- Code block: margin-top 16px, Terminal Window mini (background #0D1117, border-radius 8px, padding 16px, JetBrains Mono 13px, color #00D4AA, overflow-x auto)
- Hover: box-shadow 0 8px 24px rgba(0,0,0,0.25)
- Transition: all 0.3s ease-smooth

---

### Category: AI-Native (id: `#ai-native`)

**Category Header:**
- Label: "AI-NATIVE"
- Heading: "Built for the AI era"
- Description: "AI isn't bolted on — it's woven into the core. Run inference, generate embeddings, and query vectors without ever leaving SQL."

**Features (4 cards):**

| Feature | Icon | Description | Code |
|---------|------|-------------|------|
| SQL-Powered AI | `brain` | Call LLMs and embedding models directly from SQL queries. Chain multiple AI operations in a single transaction. | `SELECT ai_generate('Summarize this:', article_text) FROM articles WHERE id = 42;` |
| Vector Embeddings | `database` | Store and query high-dimensional vectors with HNSW indexing. Automatic embedding generation on insert. | `SELECT * FROM products ORDER BY embedding <-> ai_embed('running shoes') LIMIT 10;` |
| Model Management | `cpu` | Deploy ONNX models inside the database. Version, hot-swap, and monitor inference workloads. | `CALL deploy_model('classifier_v2', './model.onnx', 'cpu');` |
| RAG Pipeline | `layers` | Built-in retrieval-augmented generation. Combine vector search with LLM inference in one query. | `SELECT ai_generate(ctx, 'Answer: ' || question) FROM (SELECT * FROM docs ORDER BY embedding <-> q LIMIT 5) ctx;` |

---

### Category: Multimodal (id: `#multimodal`)

**Category Header:**
- Label: "MULTIMODAL"
- Heading: "Search beyond text"
- Description: "Query images, audio, and video as naturally as you query rows. VedaDB understands content, not just structure."

**Features (4 cards):**

| Feature | Icon | Description | Code |
|---------|------|-------------|------|
| Image Search | `image` | Upload an image and find visually similar content. Supports CLIP-style embeddings for semantic image search. | `SELECT * FROM images WHERE content ~= upload('photo.jpg') LIMIT 5;` |
| Audio Indexing | `audio` | Index audio waveforms and search by sound similarity. Ideal for music, podcasts, and voice data. | `SELECT * FROM audio WHERE waveform <-> query_vec LIMIT 10;` |
| Video Analysis | `video` | Extract frames, index visual content, and search video libraries with natural language. | `SELECT * FROM video WHERE frames ~= 'person riding bicycle' LIMIT 5;` |
| Cross-Modal Join | `merge` | Join across media types — e.g., find products where image matches AND description contains keyword. | `SELECT p.* FROM products p JOIN images i ON p.id = i.product_id WHERE i.content ~= img AND p.name ILIKE '%shoe%';` |

---

### Category: Cloud-Native (id: `#cloud-native`)

**Category Header:**
- Label: "CLOUD-NATIVE"
- Heading: "Built for modern infrastructure"
- Description: "Kubernetes-native, horizontally scalable, with Git-like branching for your data."

**Features (4 cards):**

| Feature | Icon | Description | Code |
|---------|------|-------------|------|
| Database Branching | `git-branch` | Create isolated branches of your database for development, testing, and CI/CD. Merge back when ready. | `CREATE BRANCH feature_login FROM main; -- work, test, merge` |
| Zero-Downtime Migrations | `arrow-up-circle` | Apply schema changes without locking tables. Background migration engine handles large tables safely. | `ALTER TABLE users ADD COLUMN mfa_enabled BOOLEAN DEFAULT false; -- zero lock` |
| Auto-Scaling | `trending-up` | Compute and storage scale independently based on workload. Pay for what you use, when you use it. | `SET auto_scale = true; -- handles the rest` |
| Multi-Region | `globe` | Replicate data across regions with configurable consistency. Built-in conflict resolution. | `CREATE REPLICATION london FROM us_east WITH consistency = 'strong';` |

---

### Category: Streaming (id: `#streaming`)

**Category Header:**
- Label: "STREAMING"
- Heading: "Real-time data, real-time queries"
- Description: "Subscribe to queries, stream changes, and build reactive applications on live data."

**Features (4 cards):**

| Feature | Icon | Description | Code |
|---------|------|-------------|------|
| Streaming SQL | `waves` | Subscribe to any SELECT query and receive live updates as underlying data changes. | `SUBSCRIBE SELECT symbol, AVG(price) FROM trades GROUP BY symbol;` |
| CDC Replication | `repeat` | Capture every change and stream to external systems. Kafka, WebSocket, and webhook targets. | `CREATE REPLICATION_SLOT warehouse TO kafka('events-topic');` |
| Event Triggers | `bell` | Execute functions when data changes. Build reactive workflows without polling. | `CREATE TRIGGER notify ON orders AFTER INSERT EXECUTE send_webhook('https://api.store/notify');` |
| Materialized Views | `refresh-cw` | Pre-computed views that refresh automatically or on demand. Perfect for dashboards. | `CREATE MATERIALIZED VIEW daily_sales AS SELECT date, SUM(amount) FROM orders GROUP BY date;` |

---

### Category: Security (id: `#security`)

**Category Header:**
- Label: "SECURITY"
- Heading: "Enterprise-grade protection"
- Description: "Confidential computing, row-level security, and encryption — because your data deserves fortress-level defense."

**Features (4 cards):**

| Feature | Icon | Description | Code |
|---------|------|-------------|------|
| TEE / Confidential | `lock` | Run queries inside Trusted Execution Environments. Data is encrypted even during processing. | `SET confidential_compute = true; -- hardware-isolated enclave` |
| Row-Level Security | `shield` | Define per-row access policies. Users automatically see only data they're authorized for. | `CREATE POLICY tenant_isolation ON orders USING (tenant_id = current_tenant());` |
| End-to-End Encryption | `key` | Client-side encryption with keys you control. VedaDB never sees plaintext. | `INSERT INTO secrets VALUES (encrypt('password', client_key));` |
| Audit Logging | `clipboard-list` | Comprehensive audit trail of every query, connection, and administrative action. SIEM-ready. | `SELECT * FROM audit_log WHERE action = 'schema_change' AND ts > NOW() - INTERVAL '7 days';` |

---

## Section 3: Feature Comparison Strip

**Layout:** Full-width band. Background #0F1923. Padding 64px vertical. Border-top 1px solid #1A2433.

**Content (max-width 1280px centered):**
- Heading: "Why developers choose VedaDB" — Inter 36px, 800, color #FFFFFF
- Horizontal strip of 6 stat blocks, flex, gap 32px, margin-top 32px

| Stat | Label |
|------|-------|
| 8-in-1 | Database models unified |
| 3x | Faster query performance |
| 60% | Infrastructure cost reduction |
| 0.4ms | Average SQL query latency |
| 99.99% | Uptime SLA |
| 24/7 | Support available |

**Stat styling:** Number in Inter 32px, 700, color #E8A838. Label in Inter 13px, 400, color #8B95A5.

**Animations:**
- **Stats**: Count-up animation, 1.5s duration, stagger 0.1s. ScrollTrigger: start "top 80%".

**Mobile:** Stats stack 2×3.

---

## Section 4: CTA Section

**Layout:** Full-width. Padding 80px vertical. Background #0A0E1A.

**Content (centered, max-width 640px):**
- Heading: "Ready to explore VedaDB?" — Inter 40px, 800
- Subheading: "Start building free. No credit card required." — Inter 16px, 400, color #8B95A5, margin-top 12px
- Button row: gap 16px, margin-top 32px, centered
  - "Get Started Free" — Primary Button (Amber CTA)
  - "View Documentation" — Secondary Button (Outline)

**Animations:** Fade-up, 0.6s. ScrollTrigger: start "top 80%".

---