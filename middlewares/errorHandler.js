const errorHandler = (err, req, res, next) => {
  console.error(`Error occurred: ${err.message}`);

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: err.errors, // Incluir detalles específicos
    });
  }

  // Error de clave duplicada en MongoDB (p. ej., cuando se intenta insertar un valor único duplicado)
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: 'Duplicate Key Error',
      message: 'Duplicated field value entered.',
    });
  }

  // Error de conversión de tipos en Mongoose (CastError, por ejemplo con ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID Format',
      message: `Invalid value for ${err.path}: ${err.value}`,
    });
  }

  // Otros errores relacionados con MongoDB
  if (err.name === 'MongoError') {
    return res.status(500).json({
      success: false,
      error: 'Database Error',
      message: err.message,
    });
  }

  // Error genérico para el servidor
  res.status(500).json({
    success: false,
    error: 'Server Error',
    message: 'An unexpected error occurred.', // Mensaje genérico
  });
};


export default errorHandler;
