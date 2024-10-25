// __tests__/controllers/getNews.test.js
import { getNews } from '../../controllers/getNews';
import News from '../../models/News';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables del archivo .env
const categories = process.env.NEWS_CATEGORIES.split(',');

// Mocks del modelo News
jest.mock('../../models/News');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('getNews', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpiar mocks antes de cada prueba
    });

    it('should return 400 if category is not valid', async () => {
        const req = {
            query: {
                category: 'invalidCategory', // Categoría inválida
            },
        };
        const res = mockResponse();

        await getNews(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: `La categoría debe ser una de las siguientes: ${categories.join(', ')}.`,
        });
    });

    it('should return news successfully', async () => {
        const req = {
            query: {
                page: '1',
                limit: '10',
                sort: 'date',
                category: 'Technology', // Categoría válida
            },
        };
        const res = mockResponse();

        // Simula las noticias devueltas
        const mockNewsData = [{ title: 'News 1' }, { title: 'News 2' }];

        // Mock de la función find
        News.find.mockReturnValue({
            sort: jest.fn().mockReturnValue({
                skip: jest.fn().mockReturnValue({
                    limit: jest.fn().mockResolvedValue(mockNewsData), // Devuelve mockNewsData
                }),
            }),
        });

        // Mock de countDocuments
        News.countDocuments.mockResolvedValue(mockNewsData.length);

        await getNews(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: mockNewsData,
            total: mockNewsData.length,
            totalPages: 1,
            currentPage: 1,
        });
    });

    it('should return 400 if page is not a positive integer', async () => {
        const req = {
            query: {
                page: '-1', // página inválida
            },
        };
        const res = mockResponse();

        await getNews(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'El parámetro "page" debe ser un número entero positivo.',
        });
    });

    it('should return 400 if limit is not a positive integer', async () => {
        const req = {
            query: {
                limit: '0', // límite inválido
            },
        };
        const res = mockResponse();

        await getNews(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'El parámetro "limit" debe ser un número entero positivo.',
        });
    });

    it('should return 400 if sort is not allowed', async () => {
        const req = {
            query: {
                sort: 'invalidField', // campo de ordenación no permitido
            },
        };
        const res = mockResponse();

        await getNews(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'El parámetro "sort" debe ser uno de los siguientes: date, category, title, author.',
        });
    });


});
