# TACTLY — Communication Intelligence Copilot
## Project Context & Development Summary

---

## PROJECT OVERVIEW

**Project Name**: TACTLY
**Tagline**: "Write with tact. Everywhere."
**Category**: AI Communication Copilot
**Status**: Landing Page + Chrome Extension V1 (both in production)
**Live URL**: https://tactly-ai.vercel.app
**GitHub**: mr-rishuraj/tactly

### What is TACTLY?

Not a grammar checker, not a ChatGPT wrapper, not a Grammarly clone.

TACTLY is a **Communication Intelligence** layer on top of any platform. It doesn't just fix words — it rewrites messages so they achieve better outcomes: more replies, better impressions, stronger relationships.

Works across: LinkedIn, Gmail, WhatsApp Web, X/Twitter, and any text field on the internet via the Chrome extension.

---

## WHAT'S LIVE TODAY

| Layer | Status | Description |
|-------|--------|-------------|
| Landing page | Production | Full 15-section marketing site at tactly-ai.vercel.app |
| Waitlist system | Production | Supabase-backed email capture with Resend confirmation |
| Contact form | Production | Supabase-backed support form |
| Rewrite API | Production | `/api/rewrite` — Gemini 2.5 Flash, streaming SSE |
| Chrome Extension V1 | Built, local | Popup with rewrite + insert, platform detection, auto-fill |

---

## TECH STACK

### Landing Page + API Backend
- **Framework**: Next.js 15 App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS (OKLCH color scheme)
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Fonts**: Space Grotesk (branding) + Geist (body)
- **Database/Auth**: Supabase (PostgreSQL + RLS policies)
- **Email**: Resend (confirmation emails on waitlist signup)
- **AI Provider**: Google Gemini 2.5 Flash (`@google/genai` v2.8.0)
- **Deployment**: Vercel

### Chrome Extension (separate repo: `tactly-extension/`)
- **Build**: Vite 6 + `vite-plugin-web-extension`
- **UI**: React 19 + TailwindCSS 4
- **State**: Zustand 5
- **Types**: TypeScript
- **Extension spec**: Chrome Manifest V3

---

## PROJECT STRUCTURE

```
tactly/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout with WaitlistProvider, ContactProvider
│   │   ├── page.tsx                      # Main landing page (all sections)
│   │   ├── globals.css                   # Global styles, typography, spacing
│   │   ├── api/
│   │   │   ├── waitlist/route.ts         # POST — email + persona + use_case → Supabase
│   │   │   ├── contact/route.ts          # POST — name + email + type + message → Supabase
│   │   │   └── rewrite/route.ts          # POST — message + goal + tone + platform → Gemini SSE
│   │   ├── privacy/page.tsx
│   │   └── about/page.tsx
│   ├── components/
│   │   ├── navbar.tsx
│   │   ├── hero.tsx
│   │   ├── problem.tsx
│   │   ├── why-tactly.tsx
│   │   ├── features.tsx
│   │   ├── hinglish-showcase.tsx
│   │   ├── tone-engine.tsx
│   │   ├── comparison.tsx
│   │   ├── communication-intelligence.tsx
│   │   ├── future-vision.tsx
│   │   ├── testimonials.tsx
│   │   ├── faq.tsx
│   │   ├── footer.tsx
│   │   ├── waitlist-modal.tsx
│   │   ├── waitlist-modal-container.tsx
│   │   ├── contact-modal.tsx
│   │   ├── contact-modal-container.tsx
│   │   └── ui/button.tsx
│   ├── contexts/
│   │   ├── waitlist-context.tsx
│   │   └── contact-context.tsx
│   └── lib/
│       ├── utils.ts
│       └── prompts.ts                    # buildPrompt() — system + user prompts per goal/tone/platform
├── PROJECT_CONTEXT.md
├── EXTENSION_CONTEXT.md                  # See tactly-extension/PROJECT_CONTEXT.md instead
├── FUTURE_ROADMAP.md
└── README.md
```

---

## THE REWRITE API (`/api/rewrite`)

This is the core AI endpoint consumed by the Chrome extension.

### Request
```
POST /api/rewrite
Headers:
  Content-Type: application/json
  X-Tactly-Secret: <shared secret>

Body:
{
  "message": "hey wanted to connect",
  "context": "optional additional context",
  "goal": "network" | "reply" | "pitch" | "follow_up" | "outreach",
  "tone": "professional" | "casual" | "confident" | "friendly" | "direct",
  "platform": "linkedin" | "gmail" | "x" | "whatsapp" | "unknown"
}
```

### Response
Server-Sent Events (SSE) stream, OpenAI-compatible format:
```
data: {"choices":[{"delta":{"content":"token"},"index":0}]}
data: [DONE]
```

### Implementation
- Uses `@google/genai` SDK with `gemini-2.5-flash` model
- `buildPrompt()` in `src/lib/prompts.ts` generates platform/goal/tone-specific system + user prompts
- Shared secret verified via `X-Tactly-Secret` header (env: `TACTLY_EXTENSION_SECRET`)
- CORS headers: `Access-Control-Allow-Origin: *` (required for extension context)
- Wraps Gemini chunks in OpenAI SSE format so the extension parser doesn't need to know the AI provider

### Environment Variables
```
GEMINI_API_KEY=...
TACTLY_EXTENSION_SECRET=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=...
```

---

## DESIGN SYSTEM

**Inspired by**: Linear, Stripe, Vercel, Arc Browser, Raycast

**Color Scheme**:
- Dark mode, OKLCH color system
- Primary gradient: `from-cyan-500 to-blue-500` (used on brand elements, buttons, CTAs)
- Logo: gradient box (`from-cyan-500 to-blue-500`) with white bold "T", rounded-lg

**Typography**:
- Brand/headings: Space Grotesk
- Body: Geist Sans
- Font weights: 400 (body), 600 (sub), 700 (heading), 800 (prominent)

---

## LANDING PAGE SECTIONS (15 total)

1. Navbar — sticky, responsive, branded logo
2. Hero — before/after transformation demo
3. Problem — 7-step vs 3-step workflow visualization
4. Why Tactly — new category comparison cards
5. Features — 6 interactive cards (1→2→3 col grid)
6. Hinglish Showcase — native Hinglish autocomplete demo
7. Tone Engine — 5 persona switcher
8. Comparison Table — vs Grammarly, ChatGPT, Compose AI
9. Communication Intelligence — "Grammar is a feature. Communication is the goal."
10. Future Vision — roadmap (Today / Tomorrow / Future)
11. Testimonials — responsive marquee
12. FAQ — 8 questions accordion + Contact CTA
13. Footer — nav + socials + branded logo
14. Waitlist Modal — Supabase-backed email capture
15. Contact Modal — Supabase-backed support form

---

## PRODUCTION SYSTEMS

### Waitlist (`waitlist` table in Supabase)
- Fields: `id`, `email` (UNIQUE), `persona`, `use_case`, `created_at`
- API: POST `/api/waitlist` — validates, inserts, sends Resend confirmation email
- Returns 409 on duplicate email

### Contact Form (`contacts` table in Supabase)
- Fields: `id`, `name`, `email`, `message`, `type` (bug/info), `created_at`
- API: POST `/api/contact` — validates message length (10–5000 chars), inserts

### RLS Policies
- Anonymous users can insert into both tables
- No updates/deletes from frontend

---

## RESPONSIVENESS

Fully responsive, tested across:
320px / 375px / 390px / 768px / 1024px / 1280px / 1440px / 1920px

Key patterns:
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` on feature grid
- Comparison table: `overflow-x-auto` on mobile
- Touch targets: min 44px height on all interactive elements
- All animations GPU-accelerated (Framer Motion `whileInView`)

---

## CHROME EXTENSION

See `tactly-extension/PROJECT_CONTEXT.md` for full extension context.

The extension calls `/api/rewrite` on this server. The shared secret must match between:
- `TACTLY_EXTENSION_SECRET` env var here (Vercel)
- `VITE_API_SECRET` in `tactly-extension/.env`

---

## KEY FILES

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout, providers, metadata |
| `src/app/globals.css` | Global styles, OKLCH variables |
| `src/app/page.tsx` | Landing page (imports all sections) |
| `src/app/api/rewrite/route.ts` | AI rewrite API — Gemini SSE |
| `src/app/api/waitlist/route.ts` | Waitlist endpoint |
| `src/app/api/contact/route.ts` | Contact form endpoint |
| `src/lib/prompts.ts` | Prompt builder for goal/tone/platform |
| `src/components/hero.tsx` | Before/after demo |
| `src/components/comparison.tsx` | Competitor comparison table |
| `src/components/tone-engine.tsx` | Interactive tone switcher |

---

## RECENT UPDATES (June 2026)

- Built and shipped Chrome Extension V1 (popup rewrite + insert into page)
- Added `/api/rewrite` endpoint with Gemini 2.5 Flash + SSE streaming
- Added `src/lib/prompts.ts` with platform-aware prompt builder
- Fixed contact modal duplicate provider bug
- Updated footer logo to match navbar style
- Responsiveness audit and improvements across all breakpoints

---

## DEPLOYMENT

**Hosting**: Vercel
**Live URL**: https://tactly-ai.vercel.app
**Build**: `npm run build` (Next.js static + SSR)
**CI**: Auto-deploys on push to `main`
