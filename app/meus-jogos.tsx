import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  RefreshControl,
} from "react-native";
import { router } from "expo-router";
import { CardPartida } from "../src/components/CardPartida";
import { ListaSkeleton } from "../src/components/SkeletonCard";
import { usePartidas } from "../src/contexts/PartidasContext";
import { useAuth } from "../src/contexts/AuthContext";
import { useTema } from "../src/contexts/TemaContext";
import { useConvites } from "../src/contexts/ConvitesContext";
import { Partida } from "../src/types/partida";

type Aba = "Próximos" | "Organizando";

export default function MeusJogos() {
  const [abaAtiva, setAbaAtiva] = useState<Aba>("Próximos");
  const { partidas, carregando, recarregar } = usePartidas();
  const { usuario } = useAuth();
  const { cores } = useTema();
  const { totalPendentes } = useConvites();

  const dadosFiltrados = partidas.filter((p: Partida) => {
    if (abaAtiva === "Próximos")
      return p.participando && p.status === "participando";
    if (abaAtiva === "Organizando")
      return p.status === "organizador" && p.criadorId === usuario?.id;
    return false;
  });

  const onRefresh = useCallback(async () => {
    await recarregar();
  }, [recarregar]);

  return (
    <View style={[styles.container, { backgroundColor: cores.fundo }]}>
      <View style={[styles.header, { backgroundColor: cores.fundo }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.titulo, { color: cores.texto }]}>
            Meus Jogos
          </Text>
          <Text style={[styles.subtitulo, { color: cores.textoSecundario }]}>
            Gerencie suas partidas
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/perfil")}>
          <Image
            source={{ uri: usuario?.foto || "https://i.pravatar.cc/100?img=8" }}
            style={[styles.avatar, { borderColor: cores.acento }]}
          />
        </TouchableOpacity>
      </View>

      {totalPendentes > 0 && (
        <TouchableOpacity
          style={styles.bannerConvite}
          onPress={() => router.push("/convites")}
          activeOpacity={0.8}
        >
          <Text style={styles.bannerTexto}>
            📩 {totalPendentes} convite{totalPendentes > 1 ? "s" : ""}{" "}
            aguardando resposta
          </Text>
          <Text style={styles.bannerVerTodos}>Ver todos →</Text>
        </TouchableOpacity>
      )}

      <View style={styles.tabContainer}>
        {(["Próximos", "Organizando"] as Aba[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setAbaAtiva(tab)}
            style={[
              styles.tabButton,
              { backgroundColor: cores.card, borderColor: cores.borda },
              abaAtiva === tab && styles.tabButtonAtivo,
            ]}
          >
            <Text
              style={[
                styles.tabTexto,
                { color: cores.textoSecundario },
                abaAtiva === tab && styles.tabTextoAtivo,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {carregando && partidas.length === 0 ? (
        <View style={{ paddingHorizontal: 16 }}>
          <ListaSkeleton />
        </View>
      ) : (
        <FlatList
          data={dadosFiltrados}
          renderItem={({ item }) => <CardPartida partida={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 130 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={carregando}
              onRefresh={onRefresh}
              colors={["#2ECC71"]}
              tintColor="#2ECC71"
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>
                {abaAtiva === "Próximos" ? "🏃" : "🏟️"}
              </Text>
              <Text
                style={[styles.emptyText, { color: cores.textoSecundario }]}
              >
                {abaAtiva === "Próximos"
                  ? "Você não está em nenhuma partida ainda.\nExplore a Home e entre em uma!"
                  : "Você ainda não organizou nenhuma partida."}
              </Text>
              {abaAtiva === "Organizando" && (
                <TouchableOpacity
                  style={[
                    styles.emptyBotao,
                    { backgroundColor: cores.primario },
                  ]}
                  onPress={() => router.push("/criar-partida")}
                >
                  <Text style={styles.emptyBotaoTexto}>
                    Criar minha primeira partida
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          }
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: cores.acento }]}
        onPress={() => router.push("/criar-partida")}
      >
        <Text style={styles.fabTexto}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 8 : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  titulo: { fontSize: 26, fontWeight: "bold" },
  subtitulo: { fontSize: 14, marginTop: 2 },
  avatar: { width: 50, height: 50, borderRadius: 25, borderWidth: 2 },
  bannerConvite: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: "#FFF9C4",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F9A825",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bannerTexto: { color: "#F57F17", fontWeight: "bold", fontSize: 13 },
  bannerVerTodos: { color: "#F57F17", fontSize: 12, fontWeight: "600" },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 14,
    gap: 8,
  },
  tabButton: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  tabButtonAtivo: { backgroundColor: "#123b17", borderColor: "#123b17" },
  tabTexto: { fontWeight: "600", fontSize: 12 },
  tabTextoAtivo: { color: "#fff" },
  emptyContainer: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 30,
  },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { textAlign: "center", fontSize: 15, lineHeight: 22 },
  emptyBotao: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  emptyBotaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  fab: {
    position: "absolute",
    bottom: 110,
    right: 20,
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#2ECC71",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  fabTexto: { color: "#fff", fontSize: 30, marginTop: -2 },
});
