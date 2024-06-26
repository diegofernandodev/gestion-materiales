// import 'dotenv/config';
// import './config/database.js';
// import app from './config/server.js';

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


import 'dotenv/config';
import sequelize from './config/database.js';  
import syncDatabase from './scripts/syncDatabase.js';  
import app from './config/server.js';

const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV === 'development';

const startServer = async () => {
  try {
    
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida exitosamente.');

    
    await syncDatabase(isDevelopment);
    console.log('Base de datos sincronizada exitosamente.');

   
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

startServer();