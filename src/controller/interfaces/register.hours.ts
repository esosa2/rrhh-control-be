import { ApiResponse } from "../types/api.response";

// Interface for the RegisterHoursController
export interface IRegisterHoursController {
    // Method to register an entry and exit time for a specific admin
    registerHour(adminId: number, date: string, entryTime: string, exitTime: string): Promise<ApiResponse<any>>;
}
