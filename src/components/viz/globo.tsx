"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import land from "@/lib/globe-points.json";

export interface GlobeMarker {
  id: string;
  lat: number;
  lng: number;
  /** "audiencia": ponto laranja (tamanho = peso). "materia": anel escuro. */
  kind: "audiencia" | "materia";
  /** 0 a 1, usado no tamanho dos pontos de audiência. */
  weight?: number;
  /** Pulsa (os maiores públicos). */
  pulse?: boolean;
}

const points = land as [number, number][];
const RAD = Math.PI / 180;
const TILT = -18 * RAD;

/**
 * Globo pontilhado em canvas, projeção ortográfica.
 * Gira devagar, pausa com o mouse em cima e pode ser arrastado. Com redução de movimento, fica parado.
 */
export function Globe({
  markers,
  focus,
  className,
  label,
}: {
  markers: GlobeMarker[];
  /** Longitude inicial voltada para a frente. */
  focus?: { lat: number; lng: number };
  className?: string;
  label: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rotation = -(focus?.lng ?? -40);
    let hovering = false;
    let dragging: { x: number; rot: number } | null = null;
    let raf = 0;
    let size = 0;
    let colors = readColors();
    const start = performance.now();

    /** Tokens usam light-dark(); o canvas só entende cor resolvida, então lemos via um elemento. */
    function readColors() {
      const probe = document.createElement("span");
      probe.style.display = "none";
      canvas!.parentElement!.appendChild(probe);
      const resolve = (token: string, fallback: string) => {
        probe.style.color = `var(${token}, ${fallback})`;
        return getComputedStyle(probe).color || fallback;
      };
      const colors = {
        land: resolve("--gray-2", "#aeaeb2"),
        sphere: resolve("--fill-tertiary", "rgba(118,118,128,.08)"),
        accent: resolve("--accent", "#ff5722"),
        ink: resolve("--label", "#1d1d1f"),
        surface: resolve("--bg-elevated", "#ffffff"),
      };
      probe.remove();
      return colors;
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = rect.width;
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.width * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function project(lat: number, lng: number) {
      const phi = lat * RAD;
      const lambda = (lng + rotation) * RAD;
      const x = Math.cos(phi) * Math.sin(lambda);
      const y0 = Math.sin(phi);
      const z0 = Math.cos(phi) * Math.cos(lambda);
      const y = y0 * Math.cos(TILT) - z0 * Math.sin(TILT);
      const z = y0 * Math.sin(TILT) + z0 * Math.cos(TILT);
      return { x, y, z };
    }

    function draw(t: number) {
      // Antes do layout (ou escondido) o canvas ainda não tem tamanho.
      if (size < 24) return;
      const r = size / 2 - 6;
      const c = size / 2;
      ctx!.clearRect(0, 0, size, size);

      ctx!.beginPath();
      ctx!.arc(c, c, r, 0, Math.PI * 2);
      ctx!.fillStyle = colors.sphere;
      ctx!.fill();

      ctx!.fillStyle = colors.land;
      for (const [lat, lng] of points) {
        const p = project(lat, lng);
        if (p.z <= 0) continue;
        ctx!.globalAlpha = 0.25 + p.z * 0.65;
        const s = 0.6 + p.z * 0.9;
        ctx!.fillRect(c + p.x * r - s / 2, c - p.y * r - s / 2, s, s);
      }
      ctx!.globalAlpha = 1;

      for (const m of markers) {
        const p = project(m.lat, m.lng);
        if (p.z <= 0.05) continue;
        const x = c + p.x * r;
        const y = c - p.y * r;
        const fade = Math.min(1, p.z * 2.2);
        if (m.kind === "audiencia") {
          const rad = 2.5 + (m.weight ?? 0.3) * 7;
          if (m.pulse && !reduce) {
            const phase = ((t - start) / 2200 + (m.weight ?? 0)) % 1;
            ctx!.beginPath();
            ctx!.arc(x, y, rad + phase * 14, 0, Math.PI * 2);
            ctx!.strokeStyle = colors.accent;
            ctx!.globalAlpha = (1 - phase) * 0.5 * fade;
            ctx!.lineWidth = 1.5;
            ctx!.stroke();
          }
          ctx!.globalAlpha = 0.18 * fade;
          ctx!.beginPath();
          ctx!.arc(x, y, rad * 1.9, 0, Math.PI * 2);
          ctx!.fillStyle = colors.accent;
          ctx!.fill();
          ctx!.globalAlpha = fade;
          ctx!.beginPath();
          ctx!.arc(x, y, rad, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.lineWidth = 1.5;
          ctx!.strokeStyle = colors.surface;
          ctx!.stroke();
        } else {
          ctx!.globalAlpha = fade;
          ctx!.beginPath();
          ctx!.arc(x, y, 4.5, 0, Math.PI * 2);
          ctx!.fillStyle = colors.surface;
          ctx!.fill();
          ctx!.lineWidth = 2;
          ctx!.strokeStyle = colors.ink;
          ctx!.stroke();
        }
        ctx!.globalAlpha = 1;
      }
    }

    function frame(t: number) {
      if (!reduce && !hovering && !dragging) rotation += 0.06;
      draw(t);
      raf = requestAnimationFrame(frame);
    }

    const onEnter = () => (hovering = true);
    const onLeave = () => {
      hovering = false;
      dragging = null;
    };
    const onDown = (e: PointerEvent) => {
      dragging = { x: e.clientX, rot: rotation };
      canvas!.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      rotation = dragging.rot + ((e.clientX - dragging.x) / size) * 180;
      if (reduce) draw(performance.now());
    };
    const onUp = () => (dragging = null);

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      colors = readColors();
      draw(performance.now());
    };
    scheme.addEventListener("change", onScheme);
    canvas.addEventListener("pointerenter", onEnter);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);

    if (reduce) draw(performance.now());
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      scheme.removeEventListener("change", onScheme);
      canvas.removeEventListener("pointerenter", onEnter);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
    };
  }, [markers, focus, reduce]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      className={`aspect-square w-full cursor-grab touch-pan-y active:cursor-grabbing ${className ?? ""}`}
    />
  );
}
