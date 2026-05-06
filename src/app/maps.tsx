import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Maps() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.titulo}>Mapa de Jogos</Text>
            <Text style={styles.subtitulo}>Encontre locais próximos</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/perfil")}>
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtrosScroll}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          <TouchableOpacity style={styles.filtroAtivo}>
            <Text style={styles.filtroTextoAtivo}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filtro}>
            <Text style={styles.filtroTexto}>Quadras</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filtro}>
            <Text style={styles.filtroTexto}>Campos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filtro}>
            <Text style={styles.filtroTexto}>Society</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.mapa}>
          <Text style={{ color: "#567d5d", fontWeight: "bold" }}>
            Será integrado com API de mapas posteriormente e exibirá os locais
            próximos com base na localização do usuário.
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.cardResumo}>
            <Text style={styles.tituloCard}>12 locais encontrados</Text>
            <Text style={styles.subCard}>
              Quadras e campos em até 5 km de você.
            </Text>
            <TouchableOpacity style={styles.botaoRota}>
              <Text style={styles.botaoRotaTexto}>Ver rota mais rápida</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.section}>Locais em destaque</Text>

          <TouchableOpacity style={styles.cardLocal}>
            <View>
              <Text style={styles.nomeLocal}>Arena Zona Sul</Text>
              <Text style={styles.distancia}>1,2 km de distância</Text>
            </View>
            <Text style={{ fontSize: 20 }}>⚽</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  titulo: {
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
  filtrosScroll: {
    maxHeight: 50,
    marginBottom: 20,
  },
  filtro: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  filtroAtivo: {
    backgroundColor: "#123b17",
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: "center",
  },
  filtroTexto: { color: "#666", fontWeight: "600" },
  filtroTextoAtivo: { color: "#fff", fontWeight: "bold" },
  mapa: {
    width: width - 40,
    height: height * 0.25,
    backgroundColor: "#cde5d1",
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#b5d4ba",
    borderStyle: "dashed",
  },
  content: {
    paddingHorizontal: 20,
  },
  cardResumo: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tituloCard: { fontSize: 18, fontWeight: "bold" },
  subCard: { color: "#777", marginTop: 5 },
  botaoRota: {
    backgroundColor: "#e6f4ea",
    marginTop: 15,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  botaoRotaTexto: { color: "#123b17", fontWeight: "bold" },
  section: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#123b17",
  },
  cardLocal: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  nomeLocal: { fontSize: 16, fontWeight: "bold" },
  distancia: { color: "#2ECC71", marginTop: 4, fontWeight: "600" },
});
