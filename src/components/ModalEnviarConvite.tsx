import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { useConvites } from "../contexts/ConvitesContext";
import { useAuth } from "../contexts/AuthContext";
import { useTema } from "../contexts/TemaContext";
import { Partida } from "../types/partida";

const JOGADORES_DISPONIVEIS = [
  { id: 10, nome: "Felipe Costa", foto: "https://i.pravatar.cc/80?img=6" },
  { id: 11, nome: "Mariana Lima", foto: "https://i.pravatar.cc/80?img=25" },
  { id: 12, nome: "Diego Alves", foto: "https://i.pravatar.cc/80?img=7" },
  { id: 13, nome: "Camila Rocha", foto: "https://i.pravatar.cc/80?img=26" },
  { id: 14, nome: "Thiago Mendes", foto: "https://i.pravatar.cc/80?img=13" },
  { id: 15, nome: "Larissa Neves", foto: "https://i.pravatar.cc/80?img=27" },
  { id: 16, nome: "Bruno Carvalho", foto: "https://i.pravatar.cc/80?img=14" },
  { id: 17, nome: "Patrícia Duarte", foto: "https://i.pravatar.cc/80?img=28" },
];

type Props = {
  visivel: boolean;
  partida: Partida;
  onFechar: () => void;
};

export function ModalEnviarConvite({ visivel, partida, onFechar }: Props) {
  const { enviarConvite, convites } = useConvites();
  const { usuario } = useAuth();
  const { cores } = useTema();
  const [busca, setBusca] = useState("");
  const [selecionados, setSelecionados] = useState<number[]>([]);

  const jogadoresFiltrados = JOGADORES_DISPONIVEIS.filter((j) =>
    j.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  const jaConvidados = convites
    .filter((c) => c.partidaId === partida.id)
    .map((c) => c.usuarioId);

  const toggleSelecionado = (id: number) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleEnviar = () => {
    if (selecionados.length === 0) {
      Alert.alert("Atenção", "Selecione pelo menos um jogador para convidar.");
      return;
    }

    selecionados.forEach((jogadorId) => {
      const jogador = JOGADORES_DISPONIVEIS.find((j) => j.id === jogadorId);
      if (!jogador) return;

      enviarConvite({
        partidaId: partida.id,
        usuarioId: jogadorId,
        convidadoPorId: usuario?.id ?? 1,
        convidadoPorNome: usuario?.nome ?? "Organizador",
        convidadoPorFoto: usuario?.foto ?? "https://i.pravatar.cc/80?img=8",
        partidaTitulo: partida.titulo,
        partidaLocal: partida.local,
        partidaData: partida.data,
        partidaHorario: partida.horario,
        partidaPreco: partida.preco,
      });
    });

    Alert.alert(
      "✅ Convites enviados!",
      `${selecionados.length} jogador${selecionados.length > 1 ? "es convidados" : " convidado"} com sucesso.`,
    );
    setSelecionados([]);
    setBusca("");
    onFechar();
  };

  return (
    <Modal
      visible={visivel}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onFechar}
    >
      <View style={[styles.container, { backgroundColor: cores.fundo }]}>
        {/* Header do modal */}
        <View
          style={[
            styles.header,
            { backgroundColor: cores.card, borderBottomColor: cores.borda },
          ]}
        >
          <TouchableOpacity onPress={onFechar}>
            <Text style={[styles.cancelar, { color: cores.textoSecundario }]}>
              Cancelar
            </Text>
          </TouchableOpacity>
          <Text style={[styles.titulo, { color: cores.texto }]}>
            Convidar Jogadores
          </Text>
          <TouchableOpacity onPress={handleEnviar}>
            <Text style={[styles.enviar, { color: cores.acento }]}>
              Enviar{selecionados.length > 0 ? ` (${selecionados.length})` : ""}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.partidaInfo, { backgroundColor: cores.card }]}>
          <Text style={[styles.partidaLabel, { color: cores.textoSecundario }]}>
            Convidando para
          </Text>
          <Text style={[styles.partidaTitulo, { color: cores.texto }]}>
            ⚽ {partida.titulo}
          </Text>
          <Text
            style={[styles.partidaDetalhe, { color: cores.textoSecundario }]}
          >
            {partida.data} às {partida.horario} • {partida.local}
          </Text>
          <Text
            style={[
              styles.vagasInfo,
              { color: partida.vagas > 0 ? "#2ECC71" : "#e53935" },
            ]}
          >
            {partida.vagas > 0
              ? `✅ ${partida.vagas} vaga${partida.vagas > 1 ? "s" : ""} disponível`
              : "⚠️ Partida lotada"}
          </Text>
        </View>

        <View
          style={[
            styles.searchWrapper,
            { backgroundColor: cores.card, borderColor: cores.borda },
          ]}
        >
          <Text style={{ fontSize: 16, marginRight: 8 }}>🔍</Text>
          <TextInput
            placeholder="Buscar jogador..."
            placeholderTextColor={cores.placeholder}
            value={busca}
            onChangeText={setBusca}
            style={[styles.searchInput, { color: cores.texto }]}
          />
        </View>

        <FlatList
          data={jogadoresFiltrados}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const selecionado = selecionados.includes(item.id);
            const jaConvidado = jaConvidados.includes(item.id);

            return (
              <TouchableOpacity
                style={[
                  styles.jogadorItem,
                  { backgroundColor: cores.card, borderColor: cores.borda },
                  selecionado && {
                    borderColor: cores.acento,
                    backgroundColor: "#f0faf4",
                  },
                  jaConvidado && { opacity: 0.5 },
                ]}
                onPress={() => !jaConvidado && toggleSelecionado(item.id)}
                disabled={jaConvidado}
                activeOpacity={0.7}
              >
                <Image source={{ uri: item.foto }} style={styles.jogadorFoto} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={[styles.jogadorNome, { color: cores.texto }]}>
                    {item.nome}
                  </Text>
                  {jaConvidado && (
                    <Text
                      style={[
                        styles.jaConvidadoLabel,
                        { color: cores.textoSecundario },
                      ]}
                    >
                      Convite já enviado
                    </Text>
                  )}
                </View>

                <View
                  style={[
                    styles.checkbox,
                    { borderColor: cores.borda },
                    selecionado && {
                      backgroundColor: cores.acento,
                      borderColor: cores.acento,
                    },
                    jaConvidado && {
                      backgroundColor: "#ddd",
                      borderColor: "#ddd",
                    },
                  ]}
                >
                  {(selecionado || jaConvidado) && (
                    <Text style={styles.checkboxMarca}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  cancelar: { fontSize: 16 },
  titulo: { fontSize: 17, fontWeight: "bold" },
  enviar: { fontSize: 16, fontWeight: "bold" },
  partidaInfo: {
    margin: 16,
    borderRadius: 14,
    padding: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  partidaLabel: { fontSize: 12, marginBottom: 4 },
  partidaTitulo: { fontSize: 16, fontWeight: "bold" },
  partidaDetalhe: { fontSize: 13, marginTop: 4 },
  vagasInfo: { fontSize: 13, fontWeight: "600", marginTop: 6 },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
  },
  searchInput: { flex: 1, fontSize: 15 },
  lista: { paddingHorizontal: 16, paddingBottom: 40 },
  jogadorItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    marginBottom: 8,
    borderWidth: 1,
  },
  jogadorFoto: { width: 44, height: 44, borderRadius: 22 },
  jogadorNome: { fontSize: 15, fontWeight: "600" },
  jaConvidadoLabel: { fontSize: 12, marginTop: 2 },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxMarca: { color: "#fff", fontSize: 14, fontWeight: "bold" },
});
