# Getting Started with Tactly

Get up and running with Tactly in 10 minutes.

## Prerequisites

- **Node.js** 18+ ([download](https://nodejs.org/))
- **npm** or **pnpm** (comes with Node.js)
- **Git** ([download](https://git-scm.com/))
- **A code editor** (VS Code recommended)

## 1. Clone the Repository

```bash
git clone https://github.com/mr-rishuraj/tactly.git
cd tactly
```

## 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

## 3. Set Up Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Then fill in the values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Email (Resend)
RESEND_API_KEY=your_resend_api_key_here

# AI (Google Gemini)
GEMINI_API_KEY=your_gemini_api_key_here

# Extension Secret
TACTLY_EXTENSION_SECRET=your_secret_here
```

### Getting These Keys

| Service | How to Get |
|---------|-----------|
| **Supabase** | Sign up at https://supabase.com, create a project, find keys in Settings → API |
| **Resend** | Sign up at https://resend.com, get API key from dashboard |
| **Gemini** | Go to https://ai.google.dev/, create API key from console |

⚠️ **Never commit `.env.local`** — it's in `.gitignore` for security.

## 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the Tactly landing page. Start editing `src/app/page.tsx` to test hot-reload.

## 5. Verify Everything Works

- [ ] Landing page loads
- [ ] Navigation links work
- [ ] "Join Waitlist" button opens modal
- [ ] Contact form opens and is functional
- [ ] No console errors

## 📦 Available Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm start            # Start production server (after build)
npm run lint         # Run linter (ESLint)
npm run type-check   # Check TypeScript types
```

## 🏗️ Project Structure Basics

```
src/
├── app/
│   ├── api/           # Backend API routes
│   ├── page.tsx       # Main landing page
│   ├── layout.tsx     # Global layout
│   ├── globals.css    # Global styles
│   └── privacy/       # Privacy page
├── components/        # React components
├── lib/              # Utilities & helpers
└── contexts/         # React contexts (modals, etc.)
```

## 🎨 First Changes

### Change the Hero Heading
Edit `src/components/hero.tsx`:
```tsx
<h1 className="mb-8 md:mb-8">
  <span className="block text-foreground">Your new heading here</span>
  <span className="block gradient-text">Gradient text here</span>
</h1>
```

### Add a New Section
Create a new file: `src/components/my-section.tsx`
```tsx
export function MySection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold">My Section</h2>
      </div>
    </section>
  );
}
```

Add to `src/app/page.tsx`:
```tsx
import { MySection } from "@/components/my-section";

export default function Home() {
  return (
    <>
      {/* ... other sections ... */}
      <MySection />
    </>
  );
}
```

## 🐛 Troubleshooting Setup

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```

### "Module not found" errors
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### "Cannot find module @/"
Make sure `tsconfig.json` has the path alias:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Build fails with TypeScript errors
```bash
npm run type-check  # See all errors
npm run lint        # See linting issues
```

## 📚 Next Steps

1. **Understand the codebase** → Read [ARCHITECTURE.md](./ARCHITECTURE.md)
2. **Learn about features** → Read [FEATURES.md](./FEATURES.md)
3. **Set up the extension** → Read [EXTENSION_GUIDE.md](./EXTENSION_GUIDE.md)
4. **Deploy changes** → Read [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🆘 Need Help?

- **Still stuck?** → Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Don't understand the code?** → Check [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Want to contribute?** → Check [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**You're all set!** 🎉 Start exploring the codebase and enjoy building with Tactly.
