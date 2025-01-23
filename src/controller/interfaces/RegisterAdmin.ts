import { ApiResponse } from "../types/ApiResponse";

export interface IRegisterAdminController {
    getAdmin(adminId:number): Promise<ApiResponse<any>>

    registerAdmin(firstName:string, lastName:string, identityNumner:string, dateBirthday:string): Promise<ApiResponse<any>>
}