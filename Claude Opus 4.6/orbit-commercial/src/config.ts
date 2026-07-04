// ─── Design Tokens & Configuration ───────────────────────────────────────────
// Central configuration for the Orbit Commercial.
// All colours, typography, timings, springs, and scene boundaries live here.

// ─── Colours ─────────────────────────────────────────────────────────────────
export const COLORS = {
  bg: '#0A0A0F',
  bgCard: '#141420',
  bgCardHover: '#1A1A2E',
  surface: '#1C1C2E',
  surfaceLight: '#252540',
  border: '#2A2A45',
  borderLight: '#3A3A5A',

  text: '#FFFFFF',
  textSecondary: '#A0A0C0',
  textMuted: '#6B6B8D',

  accent: '#7C5CFC',       // Restrained violet
  accentLight: '#9B7FFF',
  accentDim: '#4A3A8A',
  accentGlow: 'rgba(124, 92, 252, 0.3)',

  electric: '#4CA8FF',     // Electric-blue accent
  electricDim: '#2A6BBF',

  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',

  shadow: 'rgba(0, 0, 0, 0.6)',
  shadowLight: 'rgba(0, 0, 0, 0.3)',
} as const;

// ─── Typography ──────────────────────────────────────────────────────────────
export const FONTS = {
  display: 'Inter',
  body: 'Inter',
} as const;

export const FONT_SIZES = {
  hero: 96,
  display: 72,
  heading: 48,
  subheading: 32,
  title: 24,
  body: 18,
  caption: 14,
  small: 12,
} as const;

export const FONT_WEIGHTS = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  black: '900',
} as const;

// ─── Scene Timings (frames at 30fps) ─────────────────────────────────────────
export const FPS = 30;
export const TOTAL_FRAMES = 750;

export const SCENES = {
  opening: { start: 0, end: 89, duration: 90 },
  interfaceReveal: { start: 90, end: 239, duration: 150 },
  shapeTransform: { start: 240, end: 389, duration: 150 },
  dynamicCaptions: { start: 390, end: 569, duration: 180 },
  montage: { start: 570, end: 689, duration: 120 },
  brandLockup: { start: 690, end: 749, duration: 60 },
} as const;

// ─── Spring Configurations ───────────────────────────────────────────────────
export const SPRINGS = {
  smooth: { damping: 200 },
  snappy: { damping: 20, stiffness: 200 },
  gentle: { damping: 30, stiffness: 120 },
  heavy: { damping: 15, stiffness: 80, mass: 2 },
  bouncy: { damping: 8 },
  tight: { damping: 40, stiffness: 300 },
} as const;

// ─── Layout ──────────────────────────────────────────────────────────────────
export const LAYOUT = {
  width: 1920,
  height: 1080,
  safeMargin: 80,
  cardRadius: 12,
  cardRadiusLarge: 20,
} as const;

// ─── App Data (Orbit mock interface) ─────────────────────────────────────────
export const APP_DATA = {
  projects: [
    { name: 'Brand Campaign Q4', status: 'In Progress', progress: 72, color: COLORS.accent },
    { name: 'Product Launch Video', status: 'Review', progress: 95, color: COLORS.electric },
    { name: 'Social Templates', status: 'Planning', progress: 30, color: COLORS.success },
    { name: 'Annual Report', status: 'Complete', progress: 100, color: COLORS.success },
  ],
  team: [
    { name: 'Alex', role: 'Design Lead', avatar: '#7C5CFC' },
    { name: 'Sam', role: 'Motion', avatar: '#4CA8FF' },
    { name: 'Jordan', role: 'Copy', avatar: '#34D399' },
    { name: 'Riley', role: 'Strategy', avatar: '#FBBF24' },
  ],
  comments: [
    { author: 'Alex', text: 'Updated the hero section', time: '2m ago' },
    { author: 'Sam', text: 'Added transitions', time: '5m ago' },
    { author: 'Jordan', text: 'Copy approved ✓', time: '12m ago' },
  ],
  features: ['Plan', 'Review', 'Deliver'] as const,
  captions: [
    'Drop the idea.',
    'Shape it together.',
    'Ship it while it matters.',
  ] as const,
} as const;
