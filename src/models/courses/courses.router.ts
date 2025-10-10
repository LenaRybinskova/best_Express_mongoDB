import {Router} from 'express';
import {CoursesController} from './courses.controller';
import {CoursesService} from './courses.service';
import {CourseRepository} from './courses.repository';


export const coursesRouter = Router();
const courseRepository = new CourseRepository();
const courseService = new CoursesService(courseRepository);
const coursesController = new CoursesController(courseService);

coursesRouter
    .get('/', coursesController.getCourses)
    .get('/:id', coursesController.getCourseById)
    .post('/', coursesController.create)
    .patch('/:id', coursesController.update)
    .delete('/:id', coursesController.delete)

