import { Request, Response } from 'express';
import {AuthService} from './auth.service';

export class AuthController {
    constructor(private authService: AuthService) {}

    register = async (req: Request, res: Response) => {
        console.log(" AuthController register")
        const result = await this.authService.register();
        res.json(result);
    }
}