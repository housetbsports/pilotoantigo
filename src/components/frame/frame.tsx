"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ClipboardList,
  House,
  LogOut,
  PanelLeft,
  Plus,
  Search,
  Share2,
  ShoppingBag,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { ThemeToggle } from "@/components/theme-picker";
import { Avatar } from "@/components/ui/avatar";
import { instant, spring } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { eu, influenciadores } from "@/exemplo/dados";

export type Area = "influenciador" | "admin";

interface MenuItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const menus: Record<Area, MenuItem[]> = {
  influenciador: [
    { href: "/painel", label: "Início", icon: House },
    { href: "/painel/perfil", label: "Meu perfil", icon: UserRound },
    { href: "/painel/redes", label: "Redes sociais", icon: Share2 },
    { href: "/painel/briefings", label: "Briefings", icon: ClipboardList },
    { href: "/painel/vendas", label: "Vendas", icon: ShoppingBag },
  ],
  admin: [
    { href: "/admin", label: "Início", icon: House },
    { href: "/admin/influenciadores", label: "Influenciadores", icon: Users },
    { href: "/admin/briefings", label: "Briefings", icon: ClipboardList },
    { href: "/admin/vendas", label: "Vendas", icon: ShoppingBag },
  ],
};

const normalize = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

/**
 * Moldura no formato do Assistente TB: coluna fixa à esquerda e o conteúdo à direita.
 * No celular, a coluna vira um painel que abre pelo botão do topo.
 */
export function Frame({ area, children }: { area: Area; children: React.ReactNode }) {
  const [sheet, setSheet] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();

  // Fecha o painel no celular ao trocar de tela.
  // eslint-disable-next-line react-hooks/set-state-in-effect -- reação à navegação
  useEffect(() => setSheet(false), [pathname]);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[var(--sidebar-width)] border-r border-separator bg-bg lg:block">
        <Rail area={area} />
      </aside>

      <header className="material-bar sticky top-0 z-30 flex h-12 items-center gap-3 border-b border-separator px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setSheet(true)}
          aria-label="Abrir painel"
          className="-ml-1 flex size-8 items-center justify-center rounded-control text-label-secondary hover:bg-fill-tertiary"
        >
          <PanelLeft size={20} strokeWidth={1.5} aria-hidden />
        </button>
        <BrandMark />
      </header>

      <AnimatePresence>
        {sheet && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduce ? instant : { duration: 0.2 }}
              onClick={() => setSheet(false)}
              className="fixed inset-0 z-40 bg-black/25 lg:hidden"
              aria-hidden
            />
            <motion.aside
              key="sheet"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={reduce ? instant : spring.panel}
              className="fixed inset-y-0 left-0 z-50 w-[min(88vw,360px)] bg-bg shadow-panel lg:hidden"
              aria-label="Painel"
            >
              <Rail area={area} onNavigate={() => setSheet(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="right-pane flex min-h-[calc(100dvh-48px)] flex-col bg-elevated lg:min-h-dvh lg:pl-[var(--sidebar-width)]">
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}

function Rail({ area, onNavigate }: { area: Area; onNavigate?: () => void }) {
  const pathname = usePathname();
  const menu = menus[area];
  const home = menu[0].href;

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link href={home} onClick={onNavigate} aria-label="Início">
          <BrandMark />
        </Link>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-2 pb-6">
        <div className="flex flex-col gap-8">
          {area === "influenciador" && (
            <div className="-mx-2 flex items-center gap-3 px-2 py-2">
              <Avatar name={eu.nome} size="md" />
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-serif text-[21px] leading-tight">{eu.nome}</span>
                <span className="truncate text-footnote text-label-secondary">{eu.arroba}</span>
              </div>
            </div>
          )}

          <nav aria-label="Menu" className="-mx-2 flex flex-col gap-0.5">
            {menu.map((m) => {
              const active = m.href === home ? pathname === home : pathname.startsWith(m.href);
              return (
                <Link
                  key={m.href}
                  href={m.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative isolate flex h-10 items-center gap-3 rounded-control px-2 text-subheadline transition-colors",
                    active ? "font-medium" : "hover:bg-fill-tertiary",
                  )}
                >
                  {active && (
                    <motion.span layoutId={`menu-${area}`} transition={spring.snappy} className="absolute inset-0 -z-10 rounded-control bg-elevated shadow-card" aria-hidden />
                  )}
                  <m.icon size={18} strokeWidth={1.5} className={cn("transition-colors", active ? "text-accent" : "text-label-secondary")} aria-hidden />
                  {m.label}
                </Link>
              );
            })}
          </nav>

          {area === "admin" && <InfluencerList onNavigate={onNavigate} />}
        </div>
      </div>

      <div className="flex h-12 shrink-0 items-center gap-1 px-6">
        <span className="-ml-1.5 flex-1 truncate text-caption text-label-tertiary">
          {area === "admin" ? "Acesso da equipe TB" : "Acesso do influenciador"}
        </span>
        <ThemeToggle className="flex size-8 items-center justify-center rounded-control text-label-tertiary transition-colors hover:bg-fill-tertiary hover:text-label-secondary" />
        <Link
          href="/entrar"
          aria-label="Sair"
          title="Sair"
          className="flex size-8 items-center justify-center rounded-control text-label-tertiary transition-colors hover:bg-fill-tertiary hover:text-label-secondary"
        >
          <LogOut size={16} strokeWidth={1.5} aria-hidden />
        </Link>
      </div>
    </div>
  );
}

/** Lista de influenciadores na coluna do admin, como a lista de atletas do Assistente TB. */
function InfluencerList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const visible = influenciadores.filter((i) => normalize(`${i.nome} ${i.arroba} ${i.nicho}`).includes(normalize(query.trim())));
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-subheadline text-label-secondary">
          Influenciadores <span className="text-caption text-label-tertiary tabular-nums">{influenciadores.length}</span>
        </span>
        <Link
          href="/admin/influenciadores/convidar"
          onClick={onNavigate}
          className="flex h-7 items-center gap-1 rounded-control px-2 text-footnote text-label-secondary hover:bg-fill-tertiary hover:text-label"
        >
          <Plus size={14} strokeWidth={1.75} aria-hidden />
          Convidar
        </Link>
      </div>
      <label className="relative flex h-9 items-center">
        <Search size={15} strokeWidth={1.5} className="pointer-events-none absolute left-3 text-label-tertiary" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar influenciador"
          aria-label="Buscar influenciador"
          className="h-full w-full rounded-control bg-fill-tertiary pr-3 pl-8 text-subheadline placeholder:text-label-tertiary focus:bg-elevated focus:shadow-[0_0_0_3px_var(--accent-soft)] focus:outline-none"
        />
      </label>
      <ul className="-mx-2 flex flex-col">
        {visible.map((i) => {
          const href = `/admin/influenciadores/${i.slug}`;
          const active = pathname === href;
          return (
            <li key={i.slug}>
              <Link
                href={href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn("flex items-center gap-3 rounded-control px-2 py-2 transition-colors", active ? "bg-elevated shadow-card" : "hover:bg-fill-tertiary")}
              >
                <Avatar name={i.nome} size="sm" />
                <span className="min-w-0 flex-1 truncate text-subheadline">{i.nome}</span>
                {i.situacao !== "completo" && <span className="size-1.5 shrink-0 rounded-full bg-accent" title="Cadastro incompleto" aria-hidden />}
              </Link>
            </li>
          );
        })}
        {visible.length === 0 && <li className="px-2 py-2 text-footnote text-label-tertiary">Ninguém com esse nome.</li>}
      </ul>
    </section>
  );
}
