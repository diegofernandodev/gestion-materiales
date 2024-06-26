import { entregaRepository } from '../services/entrega.service.js';

const entregasController = {};

entregasController.createEntrega = async (req, res) => {
    const { usuario_id, material_id, fecha_entrega, cantidad } = req.body;
    try {
        const id = await entregaRepository.create({ usuario_id, material_id, fecha_entrega, cantidad });
        res.send({ id });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

entregasController.obtenerEntregas = async (req, res) => {
    try {
        const entregas = await entregaRepository.obtenerEntregas();
        res.send(entregas);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

entregasController.obtenerEntregaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const entrega = await entregaRepository.entregaId(id);
        res.send(entrega);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

entregasController.modificarEntrega = async (req, res) => {
    const { id } = req.params;
    const { usuario_id, material_id, fecha_entrega, cantidad } = req.body;
    try {
        const entrega = await entregaRepository.modificarEntrega(id, { usuario_id, material_id, fecha_entrega, cantidad });
        res.send(entrega);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

entregasController.eliminarEntrega = async (req, res) => {
    const { id } = req.params;
    try {
       entrega =  await entregaRepository.eliminarEntrega(id);
        res.status(200).send(entrega);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default entregasController;
