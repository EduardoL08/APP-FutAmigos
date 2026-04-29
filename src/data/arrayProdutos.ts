export type produto = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  local: string;
  data: string;
  horario: string;
  jogadores: number;
  vagas: number;
  nivel: "Iniciante" | "Intermediário" | "Avançado";
  latitude?: number;
  longitude?: number;
  
}

export const peladas: produto[] = [
  {
    id: 1,
    titulo: "Pelada no Mineirão",
    descricao: "Jogo amistoso 7x7",
    preco: 20,
    local: "Mineirão",
    data: "30/04/2026",
    horario: "18:00",
    jogadores: 14,
    vagas: 4,
    nivel: "Intermediário",
  },
  {
    id: 2,
    titulo: "Futebol society Pampulha",
    descricao: "Pelada aberta para todos",
    preco: 15,
    local: "Pampulha",
    data: "01/05/2026",
    horario: "19:00",
    jogadores: 10,
    vagas: 2,
    nivel: "Iniciante",
  },
  {
    id: 3,
    titulo: "Pelada noturna Savassi",
    descricao: "Jogo 5x5 com iluminação",
    preco: 10,
    local: "Savassi",
    data: "02/05/2026",
    horario: "20:00",
    jogadores: 10,
    vagas: 0,
    nivel: "Avançado",
    latitude: -19.9375,
    longitude: -43.9375,
  },
  {
    id: 4,
    titulo: "Futebol bairro Lourdes",
    descricao: "Pelada recreativa",
    preco: 12,
    local: "Lourdes",
    data: "03/05/2026",
    horario: "17:00",
    jogadores: 12,
    vagas: 6,
    nivel: "Iniciante",
    latitude: -19.9295,
    longitude: -43.9375,
  },
  {
  id: 1,
    titulo: "Pelada BH",
    descricao: "Jogo 7x7",
    preco: 20,
    local: "Centro",
    data: "30/04/2026",
  horario: "18:00",
  jogadores: 14,
  vagas: 2,
  nivel: "Intermediário",
  latitude: -19.9167,
  longitude: -43.9345,
}
];
