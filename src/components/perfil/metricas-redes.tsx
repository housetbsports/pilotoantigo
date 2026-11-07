"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Numeros } from "@/components/blocos";
import { Blocos3D } from "@/components/viz/blocos-3d";
import { crescimento, eu, nomeRede, posts, type Rede } from "@/exemplo/dados";
import { formatCompact, formatShortDate } from "@/lib/format";
import { instant, spring } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** Abas por rede, como no perfil do atleta: números do topo, crescimento e posts. */
export function MetricasRedes({ influenciador = eu }: { influenciador?: typeof eu }) {
  const reduce = useReducedMotion();
  const [rede, setRede] = useState<Rede>("instagram");
  const conta = influenciador.redes[rede];
  // Os posts e o crescimento de exemplo são só da influenciadora "logada".
  const meus = influenciador.slug === eu.slug;
  const lista = meus ? posts.filter((p) => p.rede === rede) : [];
  const alcance = lista.reduce((s, p) => s + p.alcance, 0);
  const curtidas = lista.reduce((s, p) => s + p.curtidas, 0);
  const comentarios = lista.reduce((s, p) => s + p.comentarios, 0);
  const serie = meus ? crescimento[rede] : [conta?.seguidores ?? 0, conta?.seguidores ?? 0];

  return (
    <div className="flex flex-col gap-5">
      <div role="tablist" aria-label="Rede social" className="flex gap-6 overflow-x-auto border-b border-separator [scrollbar-width:none]">
        {(["instagram", "tiktok"] as const).map((r) => {
          const active = r === rede;
          return (
            <button
              key={r}
              role="tab"
              aria-selected={active}
              onClick={() => setRede(r)}
              className={cn("relative flex h-11 shrink-0 items-center gap-2 text-subheadline transition-colors", active ? "text-label" : "text-label-secondary hover:text-label")}
            >
              <span className={cn(active && "font-medium")}>{nomeRede[r]}</span>
              <span className="text-label-tertiary tabular-nums">{influenciador.redes[r]?.conectada ? formatCompact(influenciador.redes[r]!.seguidores) : "—"}</span>
              {active && <motion.span layoutId="rede-aba" transition={reduce ? instant : spring.snappy} className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-accent" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={rede}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={reduce ? instant : spring.gentle}
          className="flex flex-col gap-8"
        >
          {!conta?.conectada ? (
            <p className="rounded-card bg-fill-tertiary px-4 py-6 text-center text-footnote text-label-secondary">Sem dado: {nomeRede[rede]} ainda não conectado.</p>
          ) : (
            <>
              <Numeros
                itens={[
                  { label: "Seguidores", value: formatCompact(conta.seguidores), note: `+${formatCompact(serie[serie.length - 1] - serie[0])} em 8 semanas` },
                  { label: "Alcance", value: formatCompact(alcance), note: `${lista.length} posts` },
                  { label: "Curtidas", value: formatCompact(curtidas), note: `${formatCompact(comentarios)} comentários` },
                  { label: "Engajamento", value: `${conta.engajamento.toLocaleString("pt-BR")}%`, note: "Por post" },
                ]}
              />
              {meus && (
                <div className="grid gap-10 md:grid-cols-2">
                  <div className="flex flex-col gap-3">
                    <span className="text-subheadline font-medium">Novos seguidores por semana</span>
                    <Blocos3D
                      key={`s-${rede}`}
                      altura={220}
                      resumo="Novos seguidores em cada uma das últimas 7 semanas."
                      itens={serie.slice(1).map((v, i) => ({
                        rotulo: i === serie.length - 2 ? "esta" : `-${serie.length - 2 - i}`,
                        valor: v - serie[i],
                        frase: `${formatCompact(v - serie[i])} novos seguidores ${i === serie.length - 2 ? "nesta semana" : `há ${serie.length - 2 - i} semana${serie.length - 2 - i > 1 ? "s" : ""}`}`,
                      }))}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="text-subheadline font-medium">Alcance por post</span>
                    <Blocos3D
                      key={`p-${rede}`}
                      altura={220}
                      resumo="Alcance de cada post recente."
                      itens={[...lista].reverse().map((p) => ({
                        rotulo: formatShortDate(p.data),
                        valor: p.alcance,
                        frase: `${p.formato} de ${formatShortDate(p.data)}: ${formatCompact(p.alcance)} de alcance · “${p.legenda}”`,
                      }))}
                    />
                  </div>
                </div>
              )}
              <ul className="flex flex-col">
                {lista.map((p) => (
                  <li key={p.id} className="flex items-center gap-4 border-b border-separator py-3 last:border-b-0">
                    <span className="flex aspect-[4/5] w-12 shrink-0 items-center justify-center overflow-hidden rounded-control bg-fill-secondary text-[10px] text-label-tertiary">{p.formato}</span>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="truncate text-subheadline">{p.legenda}</span>
                      <span className="text-footnote text-label-secondary">{formatShortDate(p.data)}</span>
                    </div>
                    <dl className="hidden gap-6 text-right sm:flex">
                      <div>
                        <dt className="text-caption text-label-tertiary">Alcance</dt>
                        <dd className="text-subheadline tabular-nums">{formatCompact(p.alcance)}</dd>
                      </div>
                      <div>
                        <dt className="text-caption text-label-tertiary">Curtidas</dt>
                        <dd className="text-subheadline tabular-nums">{formatCompact(p.curtidas)}</dd>
                      </div>
                      <div>
                        <dt className="text-caption text-label-tertiary">Coment.</dt>
                        <dd className="text-subheadline tabular-nums">{formatCompact(p.comentarios)}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
