import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { useTema } from "../contexts/TemaContext";

type Props = TextInputProps & {
  label?: string;
  erro?: string;
};

export function CampoTexto({ label, erro, style, ...props }: Props) {
  const { cores } = useTema();
  return (
    <View style={styles.wrapper}>
      {label ? (
        <Text style={[styles.label, { color: cores.texto }]}>{label}</Text>
      ) : null}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: cores.inputBg,
            borderColor: erro ? "#e53935" : cores.borda,
            color: cores.texto,
            // boxShadow no lugar de shadow* para evitar warning no Web
            boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
          } as any,
          style,
        ]}
        placeholderTextColor={cores.placeholder}
        {...props}
      />
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  label: { fontSize: 14, fontWeight: "bold", marginBottom: 6 },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 16,
    paddingHorizontal: 14,
  },
  erro: { color: "#e53935", fontSize: 12, marginTop: 4 },
});
