import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from '../routes/users.routes.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}));


// Configuración de middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

// Configuración del motor de vistas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Importar rutas
app.use(userRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

export default app;
