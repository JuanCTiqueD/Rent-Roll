const notFoundMiddleware = (req, res, next) => {
    res.status(404).render('error', {
      statusCode: 404,
      message: 'La página que estás buscando no existe.'
    });
  };
  
  module.exports = notFoundMiddleware;
  