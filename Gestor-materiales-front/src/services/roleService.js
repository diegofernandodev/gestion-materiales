import axios from 'axios';

const API_URL = 'http://localhost:3000';

const createRole = async (roleData) => {
  try {
    const response = await axios.post(`${API_URL}/crearRol`, roleData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const obtenerRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/obtenerRoles`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const obtenerRolePorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/obtenerRolId`, {
      params: { id },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const modificarRole = async (id, roleData) => {
  try {
    const response = await axios.put(`${API_URL}/modificarRol`, { id, ...roleData }, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const eliminarRole = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/eliminarRol`, {
      data: { id },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export {
  createRole,
  obtenerRoles,
  obtenerRolePorId,
  modificarRole,
  eliminarRole
};
