import axios from "axios";

<<<<<<< HEAD
export const api = axios.create({
  baseURL: "http://localhost/3001",
  timeout: 5000,
=======
const api = axios.create({
  baseURL: "https://kenzie-kars.herokuapp.com",
  timeout: 10000,
>>>>>>> 1d11eb3306a5d7cad05f194d7f96a58254db66cb
});

const apiEmotors = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000,
});

export { api, apiEmotors };
