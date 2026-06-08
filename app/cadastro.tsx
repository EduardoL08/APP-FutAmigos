import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { CampoTexto } from "../src/components/CampoTexto";
import { BotaoPadrao } from "../src/components/BotaoPadrao";
import { useAuth } from "../src/contexts/AuthContext";
import { validarEmail, validarSenha } from "../src/utils/validacao";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erros, setErros] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmar: "",
  });
  const [carregando, setCarregando] = useState(false);
  const { cadastrar } = useAuth();

  const validar = (): boolean => {
    const e = { nome: "", email: "", senha: "", confirmar: "" };
    if (!nome.trim()) e.nome = "Informe seu nome.";
    if (!email) e.email = "Informe o e-mail.";
    else if (!validarEmail(email)) e.email = "E-mail inválido.";
    if (!senha) e.senha = "Informe uma senha.";
    else if (!validarSenha(senha)) e.senha = "Mínimo 6 caracteres.";
    if (!confirmarSenha) e.confirmar = "Confirme a senha.";
    else if (senha !== confirmarSenha) e.confirmar = "Senhas não conferem.";
    setErros(e);
    return !e.nome && !e.email && !e.senha && !e.confirmar;
  };

  const handleCadastro = async () => {
    if (!validar()) return;
    setCarregando(true);
    const resultado = await cadastrar({
      nome,
      email,
      senha,
      telefone: "",
      cidade: "",
      foto: `https://i.pravatar.cc/150?u=${email}`,
    });
    setCarregando(false);
    if (!resultado.ok) {
      setErros((prev) => ({
        ...prev,
        email: resultado.erro ?? "Erro ao cadastrar.",
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
              source={require("../assets/images/cadastro.png")}
              style={styles.logoCircle}
            />
            <Text style={styles.appNome}>FutAmigos</Text>
          </View>

          <Text style={styles.title}>Criar conta</Text>
          <Text style={styles.subTitle}>Preencha seus dados para começar</Text>

          <View style={styles.form}>
            <CampoTexto
              label="Nome completo"
              placeholder="Seu nome"
              value={nome}
              onChangeText={(v) => {
                setNome(v);
                setErros((p) => ({ ...p, nome: "" }));
              }}
              erro={erros.nome}
            />
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
              placeholder="Mínimo 6 caracteres"
              secureTextEntry
              value={senha}
              onChangeText={(v) => {
                setSenha(v);
                setErros((p) => ({ ...p, senha: "" }));
              }}
              erro={erros.senha}
            />
            <CampoTexto
              label="Confirmar senha"
              placeholder="Repita a senha"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={(v) => {
                setConfirmarSenha(v);
                setErros((p) => ({ ...p, confirmar: "" }));
              }}
              erro={erros.confirmar}
            />
            <BotaoPadrao
              label="Criar conta"
              onPress={handleCadastro}
              carregando={carregando}
              desabilitado={carregando}
            />
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Já tem conta?</Text>
            <Link href="/">
              <Text style={styles.footerLink}> Entre aqui</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 32 },
  logoContainer: { alignItems: "center", marginTop: 30, marginBottom: 24 },
  logoCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#2ECC71",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#2ECC71",
  },
  logoEmoji: { fontSize: 34 },
  appNome: { fontSize: 32, fontWeight: "900", color: "#123b17" },
  title: { fontSize: 26, fontWeight: "900", color: "#000" },
  subTitle: { fontSize: 15, color: "#666", marginTop: 4 },
  form: { marginTop: 20 },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: { fontSize: 15, color: "#555" },
  footerLink: { fontWeight: "700", color: "#2ECC71", fontSize: 15 },
});
