import {ZodTypeAny} from 'zod';
import {NextFunction, Request, Response} from 'express';
import {handleZodError} from '../zodValidation/zodErrorHandle';
import {colors} from '../colors';

export const zodValidateBodyMiddleware = (schema: ZodTypeAny) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        console.log(`${colors.magenta} ZOD валидация BODY:`, result);

        if (!result.success) {
            handleZodError(result.error, res)
            return
        }

        req.body = result.data; // на случай, если в зод что то подкорретируем и передаем дальше
        next();
    };
};