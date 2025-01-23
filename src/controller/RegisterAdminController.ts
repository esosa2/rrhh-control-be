import { ApiResponse } from "./types/ApiResponse";
import { IRegisterAdminController } from "./interfaces/RegisterAdmin";
import { LogInfo, LogError, LogSuccess, Logwarning } from "../utils/logger";

export class RegisterAdminController implements IRegisterAdminController {
    
    getAdmin(adminId: number): Promise<ApiResponse<any>> {
        LogInfo('[/api/register_admin] Get Request');
        const data = {"Name": "Prueba", "ID": adminId};

        const response: ApiResponse<any> = {
            status: 200,         // Código de estado HTTP
            success: true,       // Indica que la operación fue exitosa
            message: "Admin retrieved successfully",
            data: data,          // Datos devueltos
        };

        return Promise.resolve(response);
    }

    registerAdmin(firstName: string, lastName: string, identityNumner: string, dateBirthday: string): Promise<ApiResponse<any>> {
        LogInfo('[/api/register_admin] Post Request');
        throw new Error("Method not implemented.");
    }
    
}