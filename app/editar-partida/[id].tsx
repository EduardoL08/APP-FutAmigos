import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Alert,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PartidaForm } from "../../src/components/PartidaForm";
import { usePartidas } from "../../src/contexts/PartidasContext";
import { validarData, validarHorario } from "../../src/utils/validacao";

export default function EditarPartida() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { partidas, atualizarPartida } = usePartidas();
  const router = useRouter();

  const partida = partidas.find((p) => p.id.toString() === id);

  const [form, setForm] = useState({
    titulo: partida?.titulo ?? "",
    descricao: partida?.descricao ?? "",
    preco: partida?.preco ?? 0,
    local: partida?.local ?? "",
    data: partida?.data ?? "",
    horario: partida?.horario ?? "",
    vagas: partida?.vagas ?? 0,
    jogadores: partida?.jogadores ?? 10,
  });
  const [erros, setErros] = useState<Record<string, string>>({});

  if (!partida) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Partida não encontrada.</Text>
      </View>
    );
  }

  const set = (campo: string, valor: string | number) =>
    setForm((prev) => ({ ...prev, [campo]: valor }));

  const validar = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.titulo.trim()) e.titulo = "Informe o título.";
    if (!form.local.trim()) e.local = "Informe o local.";
    if (!form.data) e.data = "Informe a data.";
    else if (!validarData(form.data)) e.data = "Use o formato DD/MM/AAAA.";
    if (!form.horario) e.horario = "Informe o horário.";
    else if (!validarHorario(form.horario)) e.horario = "Use o formato HH:MM.";
    if (form.jogadores < 2) e.jogadores = "Mínimo 2 jogadores.";
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const handleSalvar = async () => {
    if (!validar()) return;
    await atualizarPartida(partida.id, { ...partida, ...form });
    Alert.alert("✅ Partida atualizada!", "", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <PartidaForm
        {...form}
        erros={erros}
        onChangeTitulo={(v) => {
          set("titulo", v);
          setErros((p) => ({ ...p, titulo: "" }));
        }}
        onChangeDescricao={(v) => set("descricao", v)}
        onChangePreco={(v) => set("preco", v)}
        onChangeLocal={(v) => {
          set("local", v);
          setErros((p) => ({ ...p, local: "" }));
        }}
        onChangeData={(v) => {
          set("data", v);
          setErros((p) => ({ ...p, data: "" }));
        }}
        onChangeHorario={(v) => {
          set("horario", v);
          setErros((p) => ({ ...p, horario: "" }));
        }}
        onChangeVagas={(v) => set("vagas", v)}
        onChangeJogadores={(v) => {
          set("jogadores", v);
          setErros((p) => ({ ...p, jogadores: "" }));
        }}
        onSubmit={handleSalvar}
        labelBotao="💾 Salvar Alterações"
      />
    </KeyboardAvoidingView>
  );
}
