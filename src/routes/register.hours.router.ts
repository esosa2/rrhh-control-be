// Import necessary dependencies
import express, { Request, Response } from "express";
import { RegisterHoursController } from "../controller/register.hour.controller"

// Create an Express router instance to handle routes
let registerHours = express.Router();

// Route to handle requests to /api/register_hours/
registerHours.route('/')
    // POST route: Register working hours for an administrator
    .post(async (req: Request, res: Response) => {
        // Get the request body data containing the hours details
        const { adminId, date, entryTime, exitTime } = req.body;
        
        // Create an instance of the controller to execute the appropriate method
        const controller: RegisterHoursController = new RegisterHoursController();
        
        // Call the method to register the working hours
        const response = await controller.registerHour(adminId, date, entryTime, exitTime);
        
        // Send the response to the client
        res.status(response.status).send(response);
    })

// Export the router to be used in other files
export default registerHours;