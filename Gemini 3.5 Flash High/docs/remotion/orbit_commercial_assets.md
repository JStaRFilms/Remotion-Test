# 🎨 Asset Manifest: Orbit Commercial

## 1. Code-Generatable Components ✅
*These components will be built entirely with React, Tailwind CSS styles, and inline SVGs to ensure crisp rendering at any resolution without requiring external pixel assets:*

| Component | Description | Complexity |
|-----------|-------------|------------|
| `AppWindow.tsx` | The Orbit macOS-style application frame with traffic light window controls. | Medium |
| `Cursor.tsx` | High-fidelity mouse pointer that handles movement, click compression, and click ripple effects. | Medium |
| `Dashboard.tsx` | The core dashboard showing projects, progress meters, and collaborating user bubbles. | High |
| `CollaboratorCursor.tsx` | Second, colored collaborator mouse pointer with an attached user label. | Medium |
| `MorphingShape.tsx` | SVG shape component that morphs from geometry into cards using SVG path morphing or CSS transitions driven by `useCurrentFrame()`. | High |
| `CaptionRenderer.tsx` | Captions that travel next to cursors and morph into chat bubbles. | Medium |
| `BrandLockup.tsx` | The final animated Orbit logo resolve and wordmark reveal. | Medium |

---

## 2. External Assets Needed (Optional / Provided by User) 📦
*The project is structured to run and render successfully even if these are missing by checking file existence or failing gracefully.*

| Asset | Type | Description | Action |
|-------|------|-------------|--------|
| `public/music.mp3` | MP3 | Background audio/music track. | Optional (user can add to project). |
| `public/click.wav` | WAV | Sound effect for cursor click interactions. | Optional (user can add to project). |
| `public/success.wav` | WAV | Sound effect for the final completed checkmark. | Optional (user can add to project). |

---

## 3. UI Generation Choice
* Since Orbit is a fictional collaborative software, building the UI as custom React and SVG components guarantees a premium, razor-sharp look, micro-interactions, and flawless frame-by-frame controls. No screenshots or unverified external image assets will be used.

**Decision: Code-generated UI Components.**
