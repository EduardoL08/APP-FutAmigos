import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTema } from "../contexts/TemaContext";

type Props = {
  titulo: string;
  mostrarVoltar?: boolean;
  acaoDireita?: () => void;
  iconeDireita?: keyof typeof Ionicons.glyphMap;
};

export function Header({
  titulo,
  mostrarVoltar = false,
  acaoDireita,
  iconeDireita,
}: Props) {
  const router = useRouter();
  const { cores } = useTema();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: cores.card, borderBottomColor: cores.borda },
      ]}
    >
      {mostrarVoltar ? (
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.botaoIcone}
        >
          <Ionicons name="arrow-back" size={24} color={cores.primario} />
        </TouchableOpacity>
      ) : (
        <View style={styles.botaoIcone} />
      )}
      <Text style={[styles.titulo, { color: cores.primario }]}>{titulo}</Text>
      {acaoDireita && iconeDireita ? (
        <TouchableOpacity onPress={acaoDireita} style={styles.botaoIcone}>
          <Ionicons name={iconeDireita} size={24} color={cores.primario} />
        </TouchableOpacity>
      ) : (
        <View style={styles.botaoIcone} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  titulo: { fontSize: 20, fontWeight: "bold" },
  botaoIcone: { width: 36, alignItems: "center" },
});
