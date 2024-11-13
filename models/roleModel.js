const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Role = sequelize.define('Role', {
  id_rol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_rol: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'roles',
  timestamps: false,
});

module.exports = Role;
