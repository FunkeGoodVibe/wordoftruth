# Page-opening curtain reveal

## Experience
- Add a full-screen black curtain over the home page whenever the page is freshly loaded.
- Animate a jagged tear opening through the centre, with the two curtain halves pulling apart to reveal the existing calm website beneath.
- Add brief red lightning flashes along the tear during the opening, then remove the entire effect so the page remains peaceful and fully usable.
- Keep the sequence short and cinematic, approximately 2–3 seconds, with no sound.

## Accessibility and usability
- Prevent clicks and scrolling only while the curtain covers the page, then restore normal interaction immediately.
- For visitors who prefer reduced motion, replace the tearing and lightning with a quick black fade.
- Make the effect scale cleanly across phones and larger screens without changing existing page content or behavior.

## Technical details
- Build the opening as a focused overlay component using the existing animation library.
- Use CSS clipping and semantic color tokens for the torn edges, curtain, and lightning; no image download is required.
- Mount the overlay only on the home page and remove it from the document after the animation completes.
- Verify the opening and final calm page at desktop and mobile sizes, including reduced-motion behavior.
