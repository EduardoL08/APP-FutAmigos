import { Text, StyleSheet } from "react-native";

type Props = {
  message: string;
};

export function EmptyList({ message }: Props) {
  return <Text style={styles.text}>{message}</Text>;
}

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    textAlign: "center",
    color: "#999",
  },
});
