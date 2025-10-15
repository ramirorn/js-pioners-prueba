import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path'; // Módulo para manejar rutas de archivos
import { fileURLToPath } from 'url'; // Módulo para obtener la ruta del archivo actual

import {connectDB} from './src/config/database.js'; // <-- con .js
import { registerUser, loginUser } from './src/controllers/auth.controllers.js'; // <-- con .js
import { authRouter } from './src/routes/auth.routes.js';
import { indexRouter } from './src/routes/index.js';


// Cargar variables de entorno
dotenv.config();
console.log("Este console log es para jose")
// Conectar a la base de datos
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Workaround para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sirve los archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/auth/register', registerUser)
// --- RUTAS DE LA API (Simplificadas para la prueba) ---
app.use('/api', indexRouter);
app.use('/api/auth', authRouter);
// --- FIN DE RUTAS DE LA API ---

// Ruta principal que sirve el HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));