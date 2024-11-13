const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./userModel');
const Vehicle = require('./vehicleModel');

const Reservation = sequelize.define('Reservation', {
  id_reserva: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id_usuarios',
    },
    onDelete: 'CASCADE',
  },
  id_vehiculo: {
    type: DataTypes.INTEGER,
    references: {
      model: Vehicle,
      key: 'id_vehiculo',
    },
    onDelete: 'SET NULL',
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'reservas',
  timestamps: false,
});

Reservation.belongsTo(User, { foreignKey: 'id_usuario' });
Reservation.belongsTo(Vehicle, { foreignKey: 'id_vehiculo' });

module.exports = Reservation;
