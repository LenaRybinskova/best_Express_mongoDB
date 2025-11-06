import {ZodError} from 'zod';
import {Response} from 'express';
import {ResponseHandle} from '../handleError/responseHandle';

export const handleZodError = (error: ZodError, res: Response): void => {
    const errorDetails = {
        field: error.issues[0]?.path[0],
        message: error.issues[0]?.message
    };

    res.status(400).json(ResponseHandle.error('VALIDATION_ERROR', 400, errorDetails));
};