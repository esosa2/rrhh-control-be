import express, { Request, Response } from "express";
import { RegisterAdminController } from "../controller/register.admin.controller";
import { LogInfo } from "../utils/logger";

// Router from express
let registerAdminRouter = express.Router();

// http://localhost:8001/api/register_admin/
registerAdminRouter.route('/')
    // GET
    .get(async (req: Request, res: Response) => {
        // Obtain query param
        const adminId = parseInt(req?.query?.adminId as string, 10);
        LogInfo(`Obtain query param: ${adminId}`);
        // Define controller instance to execute method
        const controller: RegisterAdminController = new RegisterAdminController();
        // Obtain response
        const response = await controller.getAdmin(adminId);
        // Send to the cliente the response
        res.send(response);
    })
    // POST
    .post(async (req: Request, res: Response) => {
        // Obtain body
        const { firstName, lastName, ci, dateBirthday } = req.body;
    })

// Export RegisterAdmin router
export default registerAdminRouter;