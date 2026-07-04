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

// ─── DynamicCaption Component ────────────────────────────────────────────────
const DynamicCaption: React.FC<{
  text: string;
  frame: number;
  startFrame: number;
  endFrame: number;
  fps: number;
  x: number;
  y: number;
  fontSize: number;
  entryDirection: 'top' | 'left' | 'right';
  emphasisWord?: string;
  emphasisScale?: number;
  transformToUI?: boolean;
  transformFrame?: number;
}> = ({
  text,
  frame,
  startFrame,
  endFrame,
  fps,
  x,
  y,
  fontSize,
  entryDirection,
  emphasisWord,
  emphasisScale = 1.3,
  transformToUI = false,
  transformFrame = 0,
}) => {
  const localFrame = frame - startFrame;
  if (localFrame < 0 || frame > endFrame) return null;

  const entryProgress = spring({
    frame: localFrame,
    fps,
    config: SPRINGS.smooth,
  });

  let tx = 0;
  let ty = 0;
  if (entryDirection === 'top') ty = interpolate(entryProgress, [0, 1], [-100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  if (entryDirection === 'left') tx = interpolate(entryProgress, [0, 1], [-200, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  if (entryDirection === 'right') tx = interpolate(entryProgress, [0, 1], [200, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Transform to UI element
  let uiProgress = 0;
  if (transformToUI && transformFrame > 0) {
    uiProgress = interpolate(localFrame, [transformFrame, transformFrame + 15], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.exp),
    });
  }

  const exitOpacity = interpolate(localFrame, [endFrame - startFrame - 15, endFrame - startFrame], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const words = text.split(' ');

  // UI transform — turn into a button-like element
  if (uiProgress > 0.8) {
    return (
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          opacity: exitOpacity,
          transform: `translateX(${tx}px) translateY(${ty}px)`,
        }}
      >
        <div
          style={{
            padding: '12px 28px',
            backgroundColor: COLORS.accent,
            borderRadius: 8,
            fontSize: 16,
            fontWeight: '600',
            fontFamily,
            color: COLORS.text,
            opacity: uiProgress,
            transform: `scale(${interpolate(uiProgress, [0.8, 1], [0.9, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
          }}
        >
          {text}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity: entryProgress * exitOpacity,
        transform: `translateX(${tx}px) translateY(${ty}px)`,
        fontFamily,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0 12px',
      }}
    >
      {words.map((word, i) => {
        const isEmphasis = emphasisWord && word.replace(/[.,!]/, '') === emphasisWord;
        const wordDelay = i * 3;
        const wordProg = spring({
          frame: localFrame - wordDelay,
          fps,
          config: SPRINGS.snappy,
        });

        const wordScale = isEmphasis
          ? interpolate(wordProg, [0, 0.5, 1], [0, emphasisScale, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          : 1;

        return (
          <span
            key={i}
            style={{
              fontSize: isEmphasis ? fontSize * 1.3 : fontSize,
              fontWeight: isEmphasis ? '800' : '500',
              color: isEmphasis ? COLORS.accent : COLORS.text,
              opacity: wordProg,
              transform: `scale(${wordScale})`,
              display: 'inline-block',
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// ─── Review Interface ────────────────────────────────────────────────────────
const ReviewInterface: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entryProg = spring({ frame, fps, config: SPRINGS.smooth });

  // Annotation pins appear
  const pin1 = spring({ frame: frame - 20, fps, config: SPRINGS.snappy });
  const pin2 = spring({ frame: frame - 35, fps, config: SPRINGS.snappy });

  return (
    <div
      style={{
        position: 'absolute',
        left: 160,
        top: 180,
        width: 900,
        height: 500,
        display: 'flex',
        gap: 20,
        opacity: entryProg,
        transform: `scale(${interpolate(entryProg, [0, 1], [0.95, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
      }}
    >
      {/* Media preview */}
      <div
        style={{
          flex: 2,
          borderRadius: 12,
          background: `linear-gradient(135deg, ${COLORS.surface}, ${COLORS.surfaceLight})`,
          border: `1px solid ${COLORS.border}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gradient representing media */}
        <div
          style={{
            position: 'absolute',
            inset: 20,
            borderRadius: 8,
            background: `linear-gradient(145deg, ${COLORS.accentDim}40, ${COLORS.electricDim}40)`,
          }}
        />
        {/* Annotation pins */}
        {[
          { x: '30%', y: '40%', prog: pin1, label: '1' },
          { x: '65%', y: '55%', prog: pin2, label: '2' },
        ].map((pin) => (
          <div
            key={pin.label}
            style={{
              position: 'absolute',
              left: pin.x,
              top: pin.y,
              width: 28,
              height: 28,
              borderRadius: '50%',
              backgroundColor: COLORS.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: '700',
              color: COLORS.text,
              fontFamily,
              opacity: pin.prog,
              transform: `scale(${pin.prog})`,
              boxShadow: `0 2px 12px ${COLORS.accentGlow}`,
            }}
          >
            {pin.label}
          </div>
        ))}
      </div>

      {/* Comment sidebar */}
      <div
        style={{
          flex: 1,
          borderRadius: 12,
          backgroundColor: COLORS.bgCard,
          border: `1px solid ${COLORS.border}`,
          padding: 16,
          fontFamily,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: '600', color: COLORS.text, marginBottom: 16 }}>
          Comments
        </div>
        {['Updated hero layout', 'Transition timing ✓', 'Final copy approved'].map((comment, i) => {
          const commentProg = spring({ frame: frame - 15 - i * 12, fps, config: SPRINGS.smooth });
          return (
            <div
              key={i}
              style={{
                padding: '10px 12px',
                backgroundColor: COLORS.surface,
                borderRadius: 8,
                marginBottom: 8,
                fontSize: 12,
                color: COLORS.textSecondary,
                opacity: commentProg,
                transform: `translateY(${interpolate(commentProg, [0, 1], [10, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
              }}
            >
              {comment}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Scene 4: Dynamic Captions ──────────────────────────────────────────────
export const Scene4DynamicCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Review interface */}
      <ReviewInterface frame={frame} fps={fps} />

      {/* Caption 1: "Drop the idea." */}
      <DynamicCaption
        text="Drop the idea."
        frame={frame}
        startFrame={5}
        endFrame={65}
        fps={fps}
        x={200}
        y={100}
        fontSize={42}
        entryDirection="top"
        emphasisWord="Drop"
        transformToUI
        transformFrame={40}
      />

      {/* Caption 2: "Shape it together." */}
      <DynamicCaption
        text="Shape it together."
        frame={frame}
        startFrame={55}
        endFrame={125}
        fps={fps}
        x={1050}
        y={250}
        fontSize={38}
        entryDirection="left"
        emphasisWord="Shape"
        emphasisScale={1.4}
      />

      {/* Caption 3: "Ship it while it matters." */}
      <DynamicCaption
        text="Ship it while it matters."
        frame={frame}
        startFrame={115}
        endFrame={179}
        fps={fps}
        x={1100}
        y={550}
        fontSize={36}
        entryDirection="right"
        emphasisWord="Ship"
        transformToUI
        transformFrame={55}
      />

      {/* Cursor interaction */}
      {frame >= 25 && frame <= 120 && (() => {
        const cursorPositions = [
          { frame: 25, x: 1300, y: 800 },
          { frame: 45, x: 480, y: 420 },
          { frame: 60, x: 480, y: 420 },
          { frame: 80, x: 750, y: 490 },
          { frame: 100, x: 1100, y: 350 },
          { frame: 120, x: 1100, y: 350 },
        ];
        const frames = cursorPositions.map(p => p.frame);
        const xs = cursorPositions.map(p => p.x);
        const ys = cursorPositions.map(p => p.y);

        const cx = interpolate(frame, frames, xs, { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const cy = interpolate(frame, frames, ys, { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        return (
          <div style={{ position: 'absolute', left: cx, top: cy, zIndex: 1000 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
              <path
                d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L5.85 2.36a.5.5 0 0 0-.85.35l.5.5Z"
                fill={COLORS.text}
                stroke="rgba(0,0,0,0.3)"
                strokeWidth="1"
              />
            </svg>
          </div>
        );
      })()}
    </AbsoluteFill>
  );
};
