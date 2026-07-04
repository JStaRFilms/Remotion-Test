import React from "react";

export interface CameraRigProps {
  children: React.ReactNode;
  panX?: number;
  panY?: number;
  panZ?: number; // Distance towards/away from camera
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  perspective?: number;
  scale?: number;
  originX?: string;
  originY?: string;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  children,
  panX = 0,
  panY = 0,
  panZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  perspective = 1600,
  scale = 1,
  originX = "50%",
  originY = "50%",
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: `${perspective}px`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transformOrigin: `${originX} ${originY}`,
          transform: `
            translate3d(${panX}px, ${panY}px, ${panZ}px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            rotateZ(${rotateZ}deg)
            scale(${scale})
          `,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
};
