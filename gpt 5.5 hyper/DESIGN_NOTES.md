# Design Notes

## Creative concept

Orbit is presented as a dark, dimensional workspace where project planning, media review, collaboration and delivery move as one connected system. The commercial avoids explanatory paragraphs; it uses UI motion, cursor interactions, morphing cards and kinetic captions to communicate the line: **Everything your creative team needs, moving together.**

## Scene structure

1. **Frames 0-89 — Controlled opening**  
   A small orbital point appears in a dark spatial field, accelerates forward and resolves into the product environment. The line “Your work. In motion.” is anchored by a vertical/rule composition instead of centred as a title slide.

2. **Frames 90-239 — Interface reveal**  
   The Orbit window enters with perspective, parallax and layered UI depth. A reusable cursor moves with acceleration, clicks a review thread, triggers a response chip, then clicks the review module to update the interface.

3. **Frames 240-389 — Shape-to-interface transformation**  
   Interface cards detach into floating panels, become geometric units and reorganise around the words **Plan**, **Review** and **Deliver**. A final feature panel assembles from the same spatial area.

4. **Frames 390-569 — Dynamic captions and collaboration**  
   Captions act as interface material rather than subtitles: “Drop the idea.” attaches to a review board, “Shape it together.” moves through the workspace, and “Ship it while it matters.” becomes part of an approval interaction.

5. **Frames 570-689 — Accelerated montage**  
   A single persistent app shell match-cuts through project organisation, media review, approval, analytics/progress and completion states.

6. **Frames 690-749 — Final brand lockup**  
   The montage energy collapses into the Orbit symbol, wordmark and line **Everything moves together.** with a controlled final settle.

## Motion system

- One deterministic GSAP timeline registered as `OrbitCommercial`.
- Scene timings are hard-coded to the required frame ranges.
- Motion relies on perspective rotations, camera-like push/pull, staggered card choreography, masked wipes and short micro-interactions.
- The cursor component supports interpolated movement, click compression and ripple feedback.

## Typography system

- Large, restrained display typography with tight tracking for premium tech-ad tone.
- Captions are treated as spatial typographic blocks and chips, not bottom subtitles.
- UI labels use small uppercase mono-style metadata for editorial texture.

## Spatial continuity

Continuity is created by keeping the app shell, cards, shapes and captions within a shared Z-space. Scene 2’s interface depth motivates Scene 3’s card detachment; Scene 4’s caption chips become UI-like objects; Scene 5 keeps a single app window while the content inside changes.

## Compromises / limitations

- The final implementation keeps most markup in `index.html` to satisfy HyperFrames static timeline parsing; reusable structure is separated through CSS and timeline sections, with `assets/orbit-commercial.js` retained as the authoring source copy.
- Validation reports several contrast warnings on animated/translucent UI elements, but lint/validate/inspect complete with zero blocking errors and frame review confirms readability.
- A local Aptos font may not resolve on every machine; CSS declares local font faces and falls back to Segoe/Helvetica-style system fonts.
