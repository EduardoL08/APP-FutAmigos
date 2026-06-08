import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { Usuario } from "../types/usuario";
import { salvarSessao, carregarSessao, limparSessao } from "../utils/storage";
import { getDB } from "../../app/database";
import {
  buscarUsuarioPorEmail,
  criarUsuario,
} from "../repository/usuariosRepo";

type AuthContextType = {
  usuario: Usuario | null;
  carregandoSessao: boolean;
  login: (
    email: string,
    senha: string,
  ) => Promise<{ ok: boolean; erro?: string }>;
  cadastrar: (
    dados: Omit<Usuario, "id">,
  ) => Promise<{ ok: boolean; erro?: string }>;
  logout: () => Promise<void>;
  atualizarPerfil: (campos: Partial<Usuario>) => Promise<void>;
  isAutenticado: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const USUARIO_DEMO: Usuario = {
  id: 1,
  nome: "Jogador Demo",
  email: "jogador@futamigos.com",
  senha: "123456",
  telefone: "(31) 99999-9999",
  cidade: "Belo Horizonte",
  foto: "https://i.pravatar.cc/150?img=8",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregandoSessao, setCarregandoSessao] = useState(true);

  useEffect(() => {
    carregarSessao()
      .then((u) => {
        if (u) setUsuario(u);
      })
      .finally(() => setCarregandoSessao(false));
  }, []);

  const login = useCallback(
    async (
      email: string,
      senha: string,
    ): Promise<{ ok: boolean; erro?: string }> => {
      try {
        if (email === USUARIO_DEMO.email && senha === USUARIO_DEMO.senha) {
          setUsuario(USUARIO_DEMO);
          await salvarSessao(USUARIO_DEMO);
          return { ok: true };
        }

        const db = await getDB();
        const encontrado = await buscarUsuarioPorEmail(db, email);
        if (!encontrado) return { ok: false, erro: "E-mail não encontrado." };
        if (encontrado.senha !== senha)
          return { ok: false, erro: "Senha incorreta." };
        setUsuario(encontrado);
        await salvarSessao(encontrado);
        return { ok: true };
      } catch {
        return { ok: false, erro: "Erro ao fazer login. Tente novamente." };
      }
    },
    [],
  );

  const cadastrar = useCallback(
    async (
      dados: Omit<Usuario, "id">,
    ): Promise<{ ok: boolean; erro?: string }> => {
      try {
        const db = await getDB();
        const existente = await buscarUsuarioPorEmail(db, dados.email);
        if (existente) return { ok: false, erro: "E-mail já cadastrado." };
        await criarUsuario(db, dados);
        const novo = await buscarUsuarioPorEmail(db, dados.email);
        if (!novo) return { ok: false, erro: "Erro ao criar conta." };
        setUsuario(novo);
        await salvarSessao(novo);
        return { ok: true };
      } catch {
        return { ok: false, erro: "Erro ao cadastrar. Tente novamente." };
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    await limparSessao();
    setUsuario(null);
  }, []);

  const atualizarPerfil = useCallback(async (campos: Partial<Usuario>) => {
    setUsuario((prev) => {
      if (!prev) return prev;
      const atualizado = { ...prev, ...campos };
      salvarSessao(atualizado);
      return atualizado;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregandoSessao,
        login,
        cadastrar,
        logout,
        atualizarPerfil,
        isAutenticado: !!usuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
