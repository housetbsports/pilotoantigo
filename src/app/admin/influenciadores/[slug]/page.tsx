import { notFound } from "next/navigation";
import { Lock } from "lucide-react";
import { Page } from "@/components/page";
import { LinhaBriefing, Progresso, SeloCadastro, Secao } from "@/components/blocos";
import { Exemplo } from "@/components/ui/badge";
import { MetricasRedes } from "@/components/perfil/metricas-redes";
import { ResumoVendas, TabelaVendas } from "@/components/vendas/vendas";
import { assuntos, respostasExemplo } from "@/lib/perfil-campos";
import { initials } from "@/lib/format";
import { Audiencia } from "@/components/viz/audiencia";
import { audienciaDeSlug, briefingsDe, eu, influenciadorPorSlug, influenciadores, vendasDe } from "@/exemplo/dados";

export function generateStaticParams() {
  return influenciadores.map((i) => ({ slug: i.slug }));
}

/** O influenciador visto pela equipe TB: cabeçalho como o do atleta, e tudo o que ele preencheu. */
export default async function InfluenciadorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = influenciadorPorSlug(slug);
  if (!i) notFound();
  const respostas = i.slug === eu.slug ? respostasExemplo : {};
  const seus = briefingsDe(i.slug);
  const vendas = vendasDe(i.slug);

  return (
    <Page className="gap-10 md:gap-14">
      <header className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-end sm:gap-6">
        <div className="relative flex aspect-[4/5] w-20 shrink-0 items-center justify-center overflow-hidden rounded-card bg-fill-secondary md:w-24">
          <span className="font-serif text-[28px] text-label-tertiary" aria-hidden>
            {initials(i.nome)}
          </span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <p className="eyebrow">{i.nicho}</p>
            <SeloCadastro situacao={i.situacao} />
            <Exemplo />
          </div>
          <h1 className="font-serif text-[44px] leading-[1.02] tracking-[-0.02em] md:text-[64px]">{i.nome}</h1>
          <p className="text-callout text-label-secondary">{[i.arroba, i.cidade].join(" · ")}</p>
          <div className="flex max-w-sm items-center gap-3">
            <Progresso valor={i.preenchido} />
            <span className="shrink-0 text-caption text-label-secondary tabular-nums">{i.preenchido}% preenchido</span>
          </div>
        </div>
      </header>

      <Audiencia dados={audienciaDeSlug(i.slug)} />

      <Secao title="Redes sociais">
        <MetricasRedes influenciador={i} />
      </Secao>

      <Secao title="O que preencheu" description="Os campos com cadeado só a equipe TB vê.">
        <div className="flex flex-col gap-8">
          {assuntos.map((a) => (
            <div key={a.chave} className="flex flex-col gap-3">
              <h3 className="eyebrow">{a.titulo}</h3>
              <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {a.campos.map((c) => {
                  const v = respostas[c.chave];
                  const texto = Array.isArray(v) ? v.join(", ") : v;
                  return (
                    <div key={c.chave} className="flex flex-col gap-0.5">
                      <dt className="flex items-center gap-1.5 text-caption text-label-secondary">
                        {c.rotulo}
                        {c.sensivel && <Lock size={11} strokeWidth={1.5} aria-label="Só a equipe TB vê" />}
                      </dt>
                      <dd className={texto ? "text-subheadline" : "text-subheadline text-label-tertiary"}>{texto || "sem dado"}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          ))}
        </div>
      </Secao>

      <Secao title="Briefings">
        {seus.length ? (
          <div className="flex flex-col">
            {seus.map((b) => (
              <LinhaBriefing key={b.id} b={b} href={`/admin/briefings/${b.id}`} />
            ))}
          </div>
        ) : (
          <p className="text-footnote text-label-tertiary">Nenhum briefing ainda.</p>
        )}
      </Secao>

      <Secao title="Vendas">
        {vendas.length ? (
          <div className="flex flex-col gap-6">
            <ResumoVendas vendas={vendas} />
            <TabelaVendas vendas={vendas} />
          </div>
        ) : (
          <p className="text-footnote text-label-tertiary">Sem dado.</p>
        )}
      </Secao>
    </Page>
  );
}
