import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { Page } from "@/components/page";
import { LinhaBriefing, Numeros, Progresso, SeloCadastro, Secao, Titulo } from "@/components/blocos";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { briefings, influenciadores, vendas } from "@/exemplo/dados";
import { formatMoney } from "@/lib/format";

export default function AdminInicio() {
  const pendentes = influenciadores.filter((i) => i.situacao !== "completo");
  const abertos = briefings.filter((b) => b.situacao !== "aprovado");
  const vendido = vendas.reduce((s, v) => s + v.valor, 0);

  return (
    <Page>
      <Titulo
        eyebrow="Equipe TB"
        title="Influenciadores"
        subtitle="Quem está cadastrado, o que está em produção e quanto os cupons venderam."
        actions={
          <Button variant="primary" icon={Plus} href="/admin/briefings/novo">
            Novo briefing
          </Button>
        }
      />
      <Numeros
        itens={[
          { label: "Influenciadores", value: String(influenciadores.length), note: `${pendentes.length} com cadastro incompleto` },
          { label: "Briefings em aberto", value: String(abertos.length), note: `${briefings.filter((b) => b.situacao === "revisao").length} para revisar` },
          { label: "Vendido com cupom", value: formatMoney(vendido), note: "Últimos 30 dias" },
          { label: "Redes conectadas", value: String(influenciadores.reduce((n, i) => n + Object.values(i.redes).filter((r) => r?.conectada).length, 0)), note: "Instagram e TikTok" },
        ]}
      />

      <Secao title="Cadastros para acompanhar" description="Quem ainda não terminou de preencher.">
        <ul className="flex flex-col">
          {pendentes.map((i) => (
            <li key={i.slug}>
              <Link href={`/admin/influenciadores/${i.slug}`} className="flex items-center gap-4 border-b border-separator py-3 last:border-b-0 hover:bg-fill-tertiary md:px-2">
                <Avatar name={i.nome} size="md" />
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <span className="flex flex-wrap items-center gap-2 text-subheadline">
                    {i.nome} <SeloCadastro situacao={i.situacao} />
                  </span>
                  <Progresso valor={i.preenchido} className="max-w-xs" />
                </div>
                <span className="text-footnote text-label-secondary tabular-nums">{i.preenchido}%</span>
              </Link>
            </li>
          ))}
        </ul>
      </Secao>

      <Secao
        title="Briefings em aberto"
        action={
          <Link href="/admin/briefings" className="flex shrink-0 items-center gap-1 text-subheadline text-accent hover:opacity-80">
            Ver todos <ArrowRight size={16} strokeWidth={1.5} aria-hidden />
          </Link>
        }
      >
        <div className="flex flex-col">
          {abertos.map((b) => (
            <LinhaBriefing key={b.id} b={b} href={`/admin/briefings/${b.id}`} />
          ))}
        </div>
      </Secao>
    </Page>
  );
}
