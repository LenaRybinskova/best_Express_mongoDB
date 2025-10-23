import {handleZodError} from '../../utils/zodValidation/zodErrorHandle';
import {ZodTypeAny} from 'zod';
import {NextFunction, Request, Response} from 'express';
import {colors} from '../colors';


export const zodIDValidationMiddleware = (paramName: string, schema: ZodTypeAny) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const paramValue = req.params[paramName];
        const result = schema.safeParse(paramValue);

        console.log(`${colors.magenta} ZOD валидация ID:`, result);

        if (!result.success) {
            return handleZodError(result.error, res);
        }

        next();
    };
};