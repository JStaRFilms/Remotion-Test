import React from "react";
import { COLORS } from "../constants";

interface AppWindowProps {
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
  title?: string;
  style?: React.CSSProperties;
}

export const AppWindow: React.FC<AppWindowProps> = ({
  children,
  width = "100%",
  height = "100%",
  title = "Orbit — Project Workspace",
  style = {},
}) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: COLORS.bg,
        borderRadius: 12,
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
    >
      {/* Title Bar */}
      <div
        style={{
          height: 48,
          backgroundColor: COLORS.cardBg,
          borderBottom: `1px solid ${COLORS.border}`,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* macOS Traffic Light Buttons */}
        <div style={{ display: "flex", gap: 8 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#FF5F56",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#FFBD2E",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#27C93F",
            }}
          />
        </div>

        {/* Window Title */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            color: COLORS.textSecondary,
            fontSize: 13,
            fontWeight: 500,
            fontFamily: "Inter, sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </div>
      </div>

      {/* Main Client Area */}
      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#0F0F16",
        }}
      >
        {children}
      </div>
    </div>
  );
};
