import Role from '../models/role.js';

export class roleRepository {
  static async create({ nombre }) {
    if (typeof nombre !== 'string' || nombre.trim() === "") {
      throw new Error('Nombre del rol debe ser un string y no puede estar vacío');
    }

    const existingRole = await Role.findOne({ where: { nombre } });
    if (existingRole) throw new Error('El rol ya existe');

    const newRole = await Role.create({ nombre });
    return newRole;
  }

  static async findAll() {
    return await Role.findAll();
  }

  static async findById(id) {
    if (typeof id !== "number" || id <= 0) {
      throw new Error('Id del rol debe ser un número positivo');
    }

    const role = await Role.findByPk(id);
    if (!role) throw new Error('Rol no encontrado');
    return role;
  }

  static async update(id, { nombre }) {
    if (typeof id !== "number" || id <= 0) {
      throw new Error('Id del rol debe ser un número positivo');
    }

    const role = await Role.findByPk(id);
    if (!role) throw new Error('Rol no encontrado');

    if (nombre) {
      if (typeof nombre !== 'string' || nombre.trim() === "") {
        throw new Error('Nombre del rol debe ser un string y no puede estar vacío');
      }

      const existingRole = await Role.findOne({ where: { nombre } });
      if (existingRole && existingRole.id !== id) {
        throw new Error('El nombre del rol ya está registrado');
      }

      role.nombre = nombre;
    }

    await role.save();
    return role;
  }

  static async delete(id) {
    if (typeof id !== "number" || id <= 0) {
      throw new Error('Id del rol debe ser un número positivo');
    }

    const role = await Role.findByPk(id);
    if (!role) throw new Error('Rol no encontrado');

    await role.destroy();
    return { message: 'Rol eliminado exitosamente' };
  }
}
