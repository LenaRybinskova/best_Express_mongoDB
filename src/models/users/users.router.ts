import {Router} from 'express';
import {UserRepository} from './users.repository';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';


export const usersRouter = Router();
const userRepository = new UserRepository();
const userService = new UsersService(userRepository);
const userController = new UsersController(userService);

usersRouter
    .get('/', userController.getUsers)
    .get('/:id', userController.getUserById)
    .patch('/:id', userController.update) // c фр приходит только ид и поле, которое меняем
    .delete('/:id', userController.delete)

