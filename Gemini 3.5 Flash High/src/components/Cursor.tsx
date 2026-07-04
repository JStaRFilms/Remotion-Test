import React from "react";
import { interpolate } from "remotion";
import { COLORS } from "../constants";

interface CursorProps {
  x: number;
  y: number;
  clickProgress?: number; // 0 to 1 progress of click action
  color?: string;
  label?: string;
  opacity?: number;
}

export const Cursor: React.FC<CursorProps> = ({
  x,
  y,
  clickProgress = 0,
  color = COLORS.accentCyan,
  label,
  opacity = 1,
}) => {


  // Click compression: Scale cursor down to 0.8 when clickProgress is near 1
  const cursorScale = interpolate(clickProgress, [0, 0.5, 1], [1, 0.8, 1]);

  // Click ripple: Ring scales from 0 to 3 and fades to 0
  const rippleScale = interpolate(clickProgress, [0, 1], [0.2, 3]);
  const rippleOpacity = interpolate(clickProgress, [0, 0.2, 1], [0, 0.8, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-2px, -2px)",
        pointerEvents: "none",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        opacity,
      }}
    >
      {/* Click Ripple Effect */}
      {clickProgress > 0 && (
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 10,
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: `2px solid ${color}`,
            transform: `translate(-50%, -50%) scale(${rippleScale})`,
            opacity: rippleOpacity,
          }}
        />
      )}

      {/* SVG Mouse Pointer */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          transform: `scale(${cursorScale})`,
          transformOrigin: "top left",
          filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.4))",
        }}
      >
        <path
          d="M3 3V21L9 15L13 23L17 21L13 13L21 9L3 3Z"
          fill={color}
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Optional Collaborator Label */}
      {label && (
        <div
          style={{
            marginLeft: 12,
            marginTop: 8,
            backgroundColor: color,
            color: "white",
            fontSize: 12,
            fontWeight: "bold",
            padding: "3px 8px",
            borderRadius: 4,
            whiteSpace: "nowrap",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
