import axios from "axios";
// http://localhost:5000
const apiEmotors = axios.create({
  baseURL: "https://m6-emotors.onrender.com",
  timeout: 10000,
});

export { apiEmotors };
