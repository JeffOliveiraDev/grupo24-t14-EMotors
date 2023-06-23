import axios from "axios";

const api = axios.create({
  baseURL: "https://kenzie-kars.herokuapp.com",
  timeout: 10000,
});

const apiEmotors = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000,
});

export { api, apiEmotors };
