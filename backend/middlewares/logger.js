const logger = (req, res, next) => {
  const currentTime = new Date().toISOString();
  console.log(`[${currentTime}] ${req.method} request to ${req.url}`);
  next(); // Call next() to pass control to the next middleware function
};

export default logger;
