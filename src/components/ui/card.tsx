import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function Card({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-card bg-elevated shadow-card", className)} {...rest}>
      {children}
    </div>
  );
}

/** Título de bloco com ação opcional à direita, no estilo das seções do app Saúde. */
export function SectionHeader({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: { label: string; href: string } | React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex min-h-8 items-end justify-between gap-4", className)}>
      <div className="flex min-w-0 flex-col gap-0.5">
        <h2 className="text-title-3 font-semibold">{title}</h2>
        {description && <p className="text-footnote text-label-secondary">{description}</p>}
      </div>
      {action && typeof action === "object" && "href" in action ? (
        <Link
          href={action.href}
          className="flex shrink-0 items-center gap-0.5 text-subheadline text-accent hover:opacity-80"
        >
          {action.label}
          <ChevronRight size={16} strokeWidth={1.5} aria-hidden />
        </Link>
      ) : (
        action
      )}
    </div>
  );
}
