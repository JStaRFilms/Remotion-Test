import { interpolate, Easing } from 'remotion';

type ClampedOptions = { easing?: (t: number) => number };

export const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

export const ci = (
  frame: number,
  inputRange: [number, number],
  outputRange: [number, number],
  options?: ClampedOptions
) =>
  interpolate(frame, inputRange, outputRange, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    ...(options?.easing ? { easing: options.easing } : {}),
  });

export const fadeIn = (frame: number, start: number, dur: number) =>
  ci(frame, [start, start + dur], [0, 1]);

export const fadeOut = (frame: number, start: number, dur: number) =>
  ci(frame, [start, start + dur], [1, 0]);

export const slideIn = (
  frame: number,
  start: number,
  dur: number,
  from: number,
  direction: 'x' | 'y' = 'x'
) => ci(frame, [start, start + dur], [from, 0], { easing: Easing.out(Easing.exp) });

export const stagger = (index: number, delayPerItem: number) =>
  index * delayPerItem;

export const EASE = {
  smooth: Easing.inOut(Easing.quad),
  snapIn: Easing.out(Easing.exp),
  snapOut: Easing.in(Easing.exp),
  gentle: Easing.out(Easing.sin),
  dramatic: Easing.bezier(0.16, 1, 0.3, 1),
} as const;
