import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { InfoRow } from "../../src/components/InfoRow";
import { BotaoPadrao } from "../../src/components/BotaoPadrao";
import { ModalEnviarConvite } from "../../src/components/ModalEnviarConvite";
import { usePartidas } from "../../src/contexts/PartidasContext";
import { useAuth } from "../../src/contexts/AuthContext";
import { useTema } from "../../src/contexts/TemaContext";
import { useConvites } from "../../src/contexts/ConvitesContext";
import { useApiJogadores } from "../../src/hooks/useApiJogadores";

export default function DetalhePartida() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const {
    partidas,
    entrarNaPartida,
    sairDaPartida,
    removerPartida,
    participantesDaPartida,
  } = usePartidas();
  const { usuario } = useAuth();
  const { cores } = useTema();
  const { convites } = useConvites();
  const { jogadores: jogadoresAPI, carregando: carregandoAPI } =
    useApiJogadores();
  const [modalConviteVisivel, setModalConviteVisivel] = useState(false);
  const [saindo, setSaindo] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  const partida = partidas.find((p) => p.id.toString() === id);

  if (!partida) {
    return (
      <View style={[styles.naoEncontrado, { backgroundColor: cores.fundo }]}>
        <Text
          style={[styles.naoEncontradoTexto, { color: cores.textoSecundario }]}
        >
          Partida não encontrada 😕
        </Text>
      </View>
    );
  }

  const isOrganizador =
    partida.status === "organizador" && partida.criadorId === usuario?.id;

  const temVaga = partida.vagas > 0;
  const ocupados = partida.jogadores - partida.vagas;
  const listaParticipantes = participantesDaPartida(partida.id);
  const pct = Math.round((ocupados / partida.jogadores) * 100);
  const convitesDaPartida = convites.filter((c) => c.partidaId === partida.id);

  const handleEntrar = () => {
    if (!temVaga) {
      Alert.alert("Sem vagas", "Essa partida está cheia.");
      return;
    }
    entrarNaPartida(partida.id, {
      id: Date.now(),
      usuarioId: usuario?.id ?? 1,
      partidaId: partida.id,
      nome: usuario?.nome ?? "Você",
      foto: usuario?.foto ?? "https://i.pravatar.cc/80?img=8",
    });
    Alert.alert("✅ Sucesso", "Você entrou na partida!");
  };

  const handleSair = () => {
    if (Platform.OS === "web") {
      const ok = window.confirm("Tem certeza que quer sair desta partida?");
      if (!ok) return;
      executarSaida();
    } else {
      Alert.alert("Sair da Partida", "Tem certeza que quer sair?", [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", style: "destructive", onPress: executarSaida },
      ]);
    }
  };

  const executarSaida = () => {
    setSaindo(true);
    sairDaPartida(partida.id, usuario?.id ?? 1);
    router.back();
  };

  const handleExcluir = () => {
    if (Platform.OS === "web") {
      const ok = window.confirm(
        "Excluir a partida? Essa ação não pode ser desfeita.",
      );
      if (!ok) return;
      executarExclusao();
    } else {
      Alert.alert("Excluir Partida", "Essa ação não pode ser desfeita.", [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: executarExclusao },
      ]);
    }
  };

  const executarExclusao = () => {
    setExcluindo(true);
    removerPartida(partida.id);
    router.replace("/home");
  };

  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: cores.fundo }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.hero, { backgroundColor: cores.card }]}>
          <Text style={styles.emoji}>⚽</Text>
          <Text style={[styles.titulo, { color: cores.texto }]}>
            {partida.titulo}
          </Text>
          <Text style={[styles.descricao, { color: cores.textoSecundario }]}>
            {partida.descricao}
          </Text>
          <View
            style={[styles.precoBadge, { backgroundColor: cores.primario }]}
          >
            <Text style={styles.precoTexto}>R$ {partida.preco.toFixed(2)}</Text>
          </View>
          <View style={styles.barraContainer}>
            <View style={[styles.barraFundo, { backgroundColor: cores.borda }]}>
              <View
                style={[
                  styles.barraPreenchida,
                  {
                    width: `${pct}%` as any,
                    backgroundColor: pct >= 100 ? "#e53935" : "#2ECC71",
                  },
                ]}
              />
            </View>
            <Text style={[styles.barraLabel, { color: cores.textoSecundario }]}>
              {ocupados}/{partida.jogadores} jogadores ({pct}%)
            </Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <InfoRow label="Local" valor={partida.local} icone="📍" />
          <InfoRow label="Data" valor={partida.data} icone="📅" />
          <InfoRow label="Horário" valor={partida.horario} icone="🕐" />
          <InfoRow
            label="Vagas"
            valor={
              partida.vagas > 0 ? `${partida.vagas} disponíveis` : "Esgotado"
            }
            icone="🎫"
          />
        </View>

        <View style={[styles.secao, { backgroundColor: cores.card }]}>
          <Text style={[styles.secaoTitulo, { color: cores.primario }]}>
            👥 Quem está na partida ({listaParticipantes.length})
          </Text>
          {listaParticipantes.length === 0 ? (
            <Text style={[styles.emptyLabel, { color: cores.textoSecundario }]}>
              Nenhum participante ainda. Seja o primeiro!
            </Text>
          ) : (
            <View style={styles.avatarRow}>
              {listaParticipantes.slice(0, 8).map((p) => (
                <View key={p.id} style={styles.avatarItem}>
                  <Image
                    source={{
                      uri:
                        p.foto || `https://i.pravatar.cc/80?u=${p.usuarioId}`,
                    }}
                    style={[styles.avatarImg, { borderColor: cores.acento }]}
                  />
                  <Text
                    style={[
                      styles.avatarNome,
                      { color: cores.textoSecundario },
                    ]}
                    numberOfLines={1}
                  >
                    {p.nome?.split(" ")[0] ?? "Jogador"}
                  </Text>
                </View>
              ))}
              {listaParticipantes.length > 8 && (
                <View style={styles.avatarItem}>
                  <View
                    style={[
                      styles.avatarImgMais,
                      { backgroundColor: cores.primario },
                    ]}
                  >
                    <Text style={styles.avatarMaisTexto}>
                      +{listaParticipantes.length - 8}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>

        {isOrganizador && convitesDaPartida.length > 0 && (
          <View style={[styles.secao, { backgroundColor: cores.card }]}>
            <Text style={[styles.secaoTitulo, { color: cores.primario }]}>
              📩 Convites enviados ({convitesDaPartida.length})
            </Text>
            {convitesDaPartida.map((c) => {
              const statusCor = {
                pendente: "#F57F17",
                aceito: "#2E7D32",
                recusado: "#e53935",
              };
              const statusBg = {
                pendente: "#FFF9C4",
                aceito: "#E8F5E9",
                recusado: "#FFEBEE",
              };
              const statusLabel = {
                pendente: "Pendente",
                aceito: "Aceito",
                recusado: "Recusado",
              };
              return (
                <View
                  key={c.id}
                  style={[
                    styles.conviteRow,
                    { borderBottomColor: cores.borda },
                  ]}
                >
                  <View
                    style={[
                      styles.conviteStatusDot,
                      { backgroundColor: statusBg[c.status] },
                    ]}
                  >
                    <Text
                      style={[
                        styles.conviteStatusTexto,
                        { color: statusCor[c.status] },
                      ]}
                    >
                      {statusLabel[c.status]}
                    </Text>
                  </View>
                  <Text style={[styles.conviteNome, { color: cores.texto }]}>
                    Jogador #{c.usuarioId}
                  </Text>
                </View>
              );
            })}
          </View>
        )}

        <View style={[styles.secao, { backgroundColor: cores.card }]}>
          <Text style={[styles.secaoTitulo, { color: cores.primario }]}>
            🌐 Jogadores em Destaque
          </Text>
          <Text style={[styles.secaoSub, { color: cores.textoSecundario }]}>
            Via Axios + JSONPlaceholder (MockAPI)
          </Text>
          {carregandoAPI ? (
            <Text style={[styles.emptyLabel, { color: cores.textoSecundario }]}>
              Carregando...
            </Text>
          ) : (
            <FlatList
              data={jogadoresAPI.slice(0, 3)}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View
                  style={[styles.apiCard, { borderBottomColor: cores.borda }]}
                >
                  <Image
                    source={{ uri: `https://i.pravatar.cc/60?img=${item.id}` }}
                    style={styles.apiAvatar}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.apiNome, { color: cores.texto }]}>
                      {item.name}
                    </Text>
                    <Text
                      style={[
                        styles.apiEmail,
                        { color: cores.textoSecundario },
                      ]}
                    >
                      {item.email}
                    </Text>
                  </View>
                </View>
              )}
            />
          )}
        </View>

        <View style={styles.acoes}>
          {!partida.participando && !isOrganizador && (
            <BotaoPadrao
              label={temVaga ? "⚽ Entrar na Partida" : "Sem Vagas"}
              onPress={handleEntrar}
              desabilitado={!temVaga}
              variante="primario"
            />
          )}

          {partida.participando && !isOrganizador && (
            <BotaoPadrao
              label="🚪 Sair da Partida"
              onPress={handleSair}
              variante="perigo"
              carregando={saindo}
            />
          )}

          {isOrganizador && (
            <>
              <View
                style={[
                  styles.organizadorBadge,
                  { backgroundColor: "#E8F5E9" },
                ]}
              >
                <Text style={styles.organizadorLabel}>
                  ⭐ Você é o organizador
                </Text>
              </View>
              <BotaoPadrao
                label="📩 Convidar Jogadores"
                onPress={() => setModalConviteVisivel(true)}
                variante="primario"
              />
              <BotaoPadrao
                label="✏️ Editar Partida"
                onPress={() =>
                  router.push(`../../editar-partida/${partida.id}`)
                }
                variante="secundario"
              />
              <BotaoPadrao
                label="🗑️ Excluir Partida"
                onPress={handleExcluir}
                variante="perigo"
                carregando={excluindo}
              />
            </>
          )}
        </View>
      </ScrollView>

      <ModalEnviarConvite
        visivel={modalConviteVisivel}
        partida={partida}
        onFechar={() => setModalConviteVisivel(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  naoEncontrado: { flex: 1, justifyContent: "center", alignItems: "center" },
  naoEncontradoTexto: { fontSize: 18 },
  hero: {
    margin: 16,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  emoji: { fontSize: 48, marginBottom: 10 },
  titulo: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  descricao: { fontSize: 14, marginTop: 6, textAlign: "center" },
  precoBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 14,
  },
  precoTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  barraContainer: { width: "100%", marginTop: 16 },
  barraFundo: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 6,
  },
  barraPreenchida: { height: 8, borderRadius: 4 },
  barraLabel: { fontSize: 12, textAlign: "center" },
  infoContainer: { paddingHorizontal: 16 },
  secao: {
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  secaoTitulo: { fontSize: 15, fontWeight: "bold", marginBottom: 4 },
  secaoSub: { fontSize: 12, marginBottom: 12 },
  emptyLabel: { fontSize: 13, textAlign: "center", paddingVertical: 12 },
  avatarRow: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 10 },
  avatarItem: { alignItems: "center", width: 56 },
  avatarImg: { width: 48, height: 48, borderRadius: 24, borderWidth: 2 },
  avatarNome: { fontSize: 10, marginTop: 4, textAlign: "center" },
  avatarImgMais: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarMaisTexto: { color: "#fff", fontWeight: "bold", fontSize: 13 },
  conviteRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    gap: 10,
  },
  conviteStatusDot: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  conviteStatusTexto: { fontSize: 11, fontWeight: "bold" },
  conviteNome: { fontSize: 14 },
  apiCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    gap: 10,
  },
  apiAvatar: { width: 42, height: 42, borderRadius: 21 },
  apiNome: { fontSize: 14, fontWeight: "bold" },
  apiEmail: { fontSize: 12, marginTop: 2 },
  acoes: { padding: 16, paddingBottom: 40, gap: 10 },
  organizadorBadge: { padding: 12, borderRadius: 12, alignItems: "center" },
  organizadorLabel: { color: "#2E7D32", fontWeight: "bold", fontSize: 14 },
});
