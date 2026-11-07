/** Simulação do logo TB: círculo laranja com retângulo preto preenchido. Trocar pelo arquivo oficial quando houver. */
export function BrandMark({ wordmark = true }: { wordmark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative flex size-7 shrink-0 items-center justify-center rounded-full bg-accent" aria-hidden>
        <span className="h-[7px] w-[15px] bg-black" />
        <span className="absolute top-[7px] right-[4px] text-[5px] leading-none font-bold text-black">TB</span>
      </span>
      {wordmark && <span className="font-serif text-[22px] leading-none tracking-[-0.01em]">TB Sports</span>}
    </span>
  );
}
