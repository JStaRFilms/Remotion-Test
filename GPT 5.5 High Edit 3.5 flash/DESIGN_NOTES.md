# Design Notes — Orbit Commercial UI (Technical Brutalist Overhaul)

## Creative Concept
Orbit is presented as an advanced, high-performance editor and team operating system for creative media. The commercial features a completely fresh **Technical Brutalist / Mono-Chrono Lilac** design language: dark matte obsidian backgrounds, razor-thin technical lines, pure white text, and a highly focused, restricted accent palette consisting strictly of electric lilac, royal indigo, and deep violet. Bubbly, rounded consumer SaaS details are completely eliminated.

## Scene Structure
1. **Controlled Opening (0–89)** — A small white square node accelerates through dimensional space, resolving into the sharp dashboard while the line “Your work. In motion.” animates with clean tracking.
2. **Interface Reveal (90–239)** — The application enters on a sharp rotated floating canvas with parallax cursor movement, clicking action, and a flat technical response.
3. **Shape-to-Interface Transformation (240–389)** — High-precision square plates detach from the app, morph, and reorganize into PLAN, REVIEW, and DELIVER.
4. **Dynamic Captions (390–569)** — Spoken-caption phrase blocks move through 3D space, where the final word transitions into a squared feedback comment.
5. **Accelerated Montage (570–689)** — Project organization, editing preview tracks, approval, progress velocity charts, and checkouts are presented in a fast matching cut.
6. **Brand Lockup (690–749)** — Resolves into a modular Orbit system symbol, bold uppercase wordmark, and monospaced wide tagline.

## Redesigned Visual Language System

This overhaul replaces generic SaaS gradient bubbles with a high-fidelity editor interface:

### 1. Unified Color & Styling Config
- **Obsidian Dark Theme**: Base color shifted to matte obsidian `#08090b` and slate carbon `#0e1014`.
- **Restricted Accents**: Colors are limited to Indigo (`#6366f1`), Electric Violet (`#8b5cf6`), Soft Lilac (`#c084fc`), and Muted Lavender (`#a78bfa`). Flat color blocks are used instead of massive multi-color linear gradients.
- **Razor Dividers**: All border outlines use a sharp single-pixel line `rgba(255,255,255,0.06)` with zero soft outer glows.

### 2. High-Precision Squared Layouts (Technical corners)
- **Small Radii**: Big bubbly pills are replaced with tiny, high-precision technical corners (`borderRadius: 4px` to `8px`) for the AppWindow container, dashboard panels, and task cards.
- **Flat Sliders**: Sliders and progress tracks are flat bar slots (`borderRadius: 0px` or `2px`) with square block slider thumbs.
- **Squared Avatars**: Circular collaborator icons are converted into sharp rectangular letter badges.

### 3. Professional Media Editor Mockup
- **Playback Monitor**: Transformed the preview media viewport into a professional video layout with gridlines, timecode labels (`00:18 / 00:30`), time indicators, and layered 3D wireframe slots.
- **Editing Timeline**: Timeline segments represent individual clip blocks with flat track fills, dotted tick marks, and a squared playhead cursor handle.
- **Review Notes**: Popups feature a straight top indicator line (`borderTop`) instead of rounded pills, formatted with monospaced sub-headers.

### 4. Progress Velocity Dashboard
- **Chart Layout**: Structured with dashed horizontal gridlines, vertical rounded cylinder graphs, and detailed week-marker labels (`W1` through `W6`).
- **Activity Gauges**: Rounded indicator arcs are replaced with sharp square status nodes.

### 5. Technical Brand lockup
- **Concentric Guides**: The OrbitSymbol uses concentric square backing grids, coordinate guidelines, orbiting square nodes, and a central white square node core.
- **Wordmark**: "ORBIT" wordmark rendered in bold capitalized typography with a purple square dot. Tagline formatted with wide letter spacing and monospaced uppercase letters.
