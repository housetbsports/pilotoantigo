import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/** Bloco cinza com brilho suave. Respeita prefers-reduced-motion. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-control", className)} aria-hidden />;
}

/** Estado vazio: convite para a próxima ação. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-3 px-6 py-10 text-center", className)}>
      <span className="flex size-12 items-center justify-center rounded-full bg-fill-tertiary text-label-secondary">
        <Icon size={22} strokeWidth={1.5} aria-hidden />
      </span>
      <div className="flex max-w-xs flex-col gap-1">
        <p className="text-headline">{title}</p>
        {description && <p className="text-footnote text-label-secondary">{description}</p>}
      </div>
      {action && <div className="pt-1">{action}</div>}
    </div>
  );
}

/** Estado de erro: diz o que falhou e como tentar de novo. */
export function ErrorState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div role="alert" className={cn("flex flex-col items-center gap-3 px-6 py-10 text-center", className)}>
      <span className="flex size-12 items-center justify-center rounded-full bg-critical-soft text-critical">
        <Icon size={22} strokeWidth={1.5} aria-hidden />
      </span>
      <div className="flex max-w-xs flex-col gap-1">
        <p className="text-headline">{title}</p>
        {description && <p className="text-footnote text-label-secondary">{description}</p>}
      </div>
      {action && <div className="pt-1">{action}</div>}
    </div>
  );
}
