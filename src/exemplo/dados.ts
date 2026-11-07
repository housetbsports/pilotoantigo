/**
 * Dados de EXEMPLO. Não há banco nem conexão ainda: tudo aqui é só para ver o visual.
 * Toda tela que usa este arquivo mostra o selo cinza "Exemplo".
 * Quando o banco existir, cada função abaixo vira uma consulta e este arquivo sai.
 */

export type Rede = "instagram" | "tiktok";

export type SituacaoCadastro = "completo" | "faltando" | "convidado";

export interface Influenciador {
  slug: string;
  nome: string;
  arroba: string;
  nicho: string;
  cidade: string;
  situacao: SituacaoCadastro;
  /** Quanto do perfil já foi preenchido, de 0 a 100. */
  preenchido: number;
  redes: Partial<Record<Rede, { seguidores: number; engajamento: number; conectada: boolean }>>;
}

export type SituacaoBriefing = "novo" | "producao" | "revisao" | "aprovado";

export interface Briefing {
  id: string;
  marca: string;
  titulo: string;
  situacao: SituacaoBriefing;
  recebido: string;
  prazo: string;
  valor: number;
  objetivo: string;
  mensagem: string;
  fazer: string[];
  evitar: string[];
  hashtags: string[];
  entregas: { rede: Rede; formato: string; quantidade: number }[];
  influenciadores: string[];
}

export interface Post {
  id: string;
  rede: Rede;
  data: string;
  formato: "Reels" | "Carrossel" | "Foto" | "Vídeo";
  legenda: string;
  alcance: number;
  curtidas: number;
  comentarios: number;
}

export interface Venda {
  id: string;
  data: string;
  marca: string;
  cupom: string;
  pedidos: number;
  valor: number;
  comissao: number;
  influenciador: string;
}

export const situacaoCadastro: Record<SituacaoCadastro, string> = {
  completo: "Cadastro completo",
  faltando: "Faltando dados",
  convidado: "Convite enviado",
};

export const situacaoBriefing: Record<SituacaoBriefing, string> = {
  novo: "Novo",
  producao: "Em produção",
  revisao: "Em revisão",
  aprovado: "Aprovado",
};

export const nomeRede: Record<Rede, string> = { instagram: "Instagram", tiktok: "TikTok" };

export const influenciadores: Influenciador[] = [
  {
    slug: "marina-alves",
    nome: "Marina Alves",
    arroba: "@marina.alves",
    nicho: "Corrida e bem-estar",
    cidade: "São Paulo, SP",
    situacao: "completo",
    preenchido: 70,
    redes: {
      instagram: { seguidores: 184_300, engajamento: 4.2, conectada: true },
      tiktok: { seguidores: 92_100, engajamento: 7.8, conectada: true },
    },
  },
  {
    slug: "joao-pedro-lima",
    nome: "João Pedro Lima",
    arroba: "@jplima",
    nicho: "Skate e lifestyle",
    cidade: "Florianópolis, SC",
    situacao: "faltando",
    preenchido: 60,
    redes: {
      instagram: { seguidores: 56_800, engajamento: 6.1, conectada: true },
      tiktok: { seguidores: 0, engajamento: 0, conectada: false },
    },
  },
  {
    slug: "bia-santos",
    nome: "Bia Santos",
    arroba: "@biasantos.fit",
    nicho: "Treino funcional",
    cidade: "Rio de Janeiro, RJ",
    situacao: "completo",
    preenchido: 100,
    redes: {
      instagram: { seguidores: 312_000, engajamento: 3.4, conectada: true },
      tiktok: { seguidores: 410_500, engajamento: 9.2, conectada: true },
    },
  },
  {
    slug: "rafael-moura",
    nome: "Rafael Moura",
    arroba: "@rafamoura",
    nicho: "Futebol de várzea",
    cidade: "Belo Horizonte, MG",
    situacao: "convidado",
    preenchido: 0,
    redes: {},
  },
];

/** A pessoa que está "logada" na área do influenciador. */
export const eu = influenciadores[0];

export const briefings: Briefing[] = [
  {
    id: "b-101",
    marca: "Marca de tênis",
    titulo: "Lançamento do tênis de corrida",
    situacao: "novo",
    recebido: "2026-11-06",
    prazo: "2026-11-20",
    valor: 6500,
    objetivo: "Mostrar o tênis novo no treino de verdade, sem cara de anúncio.",
    mensagem: "Leveza para quem corre todo dia. O tênis aparece no treino, não na vitrine.",
    fazer: ["Gravar durante um treino real", "Mostrar o tênis nos primeiros 3 segundos", "Marcar a conta da marca e usar o cupom"],
    evitar: ["Falar de preço", "Citar outras marcas de tênis", "Usar música com direitos autorais"],
    hashtags: ["#publi", "#corridadiaria"],
    entregas: [
      { rede: "instagram", formato: "Reels", quantidade: 1 },
      { rede: "instagram", formato: "Stories (sequência de 3)", quantidade: 1 },
      { rede: "tiktok", formato: "Vídeo", quantidade: 1 },
    ],
    influenciadores: ["marina-alves", "bia-santos"],
  },
  {
    id: "b-097",
    marca: "Bebida isotônica",
    titulo: "Desafio dos 10 km",
    situacao: "producao",
    recebido: "2026-10-28",
    prazo: "2026-11-12",
    valor: 4200,
    objetivo: "Convidar o público para o desafio dos 10 km da marca.",
    mensagem: "Hidratação para ir mais longe.",
    fazer: ["Mostrar a bebida no fim do treino", "Explicar o desafio em uma frase"],
    evitar: ["Comparar com refrigerante"],
    hashtags: ["#publi", "#desafio10k"],
    entregas: [
      { rede: "instagram", formato: "Carrossel", quantidade: 1 },
      { rede: "tiktok", formato: "Vídeo", quantidade: 2 },
    ],
    influenciadores: ["marina-alves"],
  },
  {
    id: "b-089",
    marca: "App de treino",
    titulo: "Treino de 7 dias",
    situacao: "revisao",
    recebido: "2026-10-15",
    prazo: "2026-11-01",
    valor: 3000,
    objetivo: "Mostrar a primeira semana usando o app.",
    mensagem: "Seu treino no bolso.",
    fazer: ["Mostrar a tela do app", "Contar como foi o dia 7"],
    evitar: ["Prometer resultado de peso"],
    hashtags: ["#publi"],
    entregas: [{ rede: "instagram", formato: "Reels", quantidade: 1 }],
    influenciadores: ["marina-alves", "joao-pedro-lima"],
  },
  {
    id: "b-072",
    marca: "Marca de roupa esportiva",
    titulo: "Coleção de inverno",
    situacao: "aprovado",
    recebido: "2026-09-20",
    prazo: "2026-10-05",
    valor: 5500,
    objetivo: "Apresentar três peças da coleção.",
    mensagem: "Frio não é desculpa.",
    fazer: ["Um look por peça"],
    evitar: ["Fundo de estúdio"],
    hashtags: ["#publi"],
    entregas: [{ rede: "instagram", formato: "Carrossel", quantidade: 1 }],
    influenciadores: ["marina-alves", "bia-santos"],
  },
];

export const posts: Post[] = [
  { id: "p1", rede: "instagram", data: "2026-11-05", formato: "Reels", legenda: "Treino de tiro na pista, 8 × 400 m", alcance: 96_400, curtidas: 7_820, comentarios: 312 },
  { id: "p2", rede: "instagram", data: "2026-11-02", formato: "Carrossel", legenda: "O que eu como antes de correr", alcance: 61_200, curtidas: 4_105, comentarios: 198 },
  { id: "p3", rede: "instagram", data: "2026-10-29", formato: "Foto", legenda: "Domingo de longão", alcance: 38_900, curtidas: 2_980, comentarios: 87 },
  { id: "p4", rede: "instagram", data: "2026-10-25", formato: "Reels", legenda: "3 erros de quem está começando", alcance: 142_700, curtidas: 11_450, comentarios: 604 },
  { id: "p5", rede: "tiktok", data: "2026-11-06", formato: "Vídeo", legenda: "Respondendo: quanto tempo para correr 5 km?", alcance: 210_300, curtidas: 18_900, comentarios: 1_120 },
  { id: "p6", rede: "tiktok", data: "2026-11-01", formato: "Vídeo", legenda: "Meu aquecimento de 5 minutos", alcance: 88_400, curtidas: 7_210, comentarios: 340 },
  { id: "p7", rede: "tiktok", data: "2026-10-27", formato: "Vídeo", legenda: "Corri 21 km pela primeira vez", alcance: 154_000, curtidas: 15_300, comentarios: 980 },
];

/** Crescimento de seguidores nas últimas 8 semanas (para o gráfico). */
export const crescimento: Record<Rede, number[]> = {
  instagram: [171_200, 172_900, 174_100, 176_400, 178_000, 179_900, 182_200, 184_300],
  tiktok: [78_300, 80_100, 82_900, 84_000, 86_700, 88_200, 90_400, 92_100],
};

export const vendas: Venda[] = [
  { id: "v1", data: "2026-11-06", marca: "Marca de tênis", cupom: "MARINA10", pedidos: 42, valor: 16_380, comissao: 1_638, influenciador: "marina-alves" },
  { id: "v2", data: "2026-11-03", marca: "Bebida isotônica", cupom: "MARINA10K", pedidos: 118, valor: 5_310, comissao: 531, influenciador: "marina-alves" },
  { id: "v3", data: "2026-10-30", marca: "App de treino", cupom: "MARINA7", pedidos: 64, valor: 3_136, comissao: 627.2, influenciador: "marina-alves" },
  { id: "v4", data: "2026-10-22", marca: "Marca de roupa esportiva", cupom: "MARINAINVERNO", pedidos: 27, valor: 8_910, comissao: 891, influenciador: "marina-alves" },
  { id: "v5", data: "2026-11-04", marca: "Marca de tênis", cupom: "BIA10", pedidos: 77, valor: 30_030, comissao: 3_003, influenciador: "bia-santos" },
  { id: "v6", data: "2026-10-31", marca: "App de treino", cupom: "JP7", pedidos: 12, valor: 588, comissao: 117.6, influenciador: "joao-pedro-lima" },
];

export function influenciadorPorSlug(slug: string) {
  return influenciadores.find((i) => i.slug === slug) ?? null;
}

export function briefingPorId(id: string) {
  return briefings.find((b) => b.id === id) ?? null;
}

export function briefingsDe(slug: string) {
  return briefings.filter((b) => b.influenciadores.includes(slug));
}

export function vendasDe(slug: string) {
  return vendas.filter((v) => v.influenciador === slug);
}
