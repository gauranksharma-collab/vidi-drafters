import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use((config) => {
  if (config.authToken === 'user') {
    const token = localStorage.getItem('vd_user_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } else if (config.authToken === 'admin') {
    const token = localStorage.getItem('vd_admin_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
