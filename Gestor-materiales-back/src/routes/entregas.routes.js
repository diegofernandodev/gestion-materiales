import express from 'express';
const router = express.Router();
import entregasController from '../controller/entregas.controller.js';
import checkRol from "../middleware/permisoAcceso.js";
import validarToken from "../middleware/verificarToken.js";



router.post('/crearEntrega', validarToken, checkRol(['administrador','repartidor']), entregasController.createEntrega)
router.get('/obtenerEntregaId', validarToken, checkRol(['administrador','repartidor']), entregasController.obtenerEntregas)
router.get('/obtenerEntregas', validarToken, checkRol(['administrador','repartidor']), entregasController.obtenerEntregas)
router.put('/modificarEntrega', validarToken, checkRol(['administrador','repartidor']), entregasController.modificarEntrega)
router.delete('/eliminarEntrega', validarToken, checkRol(['administrador','repartidor']), entregasController.eliminarEntrega)

export default router;