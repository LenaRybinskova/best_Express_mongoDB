import { Request, Response } from 'express';
import {UsersService} from './users.service';

export class UsersController {
    constructor(private usersService: UsersService) {
    }

    getUsers = async (req: Request, res: Response) => {
        const result = await this.usersService.getAllUsers()
        res.json({result})
    }

    getUserById = async (req: Request, res: Response) => {
        res.json({})
    }

    update = async (req: Request, res: Response) => {
        res.json({})
    }

    create = async (req: Request, res: Response) => {
        res.json({})
    }

    delete = async (req: Request, res: Response) => {
        res.json({})
    }
}