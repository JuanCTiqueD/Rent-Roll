// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Ruta para la vista de login
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Ruta para la vista de registro
router.get('/register', (req, res) => {
  res.render('auth/register');
});

module.exports = router;
