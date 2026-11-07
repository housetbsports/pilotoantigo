"use client";

import { Lock } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Assunto, Campo } from "@/lib/perfil-campos";

export type Respostas = Record<string, string | string[]>;

const field =
  "h-11 w-full rounded-control bg-fill-tertiary px-3 text-callout placeholder:text-label-tertiary focus:bg-elevated focus:shadow-[0_0_0_3px_var(--accent-soft)] focus:outline-none";

/** Os campos de um assunto, em duas colunas (uma no celular). */
export function CamposAssunto({ assunto, respostas, onChange }: { assunto: Assunto; respostas: Respostas; onChange: (chave: string, valor: string | string[]) => void }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {assunto.campos.map((c) => (
        <CampoView key={c.chave} campo={c} valor={respostas[c.chave]} onChange={(v) => onChange(c.chave, v)} />
      ))}
    </div>
  );
}

function CampoView({ campo, valor, onChange }: { campo: Campo; valor: string | string[] | undefined; onChange: (v: string | string[]) => void }) {
  const texto = typeof valor === "string" ? valor : "";
  const lista = Array.isArray(valor) ? valor : [];
  const id = `campo-${campo.chave}`;

  return (
    <div className={cn("flex flex-col gap-1.5", (campo.largo || campo.tipo === "longo" || campo.tipo === "varios") && "sm:col-span-2")}>
      <label htmlFor={id} className="flex items-center gap-1.5 text-footnote text-label-secondary">
        {campo.rotulo}
        {campo.obrigatorio && <span className="text-accent" aria-label="obrigatório">*</span>}
        {campo.sensivel && <Lock size={12} strokeWidth={1.5} className="text-label-tertiary" aria-label="Só a equipe TB vê" />}
      </label>

      {campo.tipo === "longo" ? (
        <textarea id={id} rows={3} value={texto} placeholder={campo.dica} onChange={(e) => onChange(e.target.value)} className={cn(field, "h-auto resize-y py-2.5 leading-snug")} />
      ) : campo.tipo === "escolha" ? (
        <div role="radiogroup" aria-labelledby={id} className="flex flex-wrap gap-2">
          {campo.opcoes?.map((o) => (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={texto === o}
              onClick={() => onChange(o)}
              className={cn("h-9 rounded-control px-3 text-footnote transition-colors", texto === o ? "bg-label text-bg" : "bg-fill-tertiary text-label-secondary hover:bg-fill-secondary")}
            >
              {o}
            </button>
          ))}
        </div>
      ) : campo.tipo === "varios" ? (
        <div className="flex flex-wrap gap-2">
          {campo.opcoes?.map((o) => {
            const on = lista.includes(o);
            return (
              <button
                key={o}
                type="button"
                aria-pressed={on}
                onClick={() => onChange(on ? lista.filter((x) => x !== o) : [...lista, o])}
                className={cn("h-9 rounded-control px-3 text-footnote transition-colors", on ? "bg-accent-soft text-accent" : "bg-fill-tertiary text-label-secondary hover:bg-fill-secondary")}
              >
                {o}
              </button>
            );
          })}
        </div>
      ) : campo.tipo === "dinheiro" ? (
        <div className="relative flex items-center">
          <span className="pointer-events-none absolute left-3 text-callout text-label-tertiary">R$</span>
          <input id={id} inputMode="decimal" value={texto} onChange={(e) => onChange(e.target.value)} className={cn(field, "pl-10 tabular-nums")} />
        </div>
      ) : (
        <input
          id={id}
          type={campo.tipo === "email" ? "email" : campo.tipo === "data" ? "date" : campo.tipo === "telefone" ? "tel" : "text"}
          value={texto}
          placeholder={campo.dica}
          onChange={(e) => onChange(e.target.value)}
          className={field}
        />
      )}
    </div>
  );
}

/** Quanto de um conjunto de campos está preenchido (0 a 100). */
export function preenchido(campos: Campo[], respostas: Respostas) {
  if (!campos.length) return 0;
  const ok = campos.filter((c) => {
    const v = respostas[c.chave];
    return Array.isArray(v) ? v.length > 0 : Boolean(v && v.trim());
  }).length;
  return Math.round((ok / campos.length) * 100);
}
