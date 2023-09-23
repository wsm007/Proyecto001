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

// No funcionó
// // Proprociona un formato para reportar los errores de Boom
// export function boomErrorHandler (err, req, res, next) {
//   console.info('3. errorBoomHandler');
//   if (err.isBoom){

//     const{ output } = err;
//     res.status(output.statusCode).json(output.payload);
//   } else {
//     next(err);
//   }
// }



