const sequelize = require('../config/db.config');
const User = require('./userModel');
const Role = require('./roleModel');
const Permission = require('./permissionModel');
const RolePermission = require('./role_permissionModel');
const Vehicle = require('./vehicleModel');
const Reservation = require('./reservationModel');
const Feedback = require('./feedbackModel');

// Relaciones
User.belongsTo(Role, { foreignKey: 'id_rol', onDelete: 'SET NULL' });
Role.hasMany(User, { foreignKey: 'id_rol' });

Reservation.belongsTo(User, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
User.hasMany(Reservation, { foreignKey: 'id_usuario' });

Reservation.belongsTo(Vehicle, { foreignKey: 'id_vehiculo', onDelete: 'SET NULL' });
Vehicle.hasMany(Reservation, { foreignKey: 'id_vehiculo' });

Feedback.belongsTo(User, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
User.hasMany(Feedback, { foreignKey: 'id_usuario' });

Feedback.belongsTo(Reservation, { foreignKey: 'id_reserva', onDelete: 'CASCADE' });
Reservation.hasMany(Feedback, { foreignKey: 'id_reserva' });

Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'id_rol', onDelete: 'CASCADE' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'id_permiso', onDelete: 'CASCADE' });

module.exports = {
  sequelize,
  User,
  Role,
  Permission,
  RolePermission,
  Vehicle,
  Reservation,
  Feedback,
};
