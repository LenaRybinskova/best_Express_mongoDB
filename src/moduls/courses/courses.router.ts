import {Router} from 'express';
import {CoursesController} from './courses.controller';
import {CoursesService} from './courses.service';
import {CourseRepository} from './courses.repository';
import {zodIDValidationMiddleware} from '../../utils/zodValidation/zodIDValidationMiddleware';
import {IdParamSchema} from '../users/user.types';
import {UserRepository} from '../users/users.repository';


export const coursesRouter = Router();
const userRepository = new UserRepository();
const courseRepository = new CourseRepository(userRepository);
const courseService = new CoursesService(courseRepository, userRepository);
const coursesController = new CoursesController(courseService);

coursesRouter
    .get('/', coursesController.getCourses)
    .get('/:id', zodIDValidationMiddleware('id', IdParamSchema), coursesController.getCourseById)
    .post('/', coursesController.create)
    .patch('/:id', zodIDValidationMiddleware('id', IdParamSchema), coursesController.update)
    .delete('/:id', zodIDValidationMiddleware('id', IdParamSchema), coursesController.delete)

