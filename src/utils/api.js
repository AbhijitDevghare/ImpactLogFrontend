import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Adjust this to match your backend's URL and port
});

export default api;