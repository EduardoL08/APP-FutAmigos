import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TemaContextType = {
  escuro: boolean;
  alternarTema: () => void;
  cores: typeof CORES_CLARO;
};

const CORES_CLARO = {
  fundo: "#f5f5f5",
  card: "#ffffff",
  texto: "#1a1a1a",
  textoSecundario: "#666666",
  borda: "#eeeeee",
  primario: "#123b17",
  acento: "#2ECC71",
  inputBg: "#ffffff",
  placeholder: "#999999",
};

const CORES_ESCURO = {
  fundo: "#0d0d0d",
  card: "#1a1a1a",
  texto: "#f0f0f0",
  textoSecundario: "#aaaaaa",
  borda: "#2a2a2a",
  primario: "#1a5c24",
  acento: "#2ECC71",
  inputBg: "#242424",
  placeholder: "#666666",
};

const TemaContext = createContext<TemaContextType>({} as TemaContextType);

export function TemaProvider({ children }: { children: ReactNode }) {
  const sistemaEscuro = useColorScheme() === "dark";
  const [escuro, setEscuro] = useState(sistemaEscuro);

  useEffect(() => {
    AsyncStorage.getItem("@futamigos:tema").then((v) => {
      if (v !== null) setEscuro(v === "escuro");
    });
  }, []);

  const alternarTema = useCallback(() => {
    setEscuro((prev) => {
      const novo = !prev;
      AsyncStorage.setItem("@futamigos:tema", novo ? "escuro" : "claro");
      return novo;
    });
  }, []);

  return (
    <TemaContext.Provider
      value={{
        escuro,
        alternarTema,
        cores: escuro ? CORES_ESCURO : CORES_CLARO,
      }}
    >
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  return useContext(TemaContext);
}
