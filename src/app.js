import express from "express";
import morgan from "morgan";
import cors from "cors";
import routerApi from "./routes/index.js";
import {
  logErrors,
  errorHandler
} from "./middlewares/error.handler.js";

// Inicializar express
const app = express();

// Middlewares
// const whitelist = ['http://localhost:3000', 'https://myapp.com']
// const options = {
//   origin: (origin, callback) => {
//     console.log(origin);
//     if (whitelist.includes(origin)) {
//       callback(null, true)
//     } else {
//       callback(new Error('No permitido por CORS'))
//     }
//   },
//   credentials: true
// }
// app.use(cors(options));
app.use(cors({
  origin: 'http://localhost:8000', // Permite el acceso a la API desde un origen en particular
  credentials: true
  // Se usa para la configuración de CORS para indicar a los navegadores si deben enviar cookies y credenciales de autenticación en las solicitudes de origen cruzado. Tiene dos valores posibles:
  // true: Las cookies y las credenciales de autenticación se enviarán en las solicitudes de origen cruzado.
  // false: Las cookies y las credenciales de autenticación no se enviarán en las solicitudes de origen cruzado.
}));
app.use(morgan('dev'));
app.use(express.json());

// Rutas
routerApi(app);
app.use(logErrors);
app.use(errorHandler);



// Exportar app
export default app;

