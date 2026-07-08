"use client";

import { useEffect, useRef } from "react";

interface ParticleFieldProps {
  density?: number;
  color?: string;
  interactive?: boolean;
}

export default function ParticleField({
  density = 80,
  color = "139, 92, 246",
  interactive = true,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; baseAlpha: number }[] = [];

    const initParticles = () => {
      particles.length = 0;
      const count = Math.min(density, Math.floor((width * height) / 20000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          baseAlpha: Math.random() * 0.5 + 0.2,
        });
      }
    };

    initParticles();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) * window.devicePixelRatio,
        y: (e.clientY - rect.top) * window.devicePixelRatio,
      };
    };
    if (interactive) canvas.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      initParticles();
    };
    window.addEventListener("resize", onResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction
        if (interactive) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 * window.devicePixelRatio) {
            const force = (150 * window.devicePixelRatio - dist) / (150 * window.devicePixelRatio);
            p.x -= (dx / dist) * force * 2;
            p.y -= (dy / dist) * force * 2;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.baseAlpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 * window.devicePixelRatio) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${color}, ${0.1 * (1 - dist / (120 * window.devicePixelRatio))})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      if (interactive) canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, [density, color, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
