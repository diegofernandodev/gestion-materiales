import Role from '../models/role.js';
import crypto from 'crypto';

export class roleRepository {
  static async create({ nombre }) {
    if (typeof nombre !== 'string' || nombre.trim() === '') {
      throw new Error('Nombre del rol debe ser un string y no puede estar vacío');
    }

    const existingRole = await Role.findOne({ where: { nombre } });
    if (existingRole) throw new Error('El rol ya existe');

    const id = crypto.randomUUID();
    const newRole = await Role.create({ nombre, _id: id });
    return newRole;
  }

  static async obtenerRoles() {
    const roles = await Role.findAll();
    return roles;
  }

  static async rolporId(id) {
    if (typeof id !== 'string' || id.trim() === '') {
      throw new Error('Id es requerido, y debe ser un string');
    }
    const rol = await Role.findByPk(id);
    if (!rol) throw new Error('Rol no encontrado');
    return rol;
  }

  static async modificarRol(id, { nombre }) {
    if (typeof id !== 'string' || id.trim() === '') {
      throw new Error('Id es requerido y debe ser un string');
    }

    const role = await Role.findByPk(id);
    if (!role) throw new Error('Rol no encontrado');

    if (nombre) {
      if (typeof nombre !== 'string' || nombre.trim() === '') {
        throw new Error('Nombre del rol debe ser un string y no puede estar vacío');
      }

      const existingRole = await Role.findOne({ where: { nombre } });
      if (existingRole && existingRole._id !== id) {
        throw new Error('El nombre del rol ya está registrado');
      }

      role.nombre = nombre;
    }

    await role.save();
    return role;
  }

  static async eliminarRol(id) {
    if (typeof id !== 'string' || id.trim() === '') {
      throw new Error('Id es requerido, y debe ser un string');
    }

    const rol = await Role.findByPk(id);
    if (!rol) throw new Error('Rol no encontrado');

    await rol.destroy();

    return { message: 'Rol eliminado exitosamente' };
  }
}
