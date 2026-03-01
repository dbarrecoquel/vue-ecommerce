import api from './api.js'

export const productService = {
    getAll : (params= {}) => api.get('/api/products', {params}),
    getById: (id) => api.get(`/api/products/${id}`),
    updateStock : (id,quantity) => api.patch(`/api/products/${id}/stock`, { quantity })
}