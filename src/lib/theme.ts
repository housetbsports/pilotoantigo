/**
 * Tema da plataforma: claro (padrão), escuro ou automático (segue o aparelho). Fica guardado no navegador.
 * O script THEME_SCRIPT roda antes da página aparecer, para não piscar o tema errado.
 */
export type ThemeChoice = "light" | "dark" | "system";

export const THEME_KEY = "tema";

export const THEME_SCRIPT = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t);else if(t==="system")document.documentElement.removeAttribute("data-theme")}catch(e){}`;

export function readTheme(): ThemeChoice {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === "dark" || t === "system" ? t : "light";
  } catch {
    return "light";
  }
}

export function applyTheme(choice: ThemeChoice) {
  try {
    localStorage.setItem(THEME_KEY, choice);
  } catch {
    // Sem armazenamento (janela anônima): vale só nesta visita.
  }
  const root = document.documentElement;
  const troca = () => {
    if (choice === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", choice);
    window.dispatchEvent(new CustomEvent("tema", { detail: choice }));
  };
  // Troca suave: a página nova aparece sobre a antiga (movimento.css › .tema-trocando).
  // Sem suporte do navegador ou com "reduzir movimento", troca na hora, sem piscar.
  const parado = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (parado || typeof document.startViewTransition !== "function") return troca();
  root.classList.add("tema-trocando");
  const transicao = document.startViewTransition(troca);
  transicao.finished.finally(() => root.classList.remove("tema-trocando"));
}

/** O tema que está valendo agora (automático vira claro ou escuro conforme o aparelho). */
export function effectiveTheme(choice: ThemeChoice): "light" | "dark" {
  if (choice !== "system") return choice;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
