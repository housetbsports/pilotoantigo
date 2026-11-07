import { Page } from "@/components/page";
import { Secao, Titulo } from "@/components/blocos";
import { AvisoConexao, ResumoVendas, TabelaVendas } from "@/components/vendas/vendas";
import { vendas } from "@/exemplo/dados";

export default function AdminVendasPage() {
  return (
    <Page className="max-w-[1040px]">
      <Titulo eyebrow="Vendas" title="Vendas por cupom" subtitle="Tudo o que os cupons dos influenciadores venderam." />
      <AvisoConexao texto="Ainda sem conexão com as lojas das marcas: os números são de exemplo. Quando a conexão existir, esta tela se atualiza sozinha." />
      <ResumoVendas vendas={vendas} />
      <Secao title="Por cupom">
        <TabelaVendas vendas={vendas} mostrarQuem />
      </Secao>
    </Page>
  );
}
