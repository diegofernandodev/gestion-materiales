const checkRol = (rolesPermitidos) => {
    return (req, res, next) => {
      try {
       
        if (!req.user || !req.user.rol || !rolesPermitidos.includes(req.user.rol)) {
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