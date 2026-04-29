import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Header } from "@/components/Header";

export default function Perfil() {
  return (
    <View style={styles.container}>
      <Header title="Perfil" />

      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.valor}>Eduardo Lourenço</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.valor}>email@email.com</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Cidade</Text>
        <Text style={styles.valor}>Belo Horizonte</Text>
      </View>

      <Link href="../configuracoes">
        <Text style={styles.link}>Ir para Configurações</Text>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  valor: {
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#2ECC71",
    marginTop: 20,
    fontWeight: "bold",
  },
});