# Usa la imagen base de Node.js
FROM node:19

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm ci

# Copia el resto de los archivos de la aplicación al contenedor
COPY . .

# Expone el puerto en el que la aplicación estará escuchando
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
