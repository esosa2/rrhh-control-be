import { ApiResponse } from "../types/api.response";

// Interface for the RegisterAdminController
export interface IRegisterAdminController {
    // Method to get an admin by their ID (optional parameter)
    getAdmin(adminId?: number): Promise<ApiResponse<any>>;

    // Method to register a new admin with the provided details
    registerAdmin(firstName: string, lastName: string, identityNumber: string, dateBirthday: string): Promise<ApiResponse<any>>;

    // Method to update an existing admin's details by adminId
    updateAdmin(adminId: number, firstName: string, lastName: string, identityNumber: string, dateBirthday: string): Promise<ApiResponse<any>>;

    // Method to delete an admin by their adminId
    deleteAdmin(adminId: number): Promise<ApiResponse<any>>;
}
