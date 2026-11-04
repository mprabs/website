import { useEffect, useRef } from "react";
import "./scene.css";

const MOTE_COUNT = 46;

function spawnMote(anywhere) {
  return {
    x: Math.random(),
    y: anywhere ? Math.random() : 1.04,
    r: 0.4 + Math.random() * 1.5,
    rise: 0.000012 + Math.random() * 0.00003,
    sway: Math.random() * Math.PI * 2,
    alpha: 0.2 + Math.random() * 0.55,
  };
}

// Dust drifting through the sunbeam. Brightest where the window light falls.
function useDust(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motes = Array.from({ length: MOTE_COUNT }, () => spawnMote(true));
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now) => {
      const dt = Math.min(now - last, 64);
      last = now;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#fffdf6";

      for (const mote of motes) {
        if (!still) {
          mote.y -= mote.rise * dt;
          mote.x += Math.sin(now / 2400 + mote.sway) * 0.00002 * dt;
          if (mote.y < -0.04) Object.assign(mote, spawnMote(false));
        }
        // The beam runs diagonally from the top-left window.
        const beam = Math.abs(mote.x - 0.15 - mote.y * 0.55);
        const light = Math.max(0, 1 - beam * 3.2);
        ctx.globalAlpha = mote.alpha * light * 0.9;
        ctx.beginPath();
        ctx.arc(mote.x * width, mote.y * height, mote.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!still) frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

export default function Scene({ pose }) {
  const canvasRef = useRef(null);
  useDust(canvasRef);

  return (
    <div className="scene" data-pose={pose} aria-hidden="true">
      <div className="scene__table" />
      <div className="scene__window">
        <span />
        <span />
        <span />
        <span />
      </div>
      <svg className="scene__plant" viewBox="0 0 300 300">
        <g fill="currentColor">
          <ellipse cx="70" cy="190" rx="16" ry="58" transform="rotate(-38 70 190)" />
          <ellipse cx="120" cy="150" rx="18" ry="66" transform="rotate(-12 120 150)" />
          <ellipse cx="175" cy="170" rx="15" ry="60" transform="rotate(24 175 170)" />
          <ellipse cx="215" cy="215" rx="14" ry="50" transform="rotate(52 215 215)" />
          <ellipse cx="100" cy="240" rx="12" ry="44" transform="rotate(-62 100 240)" />
          <path d="M140 300C138 250 132 200 120 150M140 300C150 260 165 215 175 170M140 300C120 270 95 230 70 190" stroke="currentColor" strokeWidth="5" fill="none" />
        </g>
      </svg>
      <canvas ref={canvasRef} className="scene__dust" />
      <div className="scene__vignette" />
      <div className="scene__grain" />
    </div>
  );
}
