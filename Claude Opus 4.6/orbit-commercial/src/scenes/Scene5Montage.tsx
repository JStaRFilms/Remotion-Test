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

// ─── Feature Panel Component ─────────────────────────────────────────────────
const FeaturePanel: React.FC<{
  variant: 'organize' | 'review' | 'approve' | 'analytics' | 'complete';
  progress: number;
  frame: number;
  fps: number;
}> = ({ variant, progress, frame, fps }) => {

  if (variant === 'organize') {
    const columns = ['To Do', 'In Progress', 'Done'];
    return (
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', gap: 16, padding: '80px 120px',
        fontFamily,
      }}>
        {columns.map((col, ci) => (
          <div key={col} style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: '600', color: COLORS.textSecondary, marginBottom: 12 }}>
              {col}
            </div>
            {[0, 1, 2].map((card) => {
              const cardProg = spring({
                frame: frame - (ci * 3 + card * 2),
                fps,
                config: SPRINGS.snappy,
              });
              return (
                <div key={card} style={{
                  height: 60, borderRadius: 10,
                  backgroundColor: COLORS.surface,
                  border: `1px solid ${COLORS.border}`,
                  marginBottom: 8,
                  opacity: cardProg,
                  transform: `translateY(${interpolate(cardProg, [0, 1], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                  padding: 12,
                }}>
                  <div style={{ width: `${40 + card * 20}%`, height: 8, borderRadius: 4, backgroundColor: COLORS.borderLight }} />
                  <div style={{ width: `${60 + card * 10}%`, height: 6, borderRadius: 3, backgroundColor: COLORS.border, marginTop: 8 }} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'review') {
    return (
      <div style={{
        position: 'absolute', inset: 0, padding: '80px 120px',
        fontFamily, display: 'flex', gap: 20,
      }}>
        <div style={{
          flex: 3, borderRadius: 12,
          background: `linear-gradient(135deg, ${COLORS.accentDim}30, ${COLORS.electricDim}30)`,
          border: `1px solid ${COLORS.border}`, position: 'relative',
        }}>
          {/* Timeline scrubber */}
          <div style={{
            position: 'absolute', bottom: 16, left: 16, right: 16, height: 4,
            backgroundColor: COLORS.surface, borderRadius: 2,
          }}>
            <div style={{
              width: `${progress * 100}%`, height: '100%',
              backgroundColor: COLORS.accent, borderRadius: 2,
            }} />
          </div>
          {/* Annotation markers */}
          {[0.25, 0.55, 0.8].map((pos, i) => (
            <div key={i} style={{
              position: 'absolute', left: `${pos * 100}%`, top: `${30 + i * 15}%`,
              width: 24, height: 24, borderRadius: '50%',
              backgroundColor: COLORS.accent, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 11, fontWeight: '700', color: COLORS.text,
            }}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'approve') {
    const approveClick = progress > 0.6;
    return (
      <div style={{
        position: 'absolute', inset: 0, padding: '80px 200px',
        fontFamily, display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* Comment thread */}
        {['Design approved ✓', 'Copy finalized', 'Motion review complete'].map((comment, i) => {
          const cprog = spring({ frame: frame - i * 5, fps, config: SPRINGS.smooth });
          return (
            <div key={i} style={{
              width: 500, padding: '14px 20px', backgroundColor: COLORS.surface,
              borderRadius: 10, marginBottom: 10,
              border: `1px solid ${COLORS.border}`,
              opacity: cprog,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: 6,
                backgroundColor: COLORS.success,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, color: COLORS.text,
              }}>✓</div>
              <span style={{ fontSize: 14, color: COLORS.textSecondary }}>{comment}</span>
            </div>
          );
        })}
        {/* Approve button */}
        <div style={{
          marginTop: 20, padding: '14px 40px', borderRadius: 10,
          backgroundColor: approveClick ? COLORS.success : COLORS.accent,
          fontSize: 16, fontWeight: '600', color: COLORS.text,
          transform: `scale(${approveClick ? 1.05 : 1})`,
        }}>
          {approveClick ? '✓ Approved' : 'Approve'}
        </div>
        {/* Particles on approve */}
        {approveClick && Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const dist = interpolate(progress, [0.6, 1], [0, 60 + i * 10], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            easing: Easing.out(Easing.quad),
          });
          return (
            <div key={i} style={{
              position: 'absolute',
              left: `calc(50% + ${Math.cos(angle) * dist}px)`,
              top: `calc(60% + ${Math.sin(angle) * dist}px)`,
              width: 6, height: 6, borderRadius: '50%',
              backgroundColor: i % 2 === 0 ? COLORS.success : COLORS.accent,
              opacity: interpolate(progress, [0.6, 1], [1, 0], {
                extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
              }),
            }} />
          );
        })}
      </div>
    );
  }

  if (variant === 'analytics') {
    return (
      <div style={{
        position: 'absolute', inset: 0, padding: '80px 160px',
        fontFamily, display: 'flex', gap: 30,
      }}>
        {/* Bar chart */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'flex-end', gap: 12, paddingBottom: 40,
        }}>
          {[0.4, 0.7, 0.55, 0.85, 0.65, 0.9].map((h, i) => (
            <div key={i} style={{
              flex: 1, height: `${h * progress * 100}%`,
              background: `linear-gradient(180deg, ${COLORS.accent}, ${COLORS.electric})`,
              borderRadius: '6px 6px 0 0',
              opacity: progress,
            }} />
          ))}
        </div>
        {/* Stats */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
          {[
            { label: 'Completion Rate', value: `${Math.round(progress * 94)}%`, color: COLORS.success },
            { label: 'Team Velocity', value: `${Math.round(progress * 12)}pts/wk`, color: COLORS.electric },
            { label: 'On-Time Delivery', value: `${Math.round(progress * 98)}%`, color: COLORS.accent },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 4 }}>{stat.label}</div>
              <div style={{ fontSize: 32, fontWeight: '700', color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // complete
  const checkProg = interpolate(progress, [0, 0.6], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp),
  });
  const glowProg = interpolate(progress, [0.4, 0.8], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily,
    }}>
      <div style={{
        position: 'relative', width: 120, height: 120,
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute', inset: -30,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.success}${Math.round(glowProg * 40).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
        }} />
        {/* Checkmark SVG */}
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke={COLORS.success}
            strokeWidth="3" opacity={checkProg * 0.3} />
          <path
            d="M35 60 L52 77 L85 44"
            fill="none"
            stroke={COLORS.success}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="80"
            strokeDashoffset={80 * (1 - checkProg)}
          />
        </svg>
      </div>
    </div>
  );
};

// ─── Scene 5: Montage ───────────────────────────────────────────────────────
export const Scene5Montage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Panel timings with overlaps
  const panels: Array<{
    variant: 'organize' | 'review' | 'approve' | 'analytics' | 'complete';
    start: number;
    end: number;
    maskDirection: 'right' | 'left' | 'bottom' | 'top';
  }> = [
    { variant: 'organize', start: 0, end: 28, maskDirection: 'right' },
    { variant: 'review', start: 22, end: 48, maskDirection: 'left' },
    { variant: 'approve', start: 42, end: 68, maskDirection: 'bottom' },
    { variant: 'analytics', start: 62, end: 88, maskDirection: 'top' },
    { variant: 'complete', start: 82, end: 119, maskDirection: 'right' },
  ];

  // Accent line that persists across panels
  const lineProgress = interpolate(frame, [0, 119], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Color shift
  const accentHue = interpolate(frame, [0, 60, 119], [260, 220, 150], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {panels.map((panel) => {
        const isActive = frame >= panel.start && frame <= panel.end;
        if (!isActive) return null;

        const localFrame = frame - panel.start;
        const duration = panel.end - panel.start;
        const panelProgress = interpolate(localFrame, [0, duration], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        // Mask clip
        const maskIn = interpolate(localFrame, [0, 10], [0, 100], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.exp),
        });
        const maskOut = interpolate(localFrame, [duration - 10, duration], [100, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const maskValue = Math.min(maskIn, maskOut);

        let clipPath = '';
        switch (panel.maskDirection) {
          case 'right': clipPath = `inset(0 ${100 - maskValue}% 0 0)`; break;
          case 'left': clipPath = `inset(0 0 0 ${100 - maskValue}%)`; break;
          case 'bottom': clipPath = `inset(0 0 ${100 - maskValue}% 0)`; break;
          case 'top': clipPath = `inset(${100 - maskValue}% 0 0 0)`; break;
        }

        return (
          <div
            key={panel.variant}
            style={{
              position: 'absolute',
              inset: 0,
              clipPath,
            }}
          >
            <FeaturePanel
              variant={panel.variant}
              progress={panelProgress}
              frame={localFrame}
              fps={fps}
            />
          </div>
        );
      })}

      {/* Connecting accent line */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: `${lineProgress * 100}%`,
          height: 2,
          background: `linear-gradient(90deg, transparent, hsl(${accentHue}, 70%, 60%))`,
          opacity: 0.3,
        }}
      />
    </AbsoluteFill>
  );
};
