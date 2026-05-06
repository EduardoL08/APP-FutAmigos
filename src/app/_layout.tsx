import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Stack, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: true,
            headerTintColor: "#123b17",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="meusJogos" options={{ headerShown: false }} />
          <Stack.Screen name="maps" options={{ headerShown: false }} />

          <Stack.Screen name="perfil" options={{ title: "Voltar" }} />
          <Stack.Screen name="configuracoes" options={{ title: "Voltar" }} />
          <Stack.Screen name="detalhes/[id]" options={{ title: "Voltar" }} />
          <Stack.Screen name="criarJogos" options={{ title: "Voltar" }} />
        </Stack>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.footer}>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.tabItem}>
              <Ionicons name="home" size={width * 0.06} color="#fff" />
              <Text style={styles.footerLink}>Home</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/meusJogos" asChild>
            <TouchableOpacity style={styles.tabItem}>
              <Ionicons name="football" size={width * 0.06} color="#fff" />
              <Text style={styles.footerLink}>Meus Jogos</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/maps" asChild>
            <TouchableOpacity style={styles.tabItem}>
              <Ionicons name="map" size={width * 0.06} color="#fff" />
              <Text style={styles.footerLink}>Maps</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    paddingHorizontal: width * 0.05,
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
