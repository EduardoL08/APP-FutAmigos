import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Alert } from "react-native";
import { router } from "expo-router";
import { PartidaForm } from "../src/components/PartidaForm";
import { usePartidas } from "../src/contexts/PartidasContext";
import { useAuth } from "../src/contexts/AuthContext";
import { validarData, validarHorario } from "../src/utils/validacao";

export default function CriarPartida() {
  const { adicionarPartida } = usePartidas();
  const { usuario } = useAuth();

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    preco: 0,
    local: "",
    data: "",
    horario: "",
    vagas: 0,
    jogadores: 10,
  });
  const [erros, setErros] = useState<Record<string, string>>({});

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
    await adicionarPartida({
      ...form,
      vagas: form.vagas > 0 ? form.vagas : form.jogadores,
      participando: true,
      status: "organizador",
      criadorId: usuario?.id ?? 1,
    });
    Alert.alert("✅ Partida criada!", "Sua partida foi criada com sucesso.", [
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
        labelBotao="⚽ Criar Partida"
      />
    </KeyboardAvoidingView>
  );
}
