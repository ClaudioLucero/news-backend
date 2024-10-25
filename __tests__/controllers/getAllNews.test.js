import { getAllNews } from '../../controllers/getAllNews';
import News from '../../models/News'; // Importamos el modelo

// Mockea el modelo News
jest.mock('../../models/News');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('getAllNews', () => {
    afterAll(() => {
        jest.restoreAllMocks(); // Restaurar mocks después de todos los tests
    });

    it('should return all news successfully', async () => {
        // Configura el mock para que News.find devuelva noticias simuladas
        News.find.mockResolvedValue([
            {
                _id: '1',
                title: 'Test Title',
                description: 'Test Description',
                author: 'Test Author',
                category: 'Health',
                date: new Date(),
            },
        ]);

        const req = {}; // Simular request vacío
        const res = mockResponse();

        await getAllNews(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            {
                _id: '1',
                title: 'Test Title',
                description: 'Test Description',
                author: 'Test Author',
                category: 'Health',
                date: expect.any(Date),
            },
        ]);
    });

    it('should handle errors', async () => {
        // Espiamos console.error para asegurarnos de que se llama
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        // Simula un error en News.find
        News.find.mockRejectedValue(new Error('Database error'));

        const req = {}; // Simular request vacío
        const res = mockResponse();

        await getAllNews(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Error al obtener las noticias' });

        // Verifica que se haya llamado a console.error con el mensaje de error
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

        consoleErrorSpy.mockRestore(); // Restaurar el espía
    });
});
