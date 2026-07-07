import React from 'react';
import {COLORS} from '../config';
import {clamp, pathPosition} from '../utils';

type Point = {f: number; x: number; y: number};

type CursorProps = {
  frame: number;
  points: Point[];
  clicks?: number[];
  visibleFrom?: number;
  visibleTo?: number;
  size?: number;
};

export const cursorPulse = (frame: number, clickFrame: number, duration = 18) => {
  const t = (frame - clickFrame) / duration;
  if (t < 0 || t > 1) return 0;
  return Math.sin(Math.PI * t);
};

export const Cursor: React.FC<CursorProps> = ({frame, points, clicks = [], visibleFrom = 0, visibleTo = 9999, size = 34}) => {
  const visible = frame >= visibleFrom && frame <= visibleTo;
  const pos = pathPosition(frame, points);
  const click = Math.max(...clicks.map((c) => cursorPulse(frame, c, 18)), 0);
  const enter = clamp((frame - visibleFrom) / 12);
  const exit = clamp((visibleTo - frame) / 10);
  const opacity = visible ? Math.min(enter, exit) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        width: size,
        height: size,
        transform: `translate(-4px,-4px) scale(${1 - click * 0.16})`,
        opacity,
        zIndex: 1000,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 12px 22px rgba(0,0,0,0.55))',
      }}
    >
      {click > 0 && (
        <div
          style={{
            position: 'absolute',
            left: -24,
            top: -24,
            width: 78,
            height: 78,
            borderRadius: 999,
            border: `2px solid ${COLORS.blue}`,
            opacity: (1 - click) * 0.8,
            transform: `scale(${0.25 + click * 1.55})`,
            boxShadow: `0 0 38px rgba(79,195,255,${0.3 * (1 - click)})`,
          }}
        />
      )}
      <svg width="42" height="48" viewBox="0 0 42 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 4.5L35.5 27.2L21.2 29.9L14.1 43.5L5 4.5Z" fill="#F8FAFF" stroke="rgba(9,11,16,0.75)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M20.6 29.6L28.2 41.4" stroke="#DCEBFF" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
};
