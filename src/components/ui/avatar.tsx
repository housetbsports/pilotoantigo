/* eslint-disable @next/next/no-img-element */
import { initials } from "@/lib/format";
import { cn } from "@/lib/cn";

const sizes = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-caption",
  md: "size-10 text-footnote",
  lg: "size-14 text-callout",
  xl: "size-24 text-title-2 md:size-32 md:text-title-1",
};

export function Avatar({
  name,
  src,
  size = "md",
  shape = "circle",
  className,
}: {
  name: string;
  src?: string | null;
  size?: keyof typeof sizes;
  shape?: "circle" | "rounded";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-fill-secondary font-medium text-label-secondary select-none",
        shape === "circle" ? "rounded-full" : size === "xl" ? "rounded-card-lg" : "rounded-control",
        sizes[size],
        className,
      )}
      aria-hidden={!src}
    >
      {src ? <img src={src} alt={name} className="size-full object-cover" /> : initials(name)}
    </span>
  );
}
