import {Router} from 'express';
import {LessonRepository} from '../lessons/lesson.repository';
import {LessonService} from '../lessons/lesson.service';
import {LessonController} from '../lessons/lesson.controller';
import {zodValidateBodyMiddleware} from '../../utils/zodValidation/zodValidateBodyMiddleware';
import {CreateLessonSchema} from '../lessons/lesson.types';
import {zodIDValidationMiddleware} from '../../utils/zodValidation/zodIDValidationMiddleware';
import {IdParamSchema} from '../users/user.types';
import {CourseRepository} from '../courses/courses.repository';
import {UserRepository} from '../users/users.repository';

export const lessonRouter = Router({ mergeParams: true }) // чтобы роутер смог принять параметры из главного роутера Курс '/courses'
const userRepository = new UserRepository();
const courseRepository = new CourseRepository(userRepository)

const lessonRepository = new LessonRepository();
const lessonService = new LessonService(lessonRepository, courseRepository);
const lessonController = new LessonController(lessonService);


// фактически он сработает на /courses/:courseId/lessons  courses отловит родитель, courseId отловится в боди.парам, а lessons по дефолту уже приделает lessonRouter
lessonRouter
    .post('/',
        zodIDValidationMiddleware('courseId', IdParamSchema),
        zodValidateBodyMiddleware(CreateLessonSchema),
        lessonController.create)


