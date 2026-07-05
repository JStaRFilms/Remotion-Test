import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, TYPO } from '../config';

export const SceneShell: React.FC<{ children: React.ReactNode; vignette?: number }> = ({ children, vignette = 0.72 }) => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 54% 42%, rgba(56,183,255,0.12), transparent 30%), radial-gradient(circle at 72% 72%, rgba(140,108,255,0.11), transparent 34%), linear-gradient(180deg, ${COLORS.bg2}, ${COLORS.bg})`,
        color: COLORS.text,
        fontFamily: TYPO.font,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.032) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(circle at 50% 52%, black, transparent 72%)',
          opacity: 0.52,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 46%, transparent 0%, transparent 45%, rgba(0,0,0,${vignette}) 100%)`,
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
      width: 320,
      height: 1600,
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
      filter: 'blur(26px)',
      transform: `rotate(${rotate}deg)`,
      opacity,
      mixBlendMode: 'screen',
    }}
  />
);

export const DepthDust: React.FC<{ frame: number; intensity?: number }> = ({ frame, intensity = 1 }) => {
  const dots = Array.from({ length: 34 }, (_, i) => {
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
          width: z < 3 ? 1 : 2,
          height: z < 3 ? 1 : 2,
          borderRadius: 999,
          background: z % 3 === 0 ? 'rgba(133,244,255,0.55)' : 'rgba(255,255,255,0.38)',
          opacity: intensity * (0.12 + z * 0.035),
          boxShadow: z % 3 === 0 ? '0 0 10px rgba(56,183,255,0.45)' : undefined,
        }}
      />
    );
  });
  return <>{dots}</>;
};
