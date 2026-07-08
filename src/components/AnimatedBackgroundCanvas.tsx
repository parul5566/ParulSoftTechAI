"use client";

import { useEffect, useRef } from "react";

/**
 * AnimatedBackgroundCanvas
 * A GPU-accelerated, fully cross-platform animated background.
 * Draws flowing gradient waves, floating particles, and aurora-like effects
 * that simulate a dynamic "video" background without any video file download.
 * Works on all devices including low-end mobile.
 */
export default function AnimatedBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // ---- Wave layers ----
    const waves = [
      { amp: 30, freq: 0.008, speed: 0.015, offset: 0, color: "139, 92, 246", opacity: 0.06, yPct: 0.3 },
      { amp: 40, freq: 0.006, speed: 0.012, offset: 2, color: "6, 182, 212", opacity: 0.05, yPct: 0.5 },
      { amp: 50, freq: 0.005, speed: 0.010, offset: 4, color: "236, 72, 153", opacity: 0.04, yPct: 0.7 },
    ];

    // ---- Floating orbs ----
    const orbs: { x: number; y: number; r: number; vx: number; vy: number; color: string; phase: number }[] = [];
    const orbCount = window.innerWidth < 768 ? 4 : 8;
    const colors = ["139, 92, 246", "6, 182, 212", "236, 72, 153", "59, 130, 246"];
    for (let i = 0; i < orbCount; i++) {
      orbs.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 180 + 120,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: colors[i % colors.length],
        phase: Math.random() * Math.PI * 2,
      });
    }

    // ---- Particle stars ----
    const stars: { x: number; y: number; size: number; twinkle: number }[] = [];
    const starCount = window.innerWidth < 768 ? 40 : 100;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.5 + 0.3,
        twinkle: Math.random() * Math.PI * 2,
      });
    }

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw orbs (large blurred gradient circles)
      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -orb.r) orb.x = w + orb.r;
        if (orb.x > w + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = h + orb.r;
        if (orb.y > h + orb.r) orb.y = -orb.r;

        const pulse = 0.7 + Math.sin(t * 0.01 + orb.phase) * 0.3;
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, `rgba(${orb.color}, ${0.12 * pulse})`);
        grad.addColorStop(0.5, `rgba(${orb.color}, ${0.04 * pulse})`);
        grad.addColorStop(1, `rgba(${orb.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(orb.x - orb.r, orb.y - orb.r, orb.r * 2, orb.r * 2);
      }

      // Draw stars
      for (const star of stars) {
        star.twinkle += 0.03;
        const alpha = 0.3 + Math.sin(star.twinkle) * 0.3;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      // Draw waves
      for (const wave of waves) {
        ctx.beginPath();
        const baseY = h * wave.yPct;
        ctx.moveTo(0, baseY);
        for (let x = 0; x <= w; x += 4) {
          const y =
            baseY +
            Math.sin(x * wave.freq + t * wave.speed + wave.offset) * wave.amp +
            Math.sin(x * wave.freq * 2.3 + t * wave.speed * 1.5) * (wave.amp * 0.3);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fillStyle = `rgba(${wave.color}, ${wave.opacity})`;
        ctx.fill();
      }

      t += 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    if (!reduced) {
      draw();
    } else {
      // Draw a single static frame
      t = 0;
      draw();
      cancelAnimationFrame(rafRef.current);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
