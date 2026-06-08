import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTema } from "../contexts/TemaContext";
import { formatarData, formatarHorario } from "../utils/validacao";
import { sombra } from "../utils/estilos";

type Props = {
  titulo: string;
  descricao: string;
  preco: number;
  local: string;
  data: string;
  horario: string;
  vagas: number;
  jogadores: number;
  onChangeTitulo: (v: string) => void;
  onChangeDescricao: (v: string) => void;
  onChangePreco: (v: number) => void;
  onChangeLocal: (v: string) => void;
  onChangeData: (v: string) => void;
  onChangeHorario: (v: string) => void;
  onChangeVagas: (v: number) => void;
  onChangeJogadores: (v: number) => void;
  onSubmit: () => void;
  labelBotao?: string;
  erros?: Partial<
    Record<"titulo" | "local" | "data" | "horario" | "jogadores", string>
  >;
};

export function PartidaForm({
  titulo,
  descricao,
  preco,
  local,
  data,
  horario,
  vagas,
  jogadores,
  onChangeTitulo,
  onChangeDescricao,
  onChangePreco,
  onChangeLocal,
  onChangeData,
  onChangeHorario,
  onChangeVagas,
  onChangeJogadores,
  onSubmit,
  labelBotao = "Salvar Partida",
  erros = {},
}: Props) {
  const { cores } = useTema();

  const inputStyle = (erro?: string) => ({
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    backgroundColor: cores.inputBg,
    borderColor: erro ? "#e53935" : cores.borda,
    color: cores.texto,
  });

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContent,
        { backgroundColor: cores.fundo },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={[
          styles.formCard,
          { backgroundColor: cores.card },
          sombra("media"),
        ]}
      >
        <Text style={[styles.sectionTitle, { color: cores.primario }]}>
          Informações da Partida
        </Text>

        <Campo label="Título *" erro={erros.titulo} cores={cores}>
          <TextInput
            placeholder="Ex: FutAmigos da Pampulha"
            placeholderTextColor={cores.placeholder}
            value={titulo}
            onChangeText={onChangeTitulo}
            style={inputStyle(erros.titulo)}
          />
        </Campo>

        <Campo label="Descrição" cores={cores}>
          <TextInput
            placeholder="Regras, nível, observações..."
            placeholderTextColor={cores.placeholder}
            value={descricao}
            onChangeText={onChangeDescricao}
            style={[inputStyle(), { height: 80, textAlignVertical: "top" }]}
            multiline
            numberOfLines={3}
          />
        </Campo>

        <View style={styles.row}>
          <View style={styles.col}>
            <Campo label="Preço (R$)" cores={cores}>
              <TextInput
                placeholder="0,00"
                placeholderTextColor={cores.placeholder}
                value={preco > 0 ? preco.toString() : ""}
                onChangeText={(v) =>
                  onChangePreco(parseFloat(v.replace(",", ".")) || 0)
                }
                keyboardType="numeric"
                style={inputStyle()}
              />
            </Campo>
          </View>
          <View style={styles.col}>
            <Campo label="Nº Jogadores *" erro={erros.jogadores} cores={cores}>
              <TextInput
                placeholder="10"
                placeholderTextColor={cores.placeholder}
                value={jogadores > 0 ? jogadores.toString() : ""}
                onChangeText={(v) => onChangeJogadores(parseInt(v) || 0)}
                keyboardType="numeric"
                style={inputStyle(erros.jogadores)}
              />
            </Campo>
          </View>
        </View>

        <Campo label="Local / Quadra *" erro={erros.local} cores={cores}>
          <TextInput
            placeholder="Nome da quadra ou campo"
            placeholderTextColor={cores.placeholder}
            value={local}
            onChangeText={onChangeLocal}
            style={inputStyle(erros.local)}
          />
        </Campo>

        <View style={styles.row}>
          <View style={styles.col}>
            <Campo label="Data *" erro={erros.data} cores={cores}>
              <TextInput
                placeholder="DD/MM/AAAA"
                placeholderTextColor={cores.placeholder}
                value={data}
                onChangeText={(v) => onChangeData(formatarData(v))}
                keyboardType="numeric"
                maxLength={10}
                style={inputStyle(erros.data)}
              />
            </Campo>
          </View>
          <View style={styles.col}>
            <Campo label="Horário *" erro={erros.horario} cores={cores}>
              <TextInput
                placeholder="HH:MM"
                placeholderTextColor={cores.placeholder}
                value={horario}
                onChangeText={(v) => onChangeHorario(formatarHorario(v))}
                keyboardType="numeric"
                maxLength={5}
                style={inputStyle(erros.horario)}
              />
            </Campo>
          </View>
        </View>

        <Campo label="Vagas disponíveis" cores={cores}>
          <TextInput
            placeholder="0"
            placeholderTextColor={cores.placeholder}
            value={vagas > 0 ? vagas.toString() : ""}
            onChangeText={(v) => onChangeVagas(parseInt(v) || 0)}
            keyboardType="numeric"
            style={inputStyle()}
          />
        </Campo>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: cores.primario }]}
          onPress={onSubmit}
        >
          <Text style={styles.buttonText}>{labelBotao}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Campo({
  label,
  erro,
  children,
  cores,
}: {
  label: string;
  erro?: string;
  children: React.ReactNode;
  cores: any;
}) {
  return (
    <View style={styles.campoWrapper}>
      <Text style={[styles.label, { color: cores.texto }]}>{label}</Text>
      {children}
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: { padding: 16, paddingBottom: 60 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  formCard: { padding: 20, borderRadius: 20 },
  campoWrapper: { marginBottom: 4 },
  label: { fontSize: 13, fontWeight: "bold", marginBottom: 6, marginTop: 12 },
  row: { flexDirection: "row", gap: 12 },
  col: { flex: 1 },
  erro: { color: "#e53935", fontSize: 12, marginTop: 4 },
  button: {
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: { color: "#FFF", fontSize: 17, fontWeight: "bold" },
});
