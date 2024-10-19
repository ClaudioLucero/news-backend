// controllers/createNews.js
import { validationResult } from 'express-validator';
import News from '../models/News.js';

// Función para crear una noticia
export const createNews = async (req, res) => {
  const errors = validationResult(req); // Verificar errores de validación
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, author, category, imageUrl } = req.body;

  try {
    const newNews = new News({
      title,
      description,
      author,
      category,
      imageUrl,
    });
    await newNews.save();
    res.status(201).json(newNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la noticia', error });
  }
};
