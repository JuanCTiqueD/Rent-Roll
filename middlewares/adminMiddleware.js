// middlewares/authMiddleware.js
exports.ensureAdmin = (req, res, next) => {
    const user = req.session.user;
    if (user && user.id_rol === 1) {
      return next();
    } else {
      // Crear un error personalizado y pasarlo al siguiente middleware (errorHandler)
      const error = new Error('Acceso denegado: Solo los administradores pueden acceder a esta página.');
      error.status = 403;
      return next(error);
    }
  };
  