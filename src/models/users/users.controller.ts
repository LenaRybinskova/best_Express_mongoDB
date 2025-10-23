import {Request, Response} from 'express';
import {UsersService} from './users.service';
import {ResponseHandle} from '../../utils/responseHandle';
import {UpdateCourseInput} from 'models/users/user.types';

export class UsersController {
    constructor(private usersService: UsersService) {
    }
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
        const authUserId = "68f8cf6907cf39953f582141" // будем получать из заголовка
        const userId = req.params.id
        const payload: UpdateCourseInput = req.body;
        const updateUser = await this.usersService.update(authUserId, userId, payload)
        res.status(200).json(ResponseHandle.success(updateUser))
    }

    delete = async (req: Request, res: Response) => {
        const authUserId = "68f8a5dc6759a1190fcec6f5" // будем получать из заголовка
        const userId = req.params.id
        const result = await this.usersService.delete(authUserId, userId)
        res.status(200).json(ResponseHandle.success(result))
    }
}