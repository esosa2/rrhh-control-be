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
        const adminId = req?.query?.adminId ? parseInt(req.query.adminId as string, 10) : undefined;
        LogInfo(`Obtain query param: ${adminId}`);
        // Define controller instance to execute method
        const controller: RegisterAdminController = new RegisterAdminController();
        // Obtain response
        const response = await controller.getAdmin(adminId);
        LogInfo(`Obtain this response: ${response.status} -> ${response.data ? JSON.stringify(response.data) : 'No data available'}`);
        // Send to the client the response
        res.status(response.status).send(response);
    })
    // POST
    .post(async (req: Request, res: Response) => {
        // Obtain body
        LogInfo(`Obtain this request: ${req.body}`);
        const { firstName, lastName, identityNumber, dateBirthday } = req.body;
        // Define controller instance to execute method
        const controller: RegisterAdminController = new RegisterAdminController();
        // Obtain response
        const response = await controller.registerAdmin(firstName, lastName, identityNumber, dateBirthday);
        LogInfo(`Obtain this response: ${response.status} -> ${response.data ? JSON.stringify(response.data) : 'No data available'}`);
        // Send to the client the response
        res.status(response.status).send(response);
    })
    // PUT
    .put(async (req: Request, res: Response) => {
        // Obtain body
        LogInfo(`Obtain this request: ${req.body}`);
        const { adminId, firstName, lastName, identityNumber, dateBirthday } = req.body;
        // Define controller instance to execute method
        const controller: RegisterAdminController = new RegisterAdminController();
        // Obtain response
        const response = await controller.updateAdmin(adminId, firstName, lastName, identityNumber, dateBirthday);
        LogInfo(`Obtain this response: ${response.status} -> ${response.data ? JSON.stringify(response.data) : 'No data available'}`);
        // Send to the client the response
        res.status(response.status).send(response);
    })
    
// DELETE
registerAdminRouter.delete('/:adminId', async (req: Request, res: Response) => {
    // Obtain body
    const adminId = parseInt(req.params.adminId, 10);  // Usamos params en lugar de query
    LogInfo(`Obtain this request: ${adminId}`);
    // Define controller instance to execute method
    const controller: RegisterAdminController = new RegisterAdminController();
    // Obtain response
    const response = await controller.deleteAdmin(adminId);
    LogInfo(`Obtain this response: ${response.status} -> ${response.data ? JSON.stringify(response.data) : 'No data available'}`);
    // Send to the client the response
    res.status(response.status).send(response);
})
// Export RegisterAdmin router
export default registerAdminRouter;