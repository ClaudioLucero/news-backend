import express from 'express';
import newsRoutes from './routes/news.js'; // Importamos las rutas de noticias

const router = express.Router(); // Cambiado a Router

router.use('/api/news', newsRoutes); // Asignamos la ruta para "news"

export default router;
