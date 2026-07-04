# 🛸 Orbit Commercial — Remotion Project

This project contains the source files and render configurations for a polished 25-second cinematic technology advertisement for **Orbit**, built using Remotion, React, and TypeScript.

## 🚀 Commands

### Install Dependencies
Always use `pnpm` in this project:
```bash
pnpm install
```

### Start Remotion Studio Preview
Scrub through the timeline, view real-time adjustments, and debug visual parameters:
```bash
pnpm run dev
```

### Render Final MP4 Video
Render the complete 25-second (750 frames @ 30 FPS) video directly:
```bash
pnpm exec remotion render OrbitCommercial orbit_commercial.mp4
```

### Render Stills for Scenes
Render individual frames to PNG:
```bash
pnpm exec remotion still OrbitCommercial frames/scene[N].png --frame [frame_number]
```

---

## 📂 Project Structure

```
├── docs/
│   └── remotion/
│       ├── orbit_commercial_spec.md    # Video specification breakdown
│       └── orbit_commercial_assets.md  # Asset manifest (code-generated list)
├── frames/
│   ├── scene1.png                      # Scene 1 opening particle
│   ├── scene2.png                      # Scene 2 dashboard & cursor
│   ├── scene3.png                      # Scene 3 shapes morphing
│   ├── scene3_complete.png             # Scene 3 all words revealed
│   ├── scene4.png                      # Scene 4 collaborative players & comments
│   ├── scene5.png                      # Scene 5 Checklist & Progress
│   ├── scene5_complete.png             # Scene 5 Approved stamp landed
│   ├── scene6.png                      # Scene 6 brand lockup rotating
│   └── scene6_complete.png             # Scene 6 final resolved tagline
├── src/
│   ├── components/
│   │   ├── AppWindow.tsx               # macOS style application frame container
│   │   ├── Cursor.tsx                  # Reusable click-animating cursor component
│   │   ├── Scene1.tsx                  # Controlled opening / particle zoom
│   │   ├── Scene2.tsx                  # 3D tilted interface reveal & click
│   │   ├── Scene3.tsx                  # Morphing shape transition & feature words
│   │   ├── Scene4.tsx                  # Media player drag-drop & collaborative review
│   │   ├── Scene5.tsx                  # Checklist tick, progress gauge & rubber stamp
│   │   └── Scene6.tsx                  # Concentric rotating logo & tagline resolve
│   ├── Composition.tsx                 # Main video sequencer linking all scenes
│   ├── Root.tsx                        # Remotion composition registry & font preloader
│   ├── constants.ts                    # Central design system (colors, timings, springs)
│   ├── index.css                       # Global styling resets & font setup
│   └── index.ts                        # Root package entry point
├── package.json                        # Dependency manifest
├── remotion.config.ts                  # Remotion build and Tailwind v4 configuration
└── tsconfig.json                       # TypeScript compiler options
```

---

## 📦 Packages Used

- **`remotion`** (core video framework)
- **`react`** & **`react-dom`** (v19 user interface)
- **`@remotion/cli`** (compilation & rendering)
- **`@remotion/tailwind-v4`** (Tailwind v4 integration)
- **`@remotion/google-fonts`** (load Inter font-face automatically)
- **`tailwindcss`** (styles utility framework)
- **`typescript`** (strict typing verification)
