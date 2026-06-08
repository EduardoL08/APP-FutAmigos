import { DBAdapter } from "../../app/database";
import { Usuario } from "../types/usuario";

export async function criarUsuario(
  db: DBAdapter,
  usuario: Omit<Usuario, "id">,
): Promise<void> {
  await db.runAsync(
    `INSERT INTO usuarios (nome, email, senha, telefone, cidade, foto)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      usuario.nome,
      usuario.email,
      usuario.senha,
      usuario.telefone,
      usuario.cidade,
      usuario.foto,
    ],
  );
}

export async function buscarUsuarioPorEmail(
  db: DBAdapter,
  email: string,
): Promise<Usuario | null> {
  return db.getFirstAsync<Usuario>("SELECT * FROM usuarios WHERE email = ?", [
    email,
  ]);
}

export async function atualizarUsuario(
  db: DBAdapter,
  id: number,
  campos: Partial<Omit<Usuario, "id" | "email" | "senha">>,
): Promise<void> {
  const sets: string[] = [];
  const valores: (string | number)[] = [];

  if (campos.nome !== undefined) {
    sets.push("nome=?");
    valores.push(campos.nome);
  }
  if (campos.telefone !== undefined) {
    sets.push("telefone=?");
    valores.push(campos.telefone);
  }
  if (campos.cidade !== undefined) {
    sets.push("cidade=?");
    valores.push(campos.cidade);
  }
  if (campos.foto !== undefined) {
    sets.push("foto=?");
    valores.push(campos.foto);
  }

  if (sets.length === 0) return;
  valores.push(id);
  await db.runAsync(
    `UPDATE usuarios SET ${sets.join(",")} WHERE id=?`,
    valores,
  );
}
