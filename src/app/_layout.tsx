import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Stack, Link } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      
      <View style={{ flex: 1 }}>

        <Stack
          screenOptions={{
            headerShown: true,
            headerTintColor: "#10ad25",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="meusJogos" options={{  headerShown: false }} />
          <Stack.Screen name="maps" options={{  headerShown: false }} />

          <Stack.Screen name="perfil" options={{ title: "Voutar para Home" }} />
          <Stack.Screen name="configuracoes" options={{ title: "Voutar para Perfil" }} />
          <Stack.Screen name="peladas/[id]" options={{ title: "Detalhes da Pelada" }} />
          
        </Stack>
        
      </View>

      {/* Navegação Inferior Fixa */}
      <View style={styles.footerContainer}>
        <View style={styles.footer}>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.tabItem}>
              <Ionicons name="home" size={24} color="#fff" />
              <Text style={styles.footerLink}>Home</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/meusJogos" asChild>
            <TouchableOpacity style={styles.tabItem}>
              <Ionicons name="football" size={24} color="#fff" />
              <Text style={styles.footerLink}>Jogos</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/maps" asChild>
            <TouchableOpacity style={styles.tabItem}>
              <Ionicons name="map" size={24} color="#fff" />
              <Text style={styles.footerLink}>Maps</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#10ad25",
    width: "100%",
    height: 70,
    borderRadius: 35,
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  footerLink: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
});