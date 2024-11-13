const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const RolePermission = sequelize.define('RolePermission', {
  id_rol: {
    type: DataTypes.INTEGER,
    references: {
      model: 'roles',
      key: 'id_rol',
    },
  },
  id_permiso: {
    type: DataTypes.INTEGER,
    references: {
      model: 'permisos',
      key: 'id_permiso',
    },
  },
}, {
  tableName: 'roles_permisos',
  timestamps: false,
});

module.exports = RolePermission;
