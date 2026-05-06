import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/home");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding", android: "height" })}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Image
            source={require("../../assets/images/login.png")}
            style={styles.illustration}
          />

          <Text style={styles.title}>Entrar </Text>
          <Text style={styles.subTitle}>
            Acesse sua conta com e-mail e senha.
          </Text>

          <View style={styles.form}>
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />

            <Button label="Entrar" onPress={handleLogin} />
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Não tem uma conta?</Text>

            <Link href={"/cadastro"}>
              <Text style={styles.footerLink}> Cadastre-se aqui</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 32,
  },

  illustration: {
    width: "100%",
    height: 250,
    resizeMode: "center",
    marginTop: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 900,
    color: "#000000",
  },
  subTitle: {
    fontSize: 16,
    color: "#000000",
  },

  form: {
    marginTop: 24,
    gap: 12,
  },
  footerText: {
    fontSize: 16,
    color: "#030303",
  },
  footerLink: {
    marginLeft: 4,
    fontWeight: 700,
    color: "#28955fe9",
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
});
