const errorHandler = (err, req, res, next) => {
  console.error(`Error occurred: ${err.message}`); // Log más específico

  // Si el error viene de Mongoose (errores de validación, por ejemplo)
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: err.errors,
    });
  }

  // Otros errores, por ejemplo de conexión a la base de datos
  if (err.name === 'MongoError') {
    return res.status(500).json({
      success: false,
      error: 'Database Error',
      message: err.message,
    });
  }

  // Error genérico para otros casos
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: 'An unexpected error occurred.', // Mensaje genérico para el cliente
  });
};

export default errorHandler;
