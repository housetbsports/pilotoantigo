"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { SegmentedControl } from "@/components/ui/segmented";
import { applyTheme, readTheme, type ThemeChoice } from "@/lib/theme";

/** Claro, escuro ou automático (segue o aparelho). */
export function ThemePicker() {
  const [choice, setChoice] = useState<ThemeChoice>("light");
  useEffect(() => {
    const sync = () => setChoice(readTheme());
    sync();
    window.addEventListener("tema", sync);
    return () => window.removeEventListener("tema", sync);
  }, []);
  return (
    <SegmentedControl<ThemeChoice>
      label="Tema"
      value={choice}
      onChange={(c) => {
        setChoice(c);
        applyTheme(c);
      }}
      className="self-start"
      options={[
        { value: "light", label: "Claro", icon: Sun },
        { value: "dark", label: "Escuro", icon: Moon },
        { value: "system", label: "Automático", icon: Monitor },
      ]}
    />
  );
}

/** Botão pequeno da barra lateral: alterna entre claro e escuro. */
export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);
  // Só gira ao trocar pelo botão, não ao abrir a página.
  const [trocou, setTrocou] = useState(false);
  useEffect(() => {
    const sync = () => setDark(document.documentElement.getAttribute("data-theme") === "dark" || (!document.documentElement.hasAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches));
    sync();
    window.addEventListener("tema", sync);
    return () => window.removeEventListener("tema", sync);
  }, []);
  const Icon = dark ? Sun : Moon;
  const label = dark ? "Modo claro" : "Modo escuro";
  return (
    <button
      type="button"
      onClick={() => {
        setTrocou(true);
        applyTheme(dark ? "light" : "dark");
      }}
      aria-label={label}
      title={label}
      className={className}
    >
      <Icon size={16} strokeWidth={1.5} className={trocou ? "tema-icone" : undefined} aria-hidden />
    </button>
  );
}
