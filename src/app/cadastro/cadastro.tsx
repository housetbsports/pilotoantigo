"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { Exemplo } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CamposAssunto, type Respostas } from "@/components/perfil/campos";
import { ConectarRedes } from "@/components/perfil/conectar-redes";
import { assuntos } from "@/lib/perfil-campos";
import { instant, spring } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** Passos do cadastro: os assuntos do perfil, com as redes no meio. Valores ficam para depois, no "Meu perfil". */
const passos = [
  { chave: "voce", titulo: "Você" },
  { chave: "conteudo", titulo: "Seu conteúdo" },
  { chave: "redes", titulo: "Redes" },
  { chave: "recebimento", titulo: "Recebimento" },
] as const;

/** Só visual: o que se digita aqui fica só na tela, nada é gravado. */
export function Cadastro() {
  const reduce = useReducedMotion();
  const [passo, setPasso] = useState(0);
  const [pronto, setPronto] = useState(false);
  const [respostas, setRespostas] = useState<Respostas>({});
  const atual = passos[passo];
  const assunto = assuntos.find((a) => a.chave === atual.chave);

  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-col gap-8">
      <div className="flex items-center justify-between">
        <Link href="/entrar" aria-label="Voltar para a entrada">
          <BrandMark />
        </Link>
        <Exemplo />
      </div>

      {pronto ? (
        <div className="flex flex-col items-start gap-5 rounded-card-lg bg-elevated p-8 shadow-card">
          <span className="flex size-12 items-center justify-center rounded-full bg-accent-soft text-accent">
            <Check size={22} strokeWidth={1.5} aria-hidden />
          </span>
          <div className="flex flex-col gap-1">
            <h1 className="font-serif text-[34px] leading-tight">Cadastro enviado</h1>
            <p className="text-callout text-label-secondary">A equipe TB confere seus dados e libera seu acesso. Você recebe um aviso no e-mail.</p>
          </div>
          <Button variant="primary" href="/painel" icon={ArrowRight}>
            Ver como fica o painel
          </Button>
        </div>
      ) : (
        <>
          <header className="flex flex-col gap-4">
            <p className="eyebrow">
              Passo {passo + 1} de {passos.length}
            </p>
            <h1 className="font-serif text-[34px] leading-[1.1] md:text-[44px]">Criar meu cadastro</h1>
            <ol className="grid grid-cols-4 gap-2" aria-label="Passos">
              {passos.map((p, i) => (
                <li key={p.chave} className="flex flex-col gap-1.5">
                  <span className={cn("h-1 rounded-full transition-colors", i <= passo ? "bg-accent" : "bg-fill-secondary")} aria-hidden />
                  <span className={cn("text-caption", i === passo ? "text-label" : "text-label-tertiary")}>{p.titulo}</span>
                </li>
              ))}
            </ol>
          </header>

          <AnimatePresence mode="wait" initial={false}>
            <motion.section
              key={atual.chave}
              initial={reduce ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -16 }}
              transition={reduce ? instant : spring.gentle}
              className="flex flex-col gap-5 rounded-card bg-elevated p-6 shadow-card"
            >
              <div className="flex flex-col gap-0.5">
                <h2 className="text-title-3 font-semibold">{atual.chave === "redes" ? "Conecte suas redes" : assunto?.titulo}</h2>
                <p className="text-footnote text-label-secondary">
                  {atual.chave === "redes" ? "A TB lê as métricas direto da rede: você não precisa mandar print." : assunto?.descricao}
                </p>
              </div>
              {atual.chave === "redes" ? (
                <ConectarRedes />
              ) : (
                assunto && <CamposAssunto assunto={assunto} respostas={respostas} onChange={(k, v) => setRespostas((r) => ({ ...r, [k]: v }))} />
              )}
            </motion.section>
          </AnimatePresence>

          <div className="flex items-center justify-between">
            {passo > 0 ? (
              <Button variant="secondary" icon={ArrowLeft} onClick={() => setPasso((p) => p - 1)}>
                Voltar
              </Button>
            ) : (
              <span />
            )}
            {passo < passos.length - 1 ? (
              <Button variant="primary" onClick={() => setPasso((p) => p + 1)}>
                Continuar
              </Button>
            ) : (
              <Button variant="primary" icon={Check} onClick={() => setPronto(true)}>
                Enviar cadastro
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
