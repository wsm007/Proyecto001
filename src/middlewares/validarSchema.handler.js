export function validarSchema (schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      res.status(400).send({ error: error.details });
    } else {
      next();
    }
  }
}
