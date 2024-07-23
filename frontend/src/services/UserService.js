import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/users';

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