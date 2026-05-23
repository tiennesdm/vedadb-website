# Playground Page Design

An interactive query playground where visitors can type and execute SQL, Cypher, Document, and Vector queries against a live VedaDB instance. This is the "wow" page — where skepticism turns into belief. The terminal is the hero; everything else supports it.

| Property | Value |
|----------|-------|
| Route | `/playground` |
| Sections | 3 |
| Purpose | Interactive demo — convert through hands-on experience |

---

## Section 1: Playground Hero

**Layout:** Height auto (min 100vh). Background #0A0E1A. Padding-top 96px (below nav). Full-width.

**Header (centered, max-width 720px):**
1. **Label**: "PLAYGROUND" — Inter 12px, 600, color #E8A838, uppercase, letter-spacing 0.1em
2. **Heading**: "Try VedaDB right now" — Inter 48px, 900, line-height 1.1, color #FFFFFF, text-align center
3. **Subheading**: "Run real queries against a live database. No signup required." — Inter 18px, 400, color #8B95A5, text-align center, margin-top 12px

**Animations:**
- **Header**: Fade-up, stagger 0.1s, 0.6s, ease-out-expo. Trigger: on load.

---

## Section 2: Interactive Terminal

**Layout:** Max-width 1100px centered. Margin-top 48px. Padding 0 24px 96px.

**Terminal Container:**
- Full Terminal Window component (see design.md)
- Height: 520px (flexible)
- Box-shadow: 0 24px 64px rgba(0,0,0,0.4)

**Window Title Bar:**
- Height: 40px
- Background: #161B22
- 3 dots: #FF5F56, #FFBD2E, #27C93F (12px circles, gap 8px, left 16px)
- Title: "VedaDB Playground" — Inter 13px, 500, color #8B95A5, centered
- Status: "● Connected" — Inter 12px, 500, color #22C55E, right 16px

**Query Input Area (top of terminal, 48px height):**
- Background: #0D1117
- Border-bottom: 1px solid #2A3A50
- Language selector: 4 pill buttons, gap 4px, left 16px
  - "SQL" | "Cypher" | "Document" | "Vector"
  - Active: background #E8A838, color #0A0E1A, Inter 12px, 700, padding 4px 14px, border-radius 4px
  - Inactive: background #1A2433, color #8B95A5, Inter 12px, 500
- Run button: Lucide `play` 14px + "Run" — right 16px, background #22C55E, color #0A0E1A, Inter 12px, 700, padding 6px 16px, border-radius 4px

**Editor Area (left 55%):**
- Background: #0D1117
- Padding: 16px
- Font: JetBrains Mono 14px, line-height 1.7
- Syntax highlighting active for selected language
- Line numbers: left gutter, Inter 12px, color #5A6A7F, width 40px, text-align right, padding-right 12px
- Cursor: blinking block, color #E8A838
- Placeholder text (when empty): "Type your query here..." — color #5A6A7F, JetBrains Mono 14px

**Result Panel (right 45%):**
- Background: #0D1117
- Border-left: 1px solid #2A3A50
- Padding: 16px
- Tab bar: "Table" | "JSON" | "Raw" — Inter 12px, 500
  - Active: color #FFFFFF, border-bottom 2px solid #E8A838
  - Inactive: color #5A6A7F
- Result table: Inter 13px, color #C9D1D9
  - Header row: background #161B22, Inter 12px, 600, color #8B95A5
  - Data rows: border-bottom 1px solid #1A2433
  - Alternating row bg: rgba(255,255,255,0.01)
- Timing badge: "Executed in 0.4ms" — Inter 12px, 500, color #22C55E, margin-top 8px

**Sample Query Buttons (below terminal):**
- Horizontal scroll row, gap 8px, margin-top 16px
- Each button: background #1A2433, border 1px solid #2A3A50, border-radius 6px, padding 8px 14px, Inter 13px, 500, color #8B95A5
- Hover: border-color #E8A838, color #E8A838
- Samples:
  - "SELECT all users"
  - "Graph: who follows Alice"
  - "Vector: similar products"
  - "Document: recent errors"
  - "JOIN across models"
  - "AI: summarize text"

**Pre-loaded Queries (clicking sample buttons loads these):**

1. **SQL**: `SELECT u.name, u.email, COUNT(o.id) as orders FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id ORDER BY orders DESC LIMIT 5;`
2. **Cypher**: `MATCH (u:User {name: 'Alice'})-[:FOLLOWS]->(f:User)-[:POSTED]->(p:Post) RETURN f.name, p.title, p.created_at ORDER BY p.created_at DESC LIMIT 5;`
3. **Vector**: `SELECT name, category, embedding <-> ai_embed('wireless headphones') as similarity FROM products ORDER BY similarity LIMIT 5;`
4. **Document**: `db.collection('logs').find({level: 'error'}).sort({timestamp: -1}).limit(5)`
5. **JOIN**: `SELECT u.name, p.title, vec.similarity FROM users u JOIN posts p ON u.id = p.user_id JOIN (SELECT * FROM embeddings ORDER BY embedding <-> query_vec LIMIT 5) vec ON p.id = vec.id;`
6. **AI**: `SELECT name, ai_generate('Write a one-line description for:', description) as tagline FROM products LIMIT 3;`

**Demo Data (pre-loaded in playground):**
- 50 users, 200 orders, 100 products, 50 posts, 30 log entries
- All models queryable and cross-joinable

**Keyboard Shortcuts:**
- `Cmd/Ctrl + Enter`: Run query
- `Cmd/Ctrl + /`: Toggle comment
- `Tab`: Insert 2 spaces

**Animations:**
- **Terminal**: Fade-up (translateY 20px → 0, opacity 0 → 1), 0.8s, ease-out-expo. Trigger: 0.3s after page load.
- **Query execution**: Result panel slides in from right (translateX 20px → 0, opacity 0 → 1, 0.3s).
- **Sample button click**: Flash border #E8A838 for 0.2s.

---

## Section 3: Playground Tips

**Layout:** Max-width 1280px centered. Padding 64px vertical. Background #0F1923.

**Header:**
- Heading: "What you can do in the playground" — Inter 32px, 800

**Tip cards:** 3 columns, gap 24px, margin-top 32px.

**Tip Card:**
- Background #1A2433, border 1px solid #2A3A50, border-radius 12px, padding 28px
- Icon: Lucide, 28px, color #00D4AA, margin-bottom 16px
- Title: Inter 18px, 700, color #FFFFFF
- Description: Inter 14px, 400, color #8B95A5, line-height 1.6, margin-top 8px
- Code: JetBrains Mono 12px, color #00D4AA, margin-top 12px, background #0D1117, padding 8px 12px, border-radius 6px

| Tip | Icon | Description | Code |
|-----|------|-------------|------|
| Cross-Model Queries | `shuffle` | Join SQL tables with graph nodes and vector embeddings in a single query. | `SELECT * FROM users u JOIN (SELECT * FROM embeddings ...) e ON u.id = e.id` |
| AI from SQL | `brain` | Call LLM functions directly inside your SELECT statements. | `SELECT ai_generate('Summarize:', text) FROM docs` |
| Subscribe to Data | `rss` | Use SUBSCRIBE for real-time query results that update live. | `SUBSCRIBE SELECT COUNT(*) FROM orders` |

**Card Hover:** translateY(-4px), border-color #3A4F6B.

**Animations:**
- **Cards**: Scale-in, stagger 0.1s, 0.5s. ScrollTrigger: start "top 80%".

---