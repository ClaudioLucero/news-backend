import express from 'express';
import {
  createNews,
  getAllNews,
  updateNews,
  deleteNews,
} from '../controllers/index.js'; // Importar controladores desde el archivo barril

const router = express.Router();

// Ruta para crear una nueva noticia
router.post('/', createNews);

// Ruta para obtener todas las noticias
router.get('/', getAllNews);

// Ruta para editar una noticia
router.put('/:id', updateNews);

// Ruta para eliminar una noticia
router.delete('/:id', deleteNews);

// Manejar rutas no encontradas
router.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

export default router;
