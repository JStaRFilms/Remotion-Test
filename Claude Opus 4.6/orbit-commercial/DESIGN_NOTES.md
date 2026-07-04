# Design Notes — Orbit Commercial

## Creative Concept

The commercial tells the story of creative work in motion. Rather than explaining Orbit's features through bullet points, the video demonstrates them through fluid visual storytelling — objects morph, interfaces respond to interaction, and typography participates as a dynamic element rather than static labels.

The visual language draws from premium technology advertising: dark environments, precise motion, bright white typography, and restrained accent colour. The overall tone is confident and editorial.

## Scene Structure

### Scene 1: Controlled Opening (0-89)
- **Concept**: Birth of the product from a single point of light
- **Motion system**: Point → logo → window morph using spring physics
- **Typography**: "Your work. In motion." enters from opposing directions, positioned off-center
- **Spatial**: Perspective wrapper with camera Z push

### Scene 2: Interface Reveal (90-239)
- **Concept**: The product as a living, responsive tool
- **Motion system**: 3D perspective entry (rotateY/rotateX) with camera push
- **Key interaction**: Cursor enters, clicks progress bar (72% → 85%), checks task
- **Depth**: Parallax layers on sidebar vs. content, realistic shadow stack

### Scene 3: Shape Transform (240-389)
- **Concept**: Product features as abstract motion design
- **Motion system**: Cards detach → morph to shapes → orbit → resolve to interface elements
- **Typography**: Plan/Review/Deliver with distinct motion roles (drop, slide, scale)

### Scene 4: Dynamic Captions (390-569)
- **Concept**: Collaboration demonstrated through spatial text
- **Caption behavior**: Each phrase enters from a different direction, emphasis on key words
- **UI transformation**: "Drop the idea." becomes an annotation pin; "Ship it while it matters." becomes a button

### Scene 5: Accelerated Montage (570-689)
- **Concept**: Product capability at speed
- **Transition system**: Masked clip-path reveals from alternating directions
- **Continuity**: Accent line persists across panels, colour shifts violet→blue→green
- **5 panels**: Organize, Review, Approve (with confetti), Analytics, Completion

### Scene 6: Brand Lockup (690-749)
- **Concept**: Resolution and identity
- **Motion system**: Ring draws itself (SVG stroke animation), dot flash, letter stagger
- **Final motion**: Subtle upward float that eases to near-stillness

## Motion System

### Spring Configurations
- `smooth` (damping: 200): Most entrances, reveals, camera
- `snappy` (damping: 20, stiffness: 200): Quick UI responses, cursor click
- `bouncy` (damping: 8): Feature word drops
- `gentle` (damping: 30, stiffness: 120): Secondary elements

### Easing Curves
- `Easing.out(Easing.exp)`: Camera pushes, window entrances (fast start, soft landing)
- `Easing.inOut(Easing.quad)`: Cursor movement, smooth transitions
- `Easing.out(Easing.quad)`: Ripple effects, particle expansion

## Typography System

- **Font**: Inter (Google Fonts, loaded via @remotion/google-fonts)
- **Weights used**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extra-bold for feature words)
- **Hierarchy**: Hero (96px) → Display (72px) → Heading (48px) → Body (18px) → Caption (14px)
- **Colour differentiation**: Primary text (white), secondary (#A0A0C0), muted (#6B6B8D), accent (#7C5CFC)

## Spatial Continuity

1. **Scene 1→2**: The window outline established in S1 evolves into the full AppWindow in S2
2. **Scene 2→3**: Interface cards from S2's layout detach to become S3's morphing shapes
3. **Scene 3→4**: The accent colour palette carries through; shapes resolve near the review interface
4. **Scene 4→5**: The review interface concept carries into the montage panels
5. **Scene 5→6**: The completion checkmark converges to center, resolving into the brand lockup

## Colour Palette
| Colour | Hex | Usage |
|--------|-----|-------|
| Background | #0A0A0F | Primary dark environment |
| Card | #141420 | UI surfaces |
| Accent | #7C5CFC | Primary brand violet |
| Electric | #4CA8FF | Secondary blue accent |
| Success | #34D399 | Completion/approval states |
| Text | #FFFFFF | Primary text |
| Text Secondary | #A0A0C0 | Secondary labels |

## Compromises & Limitations

1. **No audio**: Sound design cues (clicks, whooshes, impacts) are documented but not implemented, as no audio assets were provided. The project remains renderable.
2. **CSS 3D only**: Used CSS perspective transforms rather than Three.js/@remotion/three for dimensional effects. This keeps dependencies lighter while still achieving convincing depth.
3. **Cursor path simplicity**: Cursor movement uses linear keyframe interpolation between positions rather than Bézier curves. Still smooth due to Easing.inOut.
4. **SVG stroke animation**: Ring-drawing in Scene 6 uses approximate circumference calculation for the ellipse.
5. **No true match cuts between scenes**: Scenes use Sequence boundaries. Visual continuity is maintained through shared elements and colour rather than literal shared objects across Sequence boundaries.
