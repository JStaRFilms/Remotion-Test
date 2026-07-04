import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { THEME } from "../theme";
import { AppWindow } from "../components/AppWindow";

export const Scene1Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 3D Orb rotation and acceleration
  const orbRotateY = interpolate(frame, [0, 90], [0, Math.PI * 2]);
  const orbRotateX = interpolate(frame, [0, 90], [0, Math.PI]);
  
  // Orb acceleration toward camera around frame 35-70
  const orbZoom = interpolate(frame, [35, 70], [1, 25], {
    easing: Easing.in(Easing.exp),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  
  const orbOpacity = interpolate(frame, [50, 70], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // AppWindow scale and reveal emerging from the Orb
  const windowProgress = spring({
    frame: frame - 40,
    fps,
    config: THEME.springs.smooth,
  });
  const windowScale = interpolate(windowProgress, [0, 1], [0.1, 0.92], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const windowOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const windowRotateX = interpolate(windowProgress, [0, 1], [25, 6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline Typography Animation: "Your work. In motion."
  const text1Progress = spring({
    frame: frame - 18,
    fps,
    config: THEME.springs.smooth,
  });
  const text2Progress = spring({
    frame: frame - 32,
    fps,
    config: THEME.springs.smooth,
  });

  const text1TranslateY = interpolate(text1Progress, [0, 1], [60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const text1Opacity = interpolate(text1Progress, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const text2TranslateY = interpolate(text2Progress, [0, 1], [60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const text2Opacity = interpolate(text2Progress, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Fade out entire scene at end of scene 1 to connect smoothly to Scene 2
  const sceneExitOpacity = interpolate(frame, [80, 89], [1, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: THEME.colors.bg,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: sceneExitOpacity,
      }}
    >
      {/* Background Radial Aura */}
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(56, 189, 248, 0.1) 40%, transparent 70%)`,
          filter: "blur(60px)",
          transform: `scale(${1 + frame * 0.01})`,
        }}
      />

      {/* Subtle Spatial Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.7,
        }}
      />

      {/* 3D Geometric Orb / Tesseract via React Three Fiber */}
      {orbOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${orbZoom})`,
            opacity: orbOpacity,
            zIndex: 10,
          }}
        >
          <ThreeCanvas width={width} height={height}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} color="#38BDF8" />
            <directionalLight position={[-10, -10, -10]} intensity={1} color="#6366F1" />
            <mesh rotation={[orbRotateX, orbRotateY, 0]}>
              <icosahedronGeometry args={[2.2, 1]} />
              <meshStandardMaterial
                color="#6366F1"
                wireframe
                emissive="#38BDF8"
                emissiveIntensity={0.6}
                roughness={0.2}
              />
            </mesh>
            <mesh rotation={[-orbRotateY * 0.8, orbRotateX * 0.8, 0]}>
              <octahedronGeometry args={[1.4, 0]} />
              <meshStandardMaterial
                color="#FFFFFF"
                emissive="#6366F1"
                emissiveIntensity={0.8}
                roughness={0.1}
              />
            </mesh>
          </ThreeCanvas>
        </div>
      )}

      {/* Emerging AppWindow Container */}
      <div
        style={{
          position: "absolute",
          zIndex: 5,
          opacity: windowOpacity,
          transform: `scale(${windowScale}) perspective(1600px) rotateX(${windowRotateX}deg)`,
        }}
      >
        <AppWindow
          title="Orbit Workspace — Overview"
          activeTab="Projects"
          glowOpacity={0.5}
        >
          <div style={{ display: "flex", gap: 24, height: "100%", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: THEME.colors.textMuted }}>
              Initializing Creative Suite...
            </div>
          </div>
        </AppWindow>
      </div>

      {/* Cinematic Headline Typography */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
          zIndex: 20,
          fontFamily: THEME.fonts.display,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: THEME.colors.text,
            letterSpacing: -1,
            opacity: text1Opacity,
            transform: `translate3d(0, ${text1TranslateY}px, 0)`,
            textShadow: "0 10px 30px rgba(0,0,0,0.8)",
          }}
        >
          Your work.
        </span>
        <span
          style={{
            fontSize: 72,
            fontWeight: 800,
            background: `linear-gradient(135deg, ${THEME.colors.primary} 0%, ${THEME.colors.secondary} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -1,
            opacity: text2Opacity,
            transform: `translate3d(0, ${text2TranslateY}px, 0)`,
            filter: "drop-shadow(0px 10px 30px rgba(99, 102, 241, 0.4))",
          }}
        >
          In motion.
        </span>
      </div>
    </div>
  );
};
