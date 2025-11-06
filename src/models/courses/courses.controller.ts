import {Request, Response} from 'express';
import {CoursesService} from './courses.service';
import {ResponseHandle} from '../../utils/handleError/responseHandle';
import {UpdateCourseInput} from '../courses/courses.types';
import {ICourse} from '../courses/courses.model';
import {Types} from 'mongoose';
import errorCatchAsync from '../../utils/handleError/errorCatchAsync';


export class CoursesController {
    constructor(private coursesService: CoursesService) {
    }

    getCourses = errorCatchAsync(async (req: Request, res: Response) => {
        const courses = await this.coursesService.getAllCourses()
        res.status(200).json(ResponseHandle.success(courses))
    })
    getCourseById = errorCatchAsync(async (req: Request, res: Response) => {
        const courseId = req.params.id;
        const objectCourseId = new Types.ObjectId(courseId);
        const course = await this.coursesService.getCourseById(objectCourseId)
        res.status(200).json(ResponseHandle.success(course))
    })
    create = errorCatchAsync(async (req: Request, res: Response) => {
        const authUserId = '68f8cc1bd706c30658d45f3a' // в будущем ВОЗЬМЕМ ИЗ ТОКЕНА из заголовка,

        const newCourse: ICourse = {
            authorId: authUserId,
            ...req.body
        }

        const result = await this.coursesService.create(newCourse)
        res.status(201).json(ResponseHandle.success(result))
    })
    update = errorCatchAsync(async (req: Request, res: Response) => {

        const Id = '68f8cc1bd706c30658d45f3a' // в будущем ВОЗЬМЕМ ИЗ ТОКЕНА
        const authUserId = new Types.ObjectId(Id)

        const cId = req.params.id;
        const courseId = new Types.ObjectId(cId)

        const body: UpdateCourseInput = req.body;

        const result = await this.coursesService.update(authUserId, courseId, body)
        res.status(200).json(ResponseHandle.success(result))
    })
    delete = errorCatchAsync(async (req: Request, res: Response) => {
        const Id = '68f8cf6907cf39953f582141' // в будущем ВОЗЬМЕМ ИЗ ТОКЕНА
        const authUserId = new Types.ObjectId(Id)
        const cId = req.params.id;
        const courseId = new Types.ObjectId(cId)
        const result = await this.coursesService.delete(authUserId, courseId)
        res.status(200).json(ResponseHandle.success({deletedCourse: result}))
    })
}