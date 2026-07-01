/**
 * Centralized Animation Constants for Tactly V2
 *
 * This file contains all animation configurations to ensure consistent motion language
 * across the application. Use these constants in all Framer Motion components.
 *
 * GPU-Accelerated Properties: transform (x, y, scale, rotate) and opacity only
 */

// ============================================================================
// DURATIONS (in seconds)
// ============================================================================
export const DURATIONS = {
  /** Very fast animations (150ms) - micro-interactions, hover states */
  fast: 0.15,
  /** Standard animations (300ms) - entrance/exit, transitions */
  normal: 0.3,
  /** Slower animations (500ms) - hero sections, important reveals */
  slow: 0.5,
} as const;

// ============================================================================
// DELAYS (in seconds)
// ============================================================================
export const DELAYS = {
  /** No delay (0ms) */
  none: 0,
  /** Tiny delay (50ms) - minimal stagger */
  tiny: 0.05,
  /** Small delay (100ms) - list stagger */
  small: 0.1,
  /** Medium delay (150ms) - section stagger */
  medium: 0.15,
} as const;

// ============================================================================
// EASING FUNCTIONS
// ============================================================================
export const EASING = {
  /** Smooth in and out */
  inOut: "easeInOut",
  /** Ease out for entrance animations */
  out: "easeOut",
  /** Ease in for exit animations */
  in: "easeIn",
  /** Linear for continuous animations (rotations, marquee) */
  linear: "linear",
  /** Spring for bouncy, energetic feel */
  spring: { type: "spring", stiffness: 300, damping: 30 },
  /** Soft spring for subtle bounces */
  softSpring: { type: "spring", stiffness: 200, damping: 25 },
} as const;

// ============================================================================
// STANDARD TRANSITIONS
// ============================================================================
export const TRANSITIONS = {
  /** Fast hover and micro-interactions */
  fast: {
    duration: DURATIONS.fast,
    ease: EASING.out,
  },
  /** Standard smooth transitions */
  smooth: {
    duration: DURATIONS.normal,
    ease: EASING.inOut,
  },
  /** Slower entrance animations */
  slow: {
    duration: DURATIONS.slow,
    ease: EASING.out,
  },
  /** Linear animation for infinite loops */
  loop: {
    duration: 20,
    repeat: Infinity,
    ease: EASING.linear,
  },
  /** Spring animation for interactive elements */
  spring: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  },
  /** Soft spring for entrance animations */
  softSpring: {
    type: "spring" as const,
    stiffness: 200,
    damping: 25,
  },
} as const;

// ============================================================================
// CONTAINER VARIANTS (Parent animations with staggered children)
// ============================================================================
export const CONTAINER_VARIANTS = {
  /** Standard container with staggered children */
  stagger: (staggerDelay: number = DELAYS.small) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }),

  /** Container for immediate reveal without stagger */
  instant: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0,
      },
    },
  },

  /** Container with delayed children start */
  delayedStagger: (staggerDelay: number = DELAYS.small, delayChildren: number = DELAYS.small) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren,
      },
    },
  }),
} as const;

// ============================================================================
// ITEM VARIANTS (Child animations)
// ============================================================================
export const ITEM_VARIANTS = {
  /** Fade in */
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: TRANSITIONS.smooth,
    },
  },

  /** Fade in with slide up */
  slideInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: TRANSITIONS.smooth,
    },
  },

  /** Fade in with slide down */
  slideInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: TRANSITIONS.smooth,
    },
  },

  /** Fade in with slide left */
  slideInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: TRANSITIONS.smooth,
    },
  },

  /** Fade in with slide right */
  slideInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: TRANSITIONS.smooth,
    },
  },

  /** Scale and fade in */
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: TRANSITIONS.smooth,
    },
  },

  /** Combined slide and scale for impact */
  slideScaleIn: {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: TRANSITIONS.smooth,
    },
  },
} as const;

// ============================================================================
// HOVER VARIANTS
// ============================================================================
export const HOVER_VARIANTS = {
  /** Subtle lift on hover */
  lift: {
    y: -4,
    transition: TRANSITIONS.fast,
  },

  /** Slight scale increase */
  scaleUp: {
    scale: 1.05,
    transition: TRANSITIONS.fast,
  },

  /** Lift + scale for cards */
  liftScale: {
    y: -8,
    scale: 1.02,
    transition: TRANSITIONS.fast,
  },

  /** Button press feel */
  press: {
    scale: 0.98,
    transition: TRANSITIONS.fast,
  },
} as const;

// ============================================================================
// BACKGROUND ANIMATIONS
// ============================================================================
export const BACKGROUND_ANIMATIONS = {
  /** Subtle breathing animation for gradient backgrounds */
  breathe: {
    opacity: [0.1, 0.15, 0.1],
    y: [0, 30, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: EASING.inOut,
    },
  },

  /** Floating animation for elements */
  float: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: EASING.inOut,
    },
  },

  /** Rotating animation for icons */
  rotate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: EASING.linear,
    },
  },

  /** Pulsing animation */
  pulse: {
    opacity: [1, 0.5, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: EASING.inOut,
    },
  },
} as const;

// ============================================================================
// TEXT ANIMATIONS
// ============================================================================
export const TEXT_VARIANTS = {
  /** Character-level animation builder */
  characterAnimate: (delay: number = DELAYS.small) => ({
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATIONS.slow,
        delay: i * delay,
      },
    }),
  }),

  /** Word-level animation builder */
  wordAnimate: (delay: number = DELAYS.small) => ({
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATIONS.normal,
        delay: i * delay,
      },
    }),
  }),

  /** Typing animation effect */
  typingCursor: {
    animate: { opacity: [1, 0] },
    transition: {
      duration: 0.6,
      repeat: Infinity,
    },
  },
} as const;

// ============================================================================
// INTERACTION PATTERNS
// ============================================================================
export const INTERACTION_PATTERNS = {
  /** Button click + hover pattern */
  buttonInteraction: {
    whileHover: HOVER_VARIANTS.scaleUp,
    whileTap: HOVER_VARIANTS.press,
  },

  /** Card interaction pattern */
  cardInteraction: {
    whileHover: HOVER_VARIANTS.liftScale,
  },

  /** Link/text interaction */
  linkInteraction: {
    whileHover: { x: 2 },
    whileTap: { x: 0 },
    transition: TRANSITIONS.fast,
  },
} as const;

// ============================================================================
// STAGGER HELPERS
// ============================================================================
/**
 * Create stagger animation for variable-length lists
 * @param items - Number of items in the list
 * @param baseDelay - Base delay before animation starts
 * @param staggerAmount - Delay between each item
 */
export const createStaggerAnimation = (
  items: number,
  baseDelay: number = DELAYS.small,
  staggerAmount: number = DELAYS.tiny
) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerAmount,
      delayChildren: baseDelay,
    },
  },
});

// ============================================================================
// VIEWPORT SETTINGS (for scroll animations)
// ============================================================================
export const VIEWPORT_SETTINGS = {
  /** Animate when element enters viewport (standard) */
  standard: { once: true, amount: 0.2 },
  /** Animate when element is nearly fully visible */
  full: { once: true, amount: 0.8 },
  /** Animate as soon as element appears */
  eager: { once: true, amount: 0.05 },
} as const;

// ============================================================================
// PRESETS (Common animation combinations)
// ============================================================================
export const PRESETS = {
  /** Hero section entrance */
  heroEntrance: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: DELAYS.small,
          delayChildren: DELAYS.small,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 40, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: TRANSITIONS.slow,
      },
    },
  },

  /** Feature card entrance - factory function for dynamic index delays */
  cardEntrance: (index: number = 0) => ({
    initial: { opacity: 0, y: 40, scale: 0.95 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: {
      duration: DURATIONS.normal,
      delay: index * DELAYS.tiny,
      ease: EASING.out,
    },
  }),

  /** Marquee animation */
  marquee: {
    animate: { x: ["0%", "-50%"] },
    transition: {
      duration: 30,
      repeat: Infinity,
      ease: EASING.linear,
    },
  },

  /** Loading spinner */
  spinner: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: EASING.linear,
    },
  },
} as const;
