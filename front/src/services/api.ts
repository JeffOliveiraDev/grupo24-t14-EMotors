import axios from "axios";

const apiEmotors = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
});

export { apiEmotors };
