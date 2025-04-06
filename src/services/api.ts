
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },
  
  register: async (email: string, password: string, firstName?: string, lastName?: string) => {
    const response = await api.post('/auth/register', { email, password, firstName, lastName });
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// Links services
export const linksService = {
  createLink: async (originalUrl: string, alias?: string, tags?: string[]) => {
    const response = await api.post('/links', { originalUrl, alias, tags });
    return response.data;
  },
  
  getAllLinks: async () => {
    const response = await api.get('/links');
    return response.data;
  },
  
  getRecentLinks: async (limit: number = 3) => {
    const response = await api.get(`/links?limit=${limit}`);
    return response.data;
  },
  
  getLinkById: async (id: string) => {
    const response = await api.get(`/links/${id}`);
    return response.data;
  },
  
  updateLink: async (id: string, data: any) => {
    const response = await api.patch(`/links/${id}`, data);
    return response.data;
  },
  
  deleteLink: async (id: string) => {
    const response = await api.delete(`/links/${id}`);
    return response.data;
  },
};

// Analytics services
export const analyticsService = {
  getClicksForLink: async (linkId: string) => {
    const response = await api.get(`/analytics/link/${linkId}`);
    return response.data;
  },
  
  getAllClicks: async () => {
    const response = await api.get('/analytics');
    return response.data;
  },
  
  getClicksByDateRange: async (linkId: string, startDate: Date, endDate: Date) => {
    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];
    const response = await api.get(`/analytics/link/${linkId}/date-range?start=${start}&end=${end}`);
    return response.data;
  },
  
  getClicksByDevice: async () => {
    const response = await api.get('/analytics/devices');
    return response.data;
  },
  
  getClicksByBrowser: async () => {
    const response = await api.get('/analytics/browsers');
    return response.data;
  },
  
  getClicksByCountry: async () => {
    const response = await api.get('/analytics/countries');
    return response.data;
  },
  
  recordClick: async (alias: string, data: any) => {
    const response = await api.post(`/analytics/${alias}/click`, data);
    return response.data;
  },
};

export default api;
