// routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();

// Ruta para la vista del vehículo
router.get('/', (req, res) => {
  res.render('vehicles/vehicle');
});

module.exports = router;
