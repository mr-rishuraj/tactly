# Tactly User Flows

Understand how users interact with Tactly across different platforms.

## Landing Page User Flows

### Flow 1: Discover & Join Waitlist

```
User visits tactly.ai
    ↓
Reads hero headline ("Say the right thing. Every time.")
    ↓
Scroll through features & tone examples
    ↓
Gets convinced by comparison with competitors
    ↓
Sees "Join Waitlist" button
    ↓
Clicks button → WaitlistModal opens
    ↓
Enters email + selects persona (Professional, Casual, etc.)
    ↓
Submits form
    ↓
    ├─ Form validates locally
    ├─ Sends to POST /api/waitlist
    ├─ Database stores entry (Supabase)
    ├─ Resend sends confirmation email
    └─ Modal shows success message
    ↓
User closes modal
```

**Key Sections They See**:
1. Navbar (branding + links)
2. Hero (main pitch)
3. Problem (why needed?)
4. Why Tactly (benefits)
5. Features (6 cards)
6. Hinglish Showcase (language support)
7. Tone Engine (5 personas in action)
8. Comparison (vs. Grammarly, ChatGPT)
9. Communication Intelligence (deep value)
10. FAQ (common questions)

---

### Flow 2: Contact Support

```
User has a question or partnership inquiry
    ↓
Scrolls to bottom (Footer)
    ↓
Finds "Contact Us" button or link
    ↓
Clicks → ContactModal opens
    ↓
Fills in: Name, Email, Message, Category (Feedback/Support/Partnership)
    ↓
Submits form
    ↓
    ├─ Validates inputs
    ├─ Stores in contacts table
    ├─ Sends notification to usetactly.ai@gmail.com
    └─ Shows success message
    ↓
User closes modal
```

**Contact Types**:
- Feedback (feature requests, improvements)
- Support (bug reports, issues)
- Partnership (business inquiries)
- General (other)

---

### Flow 3: Learn About Privacy

```
User concerns about privacy
    ↓
Clicks "Privacy Policy" link (footer)
    ↓
Visits /privacy page
    ↓
Reads privacy statement
    ↓
Learns: No data storage, no cookies, Plausible only
    ↓
Feels confident about data usage
    ↓
Returns to main page
```

---

## Chrome Extension User Flows

### Flow 1: Install Extension

```
User is on Tactly landing page
    ↓
Sees "Try the Extension" section
    ↓
Clicks "Add to Chrome"
    ↓
Chrome store opens
    ↓
Clicks "Add to Chrome" button
    ↓
Grants permissions for content scripts
    ↓
Extension installed in browser toolbar
    ↓
Icon appears next to address bar
```

---

### Flow 2: Rewrite Message (In Gmail)

```
User opens Gmail and writes a message
    ↓
Composes: "Hey, can you send that file?"
    ↓
Wants to make it more professional
    ↓
Clicks Tactly icon in toolbar
    ↓
Popup opens showing:
    ├─ Text area with current message
    ├─ Tone selector (Professional, Casual, etc.)
    ├─ Goal selector (Request, Inform, etc.)
    └─ Rewrite button
    ↓
Selects: Tone = "Professional", Goal = "Request"
    ↓
Clicks "Rewrite"
    ↓
    ├─ Popup sends message to /api/rewrite
    ├─ Includes API secret header
    ├─ Backend validates and calls Gemini
    ├─ Streaming response comes back
    └─ Shows rewritten message in real-time
    ↓
User sees: "Could you please send that file?"
    ↓
Likes it? Clicks "Use Rewrite"
    ↓
    ├─ Content script injects rewritten text into Gmail
    ├─ Message body gets updated
    └─ User can send or further edit
    ↓
Message sent with new wording
```

**Tone Options** (in popup):
- Professional — Formal, business-appropriate
- Casual — Relaxed, friendly
- Friendly — Warm, approachable
- Formal — Very official
- Humorous — Witty, funny

**Goal Options**:
- Request — Asking for something
- Inform — Sharing information
- Persuade — Convincing someone
- Apologize — Expressing regret
- Thank — Expressing gratitude

**Platforms Supported**:
- Email (Gmail, Outlook)
- LinkedIn Messages
- Twitter DMs
- Slack
- Facebook Messenger

---

### Flow 3: Rewrite Message (In LinkedIn)

```
User on LinkedIn writes a message to a connection
    ↓
Wants message to be warmer and more engaging
    ↓
Clicks Tactly icon
    ↓
Popup loads with LinkedIn-specific context
    ↓
Selects: Tone = "Friendly", Goal = "Persuade"
    ↓
Clicks "Rewrite"
    ↓
Gets AI-suggested alternative
    ↓
Copies rewritten text or clicks "Use"
    ↓
Content script inserts into LinkedIn message box
    ↓
User sends message
```

---

### Flow 4: Adjust Settings in Popup

```
User opens extension popup
    ↓
Clicks settings icon (gear) in popup
    ↓
Sees options:
    ├─ Remember last tone
    ├─ Remember last goal
    ├─ Theme (light/dark)
    └─ Show tips on startup
    ↓
Changes settings
    ↓
Settings saved to localStorage
    ↓
Next time popup opens, preferences preserved
```

---

## Analytics Event Tracking

### Landing Page Events (Plausible)

| Event | Trigger | Purpose |
|-------|---------|---------|
| `page_view` | User lands on page | Track traffic |
| `scroll_depth` | User scrolls to section | Engagement |
| `join_waitlist_click` | "Join Waitlist" button | Intent to signup |
| `waitlist_submit` | Form submitted | Conversion |
| `contact_click` | "Contact Us" link | Support interest |
| `contact_submit` | Contact form submitted | Lead capture |
| `feature_click` | Feature card clicked | Feature interest |
| `tone_select` | Tone example viewed | Tone popularity |
| `faq_expand` | FAQ item opened | Help interest |

### Extension Events (Not tracked, privacy-first)
- No events sent to external servers
- All data processing is local
- User messages never leave browser (except to API)

---

## Conversion Funnel

```
Landing Page Visitors
         │
         ├─ 100% see hero
         │
         ├─ 70% scroll to features
         │
         ├─ 40% scroll to tone engine
         │
         ├─ 20% scroll to comparison
         │
         ├─ 10% join waitlist ← KEY CONVERSION
         │
         ├─ 5% contact us
         │
         └─ 2% visit privacy policy

Extension Install (future)
         │
         ├─ 100% install
         │
         ├─ 80% open popup
         │
         ├─ 50% try first rewrite ← KEY ENGAGEMENT
         │
         └─ 30% use rewrite in message
```

---

## User Personas

### Persona 1: The Professional

**Profile**:
- Uses Gmail, LinkedIn, Slack
- Wants to sound polished and authoritative
- Concerned about tone in written communication
- Time-constrained (quick rewrites)

**User Journey**:
1. Lands on page via LinkedIn ad
2. Reads "Features" section (professional-focused)
3. Impressed by "Tone Engine" demo
4. Joins waitlist
5. Installs extension
6. Uses in professional emails and LinkedIn

**Pain Points**:
- Emails come off as rude or too casual
- Takes too long to perfect wording
- Worried about first impressions

---

### Persona 2: The Content Creator

**Profile**:
- Uses Twitter/X, LinkedIn, email newsletters
- Wants engaging, personality-filled messages
- Values tone variety and uniqueness
- Active on social media

**User Journey**:
1. Discovers via Twitter recommendation
2. Reads "Hinglish Showcase" section
3. Excited by tone variety
4. Joins waitlist
5. Uses extension for social media
6. Shares with followers

**Pain Points**:
- Messages feel bland or repetitive
- Hard to match audience tone
- Takes time to edit for personality

---

### Persona 3: The Language Learner / Bilingual User

**Profile**:
- Switches between English and Hindi
- Uses Hinglish (mix of both)
- Values language flexibility
- Wants natural-sounding rewrites

**User Journey**:
1. Discovers via Indian tech community
2. Reads "Hinglish Showcase"
3. Excited about multi-language support
4. Joins waitlist
5. Uses extension for code-switching
6. Recommends to bilingual friends

**Pain Points**:
- Hard to switch language mode smoothly
- Grammar-checking tools don't support Hinglish
- Feels forced when writing in English only

---

## Customer Journey Map

### Week 1: Awareness
- User sees Tactly ad / recommendation
- Visits landing page
- Reads hero + features sections
- May or may not join waitlist

### Week 2: Consideration
- Revisits landing page (from bookmarks)
- Compares with competitors (Grammarly, ChatGPT)
- Reads privacy policy
- Joins waitlist

### Week 3: Evaluation
- Receives confirmation email
- Still deciding if worth trying
- May subscribe to future updates

### Week 4+: Adoption (If Extension Launches)
- Gets invite to beta test
- Installs extension
- Tries first message rewrite
- Gets hooked if good experience
- Uses regularly

---

## Key Insights

### High-Converting Sections
1. **Hero** — First impression, critical
2. **Tone Engine** — Shows unique value
3. **Comparison** — Convinces they're better
4. **CTA Buttons** — "Join Waitlist" must be prominent

### Low Engagement
- Testimonials section (removed in recent update)
- Overly technical explanations
- Dense text blocks

### Mobile vs Desktop
- **Mobile**: Hero + Features + Tone Engine enough
- **Desktop**: Full page scroll, more details work

### Best Time to Ask for Email
- After showing features (hook interest first)
- After showing tone examples (prove value)
- After comparison (convince superiority)

---

**For more details on specific flows, see other documentation or check the code.**
