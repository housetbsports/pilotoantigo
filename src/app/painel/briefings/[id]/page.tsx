import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Page } from "@/components/page";
import { Exemplo } from "@/components/ui/badge";
import { BriefingView } from "@/components/briefing/briefing-view";
import { EnviarConteudo } from "@/components/briefing/enviar-conteudo";
import { briefingPorId, briefingsDe, eu } from "@/exemplo/dados";

export function generateStaticParams() {
  return briefingsDe(eu.slug).map((b) => ({ id: b.id }));
}

export default async function BriefingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const b = briefingPorId(id);
  if (!b || !b.influenciadores.includes(eu.slug)) notFound();
  return (
    <Page>
      <div className="flex items-center justify-between">
        <Link href="/painel/briefings" className="flex items-center gap-1 text-subheadline text-label-secondary hover:text-label">
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden /> Briefings
        </Link>
        <Exemplo />
      </div>
      <BriefingView b={b} />
      <EnviarConteudo situacao={b.situacao} />
    </Page>
  );
}
