# Design Notes — Orbit Commercial

## Creative concept

Orbit is presented as a spatial operating system for creative work: project cards, review notes, progress indicators and approval states move as one connected system. The commercial uses a restrained dark environment, white typography and blue/violet/green accents.

## Scene structure

1. **Controlled opening (0–89)** — a small luminous object moves through dimensional space and resolves into the app window while “Your work. In motion.” travels through the composition.
2. **Interface reveal (90–239)** — the app enters on a rotated floating screen with parallax, cursor movement and a click response.
3. **Shape-to-interface transformation (240–389)** — cards detach from the app, become geometric objects, and reorganize around Plan / Review / Deliver.
4. **Dynamic captions (390–569)** — spoken-caption phrases move through the product space and one becomes a pinned review note.
5. **Accelerated montage (570–689)** — project organization, media review, approval, analytics and completion are shown through matched cuts and a persistent moving tile.
6. **Brand lockup (690–749)** — motion resolves into the Orbit symbol, wordmark and final line.

## Motion system

All animation is deterministic and frame-based using `useCurrentFrame()`, `interpolate()`, clamped easing helpers and Remotion `<Sequence>` timing. CSS transitions/keyframes are intentionally not used. Motion alternates between restrained holds and faster connected movement.

## Typography system

Typography uses a system sans-serif stack for a clean premium technology tone. Large display text is reserved for brand/caption moments; interface labels use smaller uppercase or medium-weight text. Captions are animated by phrase/word groups rather than bottom-subtitle karaoke timing.

## Spatial continuity

Depth is created with CSS perspective, 3D transforms, layered `translateZ()` elements, shadows, highlights, parallax dust, and camera-like pushes. Scene transitions reuse visual forms: the opening orb becomes the app, app cards become feature shapes, captions become UI notes, and montage elements resolve into the final Orbit mark.

## Audio

A local synthetic soundtrack was generated in `public/audio/orbit-soundtrack.wav`. It contains a low cinematic bed and simple motion-synced cues. No external music or remote audio is required.

## Compromises and limitations

- The product interface is a designed fictional React/SVG/CSS interface, not a live application recording.
- Spatial depth uses CSS 3D rather than WebGL/Three.js to keep the render lightweight and deterministic.
- The soundtrack is functional sound design, not a mastered commercial music track.
