import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

export default sequelize;



// //BASE DE DATOS LOCAL PARA HACER PRUEBAS 
// import DBLocal from 'db-local';

// const { Schema } = new DBLocal({ path: './db' });

// const User = Schema('User', {
//     _id: { type: String, required: true },
//     nombre: { type: String, required: true },
//     correo: { type: String, required: true },
//     password: { type: String, required: true },
//     rol_id: { type: String, required: true }
// });

// export { User };
