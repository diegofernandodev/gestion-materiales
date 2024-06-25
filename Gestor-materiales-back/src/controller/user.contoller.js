
import { userRepository } from '../services/user.service.js';
import { tokenSign, verifyToken } from '../helpers/generarToken.js';

const usersController = {};

usersController.createUser = async (req, res) => {
    const { nombre, correo, password} = req.body;
    try {
        const id = await userRepository.create({ nombre, correo, password});
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
            maxAge: 1000 * 60 * 60 // 1 hora
        });
        res.send("Login exitoso");
        console.log("Login exitoso")
    } catch (error) {
        res.status(401).send(error.message);
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
