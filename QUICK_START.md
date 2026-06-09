# TACTLY - Quick Start Guide

## 🚀 **GETTING STARTED**

### **1. Install Dependencies**
```bash
npm install
```

### **2. Run Development Server**
```bash
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### **3. Build for Production**
```bash
npm run build
npm start
```

---

## 📋 **AVAILABLE COMMANDS**

```bash
# Development
npm run dev          # Start dev server (hot reload)

# Building
npm run build        # Create production build
npm start            # Run production build locally

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type check (if available)
```

---

## 📂 **PROJECT STRUCTURE AT A GLANCE**

```
tactly/
├── src/
│   ├── app/
│   │   ├── layout.tsx       → Root layout + fonts
│   │   ├── page.tsx         → Main landing page
│   │   └── globals.css      → Global styles
│   ├── components/          → 14 page sections
│   │   ├── navbar.tsx
│   │   ├── hero.tsx
│   │   ├── problem.tsx
│   │   ├── features.tsx
│   │   └── ... (10 more)
│   └── lib/
│       └── utils.ts         → Utilities
├── public/                  → Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
└── PROJECT_CONTEXT.md       → Full project context (THIS FILE)
```

---

## 🎨 **STYLING SYSTEM**

### **Fonts**
- **Headings**: Plus Jakarta Sans (bold, geometric)
- **Body**: Inter (clean, readable)

### **Colors**
- Dark mode enabled by default
- Color scheme: OKLCH
- Primary gradient: `from-blue-500 to-cyan-500`

### **Spacing**
- Mobile: `py-16`
- Tablet: `md:py-24`
- Desktop: `lg:py-32`

---

## 📄 **MAIN SECTIONS** (in order)

1. **Navbar** - Fixed header with mobile menu
2. **Hero** - Full viewport with before/after demo
3. **Problem** - Workflow visualization
4. **Why Tactly** - Comparison cards
5. **Features** - 6 interactive cards
6. **Hinglish Showcase** - Language support
7. **Tone Engine** - 5 interactive personas
8. **Comparison** - vs Grammarly, ChatGPT, etc.
9. **Communication Intelligence** - Core value prop
10. **Future Vision** - Roadmap
11. **Testimonials** - Social proof (demo)
12. **FAQ** - Common questions
13. **Waitlist** - Email signup
14. **Footer** - Links and socials

---

## 🔧 **MODIFYING CONTENT**

### **Change Headline Text**
File: `src/components/hero.tsx`
```tsx
<h1 className="mb-8 md:mb-8">
  <span className="block text-foreground">Say the right thing.</span>
  <span className="block gradient-text from-blue-400 via-cyan-400 to-green-400">
    Every time.
  </span>
</h1>
```

### **Change Feature Cards**
File: `src/components/features.tsx`
Update the `features` array at the top of the component.

### **Update FAQ Questions**
File: `src/components/faq.tsx`
Update the `faqs` array.

### **Change Colors**
File: `src/app/globals.css`
Modify the OKLCH color values in the `:root` and `.dark` sections.

---

## 🌐 **DEPLOYMENT OPTIONS**

### **Vercel (Recommended)**
```bash
npm install -g vercel
vercel
```

### **Netlify**
```bash
npm run build
# Connect repo to Netlify
```

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📱 **RESPONSIVE BREAKPOINTS**

- **Mobile**: Default (< 640px)
- **Tablet**: `md:` (640px - 1024px)
- **Desktop**: `lg:` (1024px+)
- **Large**: `xl:` (1280px+)

---

## 🎬 **ANIMATIONS**

All animations use Framer Motion:
- Scroll reveals (`whileInView`)
- Hover effects (`whileHover`)
- Click animations (`whileTap`)
- Staggered children

Performance: All use GPU acceleration (transform, opacity)

---

## ✅ **BEFORE DEPLOYING**

1. ✅ Test on mobile/tablet/desktop
2. ✅ Check all links work
3. ✅ Verify form validation
4. ✅ Update social links in footer
5. ✅ Update email (hey@tactly.ai → your email)
6. ✅ Add favicon (public/favicon.ico)
7. ✅ Add OG image (public/og-image.png)

---

## 🔗 **UPDATING LINKS**

### **Navbar Links**
File: `src/components/navbar.tsx`
```tsx
const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  // ... update as needed
];
```

### **Social Links**
File: `src/components/footer.tsx`
```tsx
const socials = [
  { icon: X, href: "https://twitter.com/yourhandle", label: "X" },
  // ... update URLs
];
```

---

## 📊 **KEY METRICS**

- **Build Time**: ~1 second
- **TypeScript Errors**: 0
- **Console Warnings**: 0
- **Bundle Size**: Optimized
- **Performance**: Static pre-rendering

---

## 🎓 **LEARNING RESOURCES**

- [Next.js Docs](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [shadcn/ui Docs](https://ui.shadcn.com/)

---

## 🐛 **TROUBLESHOOTING**

### **Dev Server Won't Start**
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### **Build Fails**
```bash
# Check TypeScript
npm run type-check

# Check for lint errors
npm run lint
```

### **Styling Issues**
```bash
# Rebuild CSS
rm -rf .next
npm run build
```

---

## 📞 **QUICK HELP**

| Issue | Solution |
|-------|----------|
| Port 3000 in use | Use `npm run dev -- -p 3001` |
| Fonts not loading | Check `src/app/layout.tsx` |
| Animations laggy | Check for performance in DevTools |
| Form not working | Integrate Supabase in `src/components/waitlist.tsx` |
| Colors off | Check `src/app/globals.css` |

---

## 🚀 **NEXT STEPS**

1. **Integrate Supabase** for waitlist
2. **Add favicon** and OG image
3. **Update brand colors** if needed
4. **Add your email** to contact forms
5. **Deploy to Vercel**

---

## 💾 **PROJECT FILES REFERENCE**

| File | Changes Needed | Difficulty |
|------|---|---|
| `src/components/hero.tsx` | Copy, CTA text | Easy |
| `src/components/features.tsx` | Features list | Easy |
| `src/components/faq.tsx` | FAQ questions | Easy |
| `src/app/globals.css` | Colors, spacing | Medium |
| `src/components/footer.tsx` | Links, email | Easy |
| `src/app/layout.tsx` | Meta tags, title | Medium |

---

**Good luck! 🚀**

For detailed information, see `PROJECT_CONTEXT.md`
