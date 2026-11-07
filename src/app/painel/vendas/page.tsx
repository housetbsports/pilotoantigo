import { Page } from "@/components/page";
import { Secao, Titulo } from "@/components/blocos";
import { AvisoConexao, ResumoVendas, TabelaVendas } from "@/components/vendas/vendas";
import { eu, vendasDe } from "@/exemplo/dados";

export default function VendasPage() {
  const vendas = vendasDe(eu.slug);
  return (
    <Page>
      <Titulo eyebrow="Vendas" title="O que seu cupom vendeu" subtitle="Pedidos, valor vendido e a sua comissão por campanha." />
      <AvisoConexao texto="As vendas ainda não estão ligadas às lojas das marcas. Os números abaixo são de exemplo, para ver como a tela vai ficar." />
      <ResumoVendas vendas={vendas} />
      <Secao title="Por cupom">
        <TabelaVendas vendas={vendas} />
      </Secao>
    </Page>
  );
}
