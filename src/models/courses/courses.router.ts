import {Router} from 'express';
import {CoursesController} from './courses.controller';
import {CoursesService} from './courses.service';
import {CourseRepository} from './courses.repository';
import {zodIDValidationMiddleware} from '../../utils/zodValidation/zodIDValidationMiddleware';
import {IdParamSchema} from '../users/user.types';


export const coursesRouter = Router();
const courseRepository = new CourseRepository();
const courseService = new CoursesService(courseRepository);
const coursesController = new CoursesController(courseService);

coursesRouter
    .get('/', coursesController.getCourses)
    .get('/:id', zodIDValidationMiddleware('id', IdParamSchema), coursesController.getCourseById)
    .post('/', coursesController.create)
    .patch('/:id', zodIDValidationMiddleware('id', IdParamSchema), coursesController.update)
    .delete('/:id', zodIDValidationMiddleware('id', IdParamSchema), coursesController.delete)

