"use client";

import { useRef, useState } from "react";
import { alpha, useScene } from "@/components/viz/use-scene";
import { formatCompact, formatInteger } from "@/lib/format";
import { bloco, chao, FONTE, tecla } from "@/components/viz/draw";

/**
 * Horas do dia em blocos 3D, da 0h às 23h: altura = seguidores online naquela hora (média da semana),
 * a hora de pico em laranja. Os pontos embaixo são os posts dos últimos 30 dias, na hora em que saíram.
 * Responde: estamos postando na hora em que o público está online?
 */
export function Horas3D({ online, postsPorHora }: { online: { hora: number; valor: number }[]; postsPorHora: number[] }) {
  const porHora = Array.from({ length: 24 }, (_, h) => online.find((o) => o.hora === h)?.valor ?? null);
  const max = Math.max(0, ...porHora.map((v) => v ?? 0));
  const pico = max > 0 ? porHora.indexOf(max) : -1;
  const [sel, setSel] = useState(pico >= 0 ? pico : 12);
  const geo = useRef({ x0: 0, slot: 1 });

  const ref = useScene(({ ctx, w, h, colors }) => {
    const padL = 4;
    const padR = 14;
    const topo = 26;
    const base = h - 34;
    const larg = w - padL - padR;
    const slot = larg / 24;
    const bw = Math.max(3, slot * 0.62);
    const d = Math.min(bw * 0.7, 10);
    geo.current = { x0: padL, slot };
    chao(ctx, padL - 2, padL + larg, base, d + 4, alpha(colors.faint, 0.12));
    porHora.forEach((v, i) => {
      const x = padL + slot * i + (slot - bw) / 2;
      if (v !== null) {
        const bh = max > 0 ? Math.max(2, (v / max) * (base - topo)) : 2;
        const cor = i === pico ? colors.accent : i === sel ? colors.ink : null;
        bloco(ctx, x, base, bw, bh, d, cor ? { frente: cor, lado: alpha(cor, 0.7), topo: alpha(cor, 0.42) } : { frente: alpha(colors.faint, 0.5), lado: alpha(colors.faint, 0.72), topo: alpha(colors.faint, 0.3) });
        if (i === pico) {
          ctx.fillStyle = colors.ink;
          ctx.font = `12px ${FONTE}`;
          ctx.textAlign = i > 20 ? "right" : "center";
          ctx.fillText(`pico ${i}h`, i > 20 ? x + bw + d * 0.6 : x + bw / 2 + d * 0.3, base - bh - d * 0.45 - 8);
        }
      }
      const q = postsPorHora[i] ?? 0;
      if (q) {
        ctx.fillStyle = colors.ink;
        ctx.beginPath();
        ctx.arc(x + bw / 2, base + 9, Math.min(4, 1.5 + q * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.fillStyle = colors.muted;
    ctx.font = `11px ${FONTE}`;
    for (const hh of [0, 6, 12, 18, 23]) {
      ctx.textAlign = hh === 0 ? "left" : hh === 23 ? "right" : "center";
      ctx.fillText(`${hh}h`, padL + slot * hh + (hh === 0 ? 0 : hh === 23 ? slot : slot / 2), h - 6);
    }
    ctx.textAlign = "start";
  });

  const escolher = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const i = Math.floor((e.clientX - r.left - geo.current.x0) / geo.current.slot);
    if (i >= 0 && i < 24) setSel(i);
  };

  const v = porHora[sel];
  const q = postsPorHora[sel] ?? 0;
  return (
    <div className="flex flex-col gap-2">
      <canvas
        ref={ref}
        tabIndex={0}
        role="img"
        aria-label={`Seguidores online por hora. Pico às ${pico}h com ${formatInteger(max)}. Use as setas para andar pelas horas.`}
        onPointerMove={escolher}
        onPointerDown={escolher}
        onKeyDown={(e) => {
          const i = tecla(e.key, sel, 24);
          if (i !== null) {
            e.preventDefault();
            setSel(i);
          }
        }}
        className="h-[220px] w-full touch-pan-y rounded-control"
      />
      <p className="min-h-5 text-footnote text-label-secondary tabular-nums" aria-live="polite">
        <span className="text-label">{sel}h</span> · {v === null ? "sem dado" : `${formatCompact(v)} seguidores online`} · {q ? `${q} ${q > 1 ? "posts saíram" : "post saiu"}` : "nenhum post saiu"} nessa hora em 30 dias
      </p>
    </div>
  );
}
