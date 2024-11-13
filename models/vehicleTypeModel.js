const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const VehicleType = sequelize.define('VehicleType', {
  id_type: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'tipoVehiculo',
  timestamps: false,
});

module.exports = VehicleType;
