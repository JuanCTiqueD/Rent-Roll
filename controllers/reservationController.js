const Reservation = require('../models/reservationModel');
const Vehicle = require('../models/vehicleModel');
const User = require('../models/userModel');

// Crear una reserva
exports.createReservation = async (req, res) => {
  const { id_usuario, id_vehiculo, fecha_inicio, fecha_fin, estado } = req.body;

  if (!id_usuario) {
    console.error('Invalid id_usuario');
    return res.redirect(`/vehicles/vehicle/${id_vehiculo}?error=Usuario no especificado para la reserva`);
  }

  console.log('Reservation id_usuario: ' + id_usuario);

  try {
    // Verificar si el usuario existe
    const user = await User.findByPk(id_usuario);
    if (!user) {
      return res.redirect(`/vehicles/vehicle/${id_vehiculo}?error=Usuario no válido para la reserva`);
    }

    // Verificar si el vehículo está disponible
    const vehicle = await Vehicle.findByPk(id_vehiculo);
    if (!vehicle || !vehicle.disponibilidad) {
      return res.redirect(`/vehicles/vehicle/${id_vehiculo}?error=El vehículo no está disponible para reserva`);
    }

    // Crear la reserva
    await Reservation.create({
      id_usuario,  // asegúrate de incluir id_usuario aquí
      id_vehiculo,
      fecha_inicio,
      fecha_fin,
      estado,
      fecha_creacion: new Date()
    });

    // Marcar el vehículo como no disponible
    await Vehicle.update({ disponibilidad: false }, { where: { id_vehiculo } });

    res.redirect(`/vehicles/vehicle/${id_vehiculo}?success=Reserva creada exitosamente`);
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    res.redirect(`/vehicles/vehicle/${id_vehiculo || ''}?error=Hubo un problema al crear la reserva`);
  }
};

// Obtener todas las reservas
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reservas' });
  }
};

// Actualizar el estado de una reserva (solo administrador)
exports.updateReservation = async (req, res) => {
  try {
    const [updated] = await Reservation.update(req.body, { where: { id_reserva: req.params.id } });
    if (updated) {
      const updatedReservation = await Reservation.findByPk(req.params.id);
      res.json(updatedReservation);
    } else {
      res.status(404).json({ error: 'Reserva no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la reserva' });
  }
};
