import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { COLORS, SPRINGS } from "../constants";
import { AppWindow } from "./AppWindow";
import { Cursor } from "./Cursor";

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow camera push and subtle tilt
  const cameraZ = interpolate(frame, [0, 150], [0, 40], { extrapolateRight: "clamp" });
  const cameraRotateY = interpolate(frame, [0, 150], [-6, -2], { easing: Easing.out(Easing.quad) });
  const cameraRotateX = interpolate(frame, [0, 150], [10, 6], { easing: Easing.out(Easing.quad) });

  // Cursor movement path (starts frame 10, hits target at frame 70, clicks, leaves/fades at 110)
  // Target: "Brand Video" Card in the dashboard. Coordinate relative to App Window (1440x840 virtual scale)
  const cursorX = interpolate(frame, [10, 70], [1200, 520], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1.0), // Smooth custom ease
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorY = interpolate(frame, [10, 70], [700, 360], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Click compression (frame 70-78)
  const clickProgress = interpolate(frame, [70, 74, 78], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Hover state (starts when cursor is close, around frame 65)
  const cardHover = interpolate(frame, [65, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // UI response: Grid files reveal starting at frame 75 (staggered)
  const uiStateSpring = spring({
    frame: frame - 75,
    fps,
    config: SPRINGS.smooth,
  });

  // Asset items staggered spring reveals
  const item1Reveal = spring({ frame: frame - 78, fps, config: SPRINGS.snappy });
  const item2Reveal = spring({ frame: frame - 83, fps, config: SPRINGS.snappy });
  const item3Reveal = spring({ frame: frame - 88, fps, config: SPRINGS.snappy });
  const item4Reveal = spring({ frame: frame - 93, fps, config: SPRINGS.snappy });

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
      {/* 3D App Window Wrapper */}
      <div
        style={{
          width: "85%",
          height: "75%",
          transform: `perspective(1200px) rotateX(${cameraRotateX}deg) rotateY(${cameraRotateY}deg) translateZ(${cameraZ}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <AppWindow title="Orbit — Project Dashboard">
          <div style={{ display: "flex", width: "100%", height: "100%", color: "white" }}>
            {/* Sidebar */}
            <div
              style={{
                width: 240,
                backgroundColor: COLORS.cardBg,
                borderRight: `1px solid ${COLORS.border}`,
                padding: "24px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: COLORS.accentViolet }} />
                <span style={{ fontWeight: 800, fontSize: 18 }}>Orbit</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["Overview", "Projects", "Media Library", "Team"].map((item, idx) => (
                  <div
                    key={item}
                    style={{
                      padding: "10px 14px",
                      borderRadius: 6,
                      fontSize: 14,
                      fontWeight: 600,
                      color: idx === 1 ? COLORS.textPrimary : COLORS.textSecondary,
                      backgroundColor: idx === 1 ? "rgba(99, 102, 241, 0.15)" : "transparent",
                      border: idx === 1 ? `1px solid rgba(99,102,241,0.3)` : "1px solid transparent",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, padding: 32, display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Active Projects</h2>
                  <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: "4px 0 0 0" }}>
                    Select a board to manage reviews.
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: COLORS.accentViolet,
                    padding: "10px 20px",
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 600,
                    boxShadow: "0 4px 14px rgba(99,102,241,0.4)",
                  }}
                >
                  + New Board
                </div>
              </div>

              {/* Transitioning UI */}
              <div style={{ flex: 1, position: "relative" }}>
                {/* STATE 1: Before Click - Project Card */}
                {frame < 80 && (
                  <div
                    style={{
                      position: "absolute",
                      width: 320,
                      backgroundColor: COLORS.cardBg,
                      border: `1px solid ${cardHover > 0 ? COLORS.accentViolet : COLORS.border}`,
                      borderRadius: 12,
                      padding: 24,
                      cursor: "pointer",
                      boxShadow: cardHover > 0 ? `0 0 30px rgba(99, 102, 241, 0.25)` : "none",
                      transform: `translateY(${cardHover * -4}px)`,
                      left: 100,
                      top: 40,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.accentCyan, backgroundColor: "rgba(56, 189, 248, 0.15)", padding: "4px 8px", borderRadius: 4 }}>
                        In Progress
                      </span>
                      <span style={{ fontSize: 12, color: COLORS.textSecondary }}>Updated 2h ago</span>
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px 0" }}>Brand Video Campaign</h3>
                    <p style={{ fontSize: 13, color: COLORS.textSecondary, margin: "0 0 20px 0" }}>
                      Review draft edit and approve final marketing assets.
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: -6 }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: COLORS.accentViolet, border: "2px solid #161622" }} />
                        <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: COLORS.collaborator, border: "2px solid #161622", marginLeft: -8 }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.textSecondary }}>12 assets</span>
                    </div>
                  </div>
                )}

                {/* STATE 2: After Click - Media Review Grid */}
                {frame >= 80 && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 20,
                      opacity: uiStateSpring,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: COLORS.textSecondary, fontSize: 14 }}>Projects</span>
                      <span style={{ color: COLORS.textSecondary, fontSize: 14 }}>&gt;</span>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>Brand Video Campaign</span>
                    </div>

                    {/* Staggered Assets Cards Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
                      {[
                        { title: "Intro Draft.mp4", size: "24.5 MB", progress: item1Reveal, bg: "#2E2A47" },
                        { title: "Color Grade.mp4", size: "82.1 MB", progress: item2Reveal, bg: "#1F3547" },
                        { title: "Audio Sync.wav", size: "12.8 MB", progress: item3Reveal, bg: "#1F4239" },
                        { title: "Thumbnail.png", size: "4.2 MB", progress: item4Reveal, bg: "#3D2B35" },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            backgroundColor: COLORS.cardBg,
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: 10,
                            padding: 16,
                            opacity: item.progress,
                            transform: `translateY(${interpolate(item.progress, [0, 1], [30, 0])}px)`,
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                          }}
                        >
                          <div style={{ height: 120, borderRadius: 6, backgroundColor: item.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                              <polygon points="5 3 19 12 5 21 5 3" fill="rgba(255,255,255,0.2)" />
                            </svg>
                          </div>
                          <div>
                            <h4 style={{ fontSize: 14, fontWeight: 700, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {item.title}
                            </h4>
                            <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: "4px 0 0 0" }}>{item.size}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Animated Cursor */}
          {frame >= 10 && frame < 110 && (
            <Cursor x={cursorX} y={cursorY} clickProgress={clickProgress} />
          )}
        </AppWindow>
      </div>
    </div>
  );
};
