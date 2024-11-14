// feedbackModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./userModel'); // Importa el modelo User

const Feedback = sequelize.define('Feedback', {
  id_feedback: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  calificacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios',
      key: 'id_usuarios',
    },
  },
  id_reserva: {
    type: DataTypes.INTEGER,
    references: {
      model: 'reservas',
      key: 'id_reserva',
    },
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'feedback',
  timestamps: false,
});

// Define la asociación con User
Feedback.belongsTo(User, { foreignKey: 'id_usuario', as: 'Usuario' });

module.exports = Feedback;
