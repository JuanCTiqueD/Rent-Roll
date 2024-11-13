const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Vehicle = sequelize.define('Vehicle', {
  id_vehiculo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  marca: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  modelo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio_dia: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  disponibilidad: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.BLOB('long'),
    allowNull: false,
  },
  id_tipo: {
    type: DataTypes.INTEGER,
    references: {
      model: 'TipoVehiculo',
      key: 'id_tipo',
    },
  },
  id_ubicacion: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Ubicacion',
      key: 'id_ubicacion',
    },
  },
}, {
  tableName: 'vehiculos',
  timestamps: false,
});

module.exports = Vehicle;
