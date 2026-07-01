# Tactly Chrome Extension Guide

Complete guide to the Tactly Chrome extension project.

## Overview

The Tactly Chrome Extension is a separate Vite project that provides in-app message rewriting capabilities. It works across Gmail, LinkedIn, Twitter, Slack, and other platforms.

### Key Facts
- **Location**: `../tactly-extension/` (sibling directory)
- **Framework**: Vite 6 + React 19 + TypeScript
- **Manifest**: V3 (modern Chrome extensions)
- **Architecture**: Popup UI + Content Scripts
- **API**: Calls `/api/rewrite` endpoint on main site

---

## Getting Started

### Prerequisites
- Node.js 18+
- Chrome browser (latest)
- Tactly main project set up and running

### Installation

```bash
# From main project
cd ../tactly-extension

# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build
```

### Load in Chrome

1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the `dist/` folder
6. Extension appears in toolbar

### Verify It Works

1. Go to Gmail
2. Compose a message
3. Click Tactly icon in toolbar
4. Paste a message in the popup
5. Select tone and goal
6. Click "Rewrite"
7. See AI suggestion appear

---

## Project Structure

```
tactly-extension/
├── src/
│   ├── popup/
│   │   ├── Popup.tsx          # Main popup UI
│   │   ├── Popup.css          # Popup styles
│   │   └── index.html         # Popup HTML entry
│   ├── content/
│   │   ├── content.ts         # Content script (injected in pages)
│   │   └── types.ts           # Shared types
│   ├── background/
│   │   └── background.ts      # Background worker (optional)
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   └── utils/
│       └── api.ts             # API client utilities
├── public/
│   ├── icons/
│   │   ├── icon-16.png
│   │   ├── icon-48.png
│   │   └── icon-128.png
│   └── manifest.json          # Extension manifest
├── dist/                      # Build output (git ignored)
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind CSS config
└── package.json
```

---

## Core Components

### 1. Popup Component

**File**: `src/popup/Popup.tsx`

The main UI users interact with:

```tsx
export function Popup() {
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState<Tone>('Professional');
  const [goal, setGoal] = useState<Goal>('Request');
  const [platform, setPlatform] = useState<Platform>('Email');
  const [rewritten, setRewritten] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRewrite = async () => {
    setLoading(true);
    const result = await rewriteMessage(message, tone, goal, platform);
    setRewritten(result);
    setLoading(false);
  };

  return (
    <div className="popup-container">
      <h2>Tactly Rewriter</h2>
      
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message to rewrite..."
      />
      
      <select value={tone} onChange={(e) => setTone(e.target.value)}>
        <option value="Professional">Professional</option>
        <option value="Casual">Casual</option>
        <option value="Friendly">Friendly</option>
        <option value="Formal">Formal</option>
        <option value="Humorous">Humorous</option>
      </select>
      
      <select value={goal} onChange={(e) => setGoal(e.target.value)}>
        <option value="Request">Request</option>
        <option value="Inform">Inform</option>
        <option value="Persuade">Persuade</option>
        <option value="Apologize">Apologize</option>
        <option value="Thank">Thank</option>
      </select>

      <button onClick={handleRewrite} disabled={loading}>
        {loading ? 'Rewriting...' : 'Rewrite'}
      </button>

      {rewritten && (
        <div className="rewritten">
          <h3>Suggested Rewrite:</h3>
          <p>{rewritten}</p>
          <button onClick={() => copyToClipboard(rewritten)}>Copy</button>
          <button onClick={() => useInMessage(rewritten)}>Use in Message</button>
        </div>
      )}
    </div>
  );
}
```

**Key Features**:
- Message input textarea
- Tone selector dropdown
- Goal selector dropdown
- Rewrite button with loading state
- Display rewritten message
- Copy to clipboard button
- "Use in Message" button (injects into page)

### 2. Content Script

**File**: `src/content/content.ts`

Injected into web pages to interact with the DOM:

```typescript
// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'useRewrite') {
    injectTextIntoPage(request.text);
    sendResponse({ status: 'Injected' });
  }
});

// Extract text from active input
function extractTextFromPage(): string {
  const active = document.activeElement;
  if (active instanceof HTMLTextAreaElement) {
    return active.value;
  }
  if (active instanceof HTMLInputElement) {
    return active.value;
  }
  return '';
}

// Inject text into active input
function injectTextIntoPage(text: string) {
  const active = document.activeElement;
  if (active instanceof HTMLTextAreaElement) {
    active.value = text;
    active.dispatchEvent(new Event('input', { bubbles: true }));
  }
  if (active instanceof HTMLInputElement) {
    active.value = text;
    active.dispatchEvent(new Event('input', { bubbles: true }));
  }
}
```

**Platform Detection**:
```typescript
function getPlatform(): Platform {
  const url = window.location.href;
  if (url.includes('gmail.com')) return 'Email';
  if (url.includes('linkedin.com')) return 'LinkedIn';
  if (url.includes('twitter.com')) return 'Twitter';
  if (url.includes('slack.com')) return 'Slack';
  return 'Other';
}
```

### 3. API Client

**File**: `src/utils/api.ts`

Handles communication with `/api/rewrite`:

```typescript
export async function rewriteMessage(
  message: string,
  tone: Tone,
  goal: Goal,
  platform: Platform
): Promise<string> {
  const response = await fetch('https://tactly.ai/api/rewrite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Tactly-Secret': EXTENSION_SECRET
    },
    body: JSON.stringify({
      message,
      tone,
      goal,
      platform
    })
  });

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let result = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const text = decoder.decode(value);
    const lines = text.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') return result;
        result += JSON.parse(`"${data}"`);
      }
    }
  }

  return result;
}
```

---

## Types

**File**: `src/types/index.ts`

```typescript
export type Tone = 
  | 'Professional'
  | 'Casual'
  | 'Friendly'
  | 'Formal'
  | 'Humorous';

export type Goal =
  | 'Request'
  | 'Inform'
  | 'Persuade'
  | 'Apologize'
  | 'Thank';

export type Platform =
  | 'Email'
  | 'LinkedIn'
  | 'Twitter'
  | 'Slack'
  | 'SMS'
  | 'Other';

export interface RewriteRequest {
  message: string;
  tone: Tone;
  goal: Goal;
  platform: Platform;
}

export interface RewriteResponse {
  rewritten: string;
  alternatives?: string[];
}
```

---

## Manifest Configuration

**File**: `public/manifest.json`

```json
{
  "manifest_version": 3,
  "name": "Tactly - Message Rewriter",
  "version": "1.0.0",
  "description": "Rewrite your messages with AI-powered tone customization",
  "icons": {
    "16": "icons/icon-16.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icons/icon-128.png"
  },
  "permissions": [
    "scripting",
    "activeTab",
    "tabs"
  ],
  "host_permissions": [
    "https://tactly.ai/*",
    "https://gmail.google.com/*",
    "https://www.linkedin.com/*",
    "https://twitter.com/*",
    "https://www.twitter.com/*",
    "https://slack.com/*",
    "https://*.slack.com/*"
  ],
  "content_scripts": [
    {
      "matches": [
        "https://mail.google.com/*",
        "https://www.linkedin.com/*",
        "https://twitter.com/*",
        "https://slack.com/*"
      ],
      "js": ["src/content/content.ts"]
    }
  ],
  "background": {
    "service_worker": "src/background/background.ts"
  }
}
```

**Key Sections**:
- `action` — Popup UI
- `permissions` — What extension can access
- `host_permissions` — Which websites to inject into
- `content_scripts` — Code to inject in those websites
- `background` — Background worker (less common in V3)

---

## State Management

**Using Zustand for persistence**:

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PopupStore {
  tone: Tone;
  goal: Goal;
  message: string;
  setTone: (tone: Tone) => void;
  setGoal: (goal: Goal) => void;
  setMessage: (message: string) => void;
}

export const usePopupStore = create<PopupStore>()(
  persist(
    (set) => ({
      tone: 'Professional',
      goal: 'Request',
      message: '',
      setTone: (tone) => set({ tone }),
      setGoal: (goal) => set({ goal }),
      setMessage: (message) => set({ message }),
    }),
    {
      name: 'popup-storage', // localStorage key
    }
  )
);
```

**Benefits**:
- Settings persist across sessions
- No backend storage needed
- Local-only, privacy-friendly

---

## Development Workflow

### Hot Module Reload (HMR)

Vite provides fast HMR during development:

```bash
npm run dev
# Watches src/ for changes
# Rebuilds and reloads extension automatically
```

### Build Process

```bash
npm run build
# Creates optimized dist/ folder
# Minified CSS and JS
# Ready for Chrome Web Store
```

### Testing in Chrome

1. Make changes to code
2. Run `npm run build`
3. Go to `chrome://extensions/`
4. Click the refresh icon on Tactly extension
5. Test in Gmail/LinkedIn/etc.

---

## Debugging

### View Console Output

1. Go to `chrome://extensions/`
2. Click "Details" on Tactly extension
3. Look for extension logs in devtools
4. Or: Right-click extension icon → "Inspect popup"

### Content Script Debugging

1. Right-click on page where extension runs
2. Select "Inspect"
3. Go to "Sources" tab
4. Find `content.ts` in extension scripts
5. Set breakpoints and debug

### API Calls

Check network tab:
1. Right-click → Inspect
2. Go to "Network" tab
3. Click Rewrite button
4. See `/api/rewrite` request and response

---

## Common Issues

### Issue: "Unauthorized: Invalid API secret"

**Cause**: `EXTENSION_SECRET` not set correctly

**Fix**:
1. Check `.env` has `TACTLY_EXTENSION_SECRET`
2. Make sure it matches value in main project
3. Rebuild extension: `npm run build`

### Issue: Extension icon not appearing

**Cause**: Manifest permissions incorrect

**Fix**:
1. Check `manifest.json` has correct URLs
2. Rebuild and reload in Chrome
3. Make sure host_permissions match websites

### Issue: Text not injecting into page

**Cause**: Content script not running

**Fix**:
1. Check content_scripts section in manifest
2. Verify `matches` URLs include current site
3. Rebuild and hard refresh page (Ctrl+Shift+R)

### Issue: API call fails silently

**Cause**: Network error or CORS issue

**Fix**:
1. Open console (F12)
2. Look for network errors
3. Check /api/rewrite endpoint is working
4. Verify API secret header is sent

---

## Optimization Tips

### 1. Bundle Size
- Tree-shake unused code
- Lazy load heavy components
- Check with: `npm run analyze`

### 2. Performance
- Minimize API calls
- Cache AI responses (optional)
- Debounce input events

### 3. Security
- Never expose API secret in code
- Use environment variables
- Validate all user input

---

## Publishing to Chrome Web Store

### Prerequisites
- Chrome Developer Account ($5)
- Application zip file (from `dist/`)
- Extension screenshots
- Privacy policy

### Steps

1. **Create Chrome Developer account** at https://chrome.google.com/webstore/devconsole

2. **Prepare files**:
   ```bash
   npm run build
   zip -r tactly-extension.zip dist/
   ```

3. **Upload to Chrome Web Store**:
   - Go to developer console
   - Click "New item"
   - Upload `tactly-extension.zip`
   - Fill in details

4. **Submit for review**:
   - Google reviews extensions (1-7 days)
   - If approved, goes live on Chrome Web Store

---

## Version Management

### Updating Version

Edit `package.json` and `manifest.json`:

```json
{
  "version": "1.0.1"
}
```

Then rebuild:
```bash
npm run build
```

New version is ready for Chrome Web Store.

---

## Future Enhancements

- [ ] Dark mode popup
- [ ] More tone options
- [ ] Message history
- [ ] Favorite rewrites
- [ ] Keyboard shortcuts
- [ ] Settings page
- [ ] Offline mode
- [ ] Multiple language support

---

## Troubleshooting Checklist

- [ ] Extension loaded in `chrome://extensions/`
- [ ] Icon appears in toolbar
- [ ] Main project API running (`npm run dev` in main folder)
- [ ] Environment variables set (TACTLY_EXTENSION_SECRET)
- [ ] Content scripts permissions in manifest
- [ ] No console errors (F12)
- [ ] API endpoint is accessible (test with curl)

---

**For API details, see [API_GUIDE.md](./API_GUIDE.md). For main project setup, see [GETTING_STARTED.md](./GETTING_STARTED.md).**
