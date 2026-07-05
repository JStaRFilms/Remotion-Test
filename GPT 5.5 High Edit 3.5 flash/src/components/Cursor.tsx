import React from 'react';
import { COLORS } from '../config';
import { clickPulse, pathPoint, Point, t } from '../utils/animation';

export const Cursor: React.FC<{
  frame: number;
  path: Point[];
  clickFrames?: number[];
  visibleFrom?: number;
  visibleTo?: number;
  label?: string;
}> = ({ frame, path, clickFrames = [], visibleFrom = 0, visibleTo = 9999, label }) => {
  const point = pathPoint(frame, path);
  const visible = t(frame, visibleFrom, visibleFrom + 10) * (1 - t(frame, visibleTo - 10, visibleTo));
  const nearestClick = clickFrames.find((c) => frame >= c - 4 && frame <= c + 18) ?? -999;
  const pulse = clickPulse(frame, nearestClick, 18);
  const compression = pulse.active ? 1 - Math.sin(pulse.p * Math.PI) * 0.16 : 1;
  return (
    <div
      style={{
        position: 'absolute',
        left: point.x,
        top: point.y,
        width: 1,
        height: 1,
        opacity: visible,
        transform: `translateZ(180px) scale(${compression})`,
        transformOrigin: '0 0',
        zIndex: 50,
        filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.45))',
      }}
    >
      {pulse.active && (
        <div
          style={{
            position: 'absolute',
            left: -34 - pulse.p * 18,
            top: -34 - pulse.p * 18,
            width: 68 + pulse.p * 36,
            height: 68 + pulse.p * 36,
            borderRadius: 999,
            border: `2px solid rgba(133,244,255,${0.48 * (1 - pulse.p)})`,
            background: `rgba(56,183,255,${0.1 * (1 - pulse.p)})`,
          }}
        />
      )}
      <svg width="42" height="54" viewBox="0 0 42 54" fill="none" style={{ display: 'block' }}>
        <path d="M6 4L35 31L20.8 32.4L15.4 48L6 4Z" fill="white" stroke="rgba(0,0,0,0.34)" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M20.8 32.4L28.2 47.2" stroke={COLORS.blue} strokeWidth="4" strokeLinecap="round" />
      </svg>
      {label && (
        <div
          style={{
            position: 'absolute',
            left: 38,
            top: 34,
            padding: '8px 11px',
            borderRadius: 999,
            background: 'rgba(5,6,9,0.72)',
            border: '1px solid rgba(255,255,255,0.13)',
            color: COLORS.softText,
            fontSize: 13,
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
