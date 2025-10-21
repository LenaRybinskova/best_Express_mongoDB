import {Request, Response} from 'express';
import {CoursesService} from './courses.service';
import {ResponseHandle} from '../../utils/responseHandle';
import {CreateCourseSchema, UpdateCourseInput} from '../courses/courses.types';
import {ICourse} from '../courses/courses.model';
import {Types} from 'mongoose';


export class CoursesController {
    constructor(private coursesService: CoursesService) {
    }

    getCourses = async (req: Request, res: Response) => {
        const courses = await this.coursesService.getAllCourses()
        res.status(200).json(ResponseHandle.success(courses))
    }

    getCourseById = async (req: Request, res: Response) => {
        const courseId = req.params.id;
        const objectCourseId = new Types.ObjectId(courseId);
        const course = await this.coursesService.getCourseById(objectCourseId)
        res.status(200).json(ResponseHandle.success(course))
    }

    create = async (req: Request, res: Response) => {
        const authorId = '68ee534d3e878ac744cad251' // в будущем ВОЗЬМЕМ ИЗ ТОКЕНА из заголовка, когда авториз будет готова
        const validationZod = CreateCourseSchema.safeParse(req.body);

        //вывод валидац ошибки из zod
        if (!validationZod.success) {
            console.log(validationZod);
            const validateError = validationZod.error;

            const errorDetails = {
                field: validateError.issues[0].path[0],
                message: validateError.issues[0].message
            };

            return res.status(400).json(ResponseHandle.error('VALIDATION_ERROR', 400, errorDetails));
            /*throw new Error("VALIDATION_ERROR")*/
        }

        const newCourse: ICourse = {
            authorId,
            ...req.body
        }

        const result = await this.coursesService.create(newCourse)
        res.status(201).json(ResponseHandle.success(result))
    }


    update = async (req: Request, res: Response) => {

        //68ee534d3e878ac744cad251
        const currentUserId = '68ee534d3e878ac744cad251' // в будущем ВОЗЬМЕМ ИЗ ТОКЕНА
        const courseId = req.params.id;

        //преобраз ИД
        const objectCurrentUserId = new Types.ObjectId(currentUserId);
        const objectCourseId = new Types.ObjectId(courseId);

        const body: UpdateCourseInput = req.body;

        const result = await this.coursesService.update(objectCurrentUserId, objectCourseId, body)
        res.status(200).json(ResponseHandle.success(result))
    }


    delete = async (req: Request, res: Response) => {
        const currentUserId = '68ee534d3e878ac744cad251' // в будущем ВОЗЬМЕМ ИЗ ТОКЕНА
        const courseId = req.params.id;
        const result = await this.coursesService.delete(courseId, currentUserId)
        res.status(200).json(ResponseHandle.success({deletedCourse: result}))
    }
}