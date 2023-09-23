import Joi from 'joi';
import { messages } from './mensajesPersonalizadosJoi.js';

const TaladroId = Joi.number().integer().positive().required().messages(messages);
const Codigo = Joi.string().max(30).required().messages(messages);
const Descripcion = Joi.string().min(6).max(400).required().messages(messages);
const RegistroActivo = Joi.number().integer().positive().required().messages(messages);
const FechaActualizacion = Joi.date().required().messages(messages);
const UsuarioActualizacion = Joi.string().max(50).required().messages(messages);

export const getTaladroSchema = Joi.object({
  TaladroId: TaladroId.required()
});

export const createTaladroSchema = Joi.object({
  Codigo: Codigo,
  Descripcion: Descripcion,
  RegistroActivo: RegistroActivo,
  FechaActualizacion: FechaActualizacion,
  UsuarioActualizacion: UsuarioActualizacion,
});

export const updateTaladroSchema = Joi.object({
  Codigo: Codigo,
  Descripcion: Descripcion,
  RegistroActivo: RegistroActivo,
  FechaActualizacion: FechaActualizacion,
  UsuarioActualizacion: UsuarioActualizacion,
});

