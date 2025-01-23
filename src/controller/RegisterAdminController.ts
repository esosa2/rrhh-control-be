import { ApiResponse } from "./types/ApiResponse";
import { IRegisterAdminController } from "./interfaces/RegisterAdmin";
import { LogInfo, LogError, LogSuccess, Logwarning } from "@/utils/logger";

export class RegisterAdminController implements IRegisterAdminController {
    
    registerAdmin(firstName: string, lastName: string, identityNumner: string, dateBirthday: string): Promise<ApiResponse<any>> {
        throw new Error("Method not implemented.");
    }
    
}