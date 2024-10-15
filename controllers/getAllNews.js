// controllers/getController.js
import News from '../models/News.js';
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news); // Devuelve todas las noticias
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las noticias' });
  }
};
