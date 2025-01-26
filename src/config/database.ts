import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Database connection pool configuration
const dbConfig = {
    // Host address of the database (defaults to 'localhost' if not set)
    host: process.env.DB_HOST || 'localhost',

    // Port number of the database server (defaults to 5432 for PostgreSQL)
    port: Number(process.env.DB_PORT) || 5432,

    // Database username (defaults to 'postgres')
    user: process.env.DB_USER || 'postgres',

    // Database password for the user (defaults to '12345678')
    password: process.env.DB_PASSWORD || '12345678',

    // Name of the database to connect to (defaults to 'rrhh_control')
    database: process.env.DB_NAME || 'rrhh_control',
};

// Create the connection pool with the provided configuration
export const pool = new pg.Pool(dbConfig);