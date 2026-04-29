import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { peladas } from "../../data/arrayProdutos";
import { Button } from "../../components/Button";
import { InfoRow } from "../../components/InfoRow";

export default function Detalhe() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const produto = peladas.find((p) => p.id.toString() === id);

  if (!produto) {
    return <Text>Item não encontrado</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{produto.titulo}</Text>

      <Text style={styles.descricao}>{produto.descricao}</Text>

      <InfoRow label="Local" value={produto.local} />
      <InfoRow label="Data" value={produto.data} />
      <InfoRow label="Horário" value={produto.horario} />
      <InfoRow label="Vagas" value={produto.vagas} />
      <InfoRow label="Status" value={produto.status} />

      <Button label="Entrar na pelada" onPress={() => console.log("Entrou")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
  },
  descricao: {
    marginTop: 10,
    fontSize: 16,
  },
  preco: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#2ECC71",
  },
  botao: {
    backgroundColor: "#2ECC71",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
});
