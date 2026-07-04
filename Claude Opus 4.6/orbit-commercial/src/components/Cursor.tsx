import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { COLORS } from '../config';
import { ci } from '../utils/animations';

type CursorKeyframe = { x: number; y: number; frame: number };

type CursorProps = {
  positions: CursorKeyframe[];
  clickFrames?: number[];
  visible?: boolean;
  color?: string;
};

export const Cursor: React.FC<CursorProps> = ({
  positions,
  clickFrames = [],
  visible = true,
  color = COLORS.text,
}) => {
  const frame = useCurrentFrame();
  if (!visible || positions.length === 0) return null;

  // Interpolate position
  const frames = positions.map((p) => p.frame);
  const xs = positions.map((p) => p.x);
  const ys = positions.map((p) => p.y);

  const x = interpolate(frame, frames, xs, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });
  const y = interpolate(frame, frames, ys, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  // Click animation
  let cursorScale = 1;
  let rippleOpacity = 0;
  let rippleScale = 0;

  for (const cf of clickFrames) {
    if (frame >= cf && frame < cf + 15) {
      const localFrame = frame - cf;

      if (localFrame <= 3) {
        cursorScale = ci(localFrame, [0, 3], [1, 0.82]);
      } else if (localFrame <= 8) {
        cursorScale = ci(localFrame, [3, 8], [0.82, 1.02]);
      } else {
        cursorScale = ci(localFrame, [8, 15], [1.02, 1]);
      }

      rippleOpacity = ci(localFrame, [0, 15], [0.6, 0]);
      rippleScale = ci(localFrame, [0, 15], [0, 1.5], {
        easing: Easing.out(Easing.quad),
      });
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    >
      {/* Cursor SVG */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{
          transform: `scale(${cursorScale})`,
          transformOrigin: '4px 1px',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
        }}
      >
        <path
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L5.85 2.36a.5.5 0 0 0-.85.35l.5.5Z"
          fill={color}
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="1"
        />
      </svg>
      {/* Click ripple */}
      {rippleOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            left: 4,
            top: 4,
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: `2px solid ${COLORS.accent}`,
            opacity: rippleOpacity,
            transform: `translate(-50%, -50%) scale(${rippleScale})`,
          }}
        />
      )}
    </div>
  );
};
