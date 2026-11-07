import { CalendarDays, Check, Hash, X } from "lucide-react";
import { MarcaRede, SeloBriefing } from "@/components/blocos";
import { formatMoney, formatShortDate } from "@/lib/format";
import { nomeRede, type Briefing } from "@/exemplo/dados";

/** O briefing em si: igual para o influenciador e para o admin. */
export function BriefingView({ b, mostrarValor = true }: { b: Briefing; mostrarValor?: boolean }) {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <p className="eyebrow">{b.marca}</p>
          <SeloBriefing situacao={b.situacao} />
        </div>
        <h1 className="font-serif text-[40px] leading-[1.02] tracking-[-0.02em] md:text-[56px]">{b.titulo}</h1>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-callout text-label-secondary">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={16} strokeWidth={1.5} aria-hidden /> Recebido em {formatShortDate(b.recebido)}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden /> Prazo {formatShortDate(b.prazo)}
          </span>
          {mostrarValor && <span className="tabular-nums">{formatMoney(b.valor)}</span>}
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-footnote text-label-secondary">Objetivo</h2>
          <p className="text-body">{b.objetivo}</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <h2 className="text-footnote text-label-secondary">Mensagem principal</h2>
          <p className="font-serif text-[22px] leading-snug">“{b.mensagem}”</p>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-title-3 font-semibold">Entregas</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {b.entregas.map((e, i) => (
            <li key={i} className="flex items-center gap-3 rounded-card bg-elevated p-4 shadow-card">
              <MarcaRede rede={e.rede} />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-subheadline">{e.formato}</span>
                <span className="text-footnote text-label-secondary">{nomeRede[e.rede]}</span>
              </div>
              <span className="text-title-3 tabular-nums">×{e.quantidade}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Lista titulo="Fazer" itens={b.fazer} icone={<Check size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-live" aria-hidden />} />
        <Lista titulo="Evitar" itens={b.evitar} icone={<X size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-critical" aria-hidden />} />
      </section>

      <section className="flex flex-wrap items-center gap-2">
        <Hash size={16} strokeWidth={1.5} className="text-label-tertiary" aria-hidden />
        {b.hashtags.map((h) => (
          <span key={h} className="rounded-xs bg-fill-tertiary px-2 py-0.5 text-footnote text-label-secondary">
            {h}
          </span>
        ))}
      </section>
    </div>
  );
}

function Lista({ titulo, itens, icone }: { titulo: string; itens: string[]; icone: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-title-3 font-semibold">{titulo}</h2>
      <ul className="flex flex-col gap-2">
        {itens.map((t) => (
          <li key={t} className="flex gap-2 text-subheadline">
            {icone}
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
