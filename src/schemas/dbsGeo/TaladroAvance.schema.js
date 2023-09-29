import Joi from 'joi';
import { messages } from '../mensajesPersonalizadosJoi.js';

const TaladroAvanceId = Joi.number().integer().positive().required().messages(messages);
const TaladroId = Joi.number().integer().positive().required().messages(messages);
const Fecha = Joi.date().required().messages(messages);
const Turno = Joi.string().max(1).required().messages(messages);
const TipoDiametro = Joi.number().integer().positive().required().messages(messages);
const Desde = Joi.number().positive().required().messages(messages);
const Hasta = Joi.number().positive().required().messages(messages);
const FechaActualizacion = Joi.date().required().messages(messages);
const UsuarioActualizacion = Joi.string().max(50).required().messages(messages);

export const getTaladroAvanceSchema = Joi.object({
  TaladroAvanceId: TaladroAvanceId.required()
});

export const createTaladroAvanceSchema = Joi.object({
  TaladroId: TaladroId,
  Fecha: Fecha,
  Turno: Turno,
  TipoDiametro: TipoDiametro,
  Desde: Desde,
  Hasta: Hasta,
  FechaActualizacion: FechaActualizacion,
  UsuarioActualizacion: UsuarioActualizacion,
});

export const updateTaladroAvanceSchema = Joi.object({
  TaladroId: TaladroId,
  Fecha: Fecha,
  Turno: Turno,
  TipoDiametro: TipoDiametro,
  Desde: Desde,
  Hasta: Hasta,
  FechaActualizacion: FechaActualizacion,
  UsuarioActualizacion: UsuarioActualizacion,
});

