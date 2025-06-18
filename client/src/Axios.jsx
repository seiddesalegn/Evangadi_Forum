import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https:api.evanforum.com/api",
});

export default axiosInstance;
