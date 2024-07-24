/* eslint-disable no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import API_BASE_URL from './APIConfig';

const baseUrl = `${API_BASE_URL}/proformas`;

const create = async newProforma => {
  try {
    const response = await axios.post(baseUrl, newProforma);
    return response.data;
  } catch (error) {
    console.error('Error creating proforma:', error);
    throw new Error('Error creating proforma');
  }
};

const getByClientEmail = async (email) => {
  try {
    const response = await axios.get(`${baseUrl}/byEmail?clientEmail=${encodeURIComponent(email)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching proformas by email:', error);
    throw new Error('Error fetching proformas by email');
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

const downloadProformaPDF = async (proformaId) => {
  try {
    const response = await axios.get(`${baseUrl}/${proformaId}/pdf`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `proforma_${proformaId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw new Error('Error downloading PDF');
  }
};

export default { 
  create, 
  getAll, 
  update, 
  remove, 
  getByClientEmail,
  downloadProformaPDF
};