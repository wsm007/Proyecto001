import {Router} from 'express';
// import Router from 'express-promise-router' // Evita que se tenga que capturar el error con try catch
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

router.get('/', (req, res) => res.json({ message: 'Taladros' }));
router.get('/:Id', validarSchema(getTaladroSchema, 'params'), (req, res) => res.json({ message: 'Taladro por ID'}));
router.post('/', validarSchema(createTaladroSchema, 'body'), (req, res) => res.json({ message: 'Crear Taladro', data: req.body  }));
router.put('/:Id', validarSchema(getTaladroSchema, 'params'), validarSchema(updateTaladroSchema, 'body'), (req, res) => res.json({ message: 'Actualizar Taladro por su ID' }));
router.delete('/:Id', validarSchema(getTaladroSchema, 'params'), (req, res) => res.json({ message: 'Eliminar Taladro por su ID' }));

export default router;
