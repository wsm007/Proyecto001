import {Router} from 'express';

// Importar rutas
import taladroRoutes from './dbsGeo/Taladro.routes.js';
import taladroAvanceRoutes from "./dbsGeo/TaladroAvance.routes.js";
import authRoutes from "./dbsSeg/Auth.routes.js";

function routerApi( app ) {
  const router = Router();
  // Home
  app.get('/', (req, res) => res.status(200).json({ Mensaje: 'Bienvenido a Proyecto 001.' }));
  app.use('/api/v1',router);
  // Rutas

  router.use('/taladro',taladroRoutes);
  router.use('/taladroavance',taladroAvanceRoutes);
  router.use('/usuario', authRoutes);

  // Crear una ruta para manejar errores
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      Status: "error",
      Mensaje: err.message });
  });
}

export default routerApi;
