const checkRol = (rolesPermitidos) => {
    return (req, res, next) => {
      try {
       
        const userRoleName = req.rol_nombre;

        if (!req.user || !req.user.rol_id || !rolesPermitidos.includes(userRoleName)) {
          return res.status(403).json({ error: 'Acceso prohibido' });
        }
  
        next();
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error en validar el rol' });
      }
    };
  };
  
  
  
  export default checkRol;