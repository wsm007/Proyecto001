export function logErrors (err, req, res, next) {
  console.info('1. logErrors');
  console.error(err);
  next(err);
};

// Proprociona un formato para reportar el error
export function errorHandler (err, req, res, next) {
  console.info('2. errorHandler');
  res.status(500).json({
    status: "Error",
    message: err.message,
    stack: err.stack
  });
};
