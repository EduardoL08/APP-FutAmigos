import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Convite } from "../types/convite";
import { useTema } from "../contexts/TemaContext";

type Props = {
  convite: Convite;
  onAceitar: (id: number) => void;
  onRecusar: (id: number) => void;
  onVerPartida: (partidaId: number) => void;
};

function tempoRelativo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const min = Math.floor(diff / 60000);
  const hora = Math.floor(diff / 3600000);
  const dia = Math.floor(diff / 86400000);
  if (min < 1) return "agora mesmo";
  if (min < 60) return `há ${min} min`;
  if (hora < 24) return `há ${hora}h`;
  return `há ${dia}d`;
}

export function CardConvite({
  convite,
  onAceitar,
  onRecusar,
  onVerPartida,
}: Props) {
  const { cores } = useTema();

  const isPendente = convite.status === "pendente";
  const isAceito = convite.status === "aceito";
  const isRecusado = convite.status === "recusado";

  const statusConfig = {
    pendente: {
      bg: "#FFF9C4",
      borda: "#F9A825",
      label: "⏳ Pendente",
      cor: "#F57F17",
    },
    aceito: {
      bg: "#E8F5E9",
      borda: "#2ECC71",
      label: "✅ Aceito",
      cor: "#2E7D32",
    },
    recusado: {
      bg: "#FFEBEE",
      borda: "#e53935",
      label: "❌ Recusado",
      cor: "#c62828",
    },
  };
  const st = statusConfig[convite.status];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: cores.card,
          borderColor: st.borda,
          opacity: isRecusado ? 0.65 : 1,
        },
      ]}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: convite.convidadoPorFoto }}
          style={[styles.avatar, { borderColor: cores.acento }]}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={[styles.convidadoPor, { color: cores.textoSecundario }]}>
            Convite de
          </Text>
          <Text style={[styles.nomeConvidador, { color: cores.texto }]}>
            {convite.convidadoPorNome}
          </Text>
          <Text style={[styles.tempo, { color: cores.textoSecundario }]}>
            {tempoRelativo(convite.criadoEm)}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: st.bg }]}>
          <Text style={[styles.statusTexto, { color: st.cor }]}>
            {st.label}
          </Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: cores.borda }]} />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onVerPartida(convite.partidaId)}
      >
        <Text style={[styles.partidaTitulo, { color: cores.texto }]}>
          ⚽ {convite.partidaTitulo}
        </Text>
        <View style={styles.infoGrid}>
          <InfoItem icone="📍" texto={convite.partidaLocal} cores={cores} />
          <InfoItem icone="📅" texto={convite.partidaData} cores={cores} />
          <InfoItem icone="🕐" texto={convite.partidaHorario} cores={cores} />
          <InfoItem
            icone="💰"
            texto={`R$ ${convite.partidaPreco.toFixed(2)}`}
            cores={cores}
          />
        </View>
        <Text style={[styles.verDetalhes, { color: cores.acento }]}>
          Ver detalhes da partida →
        </Text>
      </TouchableOpacity>

      {isPendente && (
        <View style={styles.acoes}>
          <TouchableOpacity
            style={[styles.botaoRecusar, { borderColor: "#e53935" }]}
            onPress={() => onRecusar(convite.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoRecusarTexto}>✕ Recusar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.botaoAceitar, { backgroundColor: cores.acento }]}
            onPress={() => onAceitar(convite.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoAceitarTexto}>✓ Aceitar</Text>
          </TouchableOpacity>
        </View>
      )}

      {isAceito && (
        <View style={[styles.feedbackBar, { backgroundColor: "#E8F5E9" }]}>
          <Text style={[styles.feedbackTexto, { color: "#2E7D32" }]}>
            Você aceitou este convite! Partida adicionada em Próximos Jogos.
          </Text>
        </View>
      )}
      {isRecusado && (
        <View style={[styles.feedbackBar, { backgroundColor: "#FFEBEE" }]}>
          <Text style={[styles.feedbackTexto, { color: "#c62828" }]}>
            Você recusou este convite.
          </Text>
        </View>
      )}
    </View>
  );
}

function InfoItem({
  icone,
  texto,
  cores,
}: {
  icone: string;
  texto: string;
  cores: any;
}) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoIcone}>{icone}</Text>
      <Text
        style={[styles.infoTexto, { color: cores.textoSecundario }]}
        numberOfLines={1}
      >
        {texto}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1.5,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.09,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  header: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 48, height: 48, borderRadius: 24, borderWidth: 2 },
  convidadoPor: { fontSize: 11 },
  nomeConvidador: { fontSize: 15, fontWeight: "bold", marginTop: 1 },
  tempo: { fontSize: 11, marginTop: 1 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  statusTexto: { fontSize: 11, fontWeight: "bold" },
  divider: { height: 1, marginVertical: 12 },
  partidaTitulo: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "46%",
    gap: 4,
  },
  infoIcone: { fontSize: 14 },
  infoTexto: { fontSize: 13, flex: 1 },
  verDetalhes: { fontSize: 12, fontWeight: "600", marginTop: 4 },
  acoes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  botaoRecusar: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  botaoRecusarTexto: { color: "#e53935", fontWeight: "bold", fontSize: 15 },
  botaoAceitar: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  botaoAceitarTexto: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  feedbackBar: {
    marginTop: 12,
    borderRadius: 10,
    padding: 10,
  },
  feedbackTexto: { fontSize: 12, textAlign: "center" },
});
