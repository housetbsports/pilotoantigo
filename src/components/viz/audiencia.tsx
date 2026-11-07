"use client";

import { useMemo } from "react";
import { Globe, type GlobeMarker } from "@/components/viz/globo";
import { Blocos3D } from "@/components/viz/blocos-3d";
import { Horas3D } from "@/components/viz/horas-3d";
import { Exemplo } from "@/components/ui/badge";
import { formatCompact } from "@/lib/format";
import type { Audiencia as Dados } from "@/exemplo/dados";

/**
 * Audiência do influenciador, como no perfil do atleta: globo com as cidades dos seguidores
 * (laranja, tamanho = quantos), a lista ao lado, idades em blocos 3D, gênero e as horas em que o público está online.
 */
export function Audiencia({ dados, titulo = "Audiência" }: { dados: Dados | null; titulo?: string }) {
  const cidades = useMemo(() => [...(dados?.cidades ?? [])].sort((a, b) => b.seguidores - a.seguidores), [dados]);
  const max = cidades[0]?.seguidores ?? 1;
  const markers = useMemo<GlobeMarker[]>(
    () =>
      cidades.map((c, i) => ({
        id: c.cidade,
        lat: c.lat,
        lng: c.lng,
        kind: "audiencia" as const,
        weight: Math.sqrt(c.seguidores / max),
        pulse: i < 3,
      })),
    [cidades, max],
  );
  const focus = cidades[0] ? { lat: cidades[0].lat, lng: cidades[0].lng } : undefined;

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-serif text-[28px] leading-tight">{titulo}</h2>
        <Exemplo />
      </div>

      {!dados ? (
        <p className="rounded-card bg-fill-tertiary px-4 py-6 text-center text-footnote text-label-secondary">Sem dado: conecte o Instagram ou o TikTok para ver de onde vem o seu público.</p>
      ) : (
        <>
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="mx-auto w-full max-w-[380px]">
              <Globe markers={markers} focus={focus} label="Globo com as cidades onde estão os seguidores" />
              <div className="flex justify-center pt-2 text-caption text-label-secondary">
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-accent" aria-hidden />
                  Seguidores · arraste para girar
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-subheadline font-medium">Onde estão os seguidores</h3>
              <ol className="flex flex-col gap-2.5">
                {cidades.map((c, i) => (
                  <li key={c.cidade} className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-2 text-footnote">
                      <span className="w-3 text-label-tertiary tabular-nums">{i + 1}</span>
                      <span className="flex-1 truncate">
                        {c.cidade} <span className="text-label-secondary">· {c.pais}</span>
                      </span>
                      <span className="text-label-secondary tabular-nums">{formatCompact(c.seguidores)}</span>
                    </div>
                    <div className="ml-5 h-1 rounded-full bg-fill-tertiary">
                      <div className={i === 0 ? "h-full rounded-full bg-accent" : "h-full rounded-full bg-series-3"} style={{ width: `${(c.seguidores / max) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div className="flex flex-col gap-3">
              <h3 className="text-subheadline font-medium">Idade</h3>
              <Blocos3D
                altura={220}
                resumo={`Idade do público. A maior faixa é ${[...dados.idades].sort((a, b) => b.parte - a.parte)[0].faixa} anos.`}
                itens={dados.idades.map((x) => ({ rotulo: x.faixa, valor: x.parte, frase: `${x.parte}% do público tem ${x.faixa} anos` }))}
              />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-subheadline font-medium">Gênero</h3>
              <Genero mulheres={dados.mulheres} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <h3 className="text-subheadline font-medium">Quando o público está online</h3>
              <p className="text-footnote text-label-secondary">Os pontos embaixo são os seus posts dos últimos 30 dias, na hora em que saíram.</p>
            </div>
            <Horas3D online={dados.online.map((valor, hora) => ({ hora, valor }))} postsPorHora={dados.postsPorHora} />
          </div>
        </>
      )}
    </section>
  );
}

/** Duas placas em perspectiva, uma por gênero, com a maior em laranja. */
function Genero({ mulheres }: { mulheres: number }) {
  const homens = 100 - mulheres;
  const partes = [
    { rotulo: "Mulheres", valor: mulheres },
    { rotulo: "Homens", valor: homens },
  ];
  return (
    <div className="flex flex-col gap-6 pt-2">
      <div className="flex h-36 items-end justify-center gap-6 [perspective:600px]">
        {partes.map((p) => {
          const maior = p.valor >= 50;
          return (
            <div key={p.rotulo} className="flex flex-col items-center gap-2">
              <span className="text-title-3 tabular-nums">{p.valor}%</span>
              <div
                className={maior ? "w-14 rounded-[3px] border border-accent bg-accent" : "w-14 rounded-[3px] border border-label-tertiary bg-fill-secondary"}
                style={{ height: `${Math.max(8, p.valor * 0.9)}px`, transform: "rotateX(28deg) rotateY(-18deg)", boxShadow: maior ? "6px -6px 0 0 color-mix(in srgb, var(--accent) 45%, transparent)" : "6px -6px 0 0 var(--fill)" }}
                aria-hidden
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-6 text-footnote text-label-secondary">
        {partes.map((p) => (
          <span key={p.rotulo}>{p.rotulo}</span>
        ))}
      </div>
    </div>
  );
}
