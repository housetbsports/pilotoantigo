import { PlugZap } from "lucide-react";
import { Numeros } from "@/components/blocos";
import { Avatar } from "@/components/ui/avatar";
import { formatMoney, formatShortDate } from "@/lib/format";
import { influenciadorPorSlug, type Venda } from "@/exemplo/dados";

/** Aviso de que as vendas ainda não estão ligadas a nenhuma loja. */
export function AvisoConexao({ texto }: { texto: string }) {
  return (
    <div className="flex items-start gap-3 rounded-card bg-fill-tertiary px-4 py-4">
      <PlugZap size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-label-secondary" aria-hidden />
      <p className="text-footnote text-label-secondary">{texto}</p>
    </div>
  );
}

export function ResumoVendas({ vendas }: { vendas: Venda[] }) {
  const pedidos = vendas.reduce((s, v) => s + v.pedidos, 0);
  const valor = vendas.reduce((s, v) => s + v.valor, 0);
  const comissao = vendas.reduce((s, v) => s + v.comissao, 0);
  return (
    <Numeros
      itens={[
        { label: "Pedidos", value: pedidos.toLocaleString("pt-BR"), note: "Com o seu cupom" },
        { label: "Vendido", value: formatMoney(valor), note: "Últimos 30 dias" },
        { label: "Comissão", value: formatMoney(comissao), note: "A receber" },
        { label: "Cupons ativos", value: String(new Set(vendas.map((v) => v.cupom)).size) },
      ]}
    />
  );
}

/** Tabela de vendas por cupom. Com `mostrarQuem`, a coluna do influenciador aparece (visão do admin). */
export function TabelaVendas({ vendas, mostrarQuem = false }: { vendas: Venda[]; mostrarQuem?: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-left">
        <thead>
          <tr className="border-b border-separator text-caption text-label-secondary">
            <th className="py-2 pr-4 font-normal">Data</th>
            {mostrarQuem && <th className="py-2 pr-4 font-normal">Influenciador</th>}
            <th className="py-2 pr-4 font-normal">Marca</th>
            <th className="py-2 pr-4 font-normal">Cupom</th>
            <th className="py-2 pr-4 text-right font-normal">Pedidos</th>
            <th className="py-2 pr-4 text-right font-normal">Vendido</th>
            <th className="py-2 text-right font-normal">Comissão</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((v) => {
            const quem = influenciadorPorSlug(v.influenciador);
            return (
              <tr key={v.id} className="border-b border-separator text-subheadline last:border-b-0">
                <td className="py-3 pr-4 text-label-secondary">{formatShortDate(v.data)}</td>
                {mostrarQuem && (
                  <td className="py-3 pr-4">
                    <span className="flex items-center gap-2">
                      <Avatar name={quem?.nome ?? "?"} size="xs" />
                      {quem?.nome}
                    </span>
                  </td>
                )}
                <td className="py-3 pr-4">{v.marca}</td>
                <td className="py-3 pr-4 font-mono text-footnote">{v.cupom}</td>
                <td className="py-3 pr-4 text-right tabular-nums">{v.pedidos}</td>
                <td className="py-3 pr-4 text-right tabular-nums">{formatMoney(v.valor)}</td>
                <td className="py-3 text-right tabular-nums">{formatMoney(v.comissao)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
