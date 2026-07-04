import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { THEME } from "../theme";
import { BrandLockup } from "../components/BrandLockup";

export const Scene6Lockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Apple-style smooth spring reveal of the brand lockup
  const lockupSpring = spring({
    frame,
    fps,
    config: THEME.springs.smooth,
  });

  const logoScale = interpolate(lockupSpring, [0, 1], [0.82, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoOpacity = interpolate(lockupSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow continuous rotation of the planetary orbital emblem
  const logoRotate = interpolate(frame, [0, 60], [0, 25], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slogan reveal slightly delayed (frame 10 - 35)
  const sloganSpring = spring({
    frame: frame - 10,
    fps,
    config: THEME.springs.smooth,
  });
  const sloganOpacity = interpolate(sloganSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sloganTranslateY = interpolate(sloganSpring, [0, 1], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle background breathing glow
  const glowIntensity = 1 + Math.sin(frame * 0.08) * 0.15;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: THEME.colors.bg,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Subtle Background Radial Aura */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(56, 189, 248, 0.08) 50%, transparent 70%)`,
          filter: "blur(60px)",
          transform: `scale(${glowIntensity})`,
        }}
      />

      {/* Subtle Spatial Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: 0.5,
        }}
      />

      {/* Brand Lockup Emblem & Wordmark */}
      <BrandLockup
        scale={logoScale}
        opacity={logoOpacity}
        logoRotate={logoRotate}
        sloganOpacity={sloganOpacity}
        sloganTranslateY={sloganTranslateY}
        glowIntensity={glowIntensity}
      />

      {/* Subtle bottom copyright / end-card promotion line */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          fontSize: 14,
          color: THEME.colors.textDim,
          fontFamily: THEME.fonts.primary,
          letterSpacing: 1,
          opacity: sloganOpacity * 0.7,
        }}
      >
        ORBIT WORKSPACE © 2026 — DESIGNED FOR CREATIVE EXCELLENCE
      </div>
    </div>
  );
};
