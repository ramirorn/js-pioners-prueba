import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  // La lógica interna de la función es la misma
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;