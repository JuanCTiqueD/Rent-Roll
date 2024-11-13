// server.js
const express = require('express');
const path = require('path');
const notFoundMiddleware = require('./middlewares/notFoundMiddleware');
const errorHandler = require('./middlewares/errorHandler');
const serverConfig = require('./config/server.config');
const connectToDatabase = require('./utils/database'); // Importa la función de conexión a la base de datos
const session = require('express-session');

const app = express();
const PORT = serverConfig.port;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'tuSecretoDeSesion',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Cambia a true si usas HTTPS
}));


// Middleware para analizar datos en JSON
app.use(express.json());

// Middleware para analizar datos en x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/authRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

app.use('/auth', authRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/reservations', reservationRoutes);
app.use('/feedback', feedbackRoutes);

// Configura la ruta principal para usar el controlador de vehículos
app.get('/', async (req, res) => {
  const user = req.session.user || null; // Obtén el usuario desde la sesión
  res.render('index', { user });
});

app.use(notFoundMiddleware);
app.use(errorHandler);

// Conectar a la base de datos y luego iniciar el servidor
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
});
