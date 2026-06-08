import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Header } from "../src/components/Header";
import { BotaoPadrao } from "../src/components/BotaoPadrao";
import { useAuth } from "../src/contexts/AuthContext";
import { useTema } from "../src/contexts/TemaContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Configuracoes() {
  const [notificacoes, setNotificacoes] = useState(true);
  const [notifConvites, setNotifConvites] = useState(true);
  const [notifPartidas, setNotifPartidas] = useState(true);
  const [saindo, setSaindo] = useState(false);
  const { usuario, logout } = useAuth();
  const { cores, escuro, alternarTema } = useTema();
  const router = useRouter();

  const handleLogout = () => {
    if (Platform.OS === "web") {
      const confirmado = window.confirm("Deseja sair do FutAmigos?");
      if (!confirmado) return;
      executarLogout();
    } else {
      Alert.alert("Sair", "Deseja sair do FutAmigos?", [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", style: "destructive", onPress: executarLogout },
      ]);
    }
  };

  const executarLogout = async () => {
    setSaindo(true);
    await logout();
    router.replace("/");
  };

  const handleLimparDados = () => {
    if (Platform.OS === "web") {
      const confirmado = window.confirm(
        "Isso apagará suas preferências salvas. Continuar?",
      );
      if (!confirmado) return;
      AsyncStorage.multiRemove(["@futamigos:tema"]).then(() =>
        Alert.alert("✅ Dados limpos com sucesso."),
      );
    } else {
      Alert.alert(
        "Limpar dados locais",
        "Isso apagará suas preferências salvas. Continuar?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Limpar",
            style: "destructive",
            onPress: () =>
              AsyncStorage.multiRemove(["@futamigos:tema"]).then(() =>
                Alert.alert("✅ Dados limpos com sucesso."),
              ),
          },
        ],
      );
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: cores.fundo }]}
      showsVerticalScrollIndicator={false}
    >
      <Header titulo="Configurações" />

      <SectionTitle titulo="Conta" cores={cores} />
      <InfoCard label="Nome" valor={usuario?.nome ?? ""} cores={cores} />
      <InfoCard label="E-mail" valor={usuario?.email ?? ""} cores={cores} />
      <InfoCard
        label="Cidade"
        valor={usuario?.cidade || "Não informado"}
        cores={cores}
      />

      <SectionTitle titulo="Aparência" cores={cores} />
      <SwitchItem
        label="🌙 Modo Escuro"
        sublabel={escuro ? "Ativado" : "Desativado"}
        valor={escuro}
        onChange={alternarTema}
        cores={cores}
      />

      <SectionTitle titulo="Notificações" cores={cores} />
      <SwitchItem
        label="🔔 Notificações gerais"
        sublabel="Receber alertas do app"
        valor={notificacoes}
        onChange={setNotificacoes}
        cores={cores}
      />
      <SwitchItem
        label="📩 Convites de partidas"
        sublabel="Alertas de novos convites"
        valor={notifConvites}
        onChange={setNotifConvites}
        cores={cores}
      />
      <SwitchItem
        label="⚽ Lembretes de partidas"
        sublabel="1h antes da partida"
        valor={notifPartidas}
        onChange={setNotifPartidas}
        cores={cores}
      />

      <SectionTitle titulo="Dados" cores={cores} />
      <TouchableOpacity
        style={[
          styles.linkItem,
          { backgroundColor: cores.card, borderColor: cores.borda },
        ]}
        onPress={handleLimparDados}
      >
        <Text style={[styles.linkTexto, { color: "#e53935" }]}>
          🗑️ Limpar dados locais
        </Text>
        <Text style={[styles.linkSeta, { color: cores.textoSecundario }]}>
          ›
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.linkItem,
          { backgroundColor: cores.card, borderColor: cores.borda },
        ]}
        onPress={() => router.push("/sobre")}
      >
        <Text style={[styles.linkTexto, { color: cores.texto }]}>
          ℹ️ Sobre o FutAmigos
        </Text>
        <Text style={[styles.linkSeta, { color: cores.textoSecundario }]}>
          ›
        </Text>
      </TouchableOpacity>

      <View style={styles.acoes}>
        <BotaoPadrao
          label="Sair do App"
          onPress={handleLogout}
          variante="perigo"
          carregando={saindo}
        />
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function SectionTitle({ titulo, cores }: { titulo: string; cores: any }) {
  return (
    <Text style={[styles.sectionTitle, { color: cores.textoSecundario }]}>
      {titulo.toUpperCase()}
    </Text>
  );
}

function InfoCard({
  label,
  valor,
  cores,
}: {
  label: string;
  valor: string;
  cores: any;
}) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: cores.card, borderColor: cores.borda },
      ]}
    >
      <Text style={[styles.cardLabel, { color: cores.textoSecundario }]}>
        {label}
      </Text>
      <Text style={[styles.cardValor, { color: cores.texto }]}>{valor}</Text>
    </View>
  );
}

function SwitchItem({
  label,
  sublabel,
  valor,
  onChange,
  cores,
}: {
  label: string;
  sublabel: string;
  valor: boolean;
  onChange: (v: boolean) => void;
  cores: any;
}) {
  return (
    <View
      style={[
        styles.switchItem,
        { backgroundColor: cores.card, borderColor: cores.borda },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={[styles.switchLabel, { color: cores.texto }]}>
          {label}
        </Text>
        <Text style={[styles.switchSub, { color: cores.textoSecundario }]}>
          {sublabel}
        </Text>
      </View>
      <Switch
        value={valor}
        onValueChange={onChange}
        trackColor={{ false: cores.borda, true: "#2ECC71" }}
        thumbColor={valor ? "#123b17" : "#ccc"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  card: {
    padding: 14,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
  },
  cardLabel: { fontSize: 12 },
  cardValor: { fontSize: 15, fontWeight: "bold", marginTop: 2 },
  switchItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  switchLabel: { fontSize: 15, fontWeight: "600" },
  switchSub: { fontSize: 12, marginTop: 2 },
  linkItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  linkTexto: { fontSize: 15 },
  linkSeta: { fontSize: 22 },
  acoes: { margin: 16, marginTop: 24 },
});
