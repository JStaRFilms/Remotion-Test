import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { COLORS, SPRINGS } from "../constants";
import { AppWindow } from "./AppWindow";
import { Cursor } from "./Cursor";

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow 3D zoom and pan
  const cameraZ = interpolate(frame, [0, 180], [30, -30], { extrapolateRight: "clamp" });
  const cameraRotateY = interpolate(frame, [0, 180], [-2, 2], { easing: Easing.out(Easing.quad) });

  // 1. Drag & Drop Path (frames 0 - 55)
  // Cursor drags a card from coordinates (50, 400) to (500, 280)
  const dragX = interpolate(frame, [5, 45], [100, 520], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dragY = interpolate(frame, [5, 45], [500, 320], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dropClick = interpolate(frame, [45, 52], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Caption 1: "Drop the idea." travels beside cursor
  const cap1Opacity = interpolate(frame, [5, 12, 45, 52], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // 2. Collaborator Jane Entrance (frames 50 - 115)
  // Jane cursor enters from bottom right to click on feedback box at (850, 480)
  const janeX = interpolate(frame, [60, 95], [1100, 840], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const janeY = interpolate(frame, [60, 95], [750, 480], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const janeClick = interpolate(frame, [95, 102], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Caption 2: "Shape it together."
  const wordShapeOpacity = interpolate(frame, [60, 70], [0, 1], { extrapolateRight: "clamp" });
  const wordTogetherOpacity = interpolate(frame, [68, 78], [0, 1], { extrapolateRight: "clamp" });
  // Caption 2 collapses into a UI comment bubble at frame 95
  const commentScale = spring({ frame: frame - 95, fps, config: SPRINGS.snappy });

  // 3. Caption 3: "Ship it while it matters." (frames 115 - 180)
  const shipReveal1 = spring({ frame: frame - 118, fps, config: SPRINGS.heavy });
  const shipReveal2 = spring({ frame: frame - 128, fps, config: SPRINGS.heavy });
  const shipReveal3 = spring({ frame: frame - 138, fps, config: SPRINGS.heavy });
  const containerPushZ = interpolate(frame, [115, 180], [0, -150], { extrapolateRight: "clamp" });

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
      <div
        style={{
          width: "85%",
          height: "75%",
          transform: `perspective(1200px) rotateY(${cameraRotateY}deg) translateZ(${cameraZ + containerPushZ}px)`,
        }}
      >
        <AppWindow title="Orbit — Collaborative Media Review">
          <div style={{ display: "flex", width: "100%", height: "100%", color: "white" }}>
            {/* Sidebar Comment panel (Right Side) */}
            <div
              style={{
                flex: 1,
                padding: 24,
                backgroundColor: COLORS.cardBg,
                borderRight: `1px solid ${COLORS.border}`,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* Media Player Mock */}
              <div style={{ flex: 1, borderRadius: 8, backgroundColor: "#1C1C28", border: `1px solid ${COLORS.border}`, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {/* Mock Video Preview */}
                  <div style={{ width: "90%", height: "80%", backgroundColor: "#2A2A3C", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <polygon points="10 8 20 15 10 22 10 8" fill="white" style={{ transform: "translateX(2px)" }} />
                    </div>
                    {/* Visual check indicator after drop */}
                    {frame > 45 && (
                      <span style={{ position: "absolute", bottom: 12, left: 16, backgroundColor: COLORS.success, color: "black", padding: "4px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700 }}>
                        ● LIVE FEEDBACK
                      </span>
                    )}
                  </div>
                </div>
                {/* Playback Controls */}
                <div style={{ height: 48, borderTop: `1px solid ${COLORS.border}`, padding: "0 16px", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 12, height: 12, backgroundColor: COLORS.accentCyan, borderRadius: "50%" }} />
                  <div style={{ flex: 1, height: 6, backgroundColor: "#2A2A3C", borderRadius: 3, position: "relative" }}>
                    <div style={{ width: `${interpolate(frame, [0, 180], [20, 80])}%`, height: "100%", backgroundColor: COLORS.accentViolet, borderRadius: 3 }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Feedbacks Panel */}
            <div
              style={{
                width: 320,
                backgroundColor: "#0B0B0F",
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 700, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 10, margin: 0 }}>Activity</h3>
              
              {/* Previous Mock Comments */}
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: COLORS.accentCyan }} />
                <div style={{ flex: 1, backgroundColor: COLORS.cardBg, padding: 10, borderRadius: 6, fontSize: 12 }}>
                  <div style={{ fontWeight: 700, marginBottom: 2 }}>Alex</div>
                  <div style={{ color: COLORS.textSecondary }}>Adjust timeline transitions.</div>
                </div>
              </div>

              {/* Caption morphing into Comment Bubble starting at Frame 95 */}
              {frame >= 95 && (
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    transform: `scale(${commentScale})`,
                    transformOrigin: "top left",
                  }}
                >
                  <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: COLORS.collaborator, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>
                    J
                  </div>
                  <div style={{ flex: 1, backgroundColor: COLORS.cardBg, border: `1px solid ${COLORS.collaborator}`, padding: 10, borderRadius: 6, fontSize: 12 }}>
                    <div style={{ fontWeight: 700, color: COLORS.collaborator, marginBottom: 2 }}>Jane</div>
                    <div style={{ color: COLORS.textPrimary }}>Shape it together.</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User cursor dragging file */}
          {frame < 55 && (
            <>
              {/* Dragged card */}
              <div
                style={{
                  position: "absolute",
                  left: dragX + 16,
                  top: dragY + 16,
                  backgroundColor: COLORS.accentCyan,
                  color: "black",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "6px 12px",
                  borderRadius: 6,
                  opacity: cap1Opacity,
                  boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                  pointerEvents: "none",
                }}
              >
                📁 Idea Draft.mp4
              </div>
              <Cursor x={dragX} y={dragY} clickProgress={dropClick} />
            </>
          )}

          {/* Jane Collaborator Cursor */}
          {frame >= 50 && frame < 115 && (
            <Cursor x={janeX} y={janeY} clickProgress={janeClick} color={COLORS.collaborator} label="Jane" />
          )}
        </AppWindow>
      </div>

      {/* Spatially dynamic Caption 1: "Drop the idea." */}
      {frame >= 5 && frame < 50 && (
        <div
          style={{
            position: "absolute",
            left: dragX - 30,
            top: dragY - 45,
            fontSize: 22,
            fontWeight: 800,
            color: "white",
            opacity: cap1Opacity,
            textShadow: "0 4px 12px rgba(0,0,0,0.8)",
            pointerEvents: "none",
          }}
        >
          Drop the idea.
        </div>
      )}

      {/* Spatially dynamic Caption 2: "Shape it together." (Before collapsing to comment) */}
      {frame >= 60 && frame < 95 && (
        <div
          style={{
            position: "absolute",
            left: janeX - 110,
            top: janeY - 50,
            display: "flex",
            gap: 6,
            textShadow: "0 4px 12px rgba(0,0,0,0.8)",
            pointerEvents: "none",
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 800, color: "white", opacity: wordShapeOpacity }}>Shape it</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: COLORS.collaborator, opacity: wordTogetherOpacity }}>together.</span>
        </div>
      )}

      {/* Caption 3: "Ship it while it matters." full screen typography overlay */}
      {frame >= 115 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(11, 11, 15, 0.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ fontSize: 72, fontWeight: 900, color: "white", opacity: shipReveal1, transform: `scale(${interpolate(shipReveal1, [0, 1], [0.8, 1])})` }}>
              Ship it
            </span>
            <span style={{ fontSize: 72, fontWeight: 900, color: COLORS.accentLight, opacity: shipReveal2, transform: `scale(${interpolate(shipReveal2, [0, 1], [0.8, 1])})` }}>
              while it
            </span>
          </div>
          <span style={{ fontSize: 80, fontWeight: 900, color: COLORS.accentCyan, opacity: shipReveal3, transform: `scale(${interpolate(shipReveal3, [0, 1], [0.8, 1])})`, textShadow: `0 0 40px rgba(56, 189, 248, 0.4)` }}>
            matters.
          </span>
        </div>
      )}
    </div>
  );
};
