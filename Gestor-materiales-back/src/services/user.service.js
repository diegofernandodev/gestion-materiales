
import { User } from '../config/database.js';
// import User from "../models/users.model.js";  //Modelo para conectar a la base de datos 
import crypto from "crypto";
import bcrypt from "bcrypt"

export class userRepository {
  static async create({ nombre, correo, password }) {
    Validation.nombre(nombre)
    Validation.correo(correo)
    Validation.password(password)
    // Validation.rol_id(rol_id)

    const existingUser = User.findOne({ correo });
    if (existingUser) throw new Error("Correo electronico ya está registrado");

    const id = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(password, 10)
    const rolPrueba = "admin"
    const newUser = User.create({
      _id: id,
      nombre,
      correo,
      password: passwordHash,
      rol_id: rolPrueba,
    });
    
    newUser.save();
    return id;
  }

  static async login ({ correo, password }) {
    Validation.correo(correo)
    Validation.password(password)

    const user = await User.findOne({ correo })
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
    if (!user) throw new Error("Usuario no encontrado");
    return usuario;
  }

  static async obtenerUsuarios() {
    const usuarios = await User.findAll();
    return usuarios;
  }

  static async modificarUsuario(id, { nombre, correo, password, rol_id }) {
    if (typeof id !== "string" || id.trim() === "")
      throw new Error("Id es requerido, y debe ser un string");
    const usuario = await User.findByPk(id);
    if (!user) throw new Error("Usuario no encontrado");
    if (nombre) {
      if (typeof nombre !== "string" || nombre.trim() === "")
        throw new Error("Correo nombre debe ser un string");
      usuario.nombre = nombre;
    }

    if (correo) {
      if (
        typeof correo !== "string" ||
        !correo.includes("@") ||
        correo.length < 7
      )
        throw new Error(
          'El correo electrónico debe contener "@" y debe ser mayor a 6 caracteres'
        );
      const usuarioExistente = await User.findOne({ where: { correo } });
      if (usuarioExistente && usuarioExistente.id !== id)
        throw new Error("El correo ya esta registrado por otro usuario");
      usuarioExistente.correo = correo;
    }

    if (password) {
      if (typeof password !== "string")
        throw new Error("Password debe ser un string");
      if (password.length < 6)
        throw new Error("El password debe tener minimo 6 caracteres");
      usuarioExistente.password = password;
    }

    if (rol_id) {
      if (typeof rol_id !== "string" || id.trim() === "")
        throw new Error("Id del rol es requerido, y debe ser un string");
      usuarioExistente.rol_id = rol_id;
    }
  }

  static async eliminarUsuario(id){
    if (typeof id !== "string" || id.trim() === "")
        throw new Error("Id es requerido, y debe ser un string");

    const usuario = await User.findByPk(id)
    if(!usuario) throw new Error("Usuario no encontrado")

    await usuario.destroy()

    return { message: "Usuario eliminado exitosamente"}
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