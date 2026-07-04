import React from "react";
import { THEME } from "../theme";

export interface BrandLockupProps {
  scale?: number;
  opacity?: number;
  logoRotate?: number;
  sloganOpacity?: number;
  sloganTranslateY?: number;
  glowIntensity?: number;
}

export const BrandLockup: React.FC<BrandLockupProps> = ({
  scale = 1,
  opacity = 1,
  logoRotate = 0,
  sloganOpacity = 1,
  sloganTranslateY = 0,
  glowIntensity = 1,
}) => {
  if (opacity <= 0) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        opacity,
        transform: `scale(${scale})`,
        fontFamily: THEME.fonts.display,
      }}
    >
      {/* Brand Icon and Wordmark Lockup */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {/* Animated Planetary Orbit Emblem */}
        <div
          style={{
            width: 100,
            height: 100,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Background Glow Aura */}
          <div
            style={{
              position: "absolute",
              width: 140,
              height: 140,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${THEME.colors.primary} 0%, transparent 70%)`,
              opacity: 0.6 * glowIntensity,
              filter: "blur(20px)",
            }}
          />

          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            style={{
              transform: `rotate(${logoRotate}deg)`,
              filter: "drop-shadow(0px 0px 16px rgba(99, 102, 241, 0.8))",
            }}
          >
            {/* Outer Orbital Ring 1 */}
            <ellipse
              cx="50"
              cy="50"
              rx="44"
              ry="18"
              transform="rotate(-30 50 50)"
              stroke="url(#orbitGradient1)"
              strokeWidth="3.5"
              strokeDasharray="220"
              strokeDashoffset={logoRotate * 0.5}
            />
            {/* Outer Orbital Ring 2 */}
            <ellipse
              cx="50"
              cy="50"
              rx="44"
              ry="18"
              transform="rotate(30 50 50)"
              stroke="url(#orbitGradient2)"
              strokeWidth="3.5"
            />
            {/* Core Sphere */}
            <circle cx="50" cy="50" r="18" fill="url(#coreGradient)" />
            {/* Orbiting Satellite node */}
            <circle
              cx={50 + 44 * Math.cos((logoRotate * Math.PI) / 180)}
              cy={50 - 18 * Math.sin((logoRotate * Math.PI) / 180)}
              r="5"
              fill="#38BDF8"
              style={{ filter: "drop-shadow(0px 0px 8px #38BDF8)" }}
            />

            <defs>
              <linearGradient id="orbitGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
              <linearGradient id="orbitGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <radialGradient id="coreGradient" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#1E1B4B" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Wordmark */}
        <span
          style={{
            fontSize: 92,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: -2,
            textShadow: "0 10px 40px rgba(0,0,0,0.8), 0 0 40px rgba(99, 102, 241, 0.4)",
          }}
        >
          Orbit
        </span>
      </div>

      {/* Slogan */}
      <div
        style={{
          opacity: sloganOpacity,
          transform: `translate3d(0, ${sloganTranslateY}px, 0)`,
          fontSize: 36,
          fontWeight: 600,
          color: THEME.colors.textMuted,
          letterSpacing: 0.5,
        }}
      >
        Everything moves together.
      </div>
    </div>
  );
};
