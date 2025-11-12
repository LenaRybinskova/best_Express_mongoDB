import {LessonService} from '../lessons/lesson.service';
import errorCatchAsync from '../../utils/handleError/errorCatchAsync';
import {Request, Response} from 'express';
import {ResponseHandle} from '../../utils/handleError/responseHandle';

export class LessonController {
    constructor(private readonly lessonService: LessonService) {}
    create = errorCatchAsync(async (reg: Request, res: Response) => {
        const authorId = "68ee534d3e878ac744cad252" // будем брать из токена

        const courseId = reg.params.courseId;
        const dto = reg.body
        const newLesson = await this.lessonService.create(dto, courseId, authorId)
        return res.status(201).json(ResponseHandle.success(newLesson))
    })
}