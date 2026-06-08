import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Image, // 1. Importado o Image aqui
} from "react-native";
import { Stack, usePathname, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "../src/contexts/AuthContext";
import { PartidasProvider } from "../src/contexts/PartidasContext";
import { TemaProvider, useTema } from "../src/contexts/TemaContext";
import { ConvitesProvider, useConvites } from "../src/contexts/ConvitesContext";
import { useEffect } from "react";

const ROTAS_SEM_FOOTER = [
  "/",
  "/cadastro",
  "/perfil",
  "/configuracoes",
  "/sobre",
  "/criar-partida",
];
const ROTAS_PUBLICAS = ["/", "/cadastro"];

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAutenticado, carregandoSessao } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (carregandoSessao) return;
    const publica = ROTAS_PUBLICAS.includes(pathname);
    if (!isAutenticado && !publica) router.replace("/");
    if (isAutenticado && publica) router.replace("/home");
  }, [isAutenticado, carregandoSessao, pathname]);

  if (carregandoSessao) {
    return (
      <View style={styles.splash}>
        <Image 
          source={require("../assets/images/logo.png")} 
          style={styles.splashLogo}
          resizeMode="contain"
        />
        <ActivityIndicator
          size="large"
          color="#2ECC71"
          style={{ marginTop: 16 }}
        />
        <Text style={styles.splashNome}>FutAmigos</Text>
      </View>
    );
  }

  return <>{children}</>;
}

type TabKey = "/home" | "/meus-jogos" | "/mapa";

const TABS: { href: TabKey; icone: string; label: string }[] = [
  { href: "/home", icone: "home", label: "Home" },
  { href: "/meus-jogos", icone: "football", label: "Meus Jogos" },
  { href: "/mapa", icone: "map", label: "Mapa" },
];

function FooterNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { cores } = useTema();
  const { totalPendentes } = useConvites();

  const mostrar =
    !ROTAS_SEM_FOOTER.includes(pathname) &&
    !pathname.startsWith("/detalhes") &&
    !pathname.startsWith("/editar-partida");

  if (!mostrar) return null;

  return (
    <View style={styles.footerContainer}>
      <View style={[styles.footer, { backgroundColor: cores.primario }]}>
        {TABS.map((tab) => {
          const ativo = pathname === tab.href;
          return (
            <TouchableOpacity
              key={tab.href}
              style={styles.tabItem}
              onPress={() => router.push(tab.href)}
            >
              <View
                style={[
                  styles.tabIconWrapper,
                  ativo && styles.tabIconWrapperAtivo,
                ]}
              >
                <Ionicons
                  name={tab.icone as any}
                  size={22}
                  color={ativo ? cores.primario : "rgba(255,255,255,0.7)"}
                />
              </View>
              <Text style={[styles.tabLabel, ativo && styles.tabLabelAtivo]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/convites")}
        >
          <View
            style={[
              styles.tabIconWrapper,
              pathname === "/convites" && styles.tabIconWrapperAtivo,
            ]}
          >
            <Ionicons
              name="mail"
              size={22}
              color={
                pathname === "/convites"
                  ? cores.primario
                  : "rgba(255,255,255,0.7)"
              }
            />
            {totalPendentes > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeTexto}>
                  {totalPendentes > 9 ? "9+" : totalPendentes}
                </Text>
              </View>
            )}
          </View>
          <Text
            style={[
              styles.tabLabel,
              pathname === "/convites" && styles.tabLabelAtivo,
            ]}
          >
            Convites
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Inner() {
  const { cores } = useTema();

  return (
    <View style={[styles.innerContainer, { backgroundColor: cores.fundo }]}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTintColor: cores.primario,
          headerTitleStyle: { fontWeight: "bold" },
          headerStyle: { backgroundColor: cores.card },
          contentStyle: { backgroundColor: cores.fundo },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="cadastro" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="meus-jogos" options={{ headerShown: false }} />
        <Stack.Screen name="mapa" options={{ headerShown: false }} />
        <Stack.Screen name="convites" options={{ headerShown: false }} />
        <Stack.Screen name="detalhes/[id]" options={{ title: "Voltar" }} />
        <Stack.Screen name="criar-partida" options={{ title: "Voltar" }} />
        <Stack.Screen
          name="editar-partida/[id]"
          options={{ title: "Voltar" }}
        />
        <Stack.Screen name="perfil" options={{ title: "Voltar" }} />
        <Stack.Screen name="configuracoes" options={{ title: "Voltar" }} />
        <Stack.Screen name="sobre" options={{ title: "Voltar" }} />
      </Stack>
      <FooterNav />
    </View>
  );
}

export default function Layout() {
  return (
    <TemaProvider>
      <AuthProvider>
        <PartidasProvider>
          <ConvitesProvider>
            <AuthGuard>
              <Inner />
            </AuthGuard>
          </ConvitesProvider>
        </PartidasProvider>
      </AuthProvider>
    </TemaProvider>
  );
}

const styles = StyleSheet.create({
  innerContainer: { flex: 1 },
  splash: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  // 3. Adicionado estilo para a imagem da logo ficar bem enquadrada
  splashLogo: {
    width: 150,
    height: 150,
  },
  splashNome: {
    fontSize: 22,
    fontWeight: "900",
    color: "#123b17",
    marginTop: 12,
  },
  footerContainer: {
    position: "absolute",
    bottom: 24,
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    height: 68,
    borderRadius: 34,
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
  },
  tabItem: { alignItems: "center", flex: 1 },
  tabIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  tabIconWrapperAtivo: { backgroundColor: "#2ECC71" },
  tabLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.6)",
    fontWeight: "600",
    marginTop: 2,
  },
  tabLabelAtivo: { color: "#fff" },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#e53935",
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: "#123b17",
  },
  badgeTexto: { color: "#fff", fontSize: 9, fontWeight: "bold" },
});