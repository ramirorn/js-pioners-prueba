import User from '../models/user.model.js'; // <-- Fíjate en el .js
import generateToken from '../helpers/jwt.helper.js'; // <-- Fíjate en el .js

// La lógica de las funciones registerUser y loginUser es la misma

const registerUser = async (req, res) => {
    // ... (sin cambios aquí)
    console.log('hola')
    const { username, password } = req.body;
    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        const user = await User.create({ username, password });
        if (user) {
            generateToken(res, user._id);
            res.status(201).json({ _id: user._id, username: user.username, message: 'Usuario registrado con éxito!' });
        } else {
            res.status(400).json({ message: 'Datos de usuario inválidos' });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const loginUser = async (req, res) => {
    // ... (sin cambios aquí)
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id);
            res.status(200).json({ _id: user._id, username: user.username, message: 'Login exitoso!' });
        } else {
            res.status(401).json({ message: 'Usuario o contraseña inválidos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};


// Exportamos las funciones de forma nombrada
export { registerUser, loginUser };