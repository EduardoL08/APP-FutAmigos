import {
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

export function Input(props: TextInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#999"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
input: {
  width: "100%",
  height: 48,
  borderWidth: 1,
  borderColor: "#eee",
  borderRadius: 12,
  fontSize: 16,
  paddingHorizontal: 14,
  backgroundColor: "#fff",
  marginBottom: 15,
  elevation: 2,
},
});