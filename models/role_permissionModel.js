// models/role_permissionModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Role = require('./roleModel');
const Permission = require('./permissionModel');

const RolePermission = sequelize.define('RolePermission', {
  id_rol: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id_rol',
    },
    primaryKey: true,
  },
  id_permiso: {
    type: DataTypes.INTEGER,
    references: {
      model: Permission,
      key: 'id_permiso',
    },
    primaryKey: true,
  },
}, {
  tableName: 'roles_permisos',
  timestamps: false,
});

module.exports = RolePermission;
