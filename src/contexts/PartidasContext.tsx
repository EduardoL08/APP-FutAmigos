import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { Partida } from "../types/partida";
import { Participante } from "../types/participante";
import { partidasMock } from "../data/partidasMock";
import { getDB } from "../../app/database";
import {
  listarPartidas,
  criarPartida,
  deletarPartida,
  atualizarPartida as atualizarPartidaDB,
} from "../repository/partidasRepo";

const participantesMockInicial: Participante[] = [
  {
    id: 1,
    usuarioId: 1,
    partidaId: 1,
    nome: "Jogador Demo",
    foto: "https://i.pravatar.cc/80?img=8",
  },
  {
    id: 2,
    usuarioId: 99,
    partidaId: 1,
    nome: "Carlos Silva",
    foto: "https://i.pravatar.cc/80?img=3",
  },
  {
    id: 3,
    usuarioId: 98,
    partidaId: 1,
    nome: "Ana Paula",
    foto: "https://i.pravatar.cc/80?img=5",
  },
  {
    id: 4,
    usuarioId: 97,
    partidaId: 1,
    nome: "Marcos Freitas",
    foto: "https://i.pravatar.cc/80?img=12",
  },
  {
    id: 5,
    usuarioId: 1,
    partidaId: 5,
    nome: "Jogador Demo",
    foto: "https://i.pravatar.cc/80?img=8",
  },
  {
    id: 6,
    usuarioId: 96,
    partidaId: 5,
    nome: "Beatriz Lopes",
    foto: "https://i.pravatar.cc/80?img=9",
  },
  {
    id: 7,
    usuarioId: 95,
    partidaId: 5,
    nome: "Pedro Henrique",
    foto: "https://i.pravatar.cc/80?img=15",
  },
  {
    id: 8,
    usuarioId: 1,
    partidaId: 7,
    nome: "Jogador Demo",
    foto: "https://i.pravatar.cc/80?img=8",
  },
  {
    id: 9,
    usuarioId: 94,
    partidaId: 7,
    nome: "Lucas Mendes",
    foto: "https://i.pravatar.cc/80?img=20",
  },
];

type PartidasContextType = {
  partidas: Partida[];
  participantes: Participante[];
  carregando: boolean;
  recarregar: () => Promise<void>;
  adicionarPartida: (p: Omit<Partida, "id">) => Promise<void>;
  removerPartida: (id: number) => Promise<void>;
  atualizarPartida: (id: number, p: Partial<Partida>) => Promise<void>;
  entrarNaPartida: (id: number, usuario: Participante) => void;
  sairDaPartida: (id: number, usuarioId: number) => void;
  participantesDaPartida: (id: number) => Participante[];
};

const PartidasContext = createContext<PartidasContextType>(
  {} as PartidasContextType,
);

export function PartidasProvider({ children }: { children: ReactNode }) {
  const [partidas, setPartidas] = useState<Partida[]>(partidasMock);
  const [participantes, setParticipantes] = useState<Participante[]>(
    participantesMockInicial,
  );
  const [carregando, setCarregando] = useState(false);
  const [dbPronto, setDbPronto] = useState(false);

  useEffect(() => {
    getDB()
      .then(async (db) => {
        const lista = await listarPartidas(db);
        if (lista.length > 0) {
          setPartidas(lista);
        } else {
          for (const p of partidasMock) {
            const { id: _id, ...resto } = p;
            await criarPartida(db, resto);
          }
          const seeded = await listarPartidas(db);
          setPartidas(seeded.length > 0 ? seeded : partidasMock);
        }
        setDbPronto(true);
      })
      .catch(() => {
        setDbPronto(false);
      });
  }, []);

  const recarregar = useCallback(async () => {
    setCarregando(true);
    try {
      const db = await getDB();
      const lista = await listarPartidas(db);
      setPartidas(lista);
    } finally {
      setCarregando(false);
    }
  }, []);

  const adicionarPartida = useCallback(
    async (p: Omit<Partida, "id">) => {
      if (dbPronto) {
        const db = await getDB();
        await criarPartida(db, p);
        await recarregar();
      } else {
        setPartidas((prev) => [{ ...p, id: Date.now() }, ...prev]);
      }
    },
    [dbPronto, recarregar],
  );

  const removerPartida = useCallback(
    async (id: number) => {
      setPartidas((prev) => prev.filter((p) => p.id !== id));
      setParticipantes((prev) => prev.filter((p) => p.partidaId !== id));
      if (dbPronto) {
        const db = await getDB();
        await deletarPartida(db, id);
      }
    },
    [dbPronto],
  );

  const atualizarPartida = useCallback(
    async (id: number, campos: Partial<Partida>) => {
      setPartidas((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...campos } : p)),
      );
      if (dbPronto) {
        const db = await getDB();
        const atual = partidas.find((p) => p.id === id);
        if (atual) await atualizarPartidaDB(db, id, { ...atual, ...campos });
      }
    },
    [dbPronto, partidas],
  );

  const entrarNaPartida = useCallback(
    (id: number, novoParticipante: Participante) => {
      setPartidas((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                participando: true,
                status: "participando",
                vagas: Math.max(0, p.vagas - 1),
              }
            : p,
        ),
      );
      setParticipantes((prev) => {
        const jaExiste = prev.some(
          (p) =>
            p.usuarioId === novoParticipante.usuarioId && p.partidaId === id,
        );
        if (jaExiste) return prev;
        return [
          ...prev,
          { ...novoParticipante, partidaId: id, id: Date.now() },
        ];
      });
    },
    [],
  );

  const sairDaPartida = useCallback((id: number, usuarioId: number) => {
    setPartidas((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, participando: false, status: "entrar", vagas: p.vagas + 1 }
          : p,
      ),
    );
    setParticipantes((prev) =>
      prev.filter((p) => !(p.partidaId === id && p.usuarioId === usuarioId)),
    );
  }, []);

  const participantesDaPartida = useCallback(
    (id: number) => participantes.filter((p) => p.partidaId === id),
    [participantes],
  );

  return (
    <PartidasContext.Provider
      value={{
        partidas,
        participantes,
        carregando,
        recarregar,
        adicionarPartida,
        removerPartida,
        atualizarPartida,
        entrarNaPartida,
        sairDaPartida,
        participantesDaPartida,
      }}
    >
      {children}
    </PartidasContext.Provider>
  );
}

export function usePartidas() {
  return useContext(PartidasContext);
}
