import Joi from 'joi';

const Id = Joi.number().integer().positive();
const Codigo = Joi.string().max(30);
const Descripcion = Joi.string().min(6).max(400);
const RegistroActivo = Joi.number().integer().positive() ;
const FechaActualizacion = Joi.date();
const UsuarioActualizacion = Joi.string().max(50);



export const getTaladroSchema = Joi.object({
  Id: Id.required({message: "El campo {field} es obligatorio"}),
});

// getTaladroSchema.messages = {
//   required: "El campo {field} es obligatorio",
//   integer: "El campo {field} debe ser un número entero",
//   positive: "El campo {field} debe ser un valor positivo",
// };

export const createTaladroSchema = Joi.object({
  Codigo: Codigo.required(),
  Descripcion: Descripcion.optional(),
  RegistroActivo: RegistroActivo.required(),
  FechaActualizacion: FechaActualizacion.required(),
  UsuarioActualizacion: UsuarioActualizacion.required(),
});

export const updateTaladroSchema = Joi.object({
  Codigo: Codigo,
  Descripcion: Descripcion,
  RegistroActivo: RegistroActivo,
  FechaActualizacion: FechaActualizacion,
  UsuarioActualizacion: UsuarioActualizacion,
});

