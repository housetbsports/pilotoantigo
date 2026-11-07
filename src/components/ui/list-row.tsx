import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

/** Linha de lista agrupada (estilo Ajustes/Notas). Use dentro de <ListGroup>. */
export function ListRow({
  leading,
  title,
  subtitle,
  trailing,
  href,
  className,
}: {
  leading?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  href?: string;
  className?: string;
}) {
  const body = (
    <>
      {leading && <div className="shrink-0">{leading}</div>}
      <div className="flex min-w-0 flex-1 items-center gap-3 border-b border-separator py-3 pr-4 group-last/row:border-b-0">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="truncate text-subheadline">{title}</div>
          {subtitle && <div className="truncate text-footnote text-label-secondary">{subtitle}</div>}
        </div>
        {trailing && <div className="flex shrink-0 items-center gap-2">{trailing}</div>}
        {href && <ChevronRight size={16} strokeWidth={1.5} className="shrink-0 text-label-tertiary" aria-hidden />}
      </div>
    </>
  );
  const classes = cn("group/row flex items-center gap-3 pl-4", href && "transition-colors duration-150 hover:bg-fill-tertiary", className);
  return href ? (
    <Link href={href} className={classes}>
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  );
}

export function ListGroup({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("overflow-hidden rounded-card bg-elevated shadow-card", className)}>{children}</div>;
}
