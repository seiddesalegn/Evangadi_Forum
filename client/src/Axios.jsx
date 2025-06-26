import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://api.evanforum.com/api",
  baseURL: "http://localhost:5500/api",
});

export default axiosInstance;
