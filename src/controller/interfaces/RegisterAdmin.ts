import { ApiResponse } from "../types/ApiResponse";

export interface IRegisterAdminController {
    registerAdmin(firstName:string, lastName:string, identityNumner:string, dateBirthday:string): Promise<ApiResponse<any>>
}