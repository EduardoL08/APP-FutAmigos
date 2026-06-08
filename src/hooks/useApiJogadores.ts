import { useState, useEffect } from "react";
import axios from "axios";

// Tipo dos usuários que vêm da API pública
export type JogadorAPI = {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
};

/**
 * useApiJogadores — busca jogadores via MockAPI / JSONPlaceholder
 *
 * O professor chama de "MockAPI" porque é uma API que simula dados reais.
 * O JSONPlaceholder (jsonplaceholder.typicode.com) faz exatamente isso:
 * ele é um servidor falso ("mock") que responde com dados prontos,
 * sem precisar de banco de dados ou cadastro.
 *
 * Funciona assim:
 *   axios.get("https://jsonplaceholder.typicode.com/users")
 *   → retorna uma lista de 10 usuários falsos com nome, email, etc.
 *
 * É perfeito para projetos acadêmicos porque permite demonstrar
 * consumo de API real (HTTP, Axios, async/await) sem precisar de backend próprio.
 */
export function useApiJogadores() {
  const [jogadores, setJogadores] = useState<JogadorAPI[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<JogadorAPI[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setJogadores(res.data))
      .catch(() => setErro("Não foi possível carregar os jogadores."))
      .finally(() => setCarregando(false));
  }, []);

  return { jogadores, carregando, erro };
}
