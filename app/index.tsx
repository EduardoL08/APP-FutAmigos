import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { CampoTexto } from "../src/components/CampoTexto";
import { BotaoPadrao } from "../src/components/BotaoPadrao";
import { useAuth, USUARIO_DEMO } from "../src/contexts/AuthContext";
import { validarEmail } from "../src/utils/validacao";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState({ email: "", senha: "" });
  const [carregando, setCarregando] = useState(false);
  const { login } = useAuth();

  const validar = (): boolean => {
    const novosErros = { email: "", senha: "" };
    if (!email) novosErros.email = "Informe o e-mail.";
    else if (!validarEmail(email)) novosErros.email = "E-mail inválido.";
    if (!senha) novosErros.senha = "Informe a senha.";
    else if (senha.length < 6) novosErros.senha = "Mínimo 6 caracteres.";
    setErros(novosErros);
    return !novosErros.email && !novosErros.senha;
  };

  const handleLogin = async () => {
    if (!validar()) return;
    setCarregando(true);
    const resultado = await login(email, senha);
    setCarregando(false);
    if (!resultado.ok) {
      setErros((prev) => ({
        ...prev,
        senha: resultado.erro ?? "Erro ao entrar.",
      }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.select({ ios: "padding", android: "height" })}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/login.png")}
              style={styles.logoCircle}
            />
            <Text style={styles.appNome}>FutAmigos</Text>
            <Text style={styles.appSlogan}>Organize sua pelada com amigos</Text>
          </View>

          <Text style={styles.title}>Entrar</Text>
          <Text style={styles.subTitle}>Acesse sua conta</Text>

          <View style={styles.form}>
            <CampoTexto
              label="E-mail"
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(v) => {
                setEmail(v);
                setErros((p) => ({ ...p, email: "" }));
              }}
              erro={erros.email}
            />
            <CampoTexto
              label="Senha"
              placeholder="••••••••"
              secureTextEntry
              value={senha}
              onChangeText={(v) => {
                setSenha(v);
                setErros((p) => ({ ...p, senha: "" }));
              }}
              erro={erros.senha}
            />
            <BotaoPadrao
              label="Entrar"
              onPress={handleLogin}
              carregando={carregando}
              desabilitado={carregando}
            />
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Não tem conta?</Text>
            <Link href="/cadastro">
              <Text style={styles.footerLink}> Cadastre-se</Text>
            </Link>
          </View>

          <TouchableOpacity
            style={styles.dica}
            onPress={() => {
              setEmail(USUARIO_DEMO.email);
              setSenha(USUARIO_DEMO.senha);
            }}
          >
            <Text style={styles.dicaTexto}>
              💡 Preencher dados de demonstração
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 32 },
  logoContainer: { alignItems: "center", marginTop: 40, marginBottom: 30 },
  logoCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#2ECC71",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    elevation: 6,
    borderWidth: 2,
    borderColor: "#2ECC71",
  },
  logoEmoji: { fontSize: 44 },
  appNome: { fontSize: 32, fontWeight: "900", color: "#123b17" },
  appSlogan: { fontSize: 14, color: "#777", marginTop: 4 },
  title: { fontSize: 26, fontWeight: "900", color: "#000000" },
  subTitle: { fontSize: 15, color: "#666", marginTop: 4, marginBottom: 8 },
  form: { marginTop: 20 },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: { fontSize: 15, color: "#555555dc" },
  footerLink: { fontWeight: "700", color: "#2ECC71", fontSize: 15 },
  dica: {
    marginTop: 20,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0faf4",
    borderRadius: 10,
  },
  dicaTexto: { color: "#123b17", fontSize: 13 },
});
