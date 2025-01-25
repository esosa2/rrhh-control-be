import express, { Request, Response } from "express";
import { ReportsController } from "../controller/reports.controller";
import { LogInfo } from "../utils/logger";

// Router from express
let reportsRouter = express.Router();

reportsRouter.route("/")
    // GET
    .get(async (req: Request, res: Response) => {
        // Obtain query param
        const adminId: number = parseInt(req?.query?.adminId as string, 10);
        const dateBegin: Date | undefined = req?.query?.dateBegin
            ? new Date(req.query.dateBegin as string)
            : undefined;

        const dateEnd: Date | undefined = req?.query?.dateEnd
            ? new Date(req.query.dateEnd as string)
            : undefined;

        // Define controller instance to execute method
        const controller: ReportsController = new ReportsController();
        // Obtain response
        const response = await controller.reportHours(adminId, dateBegin, dateEnd);
        // Send to the client the response
        res.status(response.status).send(response);
    })

// Export RegisterAdmin router
export default reportsRouter;