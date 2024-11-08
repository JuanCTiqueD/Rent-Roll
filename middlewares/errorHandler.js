const errorHandler = (err, req, res, next) => {
console.error(err.stack); // Imprime el error en la consola para depuración

const statusCode = err.status || 500; // Usa el código de estado del error, o 500 si no se especifica
const message = err.message || 'Ocurrió un error en el servidor';

res.status(statusCode).render('error', {
    statusCode: statusCode,
    message: message
});
};

module.exports = errorHandler;
  