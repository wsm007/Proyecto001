import {Router} from 'express';

// Importar rutas
import taladroRoutes from './dbsGeo.Taladro.routes.js';
import taladroAvanceRoutes from "./dbsGeo.TaladroAvance.routes.js";
import usuarioBaseRoutes from "./dbsSeg.UsuarioBase.routes.js";

function routerApi( app ) {
  const router = Router();
  // Home
  app.get('/', (req, res) => res.json({ message: 'Bienvenido a Proyecto 001.' }));
  app.use('/api/v1',router);
  // Rutas
  router.use('/taladro',taladroRoutes);
  router.use('/taladroavance',taladroAvanceRoutes);
  router.use('/usuariobase', usuarioBaseRoutes);

  // // Crear una ruta para manejar errores
  // app.use((err, req, res, next) => {
  //   console.error(err.stack);
  //   res.status(500).json({
  //     status: "error",
  //     message: err.message });
  // });

}

export default routerApi;
