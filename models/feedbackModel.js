const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Feedback = sequelize.define('Feedback', {
  id_feedback: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  calificacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'feedback',
  timestamps: false,
});

module.exports = Feedback;
