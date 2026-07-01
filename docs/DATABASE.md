# Tactly Database Guide

Complete guide to Tactly's database setup and management.

## Overview

Tactly uses **Supabase** (PostgreSQL) for data storage:

| Aspect | Details |
|--------|---------|
| **Provider** | Supabase (managed PostgreSQL) |
| **Database** | PostgreSQL 15+ |
| **Tables** | waitlist, contacts |
| **Security** | Row-Level Security (RLS) |
| **Backups** | Automatic daily backups |
| **Scaling** | Auto-scales with usage |

---

## Connection Details

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

**Types**:
- `ANON_KEY` — Public, used in browser (limited permissions)
- `SERVICE_ROLE_KEY` — Secret, used in API (full permissions)

### Getting Keys

1. Go to https://supabase.com
2. Sign in or create account
3. Select your project
4. Go to Settings → API
5. Copy the keys

---

## Database Schema

### Table 1: Waitlist

**Purpose**: Store users who join the waitlist

```sql
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  persona TEXT,
  use_case TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at);
```

**Column Details**:

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | BIGSERIAL | PRIMARY KEY | Auto-incremented ID |
| `email` | TEXT | NOT NULL, UNIQUE | User's email address |
| `persona` | TEXT | Optional | Preferred tone (Professional, Casual, etc.) |
| `use_case` | TEXT | Optional | Where they'll use Tactly |
| `created_at` | TIMESTAMP | NOT NULL | Auto-set to now() |

**Example Row**:
```sql
INSERT INTO waitlist (email, persona, use_case)
VALUES ('john@example.com', 'Professional', 'Email');
```

**Queries**:

```sql
-- Get all waitlist entries
SELECT * FROM waitlist ORDER BY created_at DESC;

-- Get count
SELECT COUNT(*) FROM waitlist;

-- Check if email exists
SELECT * FROM waitlist WHERE email = 'john@example.com';

-- Get signups this week
SELECT * FROM waitlist 
WHERE created_at >= NOW() - INTERVAL '7 days';
```

### Table 2: Contacts

**Purpose**: Store contact form submissions and support messages

```sql
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  message TEXT,
  type TEXT DEFAULT 'general',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_type ON contacts(type);
CREATE INDEX idx_contacts_created_at ON contacts(created_at);
```

**Column Details**:

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | BIGSERIAL | PRIMARY KEY | Auto-incremented ID |
| `name` | TEXT | Optional | User's name |
| `email` | TEXT | Not unique | User's email (may be duplicate) |
| `message` | TEXT | Optional | Message content |
| `type` | TEXT | DEFAULT 'general' | feedback, support, partnership, general |
| `created_at` | TIMESTAMP | NOT NULL | Auto-set to now() |

**Example Row**:
```sql
INSERT INTO contacts (name, email, message, type)
VALUES ('Jane Doe', 'jane@example.com', 'Great product!', 'feedback');
```

**Queries**:

```sql
-- Get all messages
SELECT * FROM contacts ORDER BY created_at DESC;

-- Get by type
SELECT * FROM contacts WHERE type = 'feedback';

-- Get unread (not flagged)
SELECT * FROM contacts 
WHERE created_at >= NOW() - INTERVAL '1 day'
ORDER BY created_at DESC;

-- Get feedback from specific user
SELECT * FROM contacts 
WHERE email = 'user@example.com' 
ORDER BY created_at DESC;
```

---

## Row-Level Security (RLS)

RLS restricts database access at the row level, ensuring public users can only insert data, not read it.

### Waitlist RLS Policies

**Policy 1: Allow PUBLIC to INSERT**
```sql
CREATE POLICY "public_insert_waitlist"
  ON waitlist
  FOR INSERT
  WITH CHECK (true);
```
Allows anyone to add themselves to waitlist.

**Policy 2: Allow AUTHENTICATED to SELECT**
```sql
CREATE POLICY "authenticated_select_waitlist"
  ON waitlist
  FOR SELECT
  USING (auth.role() = 'authenticated');
```
Only logged-in users (admin) can view waitlist.

### Contacts RLS Policies

**Policy 1: Allow PUBLIC to INSERT**
```sql
CREATE POLICY "public_insert_contacts"
  ON contacts
  FOR INSERT
  WITH CHECK (true);
```

**Policy 2: Allow AUTHENTICATED to SELECT**
```sql
CREATE POLICY "authenticated_select_contacts"
  ON contacts
  FOR SELECT
  USING (auth.role() = 'authenticated');
```

### Enable RLS

```sql
-- Enable RLS on tables
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
```

---

## API Integration

### Waitlist API (`/api/waitlist`)

**Flow**:
```
POST /api/waitlist
  ↓
Parse request (email, persona, use_case)
  ↓
Validate email (format + uniqueness)
  ↓
INSERT INTO waitlist (email, persona, use_case)
  VALUES (...)
  ↓
Send confirmation email
  ↓
Return success
```

**Code** (`src/app/api/waitlist/route.ts`):
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const { email, persona, useCase } = await request.json();

  // Validate
  if (!email || !isValidEmail(email)) {
    return Response.json({ error: 'Invalid email' }, { status: 400 });
  }

  // Insert
  const { data, error } = await supabase
    .from('waitlist')
    .insert({
      email,
      persona,
      use_case: useCase
    })
    .select();

  if (error) {
    return Response.json({ error: 'Email already exists' }, { status: 400 });
  }

  // Send email (Resend)
  await sendConfirmationEmail(email);

  return Response.json({ success: true, data });
}
```

### Contacts API (`/api/contact`)

**Flow**:
```
POST /api/contact
  ↓
Parse request (name, email, message, type)
  ↓
Validate inputs
  ↓
INSERT INTO contacts (name, email, message, type)
  ↓
Send notification to admin
  ↓
Return success
```

**Code** (`src/app/api/contact/route.ts`):
```typescript
export async function POST(request: Request) {
  const { name, email, message, type } = await request.json();

  // Validate
  if (!message || message.length < 10) {
    return Response.json({ error: 'Message too short' }, { status: 400 });
  }

  // Insert
  const { data, error } = await supabase
    .from('contacts')
    .insert({
      name,
      email,
      message,
      type: type || 'general'
    })
    .select();

  if (error) {
    return Response.json({ error: 'Failed to save' }, { status: 500 });
  }

  // Send notification
  await sendAdminNotification(email, message);

  return Response.json({ success: true, data });
}
```

---

## Database Maintenance

### View Data in Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Select your project
3. Click "SQL Editor"
4. Write queries
5. View results

### Query Examples

**Get waitlist stats**:
```sql
SELECT 
  COUNT(*) as total_signups,
  COUNT(DISTINCT persona) as unique_personas,
  MAX(created_at) as latest_signup
FROM waitlist;
```

**Get top personas**:
```sql
SELECT persona, COUNT(*) as count
FROM waitlist
GROUP BY persona
ORDER BY count DESC;
```

**Get contact types breakdown**:
```sql
SELECT type, COUNT(*) as count
FROM contacts
GROUP BY type
ORDER BY count DESC;
```

**Export data to CSV**:
```sql
-- In Supabase dashboard, use "Download as CSV" button
-- Or use CLI:
supabase db pull
```

---

## Backups & Recovery

### Automatic Backups

Supabase automatically backs up your database:
- Daily backups (30-day retention)
- Point-in-time recovery available
- No action needed

### Manual Backup

```bash
# Using Supabase CLI
npm install -g supabase-cli
supabase db pull

# Or via dashboard
# Settings → Backups → Download backup
```

### Restore from Backup

```bash
# Contact Supabase support if you need to restore
# They can restore to a specific point in time
```

---

## Performance Optimization

### Add Indexes

```sql
-- Improve query speed on common filters
CREATE INDEX idx_waitlist_persona ON waitlist(persona);
CREATE INDEX idx_contacts_type_created ON contacts(type, created_at);
```

### Monitor Queries

In Supabase dashboard:
1. Go to Database → Query Performance
2. See slow queries
3. Optimize by adding indexes

### Connection Pooling

For high traffic, enable connection pooling:
1. Go to Database → Connection Pooling
2. Select Pgbouncer mode
3. Use pool connection string in `.env`

---

## Data Privacy & Security

### No Sensitive Data Stored

✅ **Stored**:
- Email addresses
- User preferences (tone, use_case)
- Contact messages (non-sensitive)

❌ **NOT Stored**:
- Password hashes
- API keys
- Credit card information
- User messages (for rewriting)

### Encryption

- All data encrypted in transit (HTTPS)
- Encrypted at rest (Supabase managed)
- No end-to-end encryption (not needed)

### Access Control

- Public can only INSERT
- Admins can SELECT/UPDATE/DELETE
- API uses SERVICE_ROLE_KEY (secret)
- Frontend uses ANON_KEY (limited)

---

## Migration & Scaling

### Current Capacity

- ✅ Handles 1M+ rows efficiently
- ✅ 1000s of concurrent connections
- ✅ Auto-scales with load

### Future Scaling

When needed:
- Enable read replicas
- Use connection pooling
- Archive old data
- Add caching layer (Vercel KV)

---

## Troubleshooting

### "Email already exists"

**Issue**: User tries to join waitlist twice

**Check**:
```sql
SELECT * FROM waitlist WHERE email = 'user@example.com';
```

**Fix**: Contact support or manually delete from admin panel

### "Connection failed"

**Check**:
1. Are env vars set correctly?
2. Is Supabase project active?
3. Does IP need to be whitelisted?

```bash
# Test connection
curl -X GET https://your-project.supabase.co/rest/v1/waitlist \
  -H "Authorization: Bearer your_anon_key"
```

### "RLS policy blocking insert"

**Issue**: INSERT fails even though should work

**Check**:
```sql
-- Verify RLS policies
SELECT * FROM pg_policies 
WHERE tablename = 'waitlist';
```

**Fix**: Make sure policies allow PUBLIC INSERT

---

## Admin Dashboard Access

### View Waitlist (Admin)

1. Go to Supabase dashboard
2. Click "SQL Editor"
3. Run:
```sql
SELECT email, persona, use_case, created_at
FROM waitlist
ORDER BY created_at DESC
LIMIT 100;
```

### View Contacts (Admin)

```sql
SELECT name, email, type, created_at, message
FROM contacts
ORDER BY created_at DESC
LIMIT 50;
```

### Export to CSV

1. In SQL Editor, run your query
2. Click "Export" → "Download CSV"
3. Open in Excel/Google Sheets

---

## Database Schema Diagram

```
┌──────────────────────────────────┐
│         waitlist                 │
├──────────────────────────────────┤
│ id (PK)         BIGSERIAL        │
│ email (UNIQUE)  TEXT             │
│ persona         TEXT             │
│ use_case        TEXT             │
│ created_at      TIMESTAMP        │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│         contacts                 │
├──────────────────────────────────┤
│ id (PK)         BIGSERIAL        │
│ name            TEXT             │
│ email           TEXT             │
│ message         TEXT             │
│ type            TEXT (DEFAULT)   │
│ created_at      TIMESTAMP        │
└──────────────────────────────────┘
```

---

**For API integration details, see [API_GUIDE.md](./API_GUIDE.md). For deployment info, see [DEPLOYMENT.md](./DEPLOYMENT.md).**
