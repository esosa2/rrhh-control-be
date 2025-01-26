// Import necessary dependencies
import express, { Request, Response } from "express";
import { RegisterAdminController } from "../controller/register.admin.controller";
import { LogInfo } from "../utils/logger";

// Create an Express router instance to handle routes
let registerAdminRouter = express.Router();

// Route to handle requests to /api/register_admin/
registerAdminRouter.route('/')
    // GET route: Retrieve administrator information
    .get(async (req: Request, res: Response) => {
        // Get the 'adminId' query parameter
        const adminId = req?.query?.adminId ? parseInt(req.query.adminId as string, 10) : undefined;
        LogInfo(`Obtained query parameter: ${adminId}`);
        
        // Create an instance of the controller to execute the appropriate method
        const controller: RegisterAdminController = new RegisterAdminController();
        
        // Call the method to retrieve administrator information
        const response = await controller.getAdmin(adminId);
        LogInfo(`Response obtained: ${response.status} -> ${response.data ? JSON.stringify(response.data) : 'No data available'}`);
        
        // Send the response to the client
        res.status(response.status).send(response);
    })
    // POST route: Register a new administrator
    .post(async (req: Request, res: Response) => {
        // Get the request body data
        LogInfo(`Request received: ${req.body}`);
        const { firstName, lastName, identityNumber, dateBirthday } = req.body;
        
        // Create an instance of the controller to execute the appropriate method
        const controller: RegisterAdminController = new RegisterAdminController();
        
        // Call the method to register the administrator
        const response = await controller.registerAdmin(firstName, lastName, identityNumber, dateBirthday);
        LogInfo(`Response obtained: ${response.status} -> ${response.data ? JSON.stringify(response.data) : 'No data available'}`);
        
        // Send the response to the client
        res.status(response.status).send(response);
    })
    // PUT route: Update administrator information
    .put(async (req: Request, res: Response) => {
        // Get the request body data
        LogInfo(`Request received: ${req.body}`);
        const { adminId, firstName, lastName, identityNumber, dateBirthday } = req.body;
        
        // Create an instance of the controller to execute the appropriate method
        const controller: RegisterAdminController = new RegisterAdminController();
        
        // Call the method to update the administrator information
        const response = await controller.updateAdmin(adminId, firstName, lastName, identityNumber, dateBirthday);
        LogInfo(`Response obtained: ${response.status} -> ${response.data ? JSON.stringify(response.data) : 'No data available'}`);
        
        // Send the response to the client
        res.status(response.status).send(response);
    })
    
// DELETE route: Delete an administrator by their ID
registerAdminRouter.delete('/:adminId', async (req: Request, res: Response) => {
    // Get the 'adminId' parameter from the URL
    const adminId = parseInt(req.params.adminId, 10);  // Using params instead of query
    LogInfo(`Request received to delete administrator with ID: ${adminId}`);
    
    // Create an instance of the controller to execute the appropriate method
    const controller: RegisterAdminController = new RegisterAdminController();
    
    // Call the method to delete the administrator
    const response = await controller.deleteAdmin(adminId);
    LogInfo(`Response obtained: ${response.status} -> ${response.data ? JSON.stringify(response.data) : 'No data available'}`);
    
    // Send the response to the client
    res.status(response.status).send(response);
})

// Export the router to be used in other files
export default registerAdminRouter;