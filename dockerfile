# Usa la imagen base de Node.js
FROM node:18-alpine

# Crea un directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Compila el código TypeScript a JavaScript
RUN npm run build

# Expone el puerto en el contenedor (8001)
EXPOSE 8001

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
