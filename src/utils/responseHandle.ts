export const ResponseHandle = {
    success(data: any) {

        console.log("4 data", data)
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

        console.log("ResponseHandle errorResponse:",errorResponse)
        return errorResponse;
    }
};