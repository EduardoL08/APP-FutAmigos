import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { produto } from "../data/arrayProdutos";


type Props = {
  produto: produto;
};

export default function ProdutoCard({ produto }: Props) {
  return (
   <View style={styles.card}>

  <View style={styles.topo}>
    <Text style={styles.titulo}>{produto.titulo}</Text>

    <View style={styles.badge}>
      <Text style={styles.badgeText}>
        {produto.vagas > 0 ? "Vagas Abertas" : "Esgotado"}
      </Text>
    </View>
  </View>

  <Text style={styles.sub}>
    {produto.local} • {produto.nivel}
  </Text>

  <Text style={styles.info}>
    {produto.data} • {produto.horario}
  </Text>

  <Text style={styles.info}>
    📍 {produto.local}
  </Text>

  <View style={styles.footer}>
    <Text>
      {produto.jogadores - produto.vagas}/{produto.jogadores}
    </Text>

    <TouchableOpacity style={styles.botao} onPress={() => router.push(`../peladas/${produto.id}`)}>
      <Text style={styles.botaoText}>Participar</Text>
    </TouchableOpacity>
  </View>

</View>
  );
}

const styles = StyleSheet.create({
 card: {
  backgroundColor: "#fff",
  padding: 16,
  borderRadius: 16,
  marginBottom: 15,
},

topo: {
  flexDirection: "row",
  justifyContent: "space-between",
},

titulo: {
  fontSize: 18,
  fontWeight: "bold",
},

badge: {
  backgroundColor: "#2ECC71",
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 8,
},

badgeText: {
  color: "#fff",
  fontSize: 12,
},

sub: {
  color: "#777",
  marginTop: 4,
},

info: {
  marginTop: 6,
  color: "#555",
},

footer: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 15,
},

botao: {
  backgroundColor: "#2ECC71",
  paddingHorizontal: 20,
  paddingVertical: 8,
  borderRadius: 10,
},

botaoText: {
  color: "#fff",
  fontWeight: "bold",
},
});
