import {Router} from 'express';
import {CoursesController} from './courses.controller';
import {CoursesService} from './courses.service';
import {CourseRepository} from './courses.repository';
import {IdParamSchema} from '../users/user.types';
import {UserRepository} from '../users/users.repository';
import {lessonRouter} from '../lessons/lesson.router';
import {zodIDValidationMiddleware} from '../../utils/zodValidation/zodIDValidationMiddleware';


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

// родительский роутер отлавливает роут с префиксом "course" и перенаправляет в дочерний lessonRouter с параметром courseId
coursesRouter.use('/:courseId/lessons', lessonRouter);

