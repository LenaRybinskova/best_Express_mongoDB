/*export const ResponseHandle = {
    success(data: any) {

        return {
            result: 0,
            data: data ?? null
        };
    },

    error(textError: string, httpStatus: number, details?: any) {

       const errorResponse:any =  {
            result: 1,
            error: {
                textError,
                httpStatus,
            }}

        if (details) {
            if (details instanceof Error) {
                errorResponse.error.details = {
                    name: details.name,
                    message: details.message
                };
            } else if (typeof details === 'object') {
                errorResponse.error.details = details;
            } else {
                errorResponse.error.details = { message: details.toString() };
            }
        }

        return errorResponse;
    }
};*/


interface SuccessResponse<T = any> {
    result: 0;
    data: T | null;
}

interface ErrorDetails {
    name?: string;
    message?: string;
    [key: string]: any;
}

interface ErrorResponse {
    result: 1;
    error: {
        textError: string;
        httpStatus: number;
        details?: ErrorDetails;
    };
}

export class ResponseHandle {
    static success<T = any>(data: T): SuccessResponse<T> {
        return {
            result: 0,
            data: data ?? null
        };
    }

    static error(textError: string, httpStatus: number, details?: any): ErrorResponse {
        const errorResponse: ErrorResponse = {
            result: 1,
            error: {
                textError,
                httpStatus,
            }
        };

        if (details) {
            if (details instanceof Error) {
                errorResponse.error.details = {
                    name: details.name,
                    message: details.message
                };
            } else if (typeof details === 'object') {
                errorResponse.error.details = details;
            } else {
                errorResponse.error.details = { message: details.toString() };
            }
        }

        return errorResponse;
    }
}