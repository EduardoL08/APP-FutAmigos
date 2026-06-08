import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import { sombra } from "../utils/estilos";

type Variante = "primario" | "secundario" | "perigo" | "outline";

type Props = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  variante?: Variante;
  desabilitado?: boolean;
  carregando?: boolean;
  estilo?: ViewStyle;
};

const ESTILOS_VARIANTE = {
  primario: { bg: "#2ECC71", texto: "#fff", borda: "#2ECC71" },
  secundario: { bg: "#123b17", texto: "#fff", borda: "#123b17" },
  perigo: { bg: "#e53935", texto: "#fff", borda: "#e53935" },
  outline: { bg: "transparent", texto: "#123b17", borda: "#123b17" },
};

export function BotaoPadrao({
  label,
  onPress,
  variante = "primario",
  desabilitado = false,
  carregando = false,
  estilo,
}: Props) {
  const cor = ESTILOS_VARIANTE[variante];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: cor.bg, borderColor: cor.borda },
        variante !== "outline" && sombra("suave"),
        (desabilitado || carregando) && styles.desabilitado,
        estilo,
      ]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={desabilitado || carregando}
    >
      {carregando ? (
        <ActivityIndicator color={cor.texto} size="small" />
      ) : (
        <Text style={[styles.label, { color: cor.texto }]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    borderWidth: 2,
  },
  desabilitado: { opacity: 0.5 },
  label: { fontSize: 16, fontWeight: "bold" },
});
