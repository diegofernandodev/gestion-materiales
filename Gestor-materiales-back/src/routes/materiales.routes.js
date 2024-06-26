import express from 'express';
const router = express.Router();
import materialesController from '../controller/materiales.controller.js';
import checkRol from "../middleware/permisoAcceso.js";
import validarToken from "../middleware/verificarToken.js";



router.post('/crearMaterial', validarToken, checkRol(['administrador','repartidor']), materialesController.createMaterial)
router.get('/obtenerMaterialId', validarToken, checkRol(['administrador','repartidor']), materialesController.obtenerMaterialPorId)
router.get('/obtenerMateriales', validarToken, checkRol(['administrador','repartidor']), materialesController.obtenerMateriales)
router.put('/modificarMaterial', validarToken, checkRol(['administrador','repartidor']), materialesController.modificarMaterial)
router.delete('/eliminarMaterial', validarToken, checkRol(['administrador','repartidor']), materialesController.eliminarMaterial)

export default router;