import dotenv from "dotenv";
import server from "./src/server/server-config";
import { LogError, LogSuccess } from "./src/utils/logger";
import { error } from "console";
import './src/config/database'; // Importar y ejecutar el script


// Configuration to env file
dotenv.config();

const port: string | number = process.env.PORT || 8000;

// * Execute server
server.listen(port, () => {
    LogSuccess(`[SERVER ON]: Running in http://localhost:${port}/api    `);
});

// Control server error
server.on('error', (error) => {
    LogError(`[SERVER ERROR]: ${error}`);
});