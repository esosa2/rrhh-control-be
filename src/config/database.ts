import { Pool } from 'pg';
import dotenv from 'dotenv';
import { LogInfo, LogError } from '../utils/logger';

// Cargar las variables de entorno
dotenv.config();

// Configuración del pool de conexión
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'default_user',
    password: process.env.DB_PASSWORD || 'default_password',
    database: process.env.DB_NAME || 'default_database',
};

// Crear el pool de conexiones
export const pool = new Pool(dbConfig);

// Verificar la conexión al iniciar
(async () => {
    try {
        LogInfo('Conectando a la base de datos...');
        const client = await pool.connect();
        LogInfo('Conexión exitosa a la base de datos.');
        client.release(); // Liberar el cliente al pool
    } catch (error) {
        LogError(`Error al conectar a la base de datos: ${error}`);
    }
})();

// Exportar el pool para su uso en toda la aplicación
