import sql from 'mssql';

export const config = {
  user: 'developer',
  password: 'Compaqnx6310',
  server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
  database: 'BDTest',
  port: 1433,
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

export async function getConnection() {
  try {
    const pool = await new sql.connect(config);
    console.log('Conexión realizada');
    return pool;
  } catch (error) {
    console.log('Error en la conexión');
    console.error(error);
  }
}

