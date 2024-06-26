
// import { User } from '../config/database.js';  //Modelo para pruebas
import User from "../models/users.model.js";  //Modelo para conectar a la base de datos 
import Role from '../models/role.js';
import crypto from "crypto";
import bcrypt from "bcrypt"

export class userRepository {
  static async create({ nombre, correo, password, rol_id }) {
    Validation.nombre(nombre)
    Validation.correo(correo)
    Validation.password(password)
    Validation.rol_id(rol_id)

  const existingRole = await Role.findByPk(rol_id);
  if (!existingRole) {
    throw new Error('El rol especificado no existe');
  }

    const existingUser = await User.findOne({ where: {correo} });
    if (existingUser) throw new Error("Correo electronico ya está registrado");

    const id = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(password, 10)
   
    const newUser = User.create({
      _id: id,
      nombre,
      correo,
      password: passwordHash,
      rol_id,
    });
    return id;
  }

  static async login ({ correo, password }) {
    Validation.correo(correo)
    Validation.password(password)

    const user = await User.findOne({ where: {correo} })
    if (!user) throw new Error('El correo ya esta registrado por otro usuario')

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('El password no es valido')

    const { password: _, ...publicUser } = user 

    return publicUser
  }

  static async usuarioId(id) {
    if (typeof id !== "string" || id.trim() === "")
      throw new Error("Id es requerido, y debe ser un string");
    const usuario = await User.findByPk(id);
    if (!usuario) throw new Error("Usuario no encontrado");
    return usuario;
  }

  static async obtenerUsuarios() {
    const usuarios = await User.findAll();
    return usuarios;
  }

  static async modificarUsuario(id, { nombre, correo, password, rol_id }) {
    if (typeof id !== "string" || id.trim() === "") {
      throw new Error("Id es requerido, y debe ser un string");
    }
  
    const usuario = await User.findByPk(id);
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }
  
    if (nombre) {
      if (typeof nombre !== "string" || nombre.trim() === "") {
        throw new Error("Nombre debe ser un string");
      }
      usuario.nombre = nombre;
    }
  
    if (correo) {
      if (typeof correo !== "string" || !correo.includes("@") || correo.length < 7) {
        throw new Error('El correo electrónico debe contener "@" y debe ser mayor a 6 caracteres');
      }
      const usuarioExistente = await User.findOne({ where: { correo } });
      if (usuarioExistente && usuarioExistente._id !== id) {
        throw new Error("El correo ya esta registrado por otro usuario");
      }
      usuario.correo = correo;
    }
  
    if (password) {
      if (typeof password !== "string") {
        throw new Error("Password debe ser un string");
      }
      if (password.length < 6) {
        throw new Error("El password debe tener mínimo 6 caracteres");
      }
      const passwordHash = await bcrypt.hash(password, 10);
      usuario.password = passwordHash;
    }
  
    if (rol_id) {
      if (typeof rol_id !== "string" || rol_id.trim() === "") {
        throw new Error("Id del rol es requerido, y debe ser un string");
      }
      usuario.rol_id = rol_id;
    }
  
    await usuario.save(); 
    return usuario; 
  }
  

  static async eliminarUsuario(id) {
    if (typeof id !== "string" || id.trim() === "") {
      throw new Error("Id es requerido, y debe ser un string");
    }
  
    const usuario = await User.findByPk(id);
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }
  
    await usuario.destroy();
  
    return { message: "Usuario eliminado exitosamente" };
  }
  

}


class Validation {

    static nombre (nombre) {
        if (typeof nombre !== "string")
            throw new Error("nombre debe ser un string");
          if (nombre.length < 4)
            throw new Error("El nombre debe tener minimo 3 caracteres");
    }

    static correo (correo) {
        if (typeof correo !== "string")
            throw new Error("Correo electronico debe ser un string");
        if (!correo.includes("@") || correo.length < 7)
            throw new Error(
              'El correo electrónico debe contener "@" y debe ser mayor a 6 caracteres'
            );
    }
  
    static password (password) {
        if (typeof password !== "string")
            throw new Error("Password debe ser un string");
          if (password.length < 6)
            throw new Error("El password debe tener minimo 6 caracteres");
    }

    static rol_id (rol_id) {
        if (typeof rol_id !== "string" || rol_id.trim() === "")
            throw new Error("Id del rol es requerido, y debe ser un string");
    }
  }