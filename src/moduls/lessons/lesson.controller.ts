import {LessonService} from '../lessons/lesson.service';
import errorCatchAsync from '../../utils/handleError/errorCatchAsync';
import {Request, Response} from 'express';
import {ResponseHandle} from '../../utils/handleError/responseHandle';
import {
    addFilesLessonDTO,
    addLinksLessonDTO,
    deleteFileLessonDTO,
    deleteLinkLessonDTO
} from 'moduls/lessons/lesson.types';

export class LessonController {
    constructor(private readonly lessonService: LessonService) {
    }

    create = errorCatchAsync(async (reg: Request, res: Response) => {
        const authorId = '68ee534d3e878ac744cad252' // будем брать из токена

        const courseId = reg.params.courseId;
        const dto = reg.body
        const newLesson = await this.lessonService.create(dto, courseId, authorId)
        return res.status(201).json(ResponseHandle.success(newLesson))
    })

    delete = errorCatchAsync(async (reg: Request, res: Response) => {

        //TODO проверка текущий юзер это создатель курса ??
        const courseId = reg.params.courseId;
        const lessonId = reg.params.lessonId;
        const result = await this.lessonService.delete(courseId, lessonId)
        return res.status(200).json(ResponseHandle.success(result))
    })

    //изменить гл поля или поля вложенного объекта video. Ресурсы можно только добавлять и удалять. тк это массивы
    update = errorCatchAsync(async (reg: Request, res: Response) => {
        //TODO проверка текущий юзер это создатель курса ??
        const courseId = reg.params.courseId;
        const lessonId = reg.params.lessonId;
        const dto = reg.body

        const result = await this.lessonService.update(dto, courseId, lessonId)
        return res.status(200).json(ResponseHandle.success(result))
    })

    // добавить файлы (документы) и ссылки в вложенный объект Ресурсы
    // TODO как происходит передача и хранеине файлов
    addFile = errorCatchAsync(async (reg: Request, res: Response) => {
        const lessonId = reg.params.lessonId;
        const dto: addFilesLessonDTO = reg.body.files
        const result = await this.lessonService.addFiles(lessonId, dto)

        return res.status(201).json(ResponseHandle.success(result))
    })

    addLink = errorCatchAsync(async (reg: Request, res: Response) => {
        const lessonId = reg.params.lessonId;
        const dto: addLinksLessonDTO = reg.body.resourceLink
        const result = await this.lessonService.addLink(lessonId, dto)

        return res.status(201).json(ResponseHandle.success(result))
    })

    // удалить файлы (документы) и ссылки в вложенном объекте Ресурсы
    deleteFile = errorCatchAsync(async (reg: Request, res: Response) => {
        const lessonId = reg.params.lessonId;
        const dto: deleteFileLessonDTO = reg.body
        const result = await this.lessonService.deleteFile(lessonId, dto.file )
        return res.status(200).json(ResponseHandle.success(result))
    })

    deleteLink=errorCatchAsync(async (reg: Request, res: Response) =>{
        const lessonId = reg.params.lessonId;
        const dto: deleteLinkLessonDTO = reg.body
        const result = await this.lessonService.deleteLink(lessonId, dto.resourceLink )
        return res.status(200).json(ResponseHandle.success(result))
    })

}