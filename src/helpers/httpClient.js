import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

httpClient.interceptors.request.use(
  (config) => {
    const urlsExcluded = ['/login', '/register'];
    const token = localStorage.getItem('token');
    if (token && !urlsExcluded.includes(config.url)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export { httpClient };
