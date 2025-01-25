import { ApiResponse } from "./types/api.response";
import { IReportsController } from "./interfaces/reports"
import { LogInfo, LogError, LogSuccess } from "../utils/logger";
import { pool } from "../config/database";

export class ReportsController implements IReportsController {

    async reportHours(adminId: number, dateBegin: Date | undefined, dateEnd: Date | undefined): Promise<ApiResponse<any>> {
        LogInfo('[/api/reports] Get Request');
        try {
            let query = "SELECT f.id, f.nombres, f.apellidos, res.hora_entrada, res.hora_salida, (res.hora_salida - res.hora_entrada) AS horas_trabajadas " +
                "FROM registro_entrada_salida res JOIN funcionarios f ON res.funcionario_id = f.id "
            const whereClauses: string[] = [];
            const args: any[] = [];

            // Add filters based on non-null parameters
            if (adminId !== null && adminId !== undefined) {
                whereClauses.push("f.id = $1");
                args.push(adminId);
            }
            if (dateBegin !== null && dateBegin !== undefined) {
                whereClauses.push("res.fecha >= $2");
                args.push(dateBegin);
            }
            if (dateEnd !== null && dateEnd !== undefined) {
                whereClauses.push("res.fecha <= $3");
                args.push(dateEnd);
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


