import axios from "axios";

const apiEmotors = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000,
});

export { apiEmotors };
