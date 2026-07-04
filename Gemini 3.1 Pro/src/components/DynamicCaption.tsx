import React from "react";
import { THEME } from "../theme";

export interface DynamicCaptionProps {
  text: string;
  subText?: string;
  x?: number;
  y?: number;
  scale?: number;
  opacity?: number;
  rotateZ?: number;
  mode?: "attached" | "split" | "ui-transform" | "spatial";
  accentColor?: string;
  uiTransformProgress?: number; // 0 (caption) to 1 (UI button inside App bar)
}

export const DynamicCaption: React.FC<DynamicCaptionProps> = ({
  text,
  subText,
  x = 0,
  y = 0,
  scale = 1,
  opacity = 1,
  rotateZ = 0,
  mode = "attached",
  accentColor = THEME.colors.primary,
  uiTransformProgress = 0,
}) => {
  if (opacity <= 0) return null;

  // Mode: UI Transform (e.g., Scene 4 "Ship it while it matters" transforming into Ship button)
  if (mode === "ui-transform") {
    // Interpolate between a large floating caption and a crisp UI header action button
    const isButton = uiTransformProgress > 0.6;
    const buttonScale = 1 - uiTransformProgress * 0.2;
    const borderRadius = 24 - uiTransformProgress * 12;
    const bgOpacity = 0.2 + uiTransformProgress * 0.8;
    const paddingX = 28 - uiTransformProgress * 8;
    const paddingY = 16 - uiTransformProgress * 6;
    const fontSize = 36 - uiTransformProgress * 20;

    return (
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          transform: `translate(-50%, -50%) scale(${scale * buttonScale}) rotateZ(${rotateZ * (1 - uiTransformProgress)}deg)`,
          opacity,
          zIndex: 100,
          transition: "none",
        }}
      >
        <div
          style={{
            padding: `${paddingY}px ${paddingX}px`,
            borderRadius: `${borderRadius}px`,
            backgroundColor: isButton ? THEME.colors.success : `rgba(99, 102, 241, ${bgOpacity})`,
            border: `2px solid ${isButton ? THEME.colors.success : THEME.colors.primaryGlow}`,
            boxShadow: isButton
              ? `0 0 30px rgba(16, 185, 129, 0.6)`
              : `0 20px 50px rgba(0, 0, 0, 0.7), 0 0 40px rgba(99, 102, 241, 0.4)`,
            color: "#FFFFFF",
            fontFamily: THEME.fonts.display,
            fontSize: `${fontSize}px`,
            fontWeight: isButton ? 700 : 800,
            letterSpacing: isButton ? 0.5 : -0.5,
            display: "flex",
            alignItems: "center",
            gap: 12,
            whiteSpace: "nowrap",
          }}
        >
          {isButton && (
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#FFF",
                boxShadow: "0 0 8px #FFF",
              }}
            />
          )}
          <span>{isButton ? "Ship Release v1.0" : text}</span>
        </div>
      </div>
    );
  }

  // Mode: Split typographic blocks (e.g., Scene 4 "Shape it together.")
  if (mode === "split") {
    const words = text.split(" ");
    return (
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          transform: `translate3d(-50%, -50%, 0) scale(${scale}) rotateZ(${rotateZ}deg)`,
          opacity,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          zIndex: 90,
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <div
            style={{
              padding: "10px 22px",
              borderRadius: 16,
              backgroundColor: "rgba(20, 22, 28, 0.9)",
              border: `1px solid ${THEME.colors.borderHighlight}`,
              boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
              fontSize: 32,
              fontWeight: 800,
              color: THEME.colors.text,
              fontFamily: THEME.fonts.display,
            }}
          >
            {words[0]}
          </div>
          {words[1] && (
            <div
              style={{
                padding: "10px 22px",
                borderRadius: 16,
                backgroundColor: accentColor,
                boxShadow: `0 16px 40px rgba(99, 102, 241, 0.5)`,
                fontSize: 32,
                fontWeight: 800,
                color: "#FFFFFF",
                fontFamily: THEME.fonts.display,
              }}
            >
              {words[1]}
            </div>
          )}
        </div>
        {words.slice(2).length > 0 && (
          <div
            style={{
              padding: "10px 22px",
              borderRadius: 16,
              backgroundColor: "rgba(31, 34, 43, 0.95)",
              border: `1px solid ${THEME.colors.secondaryGlow}`,
              boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
              fontSize: 28,
              fontWeight: 700,
              color: THEME.colors.secondary,
              fontFamily: THEME.fonts.display,
              alignSelf: "flex-start",
            }}
          >
            {words.slice(2).join(" ")}
          </div>
        )}
      </div>
    );
  }

  // Mode: Attached / Spatial floating badge
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate3d(-50%, -50%, 0) scale(${scale}) rotateZ(${rotateZ}deg)`,
        opacity,
        zIndex: 95,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          padding: "14px 28px",
          borderRadius: 20,
          backgroundColor: "rgba(15, 17, 23, 0.92)",
          border: `1.5px solid ${accentColor}`,
          boxShadow: `
            0 24px 60px rgba(0, 0, 0, 0.8),
            0 0 40px ${accentColor}40
          `,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          backdropFilter: "blur(12px)",
        }}
      >
        <span
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#FFFFFF",
            fontFamily: THEME.fonts.display,
            letterSpacing: -0.5,
          }}
        >
          {text}
        </span>
        {subText && (
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: accentColor,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {subText}
          </span>
        )}
      </div>
    </div>
  );
};
