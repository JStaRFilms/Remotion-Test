import React from 'react';
import { COLORS, TYPO } from '../config';
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
        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.6))',
      }}
    >
      {/* Precision Expanding Click Square (instead of circular ripple) */}
      {pulse.active && (
        <>
          <div
            style={{
              position: 'absolute',
              left: -15 - pulse.p * 15,
              top: -15 - pulse.p * 15,
              width: 30 + pulse.p * 30,
              height: 30 + pulse.p * 30,
              border: `1px solid rgba(192, 132, 252, ${0.8 * (1 - pulse.p)})`,
              background: 'transparent',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: -5 - pulse.p * 5,
              top: -5 - pulse.p * 5,
              width: 10 + pulse.p * 10,
              height: 10 + pulse.p * 10,
              border: `1px dashed rgba(255, 255, 255, ${0.5 * (1 - pulse.p)})`,
            }}
          />
        </>
      )}
      
      {/* Sleek Vector Cursor */}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ display: 'block' }}>
        <path 
          d="M3 2L28 17L16.2 18.2L12.5 28.5L3 2Z" 
          fill="white" 
          stroke="rgba(0,0,0,0.5)" 
          strokeWidth="2" 
          strokeLinejoin="miter" 
        />
        <path 
          d="M16.2 18.2L21 27" 
          stroke={COLORS.violet} 
          strokeWidth="3.5" 
          strokeLinecap="square" 
        />
      </svg>
      
      {/* Flat rectangular label badge */}
      {label && (
        <div
          style={{
            position: 'absolute',
            left: 24,
            top: 24,
            padding: '4px 8px',
            borderRadius: 2, // Sharp rectangular card
            background: '#090a0d',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#fff',
            fontSize: 10,
            fontWeight: 600,
            fontFamily: TYPO.mono,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <span style={{ width: 4, height: 4, background: COLORS.green }} />
          {label}
        </div>
      )}
    </div>
  );
};
