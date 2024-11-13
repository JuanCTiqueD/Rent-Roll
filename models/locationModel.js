// locationModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Location = sequelize.define('Location', {
  id_ubicacion: {  // Cambiado para que coincida con la base de datos
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_ubicacion: {  // Para coincidir con la base de datos
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  ciudad: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
}, {
  tableName: 'ubicacion',
  timestamps: false,
});

module.exports = Location;
