import { ApiResponse } from "../types/api.response";

export interface IRegisterHoursController {
    registerHour(adminId:number, date:string, entryTime:string, exitTime:string): Promise<ApiResponse<any>>
}