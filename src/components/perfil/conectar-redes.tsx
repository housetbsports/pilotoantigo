"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { MarcaRede } from "@/components/blocos";
import { cn } from "@/lib/cn";
import { formatCompact } from "@/lib/format";
import { nomeRede, type Rede } from "@/exemplo/dados";

/**
 * Botões de conectar Instagram e TikTok. Só visual: nenhum login de rede acontece.
 * Ao "conectar", o cartão mostra o que a conexão traria (seguidores e engajamento de exemplo).
 */
export function ConectarRedes({ inicial = {} }: { inicial?: Partial<Record<Rede, { seguidores: number; engajamento: number; conectada: boolean }>> }) {
  const [conectadas, setConectadas] = useState<Record<Rede, boolean>>({
    instagram: Boolean(inicial.instagram?.conectada),
    tiktok: Boolean(inicial.tiktok?.conectada),
  });
  const exemplo: Record<Rede, { seguidores: number; engajamento: number }> = {
    instagram: { seguidores: inicial.instagram?.seguidores || 184_300, engajamento: inicial.instagram?.engajamento || 4.2 },
    tiktok: { seguidores: inicial.tiktok?.seguidores || 92_100, engajamento: inicial.tiktok?.engajamento || 7.8 },
  };

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {(["instagram", "tiktok"] as const).map((rede) => {
        const on = conectadas[rede];
        return (
          <li key={rede} className="flex flex-col gap-4 rounded-card bg-elevated p-5 shadow-card">
            <div className="flex items-center gap-3">
              <MarcaRede rede={rede} />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-headline">{nomeRede[rede]}</span>
                <span className={cn("flex items-center gap-1.5 text-footnote", on ? "text-live" : "text-label-secondary")}>
                  {on && <span className="size-1.5 rounded-full bg-live" aria-hidden />}
                  {on ? "Conectada" : "Não conectada"}
                </span>
              </div>
            </div>
            {on ? (
              <dl className="grid grid-cols-2 gap-3">
                <div>
                  <dt className="text-caption text-label-secondary">Seguidores</dt>
                  <dd className="text-title-3 tabular-nums">{formatCompact(exemplo[rede].seguidores)}</dd>
                </div>
                <div>
                  <dt className="text-caption text-label-secondary">Engajamento</dt>
                  <dd className="text-title-3 tabular-nums">{exemplo[rede].engajamento.toLocaleString("pt-BR")}%</dd>
                </div>
              </dl>
            ) : (
              <p className="text-footnote text-label-secondary">
                Ao conectar, a TB passa a ler seguidores, alcance e engajamento dos seus posts. Você pode desconectar quando quiser.
              </p>
            )}
            <button
              type="button"
              onClick={() => setConectadas((c) => ({ ...c, [rede]: !c[rede] }))}
              className={cn(
                "inline-flex h-10 items-center justify-center gap-2 rounded-control px-4 text-subheadline font-medium",
                on ? "bg-fill-secondary text-label hover:bg-fill" : "bg-label text-bg hover:opacity-85",
              )}
            >
              {on ? <Check size={16} strokeWidth={1.5} aria-hidden /> : <Link2 size={16} strokeWidth={1.5} aria-hidden />}
              {on ? "Desconectar" : `Conectar ${nomeRede[rede]}`}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
