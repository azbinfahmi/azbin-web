# E-Invite Wedding Page — Build Log

Wedding date: **9 Januari 2027 (Sabtu), 30 Rejab 1448H**, 11am–5pm  
Couple: **Muhammad Azbin Fahmi & Norfadlin Nasoha (Lin)**  
Venue: Damai Homestay, Lot 843, Jalan Sg Jagong, Sg Layar, Sungai Petani  
Live at: `/e-invite`

## File locations
- Page: `src/pages/e-invite/index.tsx`
- Cover styles: `src/styles/e-invite/EInvite.module.css`
- Details styles: `src/styles/e-invite/Details.module.css`
- Assets: `public/e-invite/` (bismillah.png, LogoIcon.png, waze.png, google-maps.png, Selamat Pengantin Baru.mp3)
- Favicon: generated from LogoIcon.png as AL monogram in Great Vibes on blue gradient

## Page structure (sections)
1. **Cover** — songket left strip, ornaments, AL monogram, AZBIN & LIN, slot-machine date, hijri, venue
2. **Details / Arch** — white dome arch on navy bg, walimatul urus, parent names, invite text, groom/bride full names
3. **Info Grid** — 2-col grid: date (09, Januari 2027) | aturcara + venue; full-width countdown row below
4. **Doa** — bismillah.png image + doa text inside a frosted container card
5. **Footer** (fixed) — Calendar / Call / Map buttons + music play/pause icon + credit

## Splash screen (door effect)
- Full-screen overlay before user opens the card
- Structure: `.splash` container (fixed, has perspective: 1400px) contains:
  - `<SongketStrip position="left" />` — stays fixed (the door frame/hinge side)
  - `.door` div — rotates inward on click (the actual door panel), contains:
    - Top + bottom songket strips
    - Door panels (2 CSS rect grooves, top panel bigger)
    - 2 hinges (top/bottom, pearl white SVG)
    - Door knob + keyhole (pearl white SVG, right side)
    - Splash content (JEMPUTAN PERKAHWINAN, AL monogram, names, date, tap prompt)
- On tap: `.doorHide` class added → `rotateY(100deg)` swings door inward (into screen)
- Left songket remains, door disappears, card is revealed
- Audio starts playing on tap (gesture unlocks autoplay)
- `setOpened(true)` fires at 800ms, removes splash from DOM

## Cover animation (after open)
- Text elements use `coverHidden` (opacity:0) before open, switch to `coverItem1`–`coverItem9` stagger animations when `opened = true`
- Stagger delays: 0s → 0.88s, each element fades up one by one
- Background + songket strip + ornaments visible immediately (no hiding)

## Scroll reveal
- `Reveal` component uses IntersectionObserver (`threshold: 0`, `rootMargin: '0px 0px -40px 0px'`)
- Toggles on/off every time element enters/leaves viewport (not one-shot)
- Uses CSS keyframe `revealUp` (opacity 0→1, translateY 24→0)
- Applied to: Section 2 individual text elements (staggered delays), Section 3 info grid wrapper, Section 5 doa container

## Countdown
- Target: `new Date('2027-01-09T11:00:00+08:00')`
- Shows: HARI : JAM : MINIT : SAAT (2-digit each)
- Updates every second via `setInterval`
- Hydration fix: initialises to `{0,0,0,0}`, calculates in `useEffect`
- Sits in `.countdownRow` with `grid-column: 1 / -1` spanning both grid columns

## Audio
- File: `public/e-invite/Selamat Pengantin Baru.mp3`
- Starts at `currentTime = 12.5`, loops
- Single `<audio>` ref lives in `EInvitePage`, passed down to `Footer` as prop
- Play/pause toggle in footer music icon button

## Monogram
- Two `<span>` elements: `monoFirst` = "A", `monoSecond` = "L"
- Font: Great Vibes, `clamp(90px, 22vw, 140px)`
- Color: plain `#ffffff` (NOT background-clip:text — caused clipping issues with the A swash)
- `monoFirst` absolute left:0, `monoSecond` absolute left: clamp(72px,18vw,112px)

## Fonts loaded
- Great Vibes (monogram, script names)
- Cinzel 700 (headings, dates)
- Cormorant Garamond italic 600 (groom/bride names)

## Favicon
- Generated via Node/sharp script from `public/e-invite/LogoIcon.png`
- Actually rendered as AL monogram SVG in Great Vibes on blue radial gradient (16x16 + 32x32 ICO)

## Key decisions / gotchas
- `background-clip: text` on the monogram caused the Great Vibes A swash to be invisible (ink outside element box = no background behind it). Fixed by switching to plain `color: #ffffff`.
- Hydration error from `Date.now()` in initial useState — fixed by init to zeros, calc in useEffect.
- Info grid uses NO Reveal wrappers inside the grid (breaks grid-column span and causes layout jumps on countdown tick). Reveal wraps the outer infoGridWrapper only.
- CSS transition vs animation: transitions didn't fire reliably for scroll reveal — switched to keyframe animation (`revealUp` with `forwards` fill).
- Left songket is `z-index: 2`, top/bottom are `z-index: 1` so left overlaps corners cleanly.
