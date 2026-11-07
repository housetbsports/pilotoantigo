/** Peças de desenho dos gráficos 3D da conta da TB (mesma projeção dos blocos de src/components/viz/network-presence.tsx). */

export const FONTE = "-apple-system, BlinkMacSystemFont, Helvetica, sans-serif";

/** Profundidade oblíqua: o fundo do bloco vai para cima e para a direita. */
export const OBL = { x: 0.6, y: 0.45 };

/**
 * Bloco (prisma) com a base em (x, base): frente, lado e topo.
 * `topo` mais claro que a frente e `lado` mais escuro dão o volume sem brilho nem degradê.
 */
export function bloco(
  ctx: CanvasRenderingContext2D,
  x: number,
  base: number,
  w: number,
  h: number,
  d: number,
  cor: { frente: string; lado: string; topo: string },
) {
  const dx = d * OBL.x;
  const dy = d * OBL.y;
  const y = base - h;
  ctx.fillStyle = cor.lado;
  ctx.beginPath();
  ctx.moveTo(x + w, base);
  ctx.lineTo(x + w + dx, base - dy);
  ctx.lineTo(x + w + dx, y - dy);
  ctx.lineTo(x + w, y);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = cor.topo;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w + dx, y - dy);
  ctx.lineTo(x + dx, y - dy);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = cor.frente;
  ctx.fillRect(x, y, w, h);
}

/** Contorno do bloco selecionado (só a silhueta). */
export function contorno(ctx: CanvasRenderingContext2D, x: number, base: number, w: number, h: number, d: number, cor: string) {
  const dx = d * OBL.x;
  const dy = d * OBL.y;
  const y = base - h;
  ctx.strokeStyle = cor;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x, base);
  ctx.lineTo(x, y);
  ctx.lineTo(x + dx, y - dy);
  ctx.lineTo(x + w + dx, y - dy);
  ctx.lineTo(x + w + dx, base - dy);
  ctx.lineTo(x + w, base);
  ctx.closePath();
  ctx.stroke();
}

/** Chão em perspectiva: uma faixa fina embaixo dos blocos. */
export function chao(ctx: CanvasRenderingContext2D, x0: number, x1: number, base: number, d: number, cor: string) {
  ctx.fillStyle = cor;
  ctx.beginPath();
  ctx.moveTo(x0, base);
  ctx.lineTo(x1, base);
  ctx.lineTo(x1 + d * OBL.x, base - d * OBL.y);
  ctx.lineTo(x0 + d * OBL.x, base - d * OBL.y);
  ctx.closePath();
  ctx.fill();
}

/** Teclas para andar pelos itens de um gráfico (setas, Home, End). Devolve o novo índice ou null. */
export function tecla(key: string, atual: number, n: number): number | null {
  if (!n) return null;
  if (key === "ArrowRight" || key === "ArrowUp") return Math.min(n - 1, atual + 1);
  if (key === "ArrowLeft" || key === "ArrowDown") return Math.max(0, atual - 1);
  if (key === "Home") return 0;
  if (key === "End") return n - 1;
  return null;
}
