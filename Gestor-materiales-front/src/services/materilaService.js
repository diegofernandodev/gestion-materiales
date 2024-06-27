import axios from 'axios';

const API_URL = 'http://localhost:3000';

const createMaterial = async (materialData) => {
  try {
    const response = await axios.post(`${API_URL}/crearMaterial`, materialData, {
      withCredentials: true // para incluir las cookies en las solicitudes
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const obtenerMateriales = async () => {
  try {
    const response = await axios.get(`${API_URL}/obtenerMateriales`, {
      withCredentials: true // para incluir las cookies en las solicitudes
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const obtenerMaterialPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/obtenerMaterialId`, {
      params: { id },
      withCredentials: true // para incluir las cookies en las solicitudes
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const modificarMaterial = async (id, materialData) => {
  try {
    const response = await axios.put(`${API_URL}/modificarMaterial`, { id, ...materialData }, {
      withCredentials: true // para incluir las cookies en las solicitudes
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const eliminarMaterial = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/eliminarMaterial`, {
      data: { id },
      withCredentials: true // para incluir las cookies en las solicitudes
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export {
  createMaterial,
  obtenerMateriales,
  obtenerMaterialPorId,
  modificarMaterial,
  eliminarMaterial
};
