# ⚽ FutAmigos — README

**Versão:** 1.0 — Versão Final  
**Plataformas:** Android · iOS · Expo Go · Web (navegador)  
**Framework:** React Native + Expo ~55 · **Linguagem:** TypeScript (strict)

---

## Sumário

1. [Visão Geral](#1-visão-geral)
2. [Funcionalidades](#2-funcionalidades)
3. [Telas do Aplicativo](#3-telas-do-aplicativo)
4. [Estrutura de Pastas](#4-estrutura-de-pastas)
5. [Componentes Reutilizáveis](#5-componentes-reutilizáveis)
6. [Contextos — Estado Global](#6-contextos--estado-global)
7. [Dependências](#7-dependências)
8. [Como Rodar](#8-como-rodar)
9. [Banco de Dados — SQLite](#9-banco-de-dados--sqlite)
10. [Sistema de Convites](#10-sistema-de-convites)
11. [API Externa — MockAPI](#11-api-externa--mockapi)
12. [Design System](#12-design-system)
13. [Avisos do Console Web](#13-avisos-do-console-web)
14. [Histórico de Versões](#14-histórico-de-versões)

---

## 1. Visão Geral

O **FutAmigos** é um aplicativo mobile para organização de partidas de futebol amador. Permite criar peladas, convidar participantes, gerenciar perfis e encontrar quadras próximas com geolocalização real.

| Campo          | Valor                                           |
| -------------- | ----------------------------------------------- |
| Projeto        | FutAmigos — App de Organização de Peladas       |
| Versão         | 4.0 (Versão Final)                              |
| Plataformas    | Android · iOS · Expo Go · Web (navegador)       |
| Framework      | React Native + Expo ~55                         |
| Linguagem      | TypeScript strict — sem nenhum `any`            |
| Banco de Dados | expo-sqlite (nativo) / Memória (Web)            |
| Navegação      | Expo Router ~55                                 |
| Estado Global  | Context API — Auth · Partidas · Convites · Tema |

---

## 2. Funcionalidades

| #   | Funcionalidade                                              | Status |
| --- | ----------------------------------------------------------- | ------ |
| 1   | Login com validação e autenticação via SQLite               | ✅     |
| 2   | Cadastro de usuário gravado no banco                        | ✅     |
| 3   | Sessão persistida com AsyncStorage                          | ✅     |
| 4   | Guard de autenticação automático                            | ✅     |
| 5   | CRUD completo de partidas (criar, listar, editar, excluir)  | ✅     |
| 6   | Entrar e sair de partidas com controle de vagas             | ✅     |
| 7   | Lista de participantes com avatares                         | ✅     |
| 8   | Sistema completo de convites     (enviar, aceitar, recusar) | ✅     |
| 9   | Badge de convites pendentes no footer                       | ✅     |
| 10  | Mapa com localização real e distância Haversine             | ✅     |
| 11  | Modo escuro/claro persistido entre sessões                  | ✅     |
| 12  | Skeleton loading animado nas listas                         | ✅     |
| 13  | Pull-to-refresh nas listas                                  | ✅     |
| 14  | Tab ativo destacado no footer                               | ✅     |
| 15  | Barra de ocupação de jogadores nos cards                    | ✅     |
| 16  | Validação inline com erros por campo                        | ✅     |
| 17  | Formatação automática de data, hora e telefone              | ✅     |
| 18  | Foto de perfil via ImagePicker                              | ✅     |
| 19  | Consumo de API pública via Axios (MockAPI)                  | ✅     |
| 20  | Compatível com Web sem erro de `.wasm`                      | ✅     |
| 21  | `window.confirm` no Web para ações destrutivas              | ✅     |

---

## 3. Telas do Aplicativo

| #   | Tela           | Rota                      | Descrição                                                 |
| --- | -------------- | ------------------------- | --------------------------------------------------------- |
| 1   | Login          | `index.tsx`               | Autenticação com validação de e-mail e senha              |
| 2   | Cadastro       | `cadastro.tsx`            | Criação de conta gravada no SQLite                        |
| 3   | Home           | `home.tsx`                | FlatList de partidas com busca, filtros e skeleton        |
| 4   | Meus Jogos     | `meus-jogos.tsx`          | Abas: Próximos · Organizando + banner de convites         |
| 5   | Detalhes       | `detalhes/[id].tsx`       | Info completa, participantes, convites enviados e MockAPI |
| 6   | Criar Partida  | `criar-partida.tsx`       | Formulário com validação e formatação automática          |
| 7   | Editar Partida | `editar-partida/[id].tsx` | Formulário pré-preenchido para edição                     |
| 8   | Convites       | `convites.tsx`            | Tela dedicada com filtros e aceitar/recusar               |
| 9   | Mapa           | `mapa.tsx`                | Localização real + distância Haversine + filtros          |
| 10  | Perfil         | `perfil.tsx`              | Edição de dados + ImagePicker                             |
| 11  | Configurações  | `configuracoes.tsx`       | Modo escuro, notificações, limpar dados                   |
| 12  | Sobre          | `sobre.tsx`               | Informações do app e tecnologias                          |

---

## 4. Estrutura de Pastas

```
futamigos/
├── .gitignore
├── app.json                          # Plugins Expo (location, image-picker, sqlite)
├── metro.config.js                   # Trata .wasm como asset (fix Web)
├── package.json
├── tsconfig.json
├── app/                          # Telas — Expo Router
│   ├── _layout.tsx               # AuthGuard + 4 Providers + footer com badge
│   ├── index.tsx                 # Login
│   ├── cadastro.tsx              # Cadastro
│   ├── home.tsx                  # Home com FlatList + Skeleton + RefreshControl
│   ├── meus-jogos.tsx            # Meus Jogos com banner de convites
│   ├── convites.tsx              # ★ Tela de convites com filtros
│   ├── mapa.tsx                  # Mapa com localização real
│   ├── perfil.tsx                # Perfil + ImagePicker
│   ├── configuracoes.tsx         # Configurações + modo escuro
│   ├── sobre.tsx                 # Sobre
│   ├── criar-partida.tsx         # Criar partida
│   ├── database.ts               # DBAdapter multiplataforma
│   ├── detalhes/
│   │   └── [id].tsx              # Detalhes + modal de convite
│   └── editar-partida/
│       └── [id].tsx              # Editar partida
|
└── src/
    ├── components/                   # Componentes reutilizáveis
    │   ├── BotaoPadrao.tsx           # 4 variantes + spinner
    │   ├── CampoTexto.tsx            # Input com erro inline e tema
    │   ├── CardConvite.tsx           # ★ Card de convite com aceitar/recusar
    │   ├── CardPartida.tsx           # Card com barra de ocupação
    │   ├── Header.tsx                # Cabeçalho com voltar e ação direita
    │   ├── InfoRow.tsx               # Linha com ícone e tema
    │   ├── ModalEnviarConvite.tsx    # ★ Modal de envio de convites
    │   ├── PartidaForm.tsx           # Formulário com formatação automática
    │   └── SkeletonCard.tsx          # Animação pulse de carregamento
    │
    ├── contexts/                     # Estado global — Context API
    │   ├── AuthContext.tsx           # Login/logout/sessão AsyncStorage
    │   ├── ConvitesContext.tsx       # ★ Ciclo de vida dos convites
    │   ├── PartidasContext.tsx       # CRUD de partidas + participantes
    │   └── TemaContext.tsx           # Modo escuro persistido
    │
    ├── repository/                     # Camada de dados
    │   ├── partidasRepo.ts           # CRUD tabela partidas
    │   └── usuariosRepo.ts           # CRUD tabela usuarios
    │
    ├── hooks/
    │   ├── useApiJogadores.ts        # Busca jogadores via Axios
    │   └── usePartidasDB.ts          # Hook SQLite
    │
    ├── services/
    │   └── apiService.ts             # Instância Axios configurada
    │
    ├── types/                        # Interfaces TypeScript (sem `any`)
    │   ├── configuracao.ts
    │   ├── convite.ts                # ★ Tipo Convite com StatusConvite
    │   ├── participante.ts
    │   ├── partida.ts
    │   └── usuario.ts
    │
    └── utils/
        ├── estilos.ts                # Helpers de sombra multiplataforma
        ├── storage.ts                # AsyncStorage helpers
        └── validacao.ts              # Validação, formatadores e Haversine
```

---

## 5. Componentes Reutilizáveis

| Componente           | Props principais                                    | Descrição                                                     |
| -------------------- | --------------------------------------------------- | ------------------------------------------------------------- |
| `BotaoPadrao`        | `label`, `onPress`, `variante`, `carregando`        | 4 variantes de cor + spinner integrado                        |
| `CampoTexto`         | `label`, `erro`, `...TextInputProps`                | Input com label, erro inline e tema                           |
| `CardConvite`        | `convite`, `onAceitar`, `onRecusar`, `onVerPartida` | Card rico com tempo relativo e feedback visual                |
| `CardPartida`        | `partida: Partida`                                  | Card com barra de ocupação e badge de status                  |
| `Header`             | `titulo`, `mostrarVoltar`, `acaoDireita`            | Cabeçalho com botão voltar e ação à direita                   |
| `InfoRow`            | `label`, `valor`, `icone`                           | Linha de informação com ícone emoji e tema                    |
| `ModalEnviarConvite` | `visivel`, `partida`, `onFechar`                    | Modal com busca, seleção múltipla e controle de já convidados |
| `PartidaForm`        | campos, handlers, `erros`, `onSubmit`               | Formulário completo com formatação automática                 |
| `SkeletonCard`       | —                                                   | Card animado (pulse) para estado de carregamento              |

---

## 6. Contextos — Estado Global

| Contexto          | Responsabilidade                 | Expõe                                                                             |
| ----------------- | -------------------------------- | --------------------------------------------------------------------------------- |
| `AuthContext`     | Autenticação e sessão            | `usuario`, `login`, `cadastrar`, `logout`, `atualizarPerfil`                      |
| `PartidasContext` | CRUD de partidas e participantes | `partidas`, `adicionarPartida`, `entrarNaPartida`, `sairDaPartida`…               |
| `ConvitesContext` | Ciclo de vida dos convites       | `convites`, `aceitarConvite`, `recusarConvite`, `enviarConvite`, `totalPendentes` |
| `TemaContext`     | Tema visual persistido           | `cores`, `escuro`, `alternarTema`                                                 |

---

## 7. Dependências

| Pacote                                      | Versão   | Finalidade                        |
| ------------------------------------------- | -------- | --------------------------------- |
| `expo`                                      | ~55.0.23 | Framework base                    |
| `expo-router`                               | ~55.0.14 | Navegação por sistema de arquivos |
| `expo-sqlite`                               | ~55.0.16 | Banco local (nativo)              |
| `expo-location`                             | ~55.1.10 | Geolocalização                    |
| `expo-image-picker`                         | ~55.0.20 | Foto da galeria                   |
| `@react-native-async-storage/async-storage` | ^2.1.2   | Sessão e preferências             |
| `axios`                                     | ^1.7.2   | Cliente HTTP                      |
| `react-native-maps`                         | 1.27.2   | Mapa nativo                       |
| `react-native-reanimated`                   | 4.2.1    | Animações                         |
| `@expo/vector-icons`                        | ^15.0.3  | Ícones Ionicons                   |

---

## 8. Como Rodar

### Pré-requisitos

- Node.js 18+
- `npm install -g expo-cli`
- App **Expo Go** no celular (opcional)

### Instalação e execução

```bash
# 1. Entre na pasta do projeto
cd futamigos

# 2. Instale as dependências
npm install

# 3. Escolha o ambiente:
npx expo start            # Expo Go (escaneia QR Code)
npx expo start --web      # Navegador Web
npx expo start --android  # Android
npx expo start --ios      # iOS (requer macOS)
```

### Conta de demonstração

| Campo  | Valor                   |
| ------ | ----------------------- |
| E-mail | `jogador@futamigos.com` |
| Senha  | `123456`                |

---

## 9. Banco de Dados — SQLite

### Adapter Multiplataforma

A função `getDB()` detecta `Platform.OS` e instancia o adapter correto:

| Ambiente                | Adapter           | Implementação                    |
| ----------------------- | ----------------- | -------------------------------- |
| iOS / Android / Expo Go | `NativeDBAdapter` | `expo-sqlite` real               |
| Navegador Web           | `WebDBAdapter`    | Estruturas em memória JavaScript |

Isso resolve o erro `wa-sqlite.wasm` do Expo ~55 no navegador sem nenhuma mudança nos repositórios.

### Tabelas

```sql
usuarios      — id, nome, email, senha, telefone, cidade, foto
partidas      — id, titulo, descricao, preco, local, data, horario,
                jogadores, vagas, participando, status, criadorId,
                latitude, longitude
participantes — id, usuarioId, partidaId  UNIQUE(usuarioId, partidaId)
```

---

## 10. Sistema de Convites

Gerenciado pelo `ConvitesContext` com o tipo `Convite` dedicado.

### Ciclo de vida

```
enviarConvite()  →  status: "pendente"
aceitarConvite() →  status: "aceito"  + entrarNaPartida() automático
recusarConvite() →  status: "recusado"
```

### Fluxo do organizador

1. Abre **Detalhes** de uma partida sua
2. Toca em **📩 Convidar Jogadores**
3. Busca e seleciona jogadores no `ModalEnviarConvite`
4. Confirma — convites aparecem em "Convites enviados" nos Detalhes

### Fluxo do convidado

1. Badge vermelho aparece no ícone **Convites** do footer
2. Abre a tela **Convites** — vê o `CardConvite` com tempo relativo
3. Toca **✓ Aceitar** — entra na partida automaticamente
4. Ou toca **✕ Recusar** — convite arquivado com histórico

### Compatibilidade Web

Ações destrutivas usam `window.confirm()` no Web em vez de `Alert.alert()`, pois o Alert do React Native não bloqueia no navegador.

---

## 11. API Externa — MockAPI

| Hook              | Endpoint              | Uso                                |
| ----------------- | --------------------- | ---------------------------------- |
| `useApiJogadores` | `GET /users`          | Jogadores em destaque nos Detalhes |
| `useNoticias`     | `GET /posts?_limit=5` | Notícias esportivas simuladas      |

```typescript
// src/services/apiService.ts
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 8000,
});
```

---

## 12. Design System

### Paleta de cores

| Token             | Claro     | Escuro    | Uso              |
| ----------------- | --------- | --------- | ---------------- |
| `fundo`           | `#f5f5f5` | `#0d0d0d` | Background       |
| `card`            | `#ffffff` | `#1a1a1a` | Cards e inputs   |
| `texto`           | `#1a1a1a` | `#f0f0f0` | Texto principal  |
| `textoSecundario` | `#666666` | `#aaaaaa` | Labels           |
| `primario`        | `#123b17` | `#1a5c24` | Botões e headers |
| `acento`          | `#2ECC71` | `#2ECC71` | Destaques        |
| `borda`           | `#eeeeee` | `#2a2a2a` | Divisores        |

### Status dos convites

| Status     | Cor                | Significado         |
| ---------- | ------------------ | ------------------- |
| `pendente` | Amarelo `#FFF9C4`  | Aguardando resposta |
| `aceito`   | Verde `#E8F5E9`    | Convite aceito      |
| `recusado` | Vermelho `#FFEBEE` | Convite recusado    |

---

## 13. Avisos do Console Web

Estes avisos aparecem no navegador e **não afetam o funcionamento do app**:

| Aviso                                | Causa                                    | Ação    |
| ------------------------------------ | ---------------------------------------- | ------- |
| `shadow* style props are deprecated` | RN Web deprecou props nativas de sombra  | Ignorar |
| `blob:http://... ERR_FILE_NOT_FOUND` | Expo carrega favicon via blob temporário | Ignorar |
| `props.pointerEvents is deprecated`  | Componentes internos do Expo Router      | Ignorar |

---

> Projeto Acadêmico — Desenvolvimento Mobile · Curso de Sistemas de Informação