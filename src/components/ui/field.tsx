import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

export function SearchField({ className, ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cn("relative flex h-10 items-center", className)}>
      <Search size={16} strokeWidth={1.5} className="pointer-events-none absolute left-3 text-label-tertiary" aria-hidden />
      <input
        type="search"
        className="h-full w-full rounded-control bg-fill-tertiary pr-3 pl-9 text-subheadline placeholder:text-label-tertiary focus:bg-elevated focus:shadow-[0_0_0_3px_var(--accent-soft)] focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        {...rest}
      />
    </label>
  );
}

export function SelectField({
  label,
  className,
  children,
  ...rest
}: { label: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className={cn("relative flex h-10 items-center", className)}>
      <span className="sr-only">{label}</span>
      <select
        className="h-full w-full appearance-none rounded-control bg-fill-tertiary pr-8 pl-3 text-subheadline focus:shadow-[0_0_0_3px_var(--accent-soft)] focus:outline-none"
        {...rest}
      >
        {children}
      </select>
      <svg className="pointer-events-none absolute right-3 text-label-tertiary" width="10" height="6" viewBox="0 0 10 6" aria-hidden>
        <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </label>
  );
}
