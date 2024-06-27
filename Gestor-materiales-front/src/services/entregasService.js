import axios from 'axios';

const API_URL = 'http://localhost:3000';

const createEntrega = async (entregaData) => {
  try {
    const response = await axios.post(`${API_URL}/crearEntrega`, entregaData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const obtenerEntregas = async () => {
  try {
    const response = await axios.get(`${API_URL}/obtenerEntregas`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const obtenerEntregaPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/obtenerEntregaId/${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const modificarEntrega = async (id, entregaData) => {
  try {
    const response = await axios.put(`${API_URL}/modificarEntrega/${id}`, entregaData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const eliminarEntrega = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/eliminarEntrega/${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const obtenerEntregasRol = async () => {
  try {
    const response = await axios.get(`${API_URL}/obtenerEntregasRol`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export {
  createEntrega,
  obtenerEntregas,
  obtenerEntregaPorId,
  modificarEntrega,
  eliminarEntrega,
  obtenerEntregasRol
};
