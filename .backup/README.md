# Backup Components

This folder contains backup copies of components and sections that have been removed from the main site. You can use these to restore functionality when you're ready.

## Files

### 1. `testimonials-backup.tsx`
**The full Testimonials component**
- Shows customer testimonials in a marquee carousel
- Contains demo testimonials with placeholder data
- Location to restore: `src/components/testimonials.tsx`
- How to restore:
  1. Copy the content from this file
  2. Paste it back into `src/components/testimonials.tsx`
  3. Add the import back to `src/app/page.tsx`:
     ```tsx
     import { Testimonials } from "@/components/testimonials";
     ```
  4. Add it back to the page rendering:
     ```tsx
     <Testimonials />
     ```

### 2. `comparison-backup.tsx`
**The Comparison feature table component**
- Shows a detailed comparison table of Tactly vs competitors
- Features rows like "Browser extension", "Clones writing style", etc.
- Location to restore: `src/components/comparison.tsx`
- Note: This component is still being used on the page, so it's already available in `src/components/comparison.tsx`

### 3. `hero-comparison-cards-backup.tsx`
**The comparison cards that were in the Hero section**
- Shows side-by-side "Without Tactly" vs "With Tactly" message examples
- Features the transformation beam animation between the cards
- Helper components: `ChipBadge`, `TransformationBeam`, `ParticleFlow`
- Location: This was removed from `src/components/hero.tsx`
- How to restore:
  1. Copy the JSX section into the hero component (at the end of the return statement)
  2. Add back the helper functions (`ChipBadge`, `TransformationBeam`, `ParticleFlow`) to `hero.tsx`

## When to Use These

- **Testimonials**: Restore when you have real user testimonials/feedback to display
- **Hero Comparison Cards**: Restore if you want to show the side-by-side message comparison again (currently pushed below fold)

## Notes

- These backups were created on June 12, 2026
- All components use Framer Motion for animations
- They're compatible with the current Next.js 16.2.7 and TailwindCSS setup
