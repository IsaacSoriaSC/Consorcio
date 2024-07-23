/* eslint-disable import/no-anonymous-default-export */
// services/ReporteService.js
import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/reports';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw new Error('Error fetching reports');
  }
};

export default { getAll };
