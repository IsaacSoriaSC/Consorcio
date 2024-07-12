/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { create }