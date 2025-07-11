import axios from "axios";

export const api = axios.create({
  baseURL: "https://dev-pizza-back-end.vercel.app",
});
