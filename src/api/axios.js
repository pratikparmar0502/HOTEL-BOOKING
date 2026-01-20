import axios from "axios";

const api = axios.create({
  baseURL: "https://generateapi.techsnack.online/api",
  headers: {
    Authorization: "ngXSnLPrB0vbLvNA",
  },
});

// Interceptor (Optional par achhi practice hai):
// Agar kabhi token change ho ya handle karna ho, toh yahan se logic lagta hai.
api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = "ngXSnLPrB0vbLvNA";
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
