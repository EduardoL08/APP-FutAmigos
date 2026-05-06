import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

type Props = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
};

export function Button({ label, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
    backgroundColor: "#2ECC71",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
