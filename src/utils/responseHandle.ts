export const ResponseHandle = {
    success(data: any) {
        return {
            result: 0,
            data: data ?? null
        };
    },

    error(textError: string, httpStatus: number, details?: any) {
        return {
            result: 1,
            error: {
                textError,
                httpStatus,
                ...(details && { details })
            }
        };
    }
};