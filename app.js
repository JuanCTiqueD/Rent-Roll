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
const Reservation = require('./models/reservationModel');
const adminRoutes = require('./routes/adminRoutes');

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
app.use('/admin', adminRoutes);

// Ruta principal para cargar ubicaciones, tipos de vehículos, vehículos disponibles y reservas del usuario
app.get('/', async (req, res) => {
  const user = req.session.user || null;

  try {
    console.log("Obteniendo ubicaciones y tipos de vehículos...");
    const ubicaciones = await Location.findAll();
    const tiposVehiculo = await VehicleType.findAll();
    
    console.log("Obteniendo vehículos disponibles...");
    const vehicles = await Vehicle.findAll({ where: { disponibilidad: 1 } });
    console.log("Vehículos disponibles obtenidos");

    let userReservations = [];
    if (user && user.id_usuario) { // Asegúrate de que haya un usuario en sesión
      console.log(`Obteniendo reservas para el usuario con ID: ${user.id_usuario}`);
      
      userReservations = await Reservation.findAll({
        where: { id_usuario: user.id_usuario },
        include: [
          {
            model: Vehicle,
            attributes: ['marca', 'modelo', 'anio', 'precio_dia', 'imagen', 'id_vehiculo'],
          },
        ],
      });
      console.log("Reservas del usuario obtenidas:", userReservations.length);
    } else {
      console.log("No hay usuario en sesión.");
    }

    res.render('index', { user, ubicaciones, tiposVehiculo, vehicles, reservations: userReservations });
  } catch (error) {
    console.error('Error al obtener ubicaciones, tipos de vehículos o reservas:', error);
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
