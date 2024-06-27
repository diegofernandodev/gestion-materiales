import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const getToken = () => {
  return Cookies.get('access_token');
};

export const getDecodedToken = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getUserId = () => {
  const decodedToken = getDecodedToken();
  return decodedToken ? decodedToken._id : null;
};

export const getUserName = () => {
  const decodedToken = getDecodedToken();
  return decodedToken ? decodedToken.nombre : null;
};

export const getUserRoleId = () => {
  const decodedToken = getDecodedToken();
  return decodedToken ? decodedToken.rol_id : null;
};

export const getNameRolId = () => {
    const decodedToken = getDecodedToken();
    return decodedToken ? decodedToken.rol_nombre : null;
  };
