# News Backend

Este proyecto es una API backend para gestionar noticias. Está construida con Node.js y Express, y se conecta a una base de datos MongoDB.

## Requisitos

- Node.js v19.9.0+
- Docker (opcional para ejecución con contenedores)

## Instalación

### 1. Clona los repositorios para el backend y el frontend:

- Backend: [news-backend](https://github.com/ClaudioLucero/news-backend)
- Frontend: [news-frontend](https://github.com/ClaudioLucero/news-frontend)

### 2. Configurar el archivo `.env`

Para el backend, debes crear un archivo `.env` en el directorio raíz con el siguiente contenido:

```bash│
MONGODB_URI=mongodb://mongo:27017/newsDB
NEWS_CATEGORIES=Technology,Health,Sports,Entertainment
```

### 3. Ejecución Modo local

npm install
npm run dev

### 4. Con Docker construye y levanta los contenedores

docker-compose up --build

## Estructura del Proyecto

```bash│
├── controllers/    # Lógica de los controladores
├── middlewares/    # Middlewares personalizados
├── models/         # Definición de esquemas de base de datos
├── routes/         # Definición de rutas de la API
├── app.js          # Configuración principal de la app
├── Dockerfile      # Configuración para Docker
├── docker-compose.yml # Configuración de servicios Docker
└── package.json    # Dependencias del proyecto
```

## Rutas de la API

Todas las rutas están bajo el prefijo `/api/news`.

- **POST /api/news**: Crea una nueva noticia.
- **GET /api/news**: Obtiene todas las noticias.
- **PUT /api/news/:id**: Edita una noticia existente.
- **DELETE /api/news/:id**: Elimina una noticia.

## Prueba de la API

```bash│
http://localhost:3000/api/news
```

**Crear noticia** (POST):

```json
{
  "title": "Título de la noticia",
  "description": "Descripción detallada de la noticia",
  "author": "Nombre del autor",
  "category": "Categoría válida del .env",
  "imageUrl": "https://linkalaimagen.com/imagen.jpg" // Este campo no es obligatorio
}
```

## Decisiones de Diseño

-Elección de MongoDB: MongoDB se eligió por su flexibilidad y capacidad de escalar, adaptándose bien a la estructura de datos y cambios. Se optó por incluir más campos en el modelo de noticias para facilitar futuros filtro

-Docker se implementó como una oportunidad para aprender y comprender conceptos de contenerización, dado que anteriormente había utilizado entornos ya configurados. Esto permite un desarrollo y despliegue más consistentes.

## Segunda Versión

Mejoras de Seguridad Implementadas:
-Control de Acceso Mediante CORS: Se ha configurado el middleware CORS para restringir qué dominios pueden interactuar con la API.
-Limitación de Tasa de Solicitudes: Se utiliza la librería express-mongo-sanitize para proteger la API contra inyecciones de NoSQL.
-Cabeceras de Seguridad con Helmet: Desactivación de la cabecera x-powered-by.
-Manejo de Errores y Respuestas Seguras: Autenticación mediante API Key para proteger las rutas de la API.

Test Unitario con Jest.
Documentación con Swagger:
Local : http://localhost:3000/api-docs/#/
En Render : https://news-backend-wyxu.onrender.com/api-docs/#/
Despliegue de BBDD en Mongo Atlas.
Despliegue de API en Render
