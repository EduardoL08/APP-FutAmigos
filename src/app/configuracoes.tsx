import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet
} from "react-native";
import { Header } from "../components/Header";

export default function Configuracoes() {

  const [notificacoes, setNotificacoes] = useState(true);
  const [modoEscuro, setModoEscuro] = useState(false);

  return (
    <View style={styles.container}>
     <Header title="Configurações" />

      <View style={styles.item}>
        <Text style={styles.label}>Notificações</Text>
        <Switch
          value={notificacoes}
          onValueChange={setNotificacoes}
        />
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Modo Escuro</Text>
        <Switch
          value={modoEscuro}
          onValueChange={setModoEscuro}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
  },
});