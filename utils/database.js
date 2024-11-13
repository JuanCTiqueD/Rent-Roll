const sequelize = require('../config/db.config'); // Importa la conexión de Sequelize
require('dotenv').config();

async function connectToDatabase() {
  try {
    // Intenta autenticar la conexión con la base de datos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');

    // Sincroniza los modelos con la base de datos, creando las tablas si no existen
    await sequelize.sync(); 
    console.log('Tablas creadas o actualizadas en la base de datos.');

  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

module.exports = connectToDatabase;
