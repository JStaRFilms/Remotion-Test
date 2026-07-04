import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  AbsoluteFill,
} from 'remotion';
import { COLORS, SPRINGS, APP_DATA } from '../config';
import { fontFamily } from '../utils/fonts';

// ─── AppWindow Sub-component ─────────────────────────────────────────────────
const AppWindow: React.FC<{
  progress: number;
  checkedTask: number;
  parallaxX: number;
}> = ({ progress, checkedTask, parallaxX }) => {
  const navItems = ['Dashboard', 'Projects', 'Reviews', 'Team'];

  return (
    <div
      style={{
        width: 1100,
        height: 680,
        backgroundColor: COLORS.bgCard,
        borderRadius: 16,
        border: `1px solid ${COLORS.border}`,
        boxShadow: `
          0 25px 80px ${COLORS.shadow},
          0 8px 30px rgba(0,0,0,0.4),
          0 0 100px ${COLORS.accentGlow}
        `,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: 44,
          borderBottom: `1px solid ${COLORS.border}`,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 16,
          paddingRight: 16,
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF5F57' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FEBC2E' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28C840' }} />
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 13,
            color: COLORS.textMuted,
            fontWeight: '500',
          }}
        >
          Orbit
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <div
          style={{
            width: 200,
            borderRight: `1px solid ${COLORS.border}`,
            padding: '20px 0',
            transform: `translateX(${parallaxX * 0.3}px)`,
          }}
        >
          {navItems.map((item, i) => (
            <div
              key={item}
              style={{
                padding: '10px 20px',
                fontSize: 14,
                color: i === 1 ? COLORS.accent : COLORS.textSecondary,
                fontWeight: i === 1 ? '600' : '400',
                backgroundColor: i === 1 ? COLORS.accentGlow : 'transparent',
                borderLeft: i === 1 ? `3px solid ${COLORS.accent}` : '3px solid transparent',
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            padding: 32,
            transform: `translateX(${parallaxX * 0.15}px)`,
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: '700', color: COLORS.text }}>
                Brand Campaign Q4
              </div>
              <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 4 }}>
                4 team members · 12 tasks
              </div>
            </div>
            {/* Team avatars */}
            <div style={{ display: 'flex', gap: -8 }}>
              {APP_DATA.team.map((member, i) => (
                <div
                  key={member.name}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: member.avatar,
                    border: `2px solid ${COLORS.bgCard}`,
                    marginLeft: i > 0 ? -8 : 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: '600',
                    color: COLORS.text,
                    zIndex: APP_DATA.team.length - i,
                    position: 'relative',
                  }}
                >
                  {member.name[0]}
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ fontSize: 13, color: COLORS.textSecondary }}>Progress</div>
              <div style={{ fontSize: 13, color: COLORS.accent, fontWeight: '600' }}>
                {Math.round(progress)}%
              </div>
            </div>
            <div
              style={{
                height: 6,
                borderRadius: 3,
                backgroundColor: COLORS.surface,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  borderRadius: 3,
                  background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentLight})`,
                }}
              />
            </div>
          </div>

          {/* Task cards */}
          {['Hero Section Design', 'Motion System', 'Copy & Messaging'].map((task, i) => (
            <div
              key={task}
              style={{
                padding: '14px 18px',
                backgroundColor: checkedTask >= i ? 'rgba(52, 211, 153, 0.08)' : COLORS.surface,
                borderRadius: 10,
                marginBottom: 10,
                border: `1px solid ${checkedTask >= i ? 'rgba(52, 211, 153, 0.2)' : COLORS.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  border: `2px solid ${checkedTask >= i ? COLORS.success : COLORS.borderLight}`,
                  backgroundColor: checkedTask >= i ? COLORS.success : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  color: COLORS.text,
                  flexShrink: 0,
                }}
              >
                {checkedTask >= i ? '✓' : ''}
              </div>
              <div style={{ fontSize: 14, color: COLORS.text, fontWeight: '500' }}>
                {task}
              </div>
              <div style={{ marginLeft: 'auto', fontSize: 12, color: COLORS.textMuted }}>
                {APP_DATA.team[i]?.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Scene 2: Interface Reveal ───────────────────────────────────────────────
export const Scene2InterfaceReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera rotation (perspective entry)
  const rotY = interpolate(frame, [0, 40], [-8, -2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp),
  });

  const rotX = interpolate(frame, [0, 40], [4, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp),
  });

  // Camera push
  const cameraZ = interpolate(frame, [0, 50], [-200, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  // Window scale entrance
  const windowScale = spring({
    frame,
    fps,
    config: SPRINGS.smooth,
    durationInFrames: 30,
  });

  // Parallax drift
  const parallaxX = interpolate(frame, [0, 149], [20, -15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Progress bar animation
  const progress = interpolate(frame, [0, 30, 65, 75], [72, 72, 72, 85], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  // Task check animation
  const checkedTask = frame >= 105 ? 1 : frame >= 100 ? 0 : -1;

  // Cursor positions
  const cursorPositions = [
    { x: 1400, y: 900, frame: 0 },
    { x: 750, y: 345, frame: 40 },
    { x: 750, y: 345, frame: 64 },
    { x: 650, y: 445, frame: 90 },
    { x: 650, y: 445, frame: 100 },
    { x: 650, y: 445, frame: 149 },
  ];

  const cursorFrames = cursorPositions.map((p) => p.frame);
  const cursorXs = cursorPositions.map((p) => p.x);
  const cursorYs = cursorPositions.map((p) => p.y);

  const cursorX = interpolate(frame, cursorFrames, cursorXs, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cursorY = interpolate(frame, cursorFrames, cursorYs, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cursorVisible = frame >= 35;

  // Cursor click effects
  const clickFrames = [65, 100];
  let cursorScale = 1;
  let rippleOpacity = 0;
  let rippleScale = 0;

  for (const cf of clickFrames) {
    if (frame >= cf && frame < cf + 15) {
      const lf = frame - cf;
      if (lf <= 3) cursorScale = interpolate(lf, [0, 3], [1, 0.82], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
      else if (lf <= 8) cursorScale = interpolate(lf, [3, 8], [0.82, 1.02], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
      else cursorScale = interpolate(lf, [8, 15], [1.02, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
      rippleOpacity = interpolate(lf, [0, 15], [0.5, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
      rippleScale = interpolate(lf, [0, 15], [0, 1.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
    }
  }

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1200px',
        }}
      >
        <div
          style={{
            transform: `
              translateZ(${cameraZ}px)
              rotateX(${rotX}deg)
              rotateY(${rotY}deg)
              scale(${windowScale})
            `,
            transformStyle: 'preserve-3d',
          }}
        >
          <AppWindow
            progress={progress}
            checkedTask={checkedTask}
            parallaxX={parallaxX}
          />
        </div>
      </div>

      {/* Cursor */}
      {cursorVisible && (
        <div
          style={{
            position: 'absolute',
            left: cursorX,
            top: cursorY,
            zIndex: 1000,
            pointerEvents: 'none',
          }}
        >
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
              fill={COLORS.text}
              stroke="rgba(0,0,0,0.3)"
              strokeWidth="1"
            />
          </svg>
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
      )}
    </AbsoluteFill>
  );
};
