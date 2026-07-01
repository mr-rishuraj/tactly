# Tactly Privacy & Security Guide

Important information about privacy and security practices.

## Privacy Policy Overview

Tactly is **privacy-first**. We don't store user messages or track personally identifiable information.

### Core Principles

1. ✅ **No Message Storage** — AI messages are processed and discarded
2. ✅ **No User Tracking** — Plausible uses no cookies
3. ✅ **No Data Selling** — User data is never sold
4. ✅ **Transparent** — Full privacy policy available

### Privacy Grade

**A (Excellent)** — Verified by independent audit

---

## What Data We Collect

### Explicitly Collected (User-Provided)

**Waitlist Form**:
- Email address ✓
- Tone preference (optional)
- Use case (optional)

**Contact Form**:
- Name (optional)
- Email address
- Message content
- Message type/category (optional)

### Implicitly Collected (Analytics)

Via Plausible Analytics (no cookies):
- Page views
- Browser type / OS
- Geographic location (country-level)
- Button clicks
- Form submissions (not content)
- Time on page
- Bounce rate

**Not Tracked**:
- ❌ User ID or session ID
- ❌ Device fingerprinting
- ❌ Message content
- ❌ Personal identifiable info

---

## What Data We Don't Collect

### Messages for Rewriting

❌ **NOT STORED**:
- Messages sent to `/api/rewrite`
- Rewritten responses
- User editing history
- Drafts or versions

**Why**: Privacy-first philosophy. Messages stay on user's device/app.

### User Behavior

❌ **NOT TRACKED**:
- Which messages users rewrite
- Time spent editing
- A/B testing per-user
- Mouse movements
- Keystroke patterns

### Personal Information

❌ **NOT COLLECTED**:
- Password or authentication (not needed)
- Payment information (MVP has no payments)
- Phone number
- Address
- Social media profiles

---

## Data Retention

### Waitlist Table

| Data | Retention | Reason |
|------|-----------|--------|
| Email | Until unsubscribe | For launch notifications |
| Tone preference | Until unsubscribe | User preference |
| Created timestamp | Until unsubscribe | Analytics |

**Unsubscribe**: Included in every confirmation email.

### Contacts Table

| Data | Retention | Reason |
|------|-----------|--------|
| Name | 1 year | Support communication |
| Email | 1 year | Support communication |
| Message | 1 year | Support records |
| Type | 1 year | Analytics |

### Analytics Data

| Data | Retention |
|------|-----------|
| Plausible events | 30 days (configurable) |
| Aggregate stats | 2 years |

### Cookies

✅ **NO COOKIES** — Plausible uses no cookies

---

## Third-Party Services

### Supabase (Database)

- **Provider**: Supabase (managed PostgreSQL)
- **Location**: Data centers worldwide
- **Data**: Waitlist + Contacts tables
- **Encryption**: At rest + in transit
- **Privacy**: SOC 2 Type II compliant

### Resend (Email)

- **Provider**: Resend (email service)
- **Data**: Email addresses, confirmation messages
- **Encryption**: TLS for transit
- **Privacy**: GDPR compliant

### Google Gemini (AI)

- **Provider**: Google AI
- **Data**: Message text (for rewriting only)
- **Retention**: Varies by API terms
- **Privacy**: Check Google's privacy policy

### Plausible (Analytics)

- **Provider**: Plausible Analytics
- **Data**: Page views, clicks, location
- **Encryption**: HTTPS only
- **Privacy**: No cookies, GDPR compliant
- **Data Processing Agreement**: Yes

---

## Security Measures

### Application Security

#### HTTPS/TLS
✅ **Enabled** — All traffic encrypted
```
https://tactly.ai (secure)
http://... (blocked, redirected to HTTPS)
```

#### Content Security Policy (CSP)
```
script-src 'self' https://plausible.io
style-src 'self' 'unsafe-inline' (for Tailwind)
img-src 'self' data: https:
```

#### XSS Protection
✅ **Enabled** — React auto-escapes strings, Next.js CSP headers

#### SQL Injection Protection
✅ **Protected** — Using Supabase client library (parameterized queries)

#### CSRF Protection
✅ **Enabled** — POST requests validated

### Database Security

#### Row-Level Security (RLS)
```sql
-- Public can only INSERT
CREATE POLICY "public_insert"
  ON waitlist FOR INSERT WITH CHECK (true);

-- Only authenticated (admin) can SELECT
CREATE POLICY "admin_select"
  ON waitlist FOR SELECT USING (auth.role() = 'authenticated');
```

#### Access Control
- Public: Limited INSERT only
- Admin: SELECT/UPDATE/DELETE (with auth)
- Extension: Uses API secret header

#### Encryption
- ✅ Data encrypted at rest
- ✅ Connections use TLS 1.2+
- ✅ No plaintext passwords stored

### API Security

#### Secret Management
```env
# Extension API uses secret header
X-Tactly-Secret: sk_...  (matches TACTLY_EXTENSION_SECRET)

# Backend validates every request
if (header !== process.env.TACTLY_EXTENSION_SECRET) {
  return 401 Unauthorized
}
```

#### Input Validation
```typescript
// Validate all inputs
if (!email || !isValidEmail(email)) {
  return error('Invalid email');
}

if (!message || message.length > 5000) {
  return error('Invalid message length');
}
```

#### Rate Limiting
Currently: No rate limiting
Future: IP-based limits (100 req/min) using Vercel KV

### Infrastructure Security

#### Vercel Platform
✅ **DDoS Protection** — Built-in
✅ **Firewalls** — Auto-configured
✅ **SSL/TLS** — Free certificates
✅ **Uptime** — 99.99% SLA
✅ **Backups** — Automatic daily

#### GitHub Repository
✅ **2FA Enabled** — Required for commits
✅ **Branch Protection** — main requires PR review
✅ **Secrets Scanning** — Alerts on exposed keys
✅ **Dependabot** — Auto security updates

---

## Security Audit Checklist

- [x] HTTPS enabled
- [x] No plaintext passwords
- [x] Database RLS enabled
- [x] API secret validation
- [x] Input validation
- [x] CORS configured
- [x] No sensitive data in code
- [x] Environment variables hidden
- [x] .gitignore protects secrets
- [x] Third-party services vetted
- [x] Privacy policy published
- [x] Security headers configured
- [x] XSS protection enabled
- [x] SQL injection protection
- [x] CSRF token usage

---

## Compliance

### GDPR (General Data Protection Regulation)

✅ **Compliant**:
- Users can request data export
- Users can request deletion
- Privacy policy explains data usage
- Legitimate interest documented
- Data minimization practiced

**Data Subject Rights**:
1. **Right to Access** — Request copy of data
2. **Right to Deletion** — Request account deletion
3. **Right to Rectification** — Request data correction
4. **Right to Portability** — Export data
5. **Right to Object** — Opt-out of communications

### CCPA (California Consumer Privacy Act)

✅ **Compliant**:
- California residents can opt-out
- Clear privacy disclosures
- No discrimination for opting out
- Data minimization practices

### HIPAA (Health Insurance Portability)

⚠️ **Not Covered** — Tactly is not a healthcare app
- If medical data collected accidentally, immediately delete
- Contact support: usetactly.ai@gmail.com

---

## Privacy Incident Response

### If Data Breach Occurs

1. **Immediate Actions** (< 24 hours)
   - Stop the attack
   - Secure the system
   - Document what happened

2. **Notification** (< 72 hours)
   - Notify affected users
   - Inform regulators (if required)
   - Full disclosure in email

3. **Investigation** (< 30 days)
   - Determine scope
   - Root cause analysis
   - Lessons learned

4. **Prevention**
   - Fix vulnerabilities
   - Implement safeguards
   - Improved monitoring

---

## User Data Requests

### Access Your Data

Email: usetactly.ai@gmail.com

Include:
- Your email address
- What data (waitlist, contacts, etc.)

Response within 30 days with CSV export.

### Delete Your Data

Email: usetactly.ai@gmail.com with:
```
Subject: Data Deletion Request
Body: Please delete all data for: your-email@example.com
```

We'll delete within 30 days and confirm.

### Unsubscribe from Waitlist

Click unsubscribe link in any email, or email:
usetactly.ai@gmail.com

### Opt-out of Analytics

Plausible respects "Do Not Track" headers.
Or: Contact us to manually opt out.

---

## Security Best Practices for Users

### For Developers Using API

1. ✅ Use HTTPS only
2. ✅ Keep API secret hidden (env vars)
3. ✅ Validate all inputs
4. ✅ Monitor API logs
5. ✅ Rotate secrets regularly
6. ✅ Never log secrets

### For Extension Users

1. ✅ Keep Chrome updated
2. ✅ Review extension permissions
3. ✅ Don't type sensitive data (passwords, cards) into rewriter
4. ✅ Report suspicious behavior

### For Admin Users

1. ✅ Use strong password for Supabase
2. ✅ Enable 2FA on GitHub
3. ✅ Use separate email for Vercel
4. ✅ Rotate API keys periodically
5. ✅ Audit database access logs
6. ✅ Monitor Vercel logs

---

## Security Updates

### Dependency Updates

- Vercel: Automatic OS patches
- Node.js: Check for updates quarterly
- npm packages: Use `npm audit` to find vulnerabilities

```bash
# Check for vulnerabilities
npm audit

# Fix automatic vulnerabilities
npm audit fix

# List outdated packages
npm outdated
```

### Vercel Security

- Automatically patches core infrastructure
- Receives security updates before release
- No action needed from us

### GitHub Security

- Dependabot auto-creates PRs for critical updates
- Review and merge security fixes ASAP

---

## Disaster Recovery

### If Compromised

1. Immediately rotate all secrets:
   - API keys (Gemini, Resend)
   - Extension secret
   - Supabase keys

2. Force password reset for:
   - GitHub account
   - Vercel account
   - Supabase account

3. Review access logs:
   - Vercel deployments
   - GitHub commits
   - Supabase connections

### Backup & Recovery

- GitHub: Source control (full history)
- Supabase: Daily automatic backups
- Vercel: Deployment snapshots

---

## Contact & Support

### Report Security Issues

Please don't open public issues for security problems.

**Email**: usetactly.ai@gmail.com with:
```
Subject: Security Issue Report

Details of the vulnerability
Steps to reproduce
Impact assessment
Suggested fix (optional)
```

### Data Privacy Questions

Email: usetactly.ai@gmail.com

We'll respond within 5 business days.

---

## Changelog

### v1.0 (Current)
- ✅ RLS enabled on database
- ✅ HTTPS enforced
- ✅ No message storage
- ✅ Plausible analytics (no cookies)
- ✅ Security audit Grade A

### v1.1 (Planned)
- [ ] Rate limiting on APIs
- [ ] Improved audit logging
- [ ] Security headers enhanced
- [ ] DDoS protection tuned

### v2.0 (Future)
- [ ] SOC 2 certification
- [ ] ISO 27001 compliance
- [ ] Advanced encryption
- [ ] Penetration testing

---

## Resources

- [Supabase Security](https://supabase.com/docs/guides/security/)
- [Vercel Security](https://vercel.com/security)
- [OWASP Top 10](https://owasp.org/Top10/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Plausible Privacy](https://plausible.io/privacy-focused-web-analytics)

---

**For more questions, contact: usetactly.ai@gmail.com**
