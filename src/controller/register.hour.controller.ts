import { ApiResponse } from "./types/api.response";
import { IRegisterHoursController } from "./interfaces/register.hours"
import { LogInfo, LogError, LogSuccess, Logwarning } from "../utils/logger";
import { pool } from "../config/database";

export class RegisterHoursController implements IRegisterHoursController {

    async registerHour(adminId: number, date: string, entryTime: string, exitTime: string): Promise<ApiResponse<any>> {
        LogInfo('[/api/registerHour] Post Request');
        try {
            const query = `
                INSERT INTO registro_entrada_salida (funcionario_id, fecha, hora_entrada, hora_salida)
                VALUES ($1, $2, $3, $4)
                RETURNING id, funcionario_id, fecha, hora_entrada, hora_salida;
            `;
            const values = [adminId, date, entryTime, exitTime];
            const result = await pool.query(query, values);

            const data = result.rows[0];
            LogSuccess(`Hour registered: ${JSON.stringify(data)}`);
            return {
                status: 201,
                success: true,
                message: "Hour registered successfully",
                data: result.rows[0],
            };
        } catch (error: any) {
            LogError(`Error registering hour: ${error}`);
            return {
                status: 500,
                success: false,
                message: "Internal server error",
                error: error,
            };
        }
    }

}
