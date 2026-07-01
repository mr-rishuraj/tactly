# Tactly Features

Detailed documentation of all Tactly features and how they work.

## Core Feature: Message Rewriting

### Overview
The heart of Tactly is its AI-powered message rewriting engine. Users input a message, select a tone and goal, and Tactly rewrites it using the Google Gemini API.

### How It Works

**User Input**:
```
Message: "Hey, can you send that file?"
Tone: Professional
Goal: Request
Platform: Email
```

**Processing**:
1. Parse and validate input
2. Build prompt with context (tone, goal, platform)
3. Call Gemini 2.5 Flash API (streaming)
4. Stream response back to UI in real-time
5. Show rewritten message

**Output**:
```
Suggested Rewrite: "Could you please send that file?"
Alternative: "Would it be possible to receive that file?"
```

### Key Features

#### 1. Multiple Tone Personas

| Tone | Best For | Example |
|------|----------|---------|
| **Professional** | Business emails, formal communication | "Could you kindly forward the document?" |
| **Casual** | Friends, informal settings | "Hey, can you shoot that over?" |
| **Friendly** | Colleagues you like, warm tone | "Would love to get that file from you!" |
| **Formal** | Official correspondence | "I respectfully request the aforementioned document." |
| **Humorous** | Witty, fun exchanges | "Pleeeease send that file before I start crying!" |

**How to Use**:
```tsx
// In extension popup
<select onChange={(e) => setTone(e.target.value)}>
  <option value="Professional">Professional</option>
  <option value="Casual">Casual</option>
  <option value="Friendly">Friendly</option>
  <option value="Formal">Formal</option>
  <option value="Humorous">Humorous</option>
</select>
```

#### 2. Contextual Goals

| Goal | Purpose | When to Use |
|------|---------|------------|
| **Request** | Asking for something | "Can you send that?" |
| **Inform** | Sharing information | "I finished the report" |
| **Persuade** | Convincing someone | Pitches, sales emails |
| **Apologize** | Expressing regret | "Sorry for the delay" |
| **Thank** | Expressing gratitude | "Thanks for helping" |

**Impact**: Goals help AI understand intent and choose appropriate wording.

#### 3. Platform Awareness

The extension detects which platform you're on:
- **Email** — Gmail, Outlook, etc.
- **LinkedIn** — Professional network messages
- **Twitter/X** — Short, punchy messages
- **Slack** — Internal communication
- **Facebook Messenger** — Casual, friendly tone

**Example**:
```
Same message, different platforms:

Email (Professional): "Could you please send the document?"
Slack (Casual): "Yo can you send that file?"
Twitter (Punchy): "Need that file ASAP 📄"
LinkedIn (Formal): "I would appreciate it if you could forward..."
```

---

## Feature 2: Hinglish Support

### What is Hinglish?

Hinglish is a blend of Hindi and English, commonly used in India. Examples:
- "Aaj meeting mein presentation dena hai" (Give a presentation in today's meeting)
- "File bhej do please" (Send the file please)
- "Kya yeh sahi hai?" (Is this correct?)

### How Tactly Handles Hinglish

**Input**: Hinglish message (romanized Hindi + English)
```
"Aaj ka meeting mein presentation dena hai, files bhej do"
```

**Processing**:
1. Recognize Hindi words + English mixing
2. Apply grammar correction in context
3. Optionally convert to pure Hindi or pure English
4. Rewrite with selected tone

**Output Options**:
- Keep as Hinglish (romantic, natural)
- Convert to pure English
- Convert to pure Hindi (Devanagari script)

### Hinglish Showcase Section

On the landing page, the "Hinglish Showcase" demonstrates:
- Natural Hinglish usage
- Tone application in Hinglish
- Conversion capabilities

---

## Feature 3: Tone Engine

### Interactive Demo (Landing Page)

The landing page features 5 tone examples for the same message:

**Original Message**:
"I'm leaving the company because I found a better opportunity."

**Tone Examples**:

1. **Professional**
   "I'm resigning from my position to pursue a new career opportunity that aligns better with my goals."

2. **Casual**
   "Yo, I'm dipping out. Found a sick new gig that I'm pumped about!"

3. **Friendly**
   "Hey everyone! I'm moving on to an exciting new chapter. Thanks for the good times!"

4. **Formal**
   "Please accept this resignation, effective immediately. I have accepted a position elsewhere."

5. **Humorous**
   "I've decided to abandon ship and seek fortune elsewhere. It's been fun! 🚢"

### Design
- One message displayed
- 5 tone buttons below
- Click button to see transformation
- Animations highlight the change
- Mobile-friendly layout

---

## Feature 4: Communication Intelligence

### Concept

Beyond simple rewrites, Tactly provides "Communication Intelligence" — understanding what makes communication effective:

- **Clarity** — Is the message clear?
- **Tone Match** — Does tone match context?
- **Persuasiveness** — Will this convince the reader?
- **Appropriateness** — Is it suitable for the platform/audience?

### Landing Page Section

The "Communication Intelligence" section explains:
- Why communication matters
- Statistics about miscommunication
- How Tactly helps
- Future AI capabilities

---

## Feature 5: Comparison with Competitors

### Competitors Covered

1. **Grammarly** — Grammar checking tool
2. **ChatGPT** — General-purpose AI
3. **Hemingway Editor** — Writing style editor
4. **Tone.com** — Tone analysis tool
5. **ProWritingAid** — Advanced writing analysis

### Comparison Table

| Feature | Tactly | Grammarly | ChatGPT | Hemingway | ProWritingAid |
|---------|--------|-----------|---------|-----------|---------------|
| Tone Customization | ✅ 5+ tones | ❌ | ✅ Limited | ❌ | ❌ |
| Hinglish Support | ✅ | ❌ | ⚠️ Limited | ❌ | ❌ |
| Real-time Extension | ✅ | ✅ | ❌ | ❌ | ✅ |
| Privacy-First | ✅ | ❌ | ❌ | ✅ | ❌ |
| Free | ✅ | ⚠️ Limited | ✅ | ✅ | ⚠️ Limited |
| Platform Support | Email, LinkedIn, Slack | Limited | Web only | Web only | Web only |
| Language Support | Multi-language | Limited | Multi-language | English only | Multi-language |

### Key Differentiators

- **Tone Customization** — Unique to Tactly (5+ personas)
- **Hinglish** — Only Tactly supports it
- **Privacy** — No message storage (vs. Grammaly stores data)
- **Extension-based** — Works in any web app (vs. limited support)

---

## Feature 6: FAQ Section

### Common Questions Addressed

1. **Is my data stored?**
   No. Tactly doesn't store your messages. They're processed in real-time and discarded.

2. **How accurate are the rewrites?**
   Very accurate. AI trained on millions of communications. Always review before sending.

3. **Does it work in all languages?**
   Currently English, Hindi, and Hinglish. More coming soon.

4. **Can I customize the tone more?**
   Currently 5 fixed tones. Fine-tuning coming in future versions.

5. **What about grammar and spelling?**
   Rewrites preserve grammar. For grammar-only checks, use Grammarly.

6. **Can I use for code comments?**
   Yes! Works for any text (including comments).

7. **Is there an API?**
   Extension API available (internal). Public API coming later.

8. **Do you sell data?**
   No. Privacy is our core value. Check privacy policy for details.

---

## Planned Features (Roadmap)

### Phase 2 (Q3 2026)
- [ ] Advanced tone tuning (custom tone profiles)
- [ ] More languages (French, Spanish, German)
- [ ] Message history & favorites
- [ ] Tone predictions ("what tone might work best?")

### Phase 3 (Q4 2026)
- [ ] User accounts (optional)
- [ ] Saved message templates
- [ ] Team workspaces
- [ ] Advanced analytics

### Phase 4 (2027)
- [ ] Mobile app (iOS/Android)
- [ ] Public API for developers
- [ ] Slack bot integration
- [ ] AI coaching ("get better at communication")

---

## Feature Comparison Matrix

```
Legend:
✅ = Implemented & working
🔄 = In progress
🚧 = Planned
❌ = Not planned
```

| Feature | Status | Used For | Location |
|---------|--------|----------|----------|
| Message Rewriting | ✅ | Core feature | Extension + API |
| 5 Tone Personas | ✅ | Customization | Extension UI + Landing page |
| Hinglish Support | ✅ | Language support | AI prompt |
| Platform Detection | ✅ | Context awareness | Extension |
| Streaming Response | ✅ | Real-time UX | Extension popup |
| Confirmation Email | ✅ | User engagement | Waitlist flow |
| Privacy Policy | ✅ | Compliance | /privacy page |
| Analytics | ✅ | Insights | Plausible dashboard |
| Contact Form | ✅ | Support | Landing page |
| FAQ Section | ✅ | Help | Landing page |
| Advanced Tuning | 🚧 | Fine-control | Phase 2 |
| More Languages | 🚧 | Global reach | Phase 2 |
| User Accounts | 🚧 | Personalization | Phase 3 |
| Mobile App | 🚧 | Accessibility | Phase 4 |
| Public API | 🚧 | Developer access | Phase 4 |

---

## Feature Usage Tips

### Tip 1: Match Tone to Audience
- **Professional**: Boss, client, formal emails
- **Casual**: Coworkers you know well, friends
- **Friendly**: New connections, warm relationships
- **Formal**: Legal, official, government communication
- **Humorous**: Trusted colleagues, social media

### Tip 2: Set Goal for Better Results
Don't just pick a tone — also select the goal:
- "Request" + "Professional" = Polite business request
- "Thank" + "Friendly" = Warm gratitude
- "Persuade" + "Professional" = Convincing business pitch

### Tip 3: Always Review
AI is great but not perfect. Always:
- ✅ Read the rewrite carefully
- ✅ Check it matches your intent
- ✅ Verify tone is appropriate
- ✅ Make manual edits if needed

### Tip 4: Use in Different Contexts
- Emails (Gmail, Outlook, corporate systems)
- Chat (Slack, Teams, Discord)
- Social media (LinkedIn, Twitter, Facebook)
- Messages (WhatsApp, Telegram, Messenger)
- Code comments (GitHub, comments)

---

## Analytics for Features

### Landing Page Insights
- **Tone Engine** most viewed section (high scroll depth)
- **Comparison** section drives waitlist signups
- **Hinglish Showcase** popular among Indian users
- **FAQ** prevents support emails

### Future Metrics to Track
- Which tones are most used in extension
- Which platforms get most rewrites
- Which goals are most common
- Success rate (users keeping rewrites vs. discarding)

---

**For implementation details or API usage, see [API_GUIDE.md](./API_GUIDE.md) or [EXTENSION_GUIDE.md](./EXTENSION_GUIDE.md).**
