import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SPRINGS } from "../constants";

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow camera pullback for final frame
  const pullback = interpolate(frame, [0, 60], [0, -30]);

  // Logo spring entrance
  const logoScale = spring({
    frame,
    fps,
    config: SPRINGS.smooth,
  });

  // Concentric rings rotation (animates to rest position 0)
  const ring1Rotate = interpolate(frame, [0, 45], [-180, 0], {
    extrapolateRight: "clamp",
  });
  const ring2Rotate = interpolate(frame, [0, 45], [180, 0], {
    extrapolateRight: "clamp",
  });

  // Core glow pulse
  const coreGlow = interpolate(frame, [25, 45, 60], [20, 45, 30], {
    extrapolateRight: "clamp",
  });

  // Wordmark "Orbit" reveal (starts frame 20)
  const wordmarkReveal = spring({
    frame: frame - 20,
    fps,
    config: SPRINGS.smooth,
  });
  const wordmarkY = interpolate(wordmarkReveal, [0, 1], [20, 0]);
  const wordmarkOpacity = interpolate(wordmarkReveal, [0, 1], [0, 1]);

  // Subtitle "Everything moves together." reveal (starts frame 35)
  const subtitleReveal = spring({
    frame: frame - 32,
    fps,
    config: SPRINGS.smooth,
  });
  const subtitleY = interpolate(subtitleReveal, [0, 1], [20, 0]);
  const subtitleOpacity = interpolate(subtitleReveal, [0, 1], [0, 1]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.bg,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Background Starfield Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(99, 102, 241, 0.08) 1.2px, transparent 1.2px)`,
          backgroundSize: "50px 50px",
          transform: `perspective(1000px) translateZ(${pullback * 0.5}px)`,
          opacity: 0.7,
        }}
      />

      {/* Main Lockup Content Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `perspective(1000px) translateZ(${pullback}px) scale(${logoScale})`,
        }}
      >
        {/* Animated Orbit Logo Symbol */}
        <div
          style={{
            width: 140,
            height: 140,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          {/* Outer Ring 1 */}
          <div
            style={{
              position: "absolute",
              width: 130,
              height: 130,
              borderRadius: "50%",
              border: `3px solid ${COLORS.accentCyan}`,
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
              transform: `rotate(${ring1Rotate}deg)`,
              opacity: 0.8,
            }}
          />
          {/* Inner Ring 2 */}
          <div
            style={{
              position: "absolute",
              width: 90,
              height: 90,
              borderRadius: "50%",
              border: `3px dashed ${COLORS.accentLight}`,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              transform: `rotate(${ring2Rotate}deg)`,
              opacity: 0.9,
            }}
          />
          {/* Glowing central core */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: COLORS.accentViolet,
              boxShadow: `0 0 ${coreGlow}px rgba(99, 102, 241, 0.8)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Center dot */}
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "white",
              }}
            />
          </div>
        </div>

        {/* Wordmark "Orbit" */}
        <h1
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: COLORS.textPrimary,
            margin: "0 0 12px 0",
            letterSpacing: "-0.03em",
            opacity: wordmarkOpacity,
            transform: `translateY(${wordmarkY}px)`,
          }}
        >
          Orbit
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: 20,
            fontWeight: 500,
            color: COLORS.textSecondary,
            margin: 0,
            letterSpacing: "0.01em",
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          Everything moves together.
        </p>
      </div>
    </div>
  );
};
