// Import necessary dependencies
import express, { Request, Response } from "express";
import { ReportsController } from "../controller/reports.controller";

// Create an Express router instance to handle routes
let reportsRouter = express.Router();

// Route to handle GET requests to /api/reports/
reportsRouter.route("/")
    // GET route: Generate a report of working hours for an administrator
    .get(async (req: Request, res: Response) => {
        // Obtain 'adminId' query parameter from the request
        const adminIdStr = req?.query?.adminId as string;
        let adminId: number = adminIdStr ? parseInt(adminIdStr, 10) : 0;

        // If the 'adminId' is not a valid number, set it to 0
        if (isNaN(adminId)) {
            adminId = 0;
        }
        
        // Obtain 'dateBegin' query parameter from the request, or set to undefined if not provided
        const dateBegin: Date | undefined = req?.query?.dateBegin
            ? new Date(req.query.dateBegin as string)
            : undefined;

        // Obtain 'dateEnd' query parameter from the request, or set to undefined if not provided
        const dateEnd: Date | undefined = req?.query?.dateEnd
            ? new Date(req.query.dateEnd as string)
            : undefined;

        // Create an instance of the controller to execute the appropriate method
        const controller: ReportsController = new ReportsController();
        
        // Call the method to generate the report based on the parameters
        const response = await controller.reportHours(adminId, dateBegin, dateEnd);
        
        // Send the response to the client
        res.status(response.status).send(response);
    })

// Export the reports router to be used in other files
export default reportsRouter;