import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Habilitar CORS para todas las rutas

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

// app.use('/news', newsRoutes);
app.use(routes);
// Usar el middleware de manejo de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
