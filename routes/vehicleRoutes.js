const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Ruta para obtener todos los vehículos
router.get('/', vehicleController.getVehicles);

// Ruta para ver el detalle de un vehículo por ID
router.get('/vehicle/:id', vehicleController.getVehicleById);

// Ruta para buscar vehículos
router.post('/busqueda', vehicleController.searchVehicles);

module.exports = router;
