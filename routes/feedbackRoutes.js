const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const Reservation = require('../models/reservationModel');

// Ruta para la vista de feedback
router.get('/:id_reserva', async (req, res) => {
    const user = req.session.user || null;
    const { id_reserva } = req.params; // Obtiene el id_reserva de los parámetros de la ruta

    try {
        // Busca la reserva correspondiente
        const reserva = await Reservation.findOne({ where: { id_reserva } });

        if (!reserva) {
            return res.status(404).send('Reserva no encontrada');
        }

        // Renderiza la vista pasando user y reserva
        res.render('feedback/feedback', { user, reserva });
    } catch (error) {
        console.error('Error al obtener la reserva:', error);
        res.status(500).send('Error al cargar la página de feedback');
    }
});

// Ruta para enviar el feedback
router.post('/', feedbackController.createFeedback);

module.exports = router;
