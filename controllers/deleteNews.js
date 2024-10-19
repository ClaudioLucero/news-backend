import News from '../models/News.js';

export const deleteNews = async (req, res) => {
  const { id } = req.params;

  try {
    const newsItem = await News.findByIdAndDelete(id);

    if (!newsItem) {
      return res.status(404).json({ message: 'Noticia no encontrada' });
    }

    res.status(204).json(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la noticia', error });
  }
};
