import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SPRINGS } from "../constants";

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Detaching Card Phase (0 - 45 frames)
  const detachProgress = spring({
    frame,
    fps,
    config: SPRINGS.smooth,
  });

  // Card translation and perspective zoom
  const cardScale = interpolate(detachProgress, [0, 1], [1, 1.8]);
  const cardRotateX = interpolate(detachProgress, [0, 1], [8, -5]);
  const cardRotateY = interpolate(detachProgress, [0, 1], [-4, 0]);
  const cardTranslateY = interpolate(detachProgress, [0, 1], [0, -100]);
  const dashboardOpacity = interpolate(frame, [0, 25], [1, 0], { extrapolateRight: "clamp" });

  // Shape distribution progress (how far apart the three shapes are)
  const distProgress = spring({
    frame: frame - 60,
    fps,
    config: SPRINGS.smooth,
  });
  const shapeDist = interpolate(distProgress, [0, 1], [0, 240]);

  // Shapes animations (staggered scaling)
  const shape1Scale = spring({ frame: frame - 65, fps, config: SPRINGS.snappy });
  const shape2Scale = spring({ frame: frame - 72, fps, config: SPRINGS.snappy });
  const shape3Scale = spring({ frame: frame - 79, fps, config: SPRINGS.snappy });

  // 3. Text entrance (staggered entries)
  const text1Reveal = spring({ frame: frame - 90, fps, config: SPRINGS.bouncy }); // Plan
  const text2Reveal = spring({ frame: frame - 105, fps, config: SPRINGS.bouncy }); // Review
  const text3Reveal = spring({ frame: frame - 120, fps, config: SPRINGS.bouncy }); // Deliver

  const text1Y = interpolate(text1Reveal, [0, 1], [30, 0]);
  const text2Y = interpolate(text2Reveal, [0, 1], [30, 0]);
  const text3Y = interpolate(text3Reveal, [0, 1], [30, 0]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.bg,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Background Dimmed Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(99, 102, 241, 0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: 0.8,
        }}
      />

      {/* Behind dashboard fading out */}
      {frame < 30 && (
        <div
          style={{
            position: "absolute",
            width: "80%",
            height: "70%",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            backgroundColor: COLORS.cardBg,
            opacity: dashboardOpacity,
            transform: "perspective(1200px) rotateX(8deg) rotateY(-4deg)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Morphing Elements Area */}
      {frame < 60 ? (
        // Detaching Card
        <div
          style={{
            width: 200,
            height: 140,
            backgroundColor: COLORS.cardBg,
            border: `1px solid ${COLORS.borderLight}`,
            boxShadow: `0 0 40px rgba(99, 102, 241, ${interpolate(detachProgress, [0, 1], [0.1, 0.4])})`,
            borderRadius: 8,
            padding: 16,
            transform: `perspective(1200px) rotateX(${cardRotateX}deg) rotateY(${cardRotateY}deg) scale(${cardScale}) translateY(${cardTranslateY}px)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "100%", height: 70, borderRadius: 4, backgroundColor: "#2E2A47" }} />
          <div style={{ width: "60%", height: 12, borderRadius: 2, backgroundColor: "white" }} />
        </div>
      ) : (
        // Morphed Horizontal Shapes + Text Columns
        <div style={{ display: "flex", gap: 80, alignItems: "center", justifyContent: "center" }}>
          {/* Column 1: Plan */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateX(${-shapeDist + 240}px)`,
              opacity: shape1Scale,
            }}
          >
            {/* Shape 1: Square with checklist lines */}
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: 12,
                border: `3px solid ${COLORS.accentCyan}`,
                backgroundColor: "rgba(56, 189, 248, 0.05)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${shape1Scale})`,
                boxShadow: `0 0 30px rgba(56, 189, 248, 0.1)`,
              }}
            >
              <div style={{ width: 40, height: 6, borderRadius: 2, backgroundColor: COLORS.accentCyan }} />
              <div style={{ width: 50, height: 6, borderRadius: 2, backgroundColor: COLORS.textSecondary }} />
              <div style={{ width: 30, height: 6, borderRadius: 2, backgroundColor: COLORS.textSecondary }} />
            </div>

            {/* Word: Plan */}
            <div
              style={{
                marginTop: 24,
                fontSize: 32,
                fontWeight: 800,
                color: COLORS.textPrimary,
                opacity: text1Reveal,
                transform: `translateY(${text1Y}px)`,
                letterSpacing: "-0.01em",
              }}
            >
              Plan
            </div>
          </div>

          {/* Column 2: Review */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: shape2Scale,
            }}
          >
            {/* Shape 2: Circle with play icon */}
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                border: `3px solid ${COLORS.accentViolet}`,
                backgroundColor: "rgba(99, 102, 241, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${shape2Scale}) rotate(${interpolate(frame, [100, 150], [0, 45], { extrapolateRight: "clamp" })}deg)`,
                boxShadow: `0 0 30px rgba(99, 102, 241, 0.15)`,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <polygon points="6 3 20 12 6 21 6 3" fill={COLORS.accentViolet} />
              </svg>
            </div>

            {/* Word: Review */}
            <div
              style={{
                marginTop: 24,
                fontSize: 32,
                fontWeight: 800,
                color: COLORS.accentLight,
                opacity: text2Reveal,
                transform: `translateY(${text2Y}px)`,
                letterSpacing: "-0.01em",
              }}
            >
              Review
            </div>
          </div>

          {/* Column 3: Deliver */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateX(${shapeDist - 240}px)`,
              opacity: shape3Scale,
            }}
          >
            {/* Shape 3: Diamond with checkmark */}
            <div
              style={{
                width: 100,
                height: 100,
                border: `3px solid ${COLORS.success}`,
                backgroundColor: "rgba(52, 211, 153, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${shape3Scale}) rotate(45deg)`,
                boxShadow: `0 0 30px rgba(52, 211, 153, 0.1)`,
                borderRadius: 8,
              }}
            >
              {/* Counter-rotated check icon */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={COLORS.success}
                strokeWidth="3"
                style={{ transform: "rotate(-45deg)" }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            {/* Word: Deliver */}
            <div
              style={{
                marginTop: 24,
                fontSize: 32,
                fontWeight: 800,
                color: COLORS.textPrimary,
                opacity: text3Reveal,
                transform: `translateY(${text3Y}px)`,
                letterSpacing: "-0.01em",
              }}
            >
              Deliver
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
