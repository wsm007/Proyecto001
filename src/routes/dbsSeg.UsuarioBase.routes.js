import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => res.json({ message: 'Avance de Taladros' }));
router.get('/:id', (req, res) => res.json({ message: 'Avance de Taladro por ID' }));
router.post('/', (req, res) => res.json({ message: 'Crear Avance de Taladro' }));
router.put('/:id', (req, res) => res.json({ message: 'Actualizar Avance de Taladro por su ID' }));
router.delete('/:id', (req, res) => res.json({ message: 'Eliminar Avance de Taladro por su ID' }));

export default router;
