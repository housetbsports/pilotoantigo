import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge, Exemplo } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { formatShortDate } from "@/lib/format";
import { situacaoBriefing, situacaoCadastro, type Briefing, type SituacaoBriefing, type SituacaoCadastro } from "@/exemplo/dados";

/** Título grande da tela, com o selo "Exemplo" (nada aqui vem de banco ainda). */
export function Titulo({ eyebrow, title, subtitle, actions }: { eyebrow?: string; title: string; subtitle?: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <Exemplo />
        </div>
        <h1 className="font-serif text-[34px] leading-[1.1] tracking-[-0.01em] md:text-[44px]">{title}</h1>
        {subtitle && <p className="text-callout text-label-secondary">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  );
}

/** Bloco com título pequeno, como as seções do perfil do atleta. */
export function Secao({ title, description, action, children, className }: { title: string; description?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <div className="flex min-h-8 items-end justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className="text-title-3 font-semibold">{title}</h2>
          {description && <p className="text-footnote text-label-secondary">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

/** Números do topo: rótulo pequeno, número grande, nota cinza. */
export function Numeros({ itens, className }: { itens: { label: string; value: string; note?: string }[]; className?: string }) {
  return (
    <dl className={cn("grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4", className)}>
      {itens.map((k) => (
        <div key={k.label} className="flex flex-col">
          <dt className="text-caption text-label-secondary">{k.label}</dt>
          <dd className="text-title-2 font-normal tabular-nums">{k.value}</dd>
          {k.note && <dd className="text-caption text-label-tertiary">{k.note}</dd>}
        </div>
      ))}
    </dl>
  );
}

const tomBriefing: Record<SituacaoBriefing, "accent" | "neutral" | "warning" | "live"> = {
  novo: "accent",
  producao: "neutral",
  revisao: "warning",
  aprovado: "live",
};

export function SeloBriefing({ situacao }: { situacao: SituacaoBriefing }) {
  return <Badge tone={tomBriefing[situacao]}>{situacaoBriefing[situacao]}</Badge>;
}

export function SeloCadastro({ situacao }: { situacao: SituacaoCadastro }) {
  return <Badge tone={situacao === "completo" ? "live" : situacao === "faltando" ? "warning" : "neutral"}>{situacaoCadastro[situacao]}</Badge>;
}

/** Linha de briefing numa lista. */
export function LinhaBriefing({ b, href }: { b: Briefing; href: string }) {
  return (
    <Link href={href} className="group/row flex items-center gap-4 border-b border-separator py-4 pr-2 last:border-b-0 hover:bg-fill-tertiary md:px-2">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow">{b.marca}</span>
          <SeloBriefing situacao={b.situacao} />
        </div>
        <span className="truncate text-headline">{b.titulo}</span>
        <span className="text-footnote text-label-secondary">
          {plural(b.entregas.reduce((n, e) => n + e.quantidade, 0), "entrega", "entregas")} · prazo {formatShortDate(b.prazo)}
        </span>
      </div>
      <ChevronRight size={16} strokeWidth={1.5} className="shrink-0 text-label-tertiary" aria-hidden />
    </Link>
  );
}

/** Gráfico de linha simples: cinza, com o último ponto em laranja (regra do DESIGN.md). */
export function Linha({ valores, rotulos, className }: { valores: number[]; rotulos?: string[]; className?: string }) {
  const w = 600;
  const h = 160;
  const min = Math.min(...valores);
  const max = Math.max(...valores);
  const span = max - min || 1;
  const pts = valores.map((v, i) => [(i / (valores.length - 1)) * (w - 16) + 8, h - 12 - ((v - min) / span) * (h - 32)] as const);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const [lx, ly] = pts[pts.length - 1];
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-40 w-full" preserveAspectRatio="none" role="img" aria-label="Gráfico de crescimento">
        <path d={d} fill="none" stroke="var(--series-2)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        <circle cx={lx} cy={ly} r="4" fill="var(--accent)" />
      </svg>
      {rotulos && (
        <div className="flex justify-between text-caption text-label-tertiary">
          {rotulos.map((r) => (
            <span key={r}>{r}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/** Barra de progresso fina (quanto do cadastro está preenchido). */
export function Progresso({ valor, className }: { valor: number; className?: string }) {
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-fill-tertiary", className)} role="progressbar" aria-valuenow={valor} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-accent" style={{ width: `${valor}%` }} />
    </div>
  );
}

/** Ícone simples das redes (sem logo oficial, só a letra). */
export function MarcaRede({ rede, className }: { rede: "instagram" | "tiktok"; className?: string }) {
  return (
    <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-card bg-fill-secondary font-serif text-[18px] text-label", className)} aria-hidden>
      {rede === "instagram" ? "Ig" : "Tk"}
    </span>
  );
}

export function plural(n: number, um: string, varios: string) {
  return `${n} ${n === 1 ? um : varios}`;
}
