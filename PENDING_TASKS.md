# VedaDB — Pending Tasks Master List

> Created: 2026-05-16 | Last Updated: 2026-05-16
> Owner: Shubahm Mehta (contact@vedadb.com)
> Status: Agent Memory — This file persists across sessions

---

## PRIORITY MATRIX

| Priority | Task | Status | Blocking? |
|----------|------|--------|-----------|
| P0 | Verify GitHub Pages reflection (videos section) | Pending | Yes |
| P0 | Fill a16z Speedrun application | Pending | Yes |
| P0 | Fill NVIDIA Inception application | Pending | Yes |
| P1 | Expand investor list (US + India VCs) | Pending | No |
| P1 | Oracle for Startups — find correct URL | Pending | No |
| P2 | Pitch video quality v8 (no text overlap) | Pending | No |
| P2 | Architecture video voice enhancement v4 | Pending | No |
| P2 | Code push to master (all repos) | Pending | No |
| P3 | PageIndex integration analysis for VedaDB | Analysis Done | No |
| P3 | Documentation website (vedadb-docs) | Pending | No |
| P3 | CI/CD pipeline for GitHub Pages auto-deploy | Pending | No |

---

## P0 — CRITICAL (Do First)

### 1. Verify GitHub Pages Live Reflection
- **Context:** Website files pushed via GitHub API (commits b51a66d7, 4820acf8, 587efab8)
- **Check:** Open https://tiennesdm.github.io/vedadb-website/ and verify:
  - [ ] "Videos" nav link visible in navbar
  - [ ] Videos section with 2 embedded players visible
  - [ ] Pitch video (98s) plays correctly
  - [ ] Architecture video (4min) plays correctly
  - [ ] Footer shows "2025" not "2024"
  - [ ] Cache-busting meta tag present in `<head>`
- **If NOT reflecting:** Make a dummy commit to force rebuild

### 2. a16z Speedrun Application — Field Help Needed
- **URL:** https://speedrun.a16z.com/apply/form
- **Fields user needs help with:**

| Field | Guidance Needed |
|-------|----------------|
| **Relevant experience** | Shubahm's background — what to highlight? |
| **Tell us more about the team** | Team composition, roles, expertise |
| **Pitch your startup in one sentence** | One-line pitch for VedaDB |
| **Startup Description** | 2-3 paragraph description |
| **Pitch Deck (PDF)** | Upload VedaDB_Pitch_Deck.pdf (356KB) |

- **Status:** Fields not filled yet — need Shubahm's input

### 3. NVIDIA Inception Program Application
- **Context:** User asked "nvidia.com ka startup form kase milegaa"
- **Likely URL:** https://www.nvidia.com/en-us/startups/ or https://www.nvidia.com/en-us/deep-learning-ai/startups/
- **Tasks:**
  - [ ] Find exact application URL
  - [ ] Verify URL (HTTP 200)
  - [ ] Extract application fields
  - [ ] Check eligibility criteria (India-based, pre-seed eligible?)
  - [ ] Help fill application

---

## P1 — HIGH PRIORITY

### 4. Expand Investor List — US VCs
- **Context:** Currently only Chinese VCs + tech giants listed
- **Target:** Top 20 US VCs that invest in:
  - Database/infrastructure startups
  - AI/ML tooling
  - Pre-seed/seed stage
  - India-based founders
- **Known targets to verify:**
  - [ ] a16z (speedrun.a16z.com)
  - [ ] Y Combinator (ycombinator.com)
  - [ ] Sequoia Capital (sequoiacap.com)
  - [ ] Lightspeed Venture Partners (lsvp.com)
  - [ ] Accel (accel.com)
  - [ ] Bessemer Venture Partners (bvp.com)
  - [ ] Greylock (greylock.com)
  - [ ] Founders Fund (foundersfund.com)
  - [ ] Benchmark (benchmark.com)
  - [ ] First Round Capital (firstround.com)
- **Deliverable:** US_VCs_VERIFIED.md with exact emails + apply URLs

### 5. Expand Investor List — India VCs
- **Target:** Top 15 India-based VCs
- **Known targets:**
  - [ ] Accel India
  - [ ] Sequoia India (Peak XV)
  - [ ] Lightspeed India
  - [ ] Matrix Partners India
  - [ ] Blume Ventures
  - [ ] Stellaris Venture Partners
  - [ ] Chiratae Ventures
  - [ ] Kalaari Capital
  - [ ] Nexus Venture Partners
  - [ ] India Quotient
  - [ ] Elevation Capital
- **Deliverable:** INDIA_VCs_VERIFIED.md with exact emails + apply URLs

### 6. Oracle for Startups — Correct URL
- **Context:** Previous Oracle venture page was 404
- **Task:** Find correct Oracle startup program URL
- **Likely candidates:**
  - https://www.oracle.com/startup/
  - https://www.oracle.com/cloud/startup/
  - https://developer.oracle.com/startups/
- **Deliverable:** Working URL + application process

### 7. Tech Giant Startup Programs — Verify & Apply
| Company | Program | URL to Verify | Status |
|---------|---------|--------------|--------|
| Google | Google for Startups | https://developers.google.com/startup | Not verified |
| AWS | AWS Activate | https://aws.amazon.com/activate/ | Not verified |
| Microsoft | Microsoft for Startups | https://microsoft.com/startups | Not verified |
| Intel | Intel Ignite | https://www.intel.com/content/www/us/en/corporate/startup.html | Not verified |
| Meta | Meta Accelerator | Unknown URL | Not found |
| Stripe | Stripe Atlas | https://stripe.com/atlas | Not verified |

---

## P2 — MEDIUM PRIORITY

### 8. Pitch Video v8 — Quality Improvements
- **Current:** v7_final (98s, slow voiceover, clean text)
- **Issues reported by user:**
  - Text overlap in earlier versions (v4-v6)
  - Voice too fast initially (chipmunk effect)
- **Potential v8 improvements:**
  - [ ] Even slower text transitions (fade in/out)
  - [ ] Higher resolution (1080p instead of 720p)
  - [ ] Better font rendering (anti-aliased)
  - [ ] Background music (subtle)
  - [ ] Scene transitions (dissolve instead of cut)
- **File:** `/mnt/agents/output/vedadb-video/vedadb_pitch_v7_final.mp4`

### 9. Architecture Video v4 — Enhancement
- **Current:** v3 (235s, 6.1MB, 7 engines, proper closing tagline)
- **Issues reported:**
  - Closing tagline missing initially (fixed in v3)
  - Voice lacking / too basic
- **Potential v4 improvements:**
  - [ ] Professional voiceover (higher quality TTS)
  - [ ] Background ambient music
  - [ ] Code snippets overlay (actual bridge.go, cache code)
  - [ ] Diagram annotations (arrows, highlights)
  - [ ] Performance metrics overlay (950K QPS, 12ms p99)
- **File:** `/mnt/agents/output/vedadb-architecture-v3/vedadb_architecture_v3.mp4`

### 10. Code Push to Master — All Repos
- **Repos to verify/push:**
  - [x] vedadb-website (pushed via API — commits b51a66d7, 4820acf8, 587efab8)
  - [ ] vedadb-server — ensure latest on master
  - [ ] vedadb-workbench — ensure latest on master
  - [ ] vedadb-driver — ensure latest on master
  - [ ] vedadb-docs — ensure latest on master
  - [ ] vedadb-installers — ensure latest on master
  - [ ] vedadb-sales-kit — push investor lists

### 11. Pitch Deck PDF Update
- **Current:** VedaDB_Pitch_Deck.pdf (11 slides, 356KB)
- **Potential updates:**
  - [ ] Add architecture video QR code/link
  - [ ] Add pitch video QR code/link
  - [ ] Update investor list (after verification)
  - [ ] Add PageIndex integration slide (if applicable)

---

## P3 — FUTURE / NICE TO HAVE

### 12. PageIndex Integration for VedaDB Document Engine
- **Analysis Status:** COMPLETE (see analysis below)
- **Concept:** Use PageIndex's tree-structured reasoning instead of vector similarity for document queries
- **Use cases:**
  - SEC filings, annual reports stored in Document engine
  - Tree-indexed navigation over long documents
  - 98.7% accuracy on FinanceBench benchmark
- **Integration points:**
  - `internal/engine/document/` — add tree builder
  - `internal/engine/embeddings/` — complement chunker with tree index
  - `internal/optimizer/nl_query.go` — reasoning-based NL2SQL
- **Decision:** NOT implementing now — analysis complete for future use

### 13. Documentation Website (vedadb-docs)
- **Current:** Empty directory at `/mnt/agents/output/vedadb-project/vedadb-docs/`
- **Needed:**
  - API reference docs
  - SDK tutorials
  - Architecture diagrams
  - Deployment guides
  - Configuration reference
- **Tech:** Docusaurus or MkDocs

### 14. CI/CD Pipeline
- **Current:** Manual push via GitHub API
- **Needed:**
  - GitHub Actions for auto-deploy to Pages
  - Video compression pipeline
  - Automated link checking
  - Investor URL verification cron job

### 15. Analytics & Tracking
- **Current:** No analytics on website
- **Needed:**
  - Google Analytics or Plausible
  - Video play tracking
  - Investor outreach tracking (email opens)
  - GitHub star/download tracking

---

## COMPLETED TASKS (Reference)

| Task | Date | Commit/Output |
|------|------|---------------|
| Website creation | 2026-05-13 | tiennesdm.github.io/vedadb-website |
| Pitch deck PDF | 2026-05-14 | VedaDB_Pitch_Deck.pdf (11 slides) |
| Pitch video v7 | 2026-05-16 | vedadb_pitch_v7_final.mp4 (98s) |
| Architecture video v3 | 2026-05-16 | vedadb_architecture_v3.mp4 (235s) |
| Chinese investor verification | 2026-05-16 | VERIFIED_INVESTORS_FINAL.md |
| Website video section | 2026-05-16 | Commits b51a66d7, 4820acf8, 587efab8 |
| PageIndex concept analysis | 2026-05-16 | Explained — not implementing |

---

## FILE LOCATIONS REFERENCE

| Output | Path | Size |
|--------|------|------|
| Website | `/mnt/agents/output/vedadb-project/vedadb-website/` | ~31MB |
| Pitch Deck | `/mnt/agents/output/vedadb-project/vedadb-sales-kit/` | 356KB |
| Pitch Video | `/mnt/agents/output/vedadb-video/vedadb_pitch_v7_final.mp4` | 3.2MB |
| Architecture Video | `/mnt/agents/output/vedadb-architecture-v3/vedadb_architecture_v3.mp4` | 6.1MB |
| Investors (Chinese) | `/mnt/agents/output/vedadb-project/vedadb-sales-kit/VERIFIED_INVESTORS_FINAL.md` | 5KB |
| Server Code | `/mnt/agents/output/vedadb-project/vedadb-server/` | 2,452 files |
| This File | `/mnt/agents/output/vedadb-project/PENDING_TASKS.md` | — |

---

## NEXT SESSION CHECKLIST

When starting a new session, check this file and pick highest priority open task:

1. [ ] Read this file (PENDING_TASKS.md)
2. [ ] Check P0 items — is anything blocked on Shubahm's input?
3. [ ] Pick one P0 or P1 task and execute
4. [ ] Update this file with progress after completing tasks
5. [ ] Push updated PENDING_TASKS.md to master so it persists

---

*Agent: This file is your memory. Update it after every task completion.*
*Format: `[x] Task name — date completed — commit/output`*
