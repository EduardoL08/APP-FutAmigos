import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { Input } from "../components/Input";

export default function CriarJogos() {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    preco: "",
    local: "",
    data: "",
    horario: "",
    jogadores: "",
  });

  const handleSalvar = () => {
    console.log("Novo Jogo:", form);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.titulo}>Novo Jogo</Text>
            <Text style={styles.subtitulo}>Preencha os detalhes do jogo</Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.label}>Nome do Jogo</Text>
            <Input
              placeholder="Ex: Jogo dos Amigos"
              value={form.titulo}
              onChangeText={(t) => setForm({ ...form, titulo: t })}
            />

            <Text style={styles.label}>Descrição</Text>
            <Input
              placeholder="Ex: Jogo de caridade"
              value={form.descricao}
              onChangeText={(t) => setForm({ ...form, descricao: t })}
            />

            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Data</Text>
                <Input
                  placeholder="DD/MM/AAAA"
                  value={form.data}
                  onChangeText={(t) => setForm({ ...form, data: t })}
                />
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Horário</Text>
                <Input
                  placeholder="HH:mm"
                  value={form.horario}
                  onChangeText={(t) => setForm({ ...form, horario: t })}
                />
              </View>
            </View>

            <Text style={styles.label}>Local (Endereço)</Text>
            <Input
              placeholder="Ex: Arena Pampulha"
              value={form.local}
              onChangeText={(t) => setForm({ ...form, local: t })}
            />

            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Nº de Jogadores</Text>
                <Input
                  placeholder="Ex: 14"
                  keyboardType="numeric"
                  value={form.jogadores}
                  onChangeText={(t) => setForm({ ...form, jogadores: t })}
                />
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Preço por pessoa</Text>
                <Input
                  placeholder="R$ 0,00"
                  keyboardType="numeric"
                  value={form.preco}
                  onChangeText={(t) => setForm({ ...form, preco: t })}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSalvar}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Criar Jogo</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 150,
  },
  header: {
    marginTop: 0,
    marginBottom: 15,
    alignItems: "flex-start",
    paddingLeft: 10,
  },
 titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
  },
  subtitulo: {
    fontSize: 15,
    color: "#666",
    marginTop: 2,
  },
  formCard: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginTop: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
    marginTop: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 0.48,
  },
  button: {
    backgroundColor: "#123b17",
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    elevation: 4,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
