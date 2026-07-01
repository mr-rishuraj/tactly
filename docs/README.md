# Tactly Documentation

Welcome to Tactly! This folder contains everything you need to understand and work on the Tactly project.

## 🚀 Quick Navigation

### For New Team Members
Start here to get up and running quickly:
1. **[Getting Started](./GETTING_STARTED.md)** — Clone, install, set up environment
2. **[Project Overview](./PROJECT_OVERVIEW.md)** — What is Tactly? Vision & status
3. **[Architecture](./ARCHITECTURE.md)** — Tech stack, system design, file structure

### Understanding the Product
Learn how Tactly works and what it does:
1. **[Features](./FEATURES.md)** — Detailed feature documentation
2. **[User Flows](./USER_FLOWS.md)** — User journeys and interactions
3. **[API Guide](./API_GUIDE.md)** — Backend endpoints and usage

### Development & Operations
Work on specific areas:
1. **[Extension Guide](./EXTENSION_GUIDE.md)** — Chrome extension development
2. **[Database](./DATABASE.md)** — Database schema and management
3. **[Deployment](./DEPLOYMENT.md)** — How to deploy to production
4. **[Contributing](./CONTRIBUTING.md)** — Code standards and workflow

### Essential Information
Important policies and procedures:
1. **[Privacy & Security](./PRIVACY_SECURITY.md)** — Privacy policies and security practices
2. **[Troubleshooting](./TROUBLESHOOTING.md)** — Common issues and solutions

---

## 📋 Project at a Glance

| Aspect | Details |
|--------|---------|
| **What** | AI-powered communication tool with tone customization and language support |
| **Status** | Production-ready & live at https://tactly.ai |
| **Repository** | https://github.com/mr-rishuraj/tactly |
| **Tech Stack** | Next.js 16, React, TypeScript, TailwindCSS, Supabase, Vercel |
| **Key Features** | Message rewriting, Hinglish support, tone engine, communication intelligence |
| **Components** | Landing page + Chrome extension |

---

## 🎯 Core Concepts

### Tactly's Mission
Help people communicate better by providing AI-powered suggestions, tone customization, and multi-language support.

### Key Features
- **Message Rewriting** — AI rewrites messages based on tone and goal
- **Tone Engine** — 5+ personas (Professional, Casual, Friendly, Formal, Humorous)
- **Hinglish Support** — Write in Hinglish, convert to Hindi/English
- **Multi-Platform** — Web and Chrome extension
- **Privacy-First** — No data storage, analytics via Plausible

### Architecture Overview
```
┌─────────────────────────────────────────────┐
│         Chrome Extension (Vite)             │
│  Popup UI → /api/rewrite endpoint           │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│     Next.js Landing Page (Vercel)           │
│  ├─ Landing page                            │
│  ├─ API endpoints (/api/rewrite, etc.)      │
│  └─ Supabase integration                    │
└─────────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
    Supabase DB            External APIs
    (PostgreSQL)           (Gemini, Resend)
```

---

## 📚 File Structure

```
tactly/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── waitlist/
│   │   │   ├── contact/
│   │   │   └── rewrite/          (Extension API)
│   │   ├── privacy/
│   │   ├── about/
│   │   ├── layout.tsx
│   │   └── page.tsx              (Main landing page)
│   ├── components/
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
│   │   ├── prompts.ts            (AI prompt builder)
│   │   ├── rewrite-types.ts      (Shared types)
│   │   └── utils.ts
│   └── contexts/
│       ├── waitlist-context.tsx
│       └── contact-context.tsx
├── public/
│   ├── logo.png
│   ├── og-image.png
│   └── [other assets]
├── docs/                          (This folder)
└── package.json
```

---

## 🔑 Key Environment Variables

These must be set for the app to work:

```
NEXT_PUBLIC_SUPABASE_URL       # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY  # Public anonymous key
SUPABASE_SERVICE_ROLE_KEY      # Backend-only service key
RESEND_API_KEY                 # Email service API key
GEMINI_API_KEY                 # Google Gemini API key
TACTLY_EXTENSION_SECRET        # Secret for extension API calls
```

See `.env.local.example` for the full template.

---

## 💡 Common Tasks

### Add a New Feature
1. Create component in `src/components/`
2. Import in `src/app/page.tsx`
3. Add to landing page sections
4. Test responsiveness

### Update Copy/Content
1. Find the component file
2. Update text in JSX
3. Check alignment and responsiveness
4. Test locally with `npm run dev`

### Add a New Page
1. Create folder in `src/app/` (e.g., `src/app/blog/`)
2. Add `page.tsx` file
3. Export metadata in page
4. Link from navbar/footer

### Deploy Changes
1. Create a PR on GitHub
2. Run `npm run build` locally to verify
3. Merge to main
4. Vercel auto-deploys from main branch

---

## 🆘 Need Help?

- **Stuck on setup?** → [GETTING_STARTED.md](./GETTING_STARTED.md)
- **Don't understand the code?** → [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Error or issue?** → [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Want to contribute?** → [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 📞 Contact & Support

- **Email**: usetactly.ai@gmail.com
- **GitHub**: https://github.com/mr-rishuraj/tactly
- **Live Site**: https://tactly.ai
- **LinkedIn**: https://www.linkedin.com/company/tactly/

---

**Last Updated**: June 2026  
**Maintainer**: Rishu Raj (mr-rishuraj)

