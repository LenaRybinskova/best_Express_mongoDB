import {ResponseHandle} from '../utils/responseHandle';
import {NextFunction, Request, Response} from 'express';
import {colors} from './colors';


// срабатывает на каждый throw new Error()
export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`${colors.red} ErrorMiddleware: ${error}`);

    let httpStatus: number;
    let errorCode: string;

    switch (error.message) {
        case 'NOT_FOUND':
            httpStatus = 404;
            errorCode = 'NOT_FOUND';
            console.log('404 - Resource not found');
            break;

        case 'VALIDATION_ERROR':
            httpStatus = 400;
            errorCode = 'VALIDATION_ERROR';
            break;

        case 'DATABASE_UNAVAILABLE':
            httpStatus = 503;
            errorCode = 'DATABASE_UNAVAILABLE';
            break;

        case 'FORBIDDEN':
            httpStatus = 403;
            errorCode = 'FORBIDDEN';
            break;

        default:
            httpStatus = 500;
            errorCode = 'INTERNAL_ERROR';
            console.log('500 - Internal server error:', error);
            break;
    }

    res.status(httpStatus).json(ResponseHandle.error(errorCode, httpStatus, error));
};