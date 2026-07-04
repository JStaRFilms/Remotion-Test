// Timings (in frames @ 30fps)
export const TIMINGS = {
  Scene1: { start: 0, duration: 90 },     // 0-89
  Scene2: { start: 90, duration: 150 },   // 90-239
  Scene3: { start: 240, duration: 150 },  // 240-389
  Scene4: { start: 390, duration: 180 },  // 390-569
  Scene5: { start: 570, duration: 120 },  // 570-689
  Scene6: { start: 690, duration: 60 },   // 690-749
  total: 750,
};

// Color Palette
export const COLORS = {
  bg: "#0B0B0F",
  cardBg: "#161622",
  border: "#2A2A3C",
  borderLight: "#4A4A6A",
  textPrimary: "#FFFFFF",
  textSecondary: "#8E939E",
  accentViolet: "#6366F1",
  accentLight: "#818CF8",
  accentCyan: "#38BDF8",
  success: "#34D399",
  collaborator: "#EC4899", // Pink cursor/user
};

// Easing / Spring configurations
export const SPRINGS = {
  smooth: { damping: 200 },                     // Smooth, no bounce
  snappy: { damping: 20, stiffness: 200 },       // Snappy, minimal bounce
  bouncy: { damping: 8, stiffness: 100 },       // Bouncy
  heavy: { damping: 15, stiffness: 80, mass: 2 }, // Heavy slow
};
