import express, { Request, Response } from "express";
import { RegisterHoursController } from "../controller/register.hour.controller"

// Router from express
let registerHours = express.Router();

registerHours.route('/')
    // POST
    .post(async (req: Request, res: Response) => {
        // Obtain body
        const { adminId, date, entryTime, exitTime } = req.body;
        // Define controller instance to execute method
        const controller: RegisterHoursController = new RegisterHoursController();
        // Obtain response
        const response = await controller.registerHour(adminId, date, entryTime, exitTime);
        // Send to the client the response
        res.status(response.status).send(response);
    })

// Export RegisterHours router
export default registerHours;