import type { Metadata } from "next";
import { Cadastro } from "./cadastro";

export const metadata: Metadata = { title: "Criar cadastro · Portal do influenciador" };

export default function CadastroPage() {
  return (
    <main className="min-h-dvh bg-bg px-4 py-8 md:py-14">
      <Cadastro />
    </main>
  );
}
