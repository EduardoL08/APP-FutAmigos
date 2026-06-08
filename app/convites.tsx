import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar,
  Alert,
  Image,
} from "react-native";
import { router } from "expo-router";
import { CardConvite } from "../src/components/CardConvite";
import { Header } from "../src/components/Header";
import { useConvites } from "../src/contexts/ConvitesContext";
import { usePartidas } from "../src/contexts/PartidasContext";
import { useAuth } from "../src/contexts/AuthContext";
import { useTema } from "../src/contexts/TemaContext";

type Filtro = "pendentes" | "aceitos" | "recusados" | "todos";

export default function Convites() {
  const [filtro, setFiltro] = useState<Filtro>("pendentes");
  const { convites, aceitarConvite, recusarConvite } = useConvites();
  const { entrarNaPartida } = usePartidas();
  const { usuario } = useAuth();
  const { cores } = useTema();

  const convitesFiltrados = convites
    .filter((c) => {
      if (filtro === "todos") return c.usuarioId === 1;
      if (filtro === "pendentes")
        return c.usuarioId === 1 && c.status === "pendente";
      if (filtro === "aceitos")
        return c.usuarioId === 1 && c.status === "aceito";
      if (filtro === "recusados")
        return c.usuarioId === 1 && c.status === "recusado";
      return false;
    })
    .sort((a, b) => b.criadoEm - a.criadoEm);

  const totalPendentes = convites.filter(
    (c) => c.usuarioId === 1 && c.status === "pendente",
  ).length;

  const executarAceitar = (conviteId: number) => {
    const convite = convites.find((c) => c.id === conviteId);
    if (!convite) return;

    aceitarConvite(conviteId);

    entrarNaPartida(convite.partidaId, {
      id: Date.now(),
      usuarioId: usuario?.id ?? 1,
      partidaId: convite.partidaId,
      nome: usuario?.nome ?? "Você",
      foto: usuario?.foto ?? "https://i.pravatar.cc/80?img=8",
    });
    Alert.alert(
      "✅ Convite aceito!",
      "Você foi adicionado à partida. Confira em Meus Jogos.",
      [{ text: "OK" }],
    );
  };

  const executarRecusar = (conviteId: number) => {
    const convite = convites.find((c) => c.id === conviteId);
    if (!convite) return;
    recusarConvite(conviteId);
  };

  const handleAceitar = (conviteId: number) => {
    const convite = convites.find((c) => c.id === conviteId);
    if (!convite) return;

    if (Platform.OS === "web") {
      const ok = window.confirm(
        `Deseja entrar na partida "${convite.partidaTitulo}"?`,
      );
      if (!ok) return;
      executarAceitar(conviteId);
    } else {
      Alert.alert(
        "Aceitar convite",
        `Deseja entrar na partida "${convite.partidaTitulo}"?`,
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Aceitar", onPress: () => executarAceitar(conviteId) },
        ],
      );
    }
  };

  const handleRecusar = (conviteId: number) => {
    const convite = convites.find((c) => c.id === conviteId);
    if (!convite) return;

    if (Platform.OS === "web") {
      const ok = window.confirm(
        `Tem certeza que deseja recusar o convite para "${convite.partidaTitulo}"?`,
      );
      if (!ok) return;
      executarRecusar(conviteId);
    } else {
      Alert.alert(
        "Recusar convite",
        `Tem certeza que deseja recusar o convite para "${convite.partidaTitulo}"?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Recusar",
            style: "destructive",
            onPress: () => executarRecusar(conviteId),
          },
        ],
      );
    }
  };

  const FILTROS: { key: Filtro; label: string }[] = [
    {
      key: "pendentes",
      label: `Pendentes${totalPendentes > 0 ? ` (${totalPendentes})` : ""}`,
    },
    { key: "aceitos", label: "Aceitos" },
    { key: "recusados", label: "Recusados" },
    { key: "todos", label: "Todos" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: cores.fundo }]}>
      <View style={[styles.header, { backgroundColor: cores.fundo }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.titulo, { color: cores.texto }]}>Convites</Text>
          <Text style={[styles.subtitulo, { color: cores.textoSecundario }]}>
            Gerencie seus convites para partidas de futebol
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/perfil")}>
          <Image
            source={{ uri: usuario?.foto || "https://i.pravatar.cc/100?img=8" }}
            style={[styles.avatar, { borderColor: cores.acento }]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.filtrosContainer}>
        {FILTROS.map((f) => (
          <TouchableOpacity
            key={f.key}
            onPress={() => setFiltro(f.key)}
            style={[
              styles.filtroBtn,
              { backgroundColor: cores.card, borderColor: cores.borda },
              filtro === f.key && {
                backgroundColor: cores.primario,
                borderColor: cores.primario,
              },
            ]}
          >
            <Text
              style={[
                styles.filtroTexto,
                { color: cores.textoSecundario },
                filtro === f.key && { color: "#fff" },
              ]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={convitesFiltrados}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CardConvite
            convite={item}
            onAceitar={handleAceitar}
            onRecusar={handleRecusar}
            onVerPartida={(partidaId) =>
              router.push(`../detalhes/${partidaId}`)
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>
              {filtro === "pendentes"
                ? "📭"
                : filtro === "aceitos"
                  ? "✅"
                  : filtro === "recusados"
                    ? "❌"
                    : "📩"}
            </Text>
            <Text style={[styles.emptyTitulo, { color: cores.texto }]}>
              {filtro === "pendentes"
                ? "Nenhum convite pendente"
                : filtro === "aceitos"
                  ? "Nenhum convite aceito ainda"
                  : filtro === "recusados"
                    ? "Nenhum convite recusado"
                    : "Nenhum convite encontrado"}
            </Text>
            <Text
              style={[styles.emptySubtitulo, { color: cores.textoSecundario }]}
            >
              {filtro === "pendentes"
                ? "Quando alguém te convidar para uma pelada, aparecerá aqui."
                : "O histórico dos seus convites aparecerá aqui."}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  bannerPendente: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
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
  bannerTexto: {
    color: "#F57F17",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  filtrosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filtroBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  filtroTexto: { fontSize: 13, fontWeight: "600" },
  lista: { paddingHorizontal: 16, paddingBottom: 40 },
  emptyContainer: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyEmoji: { fontSize: 56, marginBottom: 16 },
  emptyTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtitulo: { fontSize: 14, textAlign: "center", lineHeight: 22 },
});
