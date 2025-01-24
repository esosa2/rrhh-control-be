import { ApiResponse } from "./types/ApiResponse";
import { IRegisterAdminController } from "./interfaces/RegisterAdmin";
import { LogInfo, LogError, LogSuccess, Logwarning } from "../utils/logger";
import { pool } from "../config/database"; // Ajusta la ruta según la ubicación del archivo db.ts


export class RegisterAdminController implements IRegisterAdminController {
    
    async getAdmin(adminId: number): Promise<ApiResponse<any>> {
        LogInfo('[/api/register_admin] Get Request');
        try {
            const query = 'SELECT * FROM funcionarios WHERE id = $1';
            const result = await pool.query(query, [adminId]);

            // Verificar si se encontró el admin
            if (result.rowCount === 0) {
                return Promise.resolve({
                    status: 404,
                    success: false,
                    message: "Admin not found",
                });
            }

            // Devolver respuesta exitosa
            return Promise.resolve({
                status: 200,
                success: true,
                message: "Admin retrieved successfully",
                data: result.rows[0],
            });
        } catch (error: any) {
            LogError(`Error retrieving admin: ${error.message}`);
            return Promise.resolve({
                status: 500,
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }

    async registerAdmin(firstName: string, lastName: string, identityNumner: string, dateBirthday: string): Promise<ApiResponse<any>> {
        LogInfo('[/api/register_admin] Post Request');
        try {
            const query = `
                INSERT INTO funcionarios (nombres, apellidos, cedula, fecha_nacimiento)
                VALUES ($1, $2, $3, $4)
                RETURNING id, nombres, apellidos, cedula, fecha_nacimiento;
            `;
            const values = [firstName, lastName, identityNumner, dateBirthday];
            const result = await pool.query(query, values);

            const data = result.rows[0];
            LogSuccess(`Admin registered: ${JSON.stringify(data)}`);
            return Promise.resolve({
                status: 201,
                success: true,
                message: "Admin registered successfully",
                data: result.rows[0],
            });
        } catch (error: any) {
            LogError(`Error registering admin: ${error.message}`);
            return Promise.resolve({
                status: 500,
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
}