import axios from 'axios';

const api = axios.create({
  baseURL: 'https://forum-api.dicoding.dev/v1',
});

api.setAccessToken = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
);

export default api;
