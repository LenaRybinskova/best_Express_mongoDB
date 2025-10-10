import {Request, Response} from 'express';
import {AuthService} from './auth.service';
import {StatusCodes} from 'http-status-codes';

export class AuthController {
    constructor(private authService: AuthService) {}

    register = async (req: Request, res: Response) => {
        const payload = req.body;
        console.log('payload', payload)
        const result = await this.authService.register();
        res.json(result);
        /*res
            .status(StatusCodes.CREATED)
            .json(
                {
                    user: {
                        id: 1,
                        firstName: 'Lena',
                        email: 'lena@email.com'
                    }
                })*/
    }
}