import sql from 'mssql';
import {varEntorno} from './config/config.js';

// Validar como conectar cuando sea a través de la web
// const USER = encodeURIComponent(varEntorno.dbUser);
// const PASSWORD = encodeURIComponent(varEntorno.dbPassword);
// const URI = `mssql://${USER}:${PASSWORD}@${varEntorno.dbHost}:${varEntorno.dbPort}/${varEntorno.dbName}`;

export const config = {
  user: varEntorno.dbUser,
  password: varEntorno.dbPassword,
  server: varEntorno.dbHost, // You can use 'localhost\\instance' to connect to named instance
  database: varEntorno.dbName,
  port: parseInt(varEntorno.dbPort), // Default port is 1433 Para Docker usar 14033
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // Use this if you're on Windows Azure
    trustServerCertificate: true,
  },
};

async function getConnection() {
  try {
    const pool = await new sql.connect(config);
    console.log('Conexión realizada');
    return pool;
  } catch (error) {
    console.log('Error en la conexión');
    console.error(error);
  }
}

export { sql, getConnection}
