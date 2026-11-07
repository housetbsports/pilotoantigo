import { Page } from "@/components/page";
import { Secao, Titulo } from "@/components/blocos";
import { ContasPopover } from "@/components/perfil/contas-popover";
import { MetricasRedes } from "@/components/perfil/metricas-redes";
import { Audiencia } from "@/components/viz/audiencia";
import { audienciaDeSlug, eu } from "@/exemplo/dados";

export default function RedesPage() {
  return (
    <Page>
      <Titulo
        eyebrow="Redes sociais"
        title="Suas métricas"
        subtitle="Os números chegam sozinhos das redes conectadas, sem print."
        actions={<ContasPopover contas={eu.redes} />}
      />
      <Secao title="Desempenho" description="Últimas 8 semanas.">
        <MetricasRedes />
      </Secao>
      <Audiencia dados={audienciaDeSlug(eu.slug)} />
    </Page>
  );
}
