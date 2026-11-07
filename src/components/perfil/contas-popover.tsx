"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link2 } from "lucide-react";
import { ConectarRedes } from "@/components/perfil/conectar-redes";
import { instant, spring } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { Rede } from "@/exemplo/dados";

type Contas = Partial<Record<Rede, { seguidores: number; engajamento: number; conectada: boolean }>>;

/**
 * Ícone discreto com as redes conectadas: clicar abre uma janelinha com as contas
 * (conectar e desconectar ficam lá dentro). Fecha ao clicar fora ou com Esc.
 */
export function ContasPopover({ contas }: { contas: Contas }) {
  const reduce = useReducedMotion();
  const [aberto, setAberto] = useState(false);
  const caixa = useRef<HTMLDivElement>(null);
  const conectadas = (["instagram", "tiktok"] as const).filter((r) => contas[r]?.conectada).length;

  useEffect(() => {
    if (!aberto) return;
    const fora = (e: PointerEvent) => {
      if (!caixa.current?.contains(e.target as Node)) setAberto(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    document.addEventListener("pointerdown", fora);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", fora);
      document.removeEventListener("keydown", esc);
    };
  }, [aberto]);

  return (
    <div ref={caixa} className="relative">
      <button
        type="button"
        onClick={() => setAberto((a) => !a)}
        aria-expanded={aberto}
        aria-haspopup="dialog"
        title="Contas conectadas"
        className={cn(
          "flex h-9 items-center gap-2 rounded-control px-2.5 text-footnote text-label-secondary transition-colors hover:bg-fill-tertiary hover:text-label",
          aberto && "bg-fill-tertiary text-label",
        )}
      >
        <span className="relative">
          <Link2 size={18} strokeWidth={1.5} aria-hidden />
          {conectadas > 0 && <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-live ring-2 ring-bg" aria-hidden />}
        </span>
        <span className="tabular-nums">
          {conectadas} de 2 <span className="sr-only">redes conectadas</span>
        </span>
      </button>

      <AnimatePresence>
        {aberto && (
          <motion.div
            role="dialog"
            aria-label="Contas conectadas"
            initial={reduce ? false : { opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -4, scale: 0.98 }}
            transition={reduce ? instant : spring.snappy}
            className="absolute right-0 z-20 mt-2 flex w-[min(92vw,420px)] origin-top-right flex-col gap-2 rounded-card-lg bg-elevated-2 p-2 shadow-panel"
          >
            <p className="px-2 pt-1 text-caption text-label-secondary">Contas conectadas</p>
            <ConectarRedes inicial={contas} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
