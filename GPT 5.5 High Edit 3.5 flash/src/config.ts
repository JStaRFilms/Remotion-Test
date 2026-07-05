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

export const COLORS = {
  bg: '#050609',
  bg2: '#090B12',
  panel: '#111520',
  panel2: '#171C2A',
  stroke: 'rgba(255,255,255,0.11)',
  muted: '#79839A',
  text: '#F7F8FB',
  softText: '#C9D0DE',
  blue: '#38B7FF',
  violet: '#8C6CFF',
  cyan: '#85F4FF',
  green: '#74F0BA',
  amber: '#FFD166',
  danger: '#FF6B9A',
};

export const TYPO = {
  font: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
