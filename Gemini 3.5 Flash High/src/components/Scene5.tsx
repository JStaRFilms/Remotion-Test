import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SPRINGS } from "../constants";

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase divisions (0 - 25: Checklist, 25 - 50: Progress Ring, 50 - 75: Approval Stamp, 75 - 120: Flyback Outro)
  
  // Checklist Animations
  const check1 = spring({ frame, fps, config: SPRINGS.snappy });
  const check2 = spring({ frame: frame - 8, fps, config: SPRINGS.snappy });
  const check3 = spring({ frame: frame - 16, fps, config: SPRINGS.snappy });

  // Slide transition between Checklist and Progress (frame 25)
  const slideProgress = spring({ frame: frame - 25, fps, config: SPRINGS.snappy });
  const phase1X = interpolate(slideProgress, [0, 1], [0, -1920]);
  const phase2X = interpolate(slideProgress, [0, 1], [1920, 0]);

  // Circular progress fill (frame 25 - 50)
  const fillProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 30, stiffness: 60 },
    durationInFrames: 25,
  });
  const strokeDashoffset = interpolate(fillProgress, [0, 1], [251.2, 0]); // Circular circumference for radius 40 is 2*PI*40 = 251.2

  // Slide transition between Progress and Stamp (frame 50)
  const slideProgress2 = spring({ frame: frame - 50, fps, config: SPRINGS.snappy });
  const phase2X_offset = interpolate(slideProgress2, [0, 1], [0, -1920]);
  const phase3X = interpolate(slideProgress2, [0, 1], [1920, 0]);

  // Approval Stamp drop (starts frame 60)
  const stampSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 10, stiffness: 200, mass: 1.5 }, // heavy bounce
  });
  const stampScale = interpolate(stampSpring, [0, 1], [3, 1]);
  const stampOpacity = interpolate(stampSpring, [0, 0.2, 1], [0, 1, 1]);
  // Subtle camera shake on stamp landing (around frame 62-70)
  const shake = interpolate(frame, [62, 64, 66, 68, 70], [0, 4, -3, 2, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Outro Flyback (frame 75 onwards)
  const flybackProgress = spring({
    frame: frame - 75,
    fps,
    config: SPRINGS.smooth,
  });
  const flybackScale = interpolate(flybackProgress, [0, 1], [1, 0.4]);
  const flybackZ = interpolate(flybackProgress, [0, 1], [0, -400]);
  const flybackOpacity = interpolate(frame, [110, 120], [1, 0], { extrapolateRight: "clamp" });

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
      {/* Assembly Container that flies back at frame 75 */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `perspective(1000px) translateZ(${flybackZ}px) scale(${flybackScale}) translateY(${shake}px)`,
          opacity: flybackOpacity,
        }}
      >
        {/* PHASE 1: Project Checklist */}
        {frame < 30 && (
          <div
            style={{
              position: "absolute",
              width: 480,
              backgroundColor: COLORS.cardBg,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 16,
              padding: 32,
              transform: `translateX(${phase1X}px)`,
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 800, color: COLORS.textPrimary, margin: 0 }}>Tasks completed</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Upload initial branding guide", check: check1 },
                { label: "Approve 4k video asset rendering", check: check2 },
                { label: "Finalize social launch campaigns", check: check3 },
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 6,
                      border: `2px solid ${idx === 0 || item.check > 0.1 ? COLORS.success : COLORS.border}`,
                      backgroundColor: item.check > 0.1 ? COLORS.success : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: `scale(${interpolate(item.check, [0, 1], [0.8, 1])})`,
                    }}
                  >
                    {item.check > 0.1 && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 500, color: item.check > 0.5 ? COLORS.textSecondary : COLORS.textPrimary, textDecoration: item.check > 0.5 ? "line-through" : "none" }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHASE 2: Analytics Circular Progress */}
        {frame >= 25 && frame < 55 && (
          <div
            style={{
              position: "absolute",
              width: 480,
              backgroundColor: COLORS.cardBg,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 16,
              padding: 32,
              transform: `translateX(${phase2X + phase2X_offset}px)`,
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              gap: 32,
            }}
          >
            <div style={{ position: "relative", width: 100, height: 100 }}>
              <svg width="100" height="100" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="50" cy="50" r="40" stroke="#1A1A24" strokeWidth="8" fill="transparent" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={COLORS.accentCyan}
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800 }}>
                {Math.round(interpolate(fillProgress, [0, 1], [70, 100]))}%
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Review Progress</h3>
              <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: "4px 0 0 0" }}>All stakeholders approved.</p>
            </div>
          </div>
        )}

        {/* PHASE 3: Approval stamp screen */}
        {frame >= 50 && (
          <div
            style={{
              position: "absolute",
              width: 480,
              backgroundColor: COLORS.cardBg,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 16,
              padding: 32,
              transform: `translateX(${phase3X}px)`,
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <div style={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div
                style={{
                  border: `4px solid ${COLORS.success}`,
                  color: COLORS.success,
                  fontSize: 24,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  padding: "8px 24px",
                  borderRadius: 8,
                  letterSpacing: "0.1em",
                  transform: `scale(${stampScale}) rotate(-10deg)`,
                  opacity: stampOpacity,
                  boxShadow: `0 0 20px rgba(52, 211, 153, 0.2)`,
                }}
              >
                Approved
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Campaign Complete</h3>
              <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: "4px 0 0 0" }}>Ready for delivery.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
