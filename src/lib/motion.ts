import type { Transition } from "framer-motion";

/** Molas do Framer Motion. Equivalente CSS: --ease-spring em src/styles/tokens.css. */
export const spring = {
  /** Toques, hovers, troca de seleção. */
  snappy: { type: "spring", stiffness: 500, damping: 38, mass: 0.8 },
  /** Entrada de cards e conteúdo. */
  gentle: { type: "spring", stiffness: 300, damping: 32 },
  /** Painéis deslizantes (assistente, folhas). */
  panel: { type: "spring", stiffness: 380, damping: 40 },
} satisfies Record<string, Transition>;

/** Para prefers-reduced-motion: substitui qualquer mola por transição instantânea. */
export const instant: Transition = { duration: 0 };
