import { Easing, interpolate, spring } from 'remotion';
import { SPRING } from '../config';

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const t = (frame: number, start: number, end: number, easing: (input: number) => number = Easing.inOut(Easing.quad)) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

export const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;

export const map = (
  frame: number,
  input: number[],
  output: number[],
  easing: (input: number) => number = Easing.linear,
) =>
  interpolate(frame, input, output, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

export const softSpring = (frame: number, fps: number, durationInFrames = 34) =>
  spring({ frame, fps, config: SPRING.smooth, durationInFrames });

export const snappySpring = (frame: number, fps: number, durationInFrames = 24) =>
  spring({ frame, fps, config: SPRING.snappy, durationInFrames });

export type Point = { frame: number; x: number; y: number };

export const pathPoint = (frame: number, points: Point[]) => {
  if (frame <= points[0].frame) return points[0];
  if (frame >= points[points.length - 1].frame) return points[points.length - 1];
  const nextIndex = points.findIndex((p) => p.frame >= frame);
  const a = points[nextIndex - 1];
  const b = points[nextIndex];
  const progress = t(frame, a.frame, b.frame, Easing.inOut(Easing.cubic));
  return {
    frame,
    x: mix(a.x, b.x, progress),
    y: mix(a.y, b.y, progress),
  };
};

export const clickPulse = (frame: number, clickAt: number, duration = 16) => {
  const p = t(frame, clickAt, clickAt + duration, Easing.out(Easing.circle));
  const active = frame >= clickAt && frame <= clickAt + duration;
  return { active, p };
};
