import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Page } from "@/components/page";
import { LinhaBriefing, Numeros, Progresso, Secao, Titulo } from "@/components/blocos";
import { briefingsDe, eu, vendasDe } from "@/exemplo/dados";
import { formatCompact, formatMoney } from "@/lib/format";

export default function PainelInicio() {
  const meus = briefingsDe(eu.slug);
  const abertos = meus.filter((b) => b.situacao !== "aprovado");
  const vendas = vendasDe(eu.slug);
  const comissao = vendas.reduce((s, v) => s + v.comissao, 0);
  const seguidores = (eu.redes.instagram?.seguidores ?? 0) + (eu.redes.tiktok?.seguidores ?? 0);

  return (
    <Page>
      <Titulo eyebrow="Início" title={`Olá, ${eu.nome.split(" ")[0]}`} subtitle="O que chegou para você e como estão suas redes." />

      <Numeros
        itens={[
          { label: "Briefings em aberto", value: String(abertos.length), note: `${meus.filter((b) => b.situacao === "novo").length} novo` },
          { label: "Seguidores", value: formatCompact(seguidores), note: "Instagram + TikTok" },
          { label: "Engajamento no Instagram", value: `${eu.redes.instagram?.engajamento.toLocaleString("pt-BR")}%`, note: "Por post" },
          { label: "Comissão de vendas", value: formatMoney(comissao), note: "Últimos 30 dias" },
        ]}
      />

      {eu.preenchido < 100 && (
        <Link href="/painel/perfil" className="flex flex-col gap-3 rounded-card bg-elevated p-5 shadow-card hover:bg-fill-tertiary">
          <span className="text-headline">Complete seu perfil</span>
          <Progresso valor={eu.preenchido} />
          <span className="text-footnote text-label-secondary">{eu.preenchido}% preenchido. Perfil completo recebe mais briefings.</span>
        </Link>
      )}

      <Secao
        title="Briefings"
        description="O que as marcas pediram para você."
        action={
          <Link href="/painel/briefings" className="flex shrink-0 items-center gap-1 text-subheadline text-accent hover:opacity-80">
            Ver todos <ArrowRight size={16} strokeWidth={1.5} aria-hidden />
          </Link>
        }
      >
        <div className="flex flex-col">
          {abertos.map((b) => (
            <LinhaBriefing key={b.id} b={b} href={`/painel/briefings/${b.id}`} />
          ))}
        </div>
      </Secao>
    </Page>
  );
}
