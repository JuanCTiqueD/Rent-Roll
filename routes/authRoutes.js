// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para la vista de login
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Ruta para el manejo de inicio de sesión
router.post('/login', authController.login);

// Ruta para la vista de registro
router.get('/register', (req, res) => {
  res.render('auth/register');
});

// Ruta para manejar el registro
router.post('/register', authController.register);

router.get('/logout', authController.logout);

module.exports = router;
