import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Partida } from "../types/partida";
import { useTema } from "../contexts/TemaContext";
import { sombra } from "../utils/estilos";

type Props = { partida: Partida };

const CORES_STATUS = {
  organizador: { bg: "#E8F5E9", texto: "#2E7D32", label: "Organizador" },
  participando: { bg: "#2ECC71", texto: "#FFF", label: "Participando" },
  conviteRecebido: { bg: "#FFF9C4", texto: "#F57F17", label: "Convite" },
  entrar: { bg: "#123b17", texto: "#FFF", label: "Entrar" },
};

export function CardPartida({ partida }: Props) {
  const { cores } = useTema();
  const statusAtual = CORES_STATUS[partida.status] ?? CORES_STATUS.entrar;
  const ocupados = partida.jogadores - partida.vagas;
  const cheio = partida.vagas === 0;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: cores.card,
          borderColor: cheio ? cores.borda : "#2ECC71",
        },
        sombra("suave"),
      ]}
      activeOpacity={0.75}
      onPress={() => router.push(`../detalhes/${partida.id}`)}
    >
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={[styles.titulo, { color: cores.texto }]}>
            {partida.titulo}
          </Text>
          <Text
            style={[styles.descricao, { color: cores.textoSecundario }]}
            numberOfLines={1}
          >
            {partida.descricao}
          </Text>
        </View>
        <View style={[styles.badge, { backgroundColor: statusAtual.bg }]}>
          <Text style={[styles.badgeTexto, { color: statusAtual.texto }]}>
            {statusAtual.label}
          </Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: cores.borda }]} />

      <View style={styles.info}>
        <Text style={[styles.infoTexto, { color: cores.textoSecundario }]}>
          📍 {partida.local}
        </Text>
        <Text style={[styles.infoTexto, { color: cores.textoSecundario }]}>
          📅 {partida.data} • {partida.horario}
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.jogadoresRow}>
          <Text style={[styles.jogadores, { color: cores.texto }]}>
            👥 {ocupados}/{partida.jogadores}
          </Text>
          {cheio && (
            <View style={styles.cheioBadge}>
              <Text style={styles.cheioTexto}>ESGOTADO</Text>
            </View>
          )}
        </View>
        <Text style={[styles.preco, { color: cores.primario }]}>
          R$ {partida.preco.toFixed(2)}
        </Text>
      </View>

      <View style={[styles.barraFundo, { backgroundColor: cores.borda }]}>
        <View
          style={[
            styles.barraPreenchida,
            {
              width: `${(ocupados / partida.jogadores) * 100}%` as any,
              backgroundColor: cheio ? "#e53935" : "#2ECC71",
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textContainer: { flex: 1, paddingRight: 10 },
  titulo: { fontSize: 16, fontWeight: "bold" },
  descricao: { fontSize: 13, marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeTexto: { fontSize: 12, fontWeight: "bold" },
  divider: { height: 1, marginVertical: 12 },
  info: { gap: 4 },
  infoTexto: { fontSize: 13 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 8,
  },
  jogadoresRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  jogadores: { fontSize: 13, fontWeight: "600" },
  cheioBadge: {
    backgroundColor: "#ffebee",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cheioTexto: { color: "#e53935", fontSize: 10, fontWeight: "bold" },
  preco: { fontSize: 15, fontWeight: "bold" },
  barraFundo: { height: 4, borderRadius: 2, overflow: "hidden" },
  barraPreenchida: { height: 4, borderRadius: 2 },
});
