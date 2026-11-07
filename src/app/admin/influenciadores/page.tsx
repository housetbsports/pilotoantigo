import Link from "next/link";
import { UserPlus } from "lucide-react";
import { Page } from "@/components/page";
import { SeloCadastro, Titulo } from "@/components/blocos";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { influenciadores } from "@/exemplo/dados";
import { formatCompact } from "@/lib/format";

export default function InfluenciadoresPage() {
  return (
    <Page className="max-w-[1040px]">
      <Titulo
        eyebrow="Influenciadores"
        title="Todos os cadastros"
        actions={
          <Button variant="primary" icon={UserPlus} href="/admin/influenciadores/convidar">
            Convidar
          </Button>
        }
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-b border-separator text-caption text-label-secondary">
              <th className="py-2 pr-4 font-normal">Nome</th>
              <th className="py-2 pr-4 font-normal">Nicho</th>
              <th className="py-2 pr-4 text-right font-normal">Instagram</th>
              <th className="py-2 pr-4 text-right font-normal">TikTok</th>
              <th className="py-2 font-normal">Cadastro</th>
            </tr>
          </thead>
          <tbody>
            {influenciadores.map((i) => (
              <tr key={i.slug} className="border-b border-separator text-subheadline last:border-b-0 hover:bg-fill-tertiary">
                <td className="py-3 pr-4">
                  <Link href={`/admin/influenciadores/${i.slug}`} className="flex items-center gap-3">
                    <Avatar name={i.nome} size="sm" />
                    <span className="flex flex-col">
                      <span>{i.nome}</span>
                      <span className="text-footnote text-label-secondary">{i.arroba}</span>
                    </span>
                  </Link>
                </td>
                <td className="py-3 pr-4 text-label-secondary">{i.nicho}</td>
                <td className="py-3 pr-4 text-right tabular-nums">{i.redes.instagram?.conectada ? formatCompact(i.redes.instagram.seguidores) : <span className="text-label-tertiary">sem dado</span>}</td>
                <td className="py-3 pr-4 text-right tabular-nums">{i.redes.tiktok?.conectada ? formatCompact(i.redes.tiktok.seguidores) : <span className="text-label-tertiary">sem dado</span>}</td>
                <td className="py-3">
                  <SeloCadastro situacao={i.situacao} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
}
