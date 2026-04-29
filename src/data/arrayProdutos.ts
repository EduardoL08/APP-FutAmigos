export type produto = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  local: string;
  data: string;
  horario: string;
  jogadores: number;
  participando: boolean
  vagas: number;
  status: "organizador" | "confirmado" | "pendente"; 
  latitude?: number;
  longitude?: number;
  estouParticipando: true
  
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
    participando: true,
    vagas: 4,
    status: "organizador",
    latitude: -19.9375,
    longitude: -43.9375,
    estouParticipando: true

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
    participando: false,
    vagas: 2,
    status: "pendente",
    latitude: -19.9375,
    longitude: -43.9375,
    estouParticipando: true
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
    participando: true,
    vagas: 0,
    status: "confirmado",
    latitude: -19.9375,
    longitude: -43.9375,
    estouParticipando: true
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
    participando: false,
    vagas: 6,
    status: "pendente",
    latitude: -19.9295,
    longitude: -43.9375,
    estouParticipando: true
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
  participando: true,
  vagas: 2,
  status: "organizador",
  latitude: -19.9167,
  longitude: -43.9345,
  estouParticipando: true
}
];
