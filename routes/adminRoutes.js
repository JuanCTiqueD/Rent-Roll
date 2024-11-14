// adminRoutes.js
const express = require('express');
const router = express.Router();
const { ensureAdmin } = require('../middlewares/authMiddleware');
const Vehicle = require('../models/vehicleModel');
const Role = require('../models/roleModel');
const Permission = require('../models/permissionModel');
const Feedback = require('../models/feedbackModel');
const Reservation = require('../models/reservationModel');
const User = require('../models/userModel');

router.get('/', ensureAdmin, async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    const roles = await Role.findAll();
    const permissions = await Permission.findAll();
    const feedbacks = await Feedback.findAll({
      include: [{ model: User, as: 'Usuario', attributes: ['nombre'] }]
    });
    const reservations = await Reservation.findAll({
      include: [
        { model: Vehicle, attributes: ['modelo', 'precio_dia'] },
        { model: User, attributes: ['nombre'] }
      ]
    });

    res.render('admin/admin', {
      vehicles,
      roles,
      permissions,
      feedbacks,
      reservations
    });
  } catch (error) {
    console.error('Error al cargar el panel de administración:', error);
    res.status(500).render('error', {
      statusCode: 500,
      message: 'Error al cargar el panel de administración'
    });
  }
});

module.exports = router;
