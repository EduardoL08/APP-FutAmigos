import { DBAdapter } from "../../app/database";
import { Partida } from "../types/partida";

export async function listarPartidas(db: DBAdapter): Promise<Partida[]> {
  return db.getAllAsync<Partida>("SELECT * FROM partidas ORDER BY id DESC");
}

export async function buscarPartidaPorId(
  db: DBAdapter,
  id: number,
): Promise<Partida | null> {
  return db.getFirstAsync<Partida>("SELECT * FROM partidas WHERE id = ?", [id]);
}

export async function criarPartida(
  db: DBAdapter,
  partida: Omit<Partida, "id">,
): Promise<void> {
  await db.runAsync(
    `INSERT INTO partidas
      (titulo, descricao, preco, local, data, horario, jogadores, vagas,
       participando, status, criadorId, latitude, longitude)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      partida.titulo,
      partida.descricao,
      partida.preco,
      partida.local,
      partida.data,
      partida.horario,
      partida.jogadores,
      partida.vagas,
      partida.participando ? 1 : 0,
      partida.status,
      partida.criadorId,
      partida.latitude ?? null,
      partida.longitude ?? null,
    ],
  );
}

export async function atualizarPartida(
  db: DBAdapter,
  id: number,
  partida: Omit<Partida, "id">,
): Promise<void> {
  await db.runAsync(
    `UPDATE partidas SET
      titulo=?, descricao=?, preco=?, local=?, data=?, horario=?,
      jogadores=?, vagas=?, participando=?, status=?, latitude=?, longitude=?
     WHERE id=?`,
    [
      partida.titulo,
      partida.descricao,
      partida.preco,
      partida.local,
      partida.data,
      partida.horario,
      partida.jogadores,
      partida.vagas,
      partida.participando ? 1 : 0,
      partida.status,
      partida.latitude ?? null,
      partida.longitude ?? null,
      id,
    ],
  );
}

export async function deletarPartida(db: DBAdapter, id: number): Promise<void> {
  await db.runAsync("DELETE FROM partidas WHERE id = ?", [id]);
}
