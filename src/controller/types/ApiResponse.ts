/**
 * Generic API Response type
 */
export type ApiResponse<T> = {
    status: number;          // HTTP status code (e.g., 200, 400, 500)
    success: boolean;        // Indicates success or failure
    message: string;         // General message for the response
    data?: T;                // Generic type for the response data
    error?: string;          // Error details if applicable
  };
