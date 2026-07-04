using "Remotion Skill" and "Remotion Workflow"

# REMOTION HIGH-PRODUCTION APP COMMERCIAL BENCHMARK

You are acting as both:

1. A senior motion designer specialising in premium technology advertising.
2. A senior React and Remotion engineer responsible for delivering a working, renderable project.

Your task is to create a polished 25-second application commercial using Remotion.

The finished video should feel comparable in production ambition to a premium Apple-style application advertisement: clean, deliberate, fast-moving, spatial, visually intelligent and highly polished.

This must not look like a basic slideshow, generic SaaS explainer, template animation or collection of unrelated transitions.

## Objective

Create a cinematic product showcase for a fictional application called **Orbit**.

Orbit helps creative teams organise projects, review media, collaborate and track progress.

The commercial should communicate:

> Everything your creative team needs, moving together.

The viewer should understand the product primarily through motion and visual storytelling, not through paragraphs of explanatory text.

## Technical Format

* Framework: Remotion with React and TypeScript
* Resolution: 1920 × 1080
* Frame rate: 30 FPS
* Duration: exactly 25 seconds / 750 frames
* Composition ID: `OrbitCommercial`
* Final output: MP4
* The project must run and render successfully.
* Do not merely provide code snippets. Implement the complete project inside this folder.
* Use local assets only unless a package is installed properly and remains available during rendering.
* No remote image URLs.
* No manually embedded base64 asset dumps.
* Do not use copyrighted Apple logos, interfaces or proprietary visual assets.

## Required Narrative Structure

### Scene 1 — Controlled opening: Frames 0–89

Begin with a minimal dark environment.

A small glowing point or abstract geometric object appears in dimensional space.

The object accelerates toward the camera and transforms into the Orbit application window.

The opening should immediately establish premium depth, precision and momentum.

Display the line:

**Your work. In motion.**

The text should participate in the composition rather than simply fading in at the centre.

### Scene 2 — Interface reveal: Frames 90–239

Present the application interface in a cinematic device or floating-screen treatment.

Required motion:

* Perspective entry or subtle 3D rotation.
* Camera push or parallax movement.
* Layered interface depth.
* Realistic shadows and highlights.
* A cursor entering the scene.
* Cursor movement with believable acceleration and deceleration.
* A visible mouse click interaction.
* UI response immediately following the click.

The application must feel active and responsive, not like a screenshot being moved around.

### Scene 3 — Shape-to-interface transformation: Frames 240–389

Transition from the interface into an abstract motion-design sequence.

Required transformation:

* One or more interface cards detach from the application.
* The cards become geometric shapes.
* The shapes reorganise or morph into a new text box, dashboard element or feature panel.
* The movement should maintain spatial continuity so that objects appear to transform rather than disappear and reappear.

Show these feature words dynamically:

**Plan**

**Review**

**Deliver**

Do not display them as three static text lines. Each word should have a distinct motion role and should interact with surrounding objects.

### Scene 4 — Dynamic captions and feature demonstration: Frames 390–569

Demonstrate collaborative review inside the product.

Use these timed spoken-caption phrases even if no narration is supplied:

* “Drop the idea.”
* “Shape it together.”
* “Ship it while it matters.”

The captions must not remain in a conventional subtitle position.

They should move through the composition intelligently:

* Attach temporarily to interface elements.
* Travel beside the cursor or camera movement.
* Enter from different spatial directions.
* Change scale according to emphasis.
* Reflow or divide into multiple typographic units.
* Remain readable throughout.

Include at least one moment where a caption becomes part of the UI or transforms into an interface component.

Do not use karaoke captions, generic TikTok captions or word highlighting along the bottom edge.

### Scene 5 — Accelerated product montage: Frames 570–689

Create a rapid but coherent montage showing several Orbit features.

Include:

* Project organisation.
* Media review.
* Comment or approval interaction.
* Progress or analytics view.
* Successful completion state.

Use match cuts, object continuity, masked transitions, camera movement or shape transformations.

Do not use five unrelated full-screen slides.

The montage should accelerate toward the conclusion while preserving visual clarity.

### Scene 6 — Final brand lockup: Frames 690–749

Resolve the movement into the Orbit symbol and wordmark.

Display:

**Everything moves together.**

Finish with a controlled final motion—not an abrupt stop and not an ordinary fade-to-black.

The last frame should be visually complete and suitable as a promotional end card.

## Visual Direction

Target qualities:

* Premium.
* Minimal but not empty.
* Fast.
* Dimensional.
* Precise.
* Technological.
* Editorial.
* Confident.
* Visually restrained.
* Rich in purposeful micro-animation.

Use a dark neutral environment with bright white typography and a restrained violet or electric-blue accent.

Avoid excessive gradients, glowing neon everywhere, glassmorphism overload and generic “AI technology” imagery.

## Motion Direction

Motion must be intentional and connected.

Use:

* Staggered timing.
* Anticipation.
* Overshoot only where appropriate.
* Follow-through.
* Motion blur simulation where practical.
* Spring motion with carefully chosen values.
* Interpolation with clamping.
* Perspective.
* Parallax.
* Layered Z-space.
* Masked reveals.
* SVG path or shape animation.
* Shared visual elements between scenes.
* Camera-like movement.
* Controlled speed ramps.
* Micro-interactions after cursor clicks.

Do not animate every property continuously.

Alternate between visual intensity and brief moments of restraint.

Avoid:

* Repeated fade-and-slide entrances.
* Random bouncing.
* Elements scaling from zero without motivation.
* Every object using the same spring configuration.
* Excessively elastic motion.
* Transitions that exist only to demonstrate an effect.
* Unmotivated spinning.
* Generic particle backgrounds.
* A presentation-deck appearance.

## 3D and Spatial Requirement

The video must contain convincing dimensional motion.

You may use CSS 3D transforms, SVG, Canvas, WebGL, Three.js or `@remotion/three`.

At minimum, implement:

* Perspective.
* Layer separation.
* Camera-relative motion.
* One convincing screen rotation or spatial transition.
* Lighting or shadow changes that reinforce depth.

Do not add 3D merely as decoration. It should help showcase the product.

## Cursor Interaction Requirements

Build a reusable animated cursor component.

It must support:

* Position interpolation.
* Smooth movement.
* Click compression.
* Click ripple or interface reaction.
* Optional cursor disappearance when the composition no longer requires it.

At least two cursor interactions must visibly alter the interface.

## Typography Requirements

Typography is a major visual element.

* Establish clear hierarchy.
* Use deliberate line breaks.
* Keep text readable.
* Use large display type where appropriate.
* Animate text by meaningful units: line, word, character group or typographic block.
* Prevent accidental clipping and overflow.
* Do not centre every piece of text.
* Do not place all captions at the bottom.
* Do not use excessive font weights or more than two font families.

## Audio

Use the provided music if present.

Add sound-design cues for major actions when suitable:

* UI clicks.
* Soft impacts.
* Whooshes.
* Morph transitions.
* Final lockup.

Audio should reinforce motion rather than cover weak animation.

If some sound assets are unavailable, keep the project renderable and document the missing optional sounds.

## Code Quality

Organise the code into reusable components.

Suggested components include:

* `OrbitCommercial`
* `Scene`
* `AppWindow`
* `Cursor`
* `DynamicCaption`
* `FeatureCard`
* `MorphingShape`
* `CameraRig`
* `BrandLockup`

Maintain central configuration for:

* Colours.
* Typography.
* Scene timings.
* Spring configurations.
* Common easing functions.
* Safe margins.
* Application data.

Avoid one enormous component containing the entire animation.

Use deterministic frame-based animation. Do not use browser-time animations, CSS transition timing, `setTimeout`, random values without deterministic seeds or animations that behave differently during rendering.

## Self-Review Process

After completing the first implementation:

1. Run the project.
2. Confirm that the composition loads.
3. Render representative frames from every scene.
4. Inspect those frames visually.
5. Render the complete video.
6. Review the rendered result.
7. Identify weak moments involving timing, visual hierarchy, clipping, pacing, awkward transitions or empty composition.
8. Improve the project.
9. Render the final version.

Do not stop immediately after the code compiles.

## Required Deliverables

Create all of the following:

1. Complete Remotion source project.
2. Final rendered MP4.
3. `README.md` containing:

   * Setup instructions.
   * Preview command.
   * Render command.
   * Project structure.
   * Packages used.
4. `DESIGN_NOTES.md` explaining:

   * Creative concept.
   * Scene structure.
   * Motion system.
   * Typography system.
   * How spatial continuity was created.
   * Compromises or limitations.
5. `SELF_REVIEW.md` containing:

   * What was successfully implemented.
   * What remains imperfect.
   * What you changed after reviewing the first render.
6. A `frames/` directory containing at least one representative still from every scene.

## Completion Standard

The project is not complete merely because it renders.

It should demonstrate:

* Strong visual direction.
* High animation density without chaos.
* Correct Remotion implementation.
* Thoughtful timing.
* Spatial continuity.
* Dynamic typography.
* Real interface interaction.
* Reusable code.
* A finished promotional narrative.

Prioritise production quality over adding a large number of superficial effects.
