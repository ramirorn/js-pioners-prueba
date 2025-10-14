import express from 'express';
// Importamos las funciones del controlador. ¡Recuerda la extensión .js!
import { registerUser, loginUser } from '../controllers/auth.controllers.js'; 

export const authRouter = express.Router();

// Definimos los endpoints para el registro y login
authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
