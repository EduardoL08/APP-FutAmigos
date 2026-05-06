import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { Stack, Link, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  const pathname = usePathname();

  const routesWithoutFooter = ["/", "/cadastro", "/perfil", "/configuracoes", "/detalhes/[id]", "/criarJogos"];

  const showFooter = !routesWithoutFooter.includes(pathname);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: true,
            headerTintColor: "#123b17",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="cadastro" options={{ headerShown: false }} />
          <Stack.Screen name="meusJogos" options={{ headerShown: false }} />
          <Stack.Screen name="maps" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />

          <Stack.Screen name="perfil" options={{ title: "Voltar" }} />
          <Stack.Screen name="configuracoes" options={{ title: "Voltar" }} />
          <Stack.Screen name="detalhes/[id]" options={{ title: "Voltar" }} />
          <Stack.Screen name="criarJogos" options={{ title: "Voltar" }} />
        </Stack>
      </View>

      {showFooter && (
        <View style={styles.footerContainer}>
          <View style={styles.footer}>
            <Link href={"/home"} asChild>
              <TouchableOpacity style={styles.tabItem}>
                <Ionicons name="home" size={25} color="#fff" />
                <Text style={styles.footerLink}>Home</Text>
              </TouchableOpacity>
            </Link>

            <Link href={"/meusJogos"} asChild>
              <TouchableOpacity style={styles.tabItem}>
                <Ionicons name="football" size={25} color="#fff" />
                <Text style={styles.footerLink}>Meus Jogos</Text>
              </TouchableOpacity>
            </Link>

            <Link href={"/maps"} asChild>
              <TouchableOpacity style={styles.tabItem}>
                <Ionicons name="map" size={25} color="#fff" />
                <Text style={styles.footerLink}>Maps</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#123b17",
    width: "100%",
    height: 65,
    borderRadius: 30,
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  tabItem: { alignItems: "center" },
  footerLink: { fontSize: 10, color: "#fff", fontWeight: "bold", marginTop: 2 },
});
