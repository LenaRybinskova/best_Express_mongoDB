import {Request, Response} from 'express';
import {AuthService} from './auth.service';
import {ResponseHandle} from '../../utils/handleError/responseHandle';
import errorCatchAsync from '../../utils/handleError/errorCatchAsync';


export class AuthController {
    constructor(private authService: AuthService) {
    }

    register = errorCatchAsync(async (req: Request, res: Response) => {
        const result = await this.authService.register(req.body);
        res.status(201).json(ResponseHandle.success(result))
    })
}

