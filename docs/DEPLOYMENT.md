# Tactly Deployment Guide

Complete guide to deploying Tactly to production.

## Overview

Tactly uses **Vercel** for hosting:

| Aspect | Details |
|--------|---------|
| **Host** | Vercel (Edge + Serverless) |
| **Region** | Global (auto-optimized) |
| **Auto-Deploy** | From main branch on GitHub |
| **Environment** | Production & Preview |
| **Uptime** | 99.99% SLA |

---

## Current Setup

### Production URL
```
https://tactly.ai
```

### GitHub Connection
```
Repository: https://github.com/mr-rishuraj/tactly
Branch: main (production)
```

### Deployment Status
```
Auto-deployed on every push to main
Preview URLs for pull requests
Rollback available in dashboard
```

---

## Prerequisites

- Vercel account (free tier available)
- GitHub account with repository access
- Environment variables configured
- Node.js 18+ locally

---

## Step-by-Step Deployment

### Option 1: Deploy from GitHub (Recommended)

**Already Set Up** ✅

Every push to `main` branch automatically triggers deployment.

**To redeploy**:
```bash
# Make changes locally
git add .
git commit -m "Your message"
git push origin main
# Vercel auto-deploys (check dashboard)
```

### Option 2: Manual Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option 3: Deploy from Dashboard

1. Go to https://vercel.com/dashboard
2. Select "tactly" project
3. Click "Deployments"
4. Click "Deploy"
5. Choose branch (main)
6. Click "Deploy"

---

## Environment Variables

### Setting in Vercel

1. Go to Vercel Dashboard
2. Select "tactly" project
3. Go to Settings → Environment Variables
4. Add each variable:

```env
# Required for all deployments
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
RESEND_API_KEY=re_...
GEMINI_API_KEY=AIzaSy...
TACTLY_EXTENSION_SECRET=sk_...
```

### Environment Variable Scopes

```
Production (Main)
├─ NEXT_PUBLIC_SUPABASE_URL (visible)
├─ NEXT_PUBLIC_SUPABASE_ANON_KEY (visible)
├─ SUPABASE_SERVICE_ROLE_KEY (secret)
├─ RESEND_API_KEY (secret)
├─ GEMINI_API_KEY (secret)
└─ TACTLY_EXTENSION_SECRET (secret)

Preview (Pull Requests)
├─ NEXT_PUBLIC_* (visible)
└─ Other variables (can use same or test values)

Development (Local)
└─ Use .env.local file (not in git)
```

### Verify Variables

In Vercel dashboard, "Environment Variables" tab shows:
- ✅ Which variables are set
- ✅ Which are visible/secret
- ✅ Scope (production/preview/development)

---

## Deployment Checklist

Before every deployment to production:

### Code Quality
- [ ] Run `npm run type-check` — No TypeScript errors
- [ ] Run `npm run lint` — No linting errors
- [ ] Run `npm run build` — Build succeeds locally
- [ ] Test locally: `npm run dev`
- [ ] Check main branch is up-to-date: `git pull origin main`

### Changes
- [ ] All changes committed to git
- [ ] Commits have meaningful messages
- [ ] No leftover debug code or logs
- [ ] Dependencies updated: `npm update`

### Content
- [ ] Copy/messaging reviewed for typos
- [ ] Links are correct and working
- [ ] Images optimized (checked file sizes)
- [ ] No sensitive data in code or config

### Testing
- [ ] Landing page loads correctly
- [ ] Waitlist form works end-to-end
- [ ] Contact form works end-to-end
- [ ] Mobile responsiveness tested
- [ ] Dark mode works
- [ ] No console errors

### Deployment
- [ ] Environment variables set in Vercel
- [ ] Supabase database is accessible
- [ ] API keys are valid and active
- [ ] Monitoring/logging configured

### Post-Deployment
- [ ] Visit https://tactly.ai and verify
- [ ] Test waitlist signup
- [ ] Test contact form
- [ ] Check analytics (Plausible)
- [ ] Monitor Vercel dashboard for errors

---

## CI/CD Pipeline

### GitHub Actions (Future)

Add `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run type-check
      - run: npm run lint
      - run: npm run build
      
      - uses: vercel/action@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Build Configuration

### Build Command
```bash
npm run build
```

Defined in `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

### Build Time
- Typical: 30-60 seconds
- First build: May be longer
- Cached builds: Faster

### Build Logs

View in Vercel dashboard:
1. Select "tactly" project
2. Go to "Deployments"
3. Click a deployment
4. Check "Build Logs" tab

---

## Preview Deployments

### Pull Requests

When you open a PR on GitHub:
1. Vercel automatically creates a preview
2. Status check appears on PR
3. Click "Preview" to see deployment
4. Share link with team for review

### Preview URL Format
```
https://tactly-BRANCH_NAME-vercel.app
```

Example:
```
https://tactly-feature-login-vercel.app
```

### Test Preview

1. Open preview URL
2. Test all functionality
3. Verify forms work
4. Check mobile responsiveness
5. Leave feedback on PR

---

## Production Monitoring

### Vercel Dashboard

Monitor in real-time:

1. **Deployments** — See all versions
2. **Analytics** — Performance metrics
3. **Functions** — Serverless function logs
4. **Error Tracking** — Sentry integration (future)

### Plausible Analytics

Privacy-friendly analytics:

1. Go to plausible.io/... (dashboard)
2. See real-time visitors
3. Track button clicks
4. Monitor form submissions
5. Analyze user flows

### Error Monitoring

Check Vercel logs for runtime errors:

1. Vercel Dashboard → Deployments
2. Click a deployment
3. Go to "Functions" tab
4. See runtime logs and errors

---

## Rollback Strategy

### Auto-Rollback (If Needed)

If deployment fails:
1. Check "Deployments" in Vercel
2. Click a previous successful deployment
3. Click "Redeploy"
4. Changes are rolled back instantly

### Manual Rollback

```bash
# View deployment history
vercel list

# Redeploy previous version
vercel redeploy
```

### Prevention

To avoid needing rollback:
- ✅ Test locally before pushing
- ✅ Run type-check and lint
- ✅ Use preview deployments for review
- ✅ Monitor production after deploy

---

## Scaling & Performance

### Current Load

- ✅ Vercel handles 1000s of concurrent users
- ✅ Auto-scales on traffic spikes
- ✅ Cold starts < 500ms
- ✅ Global CDN for static assets

### Monitor Performance

In Vercel Analytics:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)

### Optimize if Needed

- Use Image optimization
- Lazy-load heavy components
- Minify CSS/JS
- Cache assets aggressively

---

## Custom Domain

### Current
```
https://tactly.ai
```

### If Adding Subdomains

1. Vercel Dashboard → Settings → Domains
2. Add new domain
3. Update DNS records
4. Verify domain

Example:
```
tactly.ai          → Main site
blog.tactly.ai     → Blog
api.tactly.ai      → API docs
```

---

## Security for Production

### HTTPS

✅ **Enabled by default** — Vercel provides free SSL certificates

### Headers & Security

Configure in `next.config.ts`:

```typescript
export default {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ];
  }
};
```

### Rate Limiting

Future enhancement using Vercel KV:

```typescript
import { Ratelimit } from '@vercel/kv';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '60 s'),
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for');
  const { success } = await ratelimit.limit(ip!);
  
  if (!success) {
    return new Response('Rate limited', { status: 429 });
  }
  
  // Handle request
}
```

---

## Troubleshooting Deployments

### Deployment Fails

**Check**:
1. Build logs in Vercel dashboard
2. TypeScript errors: `npm run type-check`
3. Linting errors: `npm run lint`
4. Missing dependencies: `npm install`

**Fix**:
```bash
# Locally reproduce and fix
npm run build

# Commit fix
git commit -m "Fix build error"
git push origin main

# Vercel auto-redeploys
```

### Environment Variables Missing

**Error**: `Cannot find module or missing env var`

**Check**:
1. Vercel → Settings → Environment Variables
2. All required vars are set
3. Correctly spelled and scoped

**Fix**:
```bash
# Add missing variable in Vercel dashboard
# Then redeploy
vercel --prod
```

### Build Timeout

**Error**: Build exceeds 45-minute limit

**Check**:
1. Large dependencies?
2. Slow build process?
3. Recursive builds?

**Fix**:
```bash
# Optimize locally
npm run build  # Should complete < 1 min

# Check bundle size
npm run build -- --analyze
```

### 502 Bad Gateway

**Error**: Deployed site returns 502

**Check**:
1. Function logs in Vercel
2. Database connection working?
3. API keys valid?

**Fix**:
1. Check environment variables in Vercel
2. Verify Supabase is accessible
3. Redeploy: `vercel --prod`

---

## Post-Deployment Tasks

### After Successful Deploy

- [ ] Visit production URL
- [ ] Test core functionality
- [ ] Check Plausible analytics
- [ ] Monitor Vercel dashboard
- [ ] Announce in team/community (if launching)

### Monitor for 24 Hours

- [ ] Watch error logs
- [ ] Monitor performance metrics
- [ ] Track analytics
- [ ] Be ready to rollback if issues

### Weekly Check-ins

- [ ] Review Vercel analytics
- [ ] Check Plausible stats
- [ ] Monitor waitlist growth
- [ ] Review contact form submissions

---

## Deployment Commands Reference

```bash
# Local build (verify before deploy)
npm run build

# Local preview of production build
npm run start

# Type checking
npm run type-check

# Linting
npm run lint

# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Deploy to preview
vercel

# View deployments
vercel list

# Rollback
vercel rollback
```

---

## Costs & Limits

### Vercel Pricing

- **Hobby (Free)**: 100GB bandwidth/month
- **Pro**: $20/month, unlimited bandwidth
- **Enterprise**: Custom pricing

### Current Plan

- ✅ Using Hobby/Pro plan
- ✅ Sufficient for MVP
- ✅ Upgrade if needed

### Bandwidth Usage

Monitor in Vercel Analytics:
- Storage used
- Bandwidth used
- Function invocations
- Build minutes

---

## Disaster Recovery

### Database Backup

Supabase auto-backups:
- Daily backups (30-day retention)
- Point-in-time recovery
- Contact Supabase for restore

### Code Backup

GitHub is your backup:
```bash
# Clone fresh copy anytime
git clone https://github.com/mr-rishuraj/tactly.git
```

### Rollback to Previous Version

```bash
# In Vercel dashboard
Deployments → Select previous version → Redeploy
```

---

**For development setup, see [GETTING_STARTED.md](./GETTING_STARTED.md). For architecture details, see [ARCHITECTURE.md](./ARCHITECTURE.md).**
