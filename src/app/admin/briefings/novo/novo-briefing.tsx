"use client";

import { useState } from "react";
import { Check, Plus, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { influenciadores, nomeRede, type Rede } from "@/exemplo/dados";
import { cn } from "@/lib/cn";

const field =
  "h-11 w-full rounded-control bg-fill-tertiary px-3 text-callout placeholder:text-label-tertiary focus:bg-elevated focus:shadow-[0_0_0_3px_var(--accent-soft)] focus:outline-none";
const area = cn(field, "h-auto resize-y py-2.5 leading-snug");

const formatos: Record<Rede, string[]> = {
  instagram: ["Reels", "Stories", "Carrossel", "Foto"],
  tiktok: ["Vídeo"],
};

/** Só visual: "Enviar" não grava nem avisa ninguém. */
export function NovoBriefing() {
  const [entregas, setEntregas] = useState<{ rede: Rede; formato: string; quantidade: number }[]>([{ rede: "instagram", formato: "Reels", quantidade: 1 }]);
  const [para, setPara] = useState<string[]>([]);
  const [enviado, setEnviado] = useState(false);

  if (enviado)
    return (
      <div className="flex flex-col items-start gap-4 rounded-card bg-elevated p-6 shadow-card">
        <span className="flex size-12 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Check size={22} strokeWidth={1.5} aria-hidden />
        </span>
        <p className="text-headline">Briefing pronto para {para.length} {para.length === 1 ? "influenciador" : "influenciadores"}.</p>
        <p className="text-footnote text-label-secondary">No protótipo nada é enviado.</p>
        <Button variant="secondary" href="/admin/briefings">
          Voltar para os briefings
        </Button>
      </div>
    );

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={(e) => {
        e.preventDefault();
        setEnviado(true);
      }}
    >
      <section className="flex flex-col gap-5 rounded-card bg-elevated p-6 shadow-card">
        <h2 className="text-title-3 font-semibold">Campanha</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo rotulo="Marca">
            <input required className={field} />
          </Campo>
          <Campo rotulo="Nome da campanha">
            <input required className={field} />
          </Campo>
          <Campo rotulo="Objetivo" largo>
            <textarea rows={2} className={area} placeholder="O que a marca quer que aconteça" />
          </Campo>
          <Campo rotulo="Mensagem principal" largo>
            <input className={field} placeholder="A frase que precisa ficar" />
          </Campo>
          <Campo rotulo="Fazer" largo>
            <textarea rows={3} className={area} placeholder="Um item por linha" />
          </Campo>
          <Campo rotulo="Evitar" largo>
            <textarea rows={3} className={area} placeholder="Um item por linha" />
          </Campo>
          <Campo rotulo="Hashtags e marcações">
            <input className={field} placeholder="#publi @marca" />
          </Campo>
          <div className="grid grid-cols-2 gap-4">
            <Campo rotulo="Prazo">
              <input type="date" required className={field} />
            </Campo>
            <Campo rotulo="Valor por pessoa">
              <div className="relative flex items-center">
                <span className="pointer-events-none absolute left-3 text-callout text-label-tertiary">R$</span>
                <input inputMode="decimal" className={cn(field, "pl-10")} />
              </div>
            </Campo>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-card bg-elevated p-6 shadow-card">
        <h2 className="text-title-3 font-semibold">Entregas</h2>
        <ul className="flex flex-col gap-3">
          {entregas.map((e, n) => (
            <li key={n} className="flex flex-wrap items-center gap-2">
              <select
                aria-label="Rede"
                value={e.rede}
                onChange={(ev) => {
                  const rede = ev.target.value as Rede;
                  setEntregas((l) => l.map((x, i) => (i === n ? { ...x, rede, formato: formatos[rede][0] } : x)));
                }}
                className={cn(field, "w-36")}
              >
                {(Object.keys(formatos) as Rede[]).map((r) => (
                  <option key={r} value={r}>
                    {nomeRede[r]}
                  </option>
                ))}
              </select>
              <select
                aria-label="Formato"
                value={e.formato}
                onChange={(ev) => setEntregas((l) => l.map((x, i) => (i === n ? { ...x, formato: ev.target.value } : x)))}
                className={cn(field, "w-40")}
              >
                {formatos[e.rede].map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
              <input
                aria-label="Quantidade"
                type="number"
                min={1}
                value={e.quantidade}
                onChange={(ev) => setEntregas((l) => l.map((x, i) => (i === n ? { ...x, quantidade: Number(ev.target.value) || 1 } : x)))}
                className={cn(field, "w-20 tabular-nums")}
              />
              {entregas.length > 1 && (
                <button
                  type="button"
                  aria-label="Tirar entrega"
                  onClick={() => setEntregas((l) => l.filter((_, i) => i !== n))}
                  className="flex size-9 items-center justify-center rounded-control text-label-tertiary hover:bg-fill-tertiary hover:text-label"
                >
                  <Trash2 size={16} strokeWidth={1.5} aria-hidden />
                </button>
              )}
            </li>
          ))}
        </ul>
        <Button size="sm" variant="secondary" icon={Plus} className="self-start" onClick={() => setEntregas((l) => [...l, { rede: "instagram", formato: "Stories", quantidade: 1 }])}>
          Mais uma entrega
        </Button>
      </section>

      <section className="flex flex-col gap-4 rounded-card bg-elevated p-6 shadow-card">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-title-3 font-semibold">Para quem</h2>
          <p className="text-footnote text-label-secondary">Só quem está com o cadastro completo pode receber.</p>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {influenciadores.map((i) => {
            const on = para.includes(i.slug);
            const pode = i.situacao === "completo";
            return (
              <li key={i.slug}>
                <button
                  type="button"
                  disabled={!pode}
                  aria-pressed={on}
                  onClick={() => setPara((p) => (on ? p.filter((s) => s !== i.slug) : [...p, i.slug]))}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-control px-3 py-2.5 text-left transition-colors disabled:opacity-40",
                    on ? "bg-accent-soft" : "bg-fill-tertiary hover:bg-fill-secondary",
                  )}
                >
                  <Avatar name={i.nome} size="sm" />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-subheadline">{i.nome}</span>
                    <span className="truncate text-caption text-label-secondary">{pode ? i.nicho : "Cadastro incompleto"}</span>
                  </span>
                  {on && <Check size={16} strokeWidth={1.75} className="text-accent" aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <Button type="submit" variant="primary" icon={Send} className="self-start" disabled={!para.length}>
        Enviar briefing
      </Button>
    </form>
  );
}

function Campo({ rotulo, largo, children }: { rotulo: string; largo?: boolean; children: React.ReactNode }) {
  return (
    <label className={cn("flex flex-col gap-1.5", largo && "sm:col-span-2")}>
      <span className="text-footnote text-label-secondary">{rotulo}</span>
      {children}
    </label>
  );
}
