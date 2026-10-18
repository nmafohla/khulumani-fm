"use client";

import { useEffect, useRef } from "react";

interface BroadcastMotionCanvasProps {
  isPlaying: boolean;
}

export function BroadcastMotionCanvas({
  isPlaying,
}: BroadcastMotionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId = 0;
    let phase = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const ribbons = [
      {
        color: "rgba(28, 159, 86, 0.42)",
        glow: "rgba(16, 185, 129, 0.6)",
        amplitude: 28,
        frequency: 0.0065,
        speed: 0.028,
        verticalOffset: 0.52,
      },
      {
        color: "rgba(20, 184, 166, 0.34)",
        glow: "rgba(45, 212, 191, 0.5)",
        amplitude: 36,
        frequency: 0.005,
        speed: -0.021,
        verticalOffset: 0.58,
      },
      {
        color: "rgba(245, 158, 11, 0.32)",
        glow: "rgba(251, 191, 36, 0.55)",
        amplitude: 22,
        frequency: 0.0085,
        speed: 0.036,
        verticalOffset: 0.46,
      },
    ];

    const orbs = Array.from({ length: 14 }, (_, idx) => ({
      xRatio: (idx * 0.073 + 0.05) % 1,
      yRatio: (idx * 0.13 + 0.15) % 0.8,
      radius: 1.8 + (idx % 4) * 1.1,
      speedY: 0.15 + (idx % 3) * 0.1,
      hue: idx % 3 === 0 ? "#34d399" : idx % 3 === 1 ? "#fbbf24" : "#2dd4bf",
    }));

    const renderFrame = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : 800;
      const height = parent ? parent.clientHeight : 420;

      ctx.clearRect(0, 0, width, height);

      // Subtle radial studio aura
      const aura = ctx.createRadialGradient(
        width * 0.72,
        height * 0.45,
        10,
        width * 0.72,
        height * 0.45,
        width * 0.55
      );
      aura.addColorStop(
        0,
        isPlaying ? "rgba(16, 185, 129, 0.24)" : "rgba(16, 185, 129, 0.12)"
      );
      aura.addColorStop(
        0.5,
        isPlaying ? "rgba(245, 158, 11, 0.12)" : "rgba(20, 184, 166, 0.06)"
      );
      aura.addColorStop(1, "rgba(6, 16, 12, 0)");
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, width, height);

      const energyMultiplier = isPlaying ? 1.55 : 0.65;

      // Render volumetric FM sine-wave ribbons
      for (const ribbon of ribbons) {
        ctx.save();
        ctx.beginPath();
        const baseY = height * ribbon.verticalOffset;
        for (let x = 0; x <= width; x += 6) {
          const wave1 =
            Math.sin(x * ribbon.frequency + phase * (ribbon.speed * 45)) *
            ribbon.amplitude *
            energyMultiplier;
          const wave2 =
            Math.cos(
              x * (ribbon.frequency * 1.7) - phase * (ribbon.speed * 28)
            ) *
            (ribbon.amplitude * 0.45) *
            energyMultiplier;
          const y = baseY + wave1 + wave2;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = ribbon.color;
        ctx.lineWidth = isPlaying ? 3.2 : 2;
        ctx.shadowColor = ribbon.glow;
        ctx.shadowBlur = isPlaying ? 16 : 8;
        ctx.stroke();
        ctx.restore();
      }

      // Render floating acoustic studio nodes
      for (const orb of orbs) {
        const x = orb.xRatio * width + Math.sin(phase * 0.5 + orb.radius) * 14;
        const y =
          (((orb.yRatio * height - phase * orb.speedY * 18) % height) +
            height) %
          height;
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, orb.radius * (isPlaying ? 1.25 : 0.9), 0, Math.PI * 2);
        ctx.fillStyle = orb.hue;
        ctx.globalAlpha = isPlaying ? 0.55 : 0.25;
        ctx.fill();
        ctx.restore();
      }

      if (!prefersReducedMotion) {
        phase += isPlaying ? 0.045 : 0.014;
        animationFrameId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
