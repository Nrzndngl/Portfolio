import axios from 'axios';

function getToken() {
  try { return localStorage.getItem('token'); } catch { return null; }
}

function removeToken() {
  try { localStorage.removeItem('token'); } catch { }
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let navigateFn = null;
export const setNavigate = (fn) => { navigateFn = fn; };

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      if (navigateFn && window.location.pathname.startsWith('/admin')) {
        navigateFn('/admin/login');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
