import {Request, Response} from 'express';
import {CoursesService} from './courses.service';
import {ResponseHandle} from '../../utils/responseHandle';
import {UpdateCourseInput} from '../courses/courses.types';
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
        const authUserId = '68f8cf6907cf39953f582141' // в будущем ВОЗЬМЕМ ИЗ ТОКЕНА из заголовка, когда авториз будет готова

        //вынесено в мидлвар
        /*const validationZod = CreateCourseSchema.safeParse(req.body);

        //вывод валидац ошибки из zod
        if (!validationZod.success) {
            console.log(validationZod);
            const validateError = validationZod.error;

            const errorDetails = {
                field: validateError.issues[0].path[0],
                message: validateError.issues[0].message
            };

            return res.status(400).json(ResponseHandle.error('VALIDATION_ERROR', 400, errorDetails));
            /!*throw new Error("VALIDATION_ERROR")*!/
        }*/

        const newCourse: ICourse = {
            authorId: authUserId,
            ...req.body
        }

        const result = await this.coursesService.create(newCourse)
        res.status(201).json(ResponseHandle.success(result))
    }

    update = async (req: Request, res: Response) => {

        const authUserId = '68f8cf6907cf39953f582142' // в будущем ВОЗЬМЕМ ИЗ ТОКЕНА

        const courseId = req.params.id;

        const body: UpdateCourseInput = req.body;

        const result = await this.coursesService.update(authUserId, courseId, body)
        res.status(200).json(ResponseHandle.success(result))
    }

    delete = async (req: Request, res: Response) => {
        const authUserId = '68f8cf6907cf39953f582142' // в будущем ВОЗЬМЕМ ИЗ ТОКЕНА
        const courseId = req.params.id;
        const result = await this.coursesService.delete(authUserId, courseId)
        res.status(200).json(ResponseHandle.success({deletedCourse: result}))
    }
}