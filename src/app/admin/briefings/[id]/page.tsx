import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Page } from "@/components/page";
import { Secao } from "@/components/blocos";
import { Exemplo } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BriefingView } from "@/components/briefing/briefing-view";
import { briefingPorId, briefings, influenciadorPorSlug } from "@/exemplo/dados";

export function generateStaticParams() {
  return briefings.map((b) => ({ id: b.id }));
}

export default async function AdminBriefingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const b = briefingPorId(id);
  if (!b) notFound();
  return (
    <Page>
      <div className="flex items-center justify-between">
        <Link href="/admin/briefings" className="flex items-center gap-1 text-subheadline text-label-secondary hover:text-label">
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden /> Briefings
        </Link>
        <Exemplo />
      </div>
      <BriefingView b={b} />
      <Secao title="Para quem foi" description="Quem aceitou e quem já mandou o conteúdo.">
        <ul className="flex flex-col">
          {b.influenciadores.map((slug, n) => {
            const i = influenciadorPorSlug(slug);
            if (!i) return null;
            // Exemplo: o primeiro segue a situação do briefing, os outros ainda não responderam.
            const status = n === 0 ? (b.situacao === "novo" ? "Ainda não respondeu" : b.situacao === "producao" ? "Aceitou, produzindo" : b.situacao === "revisao" ? "Mandou o conteúdo" : "Aprovado") : "Ainda não respondeu";
            return (
              <li key={slug} className="flex items-center gap-3 border-b border-separator py-3 last:border-b-0">
                <Avatar name={i.nome} size="md" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <Link href={`/admin/influenciadores/${i.slug}`} className="text-subheadline hover:text-accent">
                    {i.nome}
                  </Link>
                  <span className="text-footnote text-label-secondary">{status}</span>
                </div>
                {status === "Mandou o conteúdo" && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary">Pedir ajuste</Button>
                    <Button size="sm" variant="primary">Aprovar</Button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Secao>
    </Page>
  );
}
