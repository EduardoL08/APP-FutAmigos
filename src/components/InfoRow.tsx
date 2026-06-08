import { View, Text, StyleSheet } from "react-native";
import { useTema } from "../contexts/TemaContext";
import { sombra } from "../utils/estilos";

type Props = {
  label: string;
  valor: string | number;
  icone?: string;
};

export function InfoRow({ label, valor, icone }: Props) {
  const { cores } = useTema();
  return (
    <View
      style={[
        styles.row,
        { backgroundColor: cores.card, borderColor: cores.borda },
        sombra("nenhuma"),
      ]}
    >
      {icone ? <Text style={styles.icone}>{icone}</Text> : null}
      <View style={{ flex: 1 }}>
        <Text style={[styles.label, { color: cores.textoSecundario }]}>
          {label}
        </Text>
        <Text style={[styles.valor, { color: cores.texto }]}>{valor}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  icone: { fontSize: 20, marginRight: 12 },
  label: { fontSize: 12 },
  valor: { fontSize: 15, fontWeight: "bold" },
});
