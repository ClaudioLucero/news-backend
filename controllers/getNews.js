// controllers/getController.js
import News from '../models/News.js';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables del archivo .env
const categories = process.env.NEWS_CATEGORIES.split(',');

export const getNews = async (req, res) => {
    try {
        // Obtener parámetros de consulta
        const { page = 1, limit = 10, sort = 'date_desc', category } = req.query;

        // Validación de page y limit
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        if (isNaN(pageNumber) || pageNumber < 1) {
            return res.status(400).json({ success: false, message: 'El parámetro "page" debe ser un número entero positivo.' });
        }

        if (isNaN(limitNumber) || limitNumber < 1) {
            return res.status(400).json({ success: false, message: 'El parámetro "limit" debe ser un número entero positivo.' });
        }

        // Validación y configuración de sort
        const allowedSortFields = ['date', 'category', 'title', 'author']; // Campos permitidos para ordenar
        const sortDirection = sort.endsWith('_asc') ? 1 : -1; // Ascendente para 'asc', descendente para 'desc'
        const sortField = sort.replace('_asc', '').replace('_desc', ''); // Remover sufijo para obtener el campo

        if (!allowedSortFields.includes(sortField)) {
            return res.status(400).json({ success: false, message: `El parámetro "sort" debe ser uno de los siguientes: ${allowedSortFields.join(', ')}.` });
        }

        // Validación de category
        if (category && !categories.includes(category)) {
            return res.status(400).json({ success: false, message: `La categoría debe ser una de las siguientes: ${categories.join(', ')}.` });
        }

        // Crear un objeto de condiciones para filtrar por categoría si se proporciona
        const queryConditions = category ? { category } : {};

        // Obtener noticias con paginación y ordenación
        const news = await News.find(queryConditions)
            .sort({ [sortField]: sortDirection }) // Ordenar según el campo y dirección
            .skip((pageNumber - 1) * limitNumber) // Paginación
            .limit(limitNumber); // Límite de resultados

        // Contar el total de noticias para enviar información de paginación
        const total = await News.countDocuments(queryConditions);

        // Enviar respuesta
        res.status(200).json({
            success: true,
            data: news,
            total, // Total de documentos
            totalPages: Math.ceil(total / limitNumber), // Total de páginas
            currentPage: pageNumber, // Página actual
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las noticias' });
    }
};
