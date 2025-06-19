import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.evanforum.com/",
});

export default axiosInstance;
