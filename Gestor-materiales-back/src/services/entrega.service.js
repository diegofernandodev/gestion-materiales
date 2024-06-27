import Entrega from "../models/entrega.model.js";
import crypto from "crypto";

export class entregaRepository {
  static async create({ usuario_id, material_id, fecha_entrega, cantidad }) {
    Validation.usuario_id(usuario_id);
    Validation.material_id(material_id);
    Validation.fecha_entrega(fecha_entrega);
    Validation.cantidad(cantidad);

    const id = crypto.randomUUID();
    const newEntrega = await Entrega.create({
      id,
      usuario_id,
      material_id,
      fecha_entrega,
      cantidad,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newEntrega.save();
    return id;
  }

  static async obtenerEntregas() {
    const entregas = await Entrega.findAll();
    return entregas;
  }

  static async entregaId(id) {
    if (typeof id !== "string" || id.trim() === "")
      throw new Error("Id es requerido, y debe ser un string");
    const entrega = await Entrega.findByPk(id);
    if (!entrega) throw new Error("Entrega no encontrada");
    return entrega;
  }

  static async modificarEntrega(id, { usuario_id, material_id, fecha_entrega, cantidad }) {
    if (typeof id !== "string" || id.trim() === "")
      throw new Error("Id es requerido, y debe ser un string");
    const entrega = await Entrega.findByPk(id);
    if (!entrega) throw new Error("Entrega no encontrada");

    if (usuario_id) {
      Validation.usuario_id(usuario_id);
      entrega.usuario_id = usuario_id;
    }

    if (material_id) {
      Validation.material_id(material_id);
      entrega.material_id = material_id;
    }

    if (fecha_entrega) {
      Validation.fecha_entrega(fecha_entrega);
      entrega.fecha_entrega = fecha_entrega;
    }

    if (cantidad) {
      Validation.cantidad(cantidad);
      entrega.cantidad = cantidad;
    }

    entrega.updatedAt = new Date();
    await entrega.save();
    return entrega;
  }

  static async eliminarEntrega(id) {
    if (typeof id !== "string" || id.trim() === "")
      throw new Error("Id es requerido, y debe ser un string");

    const entrega = await Entrega.findByPk(id);
    if (!entrega) throw new Error("Entrega no encontrada");

    await entrega.destroy();
    return { message: "Entrega eliminada exitosamente" };
  }

  static async obtenerEntregasParaAdministrador() {
    // Consulta para obtener entregas detalladas para administradores
    const entregasDetalladas = await Entrega.findAll({
      include: [
        { model: Usuario, as: 'usuario' },
        { model: Material, as: 'material' }
      ]
    });
    return entregasDetalladas;
  }

  static async obtenerEntregasParaRepartidor(repartidorId) {
    const entregasPendientes = await Entrega.findAll({
        where: { repartidor_id: repartidorId, estado: 'pendiente' },
        include: [
            {
                model: User,
                as: 'usuario',
                attributes: ['nombre'], 
            },
            {
                model: Material,
                as: 'material',
                attributes: ['nombre', 'descripcion'], 
            }
        ]
    });
    return entregasPendientes;
}


//   static async obtenerEntregasParaAdministrador() {
//     const entregasDetalladas = await Entrega.findAll({
//         include: [
//             {
//                 model: Usuario,
//                 as: 'usuario',
//                 attributes: ['nombre'], 
//             },
//             {
//                 model: Material,
//                 as: 'material',
//                 attributes: ['nombre', 'descripcion'], 
//             }
//         ]
//     });
//     return entregasDetalladas;
// }

static async obtenerEntregasEstudiante(estudianteId) {
  const entregasRecibidas = await Entrega.findAll({
    where: { usuario_id: estudianteId },
    include: [
      {
        model: User,
        as: 'usuario',
        attributes: ['nombre']
      },
      {
        model: Material,
        as: 'material',
        attributes: ['nombre', 'descripcion']
      }
    ]
  });
  return entregasRecibidas;
}

  
}

class Validation {
  static usuario_id(usuario_id) {
    if (typeof usuario_id !== "string" || usuario_id.trim() === "")
      throw new Error("Usuario ID es requerido, y debe ser un string");
  }

  static material_id(material_id) {
    if (typeof material_id !== "string" || material_id.trim() === "")
      throw new Error("Material ID es requerido, y debe ser un string");
  }

  static fecha_entrega(fecha_entrega) {
    if (!fecha_entrega || isNaN(new Date(fecha_entrega)))
      throw new Error("Fecha de entrega es requerida y debe ser una fecha válida");
  }

  static cantidad(cantidad) {
    if (typeof cantidad !== "number" || cantidad <= 0)
      throw new Error("Cantidad debe ser un número positivo");
  }
}
