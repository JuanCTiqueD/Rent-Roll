// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();

// Ruta para la vista de reservas
router.get('/', (req, res) => {
  res.render('reservations/reservation');
});

module.exports = router;
