import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 8000,
});

export async function buscarUsuariosAPI() {
  const { data } = await api.get("/users?_limit=5");
  return data;
}

export default api;
