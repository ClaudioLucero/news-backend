// swagger.js
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

dotenv.config();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Noticias',
            version: '1.0.0',
            description: 'Documentación de la API para la gestión de noticias',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
            },
        ],
        components: {
            schemas: {
                News: {
                    type: 'object',
                    properties: {
                        title: { type: 'string', example: 'Título de la noticia' },
                        description: { type: 'string', example: 'Descripción de la noticia' },
                        author: { type: 'string', example: 'Autor de la noticia' },
                        date: { type: 'string', format: 'date-time', example: '2024-10-27T10:00:00Z' },
                        category: { type: 'string', enum: process.env.NEWS_CATEGORIES.split(','), example: 'Technology' },
                        imageUrl: { type: 'string', example: 'https://example.com/image.jpg' },
                    },
                    required: ['title', 'description', 'author', 'category'],
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

// Middleware para Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
