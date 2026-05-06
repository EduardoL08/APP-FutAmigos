import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { peladas } from "../../data/arrayMeusJogos";
import { Button } from "../../components/Button";
import { InfoRow } from "../../components/InfoRow";

export default function Detalhe() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const jogo = peladas.find((p) => p.id.toString() === id);

  if (!jogo) {
    return <Text>Item não encontrado</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{jogo.titulo}</Text>

      <Text style={styles.descricao}>{jogo.descricao}</Text>

      <InfoRow label="Local" value={jogo.local} />
      <InfoRow label="Data" value={jogo.data} />
      <InfoRow label="Horário" value={jogo.horario} />
      <InfoRow label="Vagas" value={jogo.vagas} />
      <InfoRow label="Status" value={jogo.status} />
      <InfoRow label="Preço" value={jogo.preco} />

      <Button label="Participar" onPress={() => console.log("Entrou")} />
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
