import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { jogos } from "../data/arrayMeusJogos";

type Props = {
  jogos: jogos;
};

export default function CardMeusJogos({ jogos }: Props) {
  const coresStatus = {
    organizador: { bg: "#E8F5E9", text: "#2E7D32", label: "Organizador" },
    participando: { bg: "#2ECC71", text: "#FFF", label: "Participando" },
    conviteRecebido: { bg: "#ffe604ad", text: "#000000", label: "Convite" },
    entrar: { bg: "#49644a", text: "#FFF", label: "Entrar" },
  };

  const statusAtual = coresStatus[jogos.status] || coresStatus.participando;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => router.push(`../detalhes/${jogos.id}`)}
    >
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={styles.titulo}>{jogos.titulo}</Text>
          <Text style={styles.subTitulo}>{jogos.descricao}</Text>
        </View>
        <View style={[styles.status, { backgroundColor: statusAtual.bg }]}>
          <Text style={[styles.statusText, { color: statusAtual.text }]}>
            {statusAtual.label}
          </Text>
        </View>
      </View>

      <View style={styles.dividir} />

      <View style={styles.footer}>
        <View style={styles.jogadoresContainer}>
          <View style={styles.avatarMock} />
          <Text style={styles.countText}>
            {jogos.jogadores - jogos.vagas}/{jogos.jogadores}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2ECC71",
    elevation: 2,
    shadowColor: "#00fc3f",
    shadowRadius: 4,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  textContainer: {
    flex: 1,
    paddingRight: 10,
  },

  titulo: { fontSize: 16, fontWeight: "bold", marginRight: 8 },

  subTitulo: { color: "#777", fontSize: 15 },

  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: { fontSize: 14, fontWeight: "bold", textAlign: "center" },

  dividir: { height: 1, backgroundColor: "#F0F0F0", marginVertical: 15 },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jogadoresContainer: { flexDirection: "row", alignItems: "center" },

  avatarMock: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#EEE",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  countText: { marginLeft: 8, fontWeight: "600", color: "#333" },
});
