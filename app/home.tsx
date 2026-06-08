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
  TextInput,
} from "react-native";
import { router } from "expo-router";
import { CardPartida } from "../src/components/CardPartida";
import { ListaSkeleton } from "../src/components/SkeletonCard";
import { usePartidas } from "../src/contexts/PartidasContext";
import { useAuth } from "../src/contexts/AuthContext";
import { useTema } from "../src/contexts/TemaContext";
import { Partida } from "../src/types/partida";

type Filtro = "todas" | "abertas" | "minhas";

export default function Home() {
  const [busca, setBusca] = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState<Filtro>("todas");
  const { partidas, carregando, recarregar } = usePartidas();
  const { usuario } = useAuth();
  const { cores } = useTema();

  const filtradas = partidas.filter((p: Partida) => {
    const buscaOk =
      p.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      p.local.toLowerCase().includes(busca.toLowerCase());
    const filtroOk =
      filtroAtivo === "todas" ||
      (filtroAtivo === "abertas" && p.vagas > 0) ||
      (filtroAtivo === "minhas" && p.participando);
    return buscaOk && filtroOk;
  });

  const onRefresh = useCallback(async () => {
    await recarregar();
  }, [recarregar]);

  const TABS: { key: Filtro; label: string }[] = [
    { key: "todas", label: "Todas" },
    { key: "abertas", label: "Com Vagas" },
    { key: "minhas", label: "Minhas" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: cores.fundo }]}>
      <View style={[styles.header, { backgroundColor: cores.fundo }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.titulo, { color: cores.texto }]}>
            Olá, {usuario?.nome?.split(" ")[0] ?? "Jogador"}! ⚽
          </Text>
          <Text style={[styles.subtitulo, { color: cores.textoSecundario }]}>
            Pronto para o próximo jogo?
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/perfil")}>
          <Image
            source={{ uri: usuario?.foto || "https://i.pravatar.cc/100?img=8" }}
            style={[styles.avatar, { borderColor: cores.acento }]}
          />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.searchWrapper,
          { backgroundColor: cores.card, borderColor: cores.borda },
        ]}
      >
        <Text style={{ fontSize: 16, marginRight: 8 }}>🔍</Text>
        <TextInput
          style={[styles.searchInput, { color: cores.texto }]}
          placeholder="Buscar partida ou local..."
          placeholderTextColor={cores.placeholder}
          value={busca}
          onChangeText={setBusca}
        />
        {busca.length > 0 && (
          <TouchableOpacity onPress={() => setBusca("")}>
            <Text style={{ color: cores.textoSecundario, fontSize: 18 }}>
              ✕
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setFiltroAtivo(tab.key)}
            style={[
              styles.tabButton,
              { backgroundColor: cores.card, borderColor: cores.borda },
              filtroAtivo === tab.key && styles.tabButtonAtivo,
            ]}
          >
            <Text
              style={[
                styles.tabTexto,
                { color: cores.textoSecundario },
                filtroAtivo === tab.key && styles.tabTextoAtivo,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {carregando && partidas.length === 0 ? (
        <View style={{ paddingHorizontal: 20 }}>
          <ListaSkeleton />
        </View>
      ) : (
        <FlatList
          data={filtradas}
          renderItem={({ item }) => <CardPartida partida={item} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
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
              <Text style={styles.emptyEmoji}>😕</Text>
              <Text
                style={[styles.emptyText, { color: cores.textoSecundario }]}
              >
                Nenhuma partida encontrada
              </Text>
            </View>
          }
        />
      )}
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
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
  },
  searchInput: { flex: 1, fontSize: 15 },
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
  tabTexto: { fontWeight: "600", fontSize: 13 },
  tabTextoAtivo: { color: "#fff" },
  listContent: { paddingHorizontal: 20, paddingBottom: 130 },
  emptyContainer: { alignItems: "center", paddingTop: 60 },
  emptyEmoji: { fontSize: 44, marginBottom: 10 },
  emptyText: { fontSize: 16 },
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
  },
  fabTexto: { color: "#fff", fontSize: 30, marginTop: -2 },
});
