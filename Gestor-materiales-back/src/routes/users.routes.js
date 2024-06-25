import express from 'express';
const router = express.Router();
import usersController from '../controller/user.contoller.js'



router.post('/login', usersController.login)
router.post('/register', usersController.createUser)
router.get('/logout')

router.get('/protected', usersController.protected)

export default router;
