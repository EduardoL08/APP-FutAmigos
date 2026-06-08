# ⚽ FutAmigos v1 — Princípios SOLID

**Aplicação dos Cinco Princípios de Design de Software no Projeto FutAmigos**  
Versão 1.0 Final · React Native + Expo + TypeScript

---

## Sumário

1. [Introdução](#introdução)
2. [S — Single Responsibility Principle](#s--single-responsibility-principle)
3. [O — Open/Closed Principle](#o--openclosed-principle)
4. [L — Liskov Substitution Principle](#l--liskov-substitution-principle)
5. [I — Interface Segregation Principle](#i--interface-segregation-principle)
6. [D — Dependency Inversion Principle](#d--dependency-inversion-principle)
7. [Resumo Geral](#resumo-geral)

---

## Introdução

Os princípios **SOLID** são boas práticas de design de software formuladas por Robert C. Martin (Uncle Bob). Embora o React Native use componentes funcionais e não classes tradicionais, os princípios SOLID se aplicam plenamente — tanto no design de componentes quanto na arquitetura de camadas.

| Princípio                       | Sigla | Aplicado |
| ------------------------------- | ----- | -------- |
| Single Responsibility Principle | SRP   | ✅       |
| Open/Closed Principle           | OCP   | ✅       |
| Liskov Substitution Principle   | LSP   | ✅       |
| Interface Segregation Principle | ISP   | ✅       |
| Dependency Inversion Principle  | DIP   | ✅       |

> **Resultado prático:** quando o erro crítico de `.wasm` foi identificado no Web, a correção exigiu mudança em apenas **um arquivo** (`database.ts`). Os outros 41 arquivos não foram tocados. Isso é SOLID em ação.

---

## S — Single Responsibility Principle

### Princípio da Responsabilidade Única

> _"Uma classe (ou módulo) deve ter apenas um motivo para mudar."_

### Definição

Cada módulo deve fazer somente uma coisa e fazê-la bem. Quando um arquivo precisa ser alterado, deve haver apenas uma razão para isso.

### Como foi aplicado

| Arquivo                  | Responsabilidade única                            |
| ------------------------ | ------------------------------------------------- |
| `AuthContext.tsx`        | Gerenciar autenticação (login, logout, sessão)    |
| `PartidasContext.tsx`    | Gerenciar estado das partidas e participantes     |
| `ConvitesContext.tsx`    | Gerenciar ciclo de vida dos convites              |
| `TemaContext.tsx`        | Gerenciar tema visual e persistência              |
| `database.ts`            | Criar conexão com o banco e definir o adapter     |
| `partidasRepo.ts`        | Operações SQL exclusivas da tabela `partidas`     |
| `usuariosRepo.ts`        | Operações SQL exclusivas da tabela `usuarios`     |
| `storage.ts`             | Salvar, carregar e limpar sessão via AsyncStorage |
| `validacao.ts`           | Funções de validação, formatação e Haversine      |
| `apiService.ts`          | Configuração e instância do cliente Axios         |
| `useApiJogadores.ts`     | Buscar jogadores da API pública (somente isso)    |
| `SkeletonCard.tsx`       | Animar placeholder de carregamento (somente isso) |
| `CardConvite.tsx`        | Exibir visualmente um convite (somente isso)      |
| `ModalEnviarConvite.tsx` | Interface de seleção de jogadores para convidar   |

### Evidência: SkeletonCard

```typescript
// src/components/SkeletonCard.tsx
// Responsabilidade: renderizar animação de loading. Só isso.

export function SkeletonCard() {
  const opacidade = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacidade, { toValue: 1,   duration: 800, useNativeDriver: true }),
        Animated.timing(opacidade, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [opacidade]);

  return <Animated.View style={{ opacity: opacidade }}>{ /* barras */ }</Animated.View>;
}
```

### Evidência: validacao.ts

```typescript
// src/utils/validacao.ts — só valida e formata. Sem estado, sem efeitos.

export function validarEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function formatarData(texto: string): string {
  const n = texto.replace(/\D/g, "").slice(0, 8);
  if (n.length <= 2) return n;
  if (n.length <= 4) return `${n.slice(0, 2)}/${n.slice(2)}`;
  return `${n.slice(0, 2)}/${n.slice(2, 4)}/${n.slice(4)}`;
}

export function calcularDistanciaKm(lat1, lon1, lat2, lon2): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  // ... fórmula Haversine
}
```

### Por que importa

Se a fórmula de distância mudar → só `validacao.ts`. Se o visual do card de convite mudar → só `CardConvite.tsx`. Se a forma de salvar sessão mudar → só `storage.ts`. Cada mudança tem um único destino.

---

## O — Open/Closed Principle

### Princípio Aberto/Fechado

> _"Entidades de software devem estar abertas para extensão, mas fechadas para modificação."_

### Definição

Deve ser possível adicionar novos comportamentos sem alterar código existente que já funciona.

### Evidência: BotaoPadrao com mapa de variantes

```typescript
// src/components/BotaoPadrao.tsx

type Variante = "primario" | "secundario" | "perigo" | "outline";

const ESTILOS_VARIANTE = {
  primario: { bg: "#2ECC71", texto: "#fff", borda: "#2ECC71" },
  secundario: { bg: "#123b17", texto: "#fff", borda: "#123b17" },
  perigo: { bg: "#e53935", texto: "#fff", borda: "#e53935" },
  outline: { bg: "transparent", texto: "#123b17", borda: "#123b17" },
};

// Para adicionar "sucesso" — apenas uma linha no mapa, componente não muda:
// sucesso: { bg: "#4CAF50", texto: "#fff", borda: "#4CAF50" },
```

### Evidência: DBAdapter aberto a novas implementações

```typescript
// Novos adapters sem modificar repositórios existentes:

class IndexedDBAdapter implements DBAdapter { ... }    // Web com persistência real
class EncryptedSQLiteAdapter implements DBAdapter { ... } // dados sensíveis
class MockDBAdapter implements DBAdapter { ... }       // testes automatizados
```

### Evidência: TemaContext

Para adicionar um terceiro tema (ex: "alto contraste"), basta um novo objeto de cores. Todos os 41 arquivos que consomem `cores` continuam sem modificação.

```typescript
const CORES_ALTO_CONTRASTE = {
  fundo: "#000000", texto: "#FFFFFF", primario: "#FFFF00", ...
};
```

### Evidência: ConvitesContext

O `ConvitesContext` foi adicionado sem modificar `AuthContext`, `PartidasContext` ou `TemaContext`. O `_layout.tsx` simplesmente envolveu os providers existentes com mais um:

```typescript
// Extensão sem modificar os providers existentes:
<TemaProvider>
  <AuthProvider>
    <PartidasProvider>
      <ConvitesProvider>   {/* ← adicionado sem tocar nos outros */}
        <AuthGuard>
          <Inner />
        </AuthGuard>
      </ConvitesProvider>
    </PartidasProvider>
  </AuthProvider>
</TemaProvider>
```

---

## L — Liskov Substitution Principle

### Princípio da Substituição de Liskov

> _"Subtipos devem ser substituíveis por seus tipos base sem alterar o comportamento correto do programa."_

### Definição

Se um módulo funciona com um tipo base (interface ou tipo TypeScript), qualquer implementação concreta pode ser usada em seu lugar sem quebrar o sistema.

### Evidência central: DBAdapter

```typescript
// src/database/database.ts

export type DBAdapter = {
  execAsync:     (sql: string) => Promise<void>;
  runAsync:      (sql: string, params?: (string|number|null)[]) => Promise<void>;
  getAllAsync:    <T>(sql: string, params?: (string|number|null)[]) => Promise<T[]>;
  getFirstAsync: <T>(sql: string, params?: (string|number|null)[]) => Promise<T|null>;
};

// NativeDBAdapter: usa expo-sqlite internamente
class NativeDBAdapter implements DBAdapter {
  async getAllAsync<T>(sql, params = []): Promise<T[]> {
    return this.db.getAllAsync<T>(sql, params); // expo-sqlite real
  }
}

// WebDBAdapter: busca em memória JavaScript
class WebDBAdapter implements DBAdapter {
  async getAllAsync<T>(sql, _params = []): Promise<T[]> {
    if (sql.includes("FROM partidas")) return [...this.store.partidas] as T[];
    ...
  }
}
```

Os repositórios recebem `DBAdapter` e não sabem qual dos dois está usando:

```typescript
// src/database/partidasRepo.ts
export async function listarPartidas(db: DBAdapter): Promise<Partida[]> {
  return db.getAllAsync<Partida>("SELECT * FROM partidas ORDER BY id DESC");
  // funciona identicamente com NativeDBAdapter e WebDBAdapter
}
```

### Evidência: PartidaForm

O mesmo componente é usado em dois contextos diferentes sem quebrar nada:

```typescript
// criar-partida.tsx — formulário vazio
<PartidaForm titulo="" local="" onSubmit={handleCriar} labelBotao="⚽ Criar" />

// editar-partida/[id].tsx — formulário pré-preenchido
<PartidaForm titulo={partida.titulo} local={partida.local}
             onSubmit={handleEditar} labelBotao="💾 Salvar" />
```

---

## I — Interface Segregation Principle

### Princípio da Segregação de Interface

> _"Nenhum cliente deve ser forçado a depender de métodos que não usa."_

### Definição

Interfaces grandes devem ser divididas em menores e específicas. Cada módulo depende apenas do que precisa.

### Evidência: Quatro contextos enxutos

Em vez de um `AppContext` gigante, o projeto define quatro contextos independentes:

| Contexto          | Expõe                                                                             | Quem consome                            |
| ----------------- | --------------------------------------------------------------------------------- | --------------------------------------- |
| `AuthContext`     | `usuario`, `login`, `logout`, `cadastrar`, `atualizarPerfil`                      | Login, Cadastro, Perfil, \_layout       |
| `PartidasContext` | `partidas`, `adicionarPartida`, `entrarNaPartida`, `sairDaPartida`…               | Home, MeusJogos, Detalhes, CriarPartida |
| `ConvitesContext` | `convites`, `aceitarConvite`, `recusarConvite`, `enviarConvite`, `totalPendentes` | Convites, Detalhes, \_layout (badge)    |
| `TemaContext`     | `cores`, `escuro`, `alternarTema`                                                 | Todos os componentes visuais            |

```typescript
// home.tsx — usa partidas e tema, não sabe nada de autenticação ou convites
const { partidas, carregando, recarregar } = usePartidas();
const { cores } = useTema();
// ✅ não importa useAuth() nem useConvites()

// convites.tsx — usa convites, partidas e tema
const { convites, aceitarConvite, recusarConvite } = useConvites();
const { entrarNaPartida } = usePartidas();
const { cores } = useTema();
// ✅ não importa useAuth() para nada além do usuário

// _layout.tsx (badge) — usa só totalPendentes do ConvitesContext
const { totalPendentes } = useConvites();
// ✅ não precisa da lista de convites nem das funções aceitar/recusar
```

### Evidência: Props mínimas do BotaoPadrao

```typescript
type Props = {
  label: string;
  onPress: (e: GestureResponderEvent) => void;
  variante?: Variante; // opcional — default "primario"
  desabilitado?: boolean; // opcional — default false
  carregando?: boolean; // opcional — mostra spinner
  estilo?: ViewStyle; // opcional — override pontual
};
// Nenhuma prop desnecessária
```

### Evidência: DBAdapter enxuto

```typescript
export type DBAdapter = {
  execAsync:     (...) => Promise<void>;
  runAsync:      (...) => Promise<void>;
  getAllAsync:    <T>(...) => Promise<T[]>;
  getFirstAsync: <T>(...) => Promise<T|null>;
};
// Apenas as 4 operações que os repositórios usam
// Sem transações, backup, migração ou diagnóstico
```

---

## D — Dependency Inversion Principle

### Princípio da Inversão de Dependência

> _"Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações."_

### Definição

A lógica de negócio não pode importar implementações concretas. Ambos dependem de uma interface. Apenas a camada de composição conhece a implementação concreta.

### Cadeia de dependências

| Camada      | Módulo                               | Depende de                       |
| ----------- | ------------------------------------ | -------------------------------- |
| Alto nível  | `PartidasContext`, `AuthContext`     | `DBAdapter` (abstração)          |
| Alto nível  | `partidasRepo.ts`, `usuariosRepo.ts` | `DBAdapter` (abstração)          |
| Alto nível  | `convites.tsx`, `detalhes/[id].tsx`  | `ConvitesContext` (abstração)    |
| Baixo nível | `NativeDBAdapter`                    | `expo-sqlite` (detalhe)          |
| Baixo nível | `WebDBAdapter`                       | Memória JavaScript (detalhe)     |
| Fábrica     | `getDB()`                            | `Platform.OS` (decide o adapter) |

### Evidência: repositórios nunca importam expo-sqlite

```typescript
// src/database/partidasRepo.ts
import { DBAdapter } from "./database"; // ← abstração
// import * as SQLite from "expo-sqlite" — NUNCA aparece aqui

export async function listarPartidas(db: DBAdapter): Promise<Partida[]> {
  return db.getAllAsync<Partida>("SELECT * FROM partidas ORDER BY id DESC");
}
```

### Evidência: telas não conhecem o banco

```typescript
// src/app/index.tsx — depende da abstração AuthContext, nunca do banco
const { login } = useAuth();

const handleLogin = async () => {
  const resultado = await login(email, senha);
  // A tela não sabe se usa SQLite, AsyncStorage ou API externa
};
```

```typescript
// src/app/convites.tsx — depende das abstrações dos contextos
const { aceitarConvite } = useConvites();
const { entrarNaPartida } = usePartidas();
// A tela não sabe como os dados são persistidos
```

### Evidência: hooks dependem do cliente, não do Axios

```typescript
// src/services/apiService.ts — único ponto de configuração HTTP
const api = axios.create({ baseURL: "https://jsonplaceholder.typicode.com" });
export default api;

// src/hooks/useApiJogadores.ts — depende do cliente, não do Axios diretamente
import api from "../services/apiService";

useEffect(() => {
  api.get<JogadorAPI[]>("/users").then((res) => setJogadores(res.data));
}, []);
// Se trocar Axios por fetch, só apiService.ts muda
```

### Prova concreta do DIP funcionando

Na v3, o erro `wa-sqlite.wasm` exigiu reescrita de `database.ts`. Resultado:

- **Arquivos modificados:** 1 (`database.ts`)
- **Arquivos que continuaram intocados:** 41

Se os repositórios dependessem de `expo-sqlite` diretamente, seria necessário modificar `partidasRepo.ts`, `usuariosRepo.ts`, `PartidasContext.tsx` e `AuthContext.tsx` também. O DIP evitou isso.

---

## Resumo Geral

| Princípio | Evidência no Projeto                                                                                                             | Arquivos-chave                                                             |
| --------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **SRP**   | Cada arquivo tem uma função clara; mudanças têm um único destino                                                                 | `storage.ts`, `validacao.ts`, `SkeletonCard.tsx`, `CardConvite.tsx`, repos |
| **OCP**   | `BotaoPadrao` aceita novas variantes sem modificação; `ConvitesContext` foi adicionado sem alterar os outros contextos           | `BotaoPadrao.tsx`, `database.ts`, `_layout.tsx`                            |
| **LSP**   | `NativeDBAdapter` e `WebDBAdapter` são intercambiáveis; `PartidaForm` funciona em criar e editar                                 | `database.ts`, `partidasRepo.ts`, `PartidaForm.tsx`                        |
| **ISP**   | 4 contextos enxutos independentes; props mínimas; `DBAdapter` com apenas 4 métodos                                               | `AuthContext`, `PartidasContext`, `ConvitesContext`, `TemaContext`         |
| **DIP**   | Telas dependem de contextos; repos dependem de `DBAdapter`; hooks dependem de `apiService` — erro `.wasm` corrigido em 1 arquivo | `getDB()`, `apiService.ts`, `_layout.tsx`                                  |

### Conclusão

> Projeto Acadêmico — Desenvolvimento Mobile · Curso de Sistemas de Informação
> **FutAmigos v1 Final** · React Native · Expo · TypeScript · SQLite · Context API
