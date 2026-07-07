# Orbit Commercial Blueprint

## Goal
Create a cinematic, highly-polished 25-second (exactly 750 frames at 30 FPS) application commercial for **Orbit**, a creative collaboration platform. 

The thesis is: **"Everything your creative team needs, moving together."**
The commercial will establish a premium technological feel (Apple-style advertising) using CSS 3D, SVG animations, camera parallax, dynamic typography, and a custom interactive cursor component.

## Visual Styling
* **Environment:** Minimal dark neutral environment (deep greys `#0a0a0c` to `#121215`).
* **Colors:** Sleek dark mode base, bright white typography (`#ffffff`), restrained violet/indigo/electric-blue accents (`#6366f1` / `#4f46e5` / `#3b82f6`).
* **Typography:** Clean sans-serif hierarchy (Inter/Outfit for headers/body, JetBrains Mono for metadata/labels).
* **Aesthetics:** Rich micro-animations, glassmorphism, camera focus pulls, clean drop shadows, and high metadata density (data indicators, monospace metrics).

## Architecture (Modular Layout)
We will use a **Modular Layout** with separate sub-compositions for visual isolation and independent timeline control. 
Continuous audio (bgm, voice, SFX) will be mounted in the root `index.html`.

* `index.html` (Modular Orchestrator, contains audio tracks, root timeline)
* `compositions/scene1_opening.html` (Frames 0–89 / 0s - 3.0s)
* `compositions/scene2_reveal.html` (Frames 90–239 / 3.0s - 8.0s)
* `compositions/scene3_transform.html` (Frames 240–389 / 8.0s - 13.0s)
* `compositions/scene4_collaboration.html` (Frames 390–569 / 13.0s - 19.0s)
* `compositions/scene5_montage.html` (Frames 570–689 / 19.0s - 23.0s)
* `compositions/scene6_outro.html` (Frames 690–749 / 23.0s - 25.0s)

## Timeline and Pacing Guide (750 frames / 25 seconds)

| Scene | Start Frame | End Frame | Duration | Narration / Voice Guide | Visual Highlights |
|---|---|---|---|---|---|
| **Scene 1** | 0 | 89 | 3.0s | *Intro sound effect* | Small glowing sphere/core accelerates into camera, morphs into window. Text: "Your work. In motion." |
| **Scene 2** | 90 | 239 | 5.0s | *Synth swell* | Floating 3D window rotation. Parallax layers. Cursor enters, hovers, clicks, UI updates. |
| **Scene 3** | 240 | 389 | 5.0s | *Rhythmic beat* | Cards detach from UI, transform into shapes, morph into feature list: **Plan**, **Review**, **Deliver**. |
| **Scene 4** | 390 | 569 | 6.0s | "Drop the idea. Shape it together. Ship it while it matters." | Spatial captions traveling with cursor/camera. Caption turns into UI component. Collaboration simulation. |
| **Scene 5** | 570 | 689 | 4.0s | *Accelerating beats* | Rapid match-cut montage of project organization, media player review, commenting, completion checkmark. |
| **Scene 6** | 690 | 749 | 2.0s | *Final chime/chord* | Resolution into Orbit emblem and wordmark. Subtitle: "Everything moves together." Elegant rest state. |

## Interactive Cursor Component
A reusable cursor styled as a clean translucent ring with a solid core, built using absolute HTML/SVG positioning and Driven by GSAP:
* **Properties:** `x`, `y`, `scale` (click compression), and a ripple element.
* **Interactions:** 
  1. Scene 2: Clicks on a "Review Media" folder, showing a grid of video items.
  2. Scene 4: Drags a text element ("Drop the idea") into a project placeholder, triggering an animated timeline card loading state.
  3. Scene 5: Clicks a "Complete Project" button, which turns into a green glowing checkmark and launches a particle check animation.

## Sound Design
* **BGM:** A sleek, minimal, technological electronic beat.
* **SFX:**
  * Scene 1: Dimensional zoom-whoosh.
  * Scene 2: Click tick + low synth rumble.
  * Scene 3: Morphing/shimmering noise.
  * Scene 4: Whoosh for text placement.
  * Scene 5: Fast ticks on montage transitions, click chime on completion.
  * Scene 6: Sustained ambient outro chime.
