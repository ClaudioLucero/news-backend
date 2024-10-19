import express from 'express';
import newsRoutes from './routes/news.js';

const router = express.Router();

router.use('/api/news', newsRoutes); // Asignamos la ruta para "news"

export default router;
