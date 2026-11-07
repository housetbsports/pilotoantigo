import { Page } from "@/components/page";
import { Titulo } from "@/components/blocos";
import { Convite } from "./convite";

export default function ConvidarPage() {
  return (
    <Page>
      <Titulo eyebrow="Influenciadores" title="Convidar influenciador" subtitle="A pessoa recebe um link por e-mail e preenche o próprio cadastro." />
      <Convite />
    </Page>
  );
}
