// src/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.ejemplo.com/', // URL base de tu API
  timeout: 5000, // Tiempo máximo de espera (opcional)
  headers: {
    'Content-Type': 'application/json',
  }
});

// Opcional: Interceptores para manejar errores y tokens
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Error de API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
