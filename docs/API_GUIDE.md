# Tactly API Guide

Complete reference for all Tactly API endpoints.

## Base URL

```
Production: https://tactly.ai/api
Development: http://localhost:3000/api
```

---

## Endpoints Overview

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/waitlist` | POST | None | Join waitlist |
| `/api/contact` | POST | None | Send contact message |
| `/api/rewrite` | POST | Secret | Rewrite message (AI) |

---

## 1. Waitlist Endpoint

### `POST /api/waitlist`

**Purpose**: Add user to waitlist and send confirmation email.

### Request

```bash
curl -X POST https://tactly.ai/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "persona": "Professional",
    "useCase": "Email"
  }'
```

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "email": "user@example.com",        // Required: Valid email
  "persona": "Professional",          // Optional: Tone preference
  "useCase": "Email"                  // Optional: Where they'll use it
}
```

**Validation**:
- `email` — Must be valid email format, must not already exist
- `persona` — One of: Professional, Casual, Friendly, Formal, Humorous
- `useCase` — One of: Email, LinkedIn, Slack, Twitter, SMS, Other

### Response

**Success (200)**:
```json
{
  "success": true,
  "message": "Confirmation email sent",
  "data": {
    "id": 123,
    "email": "user@example.com",
    "created_at": "2026-06-25T10:30:00Z"
  }
}
```

**Error — Email Already Exists (400)**:
```json
{
  "success": false,
  "error": "Email already on waitlist"
}
```

**Error — Invalid Input (400)**:
```json
{
  "success": false,
  "error": "Invalid email format"
}
```

**Error — Server Error (500)**:
```json
{
  "success": false,
  "error": "Database error. Please try again."
}
```

### Email Sent

When user joins waitlist, they receive:

**From**: Tactly <onboarding@resend.dev>  
**Subject**: Welcome to Tactly! 🎉  
**Content**:
```
Hi there!

Thanks for joining Tactly's waitlist. We're excited to have you!

You're now first in line for early access to our communication assistant.

Soon, you'll be able to:
- Rewrite messages in your preferred tone
- Use Hinglish support
- Get AI suggestions on the fly

Stay tuned! We'll notify you as soon as access is available.

Best,
The Tactly Team

usetactly.ai@gmail.com
```

---

## 2. Contact Endpoint

### `POST /api/contact`

**Purpose**: Send a contact form message and receive support.

### Request

```bash
curl -X POST https://tactly.ai/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I have a feature request...",
    "type": "feedback"
  }'
```

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "name": "John Doe",              // Required: User name
  "email": "john@example.com",     // Required: Email to reply to
  "message": "Your message here",  // Required: Message content
  "type": "feedback"               // Optional: Message category
}
```

**Validation**:
- `name` — 1-100 characters
- `email` — Valid email format
- `message` — 10-5000 characters
- `type` — One of: feedback, support, partnership, general

### Response

**Success (200)**:
```json
{
  "success": true,
  "message": "Message received. We'll get back to you soon!",
  "data": {
    "id": 456,
    "email": "john@example.com",
    "created_at": "2026-06-25T10:35:00Z"
  }
}
```

**Error — Missing Fields (400)**:
```json
{
  "success": false,
  "error": "Missing required field: message"
}
```

**Error — Message Too Short (400)**:
```json
{
  "success": false,
  "error": "Message must be at least 10 characters"
}
```

**Error — Server Error (500)**:
```json
{
  "success": false,
  "error": "Failed to send message. Please try again."
}
```

### Admin Notification

When contact form submitted, admin receives:

**From**: Resend  
**To**: usetactly.ai@gmail.com  
**Subject**: New Contact: {type} from {name}  
**Content**:
```
New contact message:

Name: John Doe
Email: john@example.com
Type: feedback
Date: 2026-06-25 10:35 UTC

Message:
I have a feature request...

---
Reply directly to: john@example.com
```

---

## 3. Rewrite Endpoint (AI)

### `POST /api/rewrite`

**Purpose**: Rewrite a message using AI with specified tone and goal.

### Authentication

**Required Header**:
```
X-Tactly-Secret: your_secret_key
```

The secret key must match `TACTLY_EXTENSION_SECRET` environment variable.

### Request

```bash
curl -X POST https://tactly.ai/api/rewrite \
  -H "Content-Type: application/json" \
  -H "X-Tactly-Secret: sk_123456789" \
  -d '{
    "message": "Hey, can you send that file?",
    "tone": "Professional",
    "goal": "Request",
    "platform": "Email"
  }'
```

**Headers**:
```
Content-Type: application/json
X-Tactly-Secret: sk_123456789
```

**Body**:
```json
{
  "message": "Hey, can you send that file?",  // Required: Message to rewrite
  "tone": "Professional",                     // Required: Tone
  "goal": "Request",                          // Required: Communication goal
  "platform": "Email"                         // Optional: Platform context
}
```

**Validation**:
- `message` — 3-5000 characters
- `tone` — One of: Professional, Casual, Friendly, Formal, Humorous
- `goal` — One of: Request, Inform, Persuade, Apologize, Thank
- `platform` — One of: Email, LinkedIn, Slack, Twitter, SMS, Other

### Response

**Response Type**: Server-Sent Events (SSE) Stream

The response is streamed in real-time as the AI generates text:

```
HTTP/1.1 200 OK
Content-Type: text/event-stream
Transfer-Encoding: chunked

data: "Could you"
data: " please"
data: " send"
data: " that"
data: " file?"
data: "\n[DONE]"
```

**Processing**:
1. Client opens connection
2. Server streams tokens in real-time
3. Client displays text as it arrives
4. Connection closes when `[DONE]` received

### Error Responses

**Invalid Secret (401)**:
```json
{
  "error": "Unauthorized: Invalid API secret"
}
```

**Invalid Input (400)**:
```json
{
  "error": "Missing required field: tone"
}
```

**API Error (500)**:
```json
{
  "error": "AI service unavailable. Please try again."
}
```

### Example Implementation (JavaScript)

```javascript
async function rewriteMessage(message, tone, goal, platform, secret) {
  const response = await fetch('/api/rewrite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Tactly-Secret': secret
    },
    body: JSON.stringify({
      message,
      tone,
      goal,
      platform
    })
  });

  const reader = response.body.getReader();
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
        if (data === '[DONE]') {
          return result;
        }
        result += JSON.parse(`"${data}"`);
      }
    }
  }
}

// Usage
const rewritten = await rewriteMessage(
  'Hey, can you send that file?',
  'Professional',
  'Request',
  'Email',
  'sk_123456789'
);
console.log(rewritten);  // "Could you please send that file?"
```

### Rate Limiting

Currently no rate limiting, but planned for future:

```
Anticipated Limits (Phase 2):
- 100 requests per minute (per IP)
- 10,000 requests per day (per user account)
- 429 Too Many Requests if exceeded
```

---

## Response Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Valid request processed |
| 400 | Bad Request | Missing/invalid fields |
| 401 | Unauthorized | Invalid API secret |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Internal error |

---

## Error Handling

### General Pattern

All endpoints return consistent error format:

```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

### Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `Invalid email format` | Email doesn't match regex | Validate on client |
| `Email already on waitlist` | Duplicate signup | Check DB first |
| `Missing required field` | Empty or missing field | Validate all fields |
| `Message too short/long` | Length constraints violated | Trim or truncate |
| `Unauthorized` | Wrong/missing secret key | Check env variable |
| `Database error` | Connection/query failed | Retry or contact support |
| `AI service unavailable` | Gemini API down | Retry later |

---

## Environment Variables

For API to work, these must be set:

```env
# Supabase (Database)
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email (Resend)
RESEND_API_KEY=your_resend_key

# AI (Gemini)
GEMINI_API_KEY=your_gemini_key

# Extension Auth
TACTLY_EXTENSION_SECRET=sk_your_secret_here
```

---

## Rate Limiting Strategy

Currently: **No rate limiting**

Recommended for production:
```typescript
// Using Vercel KV (future)
import { kv } from '@vercel/kv';

async function checkRateLimit(ip: string) {
  const count = await kv.incr(`rate:${ip}`);
  if (count === 1) {
    await kv.expire(`rate:${ip}`, 60);  // 1 minute window
  }
  return count <= 100;  // 100 per minute
}
```

---

## Testing

### Using cURL

**Test Waitlist**:
```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "persona": "Professional"
  }'
```

**Test Contact**:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

**Test Rewrite**:
```bash
curl -X POST http://localhost:3000/api/rewrite \
  -H "Content-Type: application/json" \
  -H "X-Tactly-Secret: test-secret" \
  -d '{
    "message": "Hey, how are you?",
    "tone": "Professional",
    "goal": "Inform"
  }'
```

### Using Postman

1. Import the following collection
2. Set environment variables (base URL, secret)
3. Run requests

[API Postman Collection](https://www.postman.com/... coming soon)

---

## CORS Configuration

Allowed origins:
```
http://localhost:3000       (dev)
https://tactly.ai          (production)
https://*.tactly.ai        (subdomains)
chrome-extension://...     (extension manifest ID)
```

For extension, add to `manifest.json`:
```json
{
  "host_permissions": [
    "https://tactly.ai/*"
  ]
}
```

---

## Monitoring & Logging

### Vercel Logs
Access via Vercel dashboard:
- Deployment logs
- Runtime logs
- Error logs
- Performance metrics

### Sentry Integration (Planned)
For error tracking and monitoring (Phase 2).

---

## Changelog

### v1.0 (Current)
- [x] Waitlist endpoint
- [x] Contact endpoint
- [x] Rewrite endpoint (SSE)
- [x] Database integration
- [x] Email notifications

### v1.1 (Planned)
- [ ] Rate limiting
- [ ] Request logging
- [ ] Analytics tracking
- [ ] Webhook support

### v2.0 (Planned)
- [ ] Public API key system
- [ ] Quota management
- [ ] Advanced analytics
- [ ] Custom integrations

---

**For extension implementation details, see [EXTENSION_GUIDE.md](./EXTENSION_GUIDE.md).**
