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

// ─── MorphingShape ──────────────────────────────────────────────────────────
const MorphingShape: React.FC<{
  x: number;
  y: number;
  size: number;
  color: string;
  borderRadius: number;
  rotation: number;
  opacity: number;
  scale: number;
}> = ({ x, y, size, color, borderRadius, rotation, opacity, scale }) => (
  <div
    style={{
      position: 'absolute',
      left: x - size / 2,
      top: y - size / 2,
      width: size,
      height: size,
      borderRadius,
      backgroundColor: color,
      transform: `rotate(${rotation}deg) scale(${scale})`,
      opacity,
      boxShadow: `0 4px 20px ${color}33`,
    }}
  />
);

// ─── FeatureWord ─────────────────────────────────────────────────────────────
const FeatureWord: React.FC<{
  word: string;
  frame: number;
  delay: number;
  x: number;
  y: number;
  fps: number;
  color: string;
  direction: 'drop' | 'slide-right' | 'scale-up';
}> = ({ word, frame, delay, x, y, fps, color, direction }) => {
  const prog = spring({
    frame: frame - delay,
    fps,
    config: direction === 'drop' ? SPRINGS.bouncy : SPRINGS.smooth,
  });

  let translateX = 0;
  let translateY = 0;
  let scale = 1;

  if (direction === 'drop') {
    translateY = interpolate(prog, [0, 1], [-80, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (direction === 'slide-right') {
    translateX = interpolate(prog, [0, 1], [200, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else {
    scale = prog;
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        fontSize: 72,
        fontWeight: '800',
        fontFamily,
        color,
        letterSpacing: '-2px',
        opacity: prog,
        transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
      }}
    >
      {word}
      {direction === 'slide-right' && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: -4,
            width: interpolate(prog, [0.5, 1], [0, 200], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            height: 3,
            backgroundColor: color,
            borderRadius: 2,
          }}
        />
      )}
      {direction === 'scale-up' && prog > 0.8 && (
        <span
          style={{
            marginLeft: 12,
            fontSize: 32,
            color: COLORS.success,
            opacity: interpolate(prog, [0.8, 1], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          ✓
        </span>
      )}
    </div>
  );
};

// ─── Scene 3: Shape-to-Interface Transformation ─────────────────────────────
export const Scene3ShapeTransform: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ─── Cards detach and float ──────────────────────────────────────
  const detach = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp),
  });

  // ─── Morph to shapes ─────────────────────────────────────────────
  const morph = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  // ─── Orbit around center ─────────────────────────────────────────
  const orbit = interpolate(frame, [55, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const orbitAngle = orbit * Math.PI * 0.8;

  // ─── Morph back to interface elements ────────────────────────────
  const resolve = interpolate(frame, [85, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  // Background pulse
  const pulseIntensity = interpolate(frame, [0, 75, 149], [0, 0.15, 0.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Shape positions
  const cx = 960;
  const cy = 480;
  const spread = interpolate(detach, [0, 1], [0, 200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const shapes = [
    {
      baseX: cx - 220,
      baseY: cy,
      color: COLORS.accent,
      targetRadius: interpolate(morph, [0, 1], [12, 50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      rotation: morph * 0,
      orbitOffset: 0,
    },
    {
      baseX: cx,
      baseY: cy,
      color: COLORS.electric,
      targetRadius: interpolate(morph, [0, 1], [12, 12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      rotation: morph * 45,
      orbitOffset: (Math.PI * 2) / 3,
    },
    {
      baseX: cx + 220,
      baseY: cy,
      color: COLORS.success,
      targetRadius: 12,
      rotation: 0,
      orbitOffset: (Math.PI * 2 * 2) / 3,
    },
  ];

  // Final exit fade
  const exitOpacity = interpolate(frame, [130, 149], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Background pulse */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 45%, ${COLORS.accent}${Math.round(pulseIntensity * 255).toString(16).padStart(2, '0')} 0%, transparent 60%)`,
        }}
      />

      {/* Morphing shapes */}
      <div style={{ opacity: exitOpacity }}>
        {shapes.map((s, i) => {
          const orbitR = 160;
          const angle = orbitAngle + s.orbitOffset;
          const ox = orbit > 0 ? cx + orbitR * Math.cos(angle) : s.baseX + (i - 1) * spread;
          const oy = orbit > 0 ? cy + orbitR * Math.sin(angle) * 0.5 : s.baseY;

          // Resolve position
          const resolveX = interpolate(resolve, [0, 1], [ox, cx + (i - 1) * 280], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const resolveY = interpolate(resolve, [0, 1], [oy, cy + 80], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const finalX = resolve > 0 ? resolveX : ox;
          const finalY = resolve > 0 ? resolveY : oy;
          const size = interpolate(resolve, [0, 1], [80, 100], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <MorphingShape
              key={i}
              x={finalX}
              y={finalY}
              size={size}
              color={s.color}
              borderRadius={s.targetRadius}
              rotation={s.rotation}
              opacity={1}
              scale={1}
            />
          );
        })}
      </div>

      {/* Feature words */}
      <FeatureWord word="Plan" frame={frame} delay={40} x={180} y={280} fps={fps} color={COLORS.accent} direction="drop" />
      <FeatureWord word="Review" frame={frame} delay={65} x={780} y={340} fps={fps} color={COLORS.electric} direction="slide-right" />
      <FeatureWord word="Deliver" frame={frame} delay={90} x={1350} y={400} fps={fps} color={COLORS.success} direction="scale-up" />
    </AbsoluteFill>
  );
};
