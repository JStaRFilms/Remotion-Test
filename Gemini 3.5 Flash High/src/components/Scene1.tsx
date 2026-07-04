import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SPRINGS } from "../constants";
import { AppWindow } from "./AppWindow";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Particle scale & rotation
  const particleScale = spring({
    frame,
    fps,
    config: { damping: 15 }, // slightly bouncy
  });

  const particleRotate = interpolate(frame, [0, 90], [0, 360]);

  // Particle acceleration towards camera (Z-axis zoom) starting at frame 35
  const particleZ = interpolate(frame, [35, 70], [0, 400], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  
  const particleOpacity = interpolate(frame, [50, 70], [1, 0], {
    extrapolateRight: "clamp",
  });

  // App Window reveal starts at frame 50
  const appRevealSpring = spring({
    frame: frame - 50,
    fps,
    config: SPRINGS.smooth,
  });

  // Map app reveal to scale and opacity
  const appScale = interpolate(appRevealSpring, [0, 1], [0.4, 1]);
  const appOpacity = interpolate(appRevealSpring, [0, 1], [0, 1]);
  const appZ = interpolate(appRevealSpring, [0, 1], [-300, 0]);

  // Typography staggered reveals
  // "Your work." starts at frame 15
  const text1Reveal = spring({
    frame: frame - 15,
    fps,
    config: SPRINGS.smooth,
  });
  const text1Y = interpolate(text1Reveal, [0, 1], [40, 0]);
  const text1Opacity = interpolate(text1Reveal, [0, 1], [0, 1]);

  // "In motion." starts at frame 30
  const text2Reveal = spring({
    frame: frame - 30,
    fps,
    config: SPRINGS.smooth,
  });
  const text2Y = interpolate(text2Reveal, [0, 1], [40, 0]);
  const text2Opacity = interpolate(text2Reveal, [0, 1], [0, 1]);

  // Outro transition for text at frame 70
  const textExit = interpolate(frame, [70, 85], [1, 0], {
    extrapolateRight: "clamp",
  });

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
      {/* Subtle Spatial Grid Background */}
      <div
        style={{
          position: "absolute",
          width: "200%",
          height: "200%",
          backgroundImage: `radial-gradient(circle, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          transform: `perspective(1000px) rotateX(60deg) translateY(-20%) translateZ(${interpolate(frame, [0, 90], [0, 100])}px)`,
          opacity: 0.5,
        }}
      />

      {/* Opening Geometric Orbit Particle (3D space) */}
      {frame < 75 && (
        <div
          style={{
            position: "absolute",
            width: 120,
            height: 120,
            transform: `perspective(800px) translateZ(${particleZ}px) rotate(${particleRotate}deg) scale(${particleScale})`,
            opacity: particleOpacity,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 5,
          }}
        >
          {/* Neon core */}
          <div
            style={{
              position: "absolute",
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: COLORS.accentViolet,
              boxShadow: `0 0 40px 10px ${COLORS.accentLight}`,
            }}
          />
          {/* Orbiting rings */}
          <div
            style={{
              position: "absolute",
              width: 90,
              height: 90,
              borderRadius: "50%",
              border: `2px dashed ${COLORS.accentCyan}`,
              opacity: 0.8,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 60,
              height: 60,
              borderRadius: "50%",
              border: `2px solid ${COLORS.textPrimary}`,
              opacity: 0.4,
              transform: "rotateX(45deg) rotateY(20deg)",
            }}
          />
        </div>
      )}

      {/* Main Orbit Window Scale-in */}
      {frame >= 50 && (
        <div
          style={{
            position: "absolute",
            width: "80%",
            height: "70%",
            transform: `perspective(1200px) translateZ(${appZ}px) scale(${appScale})`,
            opacity: appOpacity,
            zIndex: 10,
          }}
        >
          <AppWindow>
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: COLORS.cardBg,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* App logo placeholder during expansion */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 20,
                  backgroundColor: "rgba(99, 102, 241, 0.1)",
                  border: `1px solid ${COLORS.accentViolet}`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: `0 0 20px rgba(99, 102, 241, 0.2)`,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backgroundColor: COLORS.accentViolet,
                  }}
                />
              </div>
            </div>
          </AppWindow>
        </div>
      )}

      {/* Typography layer */}
      {frame < 85 && (
        <div
          style={{
            position: "absolute",
            left: "10%",
            bottom: "10%",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            opacity: textExit,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: COLORS.textPrimary,
              transform: `translateY(${text1Y}px)`,
              opacity: text1Opacity,
              letterSpacing: "-0.02em",
            }}
          >
            Your work.
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: COLORS.accentLight,
              transform: `translateY(${text2Y}px)`,
              opacity: text2Opacity,
              letterSpacing: "-0.02em",
            }}
          >
            In motion.
          </div>
        </div>
      )}
    </div>
  );
};
