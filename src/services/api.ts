import axios from "axios";

export const jsonApi = axios.create({
  baseURL: "http://localhost:3004",
});

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});
