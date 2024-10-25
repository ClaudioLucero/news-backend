import { deleteNews } from '../../controllers/deleteNews';
import News from '../../models/News';

// Mocks del modelo News
jest.mock('../../models/News');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('deleteNews', () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => { }); // Mocks console.error
    });

    afterAll(() => {
        console.error.mockRestore(); // Restablece console.error después de las pruebas
    });

    it('should delete a news item successfully', async () => {
        const req = { params: { id: '1' } }; // Simular request con el ID
        const res = mockResponse();

        // Simula que se encuentra y se elimina la noticia
        News.findByIdAndDelete.mockResolvedValue({
            _id: '1',
            title: 'Test Title',
            description: 'Test Description',
            author: 'Test Author',
            category: 'Health',
        });

        await deleteNews(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith(); // No content
    });

    it('should return 404 if news item not found', async () => {
        const req = { params: { id: '1' } }; // Simular request con el ID
        const res = mockResponse();

        // Simula que no se encuentra la noticia
        News.findByIdAndDelete.mockResolvedValue(null);

        await deleteNews(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Noticia no encontrada' });
    });

    it('should handle database errors', async () => {
        const req = { params: { id: '1' } }; // Simular request con el ID
        const res = mockResponse();

        // Simula un error en News.findByIdAndDelete
        News.findByIdAndDelete.mockImplementation(() => {
            throw new Error('Database error');
        });

        await deleteNews(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Error al eliminar la noticia', error: expect.any(Error) });
        // Verifica que se haya llamado a console.error con un Error
        expect(console.error).toHaveBeenCalledWith(expect.any(Error));
    });
});
