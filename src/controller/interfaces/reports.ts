import { ApiResponse } from "../types/api.response";

// Interface for the ReportsController
export interface IReportsController {
    // Method to generate a report of hours worked by an admin within a date range
    reportHours(adminId: number, dateBegin: Date | undefined, dateEnd: Date | undefined): Promise<ApiResponse<any>>;
}
