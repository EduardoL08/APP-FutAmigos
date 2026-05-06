/*
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { jogos } from "../data/arrayMeusJogos";

type Props = {
  produto: jogos;
};

export default function CardMeusJogos({ produto }: Props) {
  const coresStatus = {
    organizador: { bg: "#E8F5E9", text: "#2E7D32", label: "Organizador" },
    participando: { bg: "#2ECC71", text: "#FFF", label: "Participando" },
    conviteRecebido: { bg: "#ffe604ad", text: "#000000", label: "Pendente" },
    vagasDisponiveis: { bg: "#4CAF50", text: "#FFF", label: "Vagas Disponíveis" },

  };

  const statusAtual = coresStatus[produto.status] || coresStatus.participando;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.titulo}>{produto.titulo}</Text>
          <Text style={styles.subTitulo}>{produto.descricao}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: statusAtual.bg }]}>
          <Text style={[styles.badgeText, { color: statusAtual.text }]}>
            {statusAtual.label}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.icon}>📅</Text>
        <Text style={styles.infoText}>
          {produto.data} as {produto.horario}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.icon}>📍</Text>
        <Text style={styles.infoText}>{produto.local}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <View style={styles.jogadoresContainer}>
          <View style={styles.avatarMock} />
          <Text style={styles.countText}>
            {produto.jogadores - produto.vagas}/{produto.jogadores}
          </Text>
        </View>

        {produto.status === "conviteRecebido  " ? (
          <View style={styles.botoesConvite}>
            <TouchableOpacity style={styles.btnRecusar}>
              <Text style={styles.txtRecusar}>Participa</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[
              styles.botao,
              produto.status === "participando" && styles.botaoOutline,
            ]}
            onPress={() => router.push(`../peladas/${produto.id}`)}
          >
            <Text
              style={[
                styles.botaoText,
                produto.status === "participando" && styles.botaoTextOutline,
              ]}
            >
              {produto.status === "organizador" ? "Gerenciar" : "Ver Detalhes"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  titulo: { fontSize: 18, fontWeight: "bold", color: "#1A1A1A" },
  subTitulo: { color: "#777", fontSize: 14 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  badgeText: { fontSize: 13, fontWeight: "bold" },
  infoRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  icon: { fontSize: 14, marginRight: 8 },
  infoText: { color: "#444", fontSize: 14 },
  divider: { height: 1, backgroundColor: "#F0F0F0", marginVertical: 15 },
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
  botao: {
    backgroundColor: "#2ECC71",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  botaoOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#2ECC71",
  },
  botaoText: { color: "#FFF", fontWeight: "bold" },
  botaoTextOutline: { color: "#2ECC71" },
  botoesConvite: { flexDirection: "row", gap: 10 },
  btnRecusar: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E74C3C",
  },
  txtRecusar: { color: "#E74C3C", fontWeight: "bold" },
  btnAceitar: { padding: 10, borderRadius: 10, backgroundColor: "#2ECC71" },
  txtAceitar: { color: "#FFF", fontWeight: "bold" },
});
*/
