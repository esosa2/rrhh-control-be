/**
 * Root Router
 * Redirections to routers
 */

import express, { Request, Response } from "express";
import registerAdminRouter from "./RegisterAdminRouter";
import { LogInfo } from "../utils/logger";

//Server instance
let server = express();

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

export default server;
