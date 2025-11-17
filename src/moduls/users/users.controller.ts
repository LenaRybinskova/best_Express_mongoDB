import {Request, Response} from 'express';
import {UsersService} from './users.service';
import {ResponseHandle} from '../../utils/handleError/responseHandle';
import {UpdateCourseDTO} from '../courses/courses.types';
import errorCatchAsync from '../../utils/handleError/errorCatchAsync';

export class UsersController {
    constructor(private usersService: UsersService) {
    }

    getUsers = errorCatchAsync(async (req: Request, res: Response) => {
        const users = await this.usersService.getAllUsers()
        res.status(200).json(ResponseHandle.success(users));
    })

    getUserById = errorCatchAsync(async (req: Request, res: Response) => {
        const userId = req.params.id
        const user = await this.usersService.getById(userId)
        res.status(200).json(ResponseHandle.success(user));
    })

    update = errorCatchAsync(async (req: Request, res: Response) => {
        const authUserId = '68fb2fd05fb69c878ef02369' // будем получать из заголовка
        const userId = req.params.id
        const payload: UpdateCourseDTO = req.body;
        const updateUser = await this.usersService.update(authUserId, userId, payload)
        res.status(200).json(ResponseHandle.success(updateUser))
    })

    delete = errorCatchAsync(async (req: Request, res: Response) => {
        const authUserId = '68fb45257c344941ac174670' // будем получать из заголовка
        const userId = req.params.id
        const result = await this.usersService.delete(authUserId, userId)
        res.status(200).json(ResponseHandle.success(result))
    })
}