export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 750,
  id: 'OrbitCommercial',
};

export const SCENES = {
  opening: {start: 0, end: 89},
  interfaceReveal: {start: 90, end: 239},
  transformation: {start: 240, end: 389},
  captions: {start: 390, end: 569},
  montage: {start: 570, end: 689},
  lockup: {start: 690, end: 749},
};

export const COLORS = {
  bg: '#07080d',
  bg2: '#0b0d14',
  panel: '#10131d',
  panel2: '#151925',
  panel3: '#1d2230',
  line: 'rgba(255,255,255,0.115)',
  lineStrong: 'rgba(255,255,255,0.22)',
  white: '#f7f8ff',
  muted: '#9ca5ba',
  dim: '#596176',
  blue: '#4fc3ff',
  violet: '#8b5cff',
  violet2: '#bba6ff',
  green: '#64f6bd',
  amber: '#ffcf77',
  red: '#ff647c',
};

export const TYPO = {
  font: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
};

export const SPRINGS = {
  precise: {damping: 24, stiffness: 130, mass: 0.8},
  heavy: {damping: 32, stiffness: 95, mass: 1.1},
  quick: {damping: 18, stiffness: 190, mass: 0.65},
};

export const DATA = {
  projects: ['Atlas Launch', 'Frame Lab', 'Northstar', 'Packaging', 'Season Trailer'],
  assets: ['Hero cut', 'Motion refs', 'Voiceover', 'Color pass'],
  people: ['M', 'AK', 'JS', 'RL'],
};
