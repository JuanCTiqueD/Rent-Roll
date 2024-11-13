// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Ruta para la vista de reservas
router.get('/', (req, res) => {
  res.render('reservations/reservation');
});

router.post('/', reservationController.createReservation);

module.exports = router;
