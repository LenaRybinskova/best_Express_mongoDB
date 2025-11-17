import {Router} from 'express';
import {LessonRepository} from '../lessons/lesson.repository';
import {LessonService} from '../lessons/lesson.service';
import {LessonController} from '../lessons/lesson.controller';
import {zodValidateBodyMiddleware} from '../../utils/zodValidation/zodValidateBodyMiddleware';
import {
    AddFilesSchema,
    AddLinkSchema,
    CreateLessonSchema,
    DeleteFileSchema,
    DeleteLinkSchema
} from '../lessons/lesson.types';
import {zodIDValidationMiddleware} from '../../utils/zodValidation/zodIDValidationMiddleware';
import {IdParamSchema} from '../users/user.types';
import {CourseRepository} from '../courses/courses.repository';
import {UserRepository} from '../users/users.repository';

export const lessonRouter = Router({mergeParams: true}) // чтобы роутер смог принять параметры из главного роутера Курс '/courses'
const userRepository = new UserRepository();
const courseRepository = new CourseRepository(userRepository)

const lessonRepository = new LessonRepository();
const lessonService = new LessonService(lessonRepository, courseRepository);
const lessonController = new LessonController(lessonService);


// фактически он сработает на /courses/:courseId/lesson  courses отловит родитель, courseId отловится в боди.парам, а lessons по дефолту уже приделает lessonRouter
lessonRouter
    //courses/:courseId/lesson
    .post('/',
        zodIDValidationMiddleware('courseId', IdParamSchema),
        zodValidateBodyMiddleware(CreateLessonSchema),
        lessonController.create)

    //courses/:courseId/lesson/:lessonId
    .delete('/:lessonId',
        zodIDValidationMiddleware('courseId', IdParamSchema),
        zodIDValidationMiddleware('lessonId', IdParamSchema),
        lessonController.delete)

    //courses/:courseId/lesson/:lessonId
    .put('/:lessonId',
        zodIDValidationMiddleware('courseId', IdParamSchema),
        zodIDValidationMiddleware('lessonId', IdParamSchema),
        lessonController.update)

    //courses/:courseId/lesson/:lessonId/files  добавлять файлы в ресурсы
    .post('/:lessonId/files',
        zodIDValidationMiddleware('courseId', IdParamSchema),
        zodIDValidationMiddleware('lessonId', IdParamSchema),
        zodValidateBodyMiddleware(AddFilesSchema),
        lessonController.addFile)

    //courses/:courseId/lesson/:lessonId/files  добавлять ссылки в ресурсы
    .post('/:lessonId/links',
        zodIDValidationMiddleware('courseId', IdParamSchema),
        zodIDValidationMiddleware('lessonId', IdParamSchema),
        zodValidateBodyMiddleware(AddLinkSchema),
        lessonController.addLink)

    //courses/:courseId/lesson/:lessonId/files  УДАЛИТЬ файл из ресурсов
    .delete('/:lessonId/file',
        zodIDValidationMiddleware('courseId', IdParamSchema),
        zodIDValidationMiddleware('lessonId', IdParamSchema),
        zodValidateBodyMiddleware(DeleteFileSchema),
        lessonController.deleteFile)

    //courses/:courseId/lesson/:lessonId/files  УДАЛИТЬ ссылку из ресурсов
    .delete('/:lessonId/link',
        zodIDValidationMiddleware('courseId', IdParamSchema),
        zodIDValidationMiddleware('lessonId', IdParamSchema),
        zodValidateBodyMiddleware(DeleteLinkSchema),
        lessonController.deleteLink)



