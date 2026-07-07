import {Easing, interpolate} from 'remotion';

export const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

export const norm = (frame: number, start: number, end: number) =>
  clamp((frame - start) / Math.max(1, end - start));

export const ease = (t: number) => Easing.bezier(0.22, 1, 0.36, 1)(clamp(t));
export const easeInOut = (t: number) => Easing.bezier(0.76, 0, 0.24, 1)(clamp(t));
export const easeIn = (t: number) => Easing.bezier(0.66, 0, 0.34, 1)(clamp(t));
export const easeOutBack = (t: number) => {
  const c1 = 1.35;
  const c3 = c1 + 1;
  const x = clamp(t) - 1;
  return 1 + c3 * x * x * x + c1 * x * x;
};

export const i = (
  frame: number,
  input: number[],
  output: number[],
  extrapolate: 'clamp' | 'extend' = 'clamp'
) =>
  interpolate(frame, input, output, {
    extrapolateLeft: extrapolate,
    extrapolateRight: extrapolate,
  });

export const mix = (a: number, b: number, t: number) => a + (b - a) * clamp(t);

export const cssVar = (x: number) => `${x.toFixed(2)}px`;

export const flicker = (frame: number, amp = 1) => {
  const v = Math.sin(frame * 1.71) * 0.5 + Math.sin(frame * 0.43 + 2) * 0.3 + Math.sin(frame * 2.91) * 0.2;
  return v * amp;
};

export const pathPosition = (
  frame: number,
  points: {f: number; x: number; y: number}[]
) => {
  if (frame <= points[0].f) return points[0];
  for (let idx = 0; idx < points.length - 1; idx++) {
    const a = points[idx];
    const b = points[idx + 1];
    if (frame >= a.f && frame <= b.f) {
      const t = easeInOut((frame - a.f) / (b.f - a.f));
      return {f: frame, x: mix(a.x, b.x, t), y: mix(a.y, b.y, t)};
    }
  }
  return points[points.length - 1];
};
