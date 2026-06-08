import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "../src/contexts/AuthContext";
import { useTema } from "../src/contexts/TemaContext";
import { LocalEsportivo } from "../src/types/configuracao";
import { calcularDistanciaKm } from "../src/utils/validacao";
import * as Location from "expo-location";

const LOCAIS_BASE: Omit<LocalEsportivo, "distanciaKm">[] = [
  {
    id: "1",
    nome: "Arena Pampulha",
    endereco: "Av. Antônio Carlos, Pampulha",
    tipo: "campo",
    latitude: -19.8676,
    longitude: -43.9669,
  },
  {
    id: "2",
    nome: "Quadra Savassi",
    endereco: "Rua da Bahia, Savassi",
    tipo: "society",
    latitude: -19.9397,
    longitude: -43.9307,
  },
  {
    id: "3",
    nome: "Society BH Centro",
    endereco: "Av. Amazonas, Centro",
    tipo: "society",
    latitude: -19.9166,
    longitude: -43.9345,
  },
  {
    id: "4",
    nome: "Campo do Lourdes",
    endereco: "Rua Espírito Santo, Lourdes",
    tipo: "campo",
    latitude: -19.9352,
    longitude: -43.9398,
  },
  {
    id: "5",
    nome: "Arena Contagem",
    endereco: "Av. João César de Oliveira",
    tipo: "quadra",
    latitude: -19.9322,
    longitude: -44.0539,
  },
  {
    id: "6",
    nome: "Quadra Betim",
    endereco: "Av. Américo Vespúcio, Betim",
    tipo: "quadra",
    latitude: -19.9681,
    longitude: -44.1981,
  },
  {
    id: "7",
    nome: "Society Nova Lima",
    endereco: "Rua Ouro Preto, Nova Lima",
    tipo: "society",
    latitude: -20.0173,
    longitude: -43.8449,
  },
];

const TIPO_ICONE = { campo: "🏟️", society: "⚽", quadra: "🏀" } as const;
const TIPO_LABEL = {
  campo: "Campo",
  society: "Society",
  quadra: "Quadra",
} as const;
const TIPO_COR_BG = {
  campo: "#E8F5E9",
  society: "#E3F2FD",
  quadra: "#FFF3E0",
} as const;
const TIPO_COR_TX = {
  campo: "#2E7D32",
  society: "#1565C0",
  quadra: "#E65100",
} as const;

type FiltroTipo = "todos" | "campo" | "society" | "quadra";

export default function Mapa() {
  const [filtro, setFiltro] = useState<FiltroTipo>("todos");
  const [locais, setLocais] = useState<LocalEsportivo[]>([]);
  const [coordsUsuario, setCoordsUsuario] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [carregandoLoc, setCarregandoLoc] = useState(true);
  const { usuario } = useAuth();
  const { cores } = useTema();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const pos = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          const { latitude, longitude } = pos.coords;
          setCoordsUsuario({ lat: latitude, lon: longitude });
          // Calcula distância real de cada local
          const comDistancia: LocalEsportivo[] = LOCAIS_BASE.map((l) => ({
            ...l,
            distanciaKm: calcularDistanciaKm(
              latitude,
              longitude,
              l.latitude,
              l.longitude,
            ),
          })).sort((a, b) => (a.distanciaKm ?? 0) - (b.distanciaKm ?? 0));
          setLocais(comDistancia);
        } else {
          // Sem permissão: usa distâncias fixas
          setLocais(LOCAIS_BASE.map((l) => ({ ...l, distanciaKm: undefined })));
        }
      } catch {
        setLocais(LOCAIS_BASE.map((l) => ({ ...l, distanciaKm: undefined })));
      } finally {
        setCarregandoLoc(false);
      }
    })();
  }, []);

  const filtrados = locais.filter(
    (l) => filtro === "todos" || l.tipo === filtro,
  );

  return (
    <View style={[styles.container, { backgroundColor: cores.fundo }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: cores.fundo }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.titulo, { color: cores.texto }]}>Mapa ⚽</Text>
          <Text style={[styles.subtitulo, { color: cores.textoSecundario }]}>
            {coordsUsuario
              ? "Ordenado pela sua localização"
              : "Campos próximos"}
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/perfil")}>
          <Image
            source={{ uri: usuario?.foto || "https://i.pravatar.cc/100?img=8" }}
            style={[styles.avatar, { borderColor: cores.acento }]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.filtrosRow}>
        {(["todos", "campo", "society", "quadra"] as FiltroTipo[]).map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFiltro(f)}
            style={[
              styles.filtro,
              { backgroundColor: cores.card, borderColor: cores.borda },
              filtro === f && {
                backgroundColor: cores.primario,
                borderColor: cores.primario,
              },
            ]}
          >
            <Text
              style={[
                styles.filtroTexto,
                { color: cores.textoSecundario },
                filtro === f && { color: "#fff" },
              ]}
            >
              {f === "todos" ? "Todos" : TIPO_LABEL[f]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View
        style={[
          styles.mapaPlaceholder,
          { backgroundColor: cores.card, borderColor: cores.borda },
        ]}
      >
        {carregandoLoc ? (
          <>
            <ActivityIndicator size="large" color="#2ECC71" />
            <Text style={[styles.mapaTexto, { color: cores.textoSecundario }]}>
              Obtendo localização...
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.mapaEmoji}>🗺️</Text>
            <Text style={[styles.mapaTexto, { color: cores.primario }]}>
              {coordsUsuario
                ? "📍 Localização obtida!"
                : "Mapa de Belo Horizonte"}
            </Text>
            <Text
              style={[styles.mapaSubTexto, { color: cores.textoSecundario }]}
            >
              {filtrados.length} locais encontrados
            </Text>
            {coordsUsuario && (
              <Text
                style={[styles.coordsTexto, { color: cores.textoSecundario }]}
              >
                {coordsUsuario.lat.toFixed(4)}, {coordsUsuario.lon.toFixed(4)}
              </Text>
            )}
          </>
        )}
      </View>

      <View style={[styles.resumoCard, { backgroundColor: cores.card }]}>
        <Text style={[styles.resumoTitulo, { color: cores.texto }]}>
          📍 {filtrados.length} locais{" "}
          {filtro !== "todos" ? `(${TIPO_LABEL[filtro]})` : ""}
        </Text>
        <Text style={[styles.resumoSub, { color: cores.textoSecundario }]}>
          {coordsUsuario
            ? "Ordenados por distância real"
            : "Campos e quadras em BH e região"}
        </Text>
      </View>

      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 130 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.cardLocal,
              { backgroundColor: TIPO_COR_BG[item.tipo] },
            ]}
            onPress={() =>
              Alert.alert(
                item.nome,
                `${item.endereco}\n${item.distanciaKm ? `📍 ${item.distanciaKm.toFixed(1)} km de você` : ""}`,
              )
            }
          >
            <Text style={styles.cardLocalIcone}>{TIPO_ICONE[item.tipo]}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.nomeLocal, { color: cores.texto }]}>
                {item.nome}
              </Text>
              <Text
                style={[styles.enderecoLocal, { color: cores.textoSecundario }]}
              >
                {item.endereco}
              </Text>
              <View style={styles.tipoRow}>
                <Text
                  style={[styles.tipoLocal, { color: TIPO_COR_TX[item.tipo] }]}
                >
                  {TIPO_LABEL[item.tipo]}
                </Text>
              </View>
            </View>
            {item.distanciaKm !== undefined && (
              <View
                style={[
                  styles.distanciaContainer,
                  { backgroundColor: cores.primario },
                ]}
              >
                <Text style={styles.distanciaTexto}>
                  {item.distanciaKm.toFixed(1)} km
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 8 : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  titulo: { fontSize: 26, fontWeight: "bold" },
  subtitulo: { fontSize: 13, marginTop: 2 },
  avatar: { width: 50, height: 50, borderRadius: 25, borderWidth: 2 },
  filtrosRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  filtro: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  filtroTexto: { fontWeight: "600", fontSize: 13 },
  mapaPlaceholder: {
    height: 160,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
  },
  mapaEmoji: { fontSize: 36, marginBottom: 8 },
  mapaTexto: { fontWeight: "bold", fontSize: 15 },
  mapaSubTexto: { fontSize: 13, marginTop: 4 },
  coordsTexto: { fontSize: 11, marginTop: 4 },
  resumoCard: {
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
  },
  resumoTitulo: { fontSize: 15, fontWeight: "bold" },
  resumoSub: { fontSize: 13, marginTop: 4 },
  cardLocal: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    elevation: 1,
  },
  cardLocalIcone: { fontSize: 28 },
  nomeLocal: { fontSize: 15, fontWeight: "bold" },
  enderecoLocal: { fontSize: 12, marginTop: 2 },
  tipoRow: { marginTop: 4 },
  tipoLocal: { fontSize: 12, fontWeight: "600" },
  distanciaContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  distanciaTexto: { color: "#fff", fontWeight: "bold", fontSize: 13 },
});
