// Should return error message in JSON format

const errorHandler = (err, req, res, next) => {
  if (err) {
    res.status(500).json({ message: err.message, code: err.code ?? 'INTERNAL_SERVER_ERROR' });
  } else {
    res.status(500).json({ message: 'Internal server error', code: 'INTERNAL_SERVER_ERROR' });
  }
  next();
};

export default errorHandler;
