const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Reservation = sequelize.define('Reservation', {
  id_reserva: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: { // Clave foránea hacia usuarios
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios',
      key: 'id_usuarios'
    },
    allowNull: false
  },
  id_vehiculo: { // Clave foránea hacia vehiculos
    type: DataTypes.INTEGER,
    references: {
      model: 'vehiculos',
      key: 'id_vehiculo'
    },
    allowNull: true
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

module.exports = Reservation;
