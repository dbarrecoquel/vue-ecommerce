import api from './api.js'

export const categoryService = {
  getAll: (params = {}) => api.get('/api/categories', { params }),
  getById: (id) => api.get(`/api/categories/${id}`)
}
