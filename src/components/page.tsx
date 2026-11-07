import { cn } from "@/lib/cn";

/** Contêiner padrão das telas: largura máxima, margens laterais e respiro vertical. */
export function Page({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <main className={cn("mx-auto flex w-full max-w-[880px] flex-col gap-10 px-4 py-8 md:gap-12 md:px-10 md:py-14", className)}>
      {children}
    </main>
  );
}

export function PageTitle({ title, subtitle, actions }: { title: string; subtitle?: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="font-serif text-[34px] leading-[1.15] font-normal tracking-[-0.01em] md:text-[40px]">{title}</h1>
        {subtitle && <p className="text-callout text-label-secondary">{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </header>
  );
}
