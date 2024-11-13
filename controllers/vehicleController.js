const Vehicle = require('../models/vehicleModel');
const Location = require('../models/locationModel');
const VehicleType = require('../models/vehicleTypeModel');

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

// Obtener un vehículo por ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (vehicle) {
      const user = req.session.user || null; // Obtener el usuario de la sesión
      res.render('vehicles/vehicle', { vehiculo: vehicle, user });
    } else {
      res.status(404).json({ error: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el vehículo' });
  }
};

exports.searchVehicles = async (req, res) => {
  try {
    const { lugar, tipo } = req.body; // Obtenemos los filtros desde el formulario de búsqueda

    // Construimos la consulta de búsqueda con los filtros aplicados
    const whereConditions = {};
    if (lugar) {
      whereConditions.id_ubicacion = lugar;
    }
    if (tipo) {
      whereConditions.id_tipo = tipo;
    }

    // Ejecutamos la consulta con las condiciones definidas
    const vehicles = await Vehicle.findAll({
      where: whereConditions,
      include: [
        {
          model: Location,
          attributes: ['nombre_ubicacion'],
        },
        {
          model: VehicleType,
          attributes: ['nombre_tipo'],
        }
      ]
    });

    // Obtenemos los datos de las ubicaciones y tipos de vehículos para mostrarlos en el formulario de búsqueda
    const ubicaciones = await Location.findAll();
    const tiposVehiculo = await VehicleType.findAll();

    // Renderizamos la vista index con los resultados de la búsqueda
    res.render('index', { user: req.session.user || null, vehicles, ubicaciones, tiposVehiculo });
  } catch (error) {
    console.error("Error al buscar vehículos:", error);
    res.status(500).send("Error interno del servidor");
  }
};
