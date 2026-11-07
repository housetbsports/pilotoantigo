"use client";

import { useRef, useState } from "react";
import { alpha, useScene } from "@/components/viz/use-scene";
import { bloco, chao, contorno, FONTE, tecla } from "@/components/viz/draw";
import { cn } from "@/lib/cn";

export interface Item {
  /** Nome curto embaixo do bloco. */
  rotulo: string;
  valor: number;
  /** Parte do valor pintada mais escura na base do bloco (ex.: vídeos assistidos pela IA). */
  parte?: number;
  /** Frase que aparece embaixo quando o item é escolhido. */
  frase: string;
}

/** Quebra o rótulo em até duas linhas que cabem na largura; o resto vira reticências. */
function linhas(ctx: CanvasRenderingContext2D, texto: string, larg: number) {
  const cabe = (t: string) => ctx.measureText(t).width <= larg;
  const corta = (t: string) => {
    if (cabe(t)) return t;
    let s = t;
    while (s.length > 1 && !cabe(`${s}…`)) s = s.slice(0, -1);
    return `${s}…`;
  };
  const palavras = texto.split(/\s+/);
  let primeira = "";
  let i = 0;
  while (i < palavras.length && cabe(primeira ? `${primeira} ${palavras[i]}` : palavras[i])) {
    primeira = primeira ? `${primeira} ${palavras[i]}` : palavras[i];
    i++;
  }
  if (!primeira) return [corta(texto)];
  const resto = palavras.slice(i).join(" ");
  return resto ? [primeira, corta(resto)] : [primeira];
}

/**
 * Blocos em perspectiva, um por item: altura = valor; a parte opcional fica mais forte na base.
 * Cinzas para os dados, laranja só no maior. Mouse, toque e setas do teclado escolhem o item,
 * e a frase embaixo (aria-live) diz o valor.
 */
export function Blocos3D({
  itens,
  resumo,
  legenda,
  altura = 240,
  rotulos = "todos",
  inicial,
}: {
  itens: Item[];
  /** Resumo do gráfico para quem usa leitor de tela. */
  resumo: string;
  /** Legenda das cores, quando há parte escura. */
  legenda?: { total: string; parte: string };
  altura?: number;
  /** "todos": rótulo embaixo de cada bloco; "pontas": só o primeiro, o maior e o último (séries longas). */
  rotulos?: "todos" | "pontas";
  inicial?: number;
}) {
  const n = itens.length;
  const max = Math.max(0, ...itens.map((x) => x.valor));
  const iMax = max > 0 ? itens.findIndex((x) => x.valor === max) : -1;
  const [sel, setSel] = useState(inicial ?? (iMax >= 0 ? iMax : 0));
  const atual = Math.min(Math.max(0, sel), n - 1);
  const geo = useRef({ x0: 0, slot: 1 });
  const temParte = itens.some((x) => x.parte !== undefined);

  const ref = useScene(({ ctx, w, h, colors }) => {
    const padL = 6;
    const padR = 16;
    const topo = 26;
    const rodape = rotulos === "todos" ? 34 : 22;
    const base = h - rodape;
    const larg = w - padL - padR;
    const slot = larg / Math.max(1, n);
    const bw = Math.max(3, Math.min(slot * 0.62, 72));
    const d = Math.min(bw * 0.7, 16);
    const maxH = base - topo - d * 0.45 - 16;
    geo.current = { x0: padL, slot };

    chao(ctx, padL - 2, padL + larg, base, d + 4, alpha(colors.faint, 0.12));

    itens.forEach((it, i) => {
      const x = padL + slot * i + (slot - bw) / 2;
      const quente = i === iMax;
      const escolhido = i === atual;
      if (it.valor <= 0) {
        // Zero de verdade: só o traço no chão.
        ctx.strokeStyle = alpha(colors.faint, escolhido ? 1 : 0.6);
        ctx.setLineDash([2, 2]);
        ctx.strokeRect(x, base - 3, bw, 3);
        ctx.setLineDash([]);
      } else {
        const bh = Math.max(3, (it.valor / max) * maxH);
        if (temParte) {
          // Bloco claro = total; a parte escura vem por cima, a partir do chão.
          const total = quente ? alpha(colors.accent, 0.4) : escolhido ? alpha(colors.ink, 0.28) : alpha(colors.faint, 0.42);
          bloco(ctx, x, base, bw, bh, d, { frente: total, lado: alpha(colors.faint, 0.6), topo: alpha(colors.faint, 0.26) });
        } else {
          const cor = quente ? colors.accent : escolhido ? colors.ink : alpha(colors.faint, 0.5);
          bloco(ctx, x, base, bw, bh, d, { frente: cor, lado: quente || escolhido ? alpha(cor, 0.7) : alpha(colors.faint, 0.72), topo: quente || escolhido ? alpha(cor, 0.42) : alpha(colors.faint, 0.3) });
        }
        if (it.parte && it.parte > 0) {
          const ph = Math.max(2, (Math.min(it.parte, it.valor) / max) * maxH);
          const cheia = quente ? colors.accent : escolhido ? colors.ink : colors.muted;
          // A parte escura ocupa a frente e o lado até a altura dela; o topo só aparece quando enche o bloco.
          bloco(ctx, x, base, bw, ph, d, { frente: cheia, lado: alpha(cheia, 0.72), topo: ph >= bh - 0.5 ? alpha(cheia, 0.45) : alpha(cheia, 0.72) });
        }
        if (escolhido) contorno(ctx, x - 2, base + 2, bw + 4, bh + 4, d, quente ? colors.ink : colors.accent);
        // Valor em cima do bloco quando há espaço, e sempre no maior e no escolhido.
        if (slot >= 26 || quente || escolhido) {
          ctx.fillStyle = quente || escolhido ? colors.ink : colors.muted;
          ctx.font = `12px ${FONTE}`;
          ctx.textAlign = "center";
          ctx.fillText(it.valor.toLocaleString("pt-BR"), x + bw / 2 + d * 0.3, base - bh - d * 0.45 - 7);
        }
      }
    });

    ctx.font = `11px ${FONTE}`;
    ctx.textBaseline = "alphabetic";
    if (rotulos === "todos") {
      itens.forEach((it, i) => {
        const cx = padL + slot * i + slot / 2;
        ctx.fillStyle = i === atual ? colors.ink : colors.muted;
        ctx.textAlign = "center";
        linhas(ctx, it.rotulo, slot - 4).forEach((l, k) => ctx.fillText(l, cx, base + 14 + k * 13));
      });
    } else {
      const marcas = new Set([0, n - 1, ...(iMax >= 0 ? [iMax] : []), atual]);
      // Evita rótulos colados: some com o que fica perto demais de outro já escrito.
      const usados: number[] = [];
      for (const i of [atual, iMax, 0, n - 1].filter((i) => i >= 0 && marcas.has(i))) {
        const cx = padL + slot * i + slot / 2;
        if (usados.some((u) => Math.abs(u - cx) < 34)) continue;
        usados.push(cx);
        ctx.fillStyle = i === atual ? colors.ink : colors.muted;
        ctx.textAlign = i === 0 ? "left" : i === n - 1 ? "right" : "center";
        const x = i === 0 ? padL + (slot - bw) / 2 : i === n - 1 ? padL + slot * i + slot - (slot - bw) / 2 : cx;
        ctx.fillText(itens[i].rotulo, x, h - 6);
      }
    }
    ctx.textAlign = "start";
  });

  if (!n) return null;

  const escolher = (clientX: number, el: HTMLCanvasElement) => {
    const r = el.getBoundingClientRect();
    const i = Math.floor((clientX - r.left - geo.current.x0) / geo.current.slot);
    if (i >= 0 && i < n) setSel(i);
  };

  return (
    <div className="flex flex-col gap-2">
      <canvas
        ref={ref}
        tabIndex={0}
        role="img"
        aria-label={`${resumo} Use as setas para andar pelos itens.`}
        onPointerMove={(e) => escolher(e.clientX, e.currentTarget)}
        onPointerDown={(e) => escolher(e.clientX, e.currentTarget)}
        onKeyDown={(e) => {
          const i = tecla(e.key, atual, n);
          if (i !== null) {
            e.preventDefault();
            setSel(i);
          }
        }}
        className="w-full touch-pan-y rounded-control"
        style={{ height: altura }}
      />
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
        <p className="min-h-5 text-footnote text-label-secondary tabular-nums" aria-live="polite">
          {itens[atual].frase}
        </p>
        {legenda && temParte && (
          <ul className="ml-auto flex gap-4 text-caption text-label-tertiary" aria-hidden>
            <li className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-[2px] bg-label-secondary" />
              {legenda.parte}
            </li>
            <li className="flex items-center gap-1.5">
              <span className={cn("size-2.5 rounded-[2px] bg-label-tertiary opacity-50")} />
              {legenda.total}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
