import { Text, StyleSheet } from "react-native";

interface Props {
  title: string;
}

export function Header({ title }: Props) {
  return <Text style={styles.titulo}>{title}</Text>;
}

const styles = StyleSheet.create({
titulo: {
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 15,
  marginTop: 10, 
},
});