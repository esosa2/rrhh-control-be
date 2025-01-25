import { ApiResponse } from "../types/api.response";

export interface IReportsController {
    reportHours(adminId:number, dateBegin:Date | undefined, dateEnd:Date | undefined): Promise<ApiResponse<any>>
}