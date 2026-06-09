# Tactly Waitlist Implementation Guide

This document outlines how to complete the production-ready waitlist system for Tactly.

## ✅ What's Implemented

- **Modal Component**: `src/components/waitlist-modal.tsx`
  - Clean, dark design matching Tactly aesthetics
  - Form with email, persona, and use case fields
  - Success and error states
  - Smooth animations

- **Context Provider**: `src/contexts/waitlist-context.tsx`
  - Centralized modal state management
  - Used by all buttons across the site

- **API Route**: `src/app/api/waitlist/route.ts`
  - POST endpoint at `/api/waitlist`
  - Email validation
  - Duplicate detection
  - Supabase integration
  - Resend email confirmation

- **Button Integration**:
  - Navbar "Waitlist" button
  - Navbar mobile "Join Waitlist" button
  - Hero section "Join Waitlist" button
  - All connected to the same modal

- **Database Schema**: `supabase-waitlist-schema.sql`
  - Ready-to-run SQL for Supabase

---

## 🔧 Setup Instructions

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for project to initialize
4. Go to **SQL Editor**
5. Copy and paste the contents of `supabase-waitlist-schema.sql`
6. Click "Run" to create the table

### Step 2: Get Supabase Credentials

1. In your Supabase project, go to **Settings > API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

### Step 3: Set Up Resend Email

1. Go to [resend.com](https://resend.com)
2. Create an account (free tier available)
3. Create a project
4. Go to **API Keys** and copy your API key
5. **Important**: You need a custom domain to use from addresses. Options:
   - Use `hello@tactly.com` (requires domain ownership)
   - Or use Resend's default domain for testing

### Step 4: Add Environment Variables

1. Copy `.env.local.example` → `.env.local`
2. Fill in the values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxx...
RESEND_API_KEY=re_xxx...
```

3. Save the file (it's in `.gitignore`, so it won't be committed)

### Step 5: Restart Dev Server

```bash
npm run dev
```

---

## 🧪 Testing the Waitlist

### Test Locally

1. Open http://localhost:3000
2. Click any "Join Waitlist" button
3. Modal should appear
4. Fill in form with test email (e.g., `test@example.com`)
5. Submit
6. Check Supabase dashboard → `waitlist` table for the entry
7. Check your email for confirmation from Resend

### Test Duplicate Prevention

1. Try submitting the same email again
2. Should show: "Looks like you're already on the waitlist."

### Verify Email Sending

1. In Resend dashboard, you should see email sent
2. Check spam folder if email doesn't arrive
3. Test with real email to verify delivery

---

## 📊 Viewing Waitlist Entries

### In Supabase

1. Go to your project
2. Click **Table Editor** (or SQL Editor)
3. Select `waitlist` table
4. See all signups with email, persona, use case, and timestamp

### Export Data

```sql
-- Export as CSV in Supabase
SELECT email, persona, use_case, created_at FROM waitlist ORDER BY created_at DESC;
```

---

## 🚀 Production Deployment

### On Vercel

1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel project settings
4. Deploy

### Production Checklist

- [ ] Supabase project created and secured
- [ ] Resend custom domain set up (optional but recommended)
- [ ] Environment variables added to Vercel
- [ ] Test waitlist submission in production
- [ ] Set up email monitoring
- [ ] Plan for scaling (batch exports, email campaigns)

---

## 💡 Next Steps

### Coming Soon (Not Included)

These are intentionally not included to keep the system simple:

- ❌ Admin dashboard (use Supabase directly)
- ❌ Referral system (can add later if needed)
- ❌ Waitlist ranking/positions
- ❌ User accounts (focus on collection first)
- ❌ Advanced analytics (view data in Supabase)

### Recommended Features (If Needed)

1. **Email Campaigns**: Use Resend to send updates to waitlist
2. **Export Reports**: Monthly exports of signups
3. **Persona Analytics**: View signups by persona type
4. **Early Access**: Mark users for early access, notify them

---

## 🐛 Troubleshooting

### "Server not configured" error

**Problem**: Environment variables not set
**Solution**: Ensure `.env.local` has all 4 variables and restart dev server

### Email not received

**Problem**: Email stuck or not sent
**Solution**:
- Check Resend dashboard for delivery status
- Check spam folder
- Verify email address is valid
- Check Resend usage limits (free tier has limits)

### Duplicate email not detected

**Problem**: Same email can be submitted multiple times
**Solution**: Ensure Supabase table has UNIQUE constraint on email column

### Modal not appearing

**Problem**: Join Waitlist buttons don't open modal
**Solution**:
- Verify `WaitlistProvider` is wrapping the app in `layout.tsx`
- Check browser console for errors
- Ensure `useWaitlist` hook is being called

---

## 📝 Email Template

The confirmation email sent by Resend is simple and professional:

```
Subject: Welcome to the Tactly Waitlist

You're on the waitlist
We'll let you know when Tactly is ready.

In the meantime, we're working hard to build the 
best communication intelligence tool for the internet.

– The Tactly team
```

You can customize this in `src/app/api/waitlist/route.ts` in the Resend email section.

---

## 📈 Metrics to Track

Once running, monitor:

- **Signups per day**: How interest is growing
- **Persona distribution**: Who's interested
- **Use case distribution**: Primary interest areas
- **Email deliverability**: Check Resend dashboard
- **Duplicate signups**: Gauge re-interest

---

## 🎯 Current Status

- ✅ Modal implemented and styled
- ✅ API route ready
- ✅ Supabase schema prepared
- ✅ Resend integration code ready
- ✅ All buttons wired up
- ✅ Build passing
- ⏳ **Pending**: Your Supabase and Resend setup

**Next action**: Follow steps 1-4 above to activate the system.

---

## Questions?

Refer to these official docs:

- [Supabase Docs](https://supabase.com/docs)
- [Resend Docs](https://resend.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
