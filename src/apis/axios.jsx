import axios from 'axios';


const apiClient = axios.create({
    // baseURL: 'http://89.116.20.125:4000/api/v1',
    baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api/v1',
    headers: {
      'Content-Type': 'application/json',
    },
  });


  apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export default apiClient;