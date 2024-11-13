const Vehicle = require('../models/vehicleModel');

// Obtener todos los vehículos
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los vehículos' });
  }
};

// Crear un vehículo (solo administrador)
exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el vehículo' });
  }
};

// Actualizar un vehículo (solo administrador)
exports.updateVehicle = async (req, res) => {
  try {
    const [updated] = await Vehicle.update(req.body, { where: { id_vehiculo: req.params.id } });
    if (updated) {
      const updatedVehicle = await Vehicle.findByPk(req.params.id);
      res.json(updatedVehicle);
    } else {
      res.status(404).json({ error: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el vehículo' });
  }
};

// Eliminar un vehículo (solo administrador)
exports.deleteVehicle = async (req, res) => {
  try {
    const deleted = await Vehicle.destroy({ where: { id_vehiculo: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el vehículo' });
  }
};
