export type jogos = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  local: string;
  data: string;
  horario: string;
  jogadores: number;
  participando: boolean;
  vagas: number;
  status: "organizador" | "participando" | "conviteRecebido" | "entrar";
  latitude: number;
  longitude: number;
};
export const peladas: jogos[] = [
  {
    id: 1,
    titulo: "fut Bebados",
    descricao: "Pelada dos bebados",
    preco: 15,
    local: "floresta",
    data: "023/05/2026",
    horario: "19:30",
    jogadores: 24,
    participando: true,
    vagas: 2,
    status: "participando",
    latitude: -19.9375,
    longitude: -43.9375,
  },

  {
    id: 2,
    titulo: "Pelada dos Amigos",
    descricao: "Jogo descontraído entre amigos",
    preco: 10,
    local: "Bairro Funcionários",
    data: "01/05/2026",
    horario: "18:00",
    jogadores: 14,
    participando: false,
    vagas: 1,
    status: "entrar",
    latitude: -19.9275,
    longitude: -43.9375,
  },

  {
    id: 3,
    titulo: "Futebol society Pampulha",
    descricao: "Pelada aberta para todos",
    preco: 15,
    local: "Pampulha",
    data: "01/05/2026",
    horario: "19:00",
    jogadores: 10,
    participando: false,
    vagas: 2,
    status: "conviteRecebido",
    latitude: -19.9375,
    longitude: -43.9375,
  },

  {
    id: 4,
    titulo: "Pelada BH",
    descricao: "Jogo 7x7",
    preco: 20,
    local: "Centro",
    data: "30/04/2026",
    horario: "18:00",
    jogadores: 14,
    participando: false,
    vagas: 2,
    status: "entrar",
    latitude: -19.9167,
    longitude: -43.9345,
  },

  {
    id: 5,
    titulo: "Pelada noturna Savassi",
    descricao: "Jogo 5x5 com iluminação",
    preco: 10,
    local: "Savassi",
    data: "02/05/2026",
    horario: "20:00",
    jogadores: 10,
    participando: true,
    vagas: 0,
    status: "participando",
    latitude: -19.9375,
    longitude: -43.9375,
  },
  {
    id: 6,
    titulo: "Futebol bairro Lourdes",
    descricao: "Pelada recreativa",
    preco: 12,
    local: "Lourdes",
    data: "03/05/2026",
    horario: "17:00",
    jogadores: 12,
    participando: false,
    vagas: 6,
    status: "conviteRecebido",
    latitude: -19.9295,
    longitude: -43.9375,
  },
  {
    id: 7,
    titulo: "Pelada BH",
    descricao: "Jogo 7x7",
    preco: 20,
    local: "Centro",
    data: "30/04/2026",
    horario: "18:00",
    jogadores: 14,
    participando: true,
    vagas: 2,
    status: "organizador",
    latitude: -19.9167,
    longitude: -43.9345,
  },
  {
    id: 8,
    titulo: "Pelada Pampulha",
    descricao: "Jogo 5x5 com iluminação",
    preco: 10,
    local: "Pampulha",
    data: "02/05/2026",
    horario: "20:00",
    jogadores: 14,
    participando: false,
    vagas: 3,
    status: "entrar",
    latitude: -19.9375,
    longitude: -43.9375,
  },
];
