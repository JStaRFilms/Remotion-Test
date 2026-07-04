import React from "react";
import { THEME } from "../theme";

export interface CursorProps {
  x: number;
  y: number;
  clicking?: boolean;
  clickProgress?: number; // 0 to 1 for animated compression and ripple
  label?: string;
  color?: string;
  opacity?: number;
  scale?: number;
}

export const Cursor: React.FC<CursorProps> = ({
  x,
  y,
  clicking = false,
  clickProgress = 0,
  label,
  color = THEME.colors.secondary,
  opacity = 1,
  scale = 1,
}) => {
  if (opacity <= 0) return null;

  // Click compression: when clicking or clickProgress peaks around 0.5, scale down to 0.85
  const compression = clicking ? 0.85 : 1 - Math.sin(clickProgress * Math.PI) * 0.15;
  const currentScale = scale * compression;

  // Ripple expansion and fade
  const rippleScale = 1 + clickProgress * 2.5;
  const rippleOpacity = (1 - clickProgress) * (clicking || clickProgress > 0 ? 0.8 : 0);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translate3d(${x}px, ${y}px, 0px)`,
        pointerEvents: "none",
        zIndex: 999,
        opacity,
      }}
    >
      {/* Click Ripple Effect */}
      {(clicking || clickProgress > 0) && (
        <div
          style={{
            position: "absolute",
            left: -12,
            top: -12,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: `2px solid ${color}`,
            backgroundColor: `${color}33`,
            transform: `scale(${rippleScale})`,
            opacity: rippleOpacity,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Cursor Icon container with compression scaling */}
      <div
        style={{
          transform: `scale(${currentScale})`,
          transformOrigin: "top left",
          display: "flex",
          alignItems: "flex-start",
          gap: 6,
        }}
      >
        {/* Modern macOS / Figma style SVG Pointer Cursor */}
        <svg
          width="24"
          height="28"
          viewBox="0 0 24 28"
          fill="none"
          style={{
            filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.6))",
          }}
        >
          <path
            d="M2.5 1.5L20.5 14L11.5 16L7 25.5L2.5 1.5Z"
            fill={color}
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>

        {/* Optional Username Tag / Badge for Collaborative multi-user review */}
        {label && (
          <div
            style={{
              padding: "4px 10px",
              borderRadius: 12,
              backgroundColor: color,
              color: "#FFFFFF",
              fontSize: 12,
              fontWeight: 700,
              fontFamily: THEME.fonts.primary,
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              whiteSpace: "nowrap",
              marginTop: 14,
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  );
};
