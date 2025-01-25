import pg from 'pg';
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
export const pool = new pg.Pool(dbConfig);

/**
 * 
 * 
 * CREATE TABLE IF NOT EXISTS funcionarios (
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

 */