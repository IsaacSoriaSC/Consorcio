import axios from 'axios';
import API_BASE_URL from './APIConfig';

const API_URL = `${API_BASE_URL}/properties`;

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