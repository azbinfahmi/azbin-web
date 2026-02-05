"use client";

import { useEffect, useRef } from "react";

export default function TeamChant() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioCtx = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const sourceNode = useRef<MediaElementAudioSourceNode | null>(null);
  const dataArray = useRef<Uint8Array<ArrayBuffer> | null>(null);


  const rafId = useRef<number | null>(null);
  const glowActive = useRef(false);

  const glowTop = useRef<HTMLDivElement | null>(null);
  const glowLeft = useRef<HTMLDivElement | null>(null);
  const glowRight = useRef<HTMLDivElement | null>(null);

  function initAudio() {
    if (!audioRef.current || audioCtx.current) return;

    audioCtx.current = new AudioContext();
    analyser.current = audioCtx.current.createAnalyser();
    analyser.current.fftSize = 1024;

    sourceNode.current = audioCtx.current.createMediaElementSource(
      audioRef.current
    );

    sourceNode.current.connect(analyser.current);
    analyser.current.connect(audioCtx.current.destination);

    const buffer = new ArrayBuffer(analyser.current.frequencyBinCount);
    dataArray.current = new Uint8Array(buffer);

    audioRef.current.addEventListener("ended", stopGlow);
  }

  function getEnergy() {
    if (!analyser.current || !dataArray.current) return 0;

    analyser.current.getByteFrequencyData(dataArray.current);
    const bassBins = Math.floor(dataArray.current.length * 0.1);

    let sum = 0;
    for (let i = 0; i < bassBins; i++) sum += dataArray.current[i];

    return (sum / bassBins) / 255;
  }

  function glowLoop() {
    if (!glowActive.current) return;

    const energy = getEnergy();
    const floor = 0.1;
    const norm = Math.max(0, energy - floor) / (1 - floor);

    const alpha = 0.12 + norm * 0.6;
    const spread = 18 + norm * 65;

    if (glowTop.current && glowLeft.current && glowRight.current) {
      glowTop.current.style.opacity = String(alpha);
      glowLeft.current.style.opacity = String(alpha);
      glowRight.current.style.opacity = String(alpha);

      glowTop.current.style.background = `
        linear-gradient(to bottom,
          rgba(124,58,237,${alpha}),
          rgba(124,58,237,0) ${spread}%
        )`;

      glowLeft.current.style.background = `
        linear-gradient(to right,
          rgba(124,58,237,${alpha}),
          rgba(124,58,237,0) ${spread}%
        )`;

      glowRight.current.style.background = `
        linear-gradient(to left,
          rgba(124,58,237,${alpha}),
          rgba(124,58,237,0) ${spread}%
        )`;
    }

    rafId.current = requestAnimationFrame(glowLoop);
  }

  function startGlow() {
    if (!audioRef.current) return;

    initAudio();

    if (audioCtx.current?.state === "suspended") {
      audioCtx.current.resume();
    }

    glowActive.current = true;

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});

    if (!rafId.current) {
      rafId.current = requestAnimationFrame(glowLoop);
    }
  }

  function stopGlow() {
    glowActive.current = false;

    [glowTop.current, glowLeft.current, glowRight.current].forEach((el) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.background = "none";
    });

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }

  useEffect(() => {
    return () => {
      stopGlow();
      audioCtx.current?.close();
    };
  }, []);

  return (
    <>
      {/* Beat Glow */}
      <div id="beatGlow" aria-hidden>
        <div ref={glowTop} className="glow glow-top" />
        <div ref={glowLeft} className="glow glow-left" />
        <div ref={glowRight} className="glow glow-right" />
      </div>

      <button className="btn primary" onClick={startGlow}>
        📣 Play Team Chant
      </button>

      <audio
        ref={audioRef}
        src="/futsal/audio/chanting.mp3"
        preload="auto"
        crossOrigin="anonymous"
      />
    </>
  );
}
