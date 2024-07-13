/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/login';

const login = async credentials => {
  try {
    const response = await axios.post(baseUrl, credentials);
    const { token } = response.data;

    // Asegúrate de que el token existe antes de guardarlo
    if (token) {
      localStorage.setItem('token', token);
    } else {
      console.error('No se recibió un token en la respuesta');
    }

    return response.data;
  } catch (error) {
    console.error('Error en el login:', error);
    throw new Error('Error al iniciar sesión');
  }
};

export default { login };
