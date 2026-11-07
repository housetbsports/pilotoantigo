"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { MarcaRede } from "@/components/blocos";
import { cn } from "@/lib/cn";
import { formatCompact } from "@/lib/format";
import { eu, nomeRede, type Rede } from "@/exemplo/dados";

type Contas = Partial<Record<Rede, { seguidores: number; engajamento: number; conectada: boolean }>>;

/**
 * Contas do Instagram e do TikTok em linhas discretas, como nos Ajustes do iPhone.
 * Conectada: ponto verde, números e um "Desconectar" pequeno em cinza.
 * Não conectada: um convite curto e um botão leve. Só visual: nenhum login de rede acontece.
 */
export function ConectarRedes({ inicial = {} }: { inicial?: Contas }) {
  const [conectadas, setConectadas] = useState<Record<Rede, boolean>>({
    instagram: Boolean(inicial.instagram?.conectada),
    tiktok: Boolean(inicial.tiktok?.conectada),
  });
  const exemplo: Record<Rede, { seguidores: number; engajamento: number }> = {
    instagram: { seguidores: inicial.instagram?.seguidores || 184_300, engajamento: inicial.instagram?.engajamento || 4.2 },
    tiktok: { seguidores: inicial.tiktok?.seguidores || 92_100, engajamento: inicial.tiktok?.engajamento || 7.8 },
  };

  return (
    <ul className="overflow-hidden rounded-card bg-elevated shadow-card">
      {(["instagram", "tiktok"] as const).map((rede) => {
        const on = conectadas[rede];
        return (
          <li key={rede} className="flex items-center gap-3 border-b border-separator px-4 py-3 last:border-b-0">
            <MarcaRede rede={rede} className={cn("size-9 text-[15px]", !on && "opacity-60")} />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="flex items-center gap-2 text-subheadline">
                {nomeRede[rede]}
                {on && <span className="size-1.5 rounded-full bg-live" title="Conectada" aria-label="Conectada" />}
              </span>
              <span className="truncate text-footnote text-label-secondary">
                {on
                  ? `${eu.arroba} · ${formatCompact(exemplo[rede].seguidores)} seguidores`
                  : "Conecte para a TB ler seus números sem print"}
              </span>
            </div>
            {on ? (
              <button
                type="button"
                onClick={() => setConectadas((c) => ({ ...c, [rede]: false }))}
                className="shrink-0 rounded-control px-2 py-1 text-footnote text-label-tertiary transition-colors hover:bg-fill-tertiary hover:text-label-secondary"
              >
                Desconectar
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setConectadas((c) => ({ ...c, [rede]: true }))}
                className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-control bg-fill-tertiary px-3 text-footnote font-medium text-label transition-colors hover:bg-fill-secondary"
              >
                <Plus size={14} strokeWidth={1.75} aria-hidden />
                Conectar
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
