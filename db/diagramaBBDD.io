// Tabla de roles
Table roles {
  id_rol INT [pk, increment]
  nombre_rol VARCHAR(50)
}

// Tabla de usuarios
Table usuarios {
  id_usuarios INT [pk, increment]
  nombre VARCHAR(50)
  correo VARCHAR(100) [unique]
  contrasena VARCHAR(100)
  fecha_registro DATE [default: `current_timestamp()`]
  id_rol INT
}

// Tabla de vehículos
Table vehiculos {
  id_vehiculo INT [pk, increment]
  marca VARCHAR(50)
  modelo VARCHAR(50)
  anio INT
  precio_dia DECIMAL(10,2)
  disponibilidad TINYINT(1)
  imagen LONGBLOB
}

// Tabla de reservas
Table reservas {
  id_reserva INT [pk, increment]
  id_usuario INT
  id_vehiculo INT
  fecha_inicio DATE
  fecha_fin DATE
  estado VARCHAR(20)
  fecha_creacion DATE [default: `current_timestamp()`]
}

// Tabla de feedback
Table feedback {
  id_feedback INT [pk, increment]
  id_usuario INT
  id_reserva INT
  calificacion INT
  comentario TEXT
  fecha DATE [default: `current_timestamp()`]
}

// Tabla de permisos
Table permisos {
  id_permiso INT [pk, increment]
  nombre_permiso VARCHAR(50)
  descripcion TEXT
}

// Tabla intermedia para la relación muchos a muchos entre roles y permisos
Table roles_permisos {
  id_rol INT
  id_permiso INT
  primary key (id_rol, id_permiso)
}

// Relaciones
Ref: usuarios.id_rol > roles.id_rol
Ref: reservas.id_usuario > usuarios.id_usuarios
Ref: reservas.id_vehiculo > vehiculos.id_vehiculo
Ref: feedback.id_usuario > usuarios.id_usuarios
Ref: feedback.id_reserva > reservas.id_reserva
Ref: roles_permisos.id_rol > roles.id_rol
Ref: roles_permisos.id_permiso > permisos.id_permiso
