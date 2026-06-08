import { Platform } from "react-native";
import { Usuario } from "../types/usuario";

const CHAVE_USUARIO = "@futamigos:usuario";

async function armazenarItem(chave: string, valor: string): Promise<void> {
  if (Platform.OS === "web") {
    try {
      localStorage.setItem(chave, valor);
    } catch {
      /* SSR safe */
    }
    return;
  }
  const AS = await import("@react-native-async-storage/async-storage");
  await AS.default.setItem(chave, valor);
}

async function obterItem(chave: string): Promise<string | null> {
  if (Platform.OS === "web") {
    try {
      return localStorage.getItem(chave);
    } catch {
      return null;
    }
  }
  const AS = await import("@react-native-async-storage/async-storage");
  return AS.default.getItem(chave);
}

async function removerItem(chave: string): Promise<void> {
  if (Platform.OS === "web") {
    try {
      localStorage.removeItem(chave);
    } catch {
      /* SSR safe */
    }
    return;
  }
  const AS = await import("@react-native-async-storage/async-storage");
  await AS.default.removeItem(chave);
}

export async function salvarSessao(usuario: Usuario): Promise<void> {
  await armazenarItem(CHAVE_USUARIO, JSON.stringify(usuario));
}

export async function carregarSessao(): Promise<Usuario | null> {
  const json = await obterItem(CHAVE_USUARIO);
  return json ? (JSON.parse(json) as Usuario) : null;
}

export async function limparSessao(): Promise<void> {
  await removerItem(CHAVE_USUARIO);
}
