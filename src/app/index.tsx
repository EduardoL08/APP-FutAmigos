import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { peladas } from "../data/arrayMeusJogos";
import CardMeusJogos from "../components/cardMeusJogos";
import { router } from "expo-router";
import { Input } from "../components/Input";

const { width } = Dimensions.get("window");

export default function Index() {
  const [busca, setBusca] = useState("");
  const nome = "Usuário";

  const filtrados = peladas.filter(
    (item) =>
      item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      item.local.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.nome}>Olá, {nome}! </Text>
          <Text style={styles.subtitulo}>Pronto para o próximo jogo?</Text>
        </View>

        <TouchableOpacity onPress={() => router.push("/perfil")}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Input
          placeholder="Buscar pelada ou local"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <FlatList
        data={filtrados}
        renderItem={({ item }) => <CardMeusJogos jogos={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  nome: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  subtitulo: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#999",
  },
});
