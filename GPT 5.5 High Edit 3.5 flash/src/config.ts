export const VIDEO = {
  id: 'OrbitCommercial',
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 750,
};

export const SCENES = {
  opening: { from: 0, duration: 90 },
  interfaceReveal: { from: 90, duration: 150 },
  transformation: { from: 240, duration: 150 },
  captions: { from: 390, duration: 180 },
  montage: { from: 570, duration: 120 },
  lockup: { from: 690, duration: 60 },
};

// Refined Technical Brutalism / Mono-Chrono Lilac color palette
export const COLORS = {
  bg: '#08090b',         // Matte Obsidian
  bg2: '#0e1014',        // Charcoal Slate
  panel: '#14161d',      // Technical Carbon
  panel2: '#1b1d26',     // Dark Steel
  stroke: 'rgba(255,255,255,0.06)', // Razor-thin divider
  muted: '#626775',      // Matte Slate
  text: '#ffffff',       // Pure White
  softText: '#cbd5e1',   // Light Slate
  blue: '#6366f1',       // Restrained Indigo
  violet: '#8b5cf6',     // Electric Violet
  cyan: '#c084fc',       // Soft Lilac
  green: '#a78bfa',      // Pastel Lavender
  amber: '#d8b4fe',      // Light Lavender
  danger: '#fda4af',     // Rose (Muted Red)
};

export const TYPO = {
  font: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  mono: '"SF Mono", "Cascadia Code", Consolas, monospace',
};

export const SPRING = {
  smooth: { damping: 200, stiffness: 120, mass: 1 },
  snappy: { damping: 24, stiffness: 220, mass: 0.9 },
  heavy: { damping: 18, stiffness: 72, mass: 2.1 },
};

export const SAFE = 92;

export const projects = [
  { name: 'Launch Film', progress: 78, status: 'Review', color: COLORS.blue },
  { name: 'Brand System', progress: 54, status: 'Plan', color: COLORS.violet },
  { name: 'Social Cutdowns', progress: 92, status: 'Deliver', color: COLORS.green },
];
