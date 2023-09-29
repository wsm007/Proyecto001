import Joi from 'joi';
import { messages } from '../mensajesPersonalizadosJoi.js';

const Nombre = Joi.string().max(30).required().messages(messages);
const Email = Joi.string().min(6).max(400).required().email().messages(messages);
const Password = Joi.string().min(6).max(256).required().messages(messages);
const ConfirmPassword = Joi.string().min(6).max(256).required().messages(messages);
const Estado = Joi.string().max(1).required().messages(messages);
const FechaAlta = Joi.date().required().messages(messages);
const RegistroActivo = Joi.number().integer().positive().required().messages(messages);
const FechaActualizacion = Joi.date().required().messages(messages);
const UsuarioActualizacion = Joi.string().max(50).required().messages(messages);

export const signInSchema = Joi.object({
  Email: Email,
  Password: Password
});

export const signUpSchema = Joi.object({
  Nombre: Nombre,
  Password: Password,
  ConfirmPassword: ConfirmPassword,
  Email: Email,
  Estado: Estado,
  FechaAlta: FechaAlta,
  RegistroActivo: RegistroActivo,
  FechaActualizacion: FechaActualizacion,
  UsuarioActualizacion: UsuarioActualizacion,
});
