const Reservation = require('../models/reservationModel');

// Crear una reserva
exports.createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la reserva' });
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
