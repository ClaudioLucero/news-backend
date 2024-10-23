import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import routes from './routes.js';
import errorHandler from './middlewares/errorHandler.js';
import apiKeyMiddleware from './middlewares/checkApiKey.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Seguridad básica, solicitudes desde los dominios listados.
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://mi-app-en-produccion.com']
}));
// Proteger la app con cabeceras de seguridad
app.use(helmet());
// Evita inyecciones de NoSQL
app.use(mongoSanitize());
//Evitar que el servidor revele detalles innecesarios sobre las tecnologías que usamos
app.disable('x-powered-by');

// Limitar solicitudes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: 'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo después de 15 minutos'
});
app.use(limiter);

// Aplicar el middleware de API Key antes de las rutas
app.use(apiKeyMiddleware); // Esto protegerá todas las rutas

app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

// Usar las rutas
app.use(routes);

// Usar el middleware de manejo de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
