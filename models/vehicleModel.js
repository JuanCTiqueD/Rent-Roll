const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const VehicleType = require('./vehicleTypeModel');
const Location = require('./locationModel');

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
      model: VehicleType,
      key: 'id_tipo',
    },
    onDelete: 'SET NULL',
  },
  id_ubicacion: {
    type: DataTypes.INTEGER,
    references: {
      model: Location,
      key: 'id_ubicacion',
    },
    onDelete: 'SET NULL',
  },
}, {
  tableName: 'vehiculos',
  timestamps: false,
});

Vehicle.belongsTo(VehicleType, { foreignKey: 'id_tipo' });
Vehicle.belongsTo(Location, { foreignKey: 'id_ubicacion' });

module.exports = Vehicle;
