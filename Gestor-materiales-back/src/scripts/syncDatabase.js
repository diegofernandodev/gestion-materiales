import sequelize from '../config/database.js';
import User from '../models/users.model.js';
import Role from '../models/role.js';
import Material from '../models/material.model.js';
import Entrega from '../models/entrega.model.js';
import crypto from 'crypto';
import roleController from '../controller/role.controller.js';

const generateId = async () => {
  return crypto.randomUUID();
};

const syncDatabase = async (force = falce) => {
  try {
     
     await sequelize.sync({ force }); 
     console.log('Todos los modelos se sincronizaron exitosamente.');
 
     const rolesCount = await Role.count();
     console.log("cantidad de rolesCount",rolesCount);
    if (rolesCount === 0) {
      const adminId = await generateId();
      const repartidorId = await generateId();
      const estudianteId = await generateId();

      await Role.bulkCreate([
        { _id: adminId, nombre: 'administrador' },
        { _id: repartidorId, nombre: 'repartidor' },
        { _id: estudianteId, nombre: 'estudiante' }
      ]);
    }

  } catch (error) {
    console.error('No se puede conectar a la base de datos:', error);
  }
};

export default syncDatabase;