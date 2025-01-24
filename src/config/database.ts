import { Pool } from 'pg';
import dotenv from 'dotenv';
import { LogError, LogInfo } from '../utils/logger';

// Cargar variables de entorno
dotenv.config();

// Configuración de la conexión
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'default_user',
    password: process.env.DB_PASSWORD || 'default_password',
    database: process.env.DB_NAME || 'default_database',
};

// Crear un pool de conexiones
export const pool = new Pool(dbConfig);

const initDatabase = async () => {
    try {
        // Verificar si la base de datos existe
        const dbName = 'rrhh_control';
        const checkDbQuery = `SELECT 1 FROM pg_database WHERE datname = '${dbName}'`;
        const dbExists = await pool.query(checkDbQuery);

        if (dbExists.rowCount === 0) {
            // Crear la base de datos si no existe
            await pool.query(`CREATE DATABASE ${dbName}`);
            console.log(`Base de datos '${dbName}' creada.`);
        } else {
            console.log(`La base de datos '${dbName}' ya existe.`);
        }

        // Conectar a la base de datos recién creada (o existente)
        const dbPool = new Pool({
            user: 'default_user',
            host: 'localhost',
            database: dbName,
            password: 'default_password',
            port: 5432,
        });

        // Crear tablas si no existen
        const createTablesQuery = `
        CREATE TABLE IF NOT EXISTS funcionarios (
          id SERIAL PRIMARY KEY,
          nombres VARCHAR(50) NOT NULL,
          apellidos VARCHAR(50) NOT NULL,
          cedula VARCHAR(20) UNIQUE NOT NULL,
          fecha_nacimiento DATE NOT NULL
        );
  
        CREATE TABLE IF NOT EXISTS registro_entrada_salida (
          id SERIAL PRIMARY KEY,
          funcionario_id INT REFERENCES funcionarios(id),
          fecha DATE NOT NULL,
          hora_entrada TIME NOT NULL,
          hora_salida TIME NOT NULL
        );
      `;

        await dbPool.query(createTablesQuery);
        console.log('Tablas creadas o ya existentes.');

        // Cerrar conexión
        dbPool.end();
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
    } finally {
        pool.end();
    }
};

// Ejecutar el script de inicialización
initDatabase();