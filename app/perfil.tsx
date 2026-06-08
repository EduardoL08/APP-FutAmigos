import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { CampoTexto } from "../src/components/CampoTexto";
import { BotaoPadrao } from "../src/components/BotaoPadrao";
import { Header } from "../src/components/Header";
import { useAuth } from "../src/contexts/AuthContext";
import { useTema } from "../src/contexts/TemaContext";
import { formatarTelefone } from "../src/utils/validacao";

export default function Perfil() {
  const { usuario, atualizarPerfil, logout } = useAuth();
  const router = useRouter();
  const { cores } = useTema();

  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(usuario?.nome ?? "");
  const [telefone, setTelefone] = useState(usuario?.telefone ?? "");
  const [cidade, setCidade] = useState(usuario?.cidade ?? "");
  const [salvando, setSalvando] = useState(false);
  const [saindo, setSaindo] = useState(false);

  const handleSalvar = async () => {
    if (!nome.trim()) {
      Alert.alert("Atenção", "Informe seu nome.");
      return;
    }
    setSalvando(true);
    await atualizarPerfil({ nome, telefone, cidade });
    setSalvando(false);
    setEditando(false);
    Alert.alert("✅ Perfil atualizado!");
  };

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

  const handleFoto = async () => {
    try {
      const { launchImageLibraryAsync, requestMediaLibraryPermissionsAsync } =
        await import("expo-image-picker");
      const { status } = await requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Precisamos de acesso à galeria.");
        return;
      }
      const result = await launchImageLibraryAsync({
        mediaTypes: "images" as any,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!result.canceled && result.assets[0].uri) {
        await atualizarPerfil({ foto: result.assets[0].uri });
        Alert.alert("✅ Foto atualizada!");
      }
    } catch {
      Alert.alert("Erro", "Não foi possível abrir a galeria.");
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: cores.fundo }]}
      showsVerticalScrollIndicator={false}
    >
      <Header titulo="Meu Perfil" />

      <View style={[styles.avatarContainer, { backgroundColor: cores.card }]}>
        <View>
          <Image
            source={{ uri: usuario?.foto || "https://i.pravatar.cc/150?img=8" }}
            style={[styles.avatar, { borderColor: cores.acento }]}
          />
          <TouchableOpacity
            style={[styles.fotoBotao, { backgroundColor: cores.primario }]}
            onPress={handleFoto}
          >
            <Text style={styles.fotoTexto}>📷</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.nome, { color: cores.texto }]}>
          {usuario?.nome}
        </Text>
        <Text style={[styles.email, { color: cores.textoSecundario }]}>
          {usuario?.email}
        </Text>
      </View>

      <View style={styles.section}>
        {editando ? (
          <>
            <CampoTexto label="Nome" value={nome} onChangeText={setNome} />
            <CampoTexto
              label="Telefone"
              value={telefone}
              onChangeText={(v) => setTelefone(formatarTelefone(v))}
              keyboardType="phone-pad"
              maxLength={16}
            />
            <CampoTexto
              label="Cidade"
              value={cidade}
              onChangeText={setCidade}
            />
            <BotaoPadrao
              label="Salvar"
              onPress={handleSalvar}
              variante="primario"
              carregando={salvando}
            />
            <BotaoPadrao
              label="Cancelar"
              onPress={() => setEditando(false)}
              variante="outline"
            />
          </>
        ) : (
          <>
            <InfoCard label="Nome" valor={usuario?.nome ?? ""} cores={cores} />
            <InfoCard
              label="E-mail"
              valor={usuario?.email ?? ""}
              cores={cores}
            />
            <InfoCard
              label="Telefone"
              valor={usuario?.telefone || "Não informado"}
              cores={cores}
            />
            <InfoCard
              label="Cidade"
              valor={usuario?.cidade || "Não informado"}
              cores={cores}
            />
            <BotaoPadrao
              label="✏️ Editar Perfil"
              onPress={() => setEditando(true)}
              variante="outline"
            />
          </>
        )}
      </View>

      <View style={styles.section}>
        {[
          { label: "⚙️  Configurações", rota: "/configuracoes" },
          { label: "ℹ️  Sobre o FutAmigos", rota: "/sobre" },
        ].map((item) => (
          <TouchableOpacity
            key={item.rota}
            style={[
              styles.linkItem,
              { backgroundColor: cores.card, borderColor: cores.borda },
            ]}
            onPress={() => router.push(item.rota as any)}
          >
            <Text style={[styles.linkTexto, { color: cores.texto }]}>
              {item.label}
            </Text>
            <Text style={[styles.linkSeta, { color: cores.textoSecundario }]}>
              ›
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  avatarContainer: { alignItems: "center", paddingVertical: 28 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    marginBottom: 12,
  },
  fotoBotao: {
    position: "absolute",
    bottom: 10,
    right: -4,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  fotoTexto: { fontSize: 14 },
  nome: { fontSize: 22, fontWeight: "bold" },
  email: { fontSize: 14, marginTop: 4 },
  section: { margin: 16 },
  card: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  cardLabel: { fontSize: 12 },
  cardValor: { fontSize: 16, fontWeight: "bold", marginTop: 2 },
  linkItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
  },
  linkTexto: { fontSize: 15 },
  linkSeta: { fontSize: 22 },
});
