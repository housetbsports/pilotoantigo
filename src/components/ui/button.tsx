import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "plain";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  primary: "bg-label text-bg hover:opacity-85",
  secondary: "bg-fill-secondary text-label hover:bg-fill",
  plain: "text-accent hover:bg-accent-soft",
};

const sizes: Record<Size, string> = {
  sm: "h-8 gap-1.5 px-3 text-footnote rounded-control",
  md: "h-10 gap-2 px-4 text-subheadline rounded-control",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: LucideIcon;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = BaseProps &
  ({ href: string } | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>));

export function Button({ variant = "secondary", size = "md", icon: Icon, className, children, ...rest }: ButtonProps) {
  const classes = cn(
    "inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap select-none",
    // Movimento (cor, clique, gesto do ícone) vem de src/styles/movimento.css.
    "disabled:pointer-events-none disabled:opacity-40",
    variants[variant],
    sizes[size],
    className,
  );
  const content = (
    <>
      {Icon && <Icon size={size === "sm" ? 14 : 16} strokeWidth={1.5} aria-hidden />}
      {children}
    </>
  );
  if ("href" in rest && rest.href) {
    return (
      <Link href={rest.href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}

/** Botão só com ícone. Sempre exige rótulo acessível. */
export function IconButton({
  icon: Icon,
  label,
  className,
  ...rest
}: { icon: LucideIcon; label: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-control text-label-secondary",
        "hover:bg-fill-tertiary hover:text-label",
        className,
      )}
      {...rest}
    >
      <Icon size={18} strokeWidth={1.5} aria-hidden />
    </button>
  );
}
