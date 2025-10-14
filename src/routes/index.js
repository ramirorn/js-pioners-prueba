import express from 'express';
export const indexRouter = express.Router();

// Ruta de prueba para verificar que el servidor esté vivo
indexRouter.get('/', (req, res) => {
    res.status(200).json({ 
        message: '¡API de JS PIONEERS está funcionando!',
        status: 'OK'
    });
});

