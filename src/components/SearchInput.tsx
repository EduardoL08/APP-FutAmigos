import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function SearchInput(props: any) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#777" />
      <TextInput
        style={styles.input}
        placeholder="Buscar peladas na região..."
        {...props}
      />
    </View>
  );
}
const styles = StyleSheet.create({
container: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: 12,
  paddingHorizontal: 10,
  height: 50,
  marginBottom: 20,
},

input: {
  marginLeft: 10,
  flex: 1,
},
});