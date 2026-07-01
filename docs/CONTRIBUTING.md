# Contributing to Tactly

Thank you for your interest in contributing to Tactly! This guide explains how to contribute code, report issues, and improve the project.

## Code of Conduct

We're committed to providing a welcoming and inclusive environment. Please:

- ✅ Be respectful and constructive
- ✅ Welcome people of all backgrounds
- ✅ Ask questions when unclear
- ❌ No harassment, discrimination, or hate speech
- ❌ No spam or self-promotion

---

## How to Contribute

### 1. Report a Bug

Found a bug? Help us fix it!

**Before reporting**:
- [ ] Check if issue already exists (search GitHub issues)
- [ ] Test on latest version
- [ ] Try to reproduce consistently

**When reporting**:
- Use clear, descriptive title
- Describe the bug in detail
- Include steps to reproduce
- List your environment (OS, browser, Node version)
- Attach screenshots if helpful

**Example**:
```
Title: Waitlist form doesn't submit on Firefox

Description:
When trying to submit the waitlist form on Firefox, I get an error:
"TypeError: Cannot read property 'email' of undefined"

Steps to Reproduce:
1. Go to https://tactly.ai
2. Click "Join Waitlist"
3. Enter "test@example.com"
4. Click "Join"

Expected: Confirmation message appears
Actual: Console error, no confirmation

Environment:
- Browser: Firefox 120
- OS: macOS 14.2
```

### 2. Suggest an Enhancement

Have an idea? Suggest it!

**When suggesting**:
- Describe the problem it solves
- Explain why it's valuable
- Include use cases
- Link related issues

**Example**:
```
Title: Add dark mode theme

Problem:
Users working at night find the bright interface straining.

Solution:
Implement a dark theme using OKLCH colors already in design system.

Use Cases:
- Late-night work
- Accessibility for light-sensitive users
- Aesthetic preference
```

### 3. Contribute Code

Want to write code? Here's how:

#### Step 1: Fork & Clone

```bash
# Fork on GitHub (click Fork button)

# Clone your fork
git clone https://github.com/YOUR_USERNAME/tactly.git
cd tactly

# Add upstream remote
git remote add upstream https://github.com/mr-rishuraj/tactly.git
```

#### Step 2: Create a Branch

```bash
# Update main
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name

# Or bugfix branch
git checkout -b fix/your-bug-fix
```

**Branch naming**:
- Feature: `feature/short-description`
- Bugfix: `fix/short-description`
- Docs: `docs/short-description`
- Chore: `chore/short-description`

#### Step 3: Make Changes

```bash
# Start dev server
npm run dev

# Make your changes
# Test thoroughly locally
# Run type-check and lint
npm run type-check
npm run lint
```

#### Step 4: Commit Changes

```bash
# Stage changes
git add .

# Commit with clear message
git commit -m "Add [feature/fix]: Short description

Longer explanation of what changed and why.
- Bullet point 1
- Bullet point 2

Fixes #123 (if fixing an issue)
```

**Commit message style**:
```
[type]: Short description (50 chars max)

Longer explanation (72 chars per line)

- Bullet points for clarity
- One change per bullet

Related issues: #123
```

#### Step 5: Push & Create PR

```bash
# Push to your fork
git push origin feature/your-feature-name

# Go to GitHub and create Pull Request
# Link any related issues
# Describe your changes
```

**In PR description**:

```markdown
## What
Added dark mode toggle in navbar.

## Why
- Requested by multiple users
- Improves accessibility
- Matches design system

## How
- Added theme context provider
- Updated OKLCH colors for dark mode
- Added toggle in navbar component

## Testing
- [x] Tested in Chrome (macOS)
- [x] Tested in Safari (macOS)
- [x] Tested on mobile (iPhone)
- [x] No console errors
- [x] Type-check passes
- [x] Lint passes

## Screenshots
![Dark mode toggle](/path/to/screenshot.png)

Fixes #456
```

#### Step 6: Review & Merge

1. Wait for code review
2. Address feedback (push new commits)
3. Approval → Merge!

---

## Development Guidelines

### Code Style

We use:
- **ESLint** — Linting rules
- **TypeScript** — Type safety
- **Prettier** — Code formatting (via ESLint)

**Run checks**:
```bash
npm run type-check   # TypeScript
npm run lint         # ESLint
npm run lint --fix   # Auto-fix
```

### Component Guidelines

**Naming**:
```typescript
// PascalCase for components
export function HeroSection() { }
export function WaitlistModal() { }

// camelCase for functions
export function validateEmail() { }
export function fetchRewrite() { }
```

**Structure**:
```typescript
// 1. Imports (external, then internal)
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWaitlist } from '@/contexts/waitlist-context';

// 2. Types (if component-specific)
interface Props {
  title: string;
  onClose: () => void;
}

// 3. Component
export function MyComponent({ title, onClose }: Props) {
  const [state, setState] = useState('');

  const handleClick = () => {
    setState('new value');
  };

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
```

**Best practices**:
- Prefer functional components
- Use TypeScript for props
- Keep components focused (single responsibility)
- Extract complex logic to custom hooks
- Use React Context for global state (not Redux for MVP)

### File Organization

```
src/
├── app/
│   ├── api/              # Backend routes
│   ├── layout.tsx        # Global layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── navbar.tsx
│   ├── hero.tsx
│   └── [more].tsx
├── lib/                  # Utilities
│   ├── types.ts
│   ├── prompts.ts
│   └── utils.ts
└── contexts/             # React contexts
    └── [context].tsx
```

### Testing

Currently: Manual testing

Future: Add automated tests (Jest, React Testing Library)

**Before submitting PR**:
- [ ] Test locally: `npm run dev`
- [ ] Test on mobile
- [ ] No console errors
- [ ] Type-check passes: `npm run type-check`
- [ ] Lint passes: `npm run lint`

### Database Changes

If adding/modifying database tables:

1. Create migration in Supabase dashboard
2. Document schema in DATABASE.md
3. Include RLS policies
4. Test in staging before production

### API Changes

If modifying API endpoints:

1. Update request/response types
2. Update API_GUIDE.md
3. Test with cURL/Postman
4. Include error handling
5. Update version if breaking change

---

## Review Process

### What We Look For

✅ **Good to merge**:
- Clear, focused changes
- Passes all checks
- Addresses the issue
- Well-documented
- No breaking changes

❌ **Not ready**:
- Multiple unrelated changes
- No tests or testing info
- Poorly documented
- Adds technical debt
- Breaks existing functionality

### Timeline

- Comment within 24 hours
- Approval or feedback within 48 hours
- Merge within 72 hours of approval

### Feedback

- Constructive and respectful
- Ask questions if unclear
- Suggest improvements
- Point to documentation

---

## Documentation

### What to Document

- [ ] New features (in FEATURES.md)
- [ ] New API endpoints (in API_GUIDE.md)
- [ ] Database schema changes (in DATABASE.md)
- [ ] Architecture changes (in ARCHITECTURE.md)
- [ ] Breaking changes (in CHANGELOG)

### How to Document

- Clear, concise language
- Code examples for technical docs
- Screenshots for UI changes
- Link related documentation

**Template**:
```markdown
## Feature Name

### Overview
Brief description.

### How to Use
Steps or code example.

### Configuration
Any setup required.

### Related
Links to related docs.
```

---

## Areas Needing Help

### High Priority

- [ ] More comprehensive tests
- [ ] Bug fixes reported in issues
- [ ] Performance optimization
- [ ] Documentation improvements
- [ ] More language support

### Medium Priority

- [ ] UI polish and animations
- [ ] A/B testing setup
- [ ] Advanced metrics tracking
- [ ] User feedback collection

### Lower Priority

- [ ] Non-critical features
- [ ] Nice-to-have improvements
- [ ] Optional refactoring

---

## Setup Issues?

### Common Problems

| Problem | Solution |
|---------|----------|
| `npm install` fails | Delete `node_modules`, run again |
| Port 3000 in use | Use `npm run dev -- -p 3001` |
| TypeScript errors | Run `npm run type-check` |
| Lint errors | Run `npm run lint --fix` |
| `.env.local` not working | Copy from `.env.local.example` |

### Get Help

- Ask in GitHub issue
- Email: usetactly.ai@gmail.com
- Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## Commit Message Guidelines

### Format

```
type(scope): subject

body

footer
```

**Types**:
- `feat` — New feature
- `fix` — Bug fix
- `docs` — Documentation
- `style` — Formatting (no code change)
- `refactor` — Code restructuring
- `perf` — Performance optimization
- `test` — Test additions/changes
- `chore` — Build, deps, etc.

**Examples**:
```
feat(extension): add tone selector dropdown

fix(api): handle malformed JSON in rewrite endpoint

docs(guide): update architecture diagram

refactor(components): extract Button to separate file

chore(deps): update Next.js to 16.2.8
```

---

## Release Process

### Versioning

We use Semantic Versioning: `MAJOR.MINOR.PATCH`

- `1.0.0` — Initial release
- `1.1.0` — New features
- `1.0.1` — Bug fixes
- `2.0.0` — Breaking changes

### Release Checklist

- [ ] Update CHANGELOG.md
- [ ] Bump version in package.json
- [ ] Update docs if needed
- [ ] Create git tag: `git tag v1.0.0`
- [ ] Deploy to Vercel: `vercel --prod`
- [ ] Announce release

---

## Questions?

- Email: usetactly.ai@gmail.com
- GitHub: https://github.com/mr-rishuraj/tactly
- Website: https://tactly.ai

---

## Thank You! 🙏

Every contribution helps make Tactly better. Whether it's code, documentation, bug reports, or suggestions — we appreciate your involvement!

**What's Next?**
1. Pick an issue or feature to work on
2. Comment to let us know you're interested
3. Follow the guidelines above
4. Submit a PR
5. We'll review and merge!

Happy coding! 🚀
