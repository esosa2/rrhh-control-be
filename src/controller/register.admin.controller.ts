import { ApiResponse } from "./types/api.response";
import { IRegisterAdminController } from "./interfaces/register.admin";
import { LogInfo, LogError, LogSuccess } from "../utils/logger";
import { pool } from "../config/database";


export class RegisterAdminController implements IRegisterAdminController {

    async getAdmin(adminId: number): Promise<ApiResponse<any>> {
        LogInfo('[/api/register_admin] Get Request');
        try {
            const query = 'SELECT * FROM funcionarios WHERE id = $1';
            const result = await pool.query(query, [adminId]);

            // Verificar si se encontró el admin
            if (result.rowCount === 0) {
                return {
                    status: 404,
                    success: false,
                    message: "Admin not found",
                };
            }

            // Devolver respuesta exitosa
            return {
                status: 200,
                success: true,
                message: "Admin retrieved successfully",
                data: result.rows[0],
            };
        } catch (error: any) {
            LogError(`Error retrieving admin: ${error}`);
            return {
                status: 500,
                success: false,
                message: "Internal server error",
                error: error,
            };
        }
    }

    async registerAdmin(firstName: string, lastName: string, identityNumber: string, dateBirthday: string): Promise<ApiResponse<any>> {
        LogInfo('[/api/register_admin] Post Request');
        try {
            const query = `
                INSERT INTO funcionarios (nombres, apellidos, cedula, fecha_nacimiento)
                VALUES ($1, $2, $3, $4)
                RETURNING id, nombres, apellidos, cedula, fecha_nacimiento;
            `;
            const values = [firstName, lastName, identityNumber, dateBirthday];
            const result = await pool.query(query, values);

            const data = result.rows[0];
            LogSuccess(`Admin registered: ${JSON.stringify(data)}`);
            return {
                status: 201,
                success: true,
                message: "Admin registered successfully",
                data: result.rows[0],
            };
        } catch (error: any) {
            LogError(`Error registering admin: ${error}`);
            return {
                status: 500,
                success: false,
                message: "Internal server error",
                error: error,
            };
        }
    }

    async updateAdmin(adminId: number, firstName: string, lastName: string, identityNumber: string, dateBirthday: string): Promise<ApiResponse<any>> {
        LogInfo('[/api/register_admin] Put Request');
        try {
            const query = 'UPDATE funcionarios SET nombres = $1, apellidos = $2, cedula = $3, fecha_nacimiento = $4 WHERE id = $5 RETURNING *';
            const values = [firstName, lastName, identityNumber, dateBirthday, adminId];
            const result = await pool.query(query, values);

            if (result.rowCount === 0) {
                return { 
                    status: 404, 
                    success: false, 
                    message: 'Admin not found' 
                };
            }
            return { 
                status: 200, 
                success: true, 
                message: 'Admin updated successfully', 
                data: result.rows[0] 
            };
        } catch (error: any) {
            LogError(`Error updating admin: ${error}`);
            return { 
                status: 500, 
                success: false, 
                message: 'Internal server error', 
                error: error 
            };
        }
    }

    async deleteAdmin(adminId: number): Promise<ApiResponse<any>> { 
        LogInfo('[/api/register_admin] Delete Request');
        try {
            const query = 'DELETE FROM funcionarios WHERE id = $1 RETURNING *';
            const result = await pool.query(query, [adminId]);

            if (result.rowCount === 0) {
                return { 
                    status: 404, 
                    success: false, 
                    message: 'Admin not found' 
                };
            }

            return { 
                status: 200, 
                success: true, 
                message: 'Admin deleted successfully', 
                data: result.rows[0] 
            };
        } catch (error: any) {
            LogError(`Error deleting admin: ${error}`);
            return { 
                status: 500, 
                success: false, 
                message: 'Internal server error', 
                error: error.message 
            };
        }
    }
}