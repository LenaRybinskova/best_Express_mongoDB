import {Router} from 'express';
import {UserRepository} from './users.repository';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {zodValidateBodyMiddleware} from '../../utils/zodValidation/zodValidateBodyMiddleware';
import {IdParamSchema, UpdateCourseSchema} from '../users/user.types';
import {zodIDValidationMiddleware} from '../../utils/zodValidation/zodIDValidationMiddleware';


export const usersRouter = Router();
const userRepository = new UserRepository();
const userService = new UsersService(userRepository);
const userController = new UsersController(userService);

usersRouter
    .get('/', userController.getUsers)
    .get('/:id', zodIDValidationMiddleware('id', IdParamSchema), userController.getUserById)
    .patch('/:id', zodIDValidationMiddleware('id', IdParamSchema), zodValidateBodyMiddleware(UpdateCourseSchema), userController.update) // c фр приходит только ид и поле, которое меняем
    .delete('/:id', zodIDValidationMiddleware('id', IdParamSchema), userController.delete)

