import express from 'express';
import {
  createNews,
  getNews,
  updateNews,
  deleteNews,
} from '../controllers/index.js';
import { validateNews, validateResults } from '../middlewares/validateNews.js'; // Importar el middleware

const router = express.Router();

// Ruta para crear una nueva noticia
router.post('/', validateNews, validateResults, createNews);

// Ruta para obtener todas las noticias
router.get('/', getNews);

// Ruta para editar una noticia
router.put('/:id', validateNews, validateResults, updateNews); // Validación para editar

// Ruta para eliminar una noticia
router.delete('/:id', deleteNews);

// Manejar rutas no encontradas
router.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

export default router;
