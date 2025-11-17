import {LessonRepository} from '../lessons/lesson.repository';
import {
    addFilesLessonDTO,
    addLinksLessonDTO,
    CreateLessonDTO,
    deleteFileLessonDTO,
    UpdateLessonDTO
} from '../lessons/lesson.types';
import {CourseRepository} from '../courses/courses.repository';
import {Types} from 'mongoose';

export class LessonService {
    constructor(private readonly lessonRepository: LessonRepository,
                private readonly courseRepository: CourseRepository) {
    }

    // метод для проверки принадлежит ли Ид урока к курсу
    async checkIDLessonInCourse(courseId: string, lessonId: string) {

    }

    async create(dto: CreateLessonDTO, courseId: string, authorId: string) {
        const data = {...dto, courseId, authorId}
        const courseIDType = new Types.ObjectId(courseId)
        /*        const userIDType = new Types.ObjectId(authorId)*/
        const newlesson = await this.lessonRepository.create(data);
        console.log('LessonService newlesson:', newlesson)

        await this.courseRepository.addIdWithRef(courseIDType, 'lessonsId', newlesson._id)
        return newlesson
    }

    async delete(courseId: string, lessonId: string) {

        // TODO сделать в транзакции
        await this.lessonRepository.delete(lessonId)
        await this.courseRepository.deleteIdWithRef(courseId, 'lessonsId', lessonId)
        return true
        // обр к репоз курсов и удаляем ммылку
    }

    async update(dto: UpdateLessonDTO, courseId: string, lessonId: string) {
        // метод для проверки принадлежит ли Ид урока к курсу
        await this.courseRepository.checkIDLessonInCourse(courseId, lessonId)

        return await this.lessonRepository.update(dto, lessonId)
    }

    async addFiles(lessonId: string, dto: addFilesLessonDTO) {
        return await this.lessonRepository.addResources(lessonId, 'resources.files', dto)
    }

    async addLink(lessonId: string, dto: addLinksLessonDTO) {
        return await this.lessonRepository.addResources(lessonId, 'resources.resourceLink', dto)
    }

    async deleteFile(lessonId: string, fileName: string) {
        return await this.lessonRepository.deleteResources(lessonId, "resources.files", fileName )
    }

    async deleteLink(lessonId: string, linkName: string){
        return await this.lessonRepository.deleteResources(lessonId, "resources.resourceLink", linkName )
    }

}