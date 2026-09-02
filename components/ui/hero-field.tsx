"use client";

import { useEffect, useRef } from "react";

export function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let running = true;

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      r: 0.6 + Math.random() * 1.6,
    }));

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = parent.clientWidth * dpr;
      canvas!.height = parent.clientHeight * dpr;
      canvas!.style.width = `${parent.clientWidth}px`;
      canvas!.style.height = `${parent.clientHeight}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      if (!running || !ctx || !canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      frame += 0.004;

      ctx.strokeStyle = "rgba(196,164,106,0.08)";
      ctx.lineWidth = 1;
      const vanishX = w * 0.5;
      const vanishY = h * 0.22;
      for (let i = 0; i < 16; i++) {
        const t = i / 15;
        const y = h * 0.38 + t * h * 0.62;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
        const x = vanishX + (t - 0.5) * w * 1.4;
        ctx.beginPath();
        ctx.moveTo(vanishX, vanishY);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (const p of particles) {
        const depth = 0.25 + p.z * 0.75;
        const x = p.x * w + Math.sin(frame + p.y * 8) * 12;
        const y = p.y * h + Math.cos(frame * 0.8 + p.x * 6) * 10;
        ctx.beginPath();
        ctx.fillStyle = `rgba(232,213,163,${0.15 + depth * 0.55})`;
        ctx.arc(x, y, p.r * depth * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      running = false;
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
