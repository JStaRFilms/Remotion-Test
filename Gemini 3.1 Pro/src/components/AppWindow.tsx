import React from "react";
import { THEME } from "../theme";

export interface AppWindowProps {
  children?: React.ReactNode;
  activeTab?: string;
  title?: string;
  scale?: number;
  opacity?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  translateZ?: number;
  glowOpacity?: number;
  sidebarCollapsed?: boolean;
}

export const AppWindow: React.FC<AppWindowProps> = ({
  children,
  activeTab = "Review",
  title = "Orbit Workspace — Vision Campaign",
  scale = 1,
  opacity = 1,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  translateZ = 0,
  glowOpacity = 0.3,
  sidebarCollapsed = false,
}) => {
  return (
    <div
      style={{
        width: 1440,
        height: 860,
        borderRadius: 24,
        backgroundColor: THEME.colors.surface,
        border: `1px solid ${THEME.colors.borderHighlight}`,
        boxShadow: `
          0 40px 100px -20px rgba(0, 0, 0, 0.8),
          0 0 120px -30px rgba(99, 102, 241, ${glowOpacity}),
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)
        `,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        opacity,
        transform: `
          perspective(1600px)
          translateZ(${translateZ}px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          rotateZ(${rotateZ}deg)
          scale(${scale})
        `,
        transformStyle: "preserve-3d",
        fontFamily: THEME.fonts.primary,
        color: THEME.colors.text,
        position: "relative",
      }}
    >
      {/* Top Window Bar */}
      <div
        style={{
          height: 56,
          backgroundColor: "rgba(20, 22, 28, 0.9)",
          borderBottom: `1px solid ${THEME.colors.border}`,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        {/* macOS style Window Controls */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#27C93F" }} />
        </div>

        {/* Title / Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 15,
            fontWeight: 500,
            color: THEME.colors.textMuted,
          }}
        >
          <span style={{ color: THEME.colors.primary, fontWeight: 600 }}>Orbit</span>
          <span>/</span>
          <span style={{ color: THEME.colors.text }}>{title}</span>
        </div>

        {/* Top Right Actions / Avatars */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", marginLeft: -8 }}>
            {["SR", "AL", "LK"].map((initials, idx) => (
              <div
                key={initials}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  backgroundColor: idx === 0 ? THEME.colors.primary : idx === 1 ? THEME.colors.secondary : THEME.colors.accent,
                  border: `2px solid ${THEME.colors.surface}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#FFF",
                  marginLeft: idx > 0 ? -10 : 0,
                  zIndex: 10 - idx,
                }}
              >
                {initials}
              </div>
            ))}
          </div>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              backgroundColor: "rgba(99, 102, 241, 0.15)",
              border: `1px solid ${THEME.colors.primaryGlow}`,
              color: THEME.colors.secondary,
              fontSize: 13,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: THEME.colors.success }} />
            Live Sync
          </div>
        </div>
      </div>

      {/* Main App Layout */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>
        {/* Sidebar */}
        {!sidebarCollapsed && (
          <div
            style={{
              width: 240,
              backgroundColor: "rgba(15, 17, 23, 0.6)",
              borderRight: `1px solid ${THEME.colors.border}`,
              padding: "24px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: THEME.colors.textDim,
                textTransform: "uppercase",
                letterSpacing: 1.2,
                padding: "0 12px 8px",
              }}
            >
              Workspace
            </div>
            {["Projects", "Review", "Deliverables", "Analytics", "Team"].map((tab) => {
              const isActive = tab === activeTab;
              return (
                <div
                  key={tab}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 10,
                    backgroundColor: isActive ? "rgba(99, 102, 241, 0.2)" : "transparent",
                    color: isActive ? THEME.colors.text : THEME.colors.textMuted,
                    fontWeight: isActive ? 600 : 400,
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    border: isActive ? `1px solid ${THEME.colors.primaryGlow}` : "1px solid transparent",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: isActive ? THEME.colors.secondary : THEME.colors.textDim,
                    }}
                  />
                  {tab}
                </div>
              );
            })}

            {/* Storage Progress widget at bottom of sidebar */}
            <div
              style={{
                marginTop: "auto",
                padding: 16,
                borderRadius: 12,
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: `1px solid ${THEME.colors.border}`,
              }}
            >
              <div style={{ fontSize: 12, color: THEME.colors.textMuted, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                <span>Storage</span>
                <span style={{ color: THEME.colors.secondary, fontWeight: 600 }}>84%</span>
              </div>
              <div style={{ width: "100%", height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                <div style={{ width: "84%", height: "100%", backgroundColor: THEME.colors.primary, borderRadius: 3 }} />
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div
          style={{
            flex: 1,
            backgroundColor: "transparent",
            padding: 32,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
