import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authApi;
