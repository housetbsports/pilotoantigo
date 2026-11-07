"use client";

import { useState } from "react";
import { Check, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SituacaoBriefing } from "@/exemplo/dados";

/** Ações do influenciador no briefing. Só visual: nada é enviado. */
export function EnviarConteudo({ situacao }: { situacao: SituacaoBriefing }) {
  const [aceito, setAceito] = useState(situacao !== "novo");
  const [arquivo, setArquivo] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(situacao === "revisao" || situacao === "aprovado");

  if (situacao === "aprovado") {
    return <p className="flex items-center gap-2 rounded-card bg-fill-tertiary px-4 py-4 text-subheadline"><Check size={16} strokeWidth={1.75} className="text-live" aria-hidden /> Conteúdo aprovado pela marca. Pode publicar.</p>;
  }

  if (!aceito) {
    return (
      <div className="flex flex-col gap-4 rounded-card bg-elevated p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <p className="text-subheadline">Topa este trabalho?</p>
        <div className="flex gap-2">
          <Button variant="secondary">Recusar</Button>
          <Button variant="primary" icon={Check} onClick={() => setAceito(true)}>
            Aceitar briefing
          </Button>
        </div>
      </div>
    );
  }

  if (enviado) {
    return <p className="rounded-card bg-fill-tertiary px-4 py-4 text-subheadline text-label-secondary">Conteúdo enviado. A equipe TB está revisando com a marca.</p>;
  }

  return (
    <div className="flex flex-col gap-4 rounded-card bg-elevated p-5 shadow-card">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-title-3 font-semibold">Enviar conteúdo para aprovação</h2>
        <p className="text-footnote text-label-secondary">Mande o vídeo ou as fotos antes de publicar. A TB revisa com a marca.</p>
      </div>
      <label className="flex cursor-pointer flex-col items-center gap-2 rounded-card border border-dashed border-separator-strong px-4 py-8 text-center hover:bg-fill-tertiary">
        <Upload size={20} strokeWidth={1.5} className="text-label-secondary" aria-hidden />
        <span className="text-subheadline">{arquivo ?? "Escolher arquivo"}</span>
        <span className="text-caption text-label-tertiary">Vídeo ou foto</span>
        <input type="file" accept="video/*,image/*" className="sr-only" onChange={(e) => setArquivo(e.target.files?.[0]?.name ?? null)} />
      </label>
      <textarea rows={2} placeholder="Legenda que você vai usar" className="w-full resize-y rounded-control bg-fill-tertiary px-3 py-2.5 text-callout placeholder:text-label-tertiary focus:bg-elevated focus:shadow-[0_0_0_3px_var(--accent-soft)] focus:outline-none" />
      <Button variant="primary" className="self-start" disabled={!arquivo} onClick={() => setEnviado(true)}>
        Enviar para aprovação
      </Button>
    </div>
  );
}
