const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const VehicleType = sequelize.define('VehicleType', {
  id_tipo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_tipo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'tipoVehiculo',
  timestamps: false,
});

module.exports = VehicleType;
