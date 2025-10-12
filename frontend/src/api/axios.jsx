import axios from 'axios';

// Use the backend URL from .env
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1200000, 
});

export default api;
