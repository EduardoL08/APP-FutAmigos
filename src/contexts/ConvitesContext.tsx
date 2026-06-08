import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Convite, StatusConvite } from "../types/convite";

const CONVITES_MOCK: Convite[] = [
  {
    id: 1,
    partidaId: 3,
    usuarioId: 1,
    convidadoPorId: 3,
    convidadoPorNome: "Rafael Souza",
    convidadoPorFoto: "https://i.pravatar.cc/80?img=11",
    partidaTitulo: "Pelada dos Amigos",
    partidaLocal: "Campo do Bairro",
    partidaData: "16/06/2026",
    partidaHorario: "18:00",
    partidaPreco: 10,
    status: "pendente",
    criadoEm: Date.now() - 1000 * 60 * 30,
  },
  {
    id: 2,
    partidaId: 8,
    usuarioId: 1,
    convidadoPorId: 7,
    convidadoPorNome: "Guilherme Faria",
    convidadoPorFoto: "https://i.pravatar.cc/80?img=17",
    partidaTitulo: "Fut dos Veteranos",
    partidaLocal: "Quadra Betim",
    partidaData: "21/06/2026",
    partidaHorario: "09:00",
    partidaPreco: 10,
    status: "pendente",
    criadoEm: Date.now() - 1000 * 60 * 60 * 2,
  },
];

type ConvitesContextType = {
  convites: Convite[];
  convitesPendentes: Convite[];
  totalPendentes: number;
  aceitarConvite: (conviteId: number) => void;
  recusarConvite: (conviteId: number) => void;
  enviarConvite: (convite: Omit<Convite, "id" | "status" | "criadoEm">) => void;
};

const ConvitesContext = createContext<ConvitesContextType>(
  {} as ConvitesContextType,
);

export function ConvitesProvider({ children }: { children: ReactNode }) {
  const [convites, setConvites] = useState<Convite[]>(CONVITES_MOCK);

  const convitesPendentes = convites.filter(
    (c) => c.status === "pendente" && c.usuarioId === 1,
  );

  const totalPendentes = convitesPendentes.length;

  const aceitarConvite = useCallback((conviteId: number) => {
    setConvites((prev) =>
      prev.map((c) =>
        c.id === conviteId ? { ...c, status: "aceito" as StatusConvite } : c,
      ),
    );
  }, []);

  const recusarConvite = useCallback((conviteId: number) => {
    setConvites((prev) =>
      prev.map((c) =>
        c.id === conviteId ? { ...c, status: "recusado" as StatusConvite } : c,
      ),
    );
  }, []);

  const enviarConvite = useCallback(
    (dados: Omit<Convite, "id" | "status" | "criadoEm">) => {
      setConvites((prev) => [
        ...prev,
        {
          ...dados,
          id: Date.now(),
          status: "pendente",
          criadoEm: Date.now(),
        },
      ]);
    },
    [],
  );

  return (
    <ConvitesContext.Provider
      value={{
        convites,
        convitesPendentes,
        totalPendentes,
        aceitarConvite,
        recusarConvite,
        enviarConvite,
      }}
    >
      {children}
    </ConvitesContext.Provider>
  );
}

export function useConvites() {
  return useContext(ConvitesContext);
}
