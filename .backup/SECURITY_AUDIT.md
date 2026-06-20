# Security Audit Report - Tactly
**Date:** June 12, 2026  
**Status:** Ready for public with minor security improvements needed

---

## 🟡 MEDIUM PRIORITY ISSUES

### 1. **CORS Configuration Too Permissive** ⚠️
**File:** `src/app/api/rewrite/route.ts` (Line 7)
```typescript
'Access-Control-Allow-Origin': '*',  // ❌ Allows requests from ANY domain
```
**Risk:** Allows any website to call your API, potentially leading to abuse  
**Fix:** Restrict to specific origins
```typescript
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_EXTENSION_URL || 'https://tactly-extension.vercel.app',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Tactly-Secret',
}
```

### 2. **API Key Exposed in Error Messages** 
**File:** `src/app/api/rewrite/route.ts` (Line 90)
```typescript
{ error: 'AI service error', detail: message }  // ❌ detail contains error details
```
**Risk:** If Gemini API errors contain sensitive info, it gets sent to client  
**Fix:** Hide detailed error info in production
```typescript
const detail = process.env.NODE_ENV === 'production' ? 'Service temporarily unavailable' : message
return Response.json(
  { error: 'AI service error', detail },
  { status: 502, headers: CORS_HEADERS }
)
```

### 3. **Missing CSRF Protection**
**All POST endpoints** lack CSRF tokens  
**Risk:** Low on API, but important if forms are added  
**Recommendation:** Already protected by Next.js by default (good!), but monitor for form-based endpoints

### 4. **No Rate Limiting on API Endpoints**
**Files:** All three endpoints (`waitlist`, `contact`, `rewrite`)  
**Risk:** 
- Spam submissions to waitlist/contact
- DDoS attacks on rewrite endpoint
**Fix:** Implement rate limiting with Vercel Middleware or a package like `ratelimit`:
```typescript
import { Ratelimit } from '@upstash/ratelimit'
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'),
})
const { success } = await ratelimit.limit(req.ip!)
if (!success) return NextResponse.json({ error: 'Rate limited' }, { status: 429 })
```

---

## 🟢 LOW PRIORITY (Good Practices)

### 5. **Supabase Service Role Key in Runtime Code**
**Files:** `src/app/api/waitlist/route.ts`, `src/app/api/contact/route.ts`  
**Current:** Using `SUPABASE_SERVICE_ROLE_KEY` in Node.js runtime ✓ (Secure)  
**Why it's safe:** Service role key is in `.env.local`, not exposed publicly  
**Best practice:** Continue using service role only in server-side routes

### 6. **Email Regex Validation**
**Pattern:** `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`  
**Status:** Basic but functional  
**Optional improvement:** Use RFC 5322 compliant regex or email validation library
```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// OR use a library
import { isEmail } from 'validator'
if (!isEmail(email)) { ... }
```

### 7. **No API Versioning**
**Current routes:** `/api/waitlist`, `/api/contact`, `/api/rewrite`  
**Recommendation:** Consider adding `/api/v1/` prefix for future compatibility

---

## ✅ SECURITY STRENGTHS

1. **Environment Variables Protected**: `.env*` properly in `.gitignore`
2. **Input Validation**: All endpoints validate email, message length, types
3. **No SQL Injection Risk**: Using Supabase SDK (parameterized queries)
4. **No XSS in User Input**: Data is stored as-is, rendered safely via Next.js
5. **Service Role Key Usage**: Correctly limited to server-side only
6. **Shared Secret Protection**: `/api/rewrite` uses `X-Tactly-Secret` header
7. **Error Handling**: Proper error messages without leaking internals (mostly)

---

## 🔧 DEPENDENCY VULNERABILITIES

### PostCSS Vulnerability (Moderate)
**Issue:** PostCSS <8.5.10 has XSS vulnerability  
**Current:** Next.js 16.2.7 includes vulnerable version  
**Status:** Not blocking, but should monitor  
**Action:** Next.js will auto-update when they release a patch

---

## 📋 BEFORE GOING PUBLIC CHECKLIST

- [ ] **Enable HTTPS** (Vercel does this by default ✓)
- [ ] **Set production environment variables** in Vercel dashboard
- [ ] **Fix CORS to restrict origins** (see issue #1 above)
- [ ] **Hide detailed error messages** in production (see issue #2)
- [ ] **Add rate limiting** to prevent spam/DDoS
- [ ] **Set up monitoring** - Check logs for API abuse
- [ ] **Review Supabase RLS policies** - Ensure data access is restricted
- [ ] **Test form spam** - Submit many times to ensure it's handled
- [ ] **Test API abuse** - Verify rate limiting works
- [ ] **Verify email sending** - Confirm Resend is properly configured
- [ ] **Monitor API costs** - Gemini API can be expensive with heavy usage

---

## 🚀 RECOMMENDED FIXES (Priority Order)

### P0 (Critical)
1. Fix CORS to restrict to your extension only

### P1 (High)
2. Add rate limiting to all endpoints
3. Hide error details in production

### P2 (Medium)
4. Monitor Supabase RLS policies
5. Set up logging/monitoring for API abuse

### P3 (Low)
6. Improve email regex validation
7. Consider API versioning

---

## 🔐 Supabase Security Check

**Current Setup:**
- Using public anon key in frontend (expected)
- Using service role key in backend (correct)

**Recommended RLS Policies:**
```sql
-- For waitlist table:
-- Public: INSERT only (anyone can add themselves)
-- Private: SELECT/UPDATE/DELETE for authenticated admin users only

-- For contacts table:
-- Public: INSERT only (anyone can submit)
-- Private: SELECT for authenticated admin only
```

---

## 📞 Monitoring Recommendations

1. **API Logs**: Monitor `/api/*` endpoints for unusual patterns
2. **Database**: Set up Supabase alerts for unusual queries
3. **Email**: Monitor Resend for bounce/complaint rates
4. **Costs**: Set budget alerts on Gemini API and Supabase

---

## Summary

**Overall Security Grade: B+**

Your app is generally well-secured for a public launch. Main concerns:
1. CORS is too permissive
2. Missing rate limiting
3. Error details exposed

All can be fixed in under 1 hour. No critical vulnerabilities found.

**Safe to launch after fixing P0 issues above.**
