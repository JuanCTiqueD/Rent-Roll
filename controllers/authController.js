const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
exports.register = async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const user = await User.create({
      nombre,
      correo,
      contrasena: hashedPassword,
      id_rol: 2,
    });

    res.redirect('/auth/login?success=Usuario registrado exitosamente');
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.redirect('/auth/register?error=Error al registrar el usuario');
  }
};

// Iniciar sesión
exports.login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const user = await User.findOne({ where: { correo } });
    if (!user) {
      return res.redirect('/auth/login?error=Correo o contraseña incorrectos');
    }

    const passwordMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!passwordMatch) {
      return res.redirect('/auth/login?error=Correo o contraseña incorrectos');
    }

    // Genera el token después de verificar el usuario y la contraseña
    const token = jwt.sign({ id: user.id_usuarios, rol: user.id_rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Guarda el token en una cookie o envíalo en la respuesta
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/auth/register?success=Inicio de sesión exitoso');
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.redirect('/auth/login?error=Ocurrió un error al iniciar sesión');
  }
};
