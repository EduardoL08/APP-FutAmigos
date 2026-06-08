import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useTema } from "../contexts/TemaContext";
import { sombra } from "../utils/estilos";

export function SkeletonCard() {
  const { cores } = useTema();
  const opacidade = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacidade, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacidade, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacidade]);

  return (
    <Animated.View
      style={[
        styles.card,
        { backgroundColor: cores.card, opacity: opacidade },
        sombra("suave"),
      ]}
    >
      <View style={[styles.linhaTitulo, { backgroundColor: cores.borda }]} />
      <View style={[styles.linhaDesc, { backgroundColor: cores.borda }]} />
      <View style={styles.row}>
        <View style={[styles.linhaInfo, { backgroundColor: cores.borda }]} />
        <View style={[styles.badge, { backgroundColor: cores.borda }]} />
      </View>
      <View style={[styles.linhaInfo, { backgroundColor: cores.borda }]} />
      <View style={[styles.barra, { backgroundColor: cores.borda }]} />
    </Animated.View>
  );
}

export function ListaSkeleton() {
  return (
    <>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, padding: 16, marginBottom: 12 },
  linhaTitulo: { height: 18, width: "70%", borderRadius: 6, marginBottom: 10 },
  linhaDesc: { height: 13, width: "50%", borderRadius: 6, marginBottom: 10 },
  linhaInfo: { height: 13, width: "45%", borderRadius: 6 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  badge: { width: 70, height: 26, borderRadius: 8 },
  barra: { height: 4, borderRadius: 2, marginTop: 8 },
});
