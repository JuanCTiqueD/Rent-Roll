const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Role = require('../models/roleModel');
const Permission = require('../models/permissionModel');
const RolePermission = require('../models/role_permissionModel');

// Middleware para verificar el token JWT y extraer el rol del usuario
exports.verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.rol;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};


// Middleware para verificar permisos
exports.checkPermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      const user = await User.findByPk(req.userId, { include: Role });
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

      const rolePermissions = await RolePermission.findAll({
        where: { id_rol: user.id_rol },
        include: { model: Permission, where: { nombre_permiso: permissionName } },
      });

      if (rolePermissions.length > 0) {
        next(); // El usuario tiene el permiso
      } else {
        res.status(403).json({ error: 'No tienes permisos para realizar esta acción' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al verificar los permisos' });
    }
  };
};

// middlewares/authMiddleware.js
exports.ensureAdmin = (req, res, next) => {
  const user = req.session.user;
  console.log("Usuario actual:", user); // Log para verificar el usuario
  if (user && user.id_rol === 1) {
      return next();
  } else {
      const error = new Error('Acceso denegado: Solo los administradores pueden acceder a esta página.');
      error.status = 403;
      return next(error);
  }
};

