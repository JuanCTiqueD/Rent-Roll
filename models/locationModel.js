const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Location = sequelize.define('Location', {
  id_ubicacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_ubicacion: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING(100),
  },
  ciudad: {
    type: DataTypes.STRING(50),
  },
  estado: {
    type: DataTypes.STRING(50),
  },
}, {
  tableName: 'ubicacion',
  timestamps: false,
});

module.exports = Location;
