# Rent&Roll

Rent&Roll es una aplicación de alquiler de vehículos diseñada para gestionar el registro de usuarios, la administración de vehículos, la reserva de vehículos y el feedback de los usuarios. Está construida en Node.js con Express y EJS como motor de plantillas para el frontend. A continuación, se detalla cada carpeta y archivo para explicar cómo está organizada la arquitectura del proyecto.

## Estructura de Carpetas y Descripción de Funciones

```plaintext
Rent&Roll
│
├── config               # Configuración de la base de datos y del servidor
│   ├── db.config.js     # Configuración de la conexión con la base de datos
│   └── server.config.js # Configuración del servidor (puertos, etc.)
│
├── controllers          # Controladores que gestionan la lógica de negocio para cada recurso
│   ├── authController.js          # Controlador para autenticación de usuarios
│   ├── feedbackController.js      # Controlador para gestionar feedback de usuarios
│   ├── reservationController.js   # Controlador para manejar reservas de vehículos
│   ├── uploadController.js        # Controlador para gestionar la subida de archivos
│   └── vehicleController.js       # Controlador para la administración de vehículos
│
├── middlewares          # Middlewares para autenticación, manejo de errores, etc.
│   ├── authMiddleware.js          # Middleware de autenticación para proteger rutas
│   ├── errorHandler.js            # Middleware para manejo de errores generales
│   ├── fileUploadMiddleware.js    # Middleware para gestión de subida de archivos
│   └── notFoundMiddleware.js      # Middleware para manejo de rutas no encontradas (404)
├── models               # Modelos que representan las tablas de la base de datos
│   ├── feedbackModel.js          # Modelo para la entidad de feedback
│   ├── reservationModel.js       # Modelo para la entidad de reservas
│   ├── userModel.js              # Modelo para la entidad de usuarios
│   └── vehicleModel.js           # Modelo para la entidad de vehículos
├── public               # Archivos estáticos (CSS, imágenes, scripts)
│   ├── css
│   │   └── style.css             # Archivo de estilos principal
│   ├── images                    # Imágenes públicas para la interfaz
│   └── js                        # Scripts de frontend (si es necesario)
│
├── routes               # Rutas del API, organizadas por funcionalidad
│   ├── authRoutes.js             # Rutas para autenticación (login, registro)
│   ├── feedbackRoutes.js         # Rutas para gestionar feedback
│   ├── reservationRoutes.js      # Rutas para reservas
│   └── vehicleRoutes.js          # Rutas para ver y gestionar vehículos
│
├── seeds                # Archivos para inicializar datos en la base de datos (opcional)
│   ├── usersSeed.js              # Inicialización de datos de usuarios
│   └── vehiclesSeed.js           # Inicialización de datos de vehículos
│
├── services             # Lógica de negocio y conexión con los modelos
│   ├── authService.js            # Lógica de negocio para autenticación
│   ├── feedbackService.js        # Lógica de negocio para feedback
│   ├── reservationService.js     # Lógica de negocio para reservas
│   ├── uploadService.js          # Lógica de negocio para subida de archivos
│   └── vehicleService.js         # Lógica de negocio para vehículos
│
├── uploads              # Almacenamiento de archivos subidos (imágenes de usuarios y vehículos)
│   ├── users                      # Imágenes de perfil de usuarios
│   └── vehicles                   # Imágenes de los vehículos
│
├── views                # Vistas en formato EJS para el frontend
│   ├── auth
│   │   ├── login.ejs              # Vista de inicio de sesión
│   │   └── register.ejs           # Vista de registro
│   ├── feedback
│   │   └── feedback.ejs           # Vista para mostrar feedback
│   ├── partials                   # Componentes reutilizables
│   │   ├── header.ejs             # Encabezado común
│   │   └── footer.ejs             # Pie de página común
│   ├── reservations
│   │   └── reservation.ejs        # Vista de reservas
│   ├── vehicles
│   │   └── vehicle.ejs            # Vista de detalles del vehículo
│   ├── index.ejs                  # Página de inicio
│   └── error.ejs                  # Página de error 404 y otros errores
│
├── .env                 # Variables de entorno (ignorado por git)
├── .gitignore           # Archivos y carpetas ignoradas por Git
├── package.json         # Configuración y dependencias del proyecto
├── package-lock.json    # Bloqueo de versiones para las dependencias
├── README.md            # Documentación del proyecto
└── server.js            # Archivo principal que inicializa el servidor
```
