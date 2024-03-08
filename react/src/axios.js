import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  config.params = {
    token: localStorage.getItem('accessToken'), 
  };
  return config;
});

export default axiosClient;