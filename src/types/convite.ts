export type StatusConvite = "pendente" | "aceito" | "recusado";

export type Convite = {
  id: number;
  partidaId: number;
  usuarioId: number;         
  convidadoPorId: number;    
  convidadoPorNome: string;
  convidadoPorFoto: string;
  partidaTitulo: string;
  partidaLocal: string;
  partidaData: string;
  partidaHorario: string;
  partidaPreco: number;
  status: StatusConvite;
  criadoEm: number;        
};
