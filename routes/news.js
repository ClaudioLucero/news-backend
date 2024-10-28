import express from 'express';
import {
  createNews,
  getNews,
  updateNews,
  deleteNews,
} from '../controllers/index.js';
import { validateNews, validateResults } from '../middlewares/validateNews.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: News
 *   description: Gestión de noticias
 */

/**
 * @swagger
 * /api/news:
 *   post:
 *     summary: Crear una nueva noticia
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *     responses:
 *       201:
 *         description: Noticia creada exitosamente
 *       400:
 *         description: Error en la validación de la noticia
 */

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Obtener todas las noticias
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Lista de noticias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 */

/**
 * @swagger
 * /api/news/{id}:
 *   put:
 *     summary: Editar una noticia
 *     tags: [News]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la noticia a editar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       200:
 *         description: Noticia editada exitosamente
 *       404:
 *         description: Noticia no encontrada
 */

/**
 * @swagger
 * /api/news/{id}:
 *   delete:
 *     summary: Eliminar una noticia
 *     tags: [News]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la noticia a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Noticia eliminada exitosamente
 *       404:
 *         description: Noticia no encontrada
 */

// Ruta para crear una nueva noticia
router.post('/', validateNews, validateResults, createNews);

// Ruta para obtener todas las noticias
router.get('/', getNews);

// Ruta para editar una noticia
router.put('/:id', validateNews, validateResults, updateNews);

// Ruta para eliminar una noticia
router.delete('/:id', deleteNews);

// Manejar rutas no encontradas
router.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

export default router;
