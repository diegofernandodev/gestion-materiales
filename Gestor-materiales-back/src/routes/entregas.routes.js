import express from 'express';
const router = express.Router();
import entregasController from '../controller/entregas.controller.js';
import checkRol from "../middleware/permisoAcceso.js";
import validarToken from "../middleware/verificarToken.js";



router.post('/crearEntrega', validarToken, checkRol(['administrador','repartidor']), entregasController.createEntrega)
router.get('/obtenerEntregaId/:id', validarToken, checkRol(['administrador','repartidor']), entregasController.obtenerEntregas)
router.get('/obtenerEntregas', validarToken, checkRol(['administrador','repartidor']), entregasController.obtenerEntregas)
router.put('/modificarEntrega/:id', validarToken, checkRol(['administrador','repartidor']), entregasController.modificarEntrega)
router.delete('/eliminarEntrega/:id', validarToken, checkRol(['administrador','repartidor']), entregasController.eliminarEntrega)

// router.get('/obtenerEntregasParaAdministrador', validarToken, checkRol(['administrador']), entregasController.obtenerEntregasParaAdministrador)
// router.get('/obtenerEntregasParaRepartidor/:id', validarToken, checkRol(['administrador','repartidor']), entregasController.obtenerEntregasParaRepartidor)
// router.get('/obtenerEntregasParaEstudiante/:id', validarToken, checkRol(['administrador','repartidor']), entregasController.obtenerEntregasParaEstudiante)

router.get('/obtenerEntregasRol', validarToken, checkRol(['administrador','repartidor']), entregasController.obtenerEntregasRol)

export default router;