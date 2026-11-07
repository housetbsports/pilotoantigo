/**
 * Campos que o influenciador preenche, por assunto.
 * É a mesma ideia da lista única de perguntas do Assistente TB: o cadastro e o "Meu perfil"
 * leem daqui, então campo novo = linha nova aqui.
 */

export type TipoCampo = "texto" | "longo" | "email" | "telefone" | "data" | "escolha" | "varios" | "dinheiro";

export interface Campo {
  chave: string;
  rotulo: string;
  tipo: TipoCampo;
  dica?: string;
  opcoes?: string[];
  obrigatorio?: boolean;
  /** Ocupa a linha toda no formulário. */
  largo?: boolean;
  /** Dado sensível: só a equipe TB vê. */
  sensivel?: boolean;
}

export interface Assunto {
  chave: string;
  titulo: string;
  descricao: string;
  campos: Campo[];
}

export const assuntos: Assunto[] = [
  {
    chave: "voce",
    titulo: "Você",
    descricao: "Quem é você e como falar com você.",
    campos: [
      { chave: "nome", rotulo: "Nome completo", tipo: "texto", obrigatorio: true },
      { chave: "nome_artistico", rotulo: "Como você é conhecido", tipo: "texto", dica: "O nome que aparece nas redes" },
      { chave: "email", rotulo: "E-mail", tipo: "email", obrigatorio: true },
      { chave: "celular", rotulo: "Celular (WhatsApp)", tipo: "telefone", obrigatorio: true },
      { chave: "nascimento", rotulo: "Data de nascimento", tipo: "data", sensivel: true },
      { chave: "cidade", rotulo: "Cidade e estado", tipo: "texto", dica: "São Paulo, SP" },
    ],
  },
  {
    chave: "conteudo",
    titulo: "Seu conteúdo",
    descricao: "Sobre o que você fala e para quem.",
    campos: [
      {
        chave: "nichos",
        rotulo: "Sobre o que você fala",
        tipo: "varios",
        largo: true,
        opcoes: ["Corrida", "Futebol", "Skate", "Surf", "Treino", "Nutrição", "Bem-estar", "Moda esportiva", "Viagem", "Humor", "Família", "Games"],
      },
      { chave: "bio", rotulo: "Conte em poucas linhas quem você é", tipo: "longo", largo: true, dica: "Como você se apresentaria para uma marca" },
      { chave: "publico", rotulo: "Quem te acompanha", tipo: "longo", largo: true, dica: "Idade, cidade, o que essas pessoas gostam" },
      { chave: "formatos", rotulo: "Formatos que você mais faz", tipo: "varios", largo: true, opcoes: ["Reels", "Stories", "Carrossel", "Foto", "Vídeo no TikTok", "Live"] },
    ],
  },
  {
    chave: "marcas",
    titulo: "Marcas",
    descricao: "Com quem você já trabalhou e o que não faz.",
    campos: [
      { chave: "marcas_anteriores", rotulo: "Marcas com quem já trabalhou", tipo: "longo", largo: true },
      { chave: "nao_faz", rotulo: "O que você não divulga", tipo: "longo", largo: true, dica: "Bebida alcoólica, apostas, cigarro eletrônico…" },
      { chave: "exclusividade", rotulo: "Tem contrato de exclusividade hoje?", tipo: "escolha", opcoes: ["Não", "Sim"] },
    ],
  },
  {
    chave: "valores",
    titulo: "Valores",
    descricao: "Quanto você cobra por formato. Só a equipe TB vê.",
    campos: [
      { chave: "valor_reels", rotulo: "Reels", tipo: "dinheiro", sensivel: true },
      { chave: "valor_stories", rotulo: "Sequência de stories", tipo: "dinheiro", sensivel: true },
      { chave: "valor_carrossel", rotulo: "Carrossel", tipo: "dinheiro", sensivel: true },
      { chave: "valor_tiktok", rotulo: "Vídeo no TikTok", tipo: "dinheiro", sensivel: true },
    ],
  },
  {
    chave: "recebimento",
    titulo: "Recebimento",
    descricao: "Para onde vão os pagamentos. Só a equipe TB vê.",
    campos: [
      { chave: "pessoa", rotulo: "Você recebe como", tipo: "escolha", opcoes: ["Pessoa física", "Empresa (CNPJ)"], obrigatorio: true },
      { chave: "documento", rotulo: "CPF ou CNPJ", tipo: "texto", sensivel: true, obrigatorio: true },
      { chave: "pix", rotulo: "Chave Pix", tipo: "texto", sensivel: true },
      { chave: "banco", rotulo: "Banco, agência e conta", tipo: "texto", sensivel: true, largo: true },
    ],
  },
];

/** Respostas de exemplo da influenciadora "logada" (para o "Meu perfil" não abrir vazio). */
export const respostasExemplo: Record<string, string | string[]> = {
  nome: "Marina Alves",
  nome_artistico: "Marina Alves",
  email: "marina@exemplo.com",
  celular: "(11) 90000-0000",
  cidade: "São Paulo, SP",
  nichos: ["Corrida", "Bem-estar", "Treino"],
  bio: "Corredora amadora há 6 anos. Mostro a rotina de treino de quem trabalha e corre, sem fórmula mágica.",
  publico: "Mulheres de 25 a 40 anos, a maioria em São Paulo e no Rio, começando a correr.",
  formatos: ["Reels", "Stories", "Vídeo no TikTok"],
  exclusividade: "Não",
  pessoa: "Empresa (CNPJ)",
};
