import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { peladas } from "../data/arrayProdutos";
import ProdutoCard from "../components/produtoCard";
import { Link, router } from "expo-router";
import { Input } from "../components/Input";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const [busca, setBusca] = useState("");
  const nome = "Usuário";

  const filtrados = peladas.filter((item) =>
    item.titulo.toLowerCase().includes(busca.toLowerCase()),
  );

  function renderItem({ item }: { item: (typeof peladas)[0] }) {
    return <ProdutoCard produto={item} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.nome}>Olá, {nome}! ⚽</Text>
          <Text style={styles.subtitulo}>Pronto para o próximo jogo?</Text>
        </View>

        <TouchableOpacity onPress={() => router.push("/perfil")}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
      <Input
        placeholder="Buscar pelada"
        value={busca}
        onChangeText={setBusca}
      />
      <View style={styles.body}>
        <FlatList
          data={filtrados}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  body: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  nome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  subtitulo: {
    fontSize: 16,
    color: "#777",
    marginTop: 4,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 2,
    borderColor: "#eee",
  },
  footerContainer: {
    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#10ad25",
    width: "100%",
    height: 70,
    borderRadius: 35,
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  footerLink: {
    fontSize: 12, // Diminuímos um pouco o texto para caber com o ícone
    color: "#fff",
    fontWeight: "600",
    marginTop: 2,
  },
  link: {
    color: "#2ECC71",
    marginBottom: 10,
    fontWeight: "bold",
  },
  menuIcon: {
    fontSize: 22,
    color: "#fff",
  },
});
