import express from "express";

// Inicializar express
const app = express();

// Rutas
app.get('/', (req, res) => res.json({ message: 'Bienvenido al Proyecto 001' }));

// Exportar app
export default app;

