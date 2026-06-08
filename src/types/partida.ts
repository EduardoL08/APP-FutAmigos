export type Partida = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  local: string;
  data: string;
  horario: string;
  jogadores: number;  
  vagas: number;     
  participando: boolean;
  status: "organizador" | "participando" | "conviteRecebido" | "entrar";
  criadorId: number;
  latitude?: number;
  longitude?: number;
};
