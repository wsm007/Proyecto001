import Router from 'express-promise-router' // Evita que se tenga que capturar el error con try catch
import { signin, signout, signup, profile } from '../../controllers/dbsSeg/Auth.controller.js';
import { signInSchema, signUpSchema } from '../../schemas/dbsSeg/Auth.schema.js';
import { validarSchema } from '../../middlewares/validarSchema.handler.js';
import { checkApiKey } from '../../middlewares/auth.handler.js';

const router = Router();

router.post('/signin', checkApiKey, validarSchema(signInSchema), signin);

router.post('/signup', validarSchema(signUpSchema), signup);

router.post('/signout', signout);

router.get('/profile', profile);

export default router;
