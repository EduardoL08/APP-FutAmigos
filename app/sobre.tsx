import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Header } from "../src/components/Header";
import { useTema } from "../src/contexts/TemaContext";

export default function Sobre() {
  const { cores } = useTema();

  const tecnologias = [
    { nome: "React Native + Expo", icone: "📱" },
    { nome: "TypeScript", icone: "🔷" },
    { nome: "Expo Router", icone: "🗺️" },
    { nome: "SQLite (expo-sqlite)", icone: "🗄️" },
    { nome: "Context API + Hooks", icone: "⚛️" },
    { nome: "AsyncStorage", icone: "💾" },
    { nome: "Axios + JSONPlaceholder", icone: "🌐" },
    { nome: "expo-location", icone: "📍" },
    { nome: "expo-image-picker", icone: "📷" },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: cores.fundo }]}
      showsVerticalScrollIndicator={false}
    >
      <Header titulo="Sobre" />

      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images//logo.png")}
          style={[styles.logoCircle, { backgroundColor: cores.acento }]}
        />
        <Text style={[styles.appNome, { color: cores.primario }]}>
          FutAmigos
        </Text>
        <Text style={[styles.versao, { color: cores.textoSecundario }]}>
          Versão 2.0.0
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: cores.card }]}>
        <Text style={[styles.cardTitulo, { color: cores.primario }]}>
          📌 Sobre o App
        </Text>
        <Text style={[styles.cardTexto, { color: cores.textoSecundario }]}>
          O FutAmigos é um aplicativo para organização de partidas de futebol
          entre amigos. Crie peladas, convide participantes, encontre campos
          próximos e gerencie tudo pelo celular!
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: cores.card }]}>
        <Text style={[styles.cardTitulo, { color: cores.primario }]}>
          🛠️ Tecnologias
        </Text>
        {tecnologias.map((t) => (
          <View
            key={t.nome}
            style={[styles.tecRow, { borderBottomColor: cores.borda }]}
          >
            <Text style={styles.tecIcone}>{t.icone}</Text>
            <Text style={[styles.tecNome, { color: cores.texto }]}>
              {t.nome}
            </Text>
          </View>
        ))}
      </View>

      <View style={[styles.card, { backgroundColor: cores.card }]}>
        <Text style={[styles.cardTitulo, { color: cores.primario }]}>
          👨‍💻 Desenvolvido por: Eduardo Lourenço e Nathan Chaia
        </Text>
        <Text style={[styles.cardTexto, { color: cores.textoSecundario }]}>
          Projeto Acadêmico — Desenvolvimento Mobile{"\n"}
          Curso de Análise e Desenvolvimento de Sistemas
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  logoContainer: { alignItems: "center", paddingVertical: 32 },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    elevation: 6,
  },
  logoEmoji: { fontSize: 44 },
  appNome: { fontSize: 28, fontWeight: "900" },
  versao: { fontSize: 14, marginTop: 4 },
  card: {
    margin: 16,
    marginTop: 0,
    marginBottom: 12,
    padding: 18,
    borderRadius: 16,
    elevation: 2,
  },
  cardTitulo: { fontSize: 16, fontWeight: "bold", marginBottom: 12 },
  cardTexto: { fontSize: 14, lineHeight: 22 },
  tecRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    gap: 10,
  },
  tecIcone: { fontSize: 18, width: 28 },
  tecNome: { fontSize: 14 },
});
