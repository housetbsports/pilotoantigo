"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BrandMark } from "@/components/ui/brand-mark";
import { Exemplo } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

const field =
  "h-11 rounded-control bg-fill-tertiary px-3 text-callout focus:bg-elevated focus:shadow-[0_0_0_3px_var(--accent-soft)] focus:outline-none";

type Quem = "influenciador" | "admin";

/** Só visual: não há login de verdade. "Entrar" leva direto para a área escolhida. */
export function LoginForm() {
  const router = useRouter();
  const [quem, setQuem] = useState<Quem>("influenciador");

  return (
    <div className="flex w-full max-w-sm flex-col gap-5 rounded-card-lg bg-elevated p-8 shadow-raised">
      <div className="flex items-center justify-between">
        <BrandMark />
        <Exemplo />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="font-serif text-[28px] leading-tight">Entrar</h1>
        <p className="text-subheadline text-label-secondary">Portal do influenciador · TB Sports</p>
      </div>
      <div role="tablist" className="grid grid-cols-2 gap-1 rounded-control-lg bg-fill-tertiary p-1">
        {(["influenciador", "admin"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={quem === m}
            onClick={() => setQuem(m)}
            className={cn("h-8 rounded-control text-footnote", quem === m ? "bg-elevated text-label shadow-card" : "text-label-secondary")}
          >
            {m === "influenciador" ? "Sou influenciador" : "Equipe TB"}
          </button>
        ))}
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(quem === "admin" ? "/admin" : "/painel");
        }}
      >
        <label className="flex flex-col gap-1.5">
          <span className="text-footnote text-label-secondary">E-mail</span>
          <input type="email" name="email" autoComplete="email" className={field} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-footnote text-label-secondary">Senha</span>
          <input type="password" name="senha" autoComplete="current-password" className={field} />
        </label>
        <button type="submit" className="h-11 rounded-control bg-accent text-subheadline font-medium text-on-accent hover:bg-accent-hover">
          Entrar
        </button>
      </form>

      {quem === "influenciador" ? (
        <p className="text-footnote text-label-secondary">
          Primeira vez?{" "}
          <Link href="/cadastro" className="text-accent hover:opacity-80">
            Criar meu cadastro
          </Link>
        </p>
      ) : (
        <p className="text-caption text-label-tertiary">A equipe TB entra com o usuário criado pelo master.</p>
      )}
    </div>
  );
}
