import { Page } from "@/components/page";
import { Titulo } from "@/components/blocos";
import { NovoBriefing } from "./novo-briefing";

export default function NovoBriefingPage() {
  return (
    <Page>
      <Titulo eyebrow="Briefings" title="Novo briefing" subtitle="O que a marca quer, o que entregar, até quando e para quem vai." />
      <NovoBriefing />
    </Page>
  );
}
