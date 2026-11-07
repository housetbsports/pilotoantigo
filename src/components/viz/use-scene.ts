"use client";

import { useEffect, useRef } from "react";

export interface Palette {
  ink: string;
  muted: string;
  faint: string;
  line: string;
  accent: string;
  surface: string;
}

export interface Frame {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  /** Segundos desde o início (parado quando a pessoa prefere menos movimento). */
  t: number;
  colors: Palette;
  pointer: { x: number; y: number; down: boolean; dx: number } | null;
}

/**
 * Cena em canvas para os visuais 3D: ajusta à tela retina, segue o tema claro/escuro,
 * anima devagar e para quando a pessoa prefere menos movimento ou a cena sai da tela.
 */
export function useScene(draw: (f: Frame) => void) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);
  useEffect(() => {
    drawRef.current = draw;
  });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const readColors = (): Palette => {
      const probe = document.createElement("span");
      probe.style.display = "none";
      canvas.parentElement!.appendChild(probe);
      const resolve = (token: string, fallback: string) => {
        probe.style.color = `var(${token}, ${fallback})`;
        return getComputedStyle(probe).color || fallback;
      };
      const c = {
        ink: resolve("--label", "#161615"),
        muted: resolve("--label-secondary", "#5f5c58"),
        faint: resolve("--label-tertiary", "#a8a5a1"),
        line: resolve("--separator-strong", "#e6e3df"),
        accent: resolve("--accent", "#ff5722"),
        surface: resolve("--bg-elevated", "#ffffff"),
      };
      probe.remove();
      return c;
    };
    let colors = readColors();
    const scheme = matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => (colors = readColors());
    scheme.addEventListener("change", onScheme);
    // Troca de tema pela plataforma (botão de sol/lua): o atributo data-theme muda no <html>.
    const themeObs = new MutationObserver(onScheme);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    let w = 0;
    let h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let pointer: Frame["pointer"] = null;
    let lastX = 0;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      pointer = { x, y: e.clientY - r.top, down: pointer?.down ?? false, dx: pointer?.down ? x - lastX : 0 };
      lastX = x;
    };
    const onDown = (e: PointerEvent) => {
      onMove(e);
      pointer = { ...pointer!, down: true, dx: 0 };
      canvas.setPointerCapture(e.pointerId);
    };
    const onUp = () => pointer && (pointer = { ...pointer, down: false, dx: 0 });
    const onLeave = () => (pointer = null);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || w < 24 || h < 24) return;
      ctx.clearRect(0, 0, w, h);
      drawRef.current({ ctx, w, h, t: reduce ? 0 : (now - start) / 1000, colors, pointer });
      if (pointer) pointer.dx = 0;
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      scheme.removeEventListener("change", onScheme);
      themeObs.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return ref;
}

/** Cor com transparência a partir de "rgb(r, g, b)". */
export function alpha(color: string, a: number) {
  const m = color.match(/\d+(\.\d+)?/g);
  if (!m) return color;
  return `rgba(${m[0]}, ${m[1]}, ${m[2]}, ${a})`;
}
