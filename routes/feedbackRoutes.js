// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();

// Ruta para la vista de feedback
router.get('/', (req, res) => {
  res.render('feedback/feedback');
});

module.exports = router;
