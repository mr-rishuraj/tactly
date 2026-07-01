# Tactly Architecture

A deep dive into how Tactly is built and how components work together.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User's Browser                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────┐      ┌───────────────────────┐   │
│  │  Landing Page        │      │  Chrome Extension     │   │
│  │  (Next.js at :3000)  │      │  (Popup UI)           │   │
│  │                      │      │                       │   │
│  │ ├─ Navbar           │      │ ├─ Popup component    │   │
│  │ ├─ Hero             │      │ ├─ Tone selector      │   │
│  │ ├─ Features         │      │ ├─ Goal selector      │   │
│  │ ├─ FAQ              │      │ └─ Rewrite button     │   │
│  │ └─ Waitlist modal   │      │                       │   │
│  └──────────────────────┘      └───────────────────────┘   │
│           │                              │                  │
│           └──────────────┬───────────────┘                  │
│                          │                                  │
└──────────────────────────┼──────────────────────────────────┘
                           │ HTTPS
        ┌──────────────────┴──────────────────┐
        │                                     │
        ▼                                     ▼
┌─────────────────────────┐         ┌──────────────────────┐
│   Vercel Edge Network   │         │  External Services   │
│  (CDN + Lambda)         │         │                      │
└─────────────────────────┘         │ ├─ Gemini API        │
        │                           │ ├─ Resend Email      │
        │ Vercel Functions          │ └─ Google Fonts      │
        │ (Node.js)                 │                      │
        │                           └──────────────────────┘
        ▼
┌─────────────────────────────────────────────────┐
│          Next.js Backend (API Routes)            │
│                                                  │
│ ├─ /api/waitlist   (POST)                       │
│ ├─ /api/contact    (POST)                       │
│ └─ /api/rewrite    (POST, streaming SSE)        │
│                                                  │
│ Functions:                                       │
│ ├─ Parse request                                │
│ ├─ Validate API key (for /api/rewrite)         │
│ ├─ Call Gemini API for AI rewrite              │
│ ├─ Stream response to client                    │
│ └─ Log to database                              │
└─────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────┐
│          Supabase (PostgreSQL)                   │
│                                                  │
│ ├─ waitlist table                               │
│ ├─ contacts table                               │
│ ├─ Row-Level Security (RLS)                     │
│ └─ Real-time capabilities                       │
└─────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────┐
│      Analytics (Plausible)                      │
│  - Page views                                   │
│  - User interactions                            │
│  - Privacy-friendly (no cookies)                │
└─────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Next.js App Router Structure

```
src/app/
├── layout.tsx           # Global layout (Plausible script)
├── page.tsx             # Main landing page
├── globals.css          # Global styles + design tokens
├── privacy/
│   └── page.tsx         # Privacy policy
├── about/
│   └── page.tsx         # About page (future)
└── api/
    ├── waitlist/
    │   └── route.ts     # POST /api/waitlist
    ├── contact/
    │   └── route.ts     # POST /api/contact
    └── rewrite/
        └── route.ts     # POST /api/rewrite (Extension)
```

### React Component Tree

```
Home (page.tsx)
├── Navbar
│   ├── Logo
│   ├── Nav Links
│   └── Mobile Menu
├── Hero
│   ├── Headline
│   ├── CTA Button
│   └── Animation
├── Problem
│   └── Comparison Cards
├── WhyTactly
│   └── Feature Cards
├── Features
│   └── 6 Feature Cards
├── HinglishShowcase
│   └── Interactive Demo
├── ToneEngine
│   └── 5 Tone Examples
├── Comparison
│   └── Competitor Table
├── CommunicationIntelligence
│   └── Stats + Value Props
├── FutureVision
│   └── Roadmap
├── FAQ
│   └── Accordion Items
├── WaitlistModal        # Portal
│   └── Form
├── ContactModal         # Portal
│   └── Form
└── Footer
    ├── Links
    └── Social Icons
```

### Component Organization

```
src/components/
├── navbar.tsx
├── hero.tsx
├── problem.tsx
├── why-tactly.tsx
├── features.tsx
├── hinglish-showcase.tsx
├── tone-engine.tsx
├── comparison.tsx
├── communication-intelligence.tsx
├── future-vision.tsx
├── testimonials.tsx
├── faq.tsx
├── footer.tsx
├── waitlist-modal.tsx
├── contact-modal.tsx
└── [other smaller components]
```

### State Management

**Minimal approach** — Context API only:

```tsx
// src/contexts/waitlist-context.tsx
export function WaitlistProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <WaitlistContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </WaitlistContext.Provider>
  );
}

// Usage
function Navbar() {
  const { setIsOpen } = useContext(WaitlistContext);
  return <button onClick={() => setIsOpen(true)}>Join Waitlist</button>;
}
```

---

## Backend Architecture

### API Routes

#### `POST /api/waitlist`
**Purpose**: Add user to waitlist.

**Request**:
```json
{
  "email": "user@example.com",
  "persona": "Professional",
  "useCase": "Gmail"
}
```

**Process**:
1. Validate email format
2. Check if email already exists (Supabase)
3. Insert to `waitlist` table
4. Send confirmation email (Resend)
5. Return success

**Response**:
```json
{
  "success": true,
  "message": "Confirmation email sent"
}
```

#### `POST /api/contact`
**Purpose**: Handle contact form submissions.

**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I have a question...",
  "type": "feedback"
}
```

**Process**:
1. Validate inputs
2. Insert to `contacts` table (Supabase)
3. Send notification email to admin
4. Return success

#### `POST /api/rewrite` (Extension Only)
**Purpose**: Rewrite message using AI.

**Auth**: Requires `X-Tactly-Secret` header (matches `TACTLY_EXTENSION_SECRET`).

**Request**:
```json
{
  "message": "Hey, can you send that file?",
  "tone": "Professional",
  "goal": "Request",
  "platform": "Email"
}
```

**Process**:
1. Validate API secret
2. Build prompt using `lib/prompts.ts`
3. Call Gemini API (streaming)
4. Stream response to client (Server-Sent Events)
5. No logging (privacy-first)

**Response**: Server-Sent Events stream
```
data: "Hey, could you please"
data: " send that file?"
data: "\n[DONE]"
```

---

## Database Schema

### Waitlist Table
```sql
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  persona TEXT,           -- Professional, Casual, etc.
  use_case TEXT,          -- Gmail, LinkedIn, Slack, etc.
  created_at TIMESTAMP DEFAULT NOW()
);

-- RLS Policy
CREATE POLICY "Public can insert" 
  ON waitlist FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Only authenticated can view" 
  ON waitlist FOR SELECT 
  USING (auth.role() = 'authenticated');
```

### Contacts Table
```sql
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  message TEXT,
  type TEXT DEFAULT 'general',  -- feedback, support, partnership, etc.
  created_at TIMESTAMP DEFAULT NOW()
);

-- RLS Policy
CREATE POLICY "Public can insert" 
  ON contacts FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Only authenticated can view" 
  ON contacts FOR SELECT 
  USING (auth.role() = 'authenticated');
```

---

## AI Prompt Architecture

### Prompt Builder (`src/lib/prompts.ts`)

```typescript
export function buildRewritePrompt(
  message: string,
  tone: Tone,
  goal: Goal,
  platform: Platform
): string {
  return `
You are a communication expert. Your task is to rewrite the following message.

Original message: "${message}"
Tone: ${tone}        // Professional, Casual, Friendly, Formal, Humorous
Goal: ${goal}        // Request, Inform, Persuade, Apologize, Thank
Platform: ${platform} // Email, LinkedIn, Slack, Twitter, etc.

Requirements:
1. Keep the core meaning
2. Match the requested tone
3. Be concise
4. Be appropriate for the platform

Rewrite:`;
}
```

### Why This Approach?
- **Prompt templating** makes it easy to adjust AI behavior
- **Goal/Tone/Platform context** improves quality
- **Shared types** (`rewrite-types.ts`) keep extension + backend in sync

---

## Styling Architecture

### Design System (TailwindCSS v4)

**Color Scheme** — OKLCH (modern, perceptually uniform):

```css
/* src/app/globals.css */
:root {
  --color-primary-50: oklch(98% 0.01 270);
  --color-primary-900: oklch(15% 0.08 270);
  /* ... other colors ... */
}
```

**Spacing Scale**:
- Mobile: `py-16` (64px)
- Tablet: `md:py-24` (96px)
- Desktop: `lg:py-32` (128px)

**Typography**:
- **Headings**: Plus Jakarta Sans (bold, 700 weight)
- **Body**: Inter (regular, 400 weight)

### Responsive Breakpoints

```
Default (mobile)    < 640px
md: (tablet)        640px - 1024px
lg: (desktop)       1024px - 1280px
xl: (large desktop) 1280px+
```

---

## Animation Strategy

### Framer Motion Usage

**Scroll Reveals**:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

**Staggered Children**:
```tsx
<motion.div variants={containerVariants}>
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

**Performance**: All animations use GPU-accelerated properties (`transform`, `opacity`).

---

## Extension Architecture

### Separate Project Structure

The Chrome extension lives in a sibling directory (`../tactly-extension/`) to:
- Use different build system (Vite, not Next.js)
- Avoid conflicts with Next.js build
- Cleaner separation of concerns
- Independent release cycles

### Extension Components

```
tactly-extension/
├── manifest.json         # Extension metadata
├── src/
│   ├── popup/
│   │   ├── Popup.tsx    # Main UI
│   │   └── style.css
│   ├── content/
│   │   ├── content.ts   # Message extraction/insertion
│   │   └── types.ts
│   ├── background/
│   │   └── background.ts  # Background worker (if needed)
│   └── types/
│       └── index.ts     # Shared types
└── dist/               # Build output
```

### Extension API Call Flow

```
User clicks "Rewrite" in popup
    ↓
Popup sends message to /api/rewrite
    ↓
Backend receives with X-Tactly-Secret header
    ↓
Validates secret matches TACTLY_EXTENSION_SECRET
    ↓
Builds prompt and calls Gemini API
    ↓
Streams response back to extension
    ↓
Extension displays rewritten message in popup
```

---

## Deployment Pipeline

### Local Development
```
npm run dev
├─ Next.js dev server (:3000)
├─ Hot Module Reload (HMR)
└─ Plausible in dev mode (non-blocking)
```

### Build Process
```
npm run build
├─ TypeScript compilation
├─ Next.js static optimization
├─ CSS minification
├─ Bundle analysis
└─ Creates .next/ output
```

### Production Deployment
```
Vercel (auto-deploy from main branch)
├─ Builds on Vercel infrastructure
├─ Runs build command from vercel.json
├─ Deploys to Edge Network
├─ Auto-rollback on failure
└─ Instant preview URLs for PRs
```

### Environment Variables
```
Development (.env.local)
  └─ Local API keys
  
Production (Vercel Dashboard)
  ├─ NEXT_PUBLIC_SUPABASE_URL
  ├─ NEXT_PUBLIC_SUPABASE_ANON_KEY
  ├─ SUPABASE_SERVICE_ROLE_KEY
  ├─ RESEND_API_KEY
  ├─ GEMINI_API_KEY
  └─ TACTLY_EXTENSION_SECRET
```

---

## Security Architecture

### API Security
- **CORS** — Configured to allow extension origin
- **Secret Validation** — Extension API checks `X-Tactly-Secret` header
- **Rate Limiting** — Vercel built-in (future: custom rate limiting)
- **Input Validation** — All endpoints validate request format

### Database Security
- **Row-Level Security (RLS)** — Public INSERT only, admin SELECT
- **Connection** — HTTPS only, Supabase managed
- **No sensitive data** — No passwords, tokens, or user secrets
- **Backups** — Automatic Supabase backups

### Privacy
- **No message storage** — Rewrite requests not logged
- **No user tracking** — Plausible has no cookies
- **HTTPS only** — All connections encrypted
- **No third-party scripts** — Only Plausible and Gemini API

---

## File Organization Principles

### Naming Conventions

**Components** — PascalCase, descriptive:
```
Hero.tsx → export function Hero() { }
WaitlistModal.tsx → export function WaitlistModal() { }
```

**Functions** — camelCase, verb-based:
```
buildRewritePrompt() → builds a prompt
validateEmail() → validates an email
```

**Files** — kebab-case for non-components:
```
rewrite-types.ts    → Types for rewriting
rewrite-prompts.ts  → Prompt templates
waitlist-context.tsx → Context provider
```

### Import Organization
```typescript
// 1. External imports
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// 2. Internal imports
import { Layout } from '@/components/layout';
import { buildPrompt } from '@/lib/prompts';

// 3. Type imports
import type { Message } from '@/lib/types';
```

---

## Performance Considerations

### Optimization Techniques

1. **Image Optimization** — Next.js `Image` component
2. **Code Splitting** — Dynamic imports for heavy components
3. **CSS Modules** — Scoped styles, smaller CSS bundle
4. **Font Optimization** — Only load used weights/subsets
5. **Lazy Loading** — Animations only run in viewport

### Monitoring
- **Vercel Analytics** — Core Web Vitals
- **Lighthouse Score** — Automated via CI
- **Bundle Size** — Tracked via `analyze` script

---

## Scaling Considerations

### Current Capacity
- ✅ Handles thousands of waitlist signups
- ✅ Database suitable for 100K+ records
- ✅ Vercel auto-scales for traffic spikes
- ✅ Gemini API suitable for MVP usage

### Future Scaling
- Add rate limiting if abuse occurs
- Implement caching for popular rewrites
- Consider database read replicas
- Add webhook system for real-time events

---

**For implementation details, check specific files or other documentation guides.**
