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

export const Scene1Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ─── Glowing point ────────────────────────────────────────────────
  const pointScale = spring({
    frame,
    fps,
    config: SPRINGS.snappy,
    durationInFrames: 25,
  });

  const pointGlow = interpolate(frame, [0, 15, 30], [0, 0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ─── Point to logo morph ─────────────────────────────────────────
  const morphProgress = spring({
    frame: frame - 20,
    fps,
    config: SPRINGS.smooth,
    durationInFrames: 20,
  });

  // ─── Logo to window morph ────────────────────────────────────────
  const windowProgress = spring({
    frame: frame - 38,
    fps,
    config: SPRINGS.smooth,
    durationInFrames: 20,
  });

  const windowWidth = interpolate(windowProgress, [0, 1], [80, 400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const windowHeight = interpolate(windowProgress, [0, 1], [80, 250], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const windowRadius = interpolate(windowProgress, [0, 1], [40, 12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const windowBorder = interpolate(windowProgress, [0, 1], [2, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ─── Title text ──────────────────────────────────────────────────
  const line1Spring = spring({
    frame: frame - 50,
    fps,
    config: SPRINGS.smooth,
  });
  const line2Spring = spring({
    frame: frame - 58,
    fps,
    config: SPRINGS.smooth,
  });

  const line1X = interpolate(line1Spring, [0, 1], [-120, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const line1Opacity = line1Spring;

  const line2X = interpolate(line2Spring, [0, 1], [120, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const line2Opacity = line2Spring;

  // ─── Grid background ─────────────────────────────────────────────
  const gridOpacity = interpolate(frame, [40, 70], [0, 0.04], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ─── Camera Z push ───────────────────────────────────────────────
  const cameraZ = interpolate(frame, [0, 89], [-80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  // ─── Logo ring drawing ───────────────────────────────────────────
  const ringDraw = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp),
  });

  const dotAngle = interpolate(frame, [20, 89], [0, Math.PI * 1.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        perspective: '1200px',
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(${COLORS.borderLight} 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.borderLight} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main content container with camera movement */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateZ(${cameraZ}px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glowing point / Logo / Window morph */}
        <div
          style={{
            position: 'relative',
            width: windowWidth,
            height: windowHeight,
            borderRadius: windowRadius,
            border: `${windowBorder}px solid ${COLORS.border}`,
            backgroundColor:
              windowProgress > 0.1
                ? COLORS.bgCard
                : 'transparent',
            transform: `scale(${pointScale})`,
            boxShadow: pointGlow > 0
              ? `0 0 ${60 * pointGlow}px ${COLORS.accent}, 0 0 ${120 * pointGlow}px ${COLORS.accentDim}`
              : windowProgress > 0.5
                ? `0 8px 40px ${COLORS.shadow}, 0 0 80px ${COLORS.accentGlow}`
                : 'none',
            overflow: 'hidden',
          }}
        >
          {/* Inner glow point */}
          {frame < 30 && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: COLORS.accent,
                  boxShadow: `0 0 20px ${COLORS.accent}`,
                  opacity: interpolate(frame, [0, 5, 20], [0, 1, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                }}
              />
            </div>
          )}

          {/* Logo ring (visible during morph) */}
          {morphProgress > 0 && windowProgress < 0.9 && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: interpolate(windowProgress, [0, 0.8], [1, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80">
                <ellipse
                  cx="40"
                  cy="40"
                  rx="34"
                  ry="18"
                  fill="none"
                  stroke={COLORS.accent}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${Math.PI * 2 * 26}`}
                  strokeDashoffset={`${Math.PI * 2 * 26 * (1 - ringDraw)}`}
                  transform="rotate(-25 40 40)"
                />
                <circle cx="40" cy="40" r="4" fill={COLORS.accent} />
                <g transform="rotate(-25 40 40)">
                  <circle
                    cx={40 + 34 * Math.cos(dotAngle)}
                    cy={40 + 18 * Math.sin(dotAngle)}
                    r="3"
                    fill={COLORS.accentLight}
                    opacity={ringDraw}
                  />
                </g>
              </svg>
            </div>
          )}

          {/* Window title bar hint */}
          {windowProgress > 0.5 && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 28,
                borderBottom: `1px solid ${COLORS.border}`,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 10,
                gap: 5,
                opacity: interpolate(windowProgress, [0.5, 1], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }}
            >
              <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#FF5F57' }} />
              <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#FEBC2E' }} />
              <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#28C840' }} />
            </div>
          )}
        </div>

        {/* Title text */}
        <div
          style={{
            position: 'absolute',
            left: '18%',
            top: '55%',
            fontFamily,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: '700',
              color: COLORS.text,
              opacity: line1Opacity,
              transform: `translateX(${line1X}px)`,
              letterSpacing: '-1px',
              lineHeight: 1.1,
            }}
          >
            Your work.
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: '300',
              color: COLORS.textSecondary,
              opacity: line2Opacity,
              transform: `translateX(${line2X}px)`,
              letterSpacing: '-1px',
              lineHeight: 1.1,
              marginTop: 4,
            }}
          >
            In motion.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
