const Feedback = require('../models/feedbackModel');

// Crear un feedback
exports.createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el feedback' });
  }
};

// Obtener todos los feedbacks
exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los feedbacks' });
  }
};
