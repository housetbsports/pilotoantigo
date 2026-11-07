"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useId } from "react";
import { spring, instant } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  label,
  className,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string; icon?: LucideIcon; iconOnly?: boolean }[];
  label: string;
  className?: string;
}) {
  const id = useId();
  const reduce = useReducedMotion();
  return (
    <div role="radiogroup" aria-label={label} className={cn("flex max-w-full overflow-x-auto rounded-control-lg bg-fill-tertiary p-0.5 [scrollbar-width:none]", className)}>
      {options.map((o) => {
        const active = o.value === value;
        const Icon = o.icon;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={o.iconOnly ? o.label : undefined}
            title={o.iconOnly ? o.label : undefined}
            onClick={() => onChange(o.value)}
            className={cn(
              "relative flex h-9 flex-1 shrink-0 items-center justify-center gap-1.5 px-3 text-footnote font-medium whitespace-nowrap transition-colors duration-150",
              active ? "text-label" : "text-label-secondary hover:text-label",
            )}
          >
            {active && (
              <motion.span
                layoutId={`seg-${id}`}
                transition={reduce ? instant : spring.snappy}
                className="absolute inset-0 rounded-control bg-elevated-2 shadow-card"
              />
            )}
            {Icon && <Icon size={16} strokeWidth={1.5} className="relative" aria-hidden />}
            {!o.iconOnly && <span className="relative">{o.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
