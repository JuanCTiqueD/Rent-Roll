// models/permissionModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Permission = sequelize.define('Permission', {
  id_permiso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_permiso: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'permisos',
  timestamps: false,
});

module.exports = Permission;
