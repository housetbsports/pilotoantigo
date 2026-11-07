import { redirect } from "next/navigation";

/** Sem login de verdade ainda: a entrada leva para a tela de escolher o acesso. */
export default function Home() {
  redirect("/entrar");
}
