const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Location = sequelize.define('Location', {
  id_location: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  location_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
}, {
  tableName: 'ubicacion',
  timestamps: false,
});

module.exports = Location;
