
import { userRepository } from '../services/user.service.js';
import { tokenSign, verifyToken } from '../helpers/generarToken.js';

const usersController = {};

usersController.createUser = async (req, res) => {
    const { nombre, correo, password, rol_id} = req.body;
    try {
        const id = await userRepository.create({ nombre, correo, password, rol_id});
        res.send({ id });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

usersController.login = async (req, res) => {
    const { correo, password } = req.body;
    try {
        const usuario = await userRepository.login({ correo, password });
        const token = await tokenSign(usuario);
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 
        });
        res.send("Login exitoso: ");
        console.log("Login exitoso:\n", token)
    } catch (error) {
        res.status(401).send(error.message);
    }
};

usersController.obtenerUsers = async (req, res) => {
    try {
        const users = await userRepository.obtenerUsuarios();
        res.send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

usersController.obtenerUsersPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userRepository.usuarioId(id);
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

usersController.modificarUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, password, rol_id } = req.body;
  
    try {
      const user = await userRepository.modificarUsuario(id, { nombre, correo, password, rol_id });
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  usersController.eliminarUser = async (req, res) => {
    const { id } = req.params; 
  
    try {
      const result = await userRepository.eliminarUsuario(id); 
      res.status(200).send(result); 
    } catch (error) {
      res.status(400).send({ error: error.message }); 
    }
  };
  

usersController.protected = async (req, res) => {
    console.log("token cookies ", req.cookies.access_token);
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) {
        return res.status(403).send("Acceso no autorizado");
    }

    try {
        const data = await verifyToken(token);
        res.render("protected", data);
        console.log(data);
    } catch (error) {
        res.status(401).send("Acceso no autorizado");
    }
};

export default usersController;
