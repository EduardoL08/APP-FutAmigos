import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";

export default function Maps() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mapa com Locais dos Jogos</Text>

      <View style={styles.filtros}>
        <TouchableOpacity style={styles.filtroAtivo}>
          <Text style={styles.filtroTextoAtivo}>Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filtro}>
          <Text>Quadras</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filtro}>
          <Text>Campos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mapaFake}>
        <iframe
          src="https://www.google.com/maps?q=-19.9167,-43.9345&z=13&output=embed"
          style={styles.iframe}
        />
      </View>

      <View style={styles.cardResumo}>
        <Text style={styles.tituloCard}>12 locais próximos</Text>
        <Text style={styles.subCard}>
          Quadras, campos e sociedade em até 5 km
        </Text>

        <TouchableOpacity style={styles.botaoRota}>
          <Text>Ver rota</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.section}>Locais em destaque</Text>

      <View style={styles.cardLocal}>
        <Text style={styles.nome}>Arena Zona Sul</Text>
        <Text style={styles.distancia}>1,2 km</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },

  subtitle: {
    color: "#888",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
  },

  filtros: {
    flexDirection: "row",
    marginBottom: 15,
  },

  filtro: {
    backgroundColor: "#eee",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 10,
  },

  filtroAtivo: {
    backgroundColor: "#2ECC71",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 10,
  },

  filtroTextoAtivo: {
    color: "#fff",
    fontWeight: "bold",
  },

  mapaFake: {
    height: 200,
    backgroundColor: "#cde5d1",
    borderRadius: 16,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  cardResumo: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
  },

  tituloCard: {
    fontSize: 16,
    fontWeight: "bold",
  },

  subCard: {
    color: "#777",
    marginTop: 5,
  },

  botaoRota: {
    backgroundColor: "#e6f4ea",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  section: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  cardLocal: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
  },

  nome: {
    fontSize: 16,
    fontWeight: "bold",
  },

  distancia: {
    color: "#2ECC71",
    marginTop: 5,
  },
  iframe: {
    width: "100%",
    height: "100%",
    borderWidth: 0,
  },
});
