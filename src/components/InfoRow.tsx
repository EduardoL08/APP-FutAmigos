import { View, Text, StyleSheet } from "react-native";

interface Props {
  label: string;
  value: string | number;
}

export function InfoRow({ label, value }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 8,
  },
  label: {
    color: "#666",
    fontSize: 14,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
});