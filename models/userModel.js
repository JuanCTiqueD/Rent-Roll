const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('User', {
  id_usuarios: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  contrasena: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  id_rol: {
    type: DataTypes.INTEGER,
    references: {
      model: 'roles',
      key: 'id_rol',
    },
    allowNull: true,
  },
}, {
  tableName: 'usuarios',
  timestamps: false,
});

module.exports = User;
