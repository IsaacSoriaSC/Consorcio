/* eslint-disable no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/proformas';

const create = async newProforma => {
  try {
    const response = await axios.post(baseUrl, newProforma);
    return response.data;
  } catch (error) {
    console.error('Error creating proforma:', error);
    throw new Error('Error creating proforma');
  }
};

const ProformaService = {
    getByClientEmail: async (email) => {
        try {
          const response = await axios.get(`${baseUrl}/byEmail?clientEmail=${encodeURIComponent(email)}`);
          return response.data;
        } catch (error) {
          throw error;
        }
      }
    };

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching proformas:', error);
    throw new Error('Error fetching proformas');
  }
};

const update = async (id, updatedProforma) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedProforma);
    return response.data;
  } catch (error) {
    console.error('Error updating proforma:', error);
    throw new Error('Error updating proforma');
  }
};

const remove = async id => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    console.error('Error deleting proforma:', error);
    throw new Error('Error deleting proforma');
  }
};

export default { 
    create, 
    getAll, 
    update, 
    remove, 
    getByClientEmail: ProformaService.getByClientEmail 
  };