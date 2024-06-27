import jwt from 'jsonwebtoken';
import Role from '../models/role.js';

const validarToken = async (req, res, next) => {
  try {
    
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }
 

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: 'Token no válido' });
      }
      req.user = decodedToken;

      req._id = decodedToken._id;
      req.nombre = decodedToken.nombre;
      req.correo = decodedToken.correo
      req.rol_id = decodedToken.rol_id;

      const role = await Role.findByPk(req.rol_id);
      if (role) {
        req.rol_nombre = role.nombre;
      } else {
        return res.status(401).json({ error: 'Rol no válido' });
      }
      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al validar token' });
  }
};


export default validarToken;