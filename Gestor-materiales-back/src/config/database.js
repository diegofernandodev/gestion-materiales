// // config/database.js
// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql',
// });

// import User from '../models/User.js';
// import Role from '../models/role.js';

// const syncDatabase = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');

//     // Sincronizar los modelos
//     await sequelize.sync({ force: true }); // Esto eliminará y recreará las tablas, usar solo en desarrollo
//     console.log('All models were synchronized successfully.');

//     // Crear roles predeterminados
//     await Role.bulkCreate([
//       { nombre: 'administrador' },
//       { nombre: 'repartidor' },
//       { nombre: 'estudiante' }
//     ]);

//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// };

// syncDatabase();

// export default sequelize;


//BASE DE DATOS LOCAL PARA HACER PRUEBAS 
import DBLocal from 'db-local';

const { Schema } = new DBLocal({ path: './db' });

const User = Schema('User', {
    _id: { type: String, required: true },
    nombre: { type: String, required: true },
    correo: { type: String, required: true },
    password: { type: String, required: true },
    rol_id: { type: String, required: true }
});

export { User };
