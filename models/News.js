import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables del archivo .env

// Convertir las categorías de la variable de entorno en un array
const categories = process.env.NEWS_CATEGORIES.split(',');

// Definimos el esquema de noticias
const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Este campo es obligatorio
  },
  description: {
    type: String,
    required: true, // Este campo es obligatorio
  },
  author: {
    type: String,
    required: true, // Este campo es obligatorio
  },
  date: {
    type: Date,
    default: Date.now, // Fecha por defecto es la fecha actual
  },
  category: {
    type: String,
    enum: categories, // Usamos las categorías desde el .env
    required: true, // Aseguramos que sea obligatorio elegir una categoría
  },
  imageUrl: {
    type: String,
    required: false, // Este campo no es obligatorio
  },
});

// Creamos el modelo
const News = mongoose.model('News', newsSchema);

export default News;
