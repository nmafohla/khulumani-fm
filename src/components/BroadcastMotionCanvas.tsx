"use client";

import { useEffect, useRef } from "react";

interface BroadcastMotionCanvasProps {
  isPlaying: boolean;
}

/**
 * Renders the Khulumani FM logo's signature Bulawayo Skyline silhouette,
 * curved horizon arc, and reactive Kelly-Green (#119E45) + Crisp White (#FFFFFF)
 * FM carrier wave ribbons at 60fps.
 */
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

    // Exact Khulumani FM Logo palette: Kelly Green (#119E45) & Pure White (#FFFFFF)
    const ribbons = [
      {
        color: "rgba(17, 158, 69, 0.58)",
        glow: "rgba(17, 158, 69, 0.8)",
        amplitude: 26,
        frequency: 0.0065,
        speed: 0.028,
        verticalOffset: 0.54,
      },
      {
        color: "rgba(255, 255, 255, 0.42)",
        glow: "rgba(255, 255, 255, 0.65)",
        amplitude: 20,
        frequency: 0.008,
        speed: -0.022,
        verticalOffset: 0.58,
      },
      {
        color: "rgba(34, 197, 94, 0.36)",
        glow: "rgba(17, 158, 69, 0.55)",
        amplitude: 34,
        frequency: 0.005,
        speed: 0.034,
        verticalOffset: 0.48,
      },
    ];

    // Normalized Bulawayo skyline profile matching logo.png (including the tall tower at ~0.64)
    const skylineBlocks = [
      { x: 0.18, w: 0.04, h: 0.11 },
      { x: 0.23, w: 0.05, h: 0.07 },
      { x: 0.29, w: 0.06, h: 0.09 },
      { x: 0.36, w: 0.04, h: 0.12 },
      { x: 0.41, w: 0.05, h: 0.08 },
      { x: 0.47, w: 0.07, h: 0.13 },
      { x: 0.55, w: 0.06, h: 0.09 },
      { x: 0.62, w: 0.055, h: 0.29 }, // Iconic tall Bulawayo tower from logo.png
      { x: 0.69, w: 0.09, h: 0.11 },
      { x: 0.79, w: 0.07, h: 0.08 },
    ];

    const renderFrame = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : 800;
      const height = parent ? parent.clientHeight : 420;

      ctx.clearRect(0, 0, width, height);

      // Subtle Khulumani Kelly-Green studio aura
      const aura = ctx.createRadialGradient(
        width * 0.64,
        height * 0.42,
        12,
        width * 0.64,
        height * 0.42,
        width * 0.55
      );
      aura.addColorStop(
        0,
        isPlaying ? "rgba(17, 158, 69, 0.28)" : "rgba(17, 158, 69, 0.14)"
      );
      aura.addColorStop(
        0.55,
        isPlaying ? "rgba(255, 255, 255, 0.08)" : "rgba(17, 158, 69, 0.05)"
      );
      aura.addColorStop(1, "rgba(10, 15, 12, 0)");
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle Bulawayo Skyline silhouette on the horizon (matching logo.png)
      const horizonY = height * 0.78;
      ctx.save();
      ctx.fillStyle = "rgba(10, 14, 11, 0.55)";
      ctx.strokeStyle = "rgba(17, 158, 69, 0.32)";
      ctx.lineWidth = 1.2;
      for (const b of skylineBlocks) {
        const bx = b.x * width;
        const bw = b.w * width;
        const bh = b.h * height;
        const by = horizonY - bh;
        ctx.fillRect(bx, by, bw, bh);
        ctx.strokeRect(bx, by, bw, bh);
      }

      // Sweeping logo horizon arc underneath skyline
      ctx.beginPath();
      ctx.moveTo(width * 0.05, horizonY + 18);
      ctx.quadraticCurveTo(
        width * 0.5,
        horizonY - 14,
        width * 0.95,
        horizonY + 18
      );
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      const energyMultiplier = isPlaying ? 1.55 : 0.65;

      // Render volumetric Khulumani Green & White FM sine-wave ribbons
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
