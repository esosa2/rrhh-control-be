import { ApiResponse } from "../types/api.response";

export interface IRegisterAdminController {
    getAdmin(adminId:number): Promise<ApiResponse<any>>

    registerAdmin(firstName:string, lastName:string, identityNumber:string, dateBirthday:string): Promise<ApiResponse<any>>

    updateAdmin(adminId: number, firstName:string, lastName:string, identityNumber:string, dateBirthday:string): Promise<ApiResponse<any>>

    deleteAdmin(adminId: number): Promise<ApiResponse<any>>
}