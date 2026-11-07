import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Entrar · Portal do influenciador" };

export default function EntrarPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-bg px-4 py-10">
      <LoginForm />
    </main>
  );
}
