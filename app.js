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
import setupSwagger from './swagger.js'; // Importa la configuración de Swagger

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Swagger
setupSwagger(app); // Configura Swagger

// Seguridad y middlewares
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(express.json());

// Limitar solicitudes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: 'Demasiadas solicitudes desde esta IP',
});
app.use(limiter);

// Middleware de API Key
app.use(apiKeyMiddleware);
app.use(routes);
app.use(errorHandler);

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
