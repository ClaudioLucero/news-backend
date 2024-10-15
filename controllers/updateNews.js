import { validationResult } from 'express-validator';
import News from '../models/News.js';

export const updateNews = async (req, res) => {
  const errors = validationResult(req); // Verificar errores de validación
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, author, category, imageUrl } = req.body;
  const { id } = req.params;

  try {
    const newsItem = await News.findByIdAndUpdate(
      id,
      { title, description, author, category, imageUrl },
      { new: true, runValidators: true } // Devuelve el documento actualizado y ejecuta las validaciones
    );

    if (!newsItem) {
      return res.status(404).json({ message: 'Noticia no encontrada' });
    }

    res.status(200).json(newsItem);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la noticia', error });
  }
};
