import { Page } from "@/components/page";
import { Secao, Titulo } from "@/components/blocos";
import { ConectarRedes } from "@/components/perfil/conectar-redes";
import { MetricasRedes } from "@/components/perfil/metricas-redes";
import { eu } from "@/exemplo/dados";

export default function RedesPage() {
  return (
    <Page>
      <Titulo eyebrow="Redes sociais" title="Suas métricas" subtitle="Conecte o Instagram e o TikTok: os números chegam sozinhos, sem print." />
      <Secao title="Contas conectadas">
        <ConectarRedes inicial={eu.redes} />
      </Secao>
      <Secao title="Desempenho" description="Últimas 8 semanas.">
        <MetricasRedes />
      </Secao>
    </Page>
  );
}
