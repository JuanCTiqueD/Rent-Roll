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

    // Almacena el usuario en la sesión después de una autenticación exitosa
    req.session.user = {
      id: user.id_usuarios,
      nombre: user.nombre,
      rol: user.id_rol
    };

    res.redirect('/'); // Redirige a la página principal
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.redirect('/auth/login?error=Ocurrió un error al iniciar sesión');
  }
};

// Cerrar sesión
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.redirect('/?error=Error al cerrar sesión');
    }
    res.clearCookie('token');
    res.redirect('/');
  });
};
