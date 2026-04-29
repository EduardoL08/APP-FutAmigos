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

export default function Cadastro() {
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
            source={require("../../assets/images/cadastro.png")}
            style={styles.illustration}
          />

          <Text style={styles.title}>Cadastrar</Text>
          <Text style={styles.subTitle}>Crie sua conta para acessar</Text>

          <View style={styles.form}>
            <Input placeholder="Nome" />
            <Input placeholder="E-mail" keyboardType="email-address" />

            <Input placeholder="Senha" />
            <Input placeholder="Confirmar Senha" />

            <Button
              label="Cadastrar"
              onPress={() => console.log("Cadastrado")}
            />
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Já tem uma conta?</Text>

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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 32,
  },

  illustration: {
    width: "100%",
    height: 330,
    resizeMode: "contain",
    marginTop: 62,
  },

  title: {
    fontSize: 32,
    fontWeight: 900,
  },
  subTitle: {
    fontSize: 16,
  },

  form: {
    marginTop: 24,
    gap: 12,
  },
  footerText: {
    fontSize: 16,
    color: "#878a8f8e",
  },
  footerLink: {
    marginLeft: 4,
    fontWeight: "700",
    color: "#08009ee9",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
});
