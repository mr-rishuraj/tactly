# Tactly Troubleshooting Guide

Common issues and how to fix them.

---

## Setup & Installation

### Issue: `npm install` fails

**Error**:
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions**:

1. **Clear cache**:
   ```bash
   npm cache clean --force
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

2. **Use legacy peer deps** (temporary):
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Check Node version**:
   ```bash
   node --version  # Should be 18+
   nvm install 18  # If outdated
   nvm use 18
   ```

---

### Issue: `.env.local` not loading

**Error**:
```
Error: Missing environment variable: NEXT_PUBLIC_SUPABASE_URL
```

**Solutions**:

1. **File exists**:
   ```bash
   ls -la .env.local  # Should exist
   ```

2. **Create from template**:
   ```bash
   cp .env.local.example .env.local
   ```

3. **Fill in values**:
   - Open `.env.local`
   - Add all required keys
   - Save file
   - Restart dev server

4. **Check gitignore**:
   ```bash
   grep ".env.local" .gitignore  # Should be there
   ```

---

### Issue: Port 3000 already in use

**Error**:
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions**:

1. **Use different port**:
   ```bash
   npm run dev -- -p 3001
   # Open http://localhost:3001
   ```

2. **Kill process on port 3000**:
   ```bash
   # macOS/Linux
   lsof -ti:3000 | xargs kill -9
   
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID [PID] /F
   ```

3. **Restart computer** (nuclear option):
   ```bash
   # System restart usually frees ports
   ```

---

## Development Server

### Issue: Hot reload not working

**Symptoms**: Changes to code don't appear in browser

**Solutions**:

1. **Hard refresh browser**:
   ```
   Ctrl+Shift+R (Windows/Linux)
   Cmd+Shift+R (macOS)
   ```

2. **Clear .next folder**:
   ```bash
   rm -rf .next
   npm run dev
   ```

3. **Check file was saved**:
   - Verify editor saved the file
   - Check file modification time: `ls -l src/app/page.tsx`

4. **Restart dev server**:
   ```bash
   # Stop: Ctrl+C
   # Start: npm run dev
   ```

---

### Issue: Styles not updating

**Symptoms**: Tailwind CSS changes don't appear

**Solutions**:

1. **Clear Tailwind cache**:
   ```bash
   rm -rf .next node_modules/.cache
   npm run dev
   ```

2. **Check file is in template paths**:
   
   In `tailwind.config.ts`:
   ```typescript
   content: [
     './src/**/*.{js,ts,jsx,tsx}',  // Check this matches your file
   ],
   ```

3. **Restart dev server**:
   ```bash
   Ctrl+C
   npm run dev
   ```

4. **Hard refresh in browser**:
   ```
   Cmd+Shift+R (macOS)
   Ctrl+Shift+R (Windows)
   ```

---

## TypeScript & Linting

### Issue: TypeScript errors won't go away

**Error**:
```
Type 'string' is not assignable to type 'Tone'
```

**Solutions**:

1. **Run type-check**:
   ```bash
   npm run type-check
   ```

2. **Check types file**:
   ```bash
   # Make sure types are defined in lib/rewrite-types.ts
   cat src/lib/rewrite-types.ts
   ```

3. **Use type assertion** (if sure):
   ```typescript
   const tone = 'Professional' as Tone;
   ```

4. **Restart TypeScript server** (in editor):
   - VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"

---

### Issue: Linting errors

**Error**:
```
/src/components/hero.tsx
  5:10  error  'React' is defined but never used
```

**Solutions**:

1. **Auto-fix**:
   ```bash
   npm run lint --fix
   ```

2. **Manual fix**:
   - Remove unused import: `import React from 'react'`
   - Most components don't need React import (Next.js 13+)

3. **Check eslint config**:
   ```bash
   cat .eslintrc.json
   ```

---

## Forms & API

### Issue: Waitlist form not submitting

**Symptoms**: Click button, nothing happens

**Solutions**:

1. **Check console for errors**:
   ```
   F12 → Console tab → Look for red errors
   ```

2. **Verify API endpoint exists**:
   ```bash
   curl -X POST http://localhost:3000/api/waitlist \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```

3. **Check network tab**:
   ```
   F12 → Network tab → Click submit → Look for POST request
   Check status (should be 200, 400, or 500)
   ```

4. **Test with valid data**:
   - Email format: `test@example.com` (not `test@example`)
   - Unique email: Email shouldn't already exist

5. **Check Supabase connection**:
   ```typescript
   // In route handler, add console.log
   console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
   ```

---

### Issue: "Email already exists" error

**Error**: When joining waitlist

**Solutions**:

1. **Use different email**:
   - Each email can only join once
   - Use a new email address

2. **Check database**:
   - Ask admin to check Supabase
   - Find your email in waitlist table

3. **Contact support**:
   ```
   Email: usetactly.ai@gmail.com
   Subject: Please remove my email from waitlist
   ```

---

### Issue: Contact form not sending email

**Symptoms**: Form submits but no email received

**Solutions**:

1. **Check Resend API key**:
   ```bash
   # In Vercel dashboard, verify RESEND_API_KEY is set
   # Check Resend dashboard: https://resend.com/emails
   ```

2. **Check recipient email**:
   ```bash
   # Contact goes to: usetactly.ai@gmail.com
   # Check that inbox (Gmail)
   ```

3. **Test manually**:
   ```bash
   curl -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name":"Test User",
       "email":"test@example.com",
       "message":"This is a test"
     }'
   ```

4. **Check Vercel logs**:
   - Vercel Dashboard → Deployments → Click a deployment
   - Go to "Functions" → Look for `/api/contact` errors

---

## Database Issues

### Issue: Database connection fails

**Error**:
```
Error: [POSTGRES] FATAL: password authentication failed for user "postgres"
```

**Solutions**:

1. **Check environment variables**:
   ```bash
   echo $NEXT_PUBLIC_SUPABASE_URL
   echo $SUPABASE_SERVICE_ROLE_KEY
   ```

2. **Get fresh credentials**:
   - Go to https://supabase.com/dashboard
   - Settings → API → Copy keys again
   - Update `.env.local`
   - Restart dev server

3. **Check IP allowlist** (if production):
   - Supabase → Settings → Database
   - Add your IP to allowlist

---

### Issue: Data not saving to database

**Symptoms**: Form submits successfully, but data not in database

**Solutions**:

1. **Check RLS policies**:
   ```sql
   -- In Supabase SQL editor, run:
   SELECT * FROM pg_policies WHERE tablename = 'waitlist';
   ```

2. **Verify table exists**:
   ```sql
   SELECT * FROM waitlist LIMIT 1;
   ```

3. **Check API logs**:
   ```
   F12 → Network → POST /api/waitlist → Response
   ```

4. **Test with Supabase client directly**:
   ```typescript
   const { data, error } = await supabase
     .from('waitlist')
     .select()
   console.log(error);
   ```

---

## Authentication & Secrets

### Issue: API returns "Unauthorized"

**Error** (from extension API):
```json
{"error": "Unauthorized: Invalid API secret"}
```

**Solutions**:

1. **Check secret is set**:
   ```bash
   # In Vercel dashboard
   Settings → Environment Variables
   Look for: TACTLY_EXTENSION_SECRET
   ```

2. **Rebuild extension**:
   ```bash
   cd ../tactly-extension
   npm run build
   rm dist/*  # Clear old build
   npm run build
   ```

3. **Check header is sent**:
   ```typescript
   // In extension API call:
   headers: {
     'X-Tactly-Secret': EXTENSION_SECRET  // Must match env var
   }
   ```

---

### Issue: Secrets visible in error messages

**Danger**: Never expose secrets in errors!

**Solutions**:

1. **Check error handling**:
   ```typescript
   // Bad:
   throw new Error(`API key: ${api_key} failed`);
   
   // Good:
   throw new Error(`API authentication failed`);
   ```

2. **Check logs**:
   - Vercel Function logs
   - Browser console
   - Server logs
   - Commit history

3. **Rotate secrets if exposed**:
   ```bash
   # Update in Vercel dashboard
   # Update in .env.local
   # Redeploy
   ```

---

## Extension Issues

### Issue: Extension icon not appearing

**Symptoms**: Icon missing from Chrome toolbar

**Solutions**:

1. **Load extension**:
   - Chrome: `chrome://extensions/`
   - Developer mode: ON (top right)
   - Load unpacked → select `dist/` folder
   - Should appear in toolbar

2. **Check manifest**:
   ```bash
   # In ../tactly-extension
   cat manifest.json  # Should exist
   ```

3. **Check build**:
   ```bash
   cd ../tactly-extension
   npm run build
   # Check dist/ folder exists
   ls -la dist/
   ```

---

### Issue: Extension can't access page content

**Symptoms**: "Use Rewrite" button doesn't inject text

**Solutions**:

1. **Check manifest permissions**:
   ```json
   "host_permissions": [
     "https://gmail.google.com/*",
     "https://www.linkedin.com/*"
   ]
   ```

2. **Verify on correct site**:
   - Works on: Gmail, LinkedIn, Twitter, Slack
   - Doesn't work on: Other sites (by design)

3. **Hard refresh page**:
   ```
   Cmd+Shift+R (macOS)
   Ctrl+Shift+R (Windows)
   ```

4. **Reload extension**:
   - Chrome: `chrome://extensions/`
   - Click refresh icon on Tactly
   - Try again

---

### Issue: API call timeout or fails

**Symptoms**: Rewrite button hangs or shows error

**Solutions**:

1. **Check network tab**:
   - F12 → Network tab
   - Click "Rewrite"
   - Look for `/api/rewrite` request
   - Check status (timeout = -1, error = 500, etc.)

2. **Check API is running**:
   ```bash
   # In main project
   npm run dev
   curl http://localhost:3000/api/rewrite ...
   ```

3. **Check Gemini API quota**:
   - Go to https://ai.google.dev/
   - Check API key is active
   - Check usage quota

4. **Check secret matches**:
   ```bash
   # In main project .env.local
   grep TACTLY_EXTENSION_SECRET .env.local
   
   # In extension code
   grep EXTENSION_SECRET ../tactly-extension/src -r
   # Should match
   ```

---

## Build & Deployment

### Issue: Build fails locally

**Error**:
```
$ npm run build
> next build

Build error occurred
Error: Expected 1 arguments, but got 0.
```

**Solutions**:

1. **Type-check first**:
   ```bash
   npm run type-check
   ```

2. **Check TypeScript errors**:
   - Fix all reported errors
   - Don't use `any` unless necessary

3. **Check for circular imports**:
   ```bash
   # Look for imports that depend on each other
   # Move shared code to lib/
   ```

4. **Clean and rebuild**:
   ```bash
   rm -rf .next node_modules/.cache
   npm run build
   ```

---

### Issue: Deployment fails on Vercel

**Solutions**:

1. **Check build logs**:
   - Vercel Dashboard → Deployments
   - Click failed deployment
   - View "Build Logs" tab

2. **Reproduce locally**:
   ```bash
   npm run build  # Should succeed
   ```

3. **Check environment variables**:
   - Vercel Dashboard → Settings → Environment Variables
   - Make sure all required vars are set
   - Values should match local `.env.local`

4. **Check dependencies**:
   ```bash
   npm install --legacy-peer-deps (if needed)
   npm audit
   ```

---

### Issue: Production site shows 502 error

**Symptoms**: Live site returns "502 Bad Gateway"

**Solutions**:

1. **Check database connection**:
   - Vercel → Deployments → Click deployment
   - Functions logs → Look for DB errors
   - Test Supabase connection

2. **Check API keys**:
   - All environment variables set in Vercel?
   - Keys are valid and active?
   - Try rotating keys

3. **Rollback**:
   ```bash
   # In Vercel dashboard
   Deployments → Select previous version → Redeploy
   ```

4. **Check recent changes**:
   - What changed since last working version?
   - Does it work locally?

---

## Performance Issues

### Issue: Site loading slowly

**Symptoms**: Takes 10+ seconds to load

**Solutions**:

1. **Check Network tab**:
   ```
   F12 → Network → Check slow requests
   ```

2. **Measure Core Web Vitals**:
   - Use PageSpeed Insights: https://pagespeed.web.dev/
   - Vercel Analytics: Dashboard → Analytics
   - Lighthouse: F12 → Lighthouse tab

3. **Optimize images**:
   - Use Next.js Image component
   - Compress images before upload
   - Check file sizes: < 100KB

4. **Lazy-load components**:
   ```typescript
   const HeavyComponent = dynamic(() => import('./Heavy'));
   ```

---

### Issue: CPU usage high

**Symptoms**: Dev server using 100% CPU

**Solutions**:

1. **Check for infinite loops**:
   ```bash
   # Find heavy computation
   # Add console.log to see what's running
   ```

2. **Disable Plausible in dev**:
   ```typescript
   // In layout.tsx
   if (process.env.NODE_ENV !== 'production') {
     // Don't load Plausible
   }
   ```

3. **Restart dev server**:
   ```bash
   Ctrl+C
   npm run dev
   ```

---

## General Tips

### 1. Always Check the Console

```
F12 → Console tab
Look for red errors
Red = Error, Yellow = Warning
```

### 2. Network Tab is Your Friend

```
F12 → Network tab
Click what you're testing
Check request/response
Look for red (errors) or slow (>1s)
```

### 3. Search GitHub Issues

Before reporting a bug:
```
https://github.com/mr-rishuraj/tactly/issues
Search for your error message
```

### 4. Clear Cache When Stuck

```bash
rm -rf .next node_modules/.cache
npm run dev
```

### 5. Restart Everything

When really stuck:
```bash
# Kill processes
Ctrl+C (in terminal)

# Clear caches
rm -rf .next node_modules/.cache

# Reinstall
npm install

# Restart
npm run dev
```

---

## Still Stuck?

### Get Help

1. **Check documentation**:
   - [GETTING_STARTED.md](./GETTING_STARTED.md)
   - [ARCHITECTURE.md](./ARCHITECTURE.md)
   - [API_GUIDE.md](./API_GUIDE.md)

2. **Search issues**:
   - GitHub: https://github.com/mr-rishuraj/tactly/issues

3. **Contact support**:
   ```
   Email: usetactly.ai@gmail.com
   Subject: [Help] Your issue title
   
   Include:
   - What you tried
   - Error message
   - Steps to reproduce
   - Your environment (OS, Node version, etc.)
   ```

---

**Remember**: Most issues are solvable! Don't give up. 💪**
