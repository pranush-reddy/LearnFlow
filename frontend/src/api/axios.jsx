import axios from 'axios';

// Use the backend URL from .env
const backendUrl = 'https://learnflow-dx2b.onrender.com';

const api = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1200000, 
});

export default api;
