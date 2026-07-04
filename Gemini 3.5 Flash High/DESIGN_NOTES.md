# 🎨 Design Notes: Orbit Commercial

## 1. Creative Concept
The Orbit commercial is designed to reflect a high-production Apple-style software commercial. Orbit’s value proposition is:
> *Everything your creative team needs, moving together.*

To convey this premium technological vibe, we avoided generic bright pastel SaaS patterns and built a dark editorial aesthetic. Using deep neutrals (`#0B0B0F`), crisp typography, and electric purple/cyan accent indicators, the video feels mature, confident, and precise.

---

## 2. Motion System & Timing Curves
All animations are driven deterministically by Remotion's `useCurrentFrame()` hook. CSS animations are strictly forbidden, which guarantees flawless frame-by-frame rendering.

We defined a clear, centralized spring animation architecture in `src/constants.ts`:
- **`smooth`** (`{ damping: 200 }`): Unbouncy, clean spatial transitions. Used for camera relative motion, panning, and card detaching.
- **`snappy`** (`{ damping: 20, stiffness: 200 }`): Fast, tight reveals with minimal overshoot. Used for project list reveals and mouse hovers.
- **`bouncy`** (`{ damping: 8, stiffness: 100 }`): Used strategically for word entrances to add personality and micro-impact.
- **`heavy`** (`{ damping: 15, stiffness: 80, mass: 2 }`): Slow, heavy curves used for full-screen text reveals that push layers into Z-space.

---

## 3. Typography System
Typography acts as a primary graphic asset rather than simple overlays:
- **Font-Family**: *Inter* loaded via `@remotion/google-fonts` to block rendering until the typeface loads.
- **Hierarchical Contrast**: Extremely heavy weight combinations (`font-weight: 800/900`) for display headings against light secondary labels (`#8E939E`, 500 weight).
- **Interactive placement**: captions don't sit in a standard subtitle zone. They travel beside the mouse cursors, warp into chat bubbles, and scale up massively to create camera-like depth.

---

## 4. Spatial Continuity & 3D Layering
To prevent the commercial from feeling like a standard flat slideshow, we created spatial continuity across transitions:
1. **Scene 1 to Scene 2**: The spinning opening particle zooms into the camera and resolves directly into the border glow of the main Dashboard window.
2. **Scene 2 to Scene 3**: A media asset card detaches and floats in 3D space, which then splits directly into geometric shapes that snap into columns, establishing a direct connection between the UI layout and features.
3. **Scene 4 to Scene 5**: The final caption overlay ("matters.") pushes the camera back, shrinking the player view, which morphs into the checklist task items.
4. **Scene 5 to Scene 6**: The completed progress card zooms backwards into a deep Z-plane, and all components fly together to form the outer rotating rings of the final Orbit logo.

We implemented convinced dimensional depth using CSS 3D Transforms (`perspective`, `rotateX`, `rotateY`, `translateZ`) in combination with spring-driven variables. This avoided heavy WebGL bundles while remaining highly performant.

---

## 5. Compromises & Limitations
- **Audio Assets**: The project checks if local audio files exist in the public directory to output clicks/whooshes. However, to keep it completely self-contained and renderable on any system without downloading proprietary sound banks, audio was kept optional and gracefully bypassed if absent.
- **Client-Side Rendering Limits**: Web browsers sometimes struggle with complex nested CSS 3D transforms. To prevent clipping, we clamped the extrapolation ranges (`{ extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }`) on all interpolations so that values never overflow.
