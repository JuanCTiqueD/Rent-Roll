// TODO: Configuración del servidor (puerto, URL base, etc.)
require('dotenv').config();

const serverConfig = {
  port: process.env.PORT || 3000,
};

module.exports = serverConfig;
