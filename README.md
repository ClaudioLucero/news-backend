# News Backend

Este proyecto es una API backend para gestionar noticias. Está construida con Node.js y Express, y se conecta a una base de datos MongoDB.

## Requisitos

- Node.js v14+
- Docker (opcional para ejecución con contenedores)

## Instalación

1. Clona los repositorios para el backend y el frontend:
   ```bash

   ```

- Backend: [news-backend](https://github.com/ClaudioLucero/news-backend)
- Frontend: [news-frontend](https://github.com/ClaudioLucero/news-frontend)

### 2. Configurar el archivo `.env`

Para el backend, debes crear un archivo `.env` en el directorio raíz con el siguiente contenido:

````bash
MONGODB_URI=mongodb://mongo:27017/newsDB
NEWS_CATEGORIES=Technology,Health,Sports,Entertainment


2. Ejecución Modo local
  ```bash
  npm install

3. Con Docker construye y levanta los contenedores
  ```bash
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

## Rutas de la API

Todas las rutas están bajo el prefijo `/api/news`.

- **POST /api/news**: Crea una nueva noticia.
- **GET /api/news**: Obtiene todas las noticias.
- **PUT /api/news/:id**: Edita una noticia existente.
- **DELETE /api/news/:id**: Elimina una noticia.


## Ejemplo de uso

**Crear noticia** (POST):
```json
{
  "title": "Título de la noticia",
  "description": "Descripción detallada de la noticia",
  "author": "Nombre del autor",
  "category": "Categoría válida del .env",
  "imageUrl": "https://linkalaimagen.com/imagen.jpg"
}
````
