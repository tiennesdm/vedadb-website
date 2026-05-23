# Pricing Page Design

A clean, conversion-focused pricing page with four tiers, monthly/yearly toggle, and a comprehensive feature matrix. The Pro tier is visually highlighted as the recommended choice, guiding users naturally toward the highest-value plan.

| Property | Value |
|----------|-------|
| Route | `/pricing` |
| Sections | 4 |
| Purpose | Pricing clarity — convert visitors to signups |

---

## Section 1: Page Hero

**Layout:** Height 45vh (min 380px). Content centered. Background: Hero BG gradient. No particles.

**Content (centered, max-width 680px):**
1. **Label**: "PRICING" — Inter 12px, 600, color #E8A838, uppercase, letter-spacing 0.1em
2. **Heading**: "Simple, transparent pricing" — Inter 56px, 900, line-height 1.1, color #FFFFFF, text-align center
3. **Subheading**: "Start free. Scale as you grow. No hidden fees, no surprises." — Inter 18px, 400, color #8B95A5, text-align center, margin-top 16px

**Animations:**
- **Heading**: Word-by-word text reveal, stagger 0.1s, 0.8s, ease-out-expo.
- **Subheading**: Fade-up, 0.3s delay.

**Mobile (<768px):** Heading → 36px.

---

## Section 2: Pricing Cards

**Layout:** Max-width 1200px centered. Padding 80px vertical. Background #0A0E1A.

**Billing Toggle:** Centered above cards, margin-bottom 48px.
- Track: width 200px, height 40px, background #1A2433, border-radius 20px, border 1px solid #2A3A50
- Two options: "Monthly" / "Yearly"
- Active knob: background #E8A838, color #0A0E1A, Inter 14px, 700
- Inactive: background transparent, color #8B95A5, Inter 14px, 500
- "Save 20%" badge: right of toggle, background rgba(34,197,94,0.15), color #22C55E, Inter 12px, 600, padding 4px 10px, border-radius 12px
- Transition: Framer Motion layout animation, 0.3s spring

**4 Cards:** Grid `1fr 1fr 1.15fr 1fr`, gap 24px.

---

### Card: Free

```
Background: #1A2433
Border: 1px solid #2A3A50
Border-radius: 12px
Padding: 32px
```

- **Tier name**: "Free" — Inter 14px, 600, color #8B95A5, uppercase, letter-spacing 0.08em
- **Price**: "$0" — Inter 48px, 900, color #FFFFFF
- **Period**: "/month, forever" — Inter 14px, 400, color #5A6A7F
- **Description**: "For hobbyists, students, and early experimentation." — Inter 15px, 400, color #8B95A5, margin-top 12px
- **Divider**: 1px solid #2A3A50, margin 24px 0
- **Features** (5 items, each: Lucide `check` 16px #22C55E + Inter 14px #E2E8F0, line-height 2.2):
  - Up to 3 projects
  - 1 GB storage
  - Community support (Discord)
  - All 8 data models
  - REST API access
- **CTA**: "Get Started" — Secondary Button (Outline), full-width, margin-top 24px

---

### Card: Starter

- **Tier name**: "Starter" — Inter 14px, 600, color #00D4AA, uppercase, letter-spacing 0.08em
- **Price**: "$49" (monthly) / "$39" (yearly) — Inter 48px, 900
- **Period**: "/month" or "/month, billed yearly" — Inter 14px, 400, color #5A6A7F
- **Description**: "For small teams shipping production workloads." — Inter 15px, 400, color #8B95A5
- **Features** (7 items):
  - Everything in Free
  - 50 GB storage
  - Email support (48h SLA)
  - AI functions
  - Database branching
  - SSL certificates included
  - Up to 5 team seats
- **CTA**: "Start Free Trial" — Secondary Button (Outline, border-color #00D4AA, hover text #00D4AA), full-width

---

### Card: Pro (Most Popular)

```
Background: #1A2433
Border: 2px solid #E8A838
Border-radius: 12px
Padding: 32px
Position: relative
Transform: translateY(-16px) /* Elevated above siblings */
Box-shadow: 0 12px 48px rgba(232,168,56,0.12)
```

- **Badge**: "MOST POPULAR" — absolute, top: -14px, left: 50%, transform translateX(-50%), background #E8A838, color #0A0E1A, Inter 11px, 700, uppercase, letter-spacing 0.06em, padding 6px 16px, border-radius 4px
- **Tier name**: "Pro" — Inter 14px, 600, color #E8A838, uppercase
- **Price**: "$299" (monthly) / "$239" (yearly) — Inter 48px, 900
- **Period**: "/month" or "/month, billed yearly" — Inter 14px, 400, color #5A6A7F
- **Description**: "For growing teams that need power and reliability." — Inter 15px, 400, color #8B95A5
- **Divider**: 1px solid #2A3A50, margin 24px 0
- **Features** (11 items):
  - Everything in Starter
  - 500 GB storage
  - Priority support (4h SLA)
  - Multimodal search (image, audio, video)
  - Streaming SQL subscriptions
  - CDC replication
  - Custom domains
  - 10 team seats
  - Advanced query analytics
  - 99.99% uptime SLA
  - Dedicated account manager
- **CTA**: "Start Free Trial" — Primary Button (Amber CTA), full-width, margin-top 24px

---

### Card: Enterprise

- **Tier name**: "Enterprise" — Inter 14px, 600, color #FFFFFF, uppercase
- **Price**: "Custom" — Inter 48px, 900, color #FFFFFF
- **Period**: "Contact us for pricing" — Inter 14px, 400, color #5A6A7F
- **Description**: "For organizations with mission-critical data at scale." — Inter 15px, 400, color #8B95A5
- **Divider**: 1px solid #2A3A50, margin 24px 0
- **Features** (7 items):
  - Everything in Pro
  - Unlimited storage
  - Dedicated infrastructure (single-tenant)
  - TEE / Confidential computing
  - Custom SLAs and contracts
  - On-premise deployment option
  - 24/7 phone + Slack support
- **CTA**: "Talk to Sales" — Secondary Button (Outline), full-width

---

### Card Interactions

**Hover:**
- Free/Starter/Enterprise: translateY(-6px), border-color #3A4F6B, box-shadow 0 12px 40px rgba(0,0,0,0.3)
- Pro: translateY(-20px) (maintains extra offset), box-shadow 0 20px 60px rgba(232,168,56,0.18)
- Transition: all 0.3s ease-smooth

**Animations:**
- **Cards**: Scale-in (scale 0.95 → 1, opacity 0 → 1), stagger 0.1s (left to right), 0.5s, ease-out-expo. ScrollTrigger: start "top 75%".
- **Toggle**: Smooth layout animation when switching monthly/yearly.

**Tablet:** 2×2 grid (Pro card maintains 1.15 relative width). **Mobile:** Single column stack (Pro card loses offset).

---

## Section 3: Feature Comparison Matrix

**Layout:** Max-width 1200px centered. Padding 96px vertical. Background #0F1923.

**Header:**
- Heading: "Compare all features" — Inter 36px, 800
- Subheading: "Every feature, every tier. Choose what fits your team." — Inter 16px, 400, color #8B95A5

**Table:** Full-width. Sticky header at top: 72px.

**Columns:** Feature | Free | Starter | Pro | Enterprise

**Header styling:**
- Free: Inter 13px, 600, color #8B95A5
- Starter: Inter 13px, 600, color #00D4AA
- Pro: Inter 13px, 600, color #E8A838, background rgba(232,168,56,0.08)
- Enterprise: Inter 13px, 600, color #FFFFFF

**Feature categories (grouped rows):**

**Category: Core Database**
| Feature | Free | Starter | Pro | Enterprise |
|---------|------|---------|-----|------------|
| SQL/Relational | ✓ | ✓ | ✓ | ✓ |
| Document Store | ✓ | ✓ | ✓ | ✓ |
| Graph Queries | ✓ | ✓ | ✓ | ✓ |
| Vector Search | ✓ | ✓ | ✓ | ✓ |
| Key-Value | ✓ | ✓ | ✓ | ✓ |
| Time-Series | ✓ | ✓ | ✓ | ✓ |
| Columnar | ✓ | ✓ | ✓ | ✓ |
| Full-Text Search | ✓ | ✓ | ✓ | ✓ |

**Category: AI & Advanced**
| Feature | Free | Starter | Pro | Enterprise |
|---------|------|---------|-----|------------|
| AI Functions (LLM calls) | 100/mo | 1,000/mo | 10,000/mo | Unlimited |
| Vector Embeddings | ✓ | ✓ | ✓ | ✓ |
| Multimodal Search | — | — | ✓ | ✓ |
| Model Hosting | — | — | 3 models | Unlimited |

**Category: Operations**
| Feature | Free | Starter | Pro | Enterprise |
|---------|------|---------|-----|------------|
| Database Branching | 3 branches | 10 branches | Unlimited | Unlimited |
| Streaming SQL | — | — | ✓ | ✓ |
| CDC Replication | — | — | ✓ | ✓ |
| Auto-Scaling | — | ✓ | ✓ | ✓ |

**Category: Security**
| Feature | Free | Starter | Pro | Enterprise |
|---------|------|---------|-----|------------|
| Row-Level Security | ✓ | ✓ | ✓ | ✓ |
| SSL/TLS | ✓ | ✓ | ✓ | ✓ |
| TEE/Confidential | — | — | — | ✓ |
| Audit Logging | — | — | ✓ | ✓ |
| SSO/SAML | — | — | — | ✓ |

**Category: Support & Scale**
| Feature | Free | Starter | Pro | Enterprise |
|---------|------|---------|-----|------------|
| Storage | 1 GB | 50 GB | 500 GB | Unlimited |
| Projects | 3 | Unlimited | Unlimited | Unlimited |
| Team Seats | 1 | 5 | 10 | Unlimited |
| Support | Community | Email (48h) | Priority (4h) | 24/7 Phone |
| Uptime SLA | — | 99.9% | 99.99% | Custom |
| Dedicated Infra | — | — | — | ✓ |

**Cell styling:**
- ✓: Lucide `check` 16px, color #22C55E
- —: Lucide `minus` 16px, color #2A3A50
- Numeric values: Inter 14px, color #E2E8F0
- Category headers: background #1A2433, Inter 13px, 700, color #8B95A5, uppercase, padding 12px 16px
- Row height: 48px
- Row border-bottom: 1px solid #1A2433
- Row hover: background rgba(255,255,255,0.01)

**Animations:**
- **Table**: Rows fade-up, stagger 0.02s, 0.4s. ScrollTrigger: start "top 70%".

---

## Section 4: FAQ & CTA

### FAQ Accordion

**Layout:** Max-width 800px centered. Padding 64px vertical. Background #0A0E1A.

**Header:**
- Heading: "Frequently asked questions" — Inter 36px, 800, text-align center

**Accordion items** (5 questions), margin-top 40px. Each:
- Border-bottom 1px solid #2A3A50, padding 20px 0
- Question row: flex, space-between, align-center
  - Question: Inter 16px, 600, color #FFFFFF
  - Toggle icon: Lucide `plus` / `minus`, 20px, color #8B95A5
- Answer: Inter 15px, 400, color #8B95A5, line-height 1.7, max-height 0 → auto on open, padding-top 12px
- Open state: answer visible, icon rotates to `minus`
- Transition: max-height 0.3s ease-smooth, opacity 0.2s

| Question | Answer |
|----------|--------|
| Can I really replace all my databases with VedaDB? | Yes. VedaDB supports SQL, Document, Graph, Vector, Key-Value, Time-Series, Columnar, and Search models in a single engine. You can migrate gradually or all at once. |
| Is there a free trial for paid tiers? | All paid tiers come with a 14-day free trial. No credit card required to start. |
| What happens if I exceed my plan limits? | We'll notify you at 80% usage. You can upgrade instantly or purchase add-on packs for storage and AI calls. |
| Can I self-host VedaDB? | Enterprise plans include an on-premise deployment option with full source access and dedicated support. |
| How does pricing work for AI features? | Each tier includes a monthly quota of AI function calls (LLM invocations). Additional calls are billed at $0.002 per 1K tokens. |

### CTA Band

**Layout:** Full-width within section. Padding 48px. Background #1A2433, border-radius 12px, margin-top 64px.

**Content (centered):**
- Heading: "Still have questions?" — Inter 28px, 800
- Subheading: "Our team is happy to help you find the right plan." — Inter 15px, 400, color #8B95A5
- Button row: gap 12px, margin-top 20px
  - "Contact Sales" — Primary Button (Amber CTA, compact)
  - "View Documentation" — Secondary Button (Outline, compact)

**Animations:**
- **FAQ**: Fade-up, 0.5s. ScrollTrigger: start "top 80%".
- **CTA Band**: Scale-in (0.97 → 1), 0.6s delay.

---