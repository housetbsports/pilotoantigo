# Portal do influenciador · TB Sports

Protótipo **só visual**: sem banco, sem login de verdade e sem conexão com redes ou lojas.
Tudo o que aparece vem de `src/exemplo/dados.ts` e leva o selo cinza "Exemplo".

O visual é o mesmo do Assistente TB (cores, fontes, coluna lateral, componentes), copiado para cá.
Este projeto não depende do Assistente TB e não mexe nele.

## Duas áreas

**Influenciador** (`/painel`)
- Início: briefings em aberto, seguidores, engajamento e comissão.
- Meu perfil: dados por assunto (você, conteúdo, marcas, valores, recebimento), com quanto falta preencher.
- Redes sociais: conectar Instagram e TikTok (botão de exemplo) e ver as métricas.
- Briefings: lista e detalhe (aceitar, enviar conteúdo para aprovação).
- Vendas: o que o cupom vendeu e a comissão (lojas ainda não conectadas).

**Admin / equipe TB** (`/admin`)
- Início: cadastros incompletos e briefings em aberto.
- Influenciadores: lista, convite e a ficha de cada um (redes, o que preencheu, briefings, vendas).
- Briefings: lista, novo briefing (entregas e para quem vai) e acompanhamento de cada um.
- Vendas: todas as vendas por cupom.

Entrada: `/entrar` (escolhe "Sou influenciador" ou "Equipe TB") e `/cadastro` (cadastro em 4 passos).

## Rodar

```bash
npm install
npm run dev
```

## Onde mexer
- Campos do perfil e do cadastro: `src/lib/perfil-campos.ts` (campo novo = linha nova).
- Dados de exemplo: `src/exemplo/dados.ts`.
- Coluna lateral e menus: `src/components/frame/frame.tsx`.
- Cores e tamanhos: `src/styles/tokens.css`.
