import express, { Request, Response } from "express";
import { RegisterAdminController } from "../controller/RegisterAdminController";
import { LogInfo } from "../utils/logger";

// Router from express
let registerAdminRouter = express.Router();

// http://localhost:8001/api/register_admin/
registerAdminRouter.route('/')
    // GET
    .get(async (req: Request, res: Response) => {
        // Obtain query param
        let adminId: any = req?.query?.adminId;
        LogInfo(`Obtain query param: ${adminId}`);
        // Define controller instance to execute method
        const controller: RegisterAdminController = new RegisterAdminController();
        // Obtain response
        const response = await controller.getAdmin(adminId);
        // Send to the cliente the response
        res.send(response);
    })
    .post(async (req: Request, res: Response) => {
        
    })

// Export RegisterAdmin router
export default registerAdminRouter;