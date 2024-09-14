// Should return error message in JSON format

const errorHandler = (err, req, res, next) => {
  if (err) {
    res.status(500).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
  next();
};

export default errorHandler;
