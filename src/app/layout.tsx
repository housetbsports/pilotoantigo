import type { Metadata } from "next";
import "@/app/globals.css";
import { THEME_SCRIPT } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Portal do influenciador · TB Sports",
  description: "Cadastro, redes, briefings e vendas dos influenciadores da TB Sports",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // O tema escolhido é aplicado pelo script antes da página aparecer (mesmo esquema do Assistente TB).
    <html lang="pt-BR" data-theme="light" className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
