import axios from 'axios';

const API_URL = 'http://localhost:3003/api/properties';

const PropertyService = {
  // Métodos existentes
  getAll: () => {
    return axios.get(API_URL);
  },

  create: (property) => {
    return axios.post(API_URL, property);
  },

  update: (id, updatedProperty) => {
    return axios.put(`${API_URL}/${id}`, updatedProperty);
  },

  delete: (id) => {
    return axios.delete(`${API_URL}/${id}`);
  },

  getById: (id) => {
    return axios.get(`${API_URL}/${id}`);
  },

  // Nuevo método para buscar por código
  getByCode: (code) => {
    return axios.get(`${API_URL}/${code}`);
  }
};

export default PropertyService;