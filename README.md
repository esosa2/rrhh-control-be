
# Proyecto Backend - Node.js, Express y TypeScript

Este es un proyecto de backend desarrollado con Node.js, Express y TypeScript, diseñado para gestionar un sistema de recursos humanos. La API permite realizar operaciones de creación, edición y eliminación de funcionarios, así como registrar las entradas y salidas de los mismos. Además, incluye funcionalidades para generar reportes detallados sobre las horas trabajadas.
## Requisitos

- Node.js >= 16.x
- npm >= 8.x
- TypeScript >= 4.x

## Instalación

Sigue estos pasos para instalar y configurar el proyecto localmente:

1. Clona el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Navega a la carpeta del proyecto:

   ```bash
   cd <NOMBRE_DEL_PROYECTO>
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

## Desarrollo

Para iniciar el servidor en modo de desarrollo, puedes usar el siguiente comando. Esto ejecutará el proyecto con `nodemon` para recargar automáticamente los cambios en el código:

```bash
npm run dev
```

Esto iniciará el servidor en el puerto `8000` (o el puerto especificado en el archivo `.env`).

### Scripts disponibles

- `dev`: Inicia el servidor en modo desarrollo utilizando `nodemon`.
- `build`: Compila el código TypeScript en JavaScript para producción.
- `start`: Inicia el servidor en producción con el código compilado.

## Variables de Entorno

Este proyecto requiere algunas variables de entorno. Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes configuraciones:

```
PORT=8000
DB_HOST=localhost
DB_PORT=5432
DB_USER=user
DB_PASSWORD=password
DB_NAME=nombre_basedatos
```


