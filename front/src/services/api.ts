import axios from "axios";

const api = axios.create({
  baseURL: "https://kenzie-kars.herokuapp.com",
  timeout: 10000,
});

export default api;
