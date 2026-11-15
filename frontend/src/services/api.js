import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname !== 'localhost' ? '/api' : 'http://localhost:5000/api'),
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default api;

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const destinationsAPI = {
  getAll: (params) => api.get('/destinations', { params }),
  getBySlug: (slug) => api.get(`/destinations/${slug}`),
  getTrending: () => api.get('/destinations/trending'),
};

export const staysAPI = {
  getAll: (params) => api.get('/stays', { params }),
  getBySlug: (slug) => api.get(`/stays/${slug}`),
};

export const foodAPI = {
  getAll: (params) => api.get('/food', { params }),
};

export const reviewsAPI = {
  getAll: (params) => api.get('/reviews', { params }),
  create: (data) => api.post('/reviews', data),
};

export const aiAPI = {
  generateItinerary: (data) => api.post('/ai/generate-itinerary', data),
  modifyItinerary: (data) => api.post('/ai/modify-itinerary', data),
};

export const tripsAPI = {
  getAll: () => api.get('/trips'),
  getById: (id) => api.get(`/trips/${id}`),
  create: (data) => api.post('/trips', data),
  update: (id, data) => api.put(`/trips/${id}`, data),
  delete: (id) => api.delete(`/trips/${id}`),
  addExpense: (tripId, data) => api.post(`/trips/${tripId}/expenses`, data),
  getExpenses: (tripId) => api.get(`/trips/${tripId}/expenses`),
  deleteExpense: (tripId, expenseId) => api.delete(`/trips/${tripId}/expenses/${expenseId}`),
};
