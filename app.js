// app.js (Modificado)
const express = require('express');
const path = require('path');
const notFoundMiddleware = require('./middlewares/notFoundMiddleware');
const errorHandler = require('./middlewares/errorHandler');
const serverConfig = require('./config/server.config');
const connectToDatabase = require('./utils/database'); 
const session = require('express-session');

const Location = require('./models/locationModel');
const VehicleType = require('./models/vehicleTypeModel');
const Vehicle = require('./models/vehicleModel');

const app = express();
const PORT = serverConfig.port;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'tuSecretoDeSesion',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/authRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

app.use('/auth', authRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/reservations', reservationRoutes);
app.use('/feedback', feedbackRoutes);

// Ruta principal para cargar ubicaciones y tipos de vehículos
app.get('/', async (req, res) => {
  const user = req.session.user || null;

  try {
    // Obtener ubicaciones, tipos de vehículos y todos los vehículos disponibles
    const ubicaciones = await Location.findAll();
    const tiposVehiculo = await VehicleType.findAll();
    const vehicles = await Vehicle.findAll({ where: { disponibilidad: 1 } }); // Solo vehículos disponibles

    res.render('index', { user, ubicaciones, tiposVehiculo, vehicles });
  } catch (error) {
    console.error('Error al obtener ubicaciones o tipos de vehículos:', error);
    res.status(500).send('Error al cargar la página principal');
  }
});

app.use(notFoundMiddleware);
app.use(errorHandler);

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
});
