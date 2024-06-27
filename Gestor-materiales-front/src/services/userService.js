import axios from 'axios';

const API_URL = 'http://localhost:3000';

const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const login = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const obtenerUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/obtenerUsers`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const obtenerUserPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/obtenerUserId/${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const modificarUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/modificarUser/${id}`, userData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const eliminarUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/eliminarUser/${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const protectedRoute = async () => {
  try {
    const response = await axios.get(`${API_URL}/protected`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`, {}, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export {
  createUser,
  login,
  obtenerUsers,
  obtenerUserPorId,
  modificarUser,
  eliminarUser,
  protectedRoute,
  logout
};
