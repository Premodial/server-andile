function notFoundHandler(req, res, next) {
    res.status(404).json({
      error: {
        message: 'Not Found',
        status: 404,
      },
    });
  }
  
  module.exports = notFoundHandler;
  