// Utilitários de validação de formulários

export function validarEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validarSenha(senha: string): boolean {
  return senha.length >= 6;
}

export function validarData(data: string): boolean {
  // Aceita DD/MM/AAAA
  return /^\d{2}\/\d{2}\/\d{4}$/.test(data);
}

export function validarHorario(horario: string): boolean {
  // Aceita HH:MM
  return /^\d{2}:\d{2}$/.test(horario);
}

export function formatarData(texto: string): string {
  const numeros = texto.replace(/\D/g, "").slice(0, 8);
  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 4) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
  return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
}

export function formatarHorario(texto: string): string {
  const numeros = texto.replace(/\D/g, "").slice(0, 4);
  if (numeros.length <= 2) return numeros;
  return `${numeros.slice(0, 2)}:${numeros.slice(2)}`;
}

export function formatarTelefone(texto: string): string {
  const numeros = texto.replace(/\D/g, "").slice(0, 11);
  if (numeros.length <= 2) return `(${numeros}`;
  if (numeros.length <= 7)
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

export function calcularDistanciaKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
