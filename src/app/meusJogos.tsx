import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { peladas } from "../data/arrayProdutos";
import ProdutoCard from "../components/produtoCard";
import { router } from "expo-router";

export default function MeusJogos() {
  const [abaAtiva, setAbaAtiva] = useState("Próximos");

  const dadosFiltrados = peladas.filter(p => p.estouParticipando);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Meus Jogos</Text>
          <Text style={styles.headerSub}>Confira seus próximos jogos e convites</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/perfil")}>
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              style={styles.avatar}
            />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        {["Próximos", "Convites", "Histórico"].map((tab) => (
          <TouchableOpacity 
            key={tab}
            onPress={() => setAbaAtiva(tab)}
            style={[styles.tabButton, abaAtiva === tab && styles.tabButtonActive]}
          >
            <Text style={[styles.tabText, abaAtiva === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.body}>
      <FlatList
        data={dadosFiltrados}
        renderItem={({ item }) => <ProdutoCard produto={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      </View>

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
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#000000' },
  headerSub: { color: '#666', fontSize: 14 },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 2,
    borderColor: "#eee",
  },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, paddingHorizontal: 20,  },
  tabButton: { 
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    borderRadius: 8, 
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EEE'
  },
  tabButtonActive: { backgroundColor: '#27AE60', borderColor: '#27AE60' },
  tabText: { color: '#666', fontWeight: '600' },
  tabTextActive: { color: '#FFF' },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#27AE60",
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  fabText: { color: "#fff", fontSize: 30 },
});