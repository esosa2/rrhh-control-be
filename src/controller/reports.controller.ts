import { ApiResponse } from "./types/api.response";
import { IReportsController } from "./interfaces/reports"
import { LogInfo, LogError, LogSuccess } from "../utils/logger";
import { pool } from "../config/database";

export class ReportsController implements IReportsController {

    // Method to generate a report of hours worked by an admin within a date range
    async reportHours(adminId?: number, dateBegin?: Date | undefined, dateEnd?: Date | undefined): Promise<ApiResponse<any>> {
        LogInfo('[/api/reports] Get Request');
        try {
            let query = "SELECT f.nombres, f.apellidos, res.fecha, res.hora_entrada, res.hora_salida, (res.hora_salida - res.hora_entrada) AS horas_trabajadas " +
                "FROM registro_entrada_salida res JOIN funcionarios f ON res.funcionario_id = f.id "
            const whereClauses: string[] = [];
            const args: any[] = [];
            let argIndex = 1;

            if (adminId) {
                whereClauses.push(`f.id = $${argIndex}`);
                args.push(adminId);
                argIndex++;
            }

            if (dateBegin) {
                whereClauses.push(`res.fecha >= $${argIndex}`);
                args.push(new Date(dateBegin).toISOString().split('T')[0]);
                argIndex++;
            }

            if (dateEnd) {
                whereClauses.push(`res.fecha <= $${argIndex}`);
                args.push(new Date(dateEnd).toISOString().split('T')[0]);
                argIndex++;
            }

            // Append WHERE clause if there are any filters
            if (whereClauses.length > 0) {
                query += " WHERE " + whereClauses.join(" AND ");
            }

            const result = await pool.query(query, args);

            // Return the response
            return {
                status: 200,
                success: true,
                message: "Report generated successfully",
                data: result.rows,
            };

        } catch (error: any) {
            LogError(`Error to generate report: ${error}`);
            return {
                status: 500,
                success: false,
                message: "Internal server error",
                error: error,
            };
        }
    }

}


