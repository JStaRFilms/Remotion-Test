import React from 'react';
import { COLORS } from '../config';

type OrbitLogoProps = {
  size?: number;
  color?: string;
  dotProgress?: number; // 0-1, position of dot along orbit
  ringProgress?: number; // 0-1, how much of the ring is drawn (stroke-dashoffset)
  glowIntensity?: number; // 0-1
};

export const OrbitLogo: React.FC<OrbitLogoProps> = ({
  size = 80,
  color = COLORS.accent,
  dotProgress = 0.75,
  ringProgress = 1,
  glowIntensity = 0,
}) => {
  const cx = size / 2;
  const cy = size / 2;
  const rx = size * 0.42;
  const ry = size * 0.22;
  const tilt = -25; // degrees

  // Dot position on ellipse
  const angle = dotProgress * Math.PI * 2;
  const dotX = cx + rx * Math.cos(angle);
  const dotY = cy + ry * Math.sin(angle);

  // Ring stroke animation
  const circumference = Math.PI * 2 * Math.sqrt((rx * rx + ry * ry) / 2);
  const dashOffset = circumference * (1 - ringProgress);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Glow */}
      {glowIntensity > 0 && (
        <circle
          cx={cx}
          cy={cy}
          r={size * 0.3}
          fill={color}
          opacity={glowIntensity * 0.15}
          filter="url(#logoGlow)"
        />
      )}
      <defs>
        <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={size * 0.1} />
        </filter>
      </defs>
      {/* Orbital ring */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform={`rotate(${tilt} ${cx} ${cy})`}
        opacity={0.8}
      />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r={size * 0.06} fill={color} />
      {/* Orbiting dot */}
      <g transform={`rotate(${tilt} ${cx} ${cy})`}>
        <circle
          cx={dotX}
          cy={dotY}
          r={size * 0.04}
          fill={color}
          opacity={ringProgress}
        />
      </g>
    </svg>
  );
};
