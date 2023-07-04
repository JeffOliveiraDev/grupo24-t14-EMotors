import axios from "axios";

const apiEmotors = axios.create({
  baseURL: "https://m6-emotors.onrender.com",
  timeout: 10000,
});

export { apiEmotors };
