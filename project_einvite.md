# E-Invite Wedding Page — Build Log

Wedding date: **9 Januari 2027 (Sabtu), 30 Rejab 1448H**, 11am–5pm  
Couple: **Muhammad Azbin Fahmi & Norfadlin Nasoha (Lin)**  
Venue: Damai Homestay, Lot 843, Jalan Sg Jagong, Sg Layar, Sungai Petani  
Live at: `/e-invite`

## File locations
- Page: `src/pages/e-invite/index.tsx`
- Cover styles: `src/styles/e-invite/EInvite.module.css`
- Details styles: `src/styles/e-invite/Details.module.css`
- App: `src/pages/_app.tsx` (body background set for e-invite)
- Assets: `public/e-invite/` (bismillah.png, LogoIcon.png, waze.png, google-maps.png, Selamat Pengantin Baru.mp3)
- Favicon: AL monogram in Great Vibes on blue→brown gradient (16x16 + 32x32 ICO)

## Color theme — BROWN (wedding cloth match)
- Page bg: `radial-gradient(ellipse at 60% 35%, #7a3a10 0%, #3d1a06 55%, #2a1005 100%)`
- Songket bg: `#2a1005`
- Ornament inner fill: `#3d1a06`
- Gold text: `#e8c86a` (headings/monogram), `#ddb85a` (names), `#c8a84b` (date/sub)
- Body bg in `_app.tsx`: same brown gradient

## Page structure (sections)
1. **Cover** — no left songket (removed), ornaments spread full width, AL monogram, AZBIN & LIN, slot-machine date, hijri, venue. All gold text.
2. **Details / Arch** — white dome arch on brown bg, walimatul urus, parent names, invite text, groom/bride full names
3. **Info Grid** — 2-col grid: date | aturcara+venue; full-width countdown row. Individual Reveal on each element inside columns.
4. **Doa** — bismillah.png image + doa text inside frosted container card
5. **Footer** (fixed) — Calendar / Call / Map buttons + credit. Slides up from bottom on open.

## Splash screen (door effect)
Structure: `.splash` (fixed, full screen, flex center) → `.splashInner` (width: min(100%, 480px)) → `.door` + left songket frame

- **Left songket** = door frame, stays fixed (z-index 2 over door)
- **`.door`** = mahogany wood grain background, swings inward on knob click
- Door contains: `DoorPanels` (2 recessed panels), `DoorHinge` x2 (pearl white SVG), `DoorKnob` (lever handle SVG), `splashContent`
- Door animation: `perspective(1200px) rotateY(100deg)` from `transform-origin: 0% 50%`
- **Only door knob triggers open** — not the full splash
- Knob click sequence:
  1. Lever rotates -90° over 1s (`leverArm` group in SVG, pivot at 32px 41px)
  2. After 1s: door swings inward (0.75s)
  3. After 1.8s: `setOpened(true)`, splash removed from DOM
- Scroll locked (`body overflow: hidden`) while splash showing, unlocked on open

## Splash content (gold crafted text on wood)
- JEMPUTAN PERKAHWINAN: `#c8a84b`, letter-spacing 0.3em
- AL monogram: `#e8c86a` + gold glow text-shadow
- Azbin & Lin: `#ddb85a`
- Date: `#c8a84b`
- Tap prompt: gold tinted, pulsing animation
- Content positioned at top panel center: `top: calc(16px + (100% - 32px) * 0.325); transform: translateY(-50%)`
- Left/right: `left: 16px; right: 0` (centered across full door width)

## Door panels CSS
- `.doorPanels`: `left:16px; top:16px; right:0; bottom:16px`
- Panels use directional borders (dark top-left, light bottom-right) + inset shadow for recession effect
- `::before` pseudo-element adds diagonal gradient highlight

## Door wood texture
```css
radial-gradient(vignette) + repeating-linear-gradients (grain) + linear-gradient(mahogany base)
box-shadow: inset left highlight, inset right shadow, inset top/bottom shadow
```

## Cover animations (after open)
- `coverHidden` (opacity:0) before open → `coverItem1`–`coverItem9` stagger when `opened=true`
- Delays: 0s → 0.88s
- No left songket on cover page (removed) — padding is `32px 24px` (full width)
- Ornaments redistributed: `ornT1 left:5%`, `ornML left:5%`, etc.

## Scroll reveal (`Reveal` component)
- IntersectionObserver: `threshold:0`, `rootMargin:'0px 0px -120px 0px'`
- Triggers every time element enters/leaves viewport
- CSS keyframe `revealUp` (opacity 0→1, translateY 24→0, 0.65s)
- Section 2: individual Reveal per text element with stagger delays
- Section 3 info grid: Reveal on each element INSIDE the flex columns (NOT wrapping grid items — preserves grid layout and countdown span)
- Section 5 doa: nested Reveals on container, bismillah, doa text

## Countdown
- Target: `new Date('2027-01-09T11:00:00+08:00')`
- HARI : JAM : MINIT : SAAT, 2-digit, updates every second
- Hydration fix: init `{0,0,0,0}`, calc in useEffect
- `grid-column: 1 / -1` on `.countdownRow`

## Footer
- `footerHidden`: `transform: translateY(100%)` (below screen before open)
- `footerReveal`: slides up 0.5s after open with 0.3s delay
- Desktop: `left: calc(50vw - 240px)` (avoids transform conflict with slide animation)

## Music button (floating)
- `position: fixed; bottom: 90px; right: 16px; z-index: 101`
- Round pill button with backdrop blur
- **Sound icon** when playing, **muted/X icon** when paused
- State synced via audio element `play`/`pause` events (not manual toggle state)
- Desktop: `right: calc(50vw - 240px + 16px)`
- Also reveals with `footerReveal` animation

## Desktop (≥768px)
- `.page`: `max-width: 480px; margin: 0 auto`
- `.splashInner`: `width: min(100%, 480px)` — constrains door to phone width
- `.footer` + `.musicFloatBtn`: `left/right: calc(50vw - 240px ...)`

## Key decisions / gotchas
- `background-clip: text` on monogram caused A swash to be invisible → switched to plain `color`
- Hydration error from `Date.now()` in useState → init to zeros, calc in useEffect
- Info grid: NO Reveal wrapping grid items (breaks grid-column span + countdown jumps every tick). Reveal wraps elements INSIDE columns only.
- CSS transition unreliable for scroll reveal → use keyframe animation (`revealUp` with `forwards`)
- `background-attachment: fixed` caused scroll jank → removed
- `100dvh` caused scroll jump on mobile (browser chrome resize) → changed to `100svh`
- Footer `transform: translateX(-50%)` conflicted with slide-up animation → use `calc(50vw - 240px)` instead
- Music isPlaying state was out of sync with audio started from knob click → sync via audio element events
- `SongketPos` type must be declared before `SongketStrip` function
- `RefObject<HTMLAudioElement>` must be `RefObject<HTMLAudioElement | null>` in React 19
- Left songket z-index: 2 (above door z-index: 1) so it stays on top during door swing
