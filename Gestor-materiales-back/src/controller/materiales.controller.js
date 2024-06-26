import { materialRepository } from '../services/material.service.js';

const materialesController = {};

materialesController.createMaterial = async (req, res) => {
    const { nombre, descripcion, stock } = req.body;
    try {
        const id = await materialRepository.create({ nombre, descripcion, stock });
        res.send({ id });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

materialesController.obtenerMateriales = async (req, res) => {
    try {
        const materiales = await materialRepository.obtenerMateriales();
        res.send(materiales);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

materialesController.obtenerMaterialPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const material = await materialRepository.materialId(id);
        res.send(material);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

materialesController.modificarMaterial = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, stock } = req.body;
    try {
        const material = await materialRepository.modificarMaterial(id, { nombre, descripcion, stock });
        res.send(material);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

materialesController.eliminarMaterial = async (req, res) => {
    const { id } = req.params;
    try {
       material =  await materialRepository.eliminarMaterial(id);
        res.status(200).send(material);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default materialesController;
