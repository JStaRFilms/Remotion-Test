import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, TYPO } from '../config';

export const SceneShell: React.FC<{ children: React.ReactNode; vignette?: number }> = ({ children, vignette = 0.72 }) => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 30%, rgba(99,102,241,0.06), transparent 50%), linear-gradient(180deg, ${COLORS.bg2}, ${COLORS.bg})`,
        color: COLORS.text,
        fontFamily: TYPO.font,
        overflow: 'hidden',
      }}
    >
      {/* Precision Technical Dot Grid Matrix (Brutalist style) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 85%)',
          opacity: 0.8,
        }}
      />
      
      {/* Sharp technical grid dividers */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 75%)',
          opacity: 0.6,
        }}
      />
      
      {/* Technical Matte Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,${vignette * 1.05}) 100%)`,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

export const LightSweep: React.FC<{ x: number; opacity?: number; rotate?: number }> = ({ x, opacity = 0.25, rotate = -18 }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: -240,
      width: 140, // Narrower, sharper sweep
      height: 1600,
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), rgba(99,102,241,0.04), rgba(255,255,255,0.06), transparent)',
      filter: 'blur(16px)',
      transform: `rotate(${rotate}deg)`,
      opacity,
      mixBlendMode: 'screen',
    }}
  />
);

export const DepthDust: React.FC<{ frame: number; intensity?: number }> = ({ frame, intensity = 1 }) => {
  const dots = Array.from({ length: 30 }, (_, i) => {
    const x = (i * 313) % 1900;
    const y = (i * 197) % 1040;
    const z = (i % 7) + 1;
    const drift = ((frame * (0.15 + z * 0.02) + i * 17) % 38) - 19;
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: x + drift,
          top: y + drift * 0.22,
          width: 1.5,
          height: 1.5,
          borderRadius: 0, // Sharp square technical dust/particles
          background: z % 3 === 0 ? COLORS.cyan : 'rgba(255,255,255,0.3)',
          opacity: intensity * (0.1 + z * 0.035),
        }}
      />
    );
  });
  return <>{dots}</>;
};
