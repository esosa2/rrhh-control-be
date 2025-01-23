import express, { Express, Request, Response } from "express";

// Enviroment variables
import dotenv from "dotenv";

// Security
import cors from "cors";
import helmet from "helmet";

// Routes
import router from "../routes/route";

// Configuration to env file
dotenv.config();

// Create Express APP
const server:Express = express();
const port: string | number = process.env.PORT || 8000;

// Define rootRouter
server.use('/api', router);

// Security config
server.use(cors());
server.use(helmet());

// Content-Type
server.use(express.urlencoded({extended: true, limit: '20mb'}));
server.use(express.json({limit: '50mb'}));

// Redirections Config
server.get('/', (req: Request, res: Response) => {
    res.redirect('/api');
});

export default server;