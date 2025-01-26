/**
 * Root Router
 * Redirections to routers
 */

import express, { Request, Response } from "express";
import registerAdminRouter from "./register.admin.router";
import registerHours from "./register.hours.router";
import reportsRouter from "./reports.router";
import { LogInfo } from "../utils/logger";

//Server instance
let server = express();
server.use(express.json());

// CORS headers
server.use((req: Request, res: Response, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

    next();
});

// Router instance
let rootRouter = express.Router();

rootRouter.get('/', (req: Request, res: Response) => {
    LogInfo('GET: http://localhost:8001/api/');

    const serverStatus = {
        status: 'ONLINE',
        message: 'Servidor en funcionamiento',
        timestamp: new Date().toISOString()
    };

    res.json(serverStatus);
});

// Redirections to routers and controllers
server.use('/', rootRouter); //http://localhost:8001/api/
server.use('/register_admin', registerAdminRouter); //http://localhost:8001/api/register_admin/
server.use('/register_hours', registerHours); //http://localhost:8001/api/register_hours/
server.use('/reports', reportsRouter); //http://localhost:8001/api/register_hours/

export default server;
