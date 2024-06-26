import Material from "../models/material.model.js";
import crypto from "crypto";

export class materialRepository {
  static async create({ nombre, descripcion, stock }) {
    Validation.nombre(nombre);
    Validation.stock(stock);

    const id = crypto.randomUUID();
    const newMaterial = await Material.create({
      _id: id,
      nombre,
      descripcion,
      stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return id;
  }

  static async obtenerMateriales() {
    const materiales = await Material.findAll();
    return materiales;
  }

  static async materialId(id) {
    if (typeof id !== "string" || id.trim() === "")
      throw new Error("Id es requerido, y debe ser un string");
    const material = await Material.findByPk(id);
    if (!material) throw new Error("Material no encontrado");
    return material;
  }

  static async modificarMaterial(id, { nombre, descripcion, stock }) {
    if (typeof id !== "string" || id.trim() === "")
      throw new Error("Id es requerido, y debe ser un string");
    const material = await Material.findByPk(id);
    if (!material) throw new Error("Material no encontrado");

    if (nombre) {
      Validation.nombre(nombre);
      material.nombre = nombre;
    }

    if (descripcion) {
      material.descripcion = descripcion;
    }

    if (stock) {
      Validation.stock(stock);
      material.stock = stock;
    }

    material.updatedAt = new Date();
    await material.save();
    return material;
  }

  static async eliminarMaterial(id) {
    if (typeof id !== "string" || id.trim() === "")
      throw new Error("Id es requerido, y debe ser un string");

    const material = await Material.findByPk(id);
    if (!material) throw new Error("Material no encontrado");

    await material.destroy();
    return { message: "Material eliminado exitosamente" };
  }
}

class Validation {
  static nombre(nombre) {
    if (typeof nombre !== "string" || nombre.trim() === "")
      throw new Error("Nombre es requerido, y debe ser un string");
    if (nombre.length < 3)
      throw new Error("El nombre debe tener mínimo 3 caracteres");
  }

  static stock(stock) {
    if (typeof stock !== "number" || stock < 0)
      throw new Error("Stock debe ser un número no negativo");
  }
}
