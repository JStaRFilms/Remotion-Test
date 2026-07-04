import React from "react";
import { THEME } from "../theme";

export interface FeatureCardProps {
  title: string;
  subtitle?: string;
  status?: string;
  statusColor?: string;
  progress?: number; // 0 to 100
  team?: string[];
  iconType?: "video" | "image" | "code" | "milestone" | "plan" | "review" | "deliver";
  scale?: number;
  opacity?: number;
  translateZ?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  elevation?: number; // drop shadow intensity
  width?: number;
  height?: number | string;
  highlighted?: boolean;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  subtitle,
  status,
  statusColor = THEME.colors.secondary,
  progress,
  team = [],
  iconType = "video",
  scale = 1,
  opacity = 1,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  elevation = 30,
  width = 340,
  height = "auto",
  highlighted = false,
}) => {
  if (opacity <= 0) return null;

  return (
    <div
      style={{
        width,
        height,
        padding: 20,
        borderRadius: 18,
        backgroundColor: highlighted ? "rgba(99, 102, 241, 0.18)" : THEME.colors.surfaceElevated,
        border: `1.5px solid ${highlighted ? THEME.colors.primaryGlow : THEME.colors.borderHighlight}`,
        boxShadow: `
          0 ${elevation}px ${elevation * 2.5}px -10px rgba(0, 0, 0, 0.7),
          0 0 ${highlighted ? 40 : 15}px ${highlighted ? THEME.colors.primaryGlow : "rgba(0,0,0,0.3)"}
        `,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        fontFamily: THEME.fonts.primary,
        color: THEME.colors.text,
        transform: `
          perspective(1200px)
          translateZ(${translateZ}px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          rotateZ(${rotateZ}deg)
          scale(${scale})
        `,
        transformStyle: "preserve-3d",
        opacity,
      }}
    >
      {/* Top Header Row with Icon and Status Badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Icon Box */}
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              backgroundColor: highlighted ? THEME.colors.primary : "rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFF",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {iconType === "plan" && "📐"}
            {iconType === "review" && "👁️"}
            {iconType === "deliver" && "🚀"}
            {iconType === "video" && "🎬"}
            {iconType === "image" && "🖼️"}
            {iconType === "code" && "⚡"}
            {iconType === "milestone" && "💎"}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: THEME.colors.text, lineHeight: 1.2 }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ fontSize: 12, color: THEME.colors.textMuted, marginTop: 2 }}>
                {subtitle}
              </div>
            )}
          </div>
        </div>

        {/* Status Badge */}
        {status && (
          <div
            style={{
              padding: "5px 12px",
              borderRadius: 20,
              backgroundColor: `${statusColor}22`,
              border: `1px solid ${statusColor}66`,
              color: statusColor,
              fontSize: 12,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            {status}
          </div>
        )}
      </div>

      {/* Progress bar if present */}
      {typeof progress === "number" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: THEME.colors.textMuted }}>
            <span>Completion</span>
            <span style={{ fontWeight: 700, color: THEME.colors.text }}>{progress}%</span>
          </div>
          <div style={{ width: "100%", height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                backgroundColor: progress === 100 ? THEME.colors.success : THEME.colors.secondary,
                borderRadius: 3,
              }}
            />
          </div>
        </div>
      )}

      {/* Team Avatars Footer if present */}
      {team.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 8, borderTop: `1px solid rgba(255,255,255,0.06)` }}>
          <div style={{ fontSize: 12, color: THEME.colors.textDim }}>Collaborators</div>
          <div style={{ display: "flex" }}>
            {team.map((initials, idx) => (
              <div
                key={initials}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  backgroundColor: idx === 0 ? THEME.colors.primary : idx === 1 ? THEME.colors.secondary : THEME.colors.accent,
                  border: `2px solid ${THEME.colors.surfaceElevated}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#FFF",
                  marginLeft: idx > 0 ? -8 : 0,
                }}
              >
                {initials}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
