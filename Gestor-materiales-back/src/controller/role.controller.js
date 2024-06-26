import { roleRepository } from '../services/role.service.js';

const roleController = {};

roleController.createrol = async (req, res) => {
    const { nombre } = req.body;
    try {
        const rol = await roleRepository.create({ nombre });
        res.status(201).send({ rol });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

roleController.obtenerRoles = async (req, res) => {
    try {
        const roles = await roleRepository.obtenerRoles();
        res.status(200).send(roles);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

roleController.obtenerRolePorId = async (req, res) => {
    const { id } = req.params;
    try {
        const rol = await roleRepository.rolporId(id);
        res.status(200).send(rol);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

roleController.modificarRol = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const rol = await roleRepository.modificarRol(id, { nombre });
        res.status(200).send(rol);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

roleController.eliminarRol = async (req, res) => {
    const { id } = req.params;
    try {
       rol =  await roleRepository.eliminarRol(id);
       res.status(200).send(rol);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

export default roleController;
