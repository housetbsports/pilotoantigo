import { Page } from "@/components/page";
import { Titulo } from "@/components/blocos";
import { ListaBriefings } from "@/components/briefing/lista-briefings";
import { briefingsDe, eu } from "@/exemplo/dados";

export default function BriefingsPage() {
  return (
    <Page>
      <Titulo eyebrow="Briefings" title="Seus trabalhos" subtitle="Cada briefing diz o que a marca quer, o que entregar e até quando." />
      <ListaBriefings briefings={briefingsDe(eu.slug)} base="/painel/briefings" />
    </Page>
  );
}
