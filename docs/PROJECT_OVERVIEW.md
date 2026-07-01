# Tactly Project Overview

## What is Tactly?

Tactly is an **AI-powered communication assistant** that helps you write better messages. It offers:

- **Smart Message Rewriting** — AI suggests rewrites based on tone and intent
- **Tone Customization** — 5+ personas (Professional, Casual, Friendly, Formal, Humorous)
- **Language Support** — Hinglish, English, Hindi (with Romanization)
- **Multi-Platform** — Web interface and Chrome extension
- **Privacy-First** — No message storage, Plausible analytics only

### The Problem We Solve

People struggle with:
- ❌ Sounding too formal or too casual
- ❌ Losing important information in rewrites
- ❌ Writing in multiple languages (mixing English + Hindi)
- ❌ Spending time perfecting messages

### Our Solution

Tactly uses AI to:
- ✅ Rewrite messages in your preferred tone
- ✅ Preserve meaning while changing voice
- ✅ Support Hinglish (English + Hindi mixing)
- ✅ Provide instant, personalized suggestions

---

## Current Status

| Aspect | Status |
|--------|--------|
| **Launch** | ✅ Live in production |
| **URL** | https://tactly.ai |
| **Repository** | https://github.com/mr-rishuraj/tactly |
| **Hosting** | Vercel (auto-deploy from main branch) |
| **Database** | Supabase (PostgreSQL, RLS enabled) |
| **Security Grade** | A (Excellent) |

---

## Core Features

### 1. Message Rewriting Engine
- Takes input message + tone + context
- Uses Google Gemini API for AI suggestions
- Returns rewritten message instantly
- No data storage (privacy-first)

### 2. Tone Engine
Supports multiple personas:
- **Professional** — Formal, business-appropriate
- **Casual** — Relaxed, friendly tone
- **Friendly** — Warm, approachable
- **Formal** — Very formal, official
- **Humorous** — Witty, funny tone

### 3. Language Support
- **English** — Native support
- **Hinglish** — English + Hindi mixing (romanized)
- **Hindi** — Full Hindi support (Devanagari script)

### 4. Platform Integration
- **Web App** — Landing page showcase
- **Chrome Extension** — In-app message rewriting
  - Works in Gmail, LinkedIn, Twitter, Slack, etc.
  - Popup UI with settings
  - No content script overhead

---

## Technology Stack

### Frontend
- **Framework** — Next.js 16.2.7 (App Router)
- **UI Library** — React 19
- **Language** — TypeScript 5
- **Styling** — TailwindCSS v4 + Framer Motion
- **State** — Context API (minimal)
- **Components** — Custom + shadcn/ui

### Backend
- **Runtime** — Node.js (Vercel Functions)
- **Database** — Supabase (PostgreSQL)
- **Email** — Resend API
- **AI** — Google Gemini 2.5 Flash
- **Authentication** — Row-Level Security (RLS)

### Infrastructure
- **Hosting** — Vercel (auto-scaling)
- **CDN** — Vercel Edge Network
- **Analytics** — Plausible (privacy-friendly)
- **Version Control** — GitHub

### Extension
- **Bundler** — Vite 6
- **Framework** — React 19
- **Manifest** — V3 (modern Chrome extension)
- **State** — Zustand 5

---

## Project Structure

```
tactly/                          # Main Next.js app
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── waitlist/       # Join waitlist endpoint
│   │   │   ├── contact/        # Contact form endpoint
│   │   │   └── rewrite/        # Extension AI endpoint
│   │   ├── privacy/            # Privacy policy page
│   │   ├── about/              # About page
│   │   ├── layout.tsx          # Global layout + Plausible
│   │   ├── page.tsx            # Main landing page
│   │   └── globals.css         # Global styles (OKLCH)
│   ├── components/             # React components (~18 files)
│   │   ├── navbar.tsx
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   ├── hinglish-showcase.tsx
│   │   ├── tone-engine.tsx
│   │   ├── comparison.tsx
│   │   ├── faq.tsx
│   │   ├── footer.tsx
│   │   └── [more sections]
│   ├── lib/
│   │   ├── prompts.ts          # AI prompt templates
│   │   ├── rewrite-types.ts    # Shared types
│   │   └── utils.ts
│   └── contexts/
│       ├── waitlist-context.tsx
│       └── contact-context.tsx
├── public/                     # Static assets
│   ├── logo.png
│   ├── og-image.png
│   └── favicon.ico
├── docs/                       # Documentation (this folder)
├── .backup/                    # Backup of removed components
├── package.json
├── next.config.ts
├── tsconfig.json
└── tailwind.config.ts

tactly-extension/              # Separate Vite project
├── src/
│   ├── popup/                 # Popup UI
│   ├── content/               # Content scripts
│   └── types/
├── dist/                      # Build output
└── manifest.json
```

---

## Database Schema

### Waitlist Table
```sql
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  persona TEXT,
  use_case TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**RLS Policy**: Public can INSERT, only authenticated users can SELECT.

### Contacts Table
```sql
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  message TEXT,
  type TEXT DEFAULT 'general',
  created_at TIMESTAMP DEFAULT NOW()
);
```

**RLS Policy**: Public can INSERT for form submissions.

---

## API Endpoints

### `POST /api/waitlist`
Join the waitlist.
```json
{
  "email": "user@example.com",
  "persona": "Professional",
  "useCase": "Gmail"
}
```

### `POST /api/contact`
Send a contact message.
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here",
  "type": "feedback"
}
```

### `POST /api/rewrite`
Rewrite a message (Extension API).
```json
{
  "message": "Hey, can you send that file?",
  "tone": "Professional",
  "goal": "Request",
  "platform": "Email"
}
```
Returns: Rewritten message via Server-Sent Events (SSE).

---

## Deployment

### Current Deployment
- **Production** → https://tactly.ai
- **Platform** → Vercel
- **Auto-Deploy** → From `main` branch on GitHub

### Deploy Process
1. Push to `main` branch
2. Vercel automatically builds and deploys
3. Preview URLs generated for PRs
4. Rollback available in Vercel dashboard

---

## Key Design Decisions

### Why Next.js?
- Built-in API routes
- Server/Client Components
- SEO optimization (critical for landing page)
- Vercel integration

### Why Supabase?
- PostgreSQL reliability
- Row-Level Security (no backend auth needed)
- Real-time updates (future feature)
- Free tier suitable for MVP

### Why Gemini API?
- Free tier covers MVP
- Good quality rewrites
- Fast inference (important for UX)
- Easy to switch providers later

### Why Extension is Separate?
- Different build system (Vite vs Next.js)
- Cleaner separation of concerns
- Easier to maintain and test
- Independent deployment schedule

### Why No User Accounts?
- MVP focuses on core feature (rewriting)
- Reduces complexity and privacy concerns
- Waitlist for future features
- Future: Optional sign-in for advanced features

---

## Security & Privacy

### Privacy First
- ❌ No message storage
- ❌ No user tracking (Plausible only)
- ✅ HTTPS only
- ✅ No cookies
- ✅ GDPR compliant

### Security Measures
- Row-Level Security (RLS) on database
- API key validation
- CORS properly configured
- No SQL injection vulnerabilities
- Environment variables in Vercel

### Security Grade
**A (Excellent)** — Verified via security audit.

---

## Analytics

### Plausible Integration
- Privacy-friendly analytics (no cookies)
- Real-time dashboard at plausible.io
- Tracks: Page views, button clicks, form submissions
- Complies with GDPR/CCPA

### Key Metrics to Monitor
- Waitlist signups (top of funnel)
- Page views by section
- Extension downloads (future)
- User engagement metrics

---

## Roadmap (Future)

| Phase | Timeline | Features |
|-------|----------|----------|
| **Phase 1** | ✅ Done | MVP landing page + extension |
| **Phase 2** | Q3 2026 | Advanced tone tuning, more languages |
| **Phase 3** | Q4 2026 | User accounts, saved messages |
| **Phase 4** | 2027 | Mobile app, API for partners |

---

## Team & Contact

- **Maintainer** — Rishu Raj (@mr-rishuraj)
- **Email** — usetactly.ai@gmail.com
- **LinkedIn** — https://www.linkedin.com/company/tactly/
- **GitHub** — https://github.com/mr-rishuraj/tactly

---

## Important Files to Know

| File | Purpose | Edit? |
|------|---------|-------|
| `src/app/page.tsx` | Main landing page | Frequently |
| `src/components/` | UI components | Frequently |
| `src/app/api/` | Backend routes | When adding features |
| `src/lib/prompts.ts` | AI prompt templates | When tuning AI |
| `.env.local` | Environment config | Setup only |
| `tailwind.config.ts` | Design system | Rarely |
| `next.config.ts` | Next.js config | Rarely |

---

**For more details, see the other documentation files or check [README.md](./README.md).**
