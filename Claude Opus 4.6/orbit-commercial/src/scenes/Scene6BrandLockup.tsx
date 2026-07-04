import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  AbsoluteFill,
} from 'remotion';
import { COLORS, SPRINGS } from '../config';
import { fontFamily } from '../utils/fonts';

// ─── Scene 6: Brand Lockup ──────────────────────────────────────────────────
export const Scene6BrandLockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ─── Resolve from convergence ────────────────────────────────────
  const resolveProgress = spring({
    frame,
    fps,
    config: SPRINGS.smooth,
    durationInFrames: 20,
  });

  // ─── Logo ring drawing ───────────────────────────────────────────
  const ringDraw = interpolate(frame, [5, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp),
  });

  // ─── Orbiting dot position ───────────────────────────────────────
  const dotAngle = interpolate(frame, [10, 59], [0, Math.PI * 2.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  // ─── Dot flash ───────────────────────────────────────────────────
  const dotFlash = interpolate(frame, [18, 22, 26], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ─── Logo glow ───────────────────────────────────────────────────
  const glowIntensity = interpolate(frame, [15, 25, 45, 59], [0, 0.5, 0.6, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ─── Wordmark ────────────────────────────────────────────────────
  const wordmarkDelay = 15;
  const letters = 'Orbit'.split('');

  // ─── Tracking (letter-spacing) animation ─────────────────────────
  const tracking = interpolate(frame, [wordmarkDelay, wordmarkDelay + 20], [20, 4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp),
  });

  // ─── Tagline ─────────────────────────────────────────────────────
  const taglineProgress = spring({
    frame: frame - 30,
    fps,
    config: SPRINGS.smooth,
  });

  const taglineY = interpolate(taglineProgress, [0, 1], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ─── Final float ─────────────────────────────────────────────────
  const finalFloat = interpolate(frame, [45, 59], [0, -5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  // ─── Background gradient ─────────────────────────────────────────
  const bgGlow = interpolate(frame, [0, 30, 59], [0, 0.08, 0.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Logo dimensions
  const logoSize = 100;
  const cx = logoSize / 2;
  const cy = logoSize / 2;
  const rx = logoSize * 0.42;
  const ry = logoSize * 0.22;
  const tilt = -25;
  const circumference = Math.PI * 2 * Math.sqrt((rx * rx + ry * ry) / 2);

  const dotX = cx + rx * Math.cos(dotAngle);
  const dotY = cy + ry * Math.sin(dotAngle);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Background radial gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 45%, ${COLORS.accent}${Math.round(bgGlow * 255).toString(16).padStart(2, '0')} 0%, transparent 50%)`,
        }}
      />

      {/* Centered lockup container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateY(${finalFloat}px)`,
          opacity: resolveProgress,
        }}
      >
        {/* Logo */}
        <div style={{ position: 'relative', marginBottom: 24 }}>
          {/* Glow behind logo */}
          <div
            style={{
              position: 'absolute',
              inset: -40,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${COLORS.accent}${Math.round(glowIntensity * 60).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
            }}
          />
          <svg width={logoSize} height={logoSize} viewBox={`0 0 ${logoSize} ${logoSize}`}>
            {/* Orbital ring */}
            <ellipse
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
              fill="none"
              stroke={COLORS.accent}
              strokeWidth={2.5}
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - ringDraw)}
              strokeLinecap="round"
              transform={`rotate(${tilt} ${cx} ${cy})`}
            />
            {/* Center dot */}
            <circle cx={cx} cy={cy} r={5} fill={COLORS.accent} />
            {/* Orbiting dot */}
            <g transform={`rotate(${tilt} ${cx} ${cy})`}>
              <circle
                cx={dotX}
                cy={dotY}
                r={4}
                fill={COLORS.accentLight}
                opacity={ringDraw}
              />
              {/* Flash */}
              {dotFlash > 0 && (
                <circle
                  cx={dotX}
                  cy={dotY}
                  r={12}
                  fill="none"
                  stroke={COLORS.accentLight}
                  strokeWidth={1}
                  opacity={dotFlash * 0.6}
                />
              )}
            </g>
          </svg>
        </div>

        {/* Wordmark */}
        <div
          style={{
            display: 'flex',
            letterSpacing: tracking,
            fontFamily,
            marginBottom: 16,
          }}
        >
          {letters.map((letter, i) => {
            const letterProg = spring({
              frame: frame - wordmarkDelay - i * 2,
              fps,
              config: SPRINGS.smooth,
            });
            return (
              <span
                key={i}
                style={{
                  fontSize: 72,
                  fontWeight: '700',
                  color: COLORS.text,
                  opacity: letterProg,
                  transform: `translateY(${interpolate(letterProg, [0, 1], [15, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  })}px)`,
                  display: 'inline-block',
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            fontWeight: '400',
            color: COLORS.textSecondary,
            fontFamily,
            opacity: taglineProgress,
            transform: `translateY(${taglineY}px)`,
            letterSpacing: '0.5px',
          }}
        >
          Everything moves together.
        </div>
      </div>
    </AbsoluteFill>
  );
};
