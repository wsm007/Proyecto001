import Router from 'express-promise-router' // Evita que se tenga que capturar el error con try catch
import {
  getTaladros,
  getTaladro,
  createTaladro,
  updateTaladro,
  deleteTaladro
} from '../controllers/dbsGeo.Taladro.controller.js';
import { validarSchema } from '../middlewares/validarSchema.handler.js';
import {
  getTaladroSchema,
  createTaladroSchema,
  updateTaladroSchema
} from '../schemas/dbsGeo.Taladro.schema.js';

const router = Router();

router.get('/', getTaladros);
router.get('/:TaladroId', validarSchema(getTaladroSchema, 'params'), getTaladro);
router.post('/', validarSchema(createTaladroSchema, 'body'), createTaladro);
router.put('/:TaladroId', validarSchema(getTaladroSchema, 'params'), validarSchema(updateTaladroSchema, 'body'), updateTaladro);
router.delete('/:TaladroId', validarSchema(getTaladroSchema, 'params'), deleteTaladro);

export default router;
