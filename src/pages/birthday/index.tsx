"use client";

import { useEffect, useState, useRef } from "react";

// ─── CONFIG — edit these ───────────────────────────────────────────────────
const CONFIG = {
  name: "My Fiance NorFadlin Nasoha",                         // her name
  videoSrc: "/birthday/guitar.mp4",          // put your video in /public/birthday/
  videoPoster: "/birthday/poster.jpg",       // optional thumbnail
  message: "Awak menjadikan setiap hari saya lebih bermakna. Sebab itu pada hari lahir awak, saya nak beri sesuatu yang sederhana tapi penuh rasa. Saya harap perasaan cinta ni hadir ke hati awak sepertimana ia hadir dalam diri saya🌹 ",
  photos: [
    "/birthday/photo1.png",
    "/birthday/photo2.png",
    "/birthday/photo3.png",
    "/birthday/photo4.png",
    "/birthday/photo5.png",
    "/birthday/photo6.png",
  ],
  // ── Timeline — add/remove/edit milestones freely ──
  timeline: [
    { date: "23 June 2025",  emoji: "💫", title: "The day we met",                note: "First time saya officially dating dan bersama dengan orang paling cantik di dunia pulak tu." },
    { date: "28 Aug 2025",   emoji: "💌", title: "First time I said I love you",  note: "Masatu awak dok bebel pasal boss india kesayangan awak, lepastu saya cuba comfort awak dengan reply macam ni 'btw, walaupun masih terlalu awall, saja nak bagitauu, I LOVE YOUUU SO MUCH DEAR ❤, jangan bagi orang-orang gitu runtuhkan semangat dan jiwa awakk tauuu.'" },
    { date: "13 Sept 2025",  emoji: "🦒", title: "Our first date",                note: "first dateeeee kita pegii kenduri kawan saya (kononya datang jb sebab nak pi kenduri padahal nak jumpak awak hehehe), lepastu kita pii zooo cari kembar yang terpisah awak kat sana 🐒. Dan, time tu saya baru tahu, harap phone ja mahai skill ambik gambaq ZEROOOO!!!" },
    { date: "4 Jan 2026",    emoji: "💍", title: "Our E-Day",                     note: "Walaupun makanan yang awak order tak seperti dirancang (dan sorry menyusahkan family awak), tetapi hari indah tu berjalan lancar, saya harap pertunangan kita ni berkekalan hingga kahwinnnn!!!" },
    { date: "Today 🎉",      emoji: "🎂", title: "Today — and all the days ahead", note: "Happy birthday, my only love FADLIN. Saya harap perasaan cinta saya dan awak berkekalan selama lamanyaa" },
  ],
};
// ──────────────────────────────────────────────────────────────────────────

// Floating petals — fixed so they float over everything as you scroll
function Petals() {
  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${(i * 5.7 + 2) % 100}%`,
            top: `-40px`,
            fontSize: `${14 + (i % 4) * 4}px`,
            opacity: 0.35 + (i % 3) * 0.12,
            animation: `petalFall ${7 + (i % 5) * 1.5}s linear ${i * 0.7}s infinite`,
          }}
        >
          {i % 3 === 0 ? "✦" : i % 3 === 1 ? "🌸" : "✿"}
        </span>
      ))}
    </div>
  );
}

export default function BirthdayPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    setEntered(true);
    audioRef.current?.play().catch(() => {});
  };

  const togglePlay = () => {
    const v = videoRef.current;
    const a = audioRef.current;
    if (!v) return;
    if (v.paused) {
      a?.pause();
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      a?.play().catch(() => {});
      setPlaying(false);
    }
  };
  
  return (
    <div className="bd-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .bd-root {
          min-height: 100vh;
          background: linear-gradient(
            to bottom,
            #f5eeff 0%,
            #ecdeff 18%,
            #e0ccff 35%,
            #d3baff 50%,
            #c4a6f5 65%,
            #b490e8 78%,
            #a07cd8 90%,
            #8c68c8 100%
          );
          background-attachment: fixed;
          font-family: 'Lora', Georgia, serif;
          color: #2d1060;
          overflow-x: hidden;
          position: relative;
        }

        /* ── Splash ── */
        .splash {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 24px;
          background: linear-gradient(135deg, #2a0a4a, #1a0530);
          transition: opacity 0.8s ease, visibility 0.8s ease;
        }
        .splash.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
        .splash-emoji { font-size: 52px; animation: petalFall 0s; }
        .splash-title {
          font-family: 'DM Serif Display', serif; font-size: 28px;
          color: #e8d5ff; text-align: center; line-height: 1.3;
        }
        .splash-sub {
          font-size: 14px; color: #b090d8; font-style: italic; text-align: center;
        }
        .splash-btn {
          margin-top: 8px;
          padding: 14px 40px; border-radius: 50px;
          background: linear-gradient(135deg, #a060e0, #6820b0);
          color: white; font-size: 16px; font-family: 'Lora', serif;
          border: none; cursor: pointer;
          box-shadow: 0 4px 24px rgba(120,40,200,0.5);
          transition: transform 0.15s, box-shadow 0.15s;
          animation: pulse-ring 2s ease-in-out infinite;
        }
        .splash-btn:hover { transform: scale(1.05); }

        @keyframes petalFall {
          0%   { transform: translateY(0) rotate(0deg) scale(1); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.7; }
          100% { transform: translateY(110vh) rotate(360deg) scale(0.6); opacity: 0; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(120,60,200,0.5); }
          50%       { box-shadow: 0 0 0 14px rgba(120,60,200,0); }
        }

        .fade-up { animation: fadeUp 0.9s cubic-bezier(.22,.68,0,1.2) both; }
        .delay-1 { animation-delay: 0.15s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.45s; }
        .delay-4 { animation-delay: 0.6s; }

        .page-wrap {
          position: relative; z-index: 1;
          max-width: 700px; margin: 0 auto;
          padding: 60px 24px 80px;
          display: flex; flex-direction: column; gap: 52px;
        }

        /* ── Hero ── */
        .hero { text-align: center; }
        .hero-eyebrow {
          font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase;
          color: #7040a8; margin-bottom: 16px; font-family: 'Lora', serif; font-style: italic;
        }
        .hero-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(38px, 10vw, 68px); font-weight: 400;
          color: #5020a0; line-height: 1.08; margin-bottom: 20px;
        }
        .hero-title em { font-style: italic; color: #7840c0; }
        .hero-divider {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          margin: 20px auto; color: #9060c0; font-size: 18px;
        }
        .hero-divider::before, .hero-divider::after {
          content: ''; display: block; height: 1px; width: 60px;
          background: linear-gradient(90deg, transparent, #9060c0);
        }
        .hero-divider::after { background: linear-gradient(90deg, #9060c0, transparent); }
        .hero-message {
          font-size: 16px; line-height: 1.8; color: #4a2888; max-width: 500px; margin: 0 auto;
          font-style: italic;
        }

        /* ── Section headings ── */
        .section-title {
          font-family: 'DM Serif Display', serif; font-size: 22px; font-weight: 400;
          color: #5020a0; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;
        }
        .section-title::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(120,60,180,0.35), transparent);
        }

        /* ── Video ── */
        .video-wrap {
          position: relative; border-radius: 20px; overflow: hidden;
          background: #180830;
          box-shadow: 0 20px 60px rgba(100,40,180,0.22);
        }
        .video-wrap video { width: 100%; height: 100%; object-fit: cover; display: block; }
        .video-overlay {
          position: absolute; inset: 0; display: flex;
          align-items: center; justify-content: center;
          background: rgba(20,5,40,0.35);
          transition: opacity 0.3s;
        }
        .video-overlay.hidden { opacity: 0; pointer-events: none; }
        .play-btn {
          width: 72px; height: 72px; border-radius: 50%;
          background: rgba(255,255,255,0.94);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; border: none;
          animation: pulse-ring 2.2s ease-in-out infinite;
          transition: transform 0.15s;
        }
        .play-btn:hover { transform: scale(1.08); }
        .play-btn svg { margin-left: 4px; }
        .video-caption {
          margin-top: 14px; text-align: center; font-style: italic;
          font-size: 14px; color: #7040a0;
        }

        /* ── Gallery ── */
        .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .gallery-item {
          border-radius: 12px; overflow: hidden; aspect-ratio: 1;
          background: linear-gradient(135deg, #d8c0f8, #c4a8f0);
          cursor: pointer; position: relative;
          box-shadow: 0 4px 16px rgba(100,40,180,0.15);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .gallery-item:hover { transform: scale(1.04); box-shadow: 0 8px 28px rgba(100,40,180,0.28); }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .gallery-placeholder {
          width: 100%; height: 100%; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 6px; color: #7050a0; position: absolute; inset: 0;
        }
        .gallery-placeholder span { font-size: 22px; }
        .gallery-placeholder p { font-size: 11px; text-align: center; opacity: 0.7; }

        /* ── Lightbox ── */
        .lightbox {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(20,5,40,0.9); display: flex;
          align-items: center; justify-content: center; padding: 24px;
          animation: fadeUp 0.2s ease;
        }
        .lightbox img { max-width: 100%; max-height: 80vh; border-radius: 12px; }
        .lightbox-close {
          position: absolute; top: 20px; right: 24px;
          background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25);
          color: white; font-size: 22px; width: 40px; height: 40px;
          border-radius: 50%; cursor: pointer; display: flex;
          align-items: center; justify-content: center; transition: background 0.2s;
        }
        .lightbox-close:hover { background: rgba(255,255,255,0.22); }

        /* ── Timeline ── */
        .timeline { position: relative; padding-left: 32px; }
        .timeline::before {
          content: ''; position: absolute; left: 10px; top: 8px;
          bottom: 8px; width: 2px;
          background: linear-gradient(to bottom, #c4a6f5, #7030b0); border-radius: 2px;
        }
        .tl-item { position: relative; margin-bottom: 36px; }
        .tl-item:last-child { margin-bottom: 0; }
        .tl-dot {
          position: absolute; left: -37px; top: 2px;
          width: 24px; height: 24px; border-radius: 50%;
          background: rgba(255,255,255,0.7); border: 2px solid #a060e0;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; box-shadow: 0 2px 8px rgba(120,40,200,0.2);
        }
        .tl-item:last-child .tl-dot {
          background: linear-gradient(135deg, #c4a6f5, #8040c8); border-color: #7030b0;
        }
        .tl-date {
          font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
          color: #8050b8; margin-bottom: 4px; font-family: 'Lora', serif;
        }
        .tl-title {
          font-family: 'DM Serif Display', serif; font-size: 18px;
          color: #5020a0; margin-bottom: 4px; font-weight: 400;
        }
        .tl-note { font-size: 14px; line-height: 1.7; color: #4a2888; font-style: italic; }

        /* ── Footer ── */
        .footer { text-align: center; color: #7850a8; font-size: 13px; font-style: italic; }

        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <audio ref={audioRef} src="/birthday/music.mp3" loop preload="auto" />

      {/* ── Splash screen — tap to enter & start music ── */}
      <div className={`splash ${entered ? "hidden" : ""}`}>
        <div className="splash-emoji">🌸</div>
        <h1 className="splash-title">Ada sesuatu<br />untuk awak...</h1>
        <p className="splash-sub">Tap untuk buka hadiah awak 💜, my love</p>
        <button className="splash-btn" onClick={handleEnter}>
          Open 🎵
        </button>
      </div>

      <Petals />

      <main className="page-wrap">

        {/* ── Hero ── */}
        <section className="hero fade-up">
          <p className="hero-eyebrow">A birthday love letter</p>
          <h1 className="hero-title">
            Happy Birthday,<br /><em>{CONFIG.name}</em>
          </h1>
          <div className="hero-divider">🌸</div>
          <p className="hero-message">{CONFIG.message}</p>
        </section>

        {/* ── Guitar Video ── */}
        <section className="fade-up delay-1">
          <h2 className="section-title">🎸 A song for you</h2>
          <div className="video-wrap">
            <video
              ref={videoRef}
              poster={CONFIG.videoPoster}
              onEnded={() => { setPlaying(false); audioRef.current?.play().catch(() => {}); }}
              playsInline
              preload="metadata"
            >
              <source src={CONFIG.videoSrc} type="video/mp4" />
            </video>
            <div className={`video-overlay ${playing ? "hidden" : ""}`}>
              <button className="play-btn" onClick={togglePlay} aria-label="Play video">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <polygon points="9,5 23,14 9,23" fill="#7030b0" />
                </svg>
              </button>
            </div>
            {playing && (
              <button
                onClick={togglePlay}
                aria-label="Pause video"
                style={{
                  position: "absolute", bottom: 16, right: 16,
                  background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.2)",
                  color: "white", borderRadius: 8, padding: "6px 12px",
                  cursor: "pointer", fontSize: 12,
                }}
              >
                ⏸ Pause
              </button>
            )}
          </div>
          <p className="video-caption">Played with love, just for you ♪</p>
        </section>

        {/* ── Photo Gallery ── */}
        <section className="fade-up delay-2">
          <h2 className="section-title">📷 Our memories</h2>
          <div className="gallery-grid">
            {CONFIG.photos.map((src, i) => (
              <div key={i} className="gallery-item" onClick={() => setLightbox(src)}>
                <img
                  src={src}
                  alt={`Memory ${i + 1}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    const placeholder = (e.target as HTMLImageElement).parentElement!.querySelector<HTMLDivElement>(".gallery-placeholder");
                    if (placeholder) placeholder.style.display = "flex";
                  }}
                />
                <div className="gallery-placeholder" style={{ display: "none" }}>
                  <span>🌸</span>
                  <p>Add photo {i + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="fade-up delay-3">
          <h2 className="section-title">💜 Our story</h2>
          <div className="timeline">
            {CONFIG.timeline.map((item, i) => (
              <div key={i} className="tl-item">
                <div className="tl-dot">{item.emoji}</div>
                <p className="tl-date">{item.date}</p>
                <p className="tl-title">{item.title}</p>
                <p className="tl-note">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer fade-up delay-4">
          Made with love 🌸 — just for you
        </footer>

      </main>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox} alt="Memory" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
