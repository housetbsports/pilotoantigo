"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const field =
  "h-11 rounded-control bg-fill-tertiary px-3 text-callout placeholder:text-label-tertiary focus:bg-elevated focus:shadow-[0_0_0_3px_var(--accent-soft)] focus:outline-none";

/** Só visual: nenhum e-mail é enviado. */
export function Convite() {
  const [enviado, setEnviado] = useState<string | null>(null);
  if (enviado)
    return (
      <p className="rounded-card bg-fill-tertiary px-4 py-4 text-subheadline">
        Convite pronto para <span className="font-medium">{enviado}</span>. No protótipo nenhum e-mail sai.
      </p>
    );
  return (
    <form
      className="flex flex-col gap-5 rounded-card bg-elevated p-6 shadow-card"
      onSubmit={(e) => {
        e.preventDefault();
        setEnviado(String(new FormData(e.currentTarget).get("email") || "o e-mail informado"));
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-footnote text-label-secondary">Nome</span>
          <input name="nome" required className={field} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-footnote text-label-secondary">E-mail</span>
          <input name="email" type="email" required className={field} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-footnote text-label-secondary">Instagram</span>
          <input name="instagram" placeholder="@usuario" className={field} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-footnote text-label-secondary">TikTok</span>
          <input name="tiktok" placeholder="@usuario" className={field} />
        </label>
      </div>
      <Button type="submit" variant="primary" icon={Send} className="self-start">
        Enviar convite
      </Button>
    </form>
  );
}
