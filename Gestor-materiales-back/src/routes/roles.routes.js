import express from 'express';
const router = express.Router();
import roleController from '../controller/role.controller.js';
import checkRol from "../middleware/permisoAcceso.js";
import validarToken from "../middleware/verificarToken.js";



router.post('/crearRol', validarToken, checkRol(['administrador']), roleController.createrol)
router.get('/obtenerRolId', validarToken, checkRol(['administrador']), roleController.obtenerRolePorId)
router.get('/obtenerRoles', validarToken, checkRol(['administrador']), roleController.obtenerRoles)
router.put('/modificarRol', validarToken, checkRol(['administrador']), roleController.modificarRol)
router.delete('/eliminarRol', validarToken, checkRol(['administrador']), roleController.eliminarRol)

export default router;