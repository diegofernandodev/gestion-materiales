import express from 'express';
const router = express.Router();
import usersController from '../controller/user.contoller.js';
import logoutController  from "../controller/logout.controller.js";
import checkRol from "../middleware/permisoAcceso.js";
import validarToken from "../middleware/verificarToken.js";



router.post('/login', usersController.login)
router.post('/register', usersController.createUser)
router.post('/logout', logoutController.logout)

router.get('/obtenerUserId/:id', validarToken, checkRol(['administrador','repartidor']), usersController.obtenerUsersPorId)
router.get('/obtenerUsers', validarToken, checkRol(['administrador','repartidor']), usersController.obtenerUsers)
router.put('/modificarUser/:id', validarToken, checkRol(['administrador']), usersController.modificarUser)
router.delete('/eliminarUser/:id', validarToken, checkRol(['administrador']), usersController.eliminarUser)

router.get('/protected', usersController.protected)

export default router;
