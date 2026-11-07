import { cn } from "@/lib/cn";

type Tone = "neutral" | "accent" | "warning" | "live";

const tones: Record<Tone, string> = {
  neutral: "bg-fill-tertiary text-label-secondary",
  accent: "bg-accent-soft text-accent",
  warning: "bg-warning-soft text-warning",
  live: "bg-fill-tertiary text-live",
};

export function Badge({ tone = "neutral", className, children }: { tone?: Tone; className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex h-5 items-center rounded-xs px-1.5 text-caption font-medium whitespace-nowrap", tones[tone], className)}>
      {children}
    </span>
  );
}

/** Selo cinza: o que está na tela ainda é exemplo, não vem de lugar nenhum. */
export function Exemplo({ className }: { className?: string }) {
  return (
    <Badge className={className}>
      <span title="Dado de exemplo: ainda não há banco nem conexão">Exemplo</span>
    </Badge>
  );
}
