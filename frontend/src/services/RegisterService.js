/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import API_BASE_URL from './APIConfig';

const baseUrl = `${API_BASE_URL}/users`

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { create }