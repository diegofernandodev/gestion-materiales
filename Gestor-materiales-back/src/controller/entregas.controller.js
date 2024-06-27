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

// entregasController.obtenerEntregasParaAdministrador = async (req, res) => {
//     try {
//         const entregasDetalladas = await entregaRepository.obtenerEntregasParaAdministrador()
//         res.status(200).json(entregasDetalladas);
//       } catch (error) {
//         res.status(500).json({ error: 'Error al obtener las entregas para el administrador' });
//       }
// }

// entregasController.obtenerEntregasParaRepartidor = async (req, res) =>{
//     const repartidorId = req.user._id; 
//     try {
//       const entregasPendientes = await entregaRepository.obtenerEntregasParaRepartidor(repartidorId)
//       res.status(200).json(entregasPendientes);
//     } catch (error) {
//       res.status(500).json({ error: 'Error al obtener las entregas para el repartidor' });
//     }
// }

// entregasController.obtenerEntregasParaEstudiante = async (req, res) => {
//     const estudianteId = req.user._id; 
//     try {
//       const entregasRecibidas = await entregaRepository.obtenerEntregasEstudiante(estudianteId)
//       res.status(200).json(entregasRecibidas);
//     } catch (error) {
//       res.status(500).json({ error: 'Error al obtener las entregas para el estudiante' });
//     }
//   }

  entregasController.obtenerEntregasRol = async (req, res) => {
    try {
      const { rol_nombre, _id } = req.user;

      let entregas;
      if (rol_nombre === 'administrador') {
        entregas = await EntregaService.obtenerEntregasParaAdministrador();
      } else if (rol_nombre === 'repartidor') {
        entregas = await EntregaService.obtenerEntregasParaRepartidor(_id);
      } else if (rol_nombre === 'estudiante') {
        entregas = await EntregaService.obtenerEntregasParaEstudiante(_id);
      } else {
        return res.status(403).json({ error: 'Rol no permitido' });
      }

      return res.status(200).json(entregas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al obtener entregas' });
    }
  }


export default entregasController;
