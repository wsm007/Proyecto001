import Router from 'express-promise-router' // Evita que se tenga que capturar el error con try catch
import { getTaladroAvances, getTaladroAvance, createTaladroAvance, updateTaladroAvance, deleteTaladroAvance } from '../../controllers/dbsGeo/TaladroAvance.controller.js';
import { getTaladroAvanceSchema, createTaladroAvanceSchema, updateTaladroAvanceSchema } from '../../schemas/dbsGeo/TaladroAvance.schema.js';
import { validarSchema } from '../../middlewares/validarSchema.handler.js';

const router = Router();

router.get('/', getTaladroAvances);
router.get('/:TaladroAvanceId', validarSchema(getTaladroAvanceSchema, 'params'), getTaladroAvance);
router.post('/', validarSchema(createTaladroAvanceSchema, 'body'), createTaladroAvance);
router.put('/:TaladroAvanceId', validarSchema(getTaladroAvanceSchema, 'params'), validarSchema(updateTaladroAvanceSchema, 'body'), updateTaladroAvance);
router.delete('/:TaladroAvanceId', validarSchema(getTaladroAvanceSchema, 'params'), deleteTaladroAvance);


export default router;
