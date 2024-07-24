import axios from 'axios';
import API_BASE_URL from './APIConfig';

const baseUrl = `${API_BASE_URL}/users`;

const UserService = {
  getAll: () => {
    return axios.get(baseUrl);
  },

  getByRole: (role) => {
    return axios.get(`${baseUrl}?role=${role}`);
  },

  update: (id, userData) => {
    return axios.put(`${baseUrl}/${id}`, userData);
  },

  delete: (id) => {
    return axios.delete(`${baseUrl}/${id}`);
  }
};

export default UserService;