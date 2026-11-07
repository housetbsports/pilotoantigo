import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Objetos 3D da TB: feitos em CSS, com filete e faces claras/escuras, sem brilho nem degradê.
 * Só onde simbolizam algo: o cubo é o assistente ou uma pesquisa trabalhando; a pilha são camadas que se somam.
 * O movimento é lento e para com "reduzir movimento" (classes .tb-gira e .tb-respira em globals.css).
 */

const FACES = ["rotateY(0deg)", "rotateY(90deg)", "rotateY(180deg)", "rotateY(-90deg)", "rotateX(90deg)", "rotateX(-90deg)"];

/** Cubo que gira devagar. `destaque` pinta de laranja TB; `rapido` acelera (está rodando agora). */
export function Cubo3D({
  icone: Icone,
  letra,
  tamanho = 28,
  destaque = false,
  vivo = true,
  rapido = false,
  className,
}: {
  icone?: LucideIcon;
  letra?: string;
  tamanho?: number;
  destaque?: boolean;
  vivo?: boolean;
  rapido?: boolean;
  className?: string;
}) {
  const meio = tamanho / 2;
  return (
    <span className={cn("relative inline-block shrink-0", className)} style={{ width: tamanho, height: tamanho, perspective: tamanho * 5 }} aria-hidden>
      <span className={cn("absolute inset-0 [transform-style:preserve-3d]", vivo ? "tb-gira" : "[transform:rotateX(-24deg)_rotateY(30deg)]", rapido && "tb-rapido")}>
        {FACES.map((f, i) => (
          <span
            key={f}
            className={cn(
              "absolute inset-0 flex items-center justify-center border",
              destaque ? "border-accent bg-accent text-on-accent" : i % 2 ? "border-label bg-elevated text-label" : "border-label bg-label text-bg",
            )}
            style={{ transform: `${f} translateZ(${meio}px)` }}
          >
            {letra ? <span className="font-mono text-[10px] leading-none">{letra}</span> : Icone ? <Icone size={Math.round(tamanho * 0.5)} strokeWidth={1.5} /> : null}
          </span>
        ))}
      </span>
    </span>
  );
}

/**
 * Pilha de placas vistas de cima em perspectiva: cada placa é uma camada (uma fonte, uma etapa, uma rede).
 * Ligada: a de cima escura; desligada: tudo cinza. `respira` faz as placas subirem e descerem de leve.
 * Dentro de um elemento com `group`, as placas se afastam ao passar o mouse.
 */
export function Pilha3D({ camadas, ligada = true, respira = false, tamanho = 56 }: { camadas: number; ligada?: boolean; respira?: boolean; tamanho?: number }) {
  const n = Math.max(1, Math.min(6, camadas));
  const margem = Math.round(tamanho * 0.16);
  return (
    <div className="relative shrink-0 [perspective:420px]" style={{ width: tamanho, height: tamanho }} aria-hidden>
      <div
        className={cn(
          "absolute inset-0 [transform-style:preserve-3d] [transform:rotateX(58deg)_rotateZ(-42deg)] [--vao:4px] group-hover:[--vao:8px] motion-reduce:group-hover:[--vao:4px]",
          respira && "tb-respira",
        )}
      >
        {Array.from({ length: n }, (_, i) => (
          <span
            key={i}
            className={cn(
              "absolute rounded-[3px] border transition-transform duration-500 ease-out",
              ligada ? (i === n - 1 ? "border-label bg-label" : "border-label-tertiary bg-elevated") : "border-label-tertiary bg-fill-secondary",
            )}
            style={{ inset: margem, transform: `translateZ(calc(${i} * var(--vao)))`, ["--i" as string]: i }}
          />
        ))}
      </div>
    </div>
  );
}
