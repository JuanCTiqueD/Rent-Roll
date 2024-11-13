const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Role = require('./roleModel');

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
      model: Role,
      key: 'id_rol',
    },
    onDelete: 'SET NULL',
  },
}, {
  tableName: 'usuarios',
  timestamps: false,
});

User.belongsTo(Role, { foreignKey: 'id_rol' });
Role.hasMany(User, { foreignKey: 'id_rol' });

module.exports = User;
