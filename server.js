require('dotenv').config();
const express = require('express');
const path = require('path');
const notFoundMiddleware = require('./middlewares/notFoundMiddleware');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const authRoutes = require('./routes/authRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

app.use('/auth', authRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/reservations', reservationRoutes);
app.use('/feedback', feedbackRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

// Middleware para manejar rutas no encontradas (404)
app.use(notFoundMiddleware);

// Middleware para manejar errores generales
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
