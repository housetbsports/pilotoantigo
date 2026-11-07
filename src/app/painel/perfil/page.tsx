import { Page } from "@/components/page";
import { Titulo } from "@/components/blocos";
import { Avatar } from "@/components/ui/avatar";
import { eu } from "@/exemplo/dados";
import { MeuPerfil } from "./meu-perfil";

export default function PerfilPage() {
  return (
    <Page>
      <Titulo eyebrow="Meu perfil" title="Seus dados" subtitle="É daqui que a TB tira o que mostra para as marcas. Mantenha em dia." />
      <div className="flex items-center gap-4">
        <Avatar name={eu.nome} size="lg" />
        <div className="flex flex-col">
          <span className="font-serif text-[28px] leading-tight">{eu.nome}</span>
          <span className="text-footnote text-label-secondary">
            {eu.arroba} · {eu.nicho} · {eu.cidade}
          </span>
        </div>
      </div>
      <MeuPerfil />
    </Page>
  );
}
