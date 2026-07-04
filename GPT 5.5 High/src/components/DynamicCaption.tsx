import React from 'react';
import { COLORS } from '../config';
import { map, Point, pathPoint, t } from '../utils/animation';

export const DynamicCaption: React.FC<{
  frame: number;
  text: string;
  start: number;
  end: number;
  path: Point[];
  accent?: string;
  split?: boolean;
  attachAtEnd?: boolean;
}> = ({ frame, text, start, end, path, accent = COLORS.blue, split = false, attachAtEnd = false }) => {
  const point = pathPoint(frame, path);
  const enter = t(frame, start, start + 14);
  const exit = 1 - t(frame, end - 12, end);
  const opacity = enter * exit;
  const emphasis = Math.sin(t(frame, start + 8, start + 28) * Math.PI);
  const attach = attachAtEnd ? t(frame, end - 32, end - 8) : 0;
  const words = text.split(' ');
  return (
    <div
      style={{
        position: 'absolute',
        left: point.x,
        top: point.y,
        opacity,
        transform: `translate(-50%, -50%) scale(${map(frame, [start, start + 20], [0.84, 1]) - attach * 0.14 + emphasis * 0.035})`,
        transformOrigin: 'center',
        zIndex: 30,
        maxWidth: 640,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: split ? 10 : 0,
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          padding: attach > 0.65 ? '12px 18px' : '0',
          borderRadius: 22,
          border: attach > 0.65 ? `1px solid ${accent}` : '1px solid transparent',
          background: attach > 0.65 ? 'rgba(8,10,16,0.82)' : 'transparent',
          boxShadow: attach > 0.65 ? `0 18px 48px ${accent}22` : undefined,
        }}
      >
        {split ? (
          words.map((word, i) => {
            const wi = t(frame, start + i * 4, start + 14 + i * 4);
            return (
              <span
                key={`${word}-${i}`}
                style={{
                  display: 'inline-flex',
                  padding: i === words.length - 1 ? '12px 17px' : '10px 0',
                  color: i === words.length - 1 ? COLORS.bg : COLORS.text,
                  background: i === words.length - 1 ? accent : 'transparent',
                  borderRadius: 16,
                  fontSize: i === words.length - 1 ? 43 : 42,
                  lineHeight: 1,
                  fontWeight: 760,
                  letterSpacing: -1.2,
                  transform: `translateY(${(1 - wi) * 24}px) rotate(${(1 - wi) * -3}deg)`,
                  opacity: wi,
                }}
              >
                {word}
              </span>
            );
          })
        ) : (
          <div
            style={{
              color: COLORS.text,
              fontSize: 58,
              lineHeight: 0.96,
              fontWeight: 760,
              letterSpacing: -2,
              textShadow: '0 26px 60px rgba(0,0,0,0.45)',
            }}
          >
            {text}
          </div>
        )}
      </div>
    </div>
  );
};

export const InterfaceNote: React.FC<{ frame: number; start: number; x: number; y: number; text: string; color?: string }> = ({ frame, start, x, y, text, color = COLORS.violet }) => {
  const p = t(frame, start, start + 18);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 248,
        padding: '16px 18px',
        borderRadius: 22,
        background: 'rgba(12,14,22,0.88)',
        border: `1px solid ${color}88`,
        boxShadow: `0 20px 60px ${color}22`,
        color: COLORS.text,
        fontSize: 18,
        fontWeight: 620,
        opacity: p,
        transform: `translateY(${(1 - p) * 24}px) scale(${0.92 + p * 0.08})`,
        zIndex: 34,
      }}
    >
      <div style={{ width: 42, height: 4, borderRadius: 99, background: color, marginBottom: 12 }} />
      {text}
    </div>
  );
};
