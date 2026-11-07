"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { CamposAssunto, preenchido, type Respostas } from "@/components/perfil/campos";
import { Progresso } from "@/components/blocos";
import { Button } from "@/components/ui/button";
import { assuntos, respostasExemplo } from "@/lib/perfil-campos";
import { instant, spring } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** Perfil em abas por assunto, como o "Quem é" do atleta. Só visual: "Salvar" não grava nada. */
export function MeuPerfil() {
  const reduce = useReducedMotion();
  const [aba, setAba] = useState(assuntos[0].chave);
  const [respostas, setRespostas] = useState<Respostas>(respostasExemplo);
  const [salvo, setSalvo] = useState(false);
  const assunto = assuntos.find((a) => a.chave === aba)!;
  const total = preenchido(assuntos.flatMap((a) => a.campos), respostas);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-footnote">
          <span className="text-label-secondary">Perfil preenchido</span>
          <span className="tabular-nums">{total}%</span>
        </div>
        <Progresso valor={total} />
      </div>

      <div role="tablist" aria-label="Assuntos do perfil" className="flex gap-6 overflow-x-auto border-b border-separator [scrollbar-width:none]">
        {assuntos.map((a) => {
          const active = a.chave === aba;
          const p = preenchido(a.campos, respostas);
          return (
            <button
              key={a.chave}
              role="tab"
              aria-selected={active}
              onClick={() => setAba(a.chave)}
              className={cn("relative flex h-11 shrink-0 items-center gap-2 text-subheadline transition-colors", active ? "text-label" : "text-label-secondary hover:text-label")}
            >
              <span className={cn(active && "font-medium")}>{a.titulo}</span>
              {p === 100 ? <Check size={14} strokeWidth={1.75} className="text-live" aria-label="completo" /> : <span className="text-caption text-label-tertiary tabular-nums">{p}%</span>}
              {active && <motion.span layoutId="perfil-aba" transition={reduce ? instant : spring.snappy} className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-accent" />}
            </button>
          );
        })}
      </div>

      <section className="flex flex-col gap-5">
        <p className="text-footnote text-label-secondary">{assunto.descricao}</p>
        <CamposAssunto
          assunto={assunto}
          respostas={respostas}
          onChange={(k, v) => {
            setSalvo(false);
            setRespostas((r) => ({ ...r, [k]: v }));
          }}
        />
      </section>

      <div className="flex items-center gap-3">
        <Button variant="primary" icon={salvo ? Check : undefined} onClick={() => setSalvo(true)}>
          {salvo ? "Salvo" : "Salvar"}
        </Button>
        <span className="text-caption text-label-tertiary">Protótipo: nada é gravado.</span>
      </div>
    </div>
  );
}
