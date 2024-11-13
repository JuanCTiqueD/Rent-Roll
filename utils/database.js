const sequelize = require('../config/db.config'); // Importa la conexión de Sequelize
const { exec } = require('child_process');
const path = require('path');
require('dotenv').config();

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkDatabaseExists() {
  try {
    // Intenta conectarse a la base de datos sin sincronizar
    await sequelize.authenticate();
    console.log('La base de datos ya existe y la conexión fue exitosa.');
    return true;
  } catch (error) {
    if (error.original && error.original.code === 'ER_BAD_DB_ERROR') {
      console.log('La base de datos no existe.');
      return false;
    } else {
      console.error('Error al verificar la base de datos:', error);
      throw error;
    }
  }
}

async function createDatabase() {
  return new Promise((resolve, reject) => {
    console.log('Creando la base de datos...');

    // Ruta al archivo SQL que contiene el script de creación de la base de datos
    const sqlFilePath = path.resolve(__dirname, '../rent-roll.sql');
    // Ruta completa al ejecutable mysql.exe en XAMPP
    const mysqlPath = "C:\\xampp\\mysql\\bin\\mysql.exe"; // Ajusta esta ruta si es diferente

    // Ejecuta el comando para crear la base de datos usando el archivo SQL
    exec(`"${mysqlPath}" -u ${process.env.DB_USER} -p${process.env.DB_PASSWORD} < "${sqlFilePath}"`, (err, stdout, stderr) => {
      if (err) {
        console.error('Error al crear la base de datos:', stderr);
        reject(err);
      } else {
        console.log('Base de datos creada exitosamente.');
        resolve();
      }
    });
  });
}

async function connectToDatabase() {
  try {
    const dbExists = await checkDatabaseExists();

    if (!dbExists) {
      await createDatabase();
      await delay(2000); // Espera para asegurar que la base de datos esté disponible
    }

    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');

    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync();
    }

  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}


module.exports = connectToDatabase;
