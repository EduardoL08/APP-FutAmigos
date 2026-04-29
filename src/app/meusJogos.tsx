import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { peladas } from "../data/arrayProdutos";
import ProdutoCard from "../components/produtoCard";
import { Header } from "../components/Header";
import { EmptyList } from "../components/EmptyList";

export default function MeusJogos() {
  const meusJogos = peladas.filter((item) => item.vagas < item.jogadores);

  function renderItem({ item }: { item: typeof peladas[0] }) {
    return <ProdutoCard produto={item} />;
  }

  return (
    <View style={styles.container}>
      <Header title="Meus Jogos" />

      <FlatList
        data={meusJogos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <EmptyList message="Você ainda não entrou em nenhuma pelada" />
        }
      />

       <TouchableOpacity style={styles.fab}>
              <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  vazio: {
    marginTop: 20,
    textAlign: "center",
    color: "#999",
  },
   fab: {
    position: "absolute",
    bottom: 110, // Subi o FAB para não bater na barra nova
    right: 25,
    backgroundColor: "#2ECC71",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabText: {
    color: "#fff",
    fontSize: 28,
    textAlign: "center",
    lineHeight: 28,
    fontWeight: "bold",
  },
});
