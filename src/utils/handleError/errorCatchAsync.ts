import {NextFunction, Request, Response} from 'express';

type AsyncRequestHandler =
    | ((req: Request, res: Response) => Promise<any>)
    | ((req: Request, res: Response, next: NextFunction) => Promise<any>);


// функция-обертка. снабжает контроллер catch(next)
const errorCatchAsync = (fn: AsyncRequestHandler) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch((error) => next(error));
    };
};

export default errorCatchAsync;