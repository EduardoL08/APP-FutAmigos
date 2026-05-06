import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { peladas } from "../data/arrayMeusJogos";
import CardMeusJogos from "../components/cardMeusJogos";
import { router } from "expo-router";

export default function MeusJogos() {
  const [abaAtiva, setAbaAtiva] = useState("Próximos");

  const dadosFiltrados = peladas.filter((p) => {
    if (abaAtiva === "Próximos") {
      return (
        p.participando === true &&
        (p.status === "participando" || p.status === "organizador")
      );
    } else {
      return p.status === "conviteRecebido";
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Meus Jogos</Text>
          <Text style={styles.headerSub}>Confira seus convites</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/perfil")}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        {["Próximos", "Convites"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setAbaAtiva(tab)}
            style={[
              styles.tabButton,
              abaAtiva === tab && styles.tabButtonActive,
            ]}
          >
            <Text
              style={[styles.tabText, abaAtiva === tab && styles.tabTextActive]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={dadosFiltrados}
        renderItem={({ item }) => <CardMeusJogos jogos={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/criarJogos")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    flexDirection: "row",
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: { fontSize: 26, fontWeight: "bold" },
  headerSub: { color: "#666" },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  tabButtonActive: { backgroundColor: "#123b17" },
  tabTextActive: { color: "#fff" },
  tabText: { fontWeight: "600", color: "#666" },
  fab: {
    position: "absolute",
    bottom: 115,
    right: 20,
    backgroundColor: "#123b17",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  fabText: { color: "#fff", fontSize: 28 },
});
