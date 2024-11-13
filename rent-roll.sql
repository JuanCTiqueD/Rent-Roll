CREATE DATABASE IF NOT EXISTS rent_roll;
USE rent_roll;

-- Tabla de roles
CREATE TABLE IF NOT EXISTS roles (
  id_rol INT PRIMARY KEY AUTO_INCREMENT,
  nombre_rol VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id_usuarios INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  contrasena VARCHAR(100) NOT NULL,
  fecha_registro DATE NOT NULL DEFAULT current_timestamp(),
  id_rol INT,
  FOREIGN KEY (id_rol) REFERENCES roles(id_rol) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Tabla de vehículos
CREATE TABLE IF NOT EXISTS vehiculos (
  id_vehiculo INT PRIMARY KEY AUTO_INCREMENT,
  marca VARCHAR(50) NOT NULL,
  modelo VARCHAR(50) NOT NULL,
  anio INT NOT NULL,
  precio_dia DECIMAL(10,2) NOT NULL,
  disponibilidad TINYINT(1) NOT NULL,
  imagen LONGBLOB NOT NULL
) ENGINE=InnoDB;

-- Tabla de reservas
CREATE TABLE IF NOT EXISTS reservas (
  id_reserva INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  id_vehiculo INT,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  estado VARCHAR(20) NOT NULL,
  fecha_creacion DATE NOT NULL DEFAULT current_timestamp(),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuarios) ON DELETE CASCADE,
  FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id_vehiculo) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Tabla de feedback
CREATE TABLE IF NOT EXISTS feedback (
  id_feedback INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  id_reserva INT NOT NULL,
  calificacion INT NOT NULL,
  comentario TEXT NOT NULL,
  fecha DATE NOT NULL DEFAULT current_timestamp(),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuarios) ON DELETE CASCADE,
  FOREIGN KEY (id_reserva) REFERENCES reservas(id_reserva) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tabla de permisos
CREATE TABLE IF NOT EXISTS permisos (
  id_permiso INT PRIMARY KEY AUTO_INCREMENT,
  nombre_permiso VARCHAR(50) NOT NULL,
  descripcion TEXT
) ENGINE=InnoDB;

-- Tabla intermedia para la relación muchos a muchos entre roles y permisos
CREATE TABLE IF NOT EXISTS roles_permisos (
  id_rol INT,
  id_permiso INT,
  PRIMARY KEY (id_rol, id_permiso),
  FOREIGN KEY (id_rol) REFERENCES roles(id_rol) ON DELETE CASCADE,
  FOREIGN KEY (id_permiso) REFERENCES permisos(id_permiso) ON DELETE CASCADE
) ENGINE=InnoDB;
