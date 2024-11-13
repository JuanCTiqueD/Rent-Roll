const Role = require('../models/roleModel');
const Permission = require('../models/permissionModel');
const RolePermission = require('../models/role_permissionModel');
const User = require('../models/userModel');

// Crear un rol
exports.createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el rol' });
  }
};

// Asignar un rol a un usuario
exports.assignRoleToUser = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    user.id_rol = roleId;
    await user.save();
    res.json({ message: 'Rol asignado al usuario' });
  } catch (error) {
    res.status(500).json({ error: 'Error al asignar el rol al usuario' });
  }
};

// Crear un permiso
exports.createPermission = async (req, res) => {
  try {
    const permission = await Permission.create(req.body);
    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el permiso' });
  }
};

// Asignar permisos a un rol
exports.assignPermissionToRole = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;
    await RolePermission.create({ id_rol: roleId, id_permiso: permissionId });
    res.json({ message: 'Permiso asignado al rol' });
  } catch (error) {
    res.status(500).json({ error: 'Error al asignar el permiso al rol' });
  }
};
