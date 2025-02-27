-- Roles
INSERT INTO roles (nombre_rol) VALUES ('Administrador'), ('Cliente');

-- Administrador
INSERT INTO usuarios (nombre, correo, contrasena, fecha_registro, id_rol)
VALUES ('Admin User', 'admin@rentroll.com', '2b$10$OHuKcCwmV28wlntM.s28PeagyTQRqQ11TBNL4BQDFJmBSoEdbnFk2', CURRENT_DATE, 1);

-- Cliente
INSERT INTO usuarios (nombre, correo, contrasena, fecha_registro, id_rol)
VALUES ('Client User', 'client@rentroll.com', '2b$10$uM1RKdJoA5H.KaWQhtKyUehqRunOKY7JlzRnf8oLr1Lh8gECveLoy', CURRENT_DATE, 2);

-- Vehiculos
INSERT INTO vehiculos (marca, modelo, anio, precio_dia, disponibilidad, imagen)
VALUES 
('Toyota', 'Corolla', 2020, 45.00, 1, NULL),
('Honda', 'Civic', 2021, 50.00, 1, NULL),
('Ford', 'Mustang', 2019, 80.00, 1, NULL),
('Chevrolet', 'Malibu', 2022, 60.00, 1, NULL);

-- Reservas
INSERT INTO reservas (id_usuario, id_vehiculo, fecha_inicio, fecha_fin, estado, fecha_creacion)
VALUES
(2, 1, '2023-11-20', '2023-11-25', 'reservado', CURRENT_DATE),
(2, 2, '2023-12-01', '2023-12-05', 'reservado', CURRENT_DATE);

-- Feedback
INSERT INTO feedback (id_usuario, id_reserva, calificacion, comentario, fecha)
VALUES
(2, 1, 8, 'Buena experiencia de renta, pero el vehículo tenía algunos rayones.', CURRENT_DATE),
(2, 2, 10, 'Excelente servicio y el vehículo estaba en perfectas condiciones.', CURRENT_DATE);

-- Insertar Permisos
INSERT INTO permisos (nombre_permiso, descripcion)
VALUES 
('ver_vehiculos', 'Permite ver la lista de vehículos'),
('crear_vehiculos', 'Permite crear nuevos vehículos'),
('editar_vehiculos', 'Permite editar vehículos existentes'),
('eliminar_vehiculos', 'Permite eliminar vehículos'),
('hacer_reserva', 'Permite hacer una reserva'),
('ver_reservas', 'Permite ver reservas propias'),
('ver_todas_reservas', 'Permite ver todas las reservas'),
('dejar_feedback', 'Permite dejar un feedback');

-- Asignar permisos al Administrador (id_rol = 1)
INSERT INTO roles_permisos (id_rol, id_permiso) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8);

-- Asignar permisos al Cliente (id_rol = 2)
INSERT INTO roles_permisos (id_rol, id_permiso) VALUES
(2, 1), (2, 5), (2, 6), (2, 8);

-- Insertar tipos de vehículos
INSERT INTO tipoVehiculo (nombre_tipo, descripcion) VALUES
('Sedán', 'Vehículo de cuatro puertas ideal para uso urbano'),
('SUV', 'Vehículo deportivo utilitario con mayor espacio y tracción'),
('Camioneta', 'Vehículo de trabajo con caja para carga'),
('Deportivo', 'Vehículo de alto rendimiento y velocidad');

-- Insertar ubicaciones
INSERT INTO ubicacion (nombre_ubicacion, direccion, ciudad, estado) VALUES
('Sucursal Central', 'Avenida Principal 123', 'Ciudad Central', 'Estado 1'),
('Sucursal Norte', 'Calle Norte 456', 'Ciudad Norte', 'Estado 2'),
('Sucursal Sur', 'Carrera Sur 789', 'Ciudad Sur', 'Estado 3');

-- Actualizar vehículos para asignarles tipo, ubicación y una imagen por defecto
UPDATE vehiculos SET 
  id_tipo = 1, 
  id_ubicacion = 1, 
  imagen = 'imagen_base64' 
WHERE id_vehiculo = 1;

UPDATE vehiculos SET 
  id_tipo = 2, 
  id_ubicacion = 2, 
  imagen = 'imagen_base64' 
WHERE id_vehiculo = 2;

UPDATE vehiculos SET 
  id_tipo = 3, 
  id_ubicacion = 3, 
  imagen = 'imagen_base64' 
WHERE id_vehiculo = 3;

UPDATE vehiculos SET 
  id_tipo = 4, 
  id_ubicacion = 1, 
  imagen = 'imagen_base64' 
WHERE id_vehiculo = 4;
