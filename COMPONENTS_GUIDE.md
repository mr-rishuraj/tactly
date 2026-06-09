# TACTLY - Components Guide

## 📚 **DETAILED COMPONENT DOCUMENTATION**

Quick navigation to what each component does and where to find it.

---

## 🧭 **NAVIGATION COMPONENT**

**File**: `src/components/navbar.tsx`

**What it does**:
- Fixed sticky navbar at the top
- Logo + TACTLY branding
- Navigation links (Features, How It Works, Vision, FAQ)
- Responsive mobile hamburger menu
- Join Waitlist CTA button

**Key elements to modify**:
```tsx
// Navigation links
const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Vision", href: "#vision" },
  { label: "FAQ", href: "#faq" },
];
```

**Mobile menu**: Slides in from right when hamburger clicked

---

## 🎯 **HERO SECTION**

**File**: `src/components/hero.tsx`

**What it does**:
- Full viewport height (100vh) centered layout
- Main headline with gradient text
- Subheadline explaining value prop
- Two CTA buttons: "Join Waitlist" + "Book Demo"
- Before/after message transformation demo
- Shows impact (23% reply rate → 87% reply rate)

**Key elements**:
```tsx
// Before message
Input: "Hey wanted ask few questions regarding startups"

// After message
Output: "Hey, saw your startup recently got into YC, congrats!..."

// Reply probability indicators
Before: Reply 23% (red)
After: Reply 87% (green)
```

**Design features**:
- Color-coded boxes (red = before, cyan = after)
- Animated arrows between demo boxes
- Min-height containers (no resizing)
- Large, bold typography
- Proper spacing with smooth animations

---

## ⚠️ **PROBLEM SECTION**

**File**: `src/components/problem.tsx`

**What it does**:
- Shows the workflow comparison
- Old way: 7 steps (Write → Copy → ChatGPT → Paste → Rewrite → Copy → Paste Back)
- New way: 3 steps (Highlight → Improve → Send)
- Visual horizontal workflow diagram
- Mobile-responsive layout

**Key features**:
- Proper workflow visualization
- Color-coded (red = inefficient, green = efficient)
- Animated step boxes
- Clear messaging about benefits

**Layout**:
```
WITHOUT TACTLY:  [Step] → [Step] → [Step] → ...
With Tactly:     [Step] → [Step] → [Step]
```

---

## 🤔 **WHY TACTLY SECTION**

**File**: `src/components/why-tactly.tsx`

**What it does**:
- Explains why TACTLY is different
- 3 comparison cards:
  1. **Grammar** (Grammarly, Word)
  2. **Writing** (ChatGPT, Compose AI)
  3. **Communication** (Tactly - highlighted)

**Key insight**:
```
Grammar Tools: Fix spelling/grammar
Writing Tools: Compose text
Tactly: Achieve communication goals
```

**Highlight card** (Tactly):
- Larger with gradient background
- Lists key features:
  - ✓ Context Aware
  - ✓ Personalized
  - ✓ Outcome Focused

---

## 🎁 **FEATURES SECTION**

**File**: `src/components/features.tsx`

**What it does**:
- Showcase 6 main features in grid layout
- 2 columns on tablet, 3 on desktop
- Equal height cards (no content-based resizing)
- Hover effects reveal "demo" text

**The 6 Features**:
1. **Rewrite Anywhere** - Highlight, improve, send
2. **AI Autocomplete** - Type naturally, press Tab
3. **Hinglish Native** - Mixed language support
4. **Tone Engine** - 5 switchable personas
5. **Write Like Me** - Learn your writing style
6. **Reply Optimizer** - Message quality metrics

**Card structure**:
```tsx
[Icon]
[Title]
[Description]
[Demo text - appears on hover]
```

**Features array to modify**:
```tsx
const features = [
  {
    title: "...",
    description: "...",
    icon: "✨",
    demo: "...",
    color: "from-blue-500",
  },
  // ...
];
```

---

## 🌏 **HINGLISH SHOWCASE SECTION**

**File**: `src/components/hinglish-showcase.tsx`

**What it does**:
- Shows how TACTLY handles mixed-language (Hinglish) communication
- 3 example scenarios
- Compares traditional tools vs TACTLY

**Examples shown**:
1. "Bhai kal meeting ke liye free hai kya?" → Professional follow-up
2. "Yaar startup idea mil gaya kya?" → Collaborative message
3. "Arre iska solution nikalo jaldi" → Team communication

**Layout per example**:
```
[Original Hinglish] | [Traditional Tool] | [Tactly Output]
```

**Easy to add more**:
```tsx
const hinglishExamples = [
  {
    hinglish: "...",
    before: "...",
    after: "...",
    context: "Networking",
  },
  // Add more here
];
```

---

## 🎭 **TONE ENGINE SECTION**

**File**: `src/components/tone-engine.tsx`

**What it does**:
- Interactive button switcher
- 5 tone personas that transform same message
- Button clicks change displayed tone and message

**The 5 Tones**:
1. **Founder** - Bold, visionary, confident
2. **Student** - Curious, enthusiastic, learning
3. **Creator** - Authentic, engaging, personal
4. **Professional** - Polished, direct, measured
5. **Casual** - Friendly, conversational, relaxed

**How it works**:
```tsx
const [selectedTone, setSelectedTone] = useState(0);

// Click button → setSelectedTone(index)
// Display tones[selectedTone].message
```

**Each tone has**:
- name
- description
- message (the transformed text)

**Easy to add more tones**:
```tsx
const tones = [
  {
    name: "Founder",
    description: "Bold, visionary, confident",
    message: "...",
  },
  // Add more here
];
```

---

## 📊 **COMPARISON TABLE SECTION**

**File**: `src/components/comparison.tsx`

**What it does**:
- Premium comparison table
- 4 tools compared (Grammarly, ChatGPT, Compose AI, Tactly)
- 10 features compared
- Tactly column highlighted as superior

**Table structure**:
```
Feature | Grammarly | ChatGPT | Compose AI | Tactly
--------|-----------|---------|-----------|-------
Grammar Correction | ✓ | — | — | ✓
...
Communication Intelligence | — | — | — | ✓
```

**Features compared**:
1. Grammar Correction
2. Autocomplete
3. Works Anywhere
4. Personal Writing Style
5. Communication Goals
6. Context Awareness
7. Reply Optimization
8. Hinglish Native
9. Networking Assistance
10. Communication Intelligence

**Easy to update**:
```tsx
const comparisonData = [
  {
    feature: "Feature Name",
    grammarly: true/false,
    chatgpt: true/false,
    composeai: true/false,
    tactly: true/false,
  },
  // Add more rows
];
```

---

## 💡 **COMMUNICATION INTELLIGENCE SECTION**

**File**: `src/components/communication-intelligence.tsx`

**What it does**:
- Core value proposition section
- Headline: "Grammar is a feature. Communication is the goal."
- Side-by-side comparison:
  - Left: Grammarly output (technically correct)
  - Right: Tactly output (personalized, high impact)

**Key message**:
- Grammarly fixes sentences
- Tactly improves outcomes

**Design**:
- Two boxes with same message
- Left: Red/neutral styling
- Right: Cyan/gradient styling
- Shows the difference clearly

---

## 🔮 **FUTURE VISION SECTION**

**File**: `src/components/future-vision.tsx`

**What it does**:
- Shows product roadmap
- 3 phases: Today, Tomorrow, Future
- Lists planned features

**Timeline**:
```
TODAY:
- Rewrites
- Autocomplete
- Tone optimization

TOMORROW:
- Networking intelligence
- Communication coaching
- Relationship building

FUTURE:
- Sales communication
- Recruiting
- Fundraising
```

**Design**:
- 3 cards side by side
- Connected with arrows
- Gradient styling

**Easy to update**:
```tsx
const timeline = [
  {
    label: "Today",
    items: ["Feature 1", "Feature 2"],
    color: "from-blue-500/20",
  },
  // Add phases
];
```

---

## 💬 **TESTIMONIALS SECTION**

**File**: `src/components/testimonials.tsx`

**What it does**:
- Shows user testimonials (demo/placeholder)
- 2x2 grid on desktop
- Clearly marked as preview testimonials
- Cards with author info

**Each testimonial has**:
- Quote
- Author name
- Author role
- Avatar initials

**Current testimonials**:
1. Sarah Chen - Founder
2. Rahul Sharma - Student
3. Maya Patel - Creator
4. Vikram Singh - Sales Lead

**Easy to replace with real testimonials**:
```tsx
const testimonials = [
  {
    name: "Name",
    role: "Role",
    avatar: "NM",
    quote: "The testimonial text...",
  },
  // Replace these
];
```

---

## ❓ **FAQ SECTION**

**File**: `src/components/faq.tsx`

**What it does**:
- Accordion-style FAQ
- Click to expand/collapse
- 8 common questions

**Current FAQs**:
1. Why not just use ChatGPT?
2. Why not Grammarly?
3. How is Tactly different from Compose AI?
4. How does tone cloning work?
5. How does Hinglish support work?
6. What platforms are supported?
7. Is my data safe?
8. How much will it cost?

**Structure**:
```tsx
const faqs = [
  {
    question: "Why not ChatGPT?",
    answer: "ChatGPT requires... [full answer]",
  },
  // Add more
];
```

**Features**:
- Smooth expand/collapse animation
- Only one open at a time
- Easy to add more questions
- Mobile-responsive

---

## 📧 **WAITLIST SECTION**

**File**: `src/components/waitlist.tsx`

**What it does**:
- Email signup form
- Collects name and email
- Form validation
- Success state with confetti effect
- Error handling

**Form fields**:
1. **Name** (text input)
2. **Email** (email input)

**States**:
- Default (empty)
- Loading (submitting)
- Success (email sent)
- Error (validation failed)

**To integrate with Supabase**:
```tsx
// In handleSubmit function:
const { data, error } = await supabase
  .from('waitlist')
  .insert([{ name, email }]);
```

**Customize**:
- Change placeholder text
- Modify validation rules
- Update success message
- Add more fields

---

## 🔗 **FOOTER SECTION**

**File**: `src/components/footer.tsx`

**What it does**:
- Footer navigation
- Links to policies
- Social media links
- Copyright info
- Company description

**Sections**:
1. **Brand** - Logo + tagline
2. **Product** - Feature links
3. **Legal** - Privacy, Terms, Contact
4. **Social** - X, GitHub, Email

**Links to update**:
```tsx
const links = [
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
  { label: "Contact", href: "mailto:hey@tactly.ai" },
];

const socials = [
  { icon: X, href: "https://twitter.com/tactlyai", label: "X" },
  // Update URLs
];
```

---

## 🎨 **STYLING UTILITIES**

**File**: `src/app/globals.css`

**Key classes**:
```css
.gradient-text        /* Gradient text effect */
.section-padding      /* Standard padding */
.section-container    /* Max width + centered */
.glass-button         /* Styled button base */
.gradient-button      /* Gradient button */
```

**Font variables**:
```css
--font-inter          /* Body text */
--font-jakarta        /* Headings */
--font-geist-sans     /* Fallback */
```

---

## 🖱️ **INTERACTIVE COMPONENTS**

All components use Framer Motion for:
- **Scroll reveals**: Fade in on view
- **Hover effects**: Scale, color changes
- **Click animations**: Button feedback
- **Staggered children**: Sequential reveals

---

## 📱 **RESPONSIVE BEHAVIOR**

Each component is responsive using:
- `md:` - Tablet breakpoint (640px)
- `lg:` - Desktop breakpoint (1024px)
- `xl:` - Large desktop (1280px)

Example:
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column mobile, 2 on tablet, 3 on desktop */}
</div>
```

---

## 🔄 **COMPONENT DEPENDENCY GRAPH**

```
page.tsx (main)
├── Navbar
├── Hero
├── Problem
├── WhyTactly
├── Features
├── HinglishShowcase
├── ToneEngine
├── Comparison
├── CommunicationIntelligence
├── FutureVision
├── Testimonials
├── FAQ
├── Waitlist
└── Footer
```

---

## ✨ **QUICK MODIFICATIONS CHEAT SHEET**

| Want to change | File | Find this |
|---|---|---|
| Navbar links | navbar.tsx | `const navLinks` |
| Hero headline | hero.tsx | `<h1>Say the right thing` |
| Features | features.tsx | `const features` |
| Hinglish examples | hinglish-showcase.tsx | `const hinglishExamples` |
| Tones | tone-engine.tsx | `const tones` |
| Comparison table | comparison.tsx | `const comparisonData` |
| FAQ questions | faq.tsx | `const faqs` |
| Testimonials | testimonials.tsx | `const testimonials` |
| Footer links | footer.tsx | `const links, socials` |
| Colors | globals.css | `:root, .dark` |
| Fonts | layout.tsx | `import { ... } from 'next/font/google'` |

---

**That's everything!** Each component is self-contained and easy to modify. 🚀
