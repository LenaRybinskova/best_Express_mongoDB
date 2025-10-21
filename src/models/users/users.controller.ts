import {NextFunction, Request, Response} from 'express';
import {UsersService} from './users.service';
import {ResponseHandle} from '../../utils/responseHandle';
import {UpdateUser} from 'models/users/user.types';

export class UsersController {
    constructor(private usersService: UsersService) {
    }

    /*сделать глоб обработку ош, посмотр какой при успехе объект респонса буедет*/
    getUsers = async (req: Request, res: Response,) => {
        const users = await this.usersService.getAllUsers()
        res.status(200).json(ResponseHandle.success(users));
    }

    getUserById = async (req: Request, res: Response) => {
        const userId = req.params.id
        const user = await this.usersService.getById(userId)
        res.status(200).json(ResponseHandle.success(user));
    }

    update = async (req: Request, res: Response) => {
        const userId = req.params.id
        const payload: UpdateUser = req.body;
        console.log(payload)
        const updateUser = await this.usersService.update(userId, payload)
        res.status(200).json(ResponseHandle.success(updateUser))
    }


    delete = async (req: Request, res: Response) => {
        const userId = req.params.id
        const result = await this.usersService.delete(userId)
        res.status(204).json(ResponseHandle.success(result))
    }
}