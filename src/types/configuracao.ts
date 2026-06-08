export type Configuracao = {
  notificacoes: boolean;
  modoEscuro: boolean;
};

export type LocalEsportivo = {
  id: string;
  nome: string;
  endereco: string;
  tipo: "quadra" | "campo" | "society";
  latitude: number;
  longitude: number;
  distanciaKm?: number;
};
