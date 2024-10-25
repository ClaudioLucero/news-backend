import { createNews } from '../../controllers/createNews';
import News from '../../models/News';
import { validationResult } from 'express-validator';

// Mockea el modelo News y validationResult
jest.mock('../../models/News');
jest.mock('express-validator');

// Simula la respuesta
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('createNews', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                title: 'Test Title',
                description: 'Test Description',
                author: 'Test Author',
                category: 'Health',
                imageUrl: 'http://example.com/image.jpg',
            },
        };
        res = mockResponse();
        jest.clearAllMocks(); // Limpiar mocks antes de cada test
    });

    afterAll(() => {
        jest.restoreAllMocks(); // Restaurar mocks después de todos los tests
    });

    it('should create a news item successfully', async () => {
        // Simula que no hay errores de validación
        validationResult.mockReturnValue({ isEmpty: () => true });

        // Mockea el constructor de News para devolver el objeto con el método save
        const mockNewsInstance = {
            _id: '1',
            title: 'Test Title',
            description: 'Test Description',
            author: 'Test Author',
            category: 'Health',
            imageUrl: 'http://example.com/image.jpg',
            save: jest.fn().mockResolvedValue(mockNewsInstance),
        };

        News.mockImplementation(() => mockNewsInstance);

        await createNews(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockNewsInstance);
    });

    it('should return validation errors', async () => {
        validationResult.mockReturnValue({
            isEmpty: () => false,
            array: () => [{ msg: 'Invalid input' }],
        });

        await createNews(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            errors: [{ msg: 'Invalid input' }],
        });
    });

    it('should handle database errors', async () => {
        // Espiamos console.error para asegurarnos de que se llama
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        validationResult.mockReturnValue({ isEmpty: () => true });

        News.mockImplementation(() => ({
            save: jest.fn().mockRejectedValue(new Error('Database error')),
        }));

        await createNews(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Error al crear la noticia',
            error: expect.any(Error),
        });

        // Verifica que se haya llamado a console.error con el mensaje de error
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

        consoleErrorSpy.mockRestore(); // Restaurar el espía
    });
});
