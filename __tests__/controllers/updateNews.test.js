import { updateNews } from '../../controllers/updateNews';
import News from '../../models/News';
import { validationResult } from 'express-validator';

// Mocks del modelo News y express-validator
jest.mock('../../models/News');
jest.mock('express-validator');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockNewsInstance = {
    _id: '1',
    title: 'Updated Title',
    description: 'Updated Description',
    author: 'Updated Author',
    category: 'Updated Category',
    imageUrl: 'http://example.com/image.jpg',
};

describe('updateNews', () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterAll(() => {
        console.error.mockRestore();
    });

    it('should return 400 if there are validation errors', async () => {
        const req = {
            params: { id: '1' },
            body: { title: '', description: 'Some description' }, // Falta el título
        };
        const res = mockResponse();

        // Simula que hay errores de validación
        validationResult.mockReturnValue({
            isEmpty: () => false,
            array: () => [{ msg: 'Title is required', param: 'title' }],
        });

        await updateNews(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: 'Title is required', param: 'title' }] });
    });

    it('should return 404 if news item not found', async () => {
        const req = {
            params: { id: '1' },
            body: {
                title: 'Updated Title',
                description: 'Updated Description',
                author: 'Updated Author',
                category: 'Updated Category',
                imageUrl: 'http://example.com/image.jpg',
            },
        };
        const res = mockResponse();

        // Simula que no hay errores de validación
        validationResult.mockReturnValue({
            isEmpty: () => true,
        });

        // Simula que no se encuentra la noticia
        News.findByIdAndUpdate.mockResolvedValue(null);

        await updateNews(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Noticia no encontrada' });
    });

    it('should handle database errors', async () => {
        const req = {
            params: { id: '1' },
            body: {
                title: 'Updated Title',
                description: 'Updated Description',
                author: 'Updated Author',
                category: 'Updated Category',
                imageUrl: 'http://example.com/image.jpg',
            },
        };
        const res = mockResponse();

        // Simula que no hay errores de validación
        validationResult.mockReturnValue({
            isEmpty: () => true,
        });

        // Simula un error en News.findByIdAndUpdate
        News.findByIdAndUpdate.mockImplementation(() => {
            throw new Error('Database error');
        });

        await updateNews(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Error al actualizar la noticia', error: expect.any(Error) });
        expect(console.error).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should update news item successfully', async () => {
        const req = {
            params: { id: '1' },
            body: {
                title: 'Updated Title',
                description: 'Updated Description',
                author: 'Updated Author',
                category: 'Updated Category',
                imageUrl: 'http://example.com/image.jpg',
            },
        };
        const res = mockResponse();

        // Simula que no hay errores de validación
        validationResult.mockReturnValue({
            isEmpty: () => true,
        });

        // Simula que se encuentra y actualiza la noticia
        News.findByIdAndUpdate.mockResolvedValue(mockNewsInstance);

        await updateNews(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockNewsInstance);
    });
});
