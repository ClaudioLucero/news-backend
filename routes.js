import express from 'express';
import newsRoutes from './routes/news.js'; // Importamos las rutas de noticias

const router = express();

router.use('/news', newsRoutes); // Asignamos la ruta para "news"

export default router;
