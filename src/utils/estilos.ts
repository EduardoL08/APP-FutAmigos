import { Platform, StyleSheet } from "react-native";

export function sombra(
  nivel: "nenhuma" | "suave" | "media" | "forte" = "suave",
): object {
  const config = {
    nenhuma: { elevation: 0, blur: 0, y: 0, spread: "0px rgba(0,0,0,0)" },
    suave: {
      elevation: 2,
      blur: 4,
      y: 1,
      spread: "0px 1px 4px rgba(0,0,0,0.07)",
    },
    media: {
      elevation: 4,
      blur: 8,
      y: 3,
      spread: "0px 3px 8px rgba(0,0,0,0.10)",
    },
    forte: {
      elevation: 8,
      blur: 14,
      y: 5,
      spread: "0px 5px 14px rgba(0,0,0,0.18)",
    },
  }[nivel];

  if (Platform.OS === "web") {
    return { boxShadow: config.spread };
  }

  return {
    elevation: config.elevation,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: config.y },
    shadowOpacity: nivel === "suave" ? 0.07 : nivel === "media" ? 0.1 : 0.18,
    shadowRadius: config.blur / 2,
  };
}

export function sombraColorida(
  cor: string,
  nivel: "media" | "forte" = "media",
): object {
  if (Platform.OS === "web") {
    const blur = nivel === "media" ? "8px" : "14px";
    return { boxShadow: `0px 4px ${blur} ${cor}55` };
  }
  return {
    elevation: nivel === "media" ? 6 : 10,
    shadowColor: cor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: nivel === "media" ? 6 : 10,
  };
}
