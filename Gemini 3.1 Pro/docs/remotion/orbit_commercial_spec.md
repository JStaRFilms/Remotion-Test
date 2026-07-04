# 🎬 Video Spec: Orbit Commercial

## Overview
| Property | Value |
|----------|-------|
| **Type** | Main Application Commercial |
| **Duration** | 25 seconds (750 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `OrbitCommercial` |

## Rules I Read Before Writing This Spec
- [x] animations.md
- [x] timing.md
- [x] sequencing.md
- [x] transitions.md
- [x] text-animations.md
- [x] fonts.md
- [x] 3d.md

## Creative Direction
A cinematic, Apple-style product commercial for **Orbit** — a high-performance workspace app where creative teams organize projects, review media, collaborate in real time, and track progress. The visual direction emphasizes spatial depth, editorial precision, fast-moving UI micro-animations, and dynamic typographic integration over dark obsidian backgrounds with electric violet and cyan accents.

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Deep Obsidian (Background) | `#0A0B0E` | Main environment background |
| Surface Charcoal | `#14161C` | App window background and card surfaces |
| Elevated Glass | `#1F222B` | Floating UI cards and interactive panels |
| Primary Accent (Electric Violet) | `#6366F1` | Brand identity, primary buttons, key glowing nodes |
| Secondary Accent (Cyan Glow) | `#38BDF8` | Active cursor interactions, progress rings, review markers |
| Text Primary | `#FFFFFF` | Headlines, active UI titles |
| Text Secondary | `#94A3B8` | Subtitles, captions, UI metadata |

### Typography
| Font | Weight | Size | Usage |
|------|--------|------|-------|
| Inter / Outfit (Google Fonts) | 700 / 600 | 64-96px | Hero headlines, dynamic feature captions |
| Inter / Outfit (Google Fonts) | 400 / 500 | 18-32px | UI interface text, status labels, multi-user tags |

---

## Scene Breakdown

### Scene 1: Controlled opening (Frames 0–89, 0s - 3s)
**Duration**: 3 seconds (90 frames)
#### Visual Elements
- Minimal dark obsidian environment with subtle spatial grid and radial lighting.
- Iridescent 3D geometric orb/tesseract built with Three.js / R3F that spins and accelerates toward camera.
- The 3D orb seamlessly expands into the crisp Orbit application window (`AppWindow`).
- Headline text: **Your work. In motion.**
#### Animations
| Element | Type | Start | End | Easing / Spring Config |
|---------|------|-------|-----|------------------------|
| 3D Orb Rotation | interpolate | 0 | 90 | linear / Easing.out(Easing.exp) |
| Orb Zoom to AppWindow | spring / interpolate | 30 | 70 | `{ damping: 200 }` / clamp |
| Text "Your work." | spring | 20 | 60 | `{ damping: 200 }`, staggered word reveal |
| Text "In motion." | spring | 35 | 75 | `{ damping: 200 }`, staggered word reveal |

### Scene 2: Interface reveal (Frames 90–239, 3s - 8s)
**Duration**: 5 seconds (150 frames)
#### Visual Elements
- Floating-screen 3D perspective treatment of the `AppWindow` (`rotateX(10deg) rotateY(-12deg)` slowly panning to frontal view).
- Layered interface depth: Sidebar, media grid, review cards with glass drop shadows.
- Reusable `Cursor` component enters with believable acceleration and moves to click the "Approve Hero Video v3" card.
- Click ripple interaction and immediate UI state change: Status badge flips from "In Review" to "Approved" with a spring glow.
#### Animations
| Element | Type | Start | End | Easing / Spring Config |
|---------|------|-------|-----|------------------------|
| Camera Parallax | interpolate | 90 | 239 | Easing.inOut(Easing.quad) |
| Cursor Entry & Move | interpolate / spring | 110 | 160 | Bezier curve / spring interpolation |
| Cursor Click Compress | interpolate | 160 | 175 | scale down to 0.85 and rebound |
| Status Badge Flip | spring | 170 | 210 | `{ damping: 15, stiffness: 200 }` (snappy response) |

### Scene 3: Shape-to-interface transformation (Frames 240–389, 8s - 13s)
**Duration**: 5 seconds (150 frames)
#### Visual Elements
- Three UI cards detach from the app window, rising in Z-space with expanding drop shadows.
- Cards morph smoothly into abstract geometric symbols (circle, rounded rectangle, hexagon) representing **Plan**, **Review**, and **Deliver**.
- Symbols reorganize and morph into a new interactive timeline feature panel.
#### Animations
| Element | Type | Start | End | Easing / Spring Config |
|---------|------|-------|-----|------------------------|
| Cards Detach & Elevate | spring | 240 | 280 | `{ damping: 200 }` |
| Shape Morphing | interpolate | 270 | 320 | Easing.inOut(Easing.exp) |
| Feature Words Reveal | spring | 280 | 360 | Staggered `{ damping: 20, stiffness: 150 }` |

### Scene 4: Dynamic captions and feature demonstration (Frames 390–569, 13s - 19s)
**Duration**: 6 seconds (180 frames)
#### Visual Elements
- Collaborative media review canvas with timecode markers and live multi-user avatar cursors (Sarah, Alex, Liam).
- Timed dynamic captions that physically interact with the UI:
  - **“Drop the idea.”** (390–445): Attaches to a dragged media asset card and settles onto the canvas.
  - **“Shape it together.”** (446–505): Splits into typographical blocks floating alongside collaborative cursors resizing a review box.
  - **“Ship it while it matters.”** (506–569): Scales up dynamically and transforms into the green "Ship Release v1.0" header button.
#### Animations
| Element | Type | Start | End | Easing / Spring Config |
|---------|------|-------|-----|------------------------|
| Caption 1 (Drop) | spring | 390 | 445 | Synchronized with card drop physics |
| Caption 2 (Shape) | spring / interpolate | 446 | 505 | Staggered block float beside cursors |
| Caption 3 (Ship to UI)| spring / interpolate | 506 | 569 | Morph position and scale into UI button |

### Scene 5: Accelerated product montage (Frames 570–689, 19s - 23s)
**Duration**: 4 seconds (120 frames)
#### Visual Elements
- Rapid, high-energy montage showcasing 5 core features with match cuts and camera push:
  1. **Project organization**: Matrix Kanban board snapping into grid alignment.
  2. **Media review**: 4K video frame split-screen comparison with live pen drawing annotations.
  3. **Comment interaction**: Rapid cascade of "+1 Approved" badges zooming past camera.
  4. **Analytics view**: Glowing orbital progress ring charging rapidly from 42% to 100%.
  5. **Completion state**: Celebratory geometric particle burst around an "All Milestones Completed" card.
#### Animations
| Element | Type | Start | End | Easing / Spring Config |
|---------|------|-------|-----|------------------------|
| Fast Match Cuts | Sequence / TransitionSeries | 570 | 689 | 24-frame rhythmic cuts with motion blur |
| Progress Ring Charge | interpolate | 630 | 660 | Easing.out(Easing.cubic) |

### Scene 6: Final brand lockup (Frames 690–749, 23s - 25s)
**Duration**: 2 seconds (60 frames)
#### Visual Elements
- Everything resolves cleanly into the glowing Orbit symbol (planetary orbital rings with intersecting ellipses) and display wordmark **Orbit**.
- Final slogan: **Everything moves together.**
- Settles into a pristine promotional end card at frame 749.
#### Animations
| Element | Type | Start | End | Easing / Spring Config |
|---------|------|-------|-----|------------------------|
| Brand Svg Lockup Reveal | spring | 690 | 730 | `{ damping: 200 }` |
| Slogan Word Reveal | spring | 700 | 740 | Staggered `{ damping: 200 }` |

---

## Technical Requirements

### Props Schema (Zod)
```ts
import { z } from "zod";

export const OrbitCommercialSchema = z.object({
  primaryColor: z.string().default("#6366F1"),
  secondaryColor: z.string().default("#38BDF8"),
  backgroundColor: z.string().default("#0A0B0E"),
  headlineText: z.string().default("Your work. In motion."),
  sloganText: z.string().default("Everything moves together."),
});
```

### Critical Rules
> ⛔ FORBIDDEN: CSS transitions, CSS animations, Tailwind animation classes, `setTimeout`, Math.random() without seeds.
> ✅ REQUIRED: All animations driven via `useCurrentFrame()` + `interpolate()` / `spring()`.
> ✅ REQUIRED: `premountFor={1 * fps}` on all `<Sequence>` components.
> ✅ REQUIRED: Clamped extrapolation (`extrapolateLeft: 'clamp'`, `extrapolateRight: 'clamp'`).
