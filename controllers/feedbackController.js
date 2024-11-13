const Feedback = require('../models/feedbackModel');

// Crear un feedback
exports.createFeedback = async (req, res) => {
  try {
    const { comentario, calificacion, id_usuario, id_reserva } = req.body;

    // Crear el feedback en la base de datos
    await Feedback.create({
      comentario,
      calificacion,
      id_usuario,
      id_reserva
    });

    // Redirigir a la página de inicio después de enviar el feedback
    res.status(201).redirect('/');
  } catch (error) {
    console.error('Error al crear el feedback:', error);
    res.status(500).json({ error: 'Error al crear el feedback' });
  }
};
