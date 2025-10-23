import {ResponseHandle} from '../utils/responseHandle';
import {NextFunction, Request, Response} from 'express';
import {colors} from './colors';


// срабатывает на каждый throw new Error()
export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`${colors.red} ErrorMiddleware: ${error}`);

    if (error.message === 'NOT_FOUND') {
        const httpStatus = 404
        console.log('404')
        return res.status(httpStatus).json(ResponseHandle.error('NOT_FOUND', httpStatus));
    }

    if (error.message === 'VALIDATION_ERROR') {
        const httpStatus = 400
        return res.status(httpStatus).json(ResponseHandle.error('VALIDATION_ERROR', httpStatus));
    }

    if (error.message === 'DATABASE_UNAVAILABLE') {
        const httpStatus = 503
        return res.status(503).json(ResponseHandle.error('DATABASE_UNAVAILABLE', httpStatus));
    }

    if (error.message === 'FORBIDDEN') {
        const httpStatus = 403
        return res.status(403).json(ResponseHandle.error('FORBIDDEN', httpStatus));
    }

    // все остальные ошибки
    const httpStatus = 500
    res.status(500).json(ResponseHandle.error('INTERNAL_ERROR', httpStatus, error));
};