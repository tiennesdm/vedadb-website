# Docs Page Design

The documentation landing page for VedaDB. Clean, readable, and developer-focused — the antithesis of cluttered enterprise documentation. Organized into clear sections with a sidebar navigation, code examples, and a logical flow from installation to first query.

| Property | Value |
|----------|-------|
| Route | `/docs` |
| Sections | 4 |
| Purpose | Developer onboarding — get users from zero to first query fast |

---

## Section 1: Docs Hero

**Layout:** Height 35vh (min 300px). Content centered. Background: Hero BG gradient.

**Content (centered, max-width 720px):**
1. **Label**: "DOCUMENTATION" — Inter 12px, 600, color #E8A838, uppercase, letter-spacing 0.1em
2. **Heading**: "Get started with VedaDB" — Inter 48px, 900, line-height 1.1, color #FFFFFF, text-align center
3. **Subheading**: "From installation to your first query in under 5 minutes." — Inter 18px, 400, color #8B95A5, text-align center, margin-top 12px
4. **Search bar**: Margin-top 32px, max-width 480px, centered
   - Input: background #1A2433, border 1px solid #2A3A50, border-radius 8px, padding 12px 16px 12px 44px, Inter 15px, color #FFFFFF, placeholder "Search documentation..." in #5A6A7F
   - Search icon: Lucide `search`, 18px, color #5A6A7F, absolute left 14px
   - Focus: border-color #E8A838, box-shadow 0 0 0 3px rgba(232,168,56,0.1)

**Animations:**
- **Content**: Fade-up, stagger 0.1s, 0.6s, ease-out-expo.

**Mobile (<768px):** Heading → 32px.

---

## Section 2: Quick Start Guide

**Layout:** Max-width 900px centered. Padding 96px vertical. Background #0A0E1A.

**Left sidebar (desktop ≥1024px):** Fixed position, width 240px, left calc(50% - 640px), top 120px. Contains table of contents for the quick start guide.

**Sidebar:**
- Background: transparent
- Section title: "QUICK START" — Inter 11px, 600, color #8B95A5, uppercase, letter-spacing 0.1em, margin-bottom 16px
- Links: Inter 14px, 400, color #8B95A5, line-height 2.4, padding-left 12px, border-left 2px solid transparent
  - Hover: color #FFFFFF
  - Active: color #E8A838, border-left-color #E8A838, background rgba(232,168,56,0.05)
- Items: 1. Install · 2. Configure · 3. Connect · 4. First Query · 5. Next Steps

**Main content (offset 280px on desktop, full-width on mobile):**

---

### Step 1: Install

**Step number**: "01" — Inter 48px, 900, color rgba(232,168,56,0.15)
**Step title**: "Install VedaDB" — Inter 28px, 800, color #FFFFFF, margin-top -20px (overlaps number)

**Description**: "VedaDB runs on Linux, macOS, and Windows (via WSL). The fastest way to get started is with our install script." — Inter 16px, 400, color #8B95A5, line-height 1.7, margin-top 12px

**Code block (Terminal Window mini):**
```bash
$ curl -fsSL https://get.vedadb.dev | bash
# Or with wget:
$ wget -qO- https://get.vedadb.dev | bash
```

**Copy button**: Top-right of code block, Lucide `copy` 14px, color #5A6A7F, hover #FFFFFF. Click copies to clipboard, brief "Copied!" flash.

**Alternative options (below code):**
- "Docker:" + `$ docker run -p 5432:5432 vedadb/vedadb:latest`
- "Homebrew:" + `$ brew install vedadb`

---

### Step 2: Configure

**Step number**: "02"
**Step title**: "Initialize your database"

**Description**: "After installation, initialize a new VedaDB instance. This creates the data directory and starts all eight model engines."

**Code block:**
```bash
$ vedadb init --data-dir ./mydb
$ vedadb start --data-dir ./mydb
# VedaDB v3.0.0 ready on port 5432
# All 8 model engines initialized
```

---

### Step 3: Connect

**Step number**: "03"
**Step title**: "Connect with your client"

**Description**: "VedaDB speaks the PostgreSQL wire protocol. Use any Postgres client — psql, pgAdmin, or your ORM of choice."

**Code block:**
```bash
$ psql postgres://localhost:5432/vedadb
# Connected to VedaDB v3.0.0
vedadb=>
```

**Language tabs (below):** "psql · Python · Node.js · Go · Java · Rust"
- Each tab shows connection snippet for that language
- Tab style: same as v3.0.0 Features tabs (compact)

**Python example:**
```python
import psycopg2
conn = psycopg2.connect("postgres://localhost:5432/vedadb")
# You're connected to all 8 models
```

**Node.js example:**
```javascript
const { Client } = require('pg');
const client = new Client({ connectionString: 'postgres://localhost:5432/vedadb' });
await client.connect();
```

---

### Step 4: First Query

**Step number**: "04"
**Step title**: "Run your first query"

**Description**: "VedaDB handles SQL, Cypher, Document, and Vector queries. Try each one to see how they work."

**4 query examples in a vertical stack (each with language label):**

**SQL:**
```sql
vedadb=> SELECT * FROM users WHERE active = true LIMIT 5;
 id | name  | email           | active
----+-------+-----------------+--------
  1 | Alice | alice@acme.com  | t
  2 | Bob   | bob@acme.com    | t
  3 | Carol | carol@acme.com  | t
(3 rows)
```

**Cypher (Graph):**
```cypher
vedadb=> CYPHER MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.name = 'Alice' RETURN f.name;
 f.name
--------
 Bob
 Carol
(2 rows)
```

**Vector:**
```sql
vedadb=> SELECT name, embedding <-> ai_embed('running shoes') AS sim
vedadb-> FROM products ORDER BY sim LIMIT 3;
 name              | sim
-------------------+------
 Nike Air Zoom     | 0.97
 Adidas Ultraboost | 0.95
(3 rows)
```

**Document:**
```javascript
vedadb=> DOCUMENT db.logs.find({level: "error"}).limit(3);
{ _id: 1, level: "error", msg: "Timeout", ts: "2024-01-15T10:30:00Z" }
{ _id: 2, level: "error", msg: "Disk full", ts: "2024-01-15T10:31:00Z" }
{ _id: 3, level: "error", msg: "Auth failed", ts: "2024-01-15T10:32:00Z" }
```

---

### Step 5: Next Steps

**Step number**: "05"
**Step title**: "What's next?"

**Description**: "You're up and running. Here's where to go from here."

**3 resource cards in a row**, gap 16px, margin-top 24px:

| Card | Icon | Title | Description |
|------|------|-------|-------------|
| API Reference | `book-open` | "API Reference" | "Complete API documentation for all 8 query languages." |
| Tutorials | `graduation-cap` | "Tutorials" | "Step-by-step guides for common use cases." |
| Examples | `code` | "Example Projects" | "Clone a starter repo and build something real." |

**Card styling:** Background #1A2433, border 1px solid #2A3A50, border-radius 10px, padding 24px. Icon: 24px, color #00D4AA. Title: Inter 16px, 700, color #FFFFFF, margin-top 12px. Description: Inter 14px, 400, color #8B95A5. Hover: border-color #3A4F6B, translateY(-2px).

---

**Animations:**
- **Each step**: Fade-up (translateY 30px → 0, opacity 0 → 1), 0.6s, ease-out-expo, as it enters viewport. ScrollTrigger: start "top 80%", stagger between steps handled by scroll position.
- **Code blocks**: Slight scale-in (scale 0.98 → 1) with fade, 0.4s, 0.2s delay after parent step.
- **Sidebar**: Fixed position, smooth-scrolls to section anchors on click.

---

## Section 3: Feature Quick Links

**Layout:** Full-width band. Background #0F1923. Padding 64px vertical. Border-top 1px solid #1A2433.

**Content (max-width 1280px centered):**
- Heading: "Explore by topic" — Inter 28px, 800, margin-bottom 32px

**Topic grid:** 4 columns × 2 rows, gap 16px.

**Topic Card:**
- Background #1A2433, border 1px solid #2A3A50, border-radius 10px, padding 20px
- Icon: Lucide 20px, color #E8A838, margin-bottom 10px
- Title: Inter 15px, 600, color #FFFFFF
- Description: Inter 13px, 400, color #8B95A5, margin-top 4px
- Hover: background #223044, border-color #3A4F6B
- Transition: 0.2s ease-smooth

| Topic | Icon | Description |
|-------|------|-------------|
| SQL Reference | `table` | Complete SQL syntax, functions, and operators |
| Graph / Cypher | `share-2` | Cypher query language for graph data |
| Vector Search | `search` | Embedding models, similarity search, HNSW |
| Document Store | `file-text` | JSON documents, flexible schema |
| AI Integration | `brain` | LLM functions, RAG, model deployment |
| Streaming | `activity` | Real-time subscriptions, CDC, triggers |
| Security | `shield` | RLS, encryption, TEE, audit logging |
| Migration Guide | `arrow-right-circle` | Migrate from PostgreSQL, MongoDB, etc. |

**Animations:** Scale-in, stagger 0.06s, 0.4s. ScrollTrigger: start "top 80%".

**Tablet:** 2 columns × 4 rows. **Mobile:** Single column.

---

## Section 4: Community CTA

**Layout:** Max-width 800px centered. Padding 80px vertical. Background #0A0E1A.

**Content (centered):**
- Heading: "Need help?" — Inter 32px, 800
- Subheading: "Our community and support team are here for you." — Inter 16px, 400, color #8B95A5, margin-top 8px

**3 action cards in a row**, gap 16px, margin-top 32px:

| Action | Icon | Title | Description |
|--------|------|-------|-------------|
| Discord | `message-circle` | "Join Discord" | "Get help from 2,000+ developers" |
| GitHub | `github` | "Open an Issue" | "Report bugs or request features" |
| Email | `mail` | "Email Support" | "Reach our team directly" |

**Card styling:** Same as Topic Card. Icon color: #00D4AA.

**Animations:** Fade-up, stagger 0.1s, 0.5s. ScrollTrigger: start "top 85%".

---