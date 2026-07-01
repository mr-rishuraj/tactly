/**
 * Motion Examples & Patterns Reference
 *
 * This file serves as internal documentation for animation patterns used throughout Tactly.
 * These are copy-paste friendly examples — NOT meant to be exported.
 *
 * All examples use constants from @/lib/motion.ts
 */

"use client";

import { motion } from "framer-motion";
import {
  DURATIONS,
  DELAYS,
  EASING,
  TRANSITIONS,
  CONTAINER_VARIANTS,
  ITEM_VARIANTS,
  HOVER_VARIANTS,
  BACKGROUND_ANIMATIONS,
  TEXT_VARIANTS,
  INTERACTION_PATTERNS,
  VIEWPORT_SETTINGS,
  PRESETS,
} from "@/lib/motion";

/**
 * EXAMPLE 1: Hero Section Entrance
 * Use for main landing page hero sections with staggered content
 */
export const HeroSectionExample = () => (
  <section>
    <motion.div
      variants={CONTAINER_VARIANTS.delayedStagger(DELAYS.small, DELAYS.small)}
      initial="hidden"
      animate="visible"
    >
      {/* Headline */}
      <motion.h1 variants={ITEM_VARIANTS.slideScaleIn}>
        <motion.span variants={TEXT_VARIANTS.characterAnimate(DELAYS.small)}>
          Line 1
        </motion.span>
      </motion.h1>

      {/* Description */}
      <motion.p variants={ITEM_VARIANTS.slideInUp}>
        Your tagline here
      </motion.p>

      {/* CTA Buttons */}
      <motion.button
        variants={ITEM_VARIANTS.slideInUp}
        {...INTERACTION_PATTERNS.buttonInteraction}
      >
        Click me
      </motion.button>
    </motion.div>
  </section>
);

/**
 * EXAMPLE 2: Feature Card Grid
 * Use for displaying multiple feature cards that enter on scroll
 */
export const FeatureGridExample = () => (
  <motion.div
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    initial="hidden"
    whileInView="visible"
    viewport={VIEWPORT_SETTINGS.eager}
    variants={CONTAINER_VARIANTS.stagger(DELAYS.small)}
  >
    {[1, 2, 3, 4, 5, 6].map((index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: DURATIONS.normal, delay: index * DELAYS.tiny }}
        viewport={VIEWPORT_SETTINGS.standard}
        {...INTERACTION_PATTERNS.cardInteraction}
        className="rounded-lg p-6 bg-white/5 border border-white/10"
      >
        <h3>Feature {index}</h3>
        <p>Description goes here</p>
      </motion.div>
    ))}
  </motion.div>
);

/**
 * EXAMPLE 3: Fade In on Scroll
 * Use for simple entrance animations triggered by scroll
 */
export const FadeInScrollExample = () => (
  <motion.section
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={TRANSITIONS.slow}
    viewport={VIEWPORT_SETTINGS.standard}
  >
    <h2>Content that fades in on scroll</h2>
    <p>This section animates when it enters the viewport.</p>
  </motion.section>
);

/**
 * EXAMPLE 4: Interactive Button
 * Use for buttons with hover and tap feedback
 */
export const InteractiveButtonExample = () => (
  <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.98 }}
    transition={TRANSITIONS.fast}
    className="px-6 py-3 bg-blue-500 text-white rounded-lg"
  >
    Interactive Button
  </motion.button>
);

/**
 * EXAMPLE 5: Staggered List Animation
 * Use for animating lists where items appear one after another
 */
export const StaggeredListExample = () => {
  const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

  return (
    <motion.ul
      variants={CONTAINER_VARIANTS.stagger(DELAYS.small)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_SETTINGS.standard}
    >
      {items.map((item, i) => (
        <motion.li key={i} variants={ITEM_VARIANTS.slideInUp}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
};

/**
 * EXAMPLE 6: Hover Card with Lift & Glow
 * Use for cards that need premium interaction feel
 */
export const HoverCardExample = () => (
  <motion.div
    whileHover={HOVER_VARIANTS.liftScale}
    className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/15"
  >
    <h3>Premium Card</h3>
    <p>Lifts and scales on hover</p>
  </motion.div>
);

/**
 * EXAMPLE 7: Breathing Background Animation
 * Use for ambient animations in backgrounds
 */
export const BreathingBackgroundExample = () => (
  <motion.div
    className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
    animate={{
      y: [0, 30, 0],
      opacity: [0.1, 0.15, 0.1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

/**
 * EXAMPLE 8: Text Typing Cursor
 * Use for simulating typing animations
 */
export const TypingCursorExample = () => (
  <div>
    Typed text here
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: DURATIONS.normal, repeat: Infinity }}
    >
      |
    </motion.span>
  </div>
);

/**
 * EXAMPLE 9: Icon Hover Animation with Spring
 * Use for interactive icons that respond to hover with bouncy feel
 */
export const IconHoverExample = () => (
  <motion.div
    whileHover={{ scale: 1.15, rotate: 10 }}
    transition={TRANSITIONS.spring}
    className="text-4xl cursor-pointer"
  >
    🚀
  </motion.div>
);

/**
 * EXAMPLE 10: Marquee/Carousel Animation
 * Use for infinitely scrolling lists (testimonials, logos, etc)
 */
export const MarqueeExample = () => (
  <div className="overflow-hidden">
    <motion.div
      animate={{ x: ["0%", "-50%"] }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear",
      }}
      className="flex gap-6"
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex-shrink-0 w-80">
          Item {i}
        </div>
      ))}
    </motion.div>
  </div>
);

/**
 * EXAMPLE 11: Staggered Paragraph Animation
 * Use for animating text word-by-word or line-by-line
 */
export const StaggeredParagraphExample = () => (
  <motion.div
    variants={CONTAINER_VARIANTS.stagger(DELAYS.small)}
    initial="hidden"
    whileInView="visible"
    viewport={VIEWPORT_SETTINGS.standard}
  >
    {["This", "is", "a", "staggered", "paragraph"].map((word, i) => (
      <motion.span key={i} variants={ITEM_VARIANTS.fadeIn}>
        {word}{" "}
      </motion.span>
    ))}
  </motion.div>
);

/**
 * EXAMPLE 12: Progress Bar Animation
 * Use for animated progress indicators
 */
export const ProgressBarExample = () => (
  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: "85%" }}
      transition={{ duration: DURATIONS.slow, delay: DELAYS.small }}
      viewport={VIEWPORT_SETTINGS.standard}
      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
    />
  </div>
);

/**
 * EXAMPLE 13: Modal/Overlay Animation
 * Use for modals and overlay entrances
 */
export const ModalExample = () => (
  <>
    {/* Backdrop */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={TRANSITIONS.smooth}
      className="fixed inset-0 bg-black/50"
    />

    {/* Modal */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={TRANSITIONS.smooth}
      className="rounded-xl bg-white p-8"
    >
      <h2>Modal Content</h2>
    </motion.div>
  </>
);

/**
 * EXAMPLE 14: Rotating Spinner
 * Use for loading states
 */
export const SpinnerExample = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    }}
    className="w-8 h-8 border-2 border-transparent border-t-cyan-500 rounded-full"
  />
);

/**
 * EXAMPLE 15: Comparison Table Animation
 * Use for tables with animated row entrance
 */
export const ComparisonTableExample = () => (
  <motion.table
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={TRANSITIONS.smooth}
    viewport={VIEWPORT_SETTINGS.standard}
    className="w-full"
  >
    <tbody>
      {[1, 2, 3, 4, 5].map((row, i) => (
        <motion.tr
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * DELAYS.tiny, duration: DURATIONS.normal }}
          viewport={VIEWPORT_SETTINGS.standard}
          className="border-b"
        >
          <td>Feature {row}</td>
          <td>✓</td>
        </motion.tr>
      ))}
    </tbody>
  </motion.table>
);

/**
 * COMMON PATTERNS SUMMARY:
 *
 * ✓ Hero Sections: Use PRESETS.heroEntrance or delayedStagger with slideScaleIn
 * ✓ Feature Cards: Use stagger + cardEntrance with whileHover liftScale
 * ✓ Scroll Reveals: Use whileInView with viewport settings
 * ✓ Interactive Elements: Use INTERACTION_PATTERNS for consistent feel
 * ✓ Backgrounds: Use BACKGROUND_ANIMATIONS for ambient motion
 * ✓ Lists: Use stagger with appropriate child variants
 * ✓ Icons: Use spring transitions for snappy, energetic feel
 * ✓ Text: Use characterAnimate or wordAnimate for text sequencing
 *
 * PERFORMANCE TIPS:
 *
 * ✓ Use GPU-accelerated properties: transform (x, y, scale, rotate), opacity only
 * ✓ Avoid animating: width, height, padding, margin, colors (use CSS for these)
 * ✓ Keep durations between 150-500ms (DURATIONS constants)
 * ✓ Use staggerChildren for lists (not individual delays)
 * ✓ Apply viewport={{ once: true }} to save renders
 * ✓ Use ease: "linear" for infinite loops
 * ✓ Consider reducing motion for users with prefers-reduced-motion
 */
