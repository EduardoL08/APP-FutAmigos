import { useState, useEffect, useCallback } from "react";
import { getDB } from "../../app/database";
import { Partida } from "../types/partida";
import {
  listarPartidas,
  criarPartida,
  deletarPartida,
  atualizarPartida,
} from "../repository/partidasRepo";

export function usePartidasDB() {
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getDB()
      .then((db) => listarPartidas(db).then(setPartidas))
      .finally(() => setCarregando(false));
  }, []);

  const recarregar = useCallback(async () => {
    const db = await getDB();
    const lista = await listarPartidas(db);
    setPartidas(lista);
  }, []);

  const adicionar = useCallback(
    async (partida: Omit<Partida, "id">) => {
      const db = await getDB();
      await criarPartida(db, partida);
      await recarregar();
    },
    [recarregar],
  );

  const remover = useCallback(
    async (id: number) => {
      const db = await getDB();
      await deletarPartida(db, id);
      await recarregar();
    },
    [recarregar],
  );

  const atualizar = useCallback(
    async (id: number, partida: Omit<Partida, "id">) => {
      const db = await getDB();
      await atualizarPartida(db, id, partida);
      await recarregar();
    },
    [recarregar],
  );

  return { partidas, carregando, adicionar, remover, atualizar, recarregar };
}
