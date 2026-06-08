import { Platform } from "react-native";

// ─────────────────────────────────────────────────────────────────────────────
// Camada de abstração do banco de dados
//
// PROBLEMA: expo-sqlite ~55 usa WebAssembly (.wasm) que o Metro bundler não
// resolve corretamente no ambiente Web (navegador).
//
//   • Nativo (iOS / Android / Expo Go) → expo-sqlite real
//   • Web (navegador)                  → AsyncStorage como fallback
//
// Isso garante que o app rode em TODOS os ambientes sem erro.
// ─────────────────────────────────────────────────────────────────────────────

export type DBAdapter = {
  execAsync: (sql: string) => Promise<void>;
  runAsync: (sql: string, params?: (string | number | null)[]) => Promise<void>;
  getAllAsync: <T>(sql: string, params?: (string | number | null)[]) => Promise<T[]>;
  getFirstAsync: <T>(sql: string, params?: (string | number | null)[]) => Promise<T | null>;
};

// ── Adapter Web (AsyncStorage) ────────────────────────────────────────────────
class WebDBAdapter implements DBAdapter {
  private store: Record<string, Record<string, unknown>[]> = {
    usuarios: [],
    partidas: [],
    participantes: [],
  };
  private counters: Record<string, number> = {
    usuarios: 0, partidas: 0, participantes: 0,
  };

  async execAsync(_sql: string): Promise<void> {
    // CREATE TABLE — ignorado, tabelas já existem em memória
  }

  async runAsync(sql: string, params: (string | number | null)[] = []): Promise<void> {
    const s = sql.trim().toUpperCase();

    if (s.startsWith("INSERT INTO USUARIOS")) {
      const [nome, email, senha, telefone, cidade, foto] = params as string[];
      this.counters.usuarios++;
      this.store.usuarios.push({
        id: this.counters.usuarios, nome, email, senha,
        telefone: telefone ?? "", cidade: cidade ?? "", foto: foto ?? "",
      });
    } else if (s.startsWith("INSERT INTO PARTIDAS")) {
      const [titulo, descricao, preco, local, data, horario,
             jogadores, vagas, participando, status, criadorId, latitude, longitude] = params;
      this.counters.partidas++;
      this.store.partidas.push({
        id: this.counters.partidas, titulo, descricao, preco, local, data, horario,
        jogadores, vagas, participando, status, criadorId, latitude, longitude,
      });
    } else if (s.startsWith("DELETE FROM PARTIDAS")) {
      const id = params[0];
      this.store.partidas = this.store.partidas.filter((p) => p["id"] !== id);
    } else if (s.startsWith("UPDATE PARTIDAS")) {
      // Atualização simplificada — substitui pelo último conjunto de params
      const id = params[params.length - 1];
      const idx = this.store.partidas.findIndex((p) => p["id"] === id);
      if (idx >= 0) {
        const [titulo, descricao, preco, local, data, horario,
               jogadores, vagas, participando, status, latitude, longitude] = params;
        this.store.partidas[idx] = {
          ...this.store.partidas[idx],
          titulo, descricao, preco, local, data, horario,
          jogadores, vagas, participando, status, latitude, longitude,
        };
      }
    } else if (s.startsWith("UPDATE USUARIOS")) {
      // Atualização simplificada de usuário
      const id = params[params.length - 1];
      const idx = this.store.usuarios.findIndex((u) => u["id"] === id);
      if (idx >= 0) {
        // Aplica apenas os campos enviados
        const campos = ["nome", "telefone", "cidade", "foto"];
        params.slice(0, -1).forEach((v, i) => {
          if (campos[i]) this.store.usuarios[idx][campos[i]] = v;
        });
      }
    }
  }

  async getAllAsync<T>(sql: string, _params: (string | number | null)[] = []): Promise<T[]> {
    const s = sql.trim().toUpperCase();
    if (s.includes("FROM PARTIDAS"))     return [...this.store.partidas] as unknown as T[];
    if (s.includes("FROM USUARIOS"))     return [...this.store.usuarios] as unknown as T[];
    if (s.includes("FROM PARTICIPANTES")) return [...this.store.participantes] as unknown as T[];
    return [];
  }

  async getFirstAsync<T>(sql: string, params: (string | number | null)[] = []): Promise<T | null> {
    const s = sql.trim().toUpperCase();
    if (s.includes("FROM USUARIOS") && s.includes("WHERE EMAIL")) {
      const email = params[0];
      const u = this.store.usuarios.find((u) => u["email"] === email);
      return (u ?? null) as unknown as T;
    }
    if (s.includes("FROM PARTIDAS") && s.includes("WHERE ID")) {
      const id = params[0];
      const p = this.store.partidas.find((p) => p["id"] === id);
      return (p ?? null) as unknown as T;
    }
    return null;
  }
}

// ── Adapter Nativo (expo-sqlite real) ─────────────────────────────────────────
class NativeDBAdapter implements DBAdapter {
  private db: import("expo-sqlite").SQLiteDatabase;

  constructor(db: import("expo-sqlite").SQLiteDatabase) {
    this.db = db;
  }

  async execAsync(sql: string): Promise<void> {
    await this.db.execAsync(sql);
  }

  async runAsync(sql: string, params: (string | number | null)[] = []): Promise<void> {
    await this.db.runAsync(sql, params);
  }

  async getAllAsync<T>(sql: string, params: (string | number | null)[] = []): Promise<T[]> {
    return this.db.getAllAsync<T>(sql, params);
  }

  async getFirstAsync<T>(sql: string, params: (string | number | null)[] = []): Promise<T | null> {
    return this.db.getFirstAsync<T>(sql, params);
  }
}

// ── Singleton ──────────────────────────────────────────────────────────────────
let adapter: DBAdapter | null = null;

const DDL = `
  PRAGMA journal_mode = WAL;

  CREATE TABLE IF NOT EXISTS usuarios (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    nome       TEXT    NOT NULL,
    email      TEXT    NOT NULL UNIQUE,
    senha      TEXT    NOT NULL,
    telefone   TEXT    DEFAULT '',
    cidade     TEXT    DEFAULT '',
    foto       TEXT    DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS partidas (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo            TEXT    NOT NULL,
    descricao         TEXT    NOT NULL,
    preco             REAL    NOT NULL DEFAULT 0,
    local             TEXT    NOT NULL,
    data              TEXT    NOT NULL,
    horario           TEXT    NOT NULL,
    jogadores         INTEGER NOT NULL DEFAULT 10,
    vagas             INTEGER NOT NULL DEFAULT 0,
    participando      INTEGER NOT NULL DEFAULT 0,
    status            TEXT    NOT NULL DEFAULT 'entrar',
    criadorId         INTEGER NOT NULL,
    latitude          REAL,
    longitude         REAL
  );

  CREATE TABLE IF NOT EXISTS participantes (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    usuarioId   INTEGER NOT NULL,
    partidaId   INTEGER NOT NULL,
    UNIQUE(usuarioId, partidaId)
  );
`;

export async function getDB(): Promise<DBAdapter> {
  if (adapter) return adapter;

  if (Platform.OS === "web") {
    // Web: usa adaptador em memória (sem .wasm)
    const webAdapter = new WebDBAdapter();
    await webAdapter.execAsync(DDL);
    adapter = webAdapter;
  } else {
    // Nativo: expo-sqlite real
    const SQLite = await import("expo-sqlite");
    const db = await SQLite.openDatabaseAsync("futamigos.db");
    await db.execAsync(DDL);
    adapter = new NativeDBAdapter(db);
  }

  return adapter;
}
