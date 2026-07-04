import React from 'react';

type CameraRigProps = {
  children: React.ReactNode;
  perspective?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  translateX?: number;
  translateY?: number;
  translateZ?: number;
  scale?: number;
  originX?: string;
  originY?: string;
};

export const CameraRig: React.FC<CameraRigProps> = ({
  children,
  perspective = 1200,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  scale = 1,
  originX = '50%',
  originY = '50%',
}) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      perspective: `${perspective}px`,
      transformStyle: 'preserve-3d' as const,
    }}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        transformOrigin: `${originX} ${originY}`,
        transform: `
          translateX(${translateX}px)
          translateY(${translateY}px)
          translateZ(${translateZ}px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          rotateZ(${rotateZ}deg)
          scale(${scale})
        `,
        transformStyle: 'preserve-3d' as const,
      }}
    >
      {children}
    </div>
  </div>
);
