import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://evangadi-forum-605a.onrender.com/api",

  // baseURL: "http://localhost:5500/api",
});

export default axiosInstance;
