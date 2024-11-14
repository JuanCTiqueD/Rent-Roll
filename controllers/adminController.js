// controllers/adminController.js
const Vehicle = require('../models/vehicleModel');
const Role = require('../models/roleModel');
const Permission = require('../models/permissionModel');
const Feedback = require('../models/feedbackModel');

// Renderizar la vista de administración
exports.renderAdminPage = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    const roles = await Role.findAll();
    const permissions = await Permission.findAll();
    const feedbacks = await Feedback.findAll();

    res.render('admin/admin', {
      vehicles,
      roles,
      permissions,
      feedbacks,
      user: req.session.user, // Para poder mostrar los datos del usuario en la vista si es necesario
    });
  } catch (error) {
    console.error('Error al cargar la página de administración:', error);
    res.status(500).send('Error al cargar la página de administración');
  }
};
